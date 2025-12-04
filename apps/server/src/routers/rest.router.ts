import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { logger } from '../utils/logger'
import { NotFoundError } from '../utils/errors'
import { ResponseError } from 'sdk'
import { getBl1nkClient, CLOUD_WORKSPACE_ID } from '../services/bl1nkCloud.client'

const router = Router()
const prisma = new PrismaClient()
const cloudApiEnabled = (process.env.USE_BL1NK_CLOUD ?? 'true').toLowerCase() !== 'false'
const DEFAULT_PROVIDER_ID = process.env.BL1NK_PROVIDER_ID
const DEFAULT_WORKSPACE_ID = CLOUD_WORKSPACE_ID

const getAuthToken = (req: Request) => req.headers.authorization

const resolveWorkspaceId = (req: Request) =>
  (req.query.workspaceId as string) || DEFAULT_WORKSPACE_ID

const handleCloudError = async (res: Response, error: unknown) => {
  if (error instanceof ResponseError) {
    let payload: unknown = undefined
    try {
      const text = await error.response.text()
      payload = text ? JSON.parse(text) : undefined
    } catch (parseError) {
      logger.warn('Failed to parse cloud API error payload', {
        error: parseError instanceof Error ? parseError.message : parseError,
      })
    }
    return res
      .status(error.response.status || 500)
      .json(payload ?? { error: error.message })
  }

  logger.error('Unexpected cloud API error', {
    error: error instanceof Error ? error.message : error,
  })
  return res.status(500).json({ error: 'Cloud API request failed' })
}

// Validation schemas
const CreateSkillSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  content: z.string().min(1),
})

const UpdateSkillSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  content: z.string().min(1).optional(),
  isPublic: z.boolean().optional(),
})

// Cloud-auth endpoints
router.post('/auth/register', async (req: Request, res: Response) => {
  if (!cloudApiEnabled) {
    return res.status(503).json({ error: 'Cloud API disabled' })
  }

  try {
    const client = getBl1nkClient()
    const result = await client.auth.authRegisterPost({
      registerRequest: req.body,
    })
    res.status(201).json(result)
  } catch (error) {
    await handleCloudError(res, error)
  }
})

router.post('/auth/login', async (req: Request, res: Response) => {
  if (!cloudApiEnabled) {
    return res.status(503).json({ error: 'Cloud API disabled' })
  }

  try {
    const client = getBl1nkClient()
    const result = await client.auth.authLoginPost({
      loginRequest: req.body,
    })
    res.json(result)
  } catch (error) {
    await handleCloudError(res, error)
  }
})

router.get('/auth/me', async (req: Request, res: Response) => {
  if (!cloudApiEnabled) {
    return res.status(503).json({ error: 'Cloud API disabled' })
  }

  const token = getAuthToken(req)
  if (!token) {
    return res.status(401).json({ error: 'Authorization header required' })
  }

  try {
    const client = getBl1nkClient({ token })
    const result = await client.auth.authMeGet()
    res.json(result)
  } catch (error) {
    await handleCloudError(res, error)
  }
})

// GET /v1/skills - List skills
router.get('/skills', async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string | undefined
    const limit = parseInt(req.query.limit as string) || 50
    const offset = parseInt(req.query.offset as string) || 0
    const sortBy = (req.query.sortBy as string) || 'createdAt'
    const sortOrder = (req.query.sortOrder as 'asc' | 'desc') || 'desc'

    if (cloudApiEnabled) {
      const perPage = limit
      const page = Math.max(1, Math.floor(offset / perPage) + 1)
      const workspaceId = resolveWorkspaceId(req)
      const client = getBl1nkClient({
        token: getAuthToken(req),
        workspaceId,
        providerId: DEFAULT_PROVIDER_ID,
      })

      try {
        const response = await client.skills.workspacesWorkspaceIdSkillsGet({
          workspaceId,
          page,
          perPage,
          search,
          sortBy,
          sortOrder,
        })

        const items = response.data ?? []
        const meta = response.meta ?? {}
        const perPageMeta = meta.perPage ?? perPage
        const pageMeta = meta.page ?? page
        const totalItems = meta.totalItems ?? items.length
        const calculatedOffset = (pageMeta - 1) * perPageMeta

        return res.json({
          items,
          total: totalItems,
          limit: perPageMeta,
          offset: calculatedOffset,
          hasMore:
            meta.page != null && meta.totalPages != null
              ? meta.page < meta.totalPages
              : calculatedOffset + items.length < totalItems,
        })
      } catch (error) {
        return handleCloudError(res, error)
      }
    }

    const where = search
      ? {
          OR: [
            { name: { contains: search } },
            { description: { contains: search } },
          ],
        }
      : {}

    const [items, total] = await Promise.all([
      prisma.skill.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        take: limit,
        skip: offset,
      }),
      prisma.skill.count({ where }),
    ])

    res.json({
      items,
      total,
      limit,
      offset,
      hasMore: offset + items.length < total,
    })
  } catch (error) {
    logger.error('List skills failed', { error })
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET /v1/skills/:id - Get skill by ID
router.get('/skills/:id', async (req: Request, res: Response) => {
  try {
    if (cloudApiEnabled) {
      const workspaceId = resolveWorkspaceId(req)
      const client = getBl1nkClient({
        token: getAuthToken(req),
        workspaceId,
        providerId: DEFAULT_PROVIDER_ID,
      })
      try {
        const skill = await client.skills.workspacesWorkspaceIdSkillsSkillIdGet({
          workspaceId,
          skillId: req.params.id,
        })
        return res.json(skill)
      } catch (error) {
        return handleCloudError(res, error)
      }
    }

    const skill = await prisma.skill.findUnique({
      where: { id: req.params.id },
    })

    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' })
    }

    res.json(skill)
  } catch (error) {
    logger.error('Get skill failed', { error })
    res.status(500).json({ error: 'Internal server error' })
  }
})

// POST /v1/skills - Create skill
router.post('/skills', async (req: Request, res: Response) => {
  try {
    const input = CreateSkillSchema.parse(req.body)

    if (cloudApiEnabled) {
      const workspaceId = resolveWorkspaceId(req)
      const client = getBl1nkClient({
        token: getAuthToken(req),
        workspaceId,
        providerId: DEFAULT_PROVIDER_ID,
      })
      try {
        const skill = await client.skills.workspacesWorkspaceIdSkillsPost({
          workspaceId,
          createSkillRequest: {
            name: input.name,
            description: input.description ?? undefined,
            content: input.content,
          },
        })
        logger.info('Created cloud skill', { id: skill.id, name: skill.name })
        return res.status(201).json(skill)
      } catch (error) {
        return handleCloudError(res, error)
      }
    }

    const skill = await prisma.skill.create({
      data: {
        name: input.name,
        description: input.description ?? null,
        content: input.content,
        version: 1,
        isPublic: false,
      },
    })

    await prisma.skillVersion.create({
      data: {
        skillId: skill.id,
        version: 1,
        content: input.content,
      },
    })

    logger.info('Created skill', { id: skill.id, name: skill.name })
    res.status(201).json(skill)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors })
    }
    logger.error('Create skill failed', { error })
    res.status(500).json({ error: 'Internal server error' })
  }
})

// PUT /v1/skills/:id - Update skill
router.put('/skills/:id', async (req: Request, res: Response) => {
  try {
    const updates = UpdateSkillSchema.parse(req.body)

    if (cloudApiEnabled) {
      const workspaceId = resolveWorkspaceId(req)
      const client = getBl1nkClient({
        token: getAuthToken(req),
        workspaceId,
        providerId: DEFAULT_PROVIDER_ID,
      })

      try {
        const skill = await client.skills.workspacesWorkspaceIdSkillsSkillIdPatch({
          workspaceId,
          skillId: req.params.id,
          updateSkillRequest: {
            name: updates.name,
            description: updates.description,
            content: updates.content,
            isPublic: updates.isPublic,
          },
        })

        logger.info('Updated cloud skill', { id: skill.id, version: skill.version })
        return res.json(skill)
      } catch (error) {
        return handleCloudError(res, error)
      }
    }

    const current = await prisma.skill.findUnique({
      where: { id: req.params.id },
    })

    if (!current) {
      return res.status(404).json({ error: 'Skill not found' })
    }

    const contentChanged = updates.content && updates.content !== current.content
    const newVersion = contentChanged ? current.version + 1 : current.version

    const skill = await prisma.skill.update({
      where: { id: req.params.id },
      data: {
        ...updates,
        version: newVersion,
      },
    })

    if (contentChanged && updates.content) {
      await prisma.skillVersion.create({
        data: {
          skillId: req.params.id,
          version: newVersion,
          content: updates.content,
        },
      })
    }

    logger.info('Updated skill', { id: skill.id, version: newVersion })
    res.json(skill)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors })
    }
    logger.error('Update skill failed', { error })
    res.status(500).json({ error: 'Internal server error' })
  }
})

// DELETE /v1/skills/:id - Delete skill
router.delete('/skills/:id', async (req: Request, res: Response) => {
  try {
    if (cloudApiEnabled) {
      const workspaceId = resolveWorkspaceId(req)
      const client = getBl1nkClient({
        token: getAuthToken(req),
        workspaceId,
        providerId: DEFAULT_PROVIDER_ID,
      })

      try {
        await client.skills.workspacesWorkspaceIdSkillsSkillIdDelete({
          workspaceId,
          skillId: req.params.id,
        })
        logger.info('Deleted cloud skill', { id: req.params.id })
        return res.json({ success: true })
      } catch (error) {
        return handleCloudError(res, error)
      }
    }

    const skill = await prisma.skill.findUnique({
      where: { id: req.params.id },
    })

    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' })
    }

    await prisma.skill.delete({
      where: { id: req.params.id },
    })

    logger.info('Deleted skill', { id: req.params.id })
    res.json({ success: true })
  } catch (error) {
    logger.error('Delete skill failed', { error })
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET /v1/skills/:id/versions - Get skill versions
router.get('/skills/:id/versions', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10

    if (cloudApiEnabled) {
      const workspaceId = resolveWorkspaceId(req)
      const client = getBl1nkClient({
        token: getAuthToken(req),
        workspaceId,
        providerId: DEFAULT_PROVIDER_ID,
      })

      try {
        const versions = await client.skills.workspacesWorkspaceIdSkillsSkillIdVersionsGet({
          workspaceId,
          skillId: req.params.id,
          limit,
        })
        return res.json(versions ?? [])
      } catch (error) {
        return handleCloudError(res, error)
      }
    }

    const skill = await prisma.skill.findUnique({
      where: { id: req.params.id },
    })

    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' })
    }

    const versions = await prisma.skillVersion.findMany({
      where: { skillId: req.params.id },
      orderBy: { version: 'desc' },
      take: limit,
    })

    res.json(versions)
  } catch (error) {
    logger.error('Get versions failed', { error })
    res.status(500).json({ error: 'Internal server error' })
  }
})

// POST /v1/skills/:id/restore - Restore skill version
router.post('/skills/:id/restore', async (req: Request, res: Response) => {
  try {
    if (cloudApiEnabled) {
      return res.status(501).json({ error: 'Restore not supported in cloud API yet' })
    }

    const { version } = req.body

    if (!version || typeof version !== 'number') {
      return res.status(400).json({ error: 'Version number required' })
    }

    const versionRecord = await prisma.skillVersion.findUnique({
      where: {
        skillId_version: { skillId: req.params.id, version },
      },
    })

    if (!versionRecord) {
      return res.status(404).json({ error: 'Version not found' })
    }

    const current = await prisma.skill.findUnique({
      where: { id: req.params.id },
    })

    if (!current) {
      return res.status(404).json({ error: 'Skill not found' })
    }

    const newVersion = current.version + 1

    const skill = await prisma.skill.update({
      where: { id: req.params.id },
      data: {
        content: versionRecord.content,
        version: newVersion,
      },
    })

    await prisma.skillVersion.create({
      data: {
        skillId: req.params.id,
        version: newVersion,
        content: versionRecord.content,
      },
    })

    logger.info('Restored skill version', { skillId: req.params.id, version: newVersion })
    res.json(skill)
  } catch (error) {
    logger.error('Restore version failed', { error })
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET /v1/chat/status - Chat status
router.get('/chat/status', async (req: Request, res: Response) => {
  res.json({ ready: false, reason: 'Use tRPC endpoint for chat' })
})

// POST /v1/chat/send - Send chat message
router.post('/chat/send', async (req: Request, res: Response) => {
  res.status(501).json({ error: 'Use tRPC endpoint for chat functionality' })
})

export default router

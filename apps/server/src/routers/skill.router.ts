import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import { Context } from '../context'
import {
  CreateSkillInput,
  UpdateSkillInput,
  ListSkillsInput,
  GetSkillVersionsInput,
} from '@claude-builder/shared'
import { NotFoundError, handleError } from '../utils/errors'
import { logger } from '../utils/logger'

const t = initTRPC.context<Context>().create()

/**
 * Skill Router
 *
 * Handles all skill CRUD operations with:
 * - Shared schema validation
 * - Automatic version history tracking
 * - Proper error handling
 * - Logging for debugging
 */
export const skillRouter = t.router({
  /**
   * List all skills with optional search and pagination.
   */
  list: t.procedure.input(ListSkillsInput).query(async ({ ctx, input }) => {
    try {
      const { search, limit, offset, sortBy, sortOrder } = input

      const where = search
        ? {
            OR: [
              { name: { contains: search } },
              { description: { contains: search } },
            ],
          }
        : {}

      const [items, total] = await Promise.all([
        ctx.prisma.skill.findMany({
          where,
          orderBy: { [sortBy]: sortOrder },
          take: limit,
          skip: offset,
        }),
        ctx.prisma.skill.count({ where }),
      ])

      logger.debug('Listed skills', { count: items.length, total, search })

      return {
        items,
        total,
        limit,
        offset,
        hasMore: offset + items.length < total,
      }
    } catch (error) {
      throw handleError(error)
    }
  }),

  /**
   * Get a single skill by ID.
   */
  getById: t.procedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      try {
        const skill = await ctx.prisma.skill.findUnique({
          where: { id: input.id },
        })

        if (!skill) {
          throw new NotFoundError('Skill', input.id)
        }

        logger.debug('Retrieved skill', { id: input.id, name: skill.name })
        return skill
      } catch (error) {
        throw handleError(error)
      }
    }),

  /**
   * Create a new skill.
   */
  create: t.procedure.input(CreateSkillInput).mutation(async ({ ctx, input }) => {
    try {
      const skill = await ctx.prisma.skill.create({
        data: {
          name: input.name,
          description: input.description ?? null,
          content: input.content,
          version: 1,
          isPublic: false,
        },
      })

      // Create initial version record
      await ctx.prisma.skillVersion.create({
        data: {
          skillId: skill.id,
          version: 1,
          content: input.content,
        },
      })

      logger.info('Created skill', { id: skill.id, name: skill.name })
      return skill
    } catch (error) {
      throw handleError(error)
    }
  }),

  /**
   * Update an existing skill.
   * Creates a new version if content changes.
   */
  update: t.procedure.input(UpdateSkillInput).mutation(async ({ ctx, input }) => {
    try {
      const { id, ...updates } = input

      // Get current skill to check for content changes
      const current = await ctx.prisma.skill.findUnique({
        where: { id },
      })

      if (!current) {
        throw new NotFoundError('Skill', id)
      }

      // Check if content is changing
      const contentChanged = updates.content && updates.content !== current.content
      const newVersion = contentChanged ? current.version + 1 : current.version

      // Update skill
      const skill = await ctx.prisma.skill.update({
        where: { id },
        data: {
          ...updates,
          version: newVersion,
        },
      })

      // Create version record if content changed
      if (contentChanged && updates.content) {
        await ctx.prisma.skillVersion.create({
          data: {
            skillId: id,
            version: newVersion,
            content: updates.content,
          },
        })
        logger.info('Created skill version', { skillId: id, version: newVersion })
      }

      logger.info('Updated skill', { id, name: skill.name, version: newVersion })
      return skill
    } catch (error) {
      throw handleError(error)
    }
  }),

  /**
   * Delete a skill and all its versions.
   */
  delete: t.procedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      try {
        // Check if skill exists
        const skill = await ctx.prisma.skill.findUnique({
          where: { id: input.id },
        })

        if (!skill) {
          throw new NotFoundError('Skill', input.id)
        }

        // Delete skill (versions cascade due to onDelete: Cascade)
        await ctx.prisma.skill.delete({
          where: { id: input.id },
        })

        logger.info('Deleted skill', { id: input.id, name: skill.name })
        return { success: true }
      } catch (error) {
        throw handleError(error)
      }
    }),

  /**
   * Get version history for a skill.
   */
  getVersions: t.procedure
    .input(GetSkillVersionsInput)
    .query(async ({ ctx, input }) => {
      try {
        const { skillId, limit } = input

        // Check if skill exists
        const skill = await ctx.prisma.skill.findUnique({
          where: { id: skillId },
        })

        if (!skill) {
          throw new NotFoundError('Skill', skillId)
        }

        const versions = await ctx.prisma.skillVersion.findMany({
          where: { skillId },
          orderBy: { version: 'desc' },
          take: limit,
        })

        logger.debug('Retrieved skill versions', {
          skillId,
          count: versions.length,
        })

        return versions
      } catch (error) {
        throw handleError(error)
      }
    }),

  /**
   * Restore a skill to a previous version.
   */
  restoreVersion: t.procedure
    .input(
      z.object({
        skillId: z.string().cuid(),
        version: z.number().int().positive(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { skillId, version } = input

        // Get the version to restore
        const versionRecord = await ctx.prisma.skillVersion.findUnique({
          where: {
            skillId_version: { skillId, version },
          },
        })

        if (!versionRecord) {
          throw new NotFoundError('SkillVersion', `${skillId}:${version}`)
        }

        // Get current skill
        const current = await ctx.prisma.skill.findUnique({
          where: { id: skillId },
        })

        if (!current) {
          throw new NotFoundError('Skill', skillId)
        }

        // Update skill with restored content (creates new version)
        const newVersion = current.version + 1

        const skill = await ctx.prisma.skill.update({
          where: { id: skillId },
          data: {
            content: versionRecord.content,
            version: newVersion,
          },
        })

        // Create version record for the restore
        await ctx.prisma.skillVersion.create({
          data: {
            skillId,
            version: newVersion,
            content: versionRecord.content,
          },
        })

        logger.info('Restored skill version', {
          skillId,
          fromVersion: version,
          toVersion: newVersion,
        })

        return skill
      } catch (error) {
        throw handleError(error)
      }
    }),
})

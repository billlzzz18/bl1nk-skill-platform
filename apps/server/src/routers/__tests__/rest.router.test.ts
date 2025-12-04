import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import request from 'supertest'
import express, { Express } from 'express'
import router from '../rest.router'

// Mock dependencies
jest.mock('../../services/bl1nkCloud.client', () => ({
  getBl1nkClient: jest.fn(),
  CLOUD_WORKSPACE_ID: 'test-workspace-id',
}))

jest.mock('../../utils/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}))

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    skill: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    skillVersion: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  })),
}))

describe('REST Router - Skills Endpoint', () => {
  let app: Express

  beforeEach(() => {
    app = express()
    app.use(express.json())
    app.use('/v1', router)
    jest.clearAllMocks()
  })

  describe('GET /v1/skills - Pagination', () => {
    it('should calculate hasMore correctly with cloud API pagination', async () => {
      const { getBl1nkClient } = await import('../../services/bl1nkCloud.client')
      const mockClient = {
        skills: {
          workspacesWorkspaceIdSkillsGet: jest.fn().mockResolvedValue({
            data: [
              { id: '1', name: 'Skill 1' },
              { id: '2', name: 'Skill 2' },
            ],
            meta: {
              page: 1,
              perPage: 2,
              totalPages: 3,
              totalItems: 6,
            },
          }),
        },
      }

      ;(getBl1nkClient as jest.Mock).mockReturnValue(mockClient)

      // Set cloud API enabled
      process.env.USE_BL1NK_CLOUD = 'true'

      const response = await request(app)
        .get('/v1/skills')
        .query({ limit: 2, offset: 0 })

      expect(response.status).toBe(200)
      expect(response.body).toMatchObject({
        items: expect.any(Array),
        total: 6,
        limit: 2,
        offset: 0,
        hasMore: true, // page 1 < totalPages 3
      })
    })

    it('should calculate hasMore as false on last page', async () => {
      const { getBl1nkClient } = await import('../../services/bl1nkCloud.client')
      const mockClient = {
        skills: {
          workspacesWorkspaceIdSkillsGet: jest.fn().mockResolvedValue({
            data: [
              { id: '5', name: 'Skill 5' },
              { id: '6', name: 'Skill 6' },
            ],
            meta: {
              page: 3,
              perPage: 2,
              totalPages: 3,
              totalItems: 6,
            },
          }),
        },
      }

      ;(getBl1nkClient as jest.Mock).mockReturnValue(mockClient)

      process.env.USE_BL1NK_CLOUD = 'true'

      const response = await request(app)
        .get('/v1/skills')
        .query({ limit: 2, offset: 4 })

      expect(response.status).toBe(200)
      expect(response.body).toMatchObject({
        items: expect.any(Array),
        total: 6,
        limit: 2,
        offset: 4,
        hasMore: false, // page 3 === totalPages 3
      })
    })

    it('should pass sortBy and sortOrder to cloud API', async () => {
      const { getBl1nkClient } = await import('../../services/bl1nkCloud.client')
      const mockGet = jest.fn().mockResolvedValue({
        data: [],
        meta: { page: 1, perPage: 50, totalPages: 1, totalItems: 0 },
      })

      const mockClient = {
        skills: {
          workspacesWorkspaceIdSkillsGet: mockGet,
        },
      }

      ;(getBl1nkClient as jest.Mock).mockReturnValue(mockClient)

      process.env.USE_BL1NK_CLOUD = 'true'

      await request(app)
        .get('/v1/skills')
        .query({ sortBy: 'name', sortOrder: 'asc' })

      expect(mockGet).toHaveBeenCalledWith(
        expect.objectContaining({
          sortBy: 'name',
          sortOrder: 'asc',
        })
      )
    })

    it('should use default sort parameters when not provided', async () => {
      const { getBl1nkClient } = await import('../../services/bl1nkCloud.client')
      const mockGet = jest.fn().mockResolvedValue({
        data: [],
        meta: { page: 1, perPage: 50, totalPages: 1, totalItems: 0 },
      })

      const mockClient = {
        skills: {
          workspacesWorkspaceIdSkillsGet: mockGet,
        },
      }

      ;(getBl1nkClient as jest.Mock).mockReturnValue(mockClient)

      process.env.USE_BL1NK_CLOUD = 'true'

      await request(app).get('/v1/skills')

      expect(mockGet).toHaveBeenCalledWith(
        expect.objectContaining({
          sortBy: 'createdAt',
          sortOrder: 'desc',
        })
      )
    })

    it('should handle fallback pagination when meta is incomplete', async () => {
      const { getBl1nkClient } = await import('../../services/bl1nkCloud.client')
      const mockClient = {
        skills: {
          workspacesWorkspaceIdSkillsGet: jest.fn().mockResolvedValue({
            data: [
              { id: '1', name: 'Skill 1' },
              { id: '2', name: 'Skill 2' },
            ],
            meta: {
              // Missing page and totalPages
              perPage: 2,
              totalItems: 10,
            },
          }),
        },
      }

      ;(getBl1nkClient as jest.Mock).mockReturnValue(mockClient)

      process.env.USE_BL1NK_CLOUD = 'true'

      const response = await request(app)
        .get('/v1/skills')
        .query({ limit: 2, offset: 0 })

      expect(response.status).toBe(200)
      expect(response.body).toMatchObject({
        items: expect.any(Array),
        total: 10,
        hasMore: true, // 0 + 2 < 10
      })
    })
  })
})

import { CreateExpressContextOptions } from '@trpc/server/adapters/express'
import { prisma } from './db/client.js'

/**
 * Creates the tRPC context for each request.
 *
 * Phase 1: SQLite-only storage (no Redis caching)
 * - prisma: SQLite database client for local storage
 * - req/res: Express request/response objects
 */
export const createContext = ({ req, res }: CreateExpressContextOptions) => {
  return {
    req,
    res,
    prisma,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>

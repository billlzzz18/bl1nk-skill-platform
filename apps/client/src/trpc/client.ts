import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@claude-builder/server/src/routers/_app'

/**
 * tRPC React Client
 *
 * This creates a type-safe tRPC client that:
 * - Infers types from the server's AppRouter
 * - Integrates with React Query for data fetching
 * - Provides hooks like trpc.skill.list.useQuery()
 *
 * The AppRouter type import enables full type inference
 * across the client-server boundary.
 */
export const trpc = createTRPCReact<AppRouter>()

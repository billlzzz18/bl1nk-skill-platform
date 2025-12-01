import { initTRPC } from '@trpc/server'
import { Context } from '../context'
import { skillRouter } from './skill.router'
import { credentialRouter } from './credential.router'
import { settingsRouter } from './settings.router'
import { chatRouter } from './chat.router'

const t = initTRPC.context<Context>().create()

/**
 * Root tRPC Router
 *
 * Combines all feature routers into a single app router.
 * The AppRouter type is exported for client-side type inference.
 */
export const appRouter = t.router({
  skill: skillRouter,
  credential: credentialRouter,
  settings: settingsRouter,
  chat: chatRouter,
})

export type AppRouter = typeof appRouter

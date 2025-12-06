import { initTRPC } from '@trpc/server'
import { Context } from '../context.js'
import { skillRouter } from './skill.router.js'
import { credentialRouter } from './credential.router.js'
import { settingsRouter } from './settings.router.js'
import { chatRouter } from './chat.router.js'

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

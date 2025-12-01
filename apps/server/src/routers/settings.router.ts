import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import { Context } from '../context'
import { settingsService } from '../services/settings.service'
import { handleError } from '../utils/errors'
import { logger } from '../utils/logger'
import type { AppSettingsMap, AppSettingKey } from '@claude-builder/shared'

const t = initTRPC.context<Context>().create()

/**
 * Settings Router
 *
 * Handles application settings with:
 * - Individual setting get/set
 * - Bulk settings update
 * - Settings reset to defaults
 */

const AppSettingKeySchema = z.enum([
  'activeProvider',
  'editorTheme',
  'autoSaveEnabled',
  'autoSaveIntervalMs',
])

export const settingsRouter = t.router({
  /**
   * Get all settings as a complete map.
   */
  getAll: t.procedure.query(async () => {
    try {
      const settings = await settingsService.getAll()
      logger.debug('Retrieved all settings')
      return settings
    } catch (error) {
      throw handleError(error)
    }
  }),

  /**
   * Get a single setting by key.
   */
  get: t.procedure
    .input(z.object({ key: AppSettingKeySchema }))
    .query(async ({ input }) => {
      try {
        const value = await settingsService.get(input.key as AppSettingKey)
        logger.debug('Retrieved setting', { key: input.key })
        return { key: input.key, value }
      } catch (error) {
        throw handleError(error)
      }
    }),

  /**
   * Update a single setting.
   */
  set: t.procedure
    .input(
      z.object({
        key: AppSettingKeySchema,
        value: z.union([z.string(), z.number(), z.boolean(), z.null()]),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await settingsService.set(
          input.key as AppSettingKey,
          input.value as AppSettingsMap[AppSettingKey]
        )
        logger.info('Updated setting', { key: input.key })
        return { success: true, key: input.key }
      } catch (error) {
        throw handleError(error)
      }
    }),

  /**
   * Update multiple settings at once.
   */
  updateMany: t.procedure
    .input(
      z.object({
        activeProvider: z.enum(['bedrock', 'openrouter']).nullable().optional(),
        editorTheme: z.enum(['vs-dark', 'vs-light', 'hc-black']).optional(),
        autoSaveEnabled: z.boolean().optional(),
        autoSaveIntervalMs: z.number().min(5000).max(300000).optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Filter out undefined values
        const updates: Partial<AppSettingsMap> = {}
        if (input.activeProvider !== undefined) {
          updates.activeProvider = input.activeProvider
        }
        if (input.editorTheme !== undefined) {
          updates.editorTheme = input.editorTheme
        }
        if (input.autoSaveEnabled !== undefined) {
          updates.autoSaveEnabled = input.autoSaveEnabled
        }
        if (input.autoSaveIntervalMs !== undefined) {
          updates.autoSaveIntervalMs = input.autoSaveIntervalMs
        }

        await settingsService.update(updates)
        logger.info('Updated multiple settings', { keys: Object.keys(updates) })

        return { success: true, updatedKeys: Object.keys(updates) }
      } catch (error) {
        throw handleError(error)
      }
    }),

  /**
   * Reset a single setting to its default value.
   */
  reset: t.procedure
    .input(z.object({ key: AppSettingKeySchema }))
    .mutation(async ({ input }) => {
      try {
        await settingsService.reset(input.key as AppSettingKey)
        logger.info('Reset setting to default', { key: input.key })
        return { success: true, key: input.key }
      } catch (error) {
        throw handleError(error)
      }
    }),

  /**
   * Reset all settings to defaults.
   */
  resetAll: t.procedure.mutation(async () => {
    try {
      await settingsService.resetAll()
      logger.info('Reset all settings to defaults')
      return { success: true }
    } catch (error) {
      throw handleError(error)
    }
  }),
})

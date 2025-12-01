import { prisma } from '../db/client'
import type { AppSettingsMap, AppSettingKey } from '@claude-builder/shared'
import { logger } from '../utils/logger'

/**
 * Settings Service
 *
 * Manages application settings stored in SQLite.
 * Uses a key-value store pattern with type-safe accessors.
 *
 * Default values are used when settings don't exist,
 * avoiding the need for explicit initialization.
 */

// Default values for all settings
const DEFAULTS: AppSettingsMap = {
  activeProvider: null,
  editorTheme: 'vs-dark',
  autoSaveEnabled: true,
  autoSaveIntervalMs: 30000, // 30 seconds
}

/**
 * Serializes a setting value to string for database storage.
 */
function serialize(value: unknown): string {
  return JSON.stringify(value)
}

/**
 * Deserializes a string from database to the typed value.
 */
function deserialize<T>(value: string): T {
  return JSON.parse(value) as T
}

/**
 * Gets a single setting by key.
 * Returns the default value if not set.
 *
 * @example
 * const theme = await getSetting('editorTheme')
 * // Returns: 'vs-dark' (default) or stored value
 */
export async function getSetting<K extends AppSettingKey>(
  key: K
): Promise<AppSettingsMap[K]> {
  try {
    const setting = await prisma.appSettings.findUnique({
      where: { key },
    })

    if (!setting) {
      return DEFAULTS[key]
    }

    return deserialize<AppSettingsMap[K]>(setting.value)
  } catch (error) {
    logger.errorWithStack(`Failed to get setting: ${key}`, error)
    return DEFAULTS[key]
  }
}

/**
 * Sets a single setting.
 * Creates or updates the setting in the database.
 *
 * @example
 * await setSetting('editorTheme', 'vs-light')
 */
export async function setSetting<K extends AppSettingKey>(
  key: K,
  value: AppSettingsMap[K]
): Promise<void> {
  try {
    await prisma.appSettings.upsert({
      where: { key },
      update: { value: serialize(value) },
      create: { key, value: serialize(value) },
    })

    logger.debug(`Setting updated: ${key}`, { value })
  } catch (error) {
    logger.errorWithStack(`Failed to set setting: ${key}`, error)
    throw error
  }
}

/**
 * Gets all settings as a complete map.
 * Missing settings use default values.
 *
 * @example
 * const settings = await getAllSettings()
 * // Returns: { activeProvider: null, editorTheme: 'vs-dark', ... }
 */
export async function getAllSettings(): Promise<AppSettingsMap> {
  try {
    const settings = await prisma.appSettings.findMany()

    const result = { ...DEFAULTS }

    for (const setting of settings) {
      const key = setting.key as AppSettingKey
      if (key in DEFAULTS) {
        result[key] = deserialize(setting.value)
      }
    }

    return result
  } catch (error) {
    logger.errorWithStack('Failed to get all settings', error)
    return DEFAULTS
  }
}

/**
 * Updates multiple settings at once.
 * Only updates provided keys, leaves others unchanged.
 *
 * @example
 * await updateSettings({
 *   editorTheme: 'vs-light',
 *   autoSaveEnabled: false
 * })
 */
export async function updateSettings(
  updates: Partial<AppSettingsMap>
): Promise<void> {
  try {
    const operations = Object.entries(updates).map(([key, value]) =>
      prisma.appSettings.upsert({
        where: { key },
        update: { value: serialize(value) },
        create: { key, value: serialize(value) },
      })
    )

    await prisma.$transaction(operations)

    logger.debug('Settings updated', { keys: Object.keys(updates) })
  } catch (error) {
    logger.errorWithStack('Failed to update settings', error)
    throw error
  }
}

/**
 * Resets a setting to its default value.
 *
 * @example
 * await resetSetting('editorTheme')
 */
export async function resetSetting<K extends AppSettingKey>(
  key: K
): Promise<void> {
  try {
    await prisma.appSettings.delete({
      where: { key },
    }).catch(() => {
      // Ignore if setting doesn't exist
    })

    logger.debug(`Setting reset to default: ${key}`)
  } catch (error) {
    logger.errorWithStack(`Failed to reset setting: ${key}`, error)
    throw error
  }
}

/**
 * Resets all settings to defaults.
 * Use with caution in production.
 */
export async function resetAllSettings(): Promise<void> {
  try {
    await prisma.appSettings.deleteMany()
    logger.info('All settings reset to defaults')
  } catch (error) {
    logger.errorWithStack('Failed to reset all settings', error)
    throw error
  }
}

// Export the service as an object for dependency injection patterns
export const settingsService = {
  get: getSetting,
  set: setSetting,
  getAll: getAllSettings,
  update: updateSettings,
  reset: resetSetting,
  resetAll: resetAllSettings,
}

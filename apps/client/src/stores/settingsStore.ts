import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { AppSettingsMap } from '@claude-builder/shared'

/**
 * Settings Store
 *
 * Manages application settings on the client side:
 * - Editor theme preference
 * - Auto-save configuration
 * - Active API provider
 *
 * Settings are persisted locally and synced with the server.
 */

interface SettingsStoreState {
  // Settings values
  settings: AppSettingsMap

  // Sync state
  isSyncing: boolean
  lastSyncedAt: Date | null

  // Actions
  updateSettings: (updates: Partial<AppSettingsMap>) => void
  setSettings: (settings: AppSettingsMap) => void
  setSyncing: (syncing: boolean) => void
}

const DEFAULT_SETTINGS: AppSettingsMap = {
  activeProvider: null,
  editorTheme: 'vs-dark',
  autoSaveEnabled: true,
  autoSaveIntervalMs: 30000,
}

export const useSettingsStore = create<SettingsStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        settings: DEFAULT_SETTINGS,
        isSyncing: false,
        lastSyncedAt: null,

        // Actions
        updateSettings: (updates) => {
          set((state) => ({
            settings: { ...state.settings, ...updates },
          }))
        },

        setSettings: (settings) => {
          set({
            settings,
            lastSyncedAt: new Date(),
          })
        },

        setSyncing: (syncing) => {
          set({ isSyncing: syncing })
        },
      }),
      {
        name: 'settings-store',
      }
    ),
    { name: 'SettingsStore' }
  )
)

/**
 * Selector hooks for specific settings.
 */
export const useEditorTheme = () =>
  useSettingsStore((state) => state.settings.editorTheme)

export const useActiveProvider = () =>
  useSettingsStore((state) => state.settings.activeProvider)

export const useAutoSaveEnabled = () =>
  useSettingsStore((state) => state.settings.autoSaveEnabled)

export const useAutoSaveInterval = () =>
  useSettingsStore((state) => state.settings.autoSaveIntervalMs)

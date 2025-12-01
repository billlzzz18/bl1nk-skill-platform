import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { Skill, CreateSkillInput, UpdateSkillInput } from '@claude-builder/shared'

/**
 * Skill Store
 *
 * Manages client-side state for skills:
 * - Currently selected skill for editing
 * - Optimistic updates while saving
 * - Draft content before save
 *
 * Uses Zustand with:
 * - devtools: Redux DevTools integration for debugging
 * - persist: Saves selected skill ID to localStorage
 */

interface SkillStoreState {
  // Currently selected skill ID
  selectedSkillId: string | null

  // Draft content (unsaved changes)
  draftContent: string | null
  isDirty: boolean

  // UI state
  isEditorLoading: boolean

  // Actions
  selectSkill: (skillId: string | null) => void
  setDraftContent: (content: string) => void
  clearDraft: () => void
  setEditorLoading: (loading: boolean) => void
}

export const useSkillStore = create<SkillStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        selectedSkillId: null,
        draftContent: null,
        isDirty: false,
        isEditorLoading: false,

        // Actions
        selectSkill: (skillId) => {
          // Clear draft when selecting a different skill
          const currentId = get().selectedSkillId
          if (currentId !== skillId) {
            set({
              selectedSkillId: skillId,
              draftContent: null,
              isDirty: false,
            })
          }
        },

        setDraftContent: (content) => {
          set({
            draftContent: content,
            isDirty: true,
          })
        },

        clearDraft: () => {
          set({
            draftContent: null,
            isDirty: false,
          })
        },

        setEditorLoading: (loading) => {
          set({ isEditorLoading: loading })
        },
      }),
      {
        name: 'skill-store',
        // Only persist the selected skill ID
        partialize: (state) => ({ selectedSkillId: state.selectedSkillId }),
      }
    ),
    { name: 'SkillStore' }
  )
)

/**
 * Selector hooks for specific state slices.
 * Using selectors prevents unnecessary re-renders.
 */
export const useSelectedSkillId = () =>
  useSkillStore((state) => state.selectedSkillId)

export const useDraftContent = () =>
  useSkillStore((state) => state.draftContent)

export const useIsDirty = () =>
  useSkillStore((state) => state.isDirty)

export const useIsEditorLoading = () =>
  useSkillStore((state) => state.isEditorLoading)

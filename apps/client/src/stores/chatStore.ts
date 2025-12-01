import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

/**
 * Chat Store
 *
 * Manages the skill testing chat interface:
 * - Current session ID
 * - Message history
 * - Streaming state
 * - Error handling
 *
 * Messages are NOT persisted to localStorage as they're
 * stored in the database via the server.
 */

interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  createdAt: Date
}

interface ChatStoreState {
  // Session state
  sessionId: string | null
  skillId: string | null

  // Messages
  messages: ChatMessage[]

  // Streaming state
  isStreaming: boolean
  streamingContent: string

  // Error state
  error: string | null

  // Actions
  startSession: (skillId: string) => void
  endSession: () => void
  addMessage: (message: ChatMessage) => void
  setMessages: (messages: ChatMessage[]) => void
  clearMessages: () => void
  setStreaming: (streaming: boolean) => void
  appendStreamingContent: (content: string) => void
  finalizeStreamingMessage: () => void
  setError: (error: string | null) => void
}

/**
 * Generates a unique session ID.
 */
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

export const useChatStore = create<ChatStoreState>()(
  devtools(
    (set, get) => ({
      // Initial state
      sessionId: null,
      skillId: null,
      messages: [],
      isStreaming: false,
      streamingContent: '',
      error: null,

      // Actions
      startSession: (skillId) => {
        set({
          sessionId: generateSessionId(),
          skillId,
          messages: [],
          error: null,
        })
      },

      endSession: () => {
        set({
          sessionId: null,
          skillId: null,
          messages: [],
          isStreaming: false,
          streamingContent: '',
          error: null,
        })
      },

      addMessage: (message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }))
      },

      setMessages: (messages) => {
        set({ messages })
      },

      clearMessages: () => {
        set({ messages: [] })
      },

      setStreaming: (streaming) => {
        set({
          isStreaming: streaming,
          streamingContent: streaming ? '' : get().streamingContent,
        })
      },

      appendStreamingContent: (content) => {
        set((state) => ({
          streamingContent: state.streamingContent + content,
        }))
      },

      finalizeStreamingMessage: () => {
        const { streamingContent, messages } = get()
        if (streamingContent) {
          const assistantMessage: ChatMessage = {
            id: `msg_${Date.now()}`,
            role: 'assistant',
            content: streamingContent,
            createdAt: new Date(),
          }
          set({
            messages: [...messages, assistantMessage],
            streamingContent: '',
            isStreaming: false,
          })
        }
      },

      setError: (error) => {
        set({ error, isStreaming: false })
      },
    }),
    { name: 'ChatStore' }
  )
)

/**
 * Selector hooks for specific state slices.
 */
export const useMessages = () =>
  useChatStore((state) => state.messages)

export const useIsStreaming = () =>
  useChatStore((state) => state.isStreaming)

export const useStreamingContent = () =>
  useChatStore((state) => state.streamingContent)

export const useChatError = () =>
  useChatStore((state) => state.error)

export const useCurrentSession = () =>
  useChatStore((state) => ({
    sessionId: state.sessionId,
    skillId: state.skillId,
  }))

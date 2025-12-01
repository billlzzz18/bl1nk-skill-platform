/**
 * Chat Router Contract
 *
 * tRPC router definition for skill testing chat functionality.
 * This is a contract specification - implementation will follow this interface.
 *
 * Related Requirements:
 * - FR-012: Test skills by sending messages to Claude API
 * - FR-013: Display responses in chat-like interface
 * - FR-014: Support streaming responses
 * - FR-015: Preserve conversation history
 * - FR-016: Clear conversation and start fresh
 */

import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { observable } from '@trpc/server/observable'

// ============================================
// INPUT/OUTPUT SCHEMAS
// ============================================

export const MessageRole = z.enum(['user', 'assistant', 'system'])

export const MessageSchema = z.object({
  id: z.string().cuid(),
  sessionId: z.string(),
  role: MessageRole,
  content: z.string(),
  createdAt: z.date(),
})

export const SendMessageInput = z.object({
  skillId: z.string().cuid(),
  sessionId: z.string(), // Client-generated session ID
  content: z.string().min(1).max(10000),
})

export const StreamChunkSchema = z.object({
  type: z.enum(['content', 'error', 'done']),
  content: z.string().optional(),
  error: z.string().optional(),
})

export const TestSessionSchema = z.object({
  sessionId: z.string(),
  skillId: z.string().cuid(),
  skillName: z.string(),
  messages: z.array(MessageSchema),
  createdAt: z.date(),
})

// ============================================
// ROUTER DEFINITION
// ============================================

export const chatRouter = router({
  /**
   * Send a message and receive streaming response
   * Uses tRPC subscription for real-time streaming
   *
   * @input SendMessageInput
   * @returns Observable<StreamChunk>
   */
  sendMessage: publicProcedure
    .input(SendMessageInput)
    .subscription(({ input }) => {
      return observable<z.infer<typeof StreamChunkSchema>>((emit) => {
        // Implementation:
        // 1. Load skill by ID
        // 2. Load conversation history for session
        // 3. Get active API provider credentials
        // 4. Construct prompt with skill content + conversation + user message
        // 5. Call Claude API (Bedrock or OpenRouter) with streaming
        // 6. For each chunk: emit.next({ type: 'content', content: chunk })
        // 7. Save user message to TestMessage table
        // 8. Save assistant response to TestMessage table
        // 9. On complete: emit.next({ type: 'done' })
        // 10. On error: emit.next({ type: 'error', error: message })

        const streamResponse = async () => {
          try {
            // ... streaming implementation
            emit.next({ type: 'done' })
          } catch (error) {
            emit.next({
              type: 'error',
              error: error instanceof Error ? error.message : 'Unknown error',
            })
          }
          emit.complete()
        }

        streamResponse()

        return () => {
          // Cleanup: cancel streaming if subscription is unsubscribed
        }
      })
    }),

  /**
   * Send message without streaming (fallback)
   * Returns complete response after API call completes
   *
   * @input SendMessageInput
   * @returns { message: Message, response: Message }
   */
  sendMessageSync: publicProcedure
    .input(SendMessageInput)
    .mutation(async ({ input }) => {
      // Implementation:
      // Same as sendMessage but waits for complete response
      // Useful for testing or when streaming is unavailable
      return {
        message: {} as z.infer<typeof MessageSchema>,
        response: {} as z.infer<typeof MessageSchema>,
      }
    }),

  /**
   * Get conversation history for a session
   *
   * @input { sessionId: string }
   * @returns Message[]
   */
  getHistory: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      // Implementation: Fetch all messages for session, ordered by createdAt
      return [] as z.infer<typeof MessageSchema>[]
    }),

  /**
   * Clear conversation history for a session
   *
   * @input { sessionId: string }
   * @returns { success: boolean }
   */
  clearHistory: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .mutation(async ({ input }) => {
      // Implementation: Delete all TestMessage records for sessionId
      return { success: true }
    }),

  /**
   * List all test sessions (for session management)
   *
   * @returns TestSession[]
   */
  listSessions: publicProcedure.query(async () => {
    // Implementation:
    // 1. Group messages by sessionId
    // 2. Return session summaries with message count
    return [] as z.infer<typeof TestSessionSchema>[]
  }),

  /**
   * Delete a test session
   *
   * @input { sessionId: string }
   * @returns { success: boolean }
   */
  deleteSession: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .mutation(async ({ input }) => {
      // Implementation: Delete all messages for session
      return { success: true }
    }),

  /**
   * Get API status for testing
   * Checks if credentials are configured and valid
   *
   * @returns { ready: boolean, provider: string | null, error?: string }
   */
  getApiStatus: publicProcedure.query(async () => {
    // Implementation:
    // 1. Check if active provider is set
    // 2. Check if credentials exist for active provider
    // 3. Return status
    return {
      ready: false,
      provider: null as string | null,
      error: 'No API credentials configured' as string | undefined,
    }
  }),
})

export type ChatRouter = typeof chatRouter

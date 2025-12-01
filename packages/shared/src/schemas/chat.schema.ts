/**
 * Chat Zod Schemas
 *
 * Shared validation schemas for skill testing chat functionality.
 * Used by both client and server for type-safe validation.
 */

import { z } from 'zod'

// ============================================
// BASE SCHEMAS
// ============================================

export const MessageRole = z.enum(['user', 'assistant', 'system'])

export const MessageSchema = z.object({
  id: z.string().cuid(),
  sessionId: z.string(),
  role: MessageRole,
  content: z.string(),
  createdAt: z.date(),
})

export const TestSessionSchema = z.object({
  sessionId: z.string(),
  skillId: z.string().cuid(),
  skillName: z.string(),
  messageCount: z.number().int().min(0),
  createdAt: z.date(),
})

// ============================================
// INPUT SCHEMAS
// ============================================

export const SendMessageInput = z.object({
  skillId: z.string().cuid(),
  sessionId: z.string().min(1, 'Session ID is required'),
  content: z.string().min(1, 'Message content is required').max(10000, 'Message too long'),
})

export const GetHistoryInput = z.object({
  sessionId: z.string().min(1),
})

export const ClearHistoryInput = z.object({
  sessionId: z.string().min(1),
})

export const DeleteSessionInput = z.object({
  sessionId: z.string().min(1),
})

// ============================================
// OUTPUT SCHEMAS
// ============================================

export const StreamChunkSchema = z.object({
  type: z.enum(['content', 'error', 'done']),
  content: z.string().optional(),
  error: z.string().optional(),
})

export const ApiStatusSchema = z.object({
  ready: z.boolean(),
  provider: z.string().nullable(),
  error: z.string().optional(),
})

export const SendMessageResultSchema = z.object({
  message: MessageSchema,
  response: MessageSchema,
})

// ============================================
// TYPE EXPORTS
// ============================================

export type MessageRoleType = z.infer<typeof MessageRole>
export type Message = z.infer<typeof MessageSchema>
export type TestSession = z.infer<typeof TestSessionSchema>
export type SendMessageInputType = z.infer<typeof SendMessageInput>
export type StreamChunk = z.infer<typeof StreamChunkSchema>
export type ApiStatus = z.infer<typeof ApiStatusSchema>
export type SendMessageResult = z.infer<typeof SendMessageResultSchema>

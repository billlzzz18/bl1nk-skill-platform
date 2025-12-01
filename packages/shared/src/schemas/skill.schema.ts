/**
 * Skill Zod Schemas
 *
 * Shared validation schemas for Skill entity.
 * Used by both client and server for type-safe validation.
 */

import { z } from 'zod'

// ============================================
// BASE SCHEMAS
// ============================================

export const SkillSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, 'Name is required').max(100, 'Name must be 100 characters or less'),
  description: z.string().max(500, 'Description must be 500 characters or less').nullable(),
  content: z.string().min(1, 'Content is required').max(50000, 'Content must be 50,000 characters or less'),
  version: z.number().int().positive(),
  isPublic: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const SkillVersionSchema = z.object({
  id: z.string().cuid(),
  skillId: z.string().cuid(),
  version: z.number().int().positive(),
  content: z.string(),
  createdAt: z.date(),
})

// ============================================
// INPUT SCHEMAS
// ============================================

export const CreateSkillInput = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().max(500).optional(),
  content: z.string().min(1, 'Content is required').max(50000),
})

export const UpdateSkillInput = z.object({
  id: z.string().cuid(),
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).nullable().optional(),
  content: z.string().min(1).max(50000).optional(),
  isPublic: z.boolean().optional(),
})

export const ListSkillsInput = z.object({
  search: z.string().optional(),
  sortBy: z.enum(['name', 'updatedAt', 'createdAt']).default('updatedAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  limit: z.number().int().min(1).max(100).default(50),
  offset: z.number().int().min(0).default(0),
})

export const GetSkillInput = z.object({
  id: z.string().cuid(),
})

export const GetSkillVersionsInput = z.object({
  skillId: z.string().cuid(),
  limit: z.number().int().min(1).max(50).default(10),
})

export const RestoreVersionInput = z.object({
  skillId: z.string().cuid(),
  version: z.number().int().positive(),
})

// ============================================
// OUTPUT SCHEMAS
// ============================================

export const SkillListOutput = z.object({
  skills: z.array(SkillSchema),
  total: z.number().int().min(0),
})

// ============================================
// TYPE EXPORTS
// ============================================

export type Skill = z.infer<typeof SkillSchema>
export type SkillVersion = z.infer<typeof SkillVersionSchema>
export type CreateSkillInputType = z.infer<typeof CreateSkillInput>
export type UpdateSkillInputType = z.infer<typeof UpdateSkillInput>
export type ListSkillsInputType = z.infer<typeof ListSkillsInput>
export type SkillListOutputType = z.infer<typeof SkillListOutput>

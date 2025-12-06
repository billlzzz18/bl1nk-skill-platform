# API Schemas

## Skill Schema

```typescript
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

export type Skill = z.infer<typeof SkillSchema>
```

## Skill Version Schema

```typescript
export const SkillVersionSchema = z.object({
  id: z.string().cuid(),
  skillId: z.string().cuid(),
  version: z.number().int().positive(),
  content: z.string(),
  createdAt: z.date(),
})
```

## Input Schemas

```typescript
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
```

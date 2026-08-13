# Skill Router API

The `skill` router handles all CRUD operations and version management for AI skills.

## Endpoints

### `list`
Lists all skills with optional search, sorting, and pagination.

**Input:**
```typescript
{
  search?: string;
  limit?: number;
  offset?: number;
  sortBy?: 'name' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}
```

**Output:**
```typescript
{
  items: Skill[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}
```

---

### `getById`
Retrieves a single skill by its unique ID.

**Input:**
```typescript
{ id: string } // CUID format
```

**Output:** `Skill` object.

---

### `create`
Creates a new skill and its initial version record.

**Input:**
```typescript
{
  name: string;
  description?: string;
  content: string;
}
```

**Output:** `Skill` object.

---

### `update`
Updates an existing skill. If the `content` is changed, a new version record is automatically created and the skill's version number is incremented.

**Input:**
```typescript
{
  id: string;
  name?: string;
  description?: string;
  content?: string;
}
```

**Output:** `Skill` object.

---

### `delete`
Deletes a skill and all its associated version history.

**Input:**
```typescript
{ id: string }
```

**Output:** `{ success: true }`

---

### `getVersions`
Retrieves the version history for a specific skill.

**Input:**
```typescript
{
  skillId: string;
  limit?: number;
}
```

**Output:** `SkillVersion[]`

---

### `restoreVersion`
Restores a skill to a previous version. This creates a *new* version with the content of the restored version.

**Input:**
```typescript
{
  skillId: string;
  version: number;
}
```

**Output:** `Skill` object (the updated skill with new version number).

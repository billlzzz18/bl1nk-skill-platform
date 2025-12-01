# Data Model: Skill Builder Core

**Date**: 2025-12-01
**Feature**: 001-skill-builder-core
**Database**: SQLite (via Prisma)

## Entity Relationship Diagram

```
┌─────────────────────┐       ┌─────────────────────┐
│       Skill         │       │    SkillVersion     │
├─────────────────────┤       ├─────────────────────┤
│ id (PK)             │──────<│ id (PK)             │
│ name                │       │ skillId (FK)        │
│ description         │       │ version             │
│ content             │       │ content             │
│ version             │       │ createdAt           │
│ isPublic            │       └─────────────────────┘
│ createdAt           │
│ updatedAt           │
└─────────────────────┘

┌─────────────────────┐       ┌─────────────────────┐
│   ApiCredential     │       │    TestMessage      │
├─────────────────────┤       ├─────────────────────┤
│ id (PK)             │       │ id (PK)             │
│ provider            │       │ sessionId           │
│ name                │       │ role                │
│ encryptedData       │       │ content             │
│ isActive            │       │ createdAt           │
│ createdAt           │       └─────────────────────┘
│ updatedAt           │
└─────────────────────┘

┌─────────────────────┐
│    AppSettings      │
├─────────────────────┤
│ id (PK)             │
│ key                 │
│ value               │
│ updatedAt           │
└─────────────────────┘
```

## Prisma Schema

```prisma
// prisma/schema.prisma

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL") // file:./skill-builder.db
}

generator client {
  provider = "prisma-client-js"
}

// ============================================
// SKILL MANAGEMENT
// ============================================

model Skill {
  id          String   @id @default(cuid())
  name        String
  description String?
  content     String   // The skill prompt/template content
  version     Int      @default(1)
  isPublic    Boolean  @default(false) // For Phase 2

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  versions    SkillVersion[]

  @@index([name])
  @@index([updatedAt])
}

model SkillVersion {
  id        String   @id @default(cuid())
  skillId   String
  version   Int
  content   String   // Snapshot of skill content at this version

  createdAt DateTime @default(now())

  // Relations
  skill     Skill    @relation(fields: [skillId], references: [id], onDelete: Cascade)

  @@unique([skillId, version])
  @@index([skillId])
}

// ============================================
// API CREDENTIALS
// ============================================

model ApiCredential {
  id            String   @id @default(cuid())
  provider      String   // "bedrock" | "openrouter"
  name          String   // User-friendly name, e.g., "My AWS Account"
  encryptedData String   // JSON encrypted with AES-256
  isActive      Boolean  @default(true)

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@unique([provider]) // Only one credential per provider in Phase 1
  @@index([provider])
}

// ============================================
// TEST SESSIONS (Ephemeral - session storage)
// ============================================

model TestMessage {
  id        String   @id @default(cuid())
  sessionId String   // Groups messages in a conversation
  role      String   // "user" | "assistant" | "system"
  content   String

  createdAt DateTime @default(now())

  @@index([sessionId])
  @@index([createdAt])
}

// ============================================
// APPLICATION SETTINGS
// ============================================

model AppSettings {
  id        String   @id @default(cuid())
  key       String   @unique
  value     String   // JSON serialized value

  updatedAt DateTime @updatedAt
}
```

## Entity Details

### Skill

Primary entity representing a Claude skill definition.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | string | PK, CUID | Unique identifier |
| name | string | required | Display name of the skill |
| description | string | optional | Brief description of what the skill does |
| content | string | required | The prompt template/skill definition |
| version | int | default: 1 | Current version number |
| isPublic | boolean | default: false | Public visibility (Phase 2) |
| createdAt | datetime | auto | Creation timestamp |
| updatedAt | datetime | auto | Last modification timestamp |

**Validation Rules (Zod)**:
- `name`: 1-100 characters, non-empty
- `description`: 0-500 characters
- `content`: 1-50000 characters (supports large prompts)

**State Transitions**:
- Draft → Saved (on first save)
- Saved → Updated (on edit, creates version)
- Saved → Deleted (on delete, cascade to versions)

### SkillVersion

Historical snapshots of skill content for version history.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | string | PK, CUID | Unique identifier |
| skillId | string | FK → Skill | Parent skill reference |
| version | int | required | Version number at snapshot |
| content | string | required | Content snapshot |
| createdAt | datetime | auto | When version was created |

**Retention Policy**: Keep last 10 versions per skill (per FR-009)

### ApiCredential

Encrypted storage for API provider credentials.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | string | PK, CUID | Unique identifier |
| provider | string | required, unique | "bedrock" or "openrouter" |
| name | string | required | User-friendly label |
| encryptedData | string | required | AES-256 encrypted JSON |
| isActive | boolean | default: true | Whether credential is active |
| createdAt | datetime | auto | Creation timestamp |
| updatedAt | datetime | auto | Last modification timestamp |

**Encrypted Data Structure**:
```typescript
// Bedrock provider
interface BedrockCredentials {
  accessKeyId: string
  secretAccessKey: string
  region: string
}

// OpenRouter provider
interface OpenRouterCredentials {
  apiKey: string
}
```

### TestMessage

Stores conversation history for skill testing sessions.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | string | PK, CUID | Unique identifier |
| sessionId | string | required | Groups messages in conversation |
| role | string | required | "user", "assistant", or "system" |
| content | string | required | Message content |
| createdAt | datetime | auto | When message was sent |

**Lifecycle**: Messages persist until session is cleared (FR-016)

### AppSettings

Key-value store for application configuration.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | string | PK, CUID | Unique identifier |
| key | string | unique | Setting key |
| value | string | required | JSON serialized value |
| updatedAt | datetime | auto | Last modification timestamp |

**Common Settings**:
- `activeProvider`: Current API provider ("bedrock" | "openrouter")
- `editorTheme`: Monaco editor theme preference
- `autoSaveEnabled`: Auto-save toggle

## Indexes

| Table | Index | Purpose |
|-------|-------|---------|
| Skill | name | Search by name |
| Skill | updatedAt | Sort by recent |
| SkillVersion | skillId | Load versions for skill |
| ApiCredential | provider | Lookup by provider type |
| TestMessage | sessionId | Load conversation |
| TestMessage | createdAt | Sort messages chronologically |

## Data Volume Assumptions

| Entity | Expected Count | Growth Rate |
|--------|---------------|-------------|
| Skill | ~100 per user | ~5/week |
| SkillVersion | ~1000 (10 per skill) | With edits |
| ApiCredential | 2 max (Phase 1) | Stable |
| TestMessage | ~1000 active | Cleared periodically |
| AppSettings | ~10 | Stable |

---

*Data model complete. See contracts/ for tRPC router definitions.*

# Research: Skill Builder Core

**Date**: 2025-12-01
**Feature**: 001-skill-builder-core
**Status**: Complete

## Overview

This document captures technical research and decisions for the Claude Skill Builder desktop application Phase 1 implementation.

---

## 1. Local Database Strategy (SQLite + Prisma)

### Decision
Use **SQLite with Prisma ORM** for local-first data storage.

### Rationale
- Zero-configuration, file-based database ideal for desktop apps
- Prisma provides type-safe database access aligned with Constitution Principle I
- Cross-platform compatibility (Windows/macOS/Linux)
- No external services required for development or distribution

### Alternatives Considered
| Alternative | Rejected Because |
|-------------|------------------|
| PostgreSQL | Requires external service, complicates distribution |
| LowDB/JSON files | No relational support, limited query capabilities |
| IndexedDB | Browser-only, not suitable for Electron main process |
| better-sqlite3 (raw) | Loses Prisma's type safety benefits |

### Implementation Notes
```typescript
// Database path strategy for cross-platform
import { app } from 'electron'
import path from 'path'

const DB_PATH = path.join(app.getPath('userData'), 'skill-builder.db')
// Prisma URL: file:${DB_PATH}
```

**Migration Strategy**:
- Use Prisma Migrate for schema changes
- Auto-backup before migrations in production builds
- Store migrations in version control

---

## 2. Credential Encryption Strategy

### Decision
Use **hybrid approach**: `node-keytar` (OS keychain) with fallback to AES-256 encrypted file storage.

### Rationale
- OS keychain provides hardware-backed security where available
- Fallback ensures functionality on all systems
- No plaintext credentials stored anywhere
- Aligns with FR-020 (AES-256 encryption requirement)

### Alternatives Considered
| Alternative | Rejected Because |
|-------------|------------------|
| Plain electron-store | No encryption by default |
| crypto-js only | No OS keychain integration, weaker than native |
| dotenv files | Plain text, security risk |
| keytar only | Fails on some Linux distros without keychain |

### Implementation Pattern
```typescript
// Primary: OS Keychain via keytar
await keytar.setPassword('skill-builder', 'aws-bedrock', encryptedCreds)

// Fallback: AES-256 encrypted file
import crypto from 'crypto'
const cipher = crypto.createCipher('aes-256-gcm', derivedKey)
```

### Security Notes
- Derive encryption key from machine-specific identifier
- Never log credentials (FR-021)
- Mask credentials in UI (show only last 4 chars)

---

## 3. AWS Bedrock Streaming Integration

### Decision
Use **@aws-sdk/client-bedrock-runtime** with `InvokeModelWithResponseStreamCommand` and tRPC subscriptions.

### Rationale
- Official AWS SDK with TypeScript support
- Native streaming support via AsyncIterator
- tRPC subscriptions enable real-time UI updates
- Aligns with FR-014 (streaming responses requirement)

### Alternatives Considered
| Alternative | Rejected Because |
|-------------|------------------|
| HTTP polling | Poor UX, delayed response display |
| WebSocket custom | Reinventing wheel, tRPC handles this |
| REST with long-polling | Inefficient, no true streaming |

### Implementation Pattern
```typescript
// Server: tRPC subscription with Bedrock streaming
import { InvokeModelWithResponseStreamCommand } from '@aws-sdk/client-bedrock-runtime'

const response = await bedrockClient.send(
  new InvokeModelWithResponseStreamCommand({
    modelId: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
    body: JSON.stringify({ prompt, max_tokens: 4096 }),
    contentType: 'application/json'
  })
)

for await (const event of response.body) {
  if (event.chunk) {
    const chunk = JSON.parse(new TextDecoder().decode(event.chunk.bytes))
    emit.next(chunk.completion)
  }
}
```

### Error Handling
- Retry with exponential backoff on transient errors
- Clear error messages for invalid credentials
- Timeout after 60 seconds (per spec edge case)

---

## 4. OpenRouter Integration

### Decision
Use **axios with streaming** for OpenRouter API, following OpenAI-compatible format.

### Rationale
- OpenRouter uses OpenAI-compatible API format
- Provides fallback when Bedrock unavailable
- Simpler authentication (single API key vs AWS credentials)
- Same streaming pattern as Bedrock

### Alternatives Considered
| Alternative | Rejected Because |
|-------------|------------------|
| openai SDK | Additional dependency, OpenRouter slight differences |
| fetch API | Less streaming support in Node.js |
| got | axios already in project, similar capabilities |

### Implementation Pattern
```typescript
const response = await axios.post(
  'https://openrouter.ai/api/v1/chat/completions',
  {
    model: 'anthropic/claude-3.5-sonnet',
    messages: [{ role: 'user', content: prompt }],
    stream: true
  },
  {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'skill-builder-desktop',
      'X-Title': 'Claude Skill Builder'
    },
    responseType: 'stream'
  }
)
```

### Rate Limiting
- Implement token bucket for request throttling
- Display rate limit errors with cooldown period (per spec)

---

## 5. Desktop Distribution Strategy

### Decision
Use **Electron** with embedded Next.js for Phase 1, evaluate Tauri for Phase 2.

### Rationale
- Mature ecosystem with proven patterns
- Reuse existing Next.js/React codebase
- Full Node.js API access (needed for keytar, Prisma)
- Fastest path to working desktop app

### Alternatives Considered
| Alternative | Rejected Because |
|-------------|------------------|
| Tauri | Requires Rust knowledge, smaller ecosystem |
| PWA | No native file system access, limited offline |
| NW.js | Less maintained than Electron |
| Local web server only | No native OS integration |

### Architecture
```
┌─────────────────────────────────────────┐
│            Electron Main Process        │
│  ┌─────────────────────────────────┐   │
│  │     Express + tRPC Server       │   │
│  │     (localhost:3001)            │   │
│  └─────────────────────────────────┘   │
│                  ↓                      │
│  ┌─────────────────────────────────┐   │
│  │     SQLite (Prisma)             │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
              ↕ IPC / HTTP
┌─────────────────────────────────────────┐
│         Electron Renderer Process       │
│  ┌─────────────────────────────────┐   │
│  │     Next.js App (React)         │   │
│  │     (localhost:3000)            │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Build Strategy
- Use `electron-builder` for packaging
- Separate builds for Windows (.exe), macOS (.dmg), Linux (.AppImage)
- Auto-update support via `electron-updater` (Phase 2)

---

## 6. Auto-Save Strategy

### Decision
Use **debounced local storage** with periodic SQLite sync.

### Rationale
- Meets SC-005 requirement (auto-save within 30 seconds)
- Prevents data loss on crash/refresh
- Minimal performance impact

### Implementation Pattern
```typescript
// Zustand store with persistence
const useSkillStore = create(
  persist(
    (set) => ({
      draft: null,
      setDraft: debounce((content) => set({ draft: content }), 5000),
      saveToDB: async (skill) => { /* SQLite save */ }
    }),
    { name: 'skill-draft', storage: createJSONStorage(() => localStorage) }
  )
)
```

### Recovery Flow
1. On app start, check for unsaved drafts
2. Prompt user to restore or discard
3. Clear draft after successful save

---

## Summary of Key Decisions

| Area | Decision | Key Benefit |
|------|----------|-------------|
| Database | SQLite + Prisma | Type-safe, zero-config |
| Credentials | keytar + AES-256 fallback | OS-level security |
| Bedrock Streaming | AWS SDK + tRPC subscriptions | Real-time responses |
| OpenRouter | axios streaming | Simple fallback provider |
| Desktop | Electron + Next.js | Rapid development |
| Auto-save | Debounced + persist | Data loss prevention |

---

*Research complete. Ready for Phase 1: Data Model & Contracts*

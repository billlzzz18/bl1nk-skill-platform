# Implementation Plan: Skill Builder Core

**Branch**: `001-skill-builder-core` | **Date**: 2025-12-01 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-skill-builder-core/spec.md`

## Summary

Build a desktop-first, single-user application for creating, editing, and testing Claude AI skills. Phase 1 focuses on core functionality without authentication: skill CRUD operations, API credential management (AWS Bedrock & OpenRouter), and a chat-based skill testing interface with streaming responses. Data stored locally using SQLite with encrypted credential storage.

## Technical Context

**Language/Version**: TypeScript 5.x (Node.js 20+ runtime)
**Primary Dependencies**: Next.js 15, React 19, tRPC, Prisma (SQLite adapter), Zustand, Monaco Editor
**Storage**: SQLite (local file-based) for Phase 1; PostgreSQL deferred to Phase 2
**Testing**: Vitest for unit tests, Playwright for E2E
**Target Platform**: Desktop (Windows/macOS/Linux) via Electron or web-based local server
**Project Type**: Web application (monorepo: apps/client + apps/server + packages/shared)
**Performance Goals**: Streaming response start < 3 seconds, UI responsiveness < 100ms
**Constraints**: Single-user mode, local storage only, no network auth required
**Scale/Scope**: Single user, ~100 skills per user, ~10 versions per skill

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify compliance with `.specify/memory/constitution.md`:

- [x] **End-to-End Type Safety**: Feature design includes Prisma schemas (SQLite), Zod validation, and typed tRPC procedures
- [x] **Monorepo Modularity**: Changes respect workspace boundaries (client/server/shared separation)
- [x] **API-First Design**: tRPC routers defined before frontend implementation
- [x] **Stateless Backend**: No session state in backend (single-user mode eliminates auth state)
- [x] **Incremental Translation**: N/A for Phase 1 (no AI translation tooling in core features)
- [x] **Testing Requirements**: Test strategy defined - Vitest for shared, Playwright for E2E critical paths
- [x] **Code Quality**: TypeScript strict mode, ESLint, structured JSON logging
- [x] **Breaking Changes**: N/A for Phase 1 (greenfield development)

## Project Structure

### Documentation (this feature)

```text
specs/001-skill-builder-core/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (tRPC router definitions)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
apps/
├── client/                    # Next.js 15 frontend
│   ├── src/
│   │   ├── app/              # App Router pages
│   │   │   ├── page.tsx      # Dashboard (skill list)
│   │   │   ├── skills/
│   │   │   │   ├── new/      # Create skill
│   │   │   │   └── [id]/     # Edit/test skill
│   │   │   └── settings/     # API credentials config
│   │   ├── components/
│   │   │   ├── ui/           # Base UI components (shadcn)
│   │   │   ├── skill/        # Skill editor, list, card
│   │   │   └── chat/         # Test chat interface
│   │   ├── store/            # Zustand stores
│   │   └── lib/              # Utilities, tRPC client
│   └── tests/
│       └── e2e/              # Playwright tests
│
├── server/                    # Node.js backend
│   ├── src/
│   │   ├── routers/          # tRPC routers
│   │   │   ├── _app.ts       # Root router
│   │   │   ├── skill.router.ts
│   │   │   ├── credential.router.ts
│   │   │   └── chat.router.ts
│   │   ├── services/         # Business logic
│   │   │   ├── skill.service.ts
│   │   │   ├── credential.service.ts
│   │   │   └── claude.service.ts
│   │   ├── context.ts        # tRPC context
│   │   └── index.ts          # Server entry
│   ├── prisma/
│   │   ├── schema.prisma     # SQLite schema
│   │   └── migrations/
│   └── tests/
│       └── integration/
│
└── packages/
    └── shared/               # Shared types and utilities
        ├── src/
        │   ├── types/        # Shared TypeScript types
        │   ├── schemas/      # Shared Zod schemas
        │   └── utils/        # Common utilities
        └── __tests__/
```

**Structure Decision**: Using existing monorepo structure with apps/client, apps/server, and packages/shared. This aligns with Constitution Principle II (Monorepo Modularity) and the existing CLAUDE.md guidance.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| SQLite instead of PostgreSQL | Phase 1 desktop app requires zero-config local storage | PostgreSQL requires external service, complicates desktop distribution |
| No Redis | Single-user mode has no caching requirements | Redis adds deployment complexity for local-only app |
| No Authentication (Phase 1) | Desktop single-user mode doesn't need multi-user auth | User requested deferral to focus on core features |

## Phase 0 Status

**Status**: ✅ COMPLETE
**Output**: [research.md](./research.md)
**Decisions Made**:
- SQLite + Prisma for local storage
- Hybrid credential encryption (keytar + AES-256)
- AWS SDK streaming with tRPC subscriptions
- Axios streaming for OpenRouter
- Electron for desktop distribution

## Phase 1 Status

**Status**: ✅ COMPLETE
**Outputs**:
- [data-model.md](./data-model.md) - Entity definitions and Prisma schema
- [contracts/skill.router.ts](./contracts/skill.router.ts) - Skill CRUD operations
- [contracts/credential.router.ts](./contracts/credential.router.ts) - API credential management
- [contracts/chat.router.ts](./contracts/chat.router.ts) - Chat/testing functionality
- [quickstart.md](./quickstart.md) - Developer quickstart guide

## Agent Context Update

**Status**: ✅ COMPLETE
**Updated**: CLAUDE.md with project-specific context
**Technologies Added**:
- TypeScript 5.x (Node.js 20+)
- Next.js 15, React 19, tRPC, Prisma (SQLite), Zustand, Monaco Editor
- SQLite for Phase 1 (PostgreSQL deferred)

---

*Planning complete. Next Step: Run `/speckit.tasks` to generate implementation tasks.*

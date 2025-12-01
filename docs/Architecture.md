# Claude Skill Builder – Architecture

## System Overview
- **Goal**: Desktop‑first tool for creating, editing, and testing Claude AI skills locally with single-user storage.
- **Monorepo**: Managed via pnpm workspaces (`apps/*`, `packages/*`, shared tooling at root).
- **Tech Stack**: Next.js 15 + React 19 frontend, Express + tRPC backend, Prisma ORM with SQLite persistence, Tailwind UI, Monaco editor, React Query.

```
┌─────────────┐      HTTP/tRPC       ┌──────────────┐        Prisma         ┌───────────────┐
│ Next.js App │ <──────────────────> │ tRPC Routers │ <───────────────────> │ SQLite (file) │
└─────────────┘                      └──────────────┘                        └───────────────┘
        ▲                                   ▲                                       ▲
        │         Shared types/schemas       │                Local services         │
        └───────────────────────────────────┴───────────────────────────────────────┘
```

## Workspace Layout
- `apps/client`: Next.js App Router project providing the UI (skill list, Monaco editor, chat panel, credential settings). Uses `src/trpc` hooks and shared utility modules.
- `apps/server`: Express server exposing tRPC routers (`skill`, `credential`, `settings`, `chat`). `src/services` encapsulate encryption, credential management, and Claude API calls.
- `packages/shared`: Zod schemas, types, and helpers imported by both client and server for end-to-end type safety.
- `specs/001-skill-builder-core`: Living specification, plan, and contracts guiding implementation priorities.

## Frontend Architecture (`apps/client`)
- **Entry**: `src/app/layout.tsx` wraps pages with `TRPCProvider` (React Query + tRPC client). `page.tsx` hosts the main dashboard.
- **State**: Local React state for editor/chat; React Query caches server data; future global UI state can live in `src/stores`.
- **Skill Workflow**: Sidebar lists skills via `trpc.skill.list.useQuery`; form + Monaco editor allow editing; saving triggers `create`/`update` mutations.
- **Chat Workflow**: Chat pane calls `trpc.chat.sendMessage` with the active skill content and displays streamed replies; readiness gate handled by `chat.status`.
- **Styling & Components**: Tailwind CSS baseline; dynamic import of Monaco prevents SSR issues; shared helpers in `src/lib`.

## Backend Architecture (`apps/server`)
- **Bootstrap**: `src/index.ts` loads env vars, validates encryption config, configures CORS/JSON, and mounts tRPC via `createExpressMiddleware`.
- **Context**: `src/context.ts` injects Prisma client (`src/db/client.ts`) per request; no session state (single-user mode).
- **Routers**:
  - `skill.router.ts`: CRUD + versioning using Prisma models `Skill` and `SkillVersion`.
  - `credential.router.ts`: Stores provider credentials (Bedrock/OpenRouter) encrypted via `encryption.service`.
  - `settings.router.ts`: App-level settings (e.g., default model) persisted in `AppSettings`.
  - `chat.router.ts`: Validates credential readiness, invokes Claude via `claude-service.ts`, logs interactions.
- **Services**:
  - `encryption.service.ts`: AES-256-GCM utilities; enforces presence of `ENCRYPTION_KEY`.
  - `credential.service.ts`: Provider-specific validation + secure storage helpers.
  - `claude-service.ts`: Wraps AWS Bedrock/OpenRouter SDK calls and maps responses to chat schema.
- **Data Layer**: Prisma schema (`apps/server/prisma/schema.prisma`) defines Skill, SkillVersion, ApiCredential, TestMessage, AppSettings tables backed by local SQLite file (`skill-builder.db`).
- **Logging & Errors**: Structured logger (`src/utils/logger.ts`) plus typed errors (`src/utils/errors.ts`) propagate to client via tRPC error formatter.

## Shared Contracts
- `packages/shared/src/schemas/*.schema.ts`: Zod inputs/outputs for skills, credentials, chat; re-exported via `packages/shared/src/index.ts`.
- Ensures compile-time safety between client/server (e.g., `CreateSkillInput`, `ChatMessageSchema`).

## Runtime Configuration
- `.env`/.env.example hold `API_PORT`, `DATABASE_URL`, `ENCRYPTION_KEY`, provider secrets.
- `apps/client` expects `NEXT_PUBLIC_API_URL` for cross-process communication; defaults to `http://localhost:3001`.
- Docker-compose can provision local dependencies (Postgres/Redis reserved for future phases).

## Data & Security Considerations
- SQLite file stored locally; future migration path to Postgres defined but deferred.
- Credentials encrypted at rest; plaintext never returned to client after save.
- CORS configured for local desktop use with credentials support; backend remains stateless.

## Build & Deploy Flow
1. `pnpm install` at root (bootstraps workspaces).
2. `pnpm dev` runs `pnpm -r dev` (Next.js + Express concurrently).
3. Prisma migrations via `pnpm --filter @claude-builder/server prisma:migrate`.
4. Future packaging: wrap Next.js + server in Electron / ship Docker for remote use.

## Future Enhancements
- Authentication & multi-user storage (phase 2).
- Model streaming responses with SSE/WebSocket bridging.
- Observability: request ids, persistent logs, metrics.
- Packaging/Electron integration for offline distribution.

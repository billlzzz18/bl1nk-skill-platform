# Claude Skill Builder – Architecture

## System Overview
- **Goal**: Desktop‑first tool for creating, editing, and testing Claude AI skills with multi-provider AI integration.
- **Monorepo**: Managed via pnpm workspaces (`apps/*`, `packages/*`, shared tooling at root).
- **Tech Stack**: Next.js 15 + React 19 frontend, Electron desktop wrapper, Express + tRPC backend, Drizzle ORM with SQLite (Phase 1) / Prisma + PostgreSQL + Redis (planned), Tailwind UI, Monaco editor, React Query.

```
┌──────────────┐      IPC/HTTP       ┌─────────────┐      tRPC/REST      ┌──────────────┐
│ Electron App │ <─────────────────> │  Next.js    │ <─────────────────> │ tRPC/Express │
│  (Desktop)   │                     │  Frontend   │                     │   Backend    │
└──────────────┘                     └─────────────┘                     └──────────────┘
                                            ▲                                    ▲
                                            │                                    │
                                            │         Shared types/schemas       │
                                            │                                    ▼
                                            │                            ┌──────────────┐
                                            │                            │ SQLite/Drizzle│
                                            │                            │ (Phase 1)    │
                                            │                            └──────────────┘
                                            │                                    │
                                            │                            ┌──────────────┐
                                            └────────────────────────────│ PostgreSQL + │
                                                                         │ Redis (Phase 2)│
                                                                         └──────────────┘
```

## Workspace Layout
- `apps/client`: Electron + Next.js 15 application providing the UI (skill list, Monaco editor, chat panel, credential settings, 500+ agent templates). Uses Jotai for state, TanStack Query for server state, and IPC for Electron communication.
- `apps/server`: Express + tRPC server exposing REST API v1 and tRPC routers (`skill`, `credential`, `rest`). Services handle encryption, credential management, and multi-provider AI integration (AWS Bedrock, OpenRouter, Anthropic, OpenAI, Google, LM Studio, Ollama).
- `packages/shared`: Zod schemas, types, MCP utilities, and helpers imported by both client and server for end-to-end type safety.
- `agents/`: 501 pre-configured agent JSON templates across coding, writing, translation, business, education, and creative domains.
- `skill/`: 15 skill categories with SKILL.md documentation and LICENSE.txt files.
- `specs/`: Feature specifications including OpenAPI 3.1 contract at `specs/main/openapi.yaml`.

## Frontend Architecture (`apps/client`)
- **Entry**: Electron main process bootstraps Next.js renderer. `src/app/layout.tsx` wraps pages with `TRPCProvider` (React Query + tRPC client).
- **State**: Jotai atoms for global state, React Query for server state, local React state for UI.
- **IPC Layer**: `src/ipc/` handles Electron IPC communication with abort controllers for stream cancellation.
- **Skill Workflow**: Sidebar lists skills via `trpc.skill.list.useQuery`; Monaco editor for editing; versioning with restore capability.
- **Agent System**: Browse and load 500+ pre-configured agent templates from JSON files.
- **Chat Workflow**: Multi-provider AI integration with streaming responses, context management, and file attachments.
- **Styling & Components**: Tailwind CSS 4.1, Radix UI primitives, Framer Motion animations, Monaco Editor 0.52.

## Backend Architecture (`apps/server`)
- **Bootstrap**: `src/index.ts` loads env vars, validates encryption config, configures CORS/JSON, mounts tRPC and REST API v1.
- **Context**: `src/context.ts` injects database client per request; single-user desktop mode (Phase 1).
- **Routers**:
  - `rest.router.ts`: REST API v1 at `/v1` with skills CRUD, versioning, and restore endpoints following OpenAPI spec.
  - `skill.router.ts`: tRPC CRUD + versioning using Drizzle/Prisma models `Skill` and `SkillVersion`.
  - `credential.router.ts`: Encrypted storage for AWS Bedrock, OpenRouter, Anthropic, OpenAI, Google, LM Studio, Ollama credentials.
- **Services**:
  - Multi-provider AI integration via Vercel AI SDK (@ai-sdk/*).
  - Encryption service with AES-256-GCM for credential security.
  - Model Context Protocol (MCP) SDK integration for tool-use capabilities.
- **Data Layer**: 
  - Phase 1: SQLite + Drizzle ORM (`apps/client/drizzle/`) for local desktop storage.
  - Planned: PostgreSQL + Prisma + Redis for cloud sync and multi-user support.
  - Tables: Skill, SkillVersion, ApiCredential, TestMessage, AppSettings.
- **API Documentation**: OpenAPI 3.1 spec at `specs/main/openapi.yaml`, `/docs` redirects to API documentation.

## Shared Contracts
- `packages/shared/`: Zod schemas, API types, MCP utilities, tool definitions, context mentions, language support.
- `api.ts`: Type-safe API definitions for tRPC and REST endpoints.
- `tools.ts`: Tool definitions for Model Context Protocol integration.
- `ExtensionMessage.ts`: IPC message types for Electron communication.
- Ensures compile-time safety between client/server with full TypeScript 5.8 strict mode.

## Runtime Configuration
- `.env`/`.env.example`: `DATABASE_URL`, `ENCRYPTION_KEY`, AWS credentials, API keys for all providers.
- `apps/client`: Electron IPC for main/renderer communication.
- `apps/server`: Express on port 3001 (configurable).
- `docker-compose.yml`: PostgreSQL + Redis services for Phase 2 cloud sync (currently optional).

## Data & Security Considerations
- **Phase 1**: SQLite file stored locally in user data directory; Drizzle ORM for type-safe queries.
- **Phase 2**: PostgreSQL + Redis for cloud sync, multi-user support, and session management.
- **Encryption**: AES-256-GCM for API credentials; encrypted at rest, never returned in plaintext.
- **Electron Security**: Context isolation, preload scripts, security fuses enabled in production.
- **Code Signing**: macOS notarization, Windows DigiCert certificate (planned).
- **CORS**: Configured for local desktop use; backend stateless in Phase 1.

## Build & Deploy Flow
1. `pnpm install` - Bootstrap all workspaces.
2. `pnpm dev` - Start Electron + Next.js + Express concurrently.
3. `pnpm build` - Build all packages.
4. `pnpm package` - Package Electron app (no installer).
5. `pnpm make` - Create platform-specific installers (Squirrel/ZIP/DEB/RPM).
6. `pnpm publish` - Publish to GitHub releases.

**Database Migrations**:
- Drizzle: `pnpm --filter bl1nk-skill-ide db:generate && db:push`
- Prisma: `pnpm --filter bl1nk-skill-builder-server prisma:migrate`

**Platform Support**:
- Windows: x64, arm64 (.exe via Squirrel)
- macOS: x64, arm64 (.dmg, .zip with code signing)
- Linux: x64 (.deb, .rpm, AppImage)

## Testing Architecture
- **E2E Tests**: 80+ Playwright specifications with PageObject pattern.
- **Unit Tests**: Vitest for shared utilities and services.
- **Fixtures**: Organized test data in `__tests__/e2e/fixtures/`.
- **Snapshots**: Visual regression testing support.
- **Validation**: Automated skill and agent JSON validation scripts.

## Validation & Quality
- **Skills**: 15 validated skill categories with SKILL.md and LICENSE.txt.
- **Agents**: 501 validated agent JSON templates with required fields.
- **Scripts**: `validate-skills.js`, `validate-agents.js`, `health-check.js`.
- **Linting**: ESLint + Prettier with pre-commit hooks via lint-staged.
- **Type Safety**: TypeScript 5.8 strict mode across all packages.

## Current Status (Phase 1 Complete)
✅ Core skill management with versioning
✅ 500+ agent template library
✅ Multi-provider AI integration (7 providers)
✅ Encrypted credential management
✅ SQLite + Drizzle ORM
✅ Electron desktop packaging
✅ Monaco editor integration
✅ REST API v1 with OpenAPI spec
✅ 80+ E2E tests
✅ Automation and validation scripts

## Roadmap (Phase 2+)
- PostgreSQL + Redis backend for cloud sync
- Multi-user authentication and collaboration
- Skill marketplace and sharing
- Advanced analytics and observability
- CI/CD automation with GitHub Actions
- Plugin ecosystem for extensibility

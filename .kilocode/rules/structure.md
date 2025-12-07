# Project Structure

## Repository Organization

This is a **pnpm monorepo** with a clear separation between client (desktop IDE), server (API), and shared packages.

```
bl1nk-skill-platform/
├── apps/                      # Application packages
│   ├── client/               # Electron desktop IDE
│   └── server/               # Express/tRPC API server
├── packages/                  # Shared packages
│   └── shared/               # Common utilities and types
├── agents/                    # 501 pre-built agent definitions
├── skill/                     # 30+ skill templates
├── scripts/                   # Build and validation scripts
├── docs/                      # Documentation (EN/TH)
├── specs/                     # Technical specifications
└── __tests__/                # E2E test suites
```

## Core Directories

### `/apps/client` - Desktop IDE (Electron)

The main user-facing application built with Electron, React, and Next.js.

```
apps/client/
├── src/
│   ├── components/           # React UI components
│   │   ├── preview_panel/   # Preview and security panels
│   │   ├── editor/          # Monaco editor integration
│   │   └── ui/              # Reusable UI components (Radix)
│   ├── ipc/                 # Electron IPC handlers
│   │   ├── handlers/        # Main process handlers
│   │   └── processors/      # Response processors
│   ├── utils/               # Utility functions
│   │   ├── codebase.ts     # Codebase analysis
│   │   └── ai/             # AI provider integrations
│   ├── __tests__/          # Unit tests (Vitest)
│   └── workers/            # Web workers for background tasks
├── drizzle/                # Database migrations
├── assets/                 # Static assets
├── forge.config.ts         # Electron Forge configuration
├── vite.*.config.mts       # Vite configurations (main/renderer/preload)
└── vitest.config.ts        # Vitest test configuration
```

**Key Technologies**:
- Electron 38.2 for desktop app framework
- React 19 + Next.js 15 for UI
- Monaco Editor for code editing
- Jotai for state management
- TanStack Query for data fetching
- Drizzle ORM + better-sqlite3 for local database
- Tailwind CSS 4 for styling

### `/apps/server` - API Server

Backend API server (currently in design phase, transitioning to implementation).

```
apps/server/
├── src/
│   ├── routes/             # API route handlers
│   ├── services/           # Business logic
│   ├── middleware/         # Express middleware
│   └── index.ts           # Server entry point
├── prisma/                # Prisma schema and migrations
└── package.json
```

**Key Technologies**:
- Express.js for HTTP server
- tRPC for type-safe APIs
- Prisma for database ORM
- PostgreSQL (Phase 2 target)
- Redis for caching
- Zod for validation

### `/packages/shared` - Shared Code

Common utilities, types, and logic shared between client and server.

```
packages/shared/
├── src/                   # TypeScript source
├── utils/                 # Utility functions
├── api.ts                # API client utilities
├── context-mentions.ts   # Context handling
├── mcp.ts                # MCP protocol utilities
├── tools.ts              # Tool definitions
└── ExtensionMessage.ts   # Message types
```

**Exports**:
- Type definitions for agents, skills, providers
- API request/response utilities
- Validation schemas
- Common constants

### `/agents` - Agent Library

501 pre-configured AI agents organized by category.

```
agents/
├── business/             # 35+ business agents
├── creative/             # 48+ creative agents
├── data/                 # 50+ data analysis agents
├── development/          # 150+ development agents
├── education/            # 60+ education agents
├── writing/              # 100+ writing agents
└── other/                # 58+ specialized agents
```

**Agent Structure** (JSON):
```json
{
  "author": "agent-creator",
  "identifier": "unique-id",
  "meta": {
    "title": "Agent Name",
    "description": "What this agent does",
    "tags": ["category", "feature"]
  },
  "systemRole": "Detailed instructions for the agent..."
}
```

### `/skill` - Skill Templates

30+ reusable skill templates for common AI development tasks.

```
skill/
├── mcp-builder/          # MCP server creation
├── file-organizer/       # File organization automation
├── canvas-design/        # Design system creation
├── web-artifacts-builder/ # Web component builder
├── skill-creator/        # Meta-skill for creating skills
└── template-skill/       # Base template
```

**Skill Structure**:
- `SKILL.md` - Main documentation and instructions
- `LICENSE.txt` - Licensing information
- `scripts/` - Helper scripts (optional)
- `templates/` - Code templates (optional)
- `examples/` - Usage examples (optional)

### `/scripts` - Automation Scripts

Build, validation, and maintenance scripts.

```
scripts/
├── validators/           # Validation scripts
│   ├── validate-agents.js    # Validate 501 agents
│   └── validate-skills.js    # Validate skill structure
├── builders/             # Build utilities
├── formatters/           # Code formatters
├── parsers/              # Data parsers
└── health-check.js       # Project health monitoring
```

### `/docs` - Documentation

Comprehensive documentation in English and Thai.

```
docs/
├── en/                   # English documentation
│   ├── 00_overview/
│   ├── 01_architecture/
│   ├── 02_api/
│   ├── 03_database/
│   ├── 04_deployment/
│   ├── 05_adrs/         # Architecture Decision Records
│   ├── 06_guides/
│   └── 07_references/
├── th/                   # Thai documentation (mirror structure)
├── Architecture.md
├── SECURITY.md
└── roadmap.md
```

### `/specs` - Technical Specifications

Detailed specifications for features and APIs.

```
specs/
├── 000-bl1nk-core-logic/     # Core logic spec
├── 001-skill-builder-core/   # Skill builder spec
│   ├── spec.md
│   ├── plan.md
│   ├── tasks.md
│   └── checklists/
├── 002-skill-ide-core/       # IDE spec
└── main/                     # Main API specification
    ├── openapi.yaml          # OpenAPI 3.1 spec (68 endpoints)
    └── plan.md
```

### `/__tests__` - E2E Tests

Playwright-based end-to-end tests.

```
__tests__/
└── e2e/
    ├── apps/             # App-level tests
    ├── chat/             # Chat functionality tests
    ├── context/          # Context handling tests
    ├── editing/          # Editor tests
    ├── integrations/     # Integration tests
    ├── providers/        # LLM provider tests
    ├── ui/               # UI component tests
    ├── fixtures/         # Test fixtures
    ├── helpers/          # Test utilities
    └── setup/            # Test setup
```

## Architectural Patterns

### 1. **Monorepo with Workspaces**
- pnpm workspaces for dependency management
- Shared packages via `workspace:*` protocol
- Independent versioning per package
- Parallel development and testing

### 2. **Client-Server Separation**
- Desktop client (Electron) for UI and local operations
- API server for backend logic and data persistence
- Shared types and utilities via `/packages/shared`
- IPC for client-server communication in Electron

### 3. **Database Strategy**
- **Phase 1**: SQLite with Drizzle ORM (client-side)
- **Phase 2**: PostgreSQL with Prisma (server-side)
- Migration path defined for data portability

### 4. **State Management**
- Jotai atoms for global state
- TanStack Query for server state
- Zustand for complex state machines
- React Context for component-level state

### 5. **Type Safety**
- TypeScript throughout
- Zod schemas for runtime validation
- tRPC for type-safe APIs
- Shared types in `/packages/shared`

### 6. **Testing Strategy**
- **Unit Tests**: Vitest for component and utility testing
- **E2E Tests**: Playwright for full application flows
- **API Tests**: SuperTest for server endpoints
- **Validation**: Custom scripts for agents and skills

### 7. **Security Architecture**
- Credential encryption (AES-256-GCM)
- Context isolation in Electron
- Input validation at all boundaries
- Rate limiting on sensitive operations
- Path traversal protection

## Key Configuration Files

### Root Level
- `pnpm-workspace.yaml` - Workspace configuration
- `package.json` - Root scripts and dependencies
- `.eslintrc.json` - ESLint configuration
- `.prettierrc` - Code formatting rules
- `playwright.config.ts` - E2E test configuration
- `docker-compose.yml` - PostgreSQL and Redis services

### Client (`apps/client`)
- `forge.config.ts` - Electron Forge configuration
- `vite.main.config.mts` - Main process Vite config
- `vite.renderer.config.mts` - Renderer process Vite config
- `vite.preload.config.mts` - Preload script Vite config
- `vitest.config.ts` - Unit test configuration
- `drizzle.config.ts` - Database configuration
- `tsconfig.json` - TypeScript configuration

### Server (`apps/server`)
- `tsconfig.json` - TypeScript configuration
- `prisma/schema.prisma` - Database schema (Phase 2)

## Module Relationships

```
┌─────────────────────────────────────────────────┐
│                  Desktop IDE                     │
│              (apps/client)                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │   UI     │  │  Editor  │  │ Preview  │      │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘      │
│       │             │              │             │
│       └─────────────┴──────────────┘             │
│                     │                            │
│              ┌──────▼──────┐                     │
│              │  IPC Layer  │                     │
│              └──────┬──────┘                     │
│                     │                            │
│              ┌──────▼──────┐                     │
│              │   SQLite    │                     │
│              └─────────────┘                     │
└─────────────────────────────────────────────────┘
                      │
                      │ (Future: REST API)
                      ▼
┌─────────────────────────────────────────────────┐
│                  API Server                      │
│              (apps/server)                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │  Routes  │  │ Services │  │   Auth   │      │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘      │
│       │             │              │             │
│       └─────────────┴──────────────┘             │
│                     │                            │
│              ┌──────▼──────┐                     │
│              │ PostgreSQL  │                     │
│              └─────────────┘                     │
└─────────────────────────────────────────────────┘
```

## Data Flow

1. **User Interaction** → React Components
2. **State Update** → Jotai/Zustand
3. **IPC Call** → Electron Main Process
4. **Business Logic** → IPC Handlers
5. **Database Operation** → Drizzle ORM → SQLite
6. **AI Provider Call** → Provider SDK → LLM API
7. **Response Processing** → Response Processor
8. **UI Update** → React Re-render

## Build Process

1. **Development**: `pnpm dev` - Starts all services in parallel
2. **Type Check**: `pnpm type-check` - Validates TypeScript across workspaces
3. **Lint**: `pnpm lint` - Runs ESLint on all packages
4. **Format**: `pnpm format` - Applies Prettier formatting
5. **Test**: `pnpm test:unit` + `pnpm test:e2e` - Runs all tests
6. **Build**: `pnpm build` - Builds all packages
7. **Package**: Electron Forge packages the desktop app

## Deployment Strategy

- **Desktop App**: Electron Forge → Platform-specific installers (DMG, EXE, DEB, RPM)
- **Auto-Updates**: update-electron-app for seamless updates
- **Server**: Docker containers → Cloud deployment (AWS/GCP/Azure)
- **Database**: Managed PostgreSQL (Neon, Supabase, or self-hosted)
- **CI/CD**: GitHub Actions for automated builds and tests


<!--
Sync Impact Report - Constitution v1.0.0
Version Change: Initial creation (0.0.0 → 1.0.0)
Created: 2025-12-01

Modified Principles: N/A (initial version)
Added Sections:
  - Core Principles (5 principles)
  - Technical Standards
  - Development Workflow
  - Governance

Templates Requiring Updates:
  ✅ .specify/templates/plan-template.md - Constitution Check section already references this file
  ✅ .specify/templates/spec-template.md - Requirements align with type safety and testability
  ✅ .specify/templates/tasks-template.md - Task structure supports principle-driven organization

Follow-up TODOs: None
-->

# Claude Skill Builder Constitution

## Core Principles

### I. End-to-End Type Safety

All data flows through the application MUST maintain type safety from database to UI. This principle is NON-NEGOTIABLE.

**Rules**:
- Database schemas defined in Prisma MUST generate TypeScript types
- tRPC procedures MUST use Zod schemas for runtime validation
- Frontend components MUST consume typed tRPC hooks
- Shared types MUST live in `packages/shared` to prevent duplication
- NO use of `any` type except for third-party library integrations where types are unavailable

**Rationale**: Type safety eliminates entire classes of bugs at compile time, ensures API contracts are enforced, and enables confident refactoring across the full stack.

### II. Monorepo Modularity

Code MUST be organized into well-defined workspace packages with clear boundaries and minimal coupling.

**Rules**:
- Frontend code lives exclusively in `apps/client`
- Backend code lives exclusively in `apps/server`
- Shared utilities, types, and business logic live in `packages/shared`
- Build tools and scripts live in `scripts/`
- Each package MUST have its own `package.json` with explicit dependencies
- Cross-package imports MUST only reference public exports (no reaching into implementation details)
- Circular dependencies between packages are FORBIDDEN

**Rationale**: Clear boundaries enable independent development, testing, and potential extraction of packages. Prevents the "big ball of mud" anti-pattern common in monorepos.

### III. API-First Design

Backend functionality MUST be exposed through well-defined tRPC procedures before frontend implementation begins.

**Rules**:
- Every user-facing feature starts with tRPC router definition
- Router procedures MUST include input/output Zod schemas
- Database operations MUST be encapsulated in service layer (`src/services/`), not exposed directly in routers
- API contracts (input/output shapes) MUST be documented in router files
- Breaking API changes require version increments and migration paths

**Rationale**: Defining APIs first ensures frontend-backend contract clarity, enables parallel development, and makes API changes explicit and reviewable.

### IV. Stateless Backend, Stateful Clients

Backend services MUST remain stateless; client state MUST be managed explicitly using appropriate tools.

**Rules**:
- Backend tRPC procedures MUST NOT maintain user session state beyond database/Redis
- Authentication state managed via JWT/session tokens, validated per-request
- Frontend state management uses Zustand stores for complex state
- React component state for UI-only concerns
- NO hidden global state or singleton patterns in backend services

**Rationale**: Stateless backends enable horizontal scaling, simplify testing, and prevent subtle bugs from shared mutable state. Explicit client state management improves debugging and predictability.

### V. Incremental Translation & Validation

AI-powered tooling (translation, categorization) MUST operate incrementally and validate outputs.

**Rules**:
- Translation scripts MUST detect and translate only changed content
- Language validation MUST use `@yutengjing/eld` to verify translation accuracy
- Invalid translations MUST be flagged and logged, not silently accepted
- AI-generated content (translations, categorizations) MUST be versioned and traceable
- Build scripts MUST fail fast on validation errors, not propagate bad data

**Rationale**: Incremental processing reduces API costs and build times. Validation prevents AI hallucinations from degrading data quality. Traceability enables debugging and quality assurance.

## Technical Standards

### Database Migrations

- All schema changes MUST be applied via Prisma migrations (`pnpm prisma:migrate`)
- Migration files MUST be committed to version control
- Down migrations SHOULD be provided for reversibility where feasible
- Breaking schema changes MUST include data migration scripts

### Testing Requirements

- Shared utilities in `packages/shared` MUST include unit tests
- Backend service layer SHOULD have integration tests for critical paths
- Frontend components SHOULD have tests for complex business logic
- E2E tests for critical user flows (skill creation, testing, API integration)
- Tests MUST run in CI before merge

### Code Quality

- All packages MUST pass TypeScript type checking (`pnpm run type-check`)
- All packages MUST pass linting (`pnpm lint`)
- Environment variables MUST be validated at startup (fail fast on missing config)
- Secrets MUST be encrypted at rest (see `ApiKey` model encryption pattern)
- Error messages MUST be actionable (include context, not just stack traces)

### Dependency Management

- Use `pnpm` workspace features for shared dependencies
- Pin major versions, allow minor/patch updates
- Audit dependencies regularly for security vulnerabilities
- Avoid duplicate dependencies across packages where possible
- Document rationale for alternative dependencies (e.g., OpenRouter as Bedrock alternative)

## Development Workflow

### Feature Development

1. Update database schema in `apps/server/prisma/schema.prisma` if needed
2. Run `pnpm prisma:generate` to update Prisma client
3. Define tRPC routers with Zod schemas in `apps/server/src/routers/`
4. Implement service layer logic in `apps/server/src/services/`
5. Frontend consumes typed tRPC hooks automatically
6. Write tests for new functionality
7. Update CLAUDE.md if new patterns or commands introduced

### Code Review Gates

- Type safety: No `any` types without justification
- Separation of concerns: Routers call services, services call Prisma
- Error handling: All tRPC procedures handle expected errors gracefully
- Security: No exposed secrets, encrypted sensitive data, validated inputs
- Documentation: Complex logic includes inline comments, public APIs documented

### Breaking Changes

- Database schema changes that drop columns/tables require migration plan
- tRPC procedure signature changes require version bump (or deprecation + new endpoint)
- Shared package API changes require semver MAJOR bump
- Frontend breaking changes require coordination with backend version

## Governance

### Amendment Process

1. Propose amendment with rationale and affected systems
2. Review impact on existing code and templates
3. Update constitution and increment version
4. Propagate changes to dependent templates and documentation
5. Communicate changes to team

### Versioning Policy

- **MAJOR**: Principle removal, redefinition, or new NON-NEGOTIABLE rule
- **MINOR**: New principle added or existing principle materially expanded
- **PATCH**: Clarifications, wording improvements, non-semantic changes

### Compliance Review

- All feature specifications MUST reference relevant principles
- Plan reviews MUST include constitution compliance check
- Violations MUST be justified in complexity tracking section
- Unjustified violations block implementation

### Runtime Guidance

Developers should consult `CLAUDE.md` for operational commands and architectural patterns. The constitution defines **what** must be true; CLAUDE.md explains **how** to achieve it in this codebase.

**Version**: 1.0.0 | **Ratified**: 2025-12-01 | **Last Amended**: 2025-12-01

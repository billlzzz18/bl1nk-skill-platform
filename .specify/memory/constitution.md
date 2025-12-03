<!--
Sync Impact Report - Constitution v1.1.0
Version Change: 1.0.0 → 1.1.0 (MINOR - New principles added)
Date: 2025-12-03

Modified Principles: N/A (existing principles unchanged)
Added Sections:
  - Principle VI: Security-First Development
  - Principle VII: Observable Systems
  - Principle VIII: Provider Agnostic Integration
  - Principle IX: Progressive Delivery
  - Principle X: Data Integrity & Validation

Rationale for Version Bump:
  MINOR (1.1.0): Five new principles added that codify existing best practices
  already present in the codebase. These principles add guidance without breaking
  existing implementations. All new principles are supported by evidence in the
  current codebase (security features, validation scripts, multi-provider support,
  phased roadmap, health checks).

Templates Requiring Updates:
  ⏳ .specify/templates/plan-template.md - Constitution Check section needs 5 new checkboxes
  ✅ .specify/templates/spec-template.md - Already aligned (validation, security requirements)
  ✅ .specify/templates/tasks-template.md - Already aligned (progressive delivery, testing)

Follow-up TODOs:
  - Update plan-template.md Constitution Check section with new principles
  - Consider adding security review gate to code review checklist
  - Document observability patterns in CLAUDE.md
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

### VI. Security-First Development

All features MUST include security considerations from design through deployment.

**Rules**:
- Credentials MUST be encrypted at rest using AES-256-GCM or stronger
- All user inputs MUST be validated and sanitized before processing
- File system operations MUST include path traversal protection
- Symlink loops MUST be detected and prevented
- Production builds MUST enable Electron security fuses
- Security vulnerabilities MUST be addressed before feature completion
- Third-party dependencies MUST be audited regularly for known vulnerabilities
- Sensitive data (API keys, tokens) MUST NEVER be logged or exposed in error messages

**Rationale**: Desktop applications have unique security challenges. Encrypting credentials prevents unauthorized access. Path traversal and symlink protections prevent file system exploits. Security fuses and context isolation prevent renderer process attacks. Security-first design prevents costly retrofits.

### VII. Observable Systems

All features MUST include observability mechanisms for monitoring, debugging, and quality assurance.

**Rules**:
- Critical operations MUST include structured logging with context
- Long-running operations MUST provide progress feedback to users
- Errors MUST include actionable messages with context (not just stack traces)
- System health checks MUST be automated and regularly validated
- Validation scripts MUST exist for user-generated content (skills, agents)
- Performance-critical paths SHOULD include timing instrumentation
- User-facing errors MUST be logged with sufficient context for debugging

**Rationale**: Observable systems enable rapid debugging, quality assurance, and user confidence. Progress feedback improves perceived performance. Validation prevents bad data propagation. Health checks catch regressions early.

### VIII. Provider Agnostic Integration

AI provider integrations MUST use abstraction layers that prevent vendor lock-in.

**Rules**:
- New AI providers MUST implement a common interface or adapter pattern
- Provider-specific code MUST be isolated in dedicated service modules
- Frontend components MUST NOT directly depend on provider-specific APIs
- Configuration switching between providers MUST NOT require code changes
- Provider credentials MUST be stored uniformly (encrypted, same schema)
- Fallback providers SHOULD be configurable for resilience
- Provider abstraction MUST NOT leak implementation details

**Rationale**: Multi-provider support is a core differentiator enabling users to choose based on cost, performance, and availability. Abstraction prevents vendor lock-in and enables competitive pricing. Uniform credential storage simplifies security. Fallback providers improve reliability.

### IX. Progressive Delivery

Features MUST be delivered incrementally with clear MVP checkpoints and phased rollouts.

**Rules**:
- Features MUST be broken into independently testable user stories
- Each user story MUST have a clear acceptance criterion
- Phase 1 (MVP) MUST deliver core value before additional features
- Feature phases MUST be documented with clear dependencies
- Breaking changes MUST be phased with migration paths
- New features SHOULD use feature flags where appropriate
- Each phase completion MUST include validation checkpoints

**Rationale**: Incremental delivery reduces risk, enables early feedback, and provides measurable progress. MVP-first approach ensures core value delivery. Feature flags enable safe rollouts and rollbacks. Clear checkpoints prevent scope creep.

### X. Data Integrity & Validation

All user-generated and AI-generated content MUST be validated against schemas before acceptance.

**Rules**:
- Agent configurations MUST conform to JSON schemas with metadata validation
- Skill definitions MUST follow SKILL.md format specification
- Validation scripts MUST run automatically in CI/CD pipeline
- Invalid data MUST be rejected with actionable error messages
- AI-generated content (translations, categorizations) MUST be language-validated
- Schema changes MUST include migration scripts for existing data
- Validation failures MUST fail fast, not propagate invalid data

**Rationale**: The platform manages 501 agents and 15+ skill categories—quality is critical. Schema validation prevents broken configurations. Language validation prevents AI hallucinations. Fail-fast validation catches errors early. Migrations preserve data integrity during schema evolution.

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

**Version**: 1.1.0 | **Ratified**: 2025-12-01 | **Last Amended**: 2025-12-03

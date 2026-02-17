# Claude Skill Builder – Roadmap

## Phase 0 – Research & Foundations *(Complete)*

- Capture product requirements, constraints, and personas in `specs/001-skill-builder-core/spec.md`.
- Design initial Prisma data model, API contracts, and UI sketches.
- Establish pnpm workspace, lint/test tooling, and shared schema package.

## Phase 1 – Core Skill Builder *(In Progress)*

1. **Skill CRUD & Versioning**
   - Implement `skill.router` + Drizzle migrations.
   - Surface skill list/editor UI with Monaco integration.
2. **Multi-Provider AI Integration**
   - AWS Bedrock integration (Claude, Titan, Nova, Mistral, Meta models)
   - OpenRouter, Anthropic Direct API, Google Vertex AI, Azure OpenAI
   - Runtime Orchestrator for intelligent model selection
3. **Test Chat Experience**
   - Chat router with provider abstraction and progressive escalation
   - Client chat panel with orchestration transparency
4. **Baseline Quality**
   - Vitest coverage for shared schemas/services.
   - Playwright E2E tests (74+ scenarios)
   - Human-First governance validation

## Phase 1.5 – Intelligent Orchestration *(Planned)*

- Runtime Orchestrator with Query/Intent/Model/Context/Tool routers
- Progressive model escalation (Haiku → Sonnet → specialized models)
- Memory-driven context selection and tool reliability scoring
- Multi-agent coordination for complex workflows
- AWS Bedrock deep integration with cost optimization

## Phase 2 – UX & Security Polish

- App settings: default models, rate-limit warnings, telemetry opt-out.
- Advanced skill organization: tags, search filters, keyboard shortcuts.
- Version history UI (diffs, restore flow).
- Observability: structured logs, request ids, log viewer in UI.
- Automated backups/export/import of skills and credentials (encrypted).
- Human-First governance UI (permission delegation, action confirmation).

## Phase 3 – Collaboration & Distribution

- Optional authentication + multi-user support (PostgreSQL/Redis backend).
- Cloud sync for skills/versions; sharing/public gallery workflows.
- Role-based permissions for teams and downloadable templates.
- Electron packaging and auto-update channel; signed installers.

## Phase 4 – Extensibility Ecosystem

- Plugin API for custom validators and deployment hooks.
- Marketplace for community skill templates and credential providers.
- Analytics dashboard (usage metrics, test outcomes, success/error ratios).

## Tracking & Delivery

- Roadmap items tied to `/specs/001-skill-builder-core/tasks.md`.
- Use milestone labels: `P1-Core`, `P2-UX`, `P3-Collab`, `P4-Ecosystem`.
- Review progress weekly; promote completed spec sections to “Approved” state.

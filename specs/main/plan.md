# Implementation Plan: Documentation & CI/CD Infrastructure

**Branch**: `main` | **Date**: 2025-12-02 | **Spec**: [User-provided plan](C:\Users\HOME-PC\.claude\plans\transient-jumping-cookie.md)
**Input**: Comprehensive documentation structure + GitHub Actions workflows for bl1nk Skill IDE

## Summary

Create complete bilingual documentation (50+ docs in English/Thai) covering architecture, APIs, database, and deployment, plus 6 production-ready GitHub Actions workflows for CI/CD automation (testing, building, security scanning, multi-platform Electron releases, Docker deployment).

**Primary Goals**:
- Establish comprehensive documentation foundation with C4 models, ERDs, API specs, and ADRs
- Automate CI/CD with workflows for testing (unit/integration/E2E), building, security scanning, and multi-platform releases
- Improve project health from 8.5/10 to 9.5/10 through configuration completeness and automation

## Technical Context

**Language/Version**: Markdown (documentation), YAML (GitHub Actions), TypeScript 5.8+ (project code)
**Primary Dependencies**:
- Documentation: Mermaid (diagrams), Markdown processors
- CI/CD: GitHub Actions, pnpm 9, Playwright, Vitest, Electron Forge 7.8+, Docker Buildx
- Testing: Vitest (unit), Playwright (E2E), Prisma (database validation)

**Storage**: File-based documentation in `docs/` directory structure, no database changes
**Testing**: Vitest for documentation validation scripts, workflow syntax validation with actionlint
**Target Platform**:
- Documentation: Web (GitHub/static site hosting)
- Workflows: GitHub Actions runners (ubuntu-latest, windows-latest, macos-latest)
- Electron builds: Windows (x64/arm64), macOS (x64/arm64), Linux (deb/rpm/AppImage)

**Project Type**: Infrastructure/Documentation (no code changes to core application)
**Performance Goals**:
- CI pipeline < 15 minutes for full test suite
- Documentation build < 2 minutes
- Electron release builds < 30 minutes per platform

**Constraints**:
- Must maintain bilingual parity (EN/TH) for all documentation
- Must support code signing for macOS (Apple ID) and Windows (DigiCert)
- Must comply with GitHub Actions secrets management best practices
- Workflows must cache effectively to minimize CI minutes

**Scale/Scope**:
- 50+ documentation files (25 EN + 25 TH)
- 15+ diagrams (C4, ERD, sequence, flow)
- 6 primary workflow files + 2 reusable workflows
- 20+ GitHub Secrets to configure
- 7-week implementation timeline

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify compliance with `.specify/memory/constitution.md`:

- [✅] **End-to-End Type Safety**: N/A - Documentation/infrastructure project, no runtime type flows. Workflow YAML follows schema validation.
- [✅] **Monorepo Modularity**: Documentation respects monorepo structure (references apps/client, apps/server, packages/shared correctly)
- [N/A] **API-First Design**: Not applicable - no API changes, only documentation of existing tRPC APIs
- [N/A] **Stateless Backend**: Not applicable - infrastructure project
- [✅] **Incremental Translation**: Bilingual documentation strategy follows incremental translation principle (write EN → translate TH → validate)
- [✅] **Testing Requirements**: Documentation validation scripts, workflow syntax tests, link checking defined
- [✅] **Code Quality**: Markdown linting, YAML validation, diagram syntax checking in scope
- [N/A] **Breaking Changes**: Not applicable - documentation and workflows don't break application APIs

**Constitution Compliance**: ✅ **PASS**
All applicable principles satisfied. Non-applicable items relate to runtime code, which this infrastructure project does not modify.

## Project Structure

### Documentation (this feature)

```text
specs/main/
├── plan.md                     # This file (/speckit.plan output)
├── research.md                 # Phase 0: Documentation tooling, workflow patterns research
├── data-model.md               # Phase 1: Documentation structure schema, workflow definitions
├── quickstart.md               # Phase 1: Quick start guide for contributing to docs/workflows
├── contracts/                  # Phase 1: Workflow interface specs, diagram templates
│   ├── ci-workflow-spec.yml    # CI workflow contract
│   ├── release-workflow-spec.yml # Release workflow contract
│   └── documentation-template-contracts.md # Doc template specifications
├── checklists/
│   └── implementation.md       # Requirements quality checklist (115 items)
└── tasks.md                    # Phase 2: Implementation tasks (/speckit.tasks output)
```

### Source Code (repository root) - New Infrastructure

```text
# Documentation structure
docs/
├── en/                         # English documentation
│   ├── 00_overview/
│   │   ├── README.md
│   │   ├── project-goals.md
│   │   ├── tech-stack.md
│   │   └── system-overview.md
│   ├── 01_architecture/
│   │   ├── architecture-overview.md
│   │   ├── c4-models/
│   │   ├── data-flow/
│   │   └── sequence-diagrams/
│   ├── 02_api/
│   │   ├── trpc-overview.md
│   │   ├── endpoints/
│   │   ├── schemas.md
│   │   └── error-handling.md
│   ├── 03_database/
│   │   ├── schema-overview.md
│   │   ├── erd.md
│   │   ├── models/
│   │   └── migrations.md
│   ├── 04_deployment/
│   │   ├── electron/
│   │   ├── docker/
│   │   └── aws/
│   ├── 05_adrs/
│   │   ├── 0001-electron-nextjs-choice.md
│   │   ├── 0002-trpc-over-rest.md
│   │   ├── 0003-sqlite-phase1.md
│   │   ├── 0004-monorepo-structure.md
│   │   └── 0005-encryption-strategy.md
│   ├── 06_guides/
│   │   ├── development-setup.md
│   │   ├── contributing.md
│   │   ├── testing.md
│   │   └── troubleshooting.md
│   └── 07_references/
│       ├── glossary.md
│       └── resources.md
└── th/                         # Thai documentation (mirrored structure)
    └── [same structure as en/]

# GitHub Actions workflows
.github/
├── workflows/
│   ├── ci.yml                  # Main CI pipeline
│   ├── build-verification.yml  # Build checks
│   ├── database-check.yml      # Prisma validation
│   ├── electron-release.yml    # Desktop app release
│   ├── docker-build.yml        # Docker images
│   ├── security-scan.yml       # Security checks
│   ├── performance-test.yml    # Performance monitoring
│   ├── dependency-update.yml   # Auto-updates
│   └── reusable/
│       ├── setup-pnpm.yml      # Reusable pnpm setup
│       └── run-tests.yml       # Reusable test runner
└── CODEOWNERS                  # Code ownership rules

# Configuration files (new/updated)
.eslintrc.json                  # ESLint configuration
.vscode/
├── settings.json               # Workspace settings
└── extensions.json             # Recommended extensions
.gitignore                      # Updated with logs/, build artifacts
```

**Structure Decision**: This is a documentation + infrastructure project. The structure follows:
1. **Bilingual documentation**: Separate `docs/en/` and `docs/th/` folders with mirrored structure for easy maintenance and translation parity checking
2. **Numbered categories**: Documentation organized by numbered prefixes (00-07) for logical ordering
3. **GitHub Actions standard**: Workflows in `.github/workflows/` following GitHub conventions, with reusable workflows in subfolder
4. **Configuration at root**: ESLint, VS Code, gitignore at repository root per convention

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

**No violations** - All constitution checks pass or are not applicable to this infrastructure project.

## Phase 0: Research & Decision Making

*Output: `research.md` with all technology and pattern decisions documented*

### Research Topics

1. **Documentation Tooling**:
   - **Mermaid vs PlantUML** for diagrams
   - Static site generators (MkDocs, Docusaurus, VitePress) vs raw Markdown
   - Diagram export formats (SVG, PNG) and hosting strategies
   - Link checking and validation tools
   - **Decision needed**: Diagram tooling, hosting strategy

2. **C4 Model Implementation**:
   - C4 model diagram standards (System Context, Container, Component, Code)
   - Mermaid C4 plugin capabilities and limitations
   - PlantUML C4 stdlib patterns
   - **Decision needed**: C4 diagramming approach

3. **Bilingual Documentation Strategy**:
   - Translation workflow (manual, AI-assisted, hybrid)
   - Structure parity validation techniques
   - Navigation between language versions
   - Cultural adaptation guidelines for Thai documentation
   - **Decision needed**: Translation process, validation automation

4. **GitHub Actions Best Practices**:
   - Workflow optimization patterns (caching, matrix builds, conditional execution)
   - Secrets management (OIDC vs static tokens, rotation strategies)
   - Multi-platform build patterns for Electron (Windows/macOS/Linux)
   - Code signing workflows (macOS notarization, Windows DigiCert)
   - **Decision needed**: Caching strategy, secrets management approach

5. **Code Signing Requirements**:
   - Apple Developer ID signing and notarization process
   - Windows DigiCert certificate handling
   - Certificate storage and rotation
   - **Decision needed**: Certificate provisioning method

6. **Electron Release Patterns**:
   - electron-forge maker configurations
   - GitHub Releases vs other distribution methods
   - Auto-update implementation
   - **Decision needed**: Distribution strategy

7. **Docker Multi-Platform Builds**:
   - Docker Buildx setup for multi-arch
   - GHCR vs Docker Hub for hosting
   - Image tagging strategies (latest, version, sha)
   - SBOM generation tools
   - **Decision needed**: Registry choice, SBOM tooling

8. **Security Scanning Integration**:
   - Dependency scanning tools (Snyk, Dependabot, npm audit)
   - Code scanning tools (CodeQL, Semgrep, SonarCloud)
   - Container scanning tools (Trivy, Grype)
   - Secret scanning tools (GitGuardian, TruffleHog)
   - **Decision needed**: Tool selection for each category

### Research Deliverables

`research.md` will document:
- **Decision records**: For each research topic, chosen solution with rationale
- **Alternatives considered**: Rejected options and why
- **Implementation patterns**: Code/config snippets for chosen solutions
- **Dependencies**: Required tools, services, accounts (GitHub Secrets, Apple Developer, DigiCert)
- **Risk analysis**: Known limitations and mitigation strategies

## Phase 1: Design & Structure Definition

*Prerequisites: research.md complete with all decisions made*

### 1. Documentation Structure Schema (`data-model.md`)

Since this is documentation rather than a database, `data-model.md` will define:

**Document Type Definitions**:
```yaml
DocumentTypes:
  - Architecture:
      required_sections:
        - System Context
        - Containers
        - Components
        - Data Flow
      diagram_types: [C4, Sequence, ERD]

  - API Documentation:
      required_sections:
        - Overview
        - Input Schema
        - Output Schema
        - Error Handling
        - Examples

  - ADR (Architectural Decision Record):
      required_sections:
        - Context
        - Decision
        - Consequences
        - Alternatives Considered
      metadata: [date, status, deciders]

  - Deployment Guide:
      required_sections:
        - Prerequisites
        - Configuration
        - Deployment Steps
        - Verification
        - Troubleshooting
```

**Documentation Hierarchy**:
```yaml
DocumentationTree:
  root: docs/
  languages: [en, th]
  categories:
    - id: 00_overview
      purpose: "Project introduction and goals"
      required_files: [README.md, project-goals.md, tech-stack.md]

    - id: 01_architecture
      purpose: "System design and structure"
      required_files: [architecture-overview.md]
      required_subdirs: [c4-models, data-flow, sequence-diagrams]

    - id: 02_api
      purpose: "API specifications"
      required_files: [trpc-overview.md, schemas.md, error-handling.md]

    - id: 03_database
      purpose: "Database schema and models"
      required_files: [schema-overview.md, erd.md, migrations.md]

    - id: 04_deployment
      purpose: "Deployment procedures"
      required_subdirs: [electron, docker, aws]

    - id: 05_adrs
      purpose: "Architectural decision records"
      naming_pattern: "####-kebab-case-title.md"

    - id: 06_guides
      purpose: "Developer guides"
      required_files: [development-setup.md, contributing.md]

    - id: 07_references
      purpose: "Glossary and resources"
      required_files: [glossary.md, resources.md]
```

**Validation Rules**:
```yaml
ValidationRules:
  - name: "Bilingual Parity"
    rule: "Every file in docs/en/ must have equivalent in docs/th/"
    check: "File exists and has similar section structure"

  - name: "Diagram Validity"
    rule: "All Mermaid diagrams must compile"
    check: "mermaid-cli validate"

  - name: "Link Integrity"
    rule: "All internal links must resolve"
    check: "markdown-link-check"

  - name: "Template Compliance"
    rule: "Documents must follow category template"
    check: "Schema validation against template"
```

### 2. Workflow Specifications (`contracts/`)

**CI Workflow Contract** (`contracts/ci-workflow-spec.yml`):
```yaml
name: CI Pipeline Contract
triggers:
  - on: [push, pull_request]
    branches: [main, develop]
    paths-ignore: ['**.md', 'docs/**']

jobs:
  setup:
    outputs: [cache-key, node-version]

  lint:
    depends_on: [setup]
    checks: [eslint, oxlint, prettier]

  type-check:
    depends_on: [setup]
    checks: [tsc --noEmit]

  unit-tests:
    depends_on: [setup]
    framework: vitest
    coverage: required
    threshold: 80%

  e2e-tests:
    depends_on: [setup, build-packages]
    framework: playwright
    matrix: [ubuntu-latest, windows-latest, macos-latest]
    browser: chromium

  database-check:
    depends_on: [setup]
    checks: [prisma validate, prisma generate]

  build-packages:
    depends_on: [lint, type-check]
    packages: [client, server, shared]

  validate-skills:
    depends_on: [setup]
    checks: [pnpm run validate:skills, pnpm run validate:lang]

success_criteria:
  - all_jobs_pass: true
  - execution_time: < 15 minutes
  - cache_hit_rate: > 70%
```

**Electron Release Workflow Contract** (`contracts/release-workflow-spec.yml`):
```yaml
name: Electron Release Contract
triggers:
  - on: push
    tags: ['v*.*.*', 'v*.*.*-beta.*', 'v*.*.*-alpha.*']
  - workflow_dispatch:
      inputs:
        version: string
        draft: boolean

jobs:
  build-windows:
    platform: windows-latest
    matrix: [x64, arm64]
    outputs: [.exe, .msi]
    signing: DigiCert

  build-macos:
    platform: macos-latest
    matrix: [x64, arm64]
    outputs: [.dmg, .zip]
    signing: Apple Developer ID
    notarization: required

  build-linux:
    platform: ubuntu-latest
    matrix: [deb, rpm, AppImage]
    outputs: [.deb, .rpm, .AppImage]
    signing: GPG (optional)

  create-release:
    depends_on: [build-windows, build-macos, build-linux]
    github_release: true
    draft: input.draft || true
    generate_notes: true

  notify-release:
    depends_on: [create-release]
    channels: [slack, discord]

success_criteria:
  - all_platforms_build: true
  - code_signing_valid: true
  - release_created: true
  - artifacts_uploaded: all
```

**Documentation Template Contracts** (`contracts/documentation-template-contracts.md`):
```markdown
# Documentation Template Specifications

## ADR Template Contract

Required fields:
- Title: ADR-####: {Decision Title}
- Date: YYYY-MM-DD
- Status: [Proposed | Accepted | Deprecated | Superseded]
- Deciders: List of decision makers

Required sections:
- Context: Problem statement
- Decision: Chosen solution
- Consequences: Positive and negative impacts
- Alternatives Considered: Rejected options with rationale

## API Endpoint Template Contract

Required fields:
- Endpoint: Router.Procedure name
- Overview: Brief description

Required sections:
- Input Schema: Zod schema definition
- Output Schema: TypeScript type
- Example Usage: TypeScript code example
- Error Handling: Error codes and scenarios

## Architecture Diagram Template Contract

Required metadata:
- Diagram type: [C4-Context | C4-Container | C4-Component | Sequence | ERD | Flow]
- Created date
- Last updated
- Authors

Required elements (C4):
- Title and scope
- Primary actors/systems
- Relationships with labels
- Legend (if using colors/symbols)
```

### 3. Quick Start Guide (`quickstart.md`)

```markdown
# Quick Start: Documentation & CI/CD Infrastructure

## For Documentation Contributors

### Setup
\`\`\`bash
# Clone repository
git clone https://github.com/bl1nk-org/bl1nk-skill-ide.git
cd bl1nk-skill-ide

# Install dependencies
pnpm install

# Install documentation tools
pnpm add -D mermaid-cli markdown-link-check
\`\`\`

### Creating New Documentation

1. **Create English version first**:
   \`\`\`bash
   # Create new architecture doc
   touch docs/en/01_architecture/new-doc.md

   # Follow template structure
   cp docs/templates/architecture-template.md docs/en/01_architecture/new-doc.md
   \`\`\`

2. **Translate to Thai**:
   \`\`\`bash
   # Create Thai version
   cp docs/en/01_architecture/new-doc.md docs/th/01_architecture/new-doc.md

   # Translate content (preserve structure)
   # Use AI assistance: pnpm run translate docs/en/01_architecture/new-doc.md
   \`\`\`

3. **Validate**:
   \`\`\`bash
   # Check bilingual parity
   pnpm run validate:docs

   # Check links
   pnpm run check:links

   # Validate diagrams
   pnpm run validate:diagrams
   \`\`\`

### Creating Diagrams

Using Mermaid:
\`\`\`markdown
\`\`\`mermaid
graph TD
    A[Frontend] -->|tRPC| B[Backend]
    B -->|Prisma| C[(Database)]
\`\`\`
\`\`\`

Export to SVG:
\`\`\`bash
mmdc -i docs/en/01_architecture/diagram.md -o docs/en/01_architecture/diagram.svg
\`\`\`

## For Workflow Contributors

### Testing Workflows Locally

\`\`\`bash
# Install act (GitHub Actions local runner)
npm install -g @nektos/act

# Test CI workflow
act push -W .github/workflows/ci.yml

# Test with secrets
act push --secret-file .secrets
\`\`\`

### Validating Workflow Syntax

\`\`\`bash
# Install actionlint
brew install actionlint  # macOS
# or download from GitHub releases

# Validate all workflows
actionlint .github/workflows/*.yml
\`\`\`

### Required GitHub Secrets

Before running workflows, configure these secrets in GitHub repository settings:

**Code Signing**:
- APPLE_ID
- APPLE_PASSWORD
- APPLE_TEAM_ID
- SM_CODE_SIGNING_CERT_SHA1_HASH
- WINDOWS_CERTIFICATE (base64 encoded)
- WINDOWS_CERTIFICATE_PASSWORD

**Container Registry**:
- GHCR_TOKEN (GitHub token with packages:write)

**Testing & Coverage**:
- CODECOV_TOKEN

**Notifications**:
- SLACK_WEBHOOK_URL

**Security**:
- SNYK_TOKEN
- SONAR_TOKEN

## Common Tasks

### Update Architecture Diagram
\`\`\`bash
# 1. Edit Mermaid source
vi docs/en/01_architecture/c4-models/containers.md

# 2. Generate SVG
mmdc -i docs/en/01_architecture/c4-models/containers.md -o docs/en/01_architecture/c4-models/containers.svg

# 3. Translate and regenerate Thai version
# (Follow translation workflow)
\`\`\`

### Add New ADR
\`\`\`bash
# Use ADR template
cp docs/templates/adr-template.md docs/en/05_adrs/0006-new-decision.md

# Fill in template
# Translate to Thai
# Commit both versions
\`\`\`

### Test Electron Release Locally
\`\`\`bash
cd apps/client
pnpm run package  # Creates unnotarized/unsigned build
pnpm run make     # Full build with signing (requires certificates)
\`\`\`

## Troubleshooting

See [docs/en/06_guides/troubleshooting.md](../docs/en/06_guides/troubleshooting.md)
```

### 4. Agent Context Update

Run agent context update script:
```bash
.specify/scripts/powershell/update-agent-context.ps1 -AgentType claude
```

This will add to `CLAUDE.md`:
- Documentation contribution workflows
- Workflow testing procedures
- Diagram creation patterns
- Bilingual documentation maintenance

## Phase 2: Task Generation

*Phase 2 will be handled by `/speckit.tasks` command - not part of `/speckit.plan` output*

The tasks will break down implementation into:
- **Phase 1**: Configuration & Quick Wins (create config files, folder structure)
- **Phase 2**: Core Documentation (write architecture, API, database docs)
- **Phase 3**: GitHub Actions - Core CI (CI, build verification, database check workflows)
- **Phase 4**: GitHub Actions - Release (Electron release, Docker build workflows)
- **Phase 5**: Security & Quality (security scanning, performance test workflows)
- **Phase 6**: Organization & Cleanup (agent organization, test restructuring)

Total estimated tasks: 50-60 granular implementation tasks

## Re-Evaluation: Constitution Check (Post-Design)

*Re-check after Phase 1 design complete*

- [✅] **End-to-End Type Safety**: Documentation structure validated with schemas, workflows validated with actionlint
- [✅] **Monorepo Modularity**: Documentation respects monorepo boundaries, references correct workspace paths
- [N/A] **API-First Design**: Not applicable
- [N/A] **Stateless Backend**: Not applicable
- [✅] **Incremental Translation**: Bilingual strategy includes incremental translation workflow with validation
- [✅] **Testing Requirements**: Documentation validation, link checking, workflow syntax tests defined
- [✅] **Code Quality**: Markdown linting, YAML validation, diagram compilation checks specified
- [N/A] **Breaking Changes**: Not applicable

**Post-Design Compliance**: ✅ **PASS**
Design maintains constitution compliance. All validation and quality checks defined.

## Next Steps

1. **Complete Phase 0**: Generate `research.md` by researching all decision points listed above
2. **Complete Phase 1**: Generate `data-model.md`, `contracts/`, and `quickstart.md` based on research decisions
3. **Run `/speckit.tasks`**: Generate granular implementation tasks based on this plan
4. **Begin Implementation**: Start with Phase 1 tasks (Configuration & Quick Wins)

## Notes

- This is an infrastructure/documentation project, not a traditional feature with code changes
- No database migrations or API changes involved
- Focus is on documentation quality, workflow automation, and project health improvement
- Success measured by: documentation completeness (50+ docs), workflow functionality (6+ workflows passing), project health score (8.5→9.5)

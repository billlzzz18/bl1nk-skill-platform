📋 สรุปแผนงาน: เอกสารและ GitHub Actions Workflows ผมได้สร้างแผนงานที่ครบถ้วนสำหรับโปรเจกต์ bl1nk Skill IDE (Claude Skill Builder) แล้วครับ 🎯 สิ่งที่จะได้รับ: 1. เอกสาร (Documentation) - 50+ ไฟล์ • ✅ Architecture Documentation พร้อม C4 Model, Data Flow, Sequence Diagrams • ✅ API Documentation ครบทุก tRPC endpoints • ✅ Database Documentation พร้อม ERD และ schema details • ✅ Deployment Guides สำหรับ Electron, Docker, AWS • ✅ 5 ADRs บันทึกการตัดสินใจสำคัญ • ✅ 2 ภาษา (ไทย/อังกฤษ) ครบทุกเอกสาร  2. GitHub Actions Workflows - 6+ workflows • ✅ CI Pipeline (lint, type-check, unit tests, E2E tests) • ✅ Build Verification (ตรวจสอบ build ทุก package) • ✅ Database Checks (Prisma validation) • ✅ Electron Release (Win/Mac/Linux + code signing) • ✅ Docker Build (multi-platform images) • ✅ Security Scanning (dependencies, code, secrets)  3. Configuration Files - แก้ปัญหาที่พบ • ✅ .eslintrc.json, .vscode/settings.json, .vscode/extensions.json • ✅ อัพเดท .gitignore • ✅ จัดระเบียบ agents/ directory (501 files → categorized) • ✅ จัดระเบียบ __tests__/e2e/ (80+ tests → feature-based)  ⏱️ Timeline: 7 สัปดาห์ • Week 1: Configuration & Quick Wins • Week 2-3: Core Documentation (Architecture, API, Database) • Week 4: GitHub Actions CI • Week 5: GitHub Actions Release • Week 6: Security & Quality • Week 7: Organization & Cleanup  📊 Project Health Score • ก่อน: 8.5/10 • หลัง: 9.5/10 (คาดการณ์)  📂 ไฟล์แผนงาน แผนฉบับเต็มอยู่ที่: C:\Users\HOME-PC.claude\plans\transient-jumping-cookie.md พร้อมเริ่มดำเนินการทันทีครับ! 🚀 ● Claude’s Plan แผนการสร้างเอกสารและ GitHub Actions Workflows Claude Skill Builder Project สถานะ: กำลังวางแผน (Planning Phase) วันที่สร้าง: 2025-12-02 ภาษา: ไทย/อังกฤษ (Bilingual)   📋 ภาพรวมโปรเจกต์ Claude Skill Builder เป็น Electron desktop application สำหรับสร้าง จัดการ และทดสอบ Claude AI skills • Frontend: Next.js 15 + React 19 + Electron • Backend: Node.js + tRPC + Express • Database: SQLite (Phase 1) พร้อม Prisma ORM • AI Integration: AWS Bedrock + OpenRouter    🎯 เป้าหมาย 1. เอกสาร (Documentation) • ✅ สร้างเอกสาร Architecture แบบละเอียด (C4 Model, Data Flow) • ✅ เอกสาร API ทั้งหมด (tRPC endpoints) • ✅ เอกสารโครงสร้างฐานข้อมูล • ✅ คู่มือการ Deploy • ✅ ADRs (Architectural Decision Records) • ✅ เอกสาร 2 ภาษา (ไทย/อังกฤษ)  2. GitHub Actions Workflows • ✅ Continuous Integration (lint, type-check, tests) • ✅ Build Verification • ✅ Database Migration Validation • ✅ Automated Deployment (Docker + AWS + Electron) • ✅ Release Automation  3. การทดสอบ (Testing) • ✅ Unit Tests • ✅ Integration Tests (กับ database) • ✅ E2E Tests (Playwright) • ✅ Coverage Reporting    📊 สถานะปัจจุบัน (Current State Analysis) ✅ มีอยู่แล้ว (Existing) 1. Testing: ◦ E2E tests ด้วย Playwright (ครอบคลุมดี) ◦ Unit tests สำหรับ shared utilities ◦ Test commands: pnpm test, pnpm test:locale   2. Documentation: ◦ CLAUDE.md (คำแนะนำสำหรับ AI) ◦ Skill-specific docs ใน skill/*/SKILL.md   3. Build System: ◦ Electron Forge configuration ◦ pnpm workspace monorepo ◦ Build scripts สำหรับ multi-platform    ❌ ยังไม่มี (Missing) 1. GitHub Actions workflows 2. เอกสาร Architecture แบบละเอียด 3. API documentation 4. Database schema documentation 5. Deployment guides 6. ADRs 7. Coverage reporting 8. Integration tests สำหรับ backend    🎨 สถาปัตยกรรมจากการวิเคราะห์ Database Schema Skill (1) ──→ (N) SkillVersion
ApiCredential (แยกตาราง, encrypted)
TestMessage (ephemeral chat history)
AppSettings (key-value config)
 API Endpoints (tRPC) Skill Router: list, getById, create, update, delete, getVersions, restoreVersion Credential Router: list, getByProvider, save, delete, setActive, test, getDecrypted Deployment Targets 1. Electron Desktop App (Windows, macOS, Linux) 2. Docker (Self-hosted) 3. AWS (Bedrock integration)      📝 แผนการดำเนินงานโดยละเอียด ส่วนที่ 1: โครงสร้างเอกสาร (Documentation Structure) 1.1 โครงสร้างโฟลเดอร์เอกสาร docs/
├── en/                          # English Documentation
│   ├── 00_overview/
│   │   ├── README.md
│   │   ├── project-goals.md
│   │   ├── tech-stack.md
│   │   └── system-overview.md
│   ├── 01_architecture/
│   │   ├── architecture-overview.md
│   │   ├── c4-models/
│   │   │   ├── system-context.md
│   │   │   ├── containers.md
│   │   │   └── components.md
│   │   ├── data-flow/
│   │   │   ├── skill-creation-flow.md
│   │   │   └── ai-integration-flow.md
│   │   └── sequence-diagrams/
│   │       ├── skill-version-management.md
│   │       └── credential-auth.md
│   ├── 02_api/
│   │   ├── trpc-overview.md
│   │   ├── endpoints/
│   │   │   ├── skill-router.md
│   │   │   └── credential-router.md
│   │   ├── schemas.md
│   │   └── error-handling.md
│   ├── 03_database/
│   │   ├── schema-overview.md
│   │   ├── erd.md
│   │   ├── models/
│   │   │   ├── skill.md
│   │   │   ├── skill-version.md
│   │   │   ├── api-credential.md
│   │   │   ├── test-message.md
│   │   │   └── app-settings.md
│   │   └── migrations.md
│   ├── 04_deployment/
│   │   ├── electron/
│   │   │   ├── packaging.md
│   │   │   ├── code-signing.md
│   │   │   └── distribution.md
│   │   ├── docker/
│   │   │   ├── setup.md
│   │   │   └── compose.md
│   │   └── aws/
│   │       ├── bedrock-setup.md
│   │       └── infrastructure.md
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
│
└── th/                          # เอกสารภาษาไทย (โครงสร้างเดียวกัน)
    ├── 00_overview/
    ├── 01_architecture/
    ├── 02_api/
    ├── 03_database/
    ├── 04_deployment/
    ├── 05_adrs/
    ├── 06_guides/
    └── 07_references/
 1.2 เครื่องมือสร้าง Diagrams • Mermaid: สำหรับ diagrams ที่ฝังใน Markdown ◦ C4 Model diagrams ◦ Sequence diagrams ◦ Flow charts ◦ ERD diagrams   • Export SVG: สำหรับคุณภาพสูง  1.3 เทมเพลตเอกสาร ADR Template: # ADR-XXXX: [Title]

**Date**: YYYY-MM-DD
**Status**: [Proposed | Accepted | Deprecated | Superseded]
**Deciders**: [List of decision makers]

## Context
[What is the issue/problem we're addressing?]

## Decision
[What is the change we're making?]

## Consequences
### Positive
- [Benefit 1]

### Negative
- [Trade-off 1]

## Alternatives Considered
1. [Alternative 1]
   - Pros: ...
   - Cons: ...
 API Endpoint Template: # [Router Name].[Procedure Name]

## Overview
[Brief description]

## Input Schema
\`\`\`typescript
z.object({
  // Schema definition
})
\`\`\`

## Output Schema
\`\`\`typescript
// Return type
\`\`\`

## Example Usage
\`\`\`typescript
// Usage example
\`\`\`

## Error Handling
- [Error 1]: [When it occurs]
   ส่วนที่ 2: GitHub Actions Workflows 2.1 โครงสร้าง Workflows .github/
├── workflows/
│   ├── ci.yml                          # Main CI pipeline
│   ├── build-verification.yml          # Build checks
│   ├── database-check.yml              # DB validation
│   ├── electron-release.yml            # Desktop app release
│   ├── docker-build.yml                # Docker images
│   ├── security-scan.yml               # Security checks
│   ├── performance-test.yml            # Performance monitoring
│   ├── dependency-update.yml           # Auto-updates
│   └── reusable/
│       ├── setup-pnpm.yml
│       └── run-tests.yml
└── CODEOWNERS                          # Code ownership
 2.2 CI Workflow (ci.yml) - สรุปหลัก Triggers: • Push to main, develop • Pull requests • Manual dispatch  Jobs: 1. setup: Install dependencies + cache 2. lint: ESLint + Oxlint + Prettier 3. type-check: TypeScript compilation 4. unit-tests: Vitest + coverage 5. e2e-tests: Playwright (Matrix: Win/Mac/Linux) 6. database-check: Prisma validation 7. build-packages: Build verification 8. validate-skills: Skill/agent validation  Caching: • pnpm store (~/.pnpm-store) • node_modules • Playwright browsers • Build artifacts (.vite, dist)  2.3 Electron Release Workflow (electron-release.yml) Triggers: • Git tags: v*.*.*, v*.*.*-beta.* • Manual dispatch  Jobs: 1. build-windows: x64, arm64 (.exe, .msi) 2. build-macos: x64, arm64 (.dmg, .zip) + notarization 3. build-linux: deb, rpm, AppImage 4. create-release: GitHub Release 5. notify-release: Team notifications  Code Signing: • macOS: Apple Developer ID + notarization • Windows: DigiCert certificate  2.4 Docker Build Workflow (docker-build.yml) Jobs: • Build multi-platform images (amd64, arm64) • Push to GHCR (GitHub Container Registry) • Tag: latest, v1.0.0, sha-abc1234 • SBOM generation  2.5 GitHub Secrets ที่ต้องการ Code Signing: APPLE_ID
APPLE_PASSWORD
APPLE_TEAM_ID
SM_CODE_SIGNING_CERT_SHA1_HASH
WINDOWS_CERTIFICATE
WINDOWS_CERTIFICATE_PASSWORD
 Container Registry: GHCR_TOKEN
 Testing & Coverage: CODECOV_TOKEN
 Notifications: SLACK_WEBHOOK_URL
 Security: SNYK_TOKEN
SONAR_TOKEN
 AWS (Testing): AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
   ส่วนที่ 3: การแก้ไขปัญหาที่พบ (Based on Health Check) 3.1 Missing Configuration Files (สร้างทันที) 1. .eslintrc.json {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module"
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "no-console": "warn"
  }
}
 2. .vscode/settings.json {
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
 3. .vscode/extensions.json {
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "Prisma.prisma",
    "ms-vscode.vscode-typescript-next"
  ]
}
 4. อัพเดท .gitignore # Logs
logs/
*.log

# IDE
.vscode/
.idea/

# Build artifacts
.vite/
dist/
out/
.next/

# Database
*.db
*.db-journal
 3.2 Agent Organization (จัดหมวดหมู่) โครงสร้างใหม่: agents/
├── development/         # 100+ coding/testing agents
├── writing/            # 80+ content/translation agents
├── business/           # 60+ marketing/consulting agents
├── education/          # 50+ tutoring agents
└── creative/           # 40+ art/design agents
 Migration Script: # สคริปต์จัดหมวดหมู่ agents อัตโนมัติ
pnpm run organize:agents
 3.3 Test Organization (จัดโครงสร้างใหม่) โครงสร้างใหม่: __tests__/e2e/
├── chat/              # chat_*.spec.ts
├── providers/         # azure_*, ollama_*
├── context/           # context_*, mention_*
├── apps/              # app_*, copy_app_*
└── core/              # setup, main, engine
 3.4 อัพเดทเอกสาร Architecture ไฟล์ที่ต้องอัพเดท: • docs/en/01_architecture/architecture-overview.md • แก้ไขจาก "SQLite only" เป็น "SQLite (Phase 1) + PostgreSQL + Redis (Phase 2+)" • เพิ่ม multi-service architecture diagram    ส่วนที่ 4: แผนการดำเนินงาน (Implementation Plan) Phase 1: Configuration & Quick Wins (สัปดาห์ที่ 1) 1. ✅ สร้าง missing config files (.eslintrc.json, .vscode/*) 2. ✅ อัพเดท .gitignore 3. ✅ สร้างโครงสร้างโฟลเดอร์ docs/ 4. ✅ สร้าง ADR templates 5. ✅ สร้าง CONTRIBUTING.md  Phase 2: Core Documentation (สัปดาห์ที่ 2-3) 1. ✅ เขียน Architecture Overview (EN + TH) 2. ✅ สร้าง C4 Model diagrams (Mermaid) 3. ✅ เขียน API documentation ทุก endpoints 4. ✅ สร้าง ERD และ database schema docs 5. ✅ เขียน ADRs ทั้ง 5 ฉบับ  Phase 3: GitHub Actions - Core CI (สัปดาห์ที่ 4) 1. ✅ สร้าง ci.yml (lint, type-check, tests) 2. ✅ สร้าง build-verification.yml 3. ✅ สร้าง database-check.yml 4. ✅ ทดสอบ workflows กับ sample PRs 5. ✅ Setup status badges  Phase 4: GitHub Actions - Release (สัปดาห์ที่ 5) 1. ✅ สร้าง electron-release.yml 2. ✅ Setup code signing (macOS + Windows) 3. ✅ ทดสอบ release process 4. ✅ สร้าง docker-build.yml 5. ✅ Setup GHCR integration  Phase 5: Security & Quality (สัปดาห์ที่ 6) 1. ✅ สร้าง security-scan.yml 2. ✅ Setup CodeQL 3. ✅ Setup Dependabot 4. ✅ สร้าง performance-test.yml  Phase 6: Organization & Cleanup (สัปดาห์ที่ 7) 1. ✅ Organize agents by category 2. ✅ Reorganize E2E tests 3. ✅ อัพเดท Architecture.md 4. ✅ Final validation & testing    ส่วนที่ 5: ไฟล์สำคัญที่ต้องอ่านก่อนเริ่มงาน Documentation Implementation: 1. apps/server/src/routers/skill.router.ts - Skill API endpoints 2. apps/server/src/routers/credential.router.ts - Credential API 3. apps/server/src/services/claude-service.ts - AI integration 4. apps/server/prisma/schema.prisma - Database schema 5. apps/client/forge.config.ts - Electron configuration  Workflow Implementation: 1. apps/client/package.json - Build scripts 2. apps/client/forge.config.ts - Electron Forge config 3. package.json (root) - Workspace scripts 4. __tests__/e2e/helpers/test_helper.ts - E2E setup 5. .env.example - Environment variables    ส่วนที่ 6: การจัดการ 2 ภาษา (Bilingual Strategy) Strategy: • โครงสร้าง: แยกโฟลเดอร์ docs/en/ และ docs/th/ • Naming: ใช้ชื่อไฟล์เดียวกันทั้ง 2 ภาษา • Navigation: สร้าง index ที่ link ระหว่างภาษา • Maintenance: ◦ เขียน EN ก่อน (primary) ◦ แปลเป็น TH (พร้อม cultural adaptation) ◦ ใช้ AI ช่วยแปล + human review    Translation Workflow: # สร้างเอกสาร EN
docs/en/01_architecture/architecture-overview.md

# แปลเป็น TH
docs/th/01_architecture/architecture-overview.md

# Validate
pnpm run validate:docs
   🎯 ผลลัพธ์ที่คาดหวัง Documentation Deliverables: • ✅ 50+ เอกสาร ครอบคลุมทุกด้าน (EN + TH) • ✅ 15+ Diagrams (C4, ERD, Sequence, Flow) • ✅ 5 ADRs บันทึกการตัดสินใจสำคัญ • ✅ Complete API docs ทุก tRPC endpoints • ✅ Deployment guides สำหรับทุก platform  GitHub Actions Deliverables: • ✅ 6 Primary Workflows (CI, Build, DB, Release, Docker, Security) • ✅ Automated Testing (Unit, Integration, E2E) • ✅ Multi-platform Release (Win, Mac, Linux) • ✅ Security Scanning (Dependencies, Code, Secrets) • ✅ Performance Monitoring  Code Quality Deliverables: • ✅ Configuration Files (ESLint, Prettier, VS Code) • ✅ Organized Codebase (Agents categorized, Tests structured) • ✅ Updated Architecture Docs (Sync with reality) • ✅ CONTRIBUTING.md (Onboarding guide)    📊 Project Health Improvement Before: 8.5/10 After (Expected): 9.5/10 Improvements: • Configuration: 6/10 → 10/10 ✅ • Consistency: 7/10 → 10/10 ✅ • Documentation: 9/10 → 10/10 ✅ • Automation: 9/10 → 10/10 ✅    🚀 Ready for Implementation แผนนี้พร้อมสำหรับการดำเนินการทันที โดยมี: 1. ✅ โครงสร้างที่ชัดเจน 2. ✅ Timeline ที่เป็นจริง (7 สัปดาห์) 3. ✅ Actionable tasks 4. ✅ Templates พร้อมใช้ 5. ✅ ไฟล์สำคัญที่ต้องอ่าน
# Tasks: Skill Builder Core

**Input**: Design documents from `/specs/001-skill-builder-core/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: Optional (not explicitly requested - will be added in Polish phase if needed)

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US3, US4)
- Exact file paths included in descriptions

## Path Conventions

```
apps/
├── client/src/           # Frontend (Next.js 15)
├── server/src/           # Backend (tRPC + Prisma)
└── packages/shared/src/  # Shared types/schemas
```

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, database setup, and core configuration

- [x] T001 Update Prisma schema for SQLite in apps/server/prisma/schema.prisma (copy from data-model.md)
- [x] T002 Run Prisma generate and create initial migration in apps/server/prisma/migrations/
- [x] T003 [P] Create shared Zod schemas in packages/shared/src/schemas/skill.schema.ts
- [x] T004 [P] Create shared Zod schemas in packages/shared/src/schemas/credential.schema.ts
- [x] T005 [P] Create shared Zod schemas in packages/shared/src/schemas/chat.schema.ts
- [x] T006 [P] Create shared TypeScript types in packages/shared/src/types/index.ts
- [x] T007 Update tRPC context for SQLite in apps/server/src/context.ts
- [x] T008 [P] Configure environment variables for SQLite path in apps/server/.env

**Checkpoint**: ✅ Database and shared types ready

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T009 Implement encryption utility for credentials in apps/server/src/services/encryption.service.ts
- [x] T010 [P] Create base error handling utilities in apps/server/src/utils/errors.ts
- [x] T011 [P] Setup structured JSON logging in apps/server/src/utils/logger.ts
- [x] T012 Create AppSettings service for shared config in apps/server/src/services/settings.service.ts
- [x] T013 [P] Create base UI layout component (integrated in page.tsx)
- [x] T014 [P] Setup tRPC client in apps/client/src/trpc/client.ts
- [x] T015 Verify tRPC client connection in apps/client/src/trpc/provider.tsx

**Checkpoint**: ✅ Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 3 - Configure API Credentials (Priority: P1) 🎯 MVP Prerequisite

**Goal**: Users can configure AWS Bedrock or OpenRouter credentials to enable skill testing

**Independent Test**: Add API credentials, verify encryption, validate with API call

**Why First**: API credentials are required before skill testing works (blocks US1 testing feature)

### Backend Implementation for US3 ✅

- [x] T016 [P] [US3] Create credential types in packages/shared/src/types/index.ts (Provider, BedrockCredentials, OpenRouterCredentials)
- [x] T017 [US3] Implement CredentialService with encryption in apps/server/src/services/credential.service.ts
- [x] T018 [US3] Implement Bedrock integration in apps/server/src/routers/chat.router.ts (sendBedrockMessage)
- [x] T019 [P] [US3] Implement OpenRouter integration in apps/server/src/routers/chat.router.ts (sendOpenRouterMessage)
- [x] T020 [US3] Implement credential.router.ts in apps/server/src/routers/credential.router.ts
- [x] T021 [US3] Add credential router to root router in apps/server/src/routers/_app.ts

### Frontend Implementation for US3 ✅

- [x] T022 [P] [US3] State management integrated in Settings page (useState hooks)
- [x] T023 [P] [US3] Create CredentialForm (integrated in apps/client/src/app/settings/page.tsx)
- [x] T024 [P] [US3] Create ProviderSelector tabs (integrated in apps/client/src/app/settings/page.tsx)
- [x] T025 [US3] Create Settings page in apps/client/src/app/settings/page.tsx
- [x] T026 [US3] Add credential validation/test feedback (integrated in settings page)

**Checkpoint**: ✅ API credentials can be saved, encrypted, and validated - US3 COMPLETE

---

## Phase 4: User Story 1 - Create and Test a Skill (Priority: P1) 🎯 MVP Core

**Goal**: Users can create a skill, write prompt content, and test it with Claude API streaming responses

**Independent Test**: Create skill, open test chat, send message, verify Claude responds with streaming

### Backend Implementation for US1 ✅

- [x] T027 [P] [US1] Create Skill Zod schema in packages/shared/src/schemas/skill.schema.ts
- [x] T028 [US1] Implement skill CRUD in apps/server/src/routers/skill.router.ts (create, list, getById, update, delete)
- [x] T029 [US1] Implement skill.router.ts per contract in apps/server/src/routers/skill.router.ts
- [x] T030 [US1] Implement Claude API calls (Bedrock + OpenRouter) in apps/server/src/routers/chat.router.ts
- [x] T031 [US1] Implement chat.sendMessage mutation in apps/server/src/routers/chat.router.ts
- [x] T032 [US1] Implement chat.status query in apps/server/src/routers/chat.router.ts
- [x] T033 [US1] Add skill and chat routers to root router in apps/server/src/routers/_app.ts

### Frontend Implementation for US1 ✅

- [x] T034 [P] [US1] Skill state management in page component (useState hooks)
- [x] T035 [P] [US1] Chat state management in page component (useState hooks)
- [x] T036 [P] [US1] Create Monaco editor integration in apps/client/src/app/page.tsx
- [x] T037 [P] [US1] Create skill form fields (name, description) in apps/client/src/app/page.tsx
- [x] T038 [US1] Implement skill list sidebar with search in apps/client/src/app/page.tsx
- [x] T039 [P] [US1] Create chat message display in apps/client/src/app/page.tsx
- [x] T040 [P] [US1] Create chat input component in apps/client/src/app/page.tsx
- [x] T041 [US1] Create chat panel with toggle in apps/client/src/app/page.tsx
- [x] T042 [US1] Implement unsaved changes indicator in apps/client/src/app/page.tsx
- [x] T043 [US1] Implement chat status warning display in apps/client/src/app/page.tsx

**Checkpoint**: ✅ Users can create skills and test them with Claude API - MVP Core COMPLETE

---

## Phase 5: User Story 4 - Manage and Organize Skills (Priority: P2)

**Goal**: Users can view, edit, delete skills and browse version history

**Independent Test**: View dashboard with skill list, edit a skill, view version history, restore previous version

### Backend Implementation for US4 (Partial)

- [ ] T044 [US4] Add version history methods to SkillService in apps/server/src/services/skill.service.ts
- [ ] T045 [US4] Add getVersions and restoreVersion to skill.router in apps/server/src/routers/skill.router.ts
- [ ] T046 [US4] Implement version pruning (keep last 10) in apps/server/src/services/skill.service.ts

### Frontend Implementation for US4 ✅ (Core Complete)

- [x] T047 [P] [US4] Skill list in sidebar - apps/client/src/app/page.tsx
- [x] T048 [P] [US4] Skill items showing name and version - apps/client/src/app/page.tsx
- [x] T049 [US4] Dashboard with skill list and editor - apps/client/src/app/page.tsx
- [ ] T050 [P] [US4] Create VersionHistory component in apps/client/src/components/skill/VersionHistory.tsx
- [x] T051 [P] [US4] Delete confirmation via browser confirm() - apps/client/src/app/page.tsx
- [ ] T052 [US4] Add version history panel to skill editor
- [x] T053 [US4] Skill search/filter in sidebar - apps/client/src/app/page.tsx

**Checkpoint**: 🔄 Core skill management done, version history pending

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T054 [P] Add keyboard shortcuts (Ctrl+S, Ctrl+Enter) in apps/client/src/hooks/useKeyboardShortcuts.ts
- [ ] T055 [P] Add loading states and skeletons in apps/client/src/components/ui/LoadingSkeleton.tsx
- [ ] T056 [P] Add error boundary component in apps/client/src/components/ErrorBoundary.tsx
- [ ] T057 [P] Add toast notifications for actions in apps/client/src/components/ui/Toast.tsx
- [ ] T058 Implement proper error handling across all routers in apps/server/src/middleware/errorHandler.ts
- [ ] T059 Add request/response logging middleware in apps/server/src/middleware/logging.ts
- [ ] T060 [P] Update README with setup instructions at README.md
- [ ] T061 Run quickstart.md validation - verify all steps work
- [ ] T062 Performance audit - verify streaming < 3 seconds, UI < 100ms

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1: Setup
    ↓
Phase 2: Foundational (BLOCKS all user stories)
    ↓
    ├── Phase 3: US3 - API Credentials (P1) ← Required for US1 testing
    │       ↓
    │   Phase 4: US1 - Create & Test Skill (P1) ← MVP COMPLETE HERE
    │       ↓
    │   Phase 5: US4 - Manage Skills (P2)
    │       ↓
    └── Phase 6: Polish
```

### User Story Dependencies

| Story | Depends On | Can Start After |
|-------|------------|-----------------|
| US3 (API Credentials) | Foundational | Phase 2 complete |
| US1 (Create & Test) | US3 (needs credentials for testing) | Phase 3 complete |
| US4 (Manage Skills) | US1 (uses same Skill entity) | Phase 4 complete |

### Within Each User Story

1. Backend: Models → Services → Routers
2. Frontend: Stores → Components → Pages
3. Backend before Frontend (API-First per Constitution)

### Parallel Opportunities

**Phase 1 (Setup):**
```bash
# Run in parallel:
T003, T004, T005, T006, T008  # All shared schemas/types
```

**Phase 2 (Foundational):**
```bash
# Run in parallel:
T010, T011, T013, T014  # Utilities and base components
```

**Phase 3 (US3):**
```bash
# Run in parallel (backend):
T016, T018, T019  # Models and clients

# Run in parallel (frontend):
T022, T023, T024  # Store and components
```

**Phase 4 (US1):**
```bash
# Run in parallel (backend):
T027  # Model (can run with US3 completion)

# Run in parallel (frontend):
T034, T035, T036, T037, T039, T040  # Stores and components
```

**Phase 5 (US4):**
```bash
# Run in parallel (frontend):
T047, T048, T050, T051  # All new components
```

---

## Implementation Strategy

### MVP First (US3 + US1 = Minimum Viable Product)

1. ✅ Complete Phase 1: Setup
2. ✅ Complete Phase 2: Foundational
3. ✅ Complete Phase 3: US3 (API Credentials) - **Full Settings UI with credential management**
4. ✅ Complete Phase 4: US1 (Create & Test Skill) - **Full editor + chat testing UI**
5. 🔄 Phase 5: US4 (Manage Skills) - **Core complete, version history pending**
6. **🎉 MVP COMPLETE** - Users can configure credentials, create skills, and test with Claude!

### Incremental Delivery

| Milestone | Stories Complete | User Value | Status |
|-----------|------------------|------------|--------|
| Setup Done | - | Dev environment ready | ✅ |
| Foundation Done | - | Core infrastructure ready | ✅ |
| US1 Core | US1 | Create skills with Monaco editor | ✅ |
| US3 Complete | US3 | API credential management | ✅ |
| **🎉 MVP** | **US3 + US1** | **Create and test skills with Claude!** | **✅ COMPLETE** |
| Phase 1 Complete | US3 + US1 + US4 | Full skill management + version history | 🔄 |

### Progress Summary

| Phase | Total Tasks | Completed | Remaining |
|-------|-------------|-----------|-----------|
| Phase 1: Setup | 8 | 8 | 0 |
| Phase 2: Foundational | 7 | 7 | 0 |
| Phase 3: US3 (Credentials) | 11 | 11 | 0 ✅ |
| Phase 4: US1 (Create/Test) | 17 | 17 | 0 ✅ |
| Phase 5: US4 (Manage) | 10 | 5 | 5 (version history) |
| Phase 6: Polish | 9 | 0 | 9 |
| **Total** | **62** | **48** | **14** |

---

## Notes

- [P] tasks = different files, no dependencies
- [US#] label maps task to specific user story
- Each user story is independently testable after completion
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Tests are optional - add in Phase 6 if needed for production

---

## Deferred Stories (Phase 2 - Future)

These stories are **not included** in current tasks per spec clarifications:

- **US2**: User Authentication (P3 - Deferred)
- **US5**: Share Skills Publicly (P4 - Deferred)

Will require:
- PostgreSQL/cloud database
- Authentication system (JWT)
- Public URL generation
- Multi-user data isolation

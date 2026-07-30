# Testing Guide

The bl1nk Skill Builder employs a comprehensive testing strategy including unit, integration, and end-to-end (E2E) tests.

## 🧪 Testing Strategy

### 1. Unit Tests (Vitest)
Unit tests focus on individual functions, components, and services in isolation.
- **Location**: `apps/server/src/**/__tests__/*.test.ts`, `apps/client/src/**/__tests__/*.test.tsx`
- **Commands**:
  ```bash
  pnpm test:unit           # Run all unit tests
  pnpm test:unit:watch     # Run unit tests in watch mode
  ```

### 2. Integration Tests
Integration tests verify that different modules of the system work together as expected, particularly the tRPC API and database interactions.

### 3. End-to-End Tests (Playwright)
E2E tests simulate real user interactions in the Electron application.
- **Location**: `__tests__/e2e/`
- **Commands**:
  ```bash
  pnpm test:e2e           # Run all E2E tests
  pnpm test:e2e:ui        # Run E2E tests with UI mode
  pnpm test:e2e:debug     # Run E2E tests in debug mode
  ```
- **Structure**: Tests are organized by feature (e.g., `chat`, `providers`, `core`).

## 🛠️ Test Utilities

### Playwright Helpers
Common test actions are abstracted into `__tests__/e2e/helpers/test_helper.ts` to simplify test writing and maintenance.

### Mocking
We use Vitest mocks for external AI provider APIs and system-level Electron IPC calls to ensure reliable and fast tests.

## ✅ Writing New Tests

1.  **Unit Tests**: Use Vitest's `describe` and `it`/`test` blocks.
2.  **E2E Tests**: Follow the PageObject pattern for maintainable tests.
3.  **Assertions**: Use `expect` for all assertions.

## 📊 Quality Checks

Before submitting a Pull Request, ensure all tests pass:
```bash
pnpm validate    # Runs lint, type-check, and tests
```

### Health Check
Run the project's custom health check script to verify the overall state:
```bash
pnpm health
```

This script verifies:
- Dependencies are installed.
- Client and Server build successfully.
- 15 core skills are present and valid.
- 501 agent templates are present and valid.
- 74+ E2E tests are passing.

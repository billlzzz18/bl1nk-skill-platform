# Organization Plan

## Overview

This document outlines the plan to organize 501 agents and 74 E2E tests into logical category structures for improved maintainability and discoverability.

## Agent Organization

### Current State
- 501 flat JSON files in `agents/` directory
- Difficult to browse and find specific agents
- No logical grouping

### Proposed Structure
```
agents/
├── development/     # 138 agents - coding, programming, software engineering
├── writing/         # 115 agents - content, translation, copywriting
├── education/       #  62 agents - tutoring, language learning
├── data/            #  51 agents - analysis, research, ML/AI
├── creative/        #  48 agents - art, design, music, video
├── business/        #  36 agents - marketing, sales, consulting
└── other/           #  51 agents - miscellaneous
```

### Implementation

**Analysis Complete**: Run `node scripts/organize-agents.js` to see categorization

**To Execute**:
```bash
node scripts/organize-agents.js --execute
```

**What It Does**:
1. Creates category subdirectories
2. Moves agents to appropriate categories
3. Generates README.md in each category
4. Preserves all agent JSON files

**Post-Execution**:
- Update `scripts/validators/validate-agents.js` to scan subdirectories
- Update any agent loading code in `apps/client`
- Test agent discovery still works

## E2E Test Organization

### Current State
- 74 flat test files in `__tests__/e2e/` directory
- Mix of feature areas without clear grouping
- Difficult to run specific test suites

### Proposed Structure
```
__tests__/e2e/
├── chat/            #  8 tests - chat functionality, messages
├── providers/       #  5 tests - Azure, Ollama, LM Studio
├── context/         #  7 tests - context management, mentions
├── apps/            #  8 tests - app CRUD operations
├── editing/         #  9 tests - code editing, undo, approve
├── setup/           #  6 tests - setup, main, engine
├── integrations/    #  8 tests - GitHub, Supabase, MCP
├── ui/              #  4 tests - preview, components, problems
├── templates/       #  4 tests - project templates
├── other/           # 15 tests - miscellaneous
├── fixtures/        # (existing) test data
├── helpers/         # (existing) test utilities
└── snapshots/       # (existing) visual regression
```

### Implementation

**Analysis Complete**: Run `node scripts/organize-tests.js` to see categorization

**To Execute**:
```bash
node scripts/organize-tests.js --execute
```

**What It Does**:
1. Creates category subdirectories
2. Moves test files to appropriate categories
3. Generates README.md in each category
4. Preserves fixtures, helpers, snapshots

**Post-Execution**:
- Update Playwright config if test paths changed
- Update test imports if needed
- Verify all tests still run: `pnpm test:e2e`

## Benefits

### Agent Organization
- **Discoverability**: Find agents by category
- **Maintenance**: Easier to update related agents
- **Documentation**: Category READMEs provide overview
- **Scalability**: Easy to add new agents to categories

### Test Organization
- **Targeted Testing**: Run specific test suites
- **Faster Development**: Test only relevant features
- **Better CI/CD**: Parallel test execution by category
- **Clarity**: Clear test organization for new contributors

## Rollback Plan

If organization causes issues:

### Agents
```bash
# Move all agents back to root
find agents/*/ -name "*.json" -exec mv {} agents/ \;
# Remove category directories
rm -rf agents/*/
```

### Tests
```bash
# Move all tests back to root
find __tests__/e2e/*/ -name "*.spec.ts" -exec mv {} __tests__/e2e/ \;
# Remove category directories (preserve fixtures, helpers, snapshots)
rm -rf __tests__/e2e/chat/ __tests__/e2e/providers/ # etc.
```

## Validation

After organization:

```bash
# Validate agents still work
pnpm validate:agents

# Run health check
pnpm health

# Run all tests
pnpm test:e2e

# Check application loads agents
pnpm dev
# Open app and verify agent list displays
```

## Timeline

**Immediate** (Optional):
- Review categorization results
- Decide if organization is beneficial
- Execute if approved

**Post-Organization**:
- Update validation scripts
- Update documentation
- Test thoroughly
- Commit changes

## Decision

**Status**: Ready to execute
**Risk**: Low (easily reversible)
**Benefit**: High (improved organization)

**To proceed**:
1. Review categorization: `node scripts/organize-agents.js`
2. Review test organization: `node scripts/organize-tests.js`
3. Execute if satisfied: Add `--execute` flag
4. Validate and test
5. Commit changes

**To skip**: No action needed, keep current flat structure

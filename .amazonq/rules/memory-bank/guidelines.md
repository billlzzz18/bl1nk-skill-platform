# Development Guidelines

## Code Quality Standards

### TypeScript Configuration
- **Strict Mode**: Always enabled across all packages
- **Target**: ES2022 with ESNext modules
- **Type Safety**: Explicit return types on all exported functions
- **No Any**: Avoid `any` types; use `unknown` or proper typing
- **Type Imports**: Use `import type` for type-only imports

```typescript
// ✅ Good - Explicit return type and type import
import type { ReactNode } from "react"

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// ❌ Bad - No return type, regular import for types
import { ReactNode } from "react"

export function formatDate(date: any) {
  return date.toLocaleDateString()
}
```

### Code Formatting Standards
- **Prettier Configuration** (enforced via `.prettierrc`):
  - Semicolons: Always (`semi: true`)
  - Quotes: Single quotes (`singleQuote: true`)
  - Trailing commas: ES5 style (`trailingComma: "es5"`)
  - Print width: 100 characters
  - Tab width: 2 spaces
  - No tabs (`useTabs: false`)
  - Arrow parens: Always (`arrowParens: "always"`)
  - Line endings: LF (`endOfLine: "lf"`)

### Naming Conventions
- **Files**: 
  - Components: PascalCase (e.g., `ChatInput.tsx`, `ModelPicker.tsx`)
  - Utilities: camelCase (e.g., `utils.ts`, `lm_studio_utils.ts`)
  - Config: kebab-case (e.g., `forge.config.ts`, `vite.main.config.mts`)
- **Variables/Functions**: camelCase (e.g., `formatDate`, `replacePromptReference`)
- **Types/Interfaces**: PascalCase (e.g., `ForgeConfig`, `VariantProps`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `LM_STUDIO_BASE_URL`)

### Documentation Standards
- **JSDoc Comments**: Use for exported functions and complex logic
- **Inline Comments**: Explain "why" not "what"
- **File Headers**: Include purpose for utility files

```typescript
/**
 * Root Layout
 *
 * Wraps the entire application with necessary providers:
 * - TRPCProvider: React Query + tRPC for API calls
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  // Implementation
}
```

## React & Next.js Patterns

### Component Structure
- **Functional Components**: Always use function declarations, not arrow functions for components
- **Type Annotations**: Use React.ComponentProps for extending native elements
- **Props Destructuring**: Destructure props in function signature

```typescript
// ✅ Good - Function declaration with proper typing
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {
  asChild?: boolean;
}) {
  return <button {...props} />
}

// ❌ Bad - Arrow function, unclear typing
const Button = (props: any) => {
  return <button {...props} />
}
```

### Component Composition
- **Radix UI Primitives**: Use as base for custom components
- **Slot Pattern**: Use `@radix-ui/react-slot` for polymorphic components
- **Variant System**: Use `class-variance-authority` (CVA) for component variants

```typescript
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-classes",
        destructive: "destructive-classes",
      },
      size: {
        default: "h-9 px-4",
        sm: "h-8 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

### Routing Pattern
- **TanStack Router**: Use for type-safe routing
- **Route Definition**: Create routes with `createRootRoute`
- **Layout Pattern**: Wrap routes with layout components using `<Outlet />`

```typescript
import { createRootRoute, Outlet } from "@tanstack/react-router";
import Layout from "../app/layout";

export const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});
```

### State Management
- **Jotai**: Primary state management (atomic state)
- **Zustand**: Alternative for complex state
- **TanStack Query**: Server state and caching via tRPC

## Styling Patterns

### Tailwind CSS Usage
- **Utility Classes**: Prefer Tailwind utilities over custom CSS
- **Dark Mode**: Use `dark:` prefix for dark mode variants
- **Responsive**: Use responsive prefixes (`sm:`, `md:`, `lg:`)
- **Class Merging**: Use `cn()` utility for conditional classes

```typescript
import { cn } from "@/lib/utils";

// ✅ Good - Using cn() for class merging
<div className={cn(
  "base-classes",
  variant === "primary" && "primary-classes",
  className
)} />

// ❌ Bad - String concatenation
<div className={"base-classes " + (variant === "primary" ? "primary-classes" : "") + " " + className} />
```

### Class Name Utility
```typescript
/**
 * Simple class name concatenator.
 * Filters out falsy values and joins class names with spaces.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
```

## Backend Patterns

### tRPC Router Structure
- **Router Organization**: Separate routers by domain (skill, credential, etc.)
- **Context Pattern**: Use `createContext` for shared dependencies
- **Middleware**: Validate encryption config at startup

```typescript
import express from 'express'
import cors from 'cors'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { appRouter } from './routers/_app'
import { createContext } from './context'

const app = express()

// Middleware
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())

// tRPC endpoint
app.use('/trpc', createExpressMiddleware({
  router: appRouter,
  createContext,
}))
```

### Error Handling
- **Validation**: Validate critical config at startup
- **Logging**: Use structured logging with logger utility
- **Exit on Critical Errors**: Exit process if encryption config invalid

```typescript
try {
  validateEncryptionConfig()
  logger.info('Encryption configuration validated')
} catch (error) {
  logger.error('Encryption configuration invalid', {
    error: error instanceof Error ? error.message : 'Unknown error',
  })
  process.exit(1)
}
```

### API Endpoints
- **Health Check**: Always include `/health` endpoint
- **Documentation**: Redirect `/docs` to API documentation
- **Versioning**: Use `/v1` prefix for REST endpoints

## Environment Configuration

### Environment Variables
- **Fallback Values**: Provide defaults using `||` operator
- **Testing Overrides**: Support `*_FOR_TESTING` variants

```typescript
export const LM_STUDIO_BASE_URL =
  process.env.LM_STUDIO_BASE_URL_FOR_TESTING || "http://localhost:1234";
```

### Configuration Loading
- **dotenv**: Load at server startup
- **Validation**: Validate required variables early

```typescript
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()
```

## Utility Functions

### String Manipulation
- **Regex Replacement**: Use named capture groups for clarity
- **Type Guards**: Check types before processing

```typescript
export function replacePromptReference(
  userPrompt: string,
  promptsById: Record<number | string, string>,
): string {
  if (typeof userPrompt !== "string" || userPrompt.length === 0)
    return userPrompt;

  return userPrompt.replace(
    /@prompt:(\d+)/g,
    (_match: string, idStr: string) => {
      const idNum = Number(idStr);
      const replacement = promptsById[idNum] ?? promptsById[idStr];
      return replacement !== undefined ? replacement : _match;
    },
  );
}
```

## Electron Configuration

### Forge Configuration Patterns
- **Conditional Config**: Use environment variables for test builds
- **Security**: Enable security fuses in production
- **Code Signing**: Configure platform-specific signing

```typescript
const isEndToEndTestBuild = process.env.E2E_TEST_BUILD === "true";

const config: ForgeConfig = {
  packagerConfig: {
    osxSign: isEndToEndTestBuild ? undefined : {
      identity: process.env.APPLE_TEAM_ID,
    },
    osxNotarize: isEndToEndTestBuild ? undefined : {
      appleId: process.env.APPLE_ID!,
      appleIdPassword: process.env.APPLE_PASSWORD!,
      teamId: process.env.APPLE_TEAM_ID!,
    },
  },
};
```

### File Ignore Patterns
- **Custom Ignore Function**: Filter files during packaging
- **Preserve Critical Modules**: Don't ignore native modules

```typescript
const ignore = (file: string) => {
  if (!file) return false;
  if (file === "/node_modules") return false;
  if (file.startsWith("/drizzle")) return false;
  if (file.startsWith("/node_modules/better-sqlite3")) return false;
  return true;
};
```

## Testing Patterns

### E2E Testing
- **Playwright**: Use for end-to-end tests
- **Fixtures**: Organize test data in `__tests__/e2e/fixtures/`
- **Helpers**: Create reusable test helpers
- **Snapshots**: Use for visual regression testing

### Test Organization
- **Feature-Based**: Group tests by feature (80+ specs)
- **Naming**: Use descriptive `.spec.ts` names
- **Coverage**: Aim for critical path coverage

## Build & Deployment

### Monorepo Commands
- **Parallel Execution**: Use `pnpm --parallel -r` for dev
- **Sequential Builds**: Use `pnpm -r build` for production
- **Workspace Scripts**: Define at root and package level

### Package Scripts Pattern
```json
{
  "scripts": {
    "dev": "pnpm --parallel -r dev",
    "build": "pnpm -r build",
    "test": "pnpm -r test",
    "lint": "pnpm -r lint",
    "clean": "pnpm -r clean && rm -rf node_modules"
  }
}
```

## Security Best Practices

### Credential Management
- **Encryption**: Always encrypt API credentials
- **Environment Variables**: Never commit credentials
- **Validation**: Validate encryption config at startup

### Electron Security
- **Fuses**: Enable security fuses in production
- **Context Isolation**: Use preload scripts
- **Node Integration**: Disable in renderer when possible

```typescript
new FusesPlugin({
  version: FuseVersion.V1,
  [FuseV1Options.RunAsNode]: false,
  [FuseV1Options.EnableCookieEncryption]: true,
  [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
  [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
  [FuseV1Options.OnlyLoadAppFromAsar]: true,
})
```

## Git Workflow

### Pre-commit Hooks
- **lint-staged**: Configured via `.lintstagedrc.json`
- **Auto-fix**: ESLint and Prettier run automatically
- **Prisma Format**: Format schema files

```json
{
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{js,jsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,yml,yaml}": ["prettier --write"],
  "apps/server/prisma/schema.prisma": ["prisma format"]
}
```

## Performance Optimization

### Build Optimizations
- **Vite**: Fast HMR and build times
- **Code Splitting**: Automatic in Next.js
- **Tree Shaking**: Enabled by default
- **Native Modules**: Auto-unpack with Electron Forge plugin

### Runtime Optimizations
- **React 19**: Use concurrent features
- **Jotai**: Atomic updates prevent unnecessary re-renders
- **TanStack Query**: Automatic caching and deduplication
- **SQLite**: Fast local storage with better-sqlite3

## Common Patterns

### Metadata Export
```typescript
export const metadata = {
  title: "Claude Skill Builder",
  description: "Create, manage, and test Claude AI skills",
}
```

### Provider Wrapping
```typescript
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-gray-900 text-white antialiased">
        <TRPCProvider>
          {children}
        </TRPCProvider>
      </body>
    </html>
  )
}
```

### Conditional Rendering
```typescript
// Use ternary for simple conditions
{isLoading ? <Spinner /> : <Content />}

// Use && for single condition
{error && <ErrorMessage error={error} />}

// Use early returns in functions
if (!data) return null;
return <Component data={data} />;
```

## Anti-Patterns to Avoid

### Don't
- ❌ Use `any` type without justification
- ❌ Mutate props or state directly
- ❌ Create components with arrow functions at top level
- ❌ Concatenate class names manually
- ❌ Commit environment variables or credentials
- ❌ Skip type annotations on exported functions
- ❌ Use `var` (use `const` or `let`)
- ❌ Ignore linting errors
- ❌ Skip pre-commit hooks

### Do
- ✅ Use explicit types and interfaces
- ✅ Use immutable updates
- ✅ Use function declarations for components
- ✅ Use `cn()` utility for class merging
- ✅ Use `.env.example` for documentation
- ✅ Add return types to all exported functions
- ✅ Use `const` by default, `let` when needed
- ✅ Fix linting errors before committing
- ✅ Run pre-commit hooks

## IDE Configuration

### VS Code Recommended Extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Prisma
- Playwright Test for VS Code

### VS Code Settings
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## Validation Scripts

### Agent/Skill Validation
- **validate-skills.js**: Validates skill structure (SKILL.md, LICENSE.txt)
- **validate-agents.js**: Validates 500+ agent JSON files
- **health-check.js**: Overall project health monitoring

### Running Validators
```bash
node scripts/validators/validate-skills.js
node scripts/validators/validate-agents.js
node scripts/health-check.js
```

## Logging Standards

### Structured Logging
- Use logger utility for consistent formatting
- Include context in error logs
- Log levels: info, warn, error

```typescript
logger.info('Server running on http://localhost:${PORT}')
logger.error('Encryption configuration invalid', {
  error: error instanceof Error ? error.message : 'Unknown error',
})
```

## Summary

This codebase follows modern TypeScript and React best practices with:
- Strict type safety across all packages
- Consistent code formatting via Prettier
- Component composition with Radix UI primitives
- Type-safe APIs with tRPC
- Monorepo architecture with pnpm workspaces
- Comprehensive testing with Playwright
- Security-first approach for Electron apps
- Automated quality checks via pre-commit hooks

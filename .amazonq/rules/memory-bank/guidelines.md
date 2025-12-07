# Development Guidelines

## Code Quality Standards

### TypeScript Conventions

**Explicit Type Annotations**
- Always provide explicit return types for functions
- Use type imports with `import type` for type-only imports
- Prefer interfaces for object shapes, types for unions/intersections
- Use `unknown` instead of `any` when type is truly unknown

```typescript
// Good
async function getApp(appId: number): Promise<App> {
  const app = await db.query.apps.findFirst({
    where: eq(apps.id, appId),
  });
  return app;
}

// Avoid
async function getApp(appId) {
  return await db.query.apps.findFirst({
    where: eq(apps.id, appId),
  });
}
```

**Strict Null Checking**
- Always handle null/undefined cases explicitly
- Use optional chaining (`?.`) and nullish coalescing (`??`)
- Check for existence before accessing properties

```typescript
// Good
if (!app) {
  throw new Error("App not found");
}

const projectName = app.supabaseProjectId && settings.supabase?.accessToken?.value
  ? await getSupabaseProjectName(app.supabaseProjectId)
  : null;

// Avoid
const projectName = await getSupabaseProjectName(app.supabaseProjectId);
```

### Naming Conventions

**Variables and Functions**
- Use camelCase for variables and functions
- Use descriptive names that indicate purpose
- Boolean variables should start with `is`, `has`, `should`, `can`
- Async functions should clearly indicate asynchronous nature

```typescript
const isRunning = true;
const hasChanges = false;
const shouldReadFileContents = (filePath: string) => { /* ... */ };
async function executeApp({ appPath, appId }: ExecuteAppParams): Promise<void> { /* ... */ }
```

**Constants**
- Use UPPER_SNAKE_CASE for true constants
- Group related constants together
- Document purpose with comments

```typescript
const DEFAULT_COMMAND = "(pnpm install && pnpm run dev --port 32100)";
const MAX_FILE_SIZE = 1000 * 1024; // 1MB
const EXCLUDED_DIRS = ["node_modules", ".git", "dist"];
```

**Types and Interfaces**
- Use PascalCase for type/interface names
- Suffix with descriptive term when needed (e.g., `Params`, `Result`, `Config`)
- Keep interfaces focused and single-purpose

```typescript
interface CreateAppParams {
  name: string;
}

interface SecurityFinding {
  title: string;
  level: "critical" | "high" | "medium" | "low";
  description: string;
}
```

## Architectural Patterns

### Error Handling

**Comprehensive Error Handling**
- Always wrap risky operations in try-catch
- Log errors with context using electron-log
- Provide meaningful error messages to users
- Clean up resources in finally blocks

```typescript
try {
  await executeApp({ appPath, appId, event, isNeon });
  return;
} catch (error: any) {
  logger.error(`Error running app ${appId}:`, error);
  // Cleanup if needed
  if (runningApps.has(appId)) {
    runningApps.delete(appId);
  }
  throw new Error(`Failed to run app ${appId}: ${error.message}`);
}
```

**Graceful Degradation**
- Continue operation when non-critical errors occur
- Log warnings for recoverable issues
- Only throw for critical failures

```typescript
try {
  await git.remove({ fs, dir: appPath, filepath: filePath });
} catch (error) {
  logger.warn(`Failed to git remove deleted file ${filePath}:`, error);
  // Continue even if remove fails as the file was still deleted
}
```

### Async/Await Patterns

**Consistent Async Handling**
- Use async/await over raw promises
- Handle promise rejections explicitly
- Use Promise.all for parallel operations
- Avoid blocking operations in loops

```typescript
// Good - Parallel execution
const promises = entries.map(async (entry) => {
  const fullPath = path.join(dir, entry.name);
  if (entry.isDirectory()) {
    const subDirFiles = await collectFiles(fullPath, baseDir);
    files.push(...subDirFiles);
  }
});
await Promise.all(promises);

// Avoid - Sequential execution
for (const entry of entries) {
  const fullPath = path.join(dir, entry.name);
  if (entry.isDirectory()) {
    const subDirFiles = await collectFiles(fullPath, baseDir);
    files.push(...subDirFiles);
  }
}
```

### State Management

**Centralized State with Atoms**
- Use Jotai atoms for global state
- Keep atoms focused and single-purpose
- Use derived atoms for computed values
- Avoid prop drilling

```typescript
import { useAtomValue, useSetAtom } from "jotai";
import { selectedAppIdAtom } from "@/atoms/appAtoms";

const selectedAppId = useAtomValue(selectedAppIdAtom);
const setSelectedChatId = useSetAtom(selectedChatIdAtom);
```

**Local State Management**
- Use useState for component-local state
- Use useEffect for side effects with proper dependencies
- Clean up effects when component unmounts

```typescript
const [isRunning, setIsRunning] = useState(false);
const [selectedFindings, setSelectedFindings] = useState<Set<string>>(new Set());

useEffect(() => {
  if (selectedCount > 0) {
    setShouldRender(true);
    const timer = setTimeout(() => setIsButtonVisible(true), 10);
    return () => clearTimeout(timer);
  }
}, [selectedCount]);
```

### Database Operations

**Drizzle ORM Patterns**
- Use query builder for type-safe queries
- Always handle not found cases
- Use transactions for multi-step operations
- Leverage relations for joins

```typescript
const app = await db.query.apps.findFirst({
  where: eq(apps.id, appId),
  with: {
    chats: true,
  },
});

if (!app) {
  throw new Error("App not found");
}
```

**Efficient Queries**
- Select only needed columns
- Use proper indexes (defined in schema)
- Avoid N+1 queries with relations
- Batch operations when possible

```typescript
// Good - Single query with relation
const chatWithApp = await db.query.chats.findFirst({
  where: eq(chats.id, chatId),
  with: { app: true },
});

// Avoid - Multiple queries
const chat = await db.query.chats.findFirst({ where: eq(chats.id, chatId) });
const app = await db.query.apps.findFirst({ where: eq(apps.id, chat.appId) });
```

## React Component Patterns

### Component Structure

**Functional Components with Hooks**
- Use functional components exclusively
- Extract complex logic into custom hooks
- Keep components focused and single-purpose
- Use composition over inheritance

```typescript
export const SecurityPanel = () => {
  const selectedAppId = useAtomValue(selectedAppIdAtom);
  const { data, isLoading, error, refetch } = useSecurityReview(selectedAppId);
  
  if (isLoading) return <LoadingView />;
  if (!selectedAppId) return <NoAppSelectedView />;
  
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Component content */}
    </div>
  );
};
```

**Component Decomposition**
- Extract sub-components for clarity
- Pass props explicitly, avoid spreading
- Use children prop for composition
- Keep render logic simple

```typescript
function SecurityHeader({
  isRunning,
  onRun,
  data,
  selectedCount,
  onFixSelected,
}: SecurityHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-background pt-3 pb-3">
      {/* Header content */}
    </div>
  );
}
```

### Event Handling

**Consistent Event Handlers**
- Prefix handlers with `handle` or `on`
- Use arrow functions for inline handlers
- Prevent default when needed
- Stop propagation when appropriate

```typescript
const handleFixIssue = async (finding: SecurityFinding) => {
  if (!selectedAppId) {
    showError("No app selected");
    return;
  }
  
  try {
    setFixingFindingKey(createFindingKey(finding));
    // Fix logic
  } catch (err) {
    showError(`Failed to create fix chat: ${err}`);
  } finally {
    setFixingFindingKey(null);
  }
};

<Button onClick={() => handleFixIssue(finding)}>Fix Issue</Button>
```

### Conditional Rendering

**Clear Conditional Logic**
- Use early returns for loading/error states
- Prefer ternary for simple conditions
- Extract complex conditions to variables
- Use logical AND for conditional rendering

```typescript
if (isLoading) return <LoadingView />;
if (!selectedAppId) return <NoAppSelectedView />;

return (
  <div>
    {isRunning ? (
      <RunningReviewCard />
    ) : data && data.findings.length > 0 ? (
      <FindingsTable findings={data.findings} />
    ) : (
      <NoIssuesCard data={data} />
    )}
  </div>
);
```

## File System Operations

### Path Handling

**Safe Path Operations**
- Always use path.join for cross-platform compatibility
- Validate paths before operations
- Check for path traversal attacks
- Normalize paths consistently

```typescript
const fullPath = path.join(appPath, filePath);

// Security check
if (!fullPath.startsWith(appPath)) {
  throw new Error("Invalid file path");
}

// Normalize for consistency
const normalizedPath = path.relative(appPath, file)
  .split(path.sep)
  .join("/");
```

**File Existence Checks**
- Check existence before operations
- Handle missing files gracefully
- Use async file operations
- Clean up temporary files

```typescript
if (!fs.existsSync(fullPath)) {
  throw new Error("File not found");
}

try {
  const content = await fsPromises.readFile(fullPath, "utf-8");
  return content;
} catch (error) {
  logger.error(`Error reading file ${filePath}:`, error);
  throw new Error("Failed to read file");
}
```

### Caching Strategies

**File Content Caching**
- Cache based on modification time
- Implement cache size limits
- Clear stale entries
- Use Map for O(1) lookups

```typescript
const stats = await fsAsync.stat(filePath);
const currentMtime = stats.mtimeMs;

if (fileContentCache.has(filePath)) {
  const cache = fileContentCache.get(filePath)!;
  if (cache.mtime === currentMtime) {
    return cache.content;
  }
}

fileContentCache.set(filePath, {
  content,
  mtime: currentMtime,
});

// Manage cache size
if (fileContentCache.size > MAX_FILE_CACHE_SIZE) {
  const entriesToDelete = Math.ceil(MAX_FILE_CACHE_SIZE * 0.25);
  const keys = Array.from(fileContentCache.keys());
  for (let i = 0; i < entriesToDelete; i++) {
    fileContentCache.delete(keys[i]);
  }
}
```

## Process Management

### Child Process Handling

**Spawn Process Pattern**
- Use spawn for long-running processes
- Pipe stdio for output capture
- Handle process lifecycle events
- Clean up on exit

```typescript
const spawnedProcess = spawn(command, [], {
  cwd: appPath,
  shell: true,
  stdio: "pipe",
  detached: false,
});

if (!spawnedProcess.pid) {
  throw new Error("Failed to spawn process");
}

spawnedProcess.stdout?.on("data", (data) => {
  const message = util.stripVTControlCharacters(data.toString());
  logger.debug(`App ${appId} stdout: ${message}`);
  safeSend(event.sender, "app:output", { type: "stdout", message, appId });
});

spawnedProcess.on("close", (code, signal) => {
  logger.log(`Process closed with code ${code}, signal ${signal}`);
  removeAppIfCurrentProcess(appId, spawnedProcess);
});
```

**Process Cleanup**
- Track running processes
- Implement graceful shutdown
- Handle zombie processes
- Remove from tracking on exit

```typescript
const currentProcessId = processCounter.increment();
runningApps.set(appId, {
  process: spawnedProcess,
  processId: currentProcessId,
  isDocker: false,
});

// Cleanup function
function removeAppIfCurrentProcess(appId: number, process: ChildProcess) {
  const appInfo = runningApps.get(appId);
  if (appInfo && appInfo.process === process) {
    runningApps.delete(appId);
  }
}
```

## Testing Patterns

### Unit Test Structure

**Vitest Test Organization**
- Group related tests with describe blocks
- Use descriptive test names
- Test edge cases explicitly
- Mock external dependencies

```typescript
describe("parseFilesFromMessage", () => {
  describe("bl1nk-read tags", () => {
    it("should parse a single bl1nk-read tag", () => {
      const input = '<bl1nk-read path="src/components/Button.tsx"></bl1nk-read>';
      const result = parseFilesFromMessage(input);
      expect(result).toEqual(["src/components/Button.tsx"]);
    });
    
    it("should handle file paths with special characters", () => {
      const input = '<bl1nk-read path="src/components/@special/Button-v2.tsx"></bl1nk-read>';
      const result = parseFilesFromMessage(input);
      expect(result).toEqual(["src/components/@special/Button-v2.tsx"]);
    });
  });
});
```

**Mock Setup**
- Mock at module level
- Clear mocks between tests
- Use typed mocks
- Verify mock calls

```typescript
vi.mock("@/ipc/utils/git_utils", () => ({
  getFileAtCommit: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

it("should call getFileAtCommit with correct params", async () => {
  const { getFileAtCommit } = await import("@/ipc/utils/git_utils");
  const mockGetFileAtCommit = vi.mocked(getFileAtCommit);
  
  mockGetFileAtCommit.mockResolvedValue("file content");
  
  await processFiles();
  
  expect(mockGetFileAtCommit).toHaveBeenCalledWith({
    path: appPath,
    filePath: "src/file.ts",
    commitHash: "abc123",
  });
});
```

## Logging and Debugging

### Structured Logging

**Electron-log Usage**
- Create scoped loggers for modules
- Use appropriate log levels
- Include context in messages
- Log errors with stack traces

```typescript
const logger = log.scope("app_handlers");

logger.debug(`Starting app ${appId} in path ${app.path}`);
logger.log(`Successfully committed changes: ${changes.join(", ")}`);
logger.warn(`File to delete does not exist: ${fullFilePath}`);
logger.error(`Error running app ${appId}:`, error);
```

**Log Levels**
- `debug`: Detailed diagnostic information
- `log`: General informational messages
- `warn`: Warning messages for recoverable issues
- `error`: Error messages for failures

## Security Practices

### Input Validation

**Path Traversal Prevention**
- Validate all file paths
- Check paths stay within boundaries
- Use safe path joining
- Reject suspicious patterns

```typescript
const fullPath = path.join(appPath, filePath);

if (!fullPath.startsWith(appPath)) {
  throw new Error("Invalid file path");
}
```

**User Input Sanitization**
- Validate all user inputs
- Use Zod schemas for validation
- Escape special characters
- Prevent SQL injection with parameterized queries

```typescript
const pattern = `%${searchQuery.replace(/[%_]/g, "\\\\$&")}%`;
const results = await db
  .select()
  .from(apps)
  .where(like(apps.name, pattern));
```

### Credential Management

**Secure Storage**
- Never log sensitive data
- Use environment variables
- Encrypt credentials at rest
- Clear sensitive data after use

```typescript
// Do NOT log API keys or tokens
logger.log("Fetching data from API"); // Good
logger.log(`API key: ${apiKey}`); // NEVER do this
```

## Performance Optimization

### Efficient Data Processing

**Batch Operations**
- Process items in parallel when possible
- Use Promise.all for concurrent operations
- Avoid sequential processing in loops
- Implement pagination for large datasets

```typescript
// Good - Parallel processing
const promises = files.map(async (file) => {
  return await processFile(file);
});
const results = await Promise.all(promises);

// Avoid - Sequential processing
const results = [];
for (const file of files) {
  results.push(await processFile(file));
}
```

**Memory Management**
- Implement cache size limits
- Clean up unused resources
- Use streams for large files
- Avoid memory leaks with proper cleanup

```typescript
if (fileContentCache.size > MAX_FILE_CACHE_SIZE) {
  const entriesToDelete = Math.ceil(MAX_FILE_CACHE_SIZE * 0.25);
  const keys = Array.from(fileContentCache.keys());
  for (let i = 0; i < entriesToDelete; i++) {
    fileContentCache.delete(keys[i]);
  }
}
```

## Git Operations

### Isomorphic-git Patterns

**Commit Workflow**
- Stage files before committing
- Use descriptive commit messages
- Handle commit failures gracefully
- Store commit hashes for versioning

```typescript
await git.add({
  fs,
  dir: appPath,
  filepath: filePath,
});

const commitHash = await gitCommit({
  path: appPath,
  message: `Updated ${filePath}`,
});

await db
  .update(messages)
  .set({ commitHash })
  .where(eq(messages.id, messageId));
```

**Branch Operations**
- Check branch existence before operations
- Handle rename conflicts
- Use proper error messages
- Lock operations to prevent conflicts

```typescript
const branches = await git.listBranches({ fs, dir: appPath });
if (!branches.includes(oldBranchName)) {
  throw new Error(`Branch '${oldBranchName}' not found.`);
}

if (branches.includes(newBranchName)) {
  throw new Error(`Branch '${newBranchName}' already exists.`);
}

await git.renameBranch({
  fs,
  dir: appPath,
  oldref: oldBranchName,
  ref: newBranchName,
});
```

## UI/UX Patterns

### Loading States

**Progressive Loading**
- Show loading indicators immediately
- Provide feedback during operations
- Handle loading errors gracefully
- Disable actions during loading

```typescript
const [isRunning, setIsRunning] = useState(false);

const handleRun = async () => {
  setIsRunning(true);
  try {
    await runOperation();
  } catch (err) {
    showError(`Operation failed: ${err}`);
  } finally {
    setIsRunning(false);
  }
};

<Button disabled={isRunning}>
  {isRunning ? "Running..." : "Run"}
</Button>
```

### User Feedback

**Toast Notifications**
- Use appropriate severity levels
- Provide actionable messages
- Keep messages concise
- Show success confirmations

```typescript
import { showSuccess, showError, showWarning } from "@/lib/toast";

try {
  await saveChanges();
  showSuccess("Changes saved successfully");
} catch (err) {
  showError(`Failed to save: ${err.message}`);
}
```

## Code Organization

### Module Structure

**File Organization**
- Group related functionality
- Use index files for exports
- Keep files focused and small
- Follow consistent naming

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── preview_panel/   # Feature-specific components
│   └── chat/            # Chat-related components
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── ipc/                 # IPC handlers and processors
│   ├── handlers/        # IPC request handlers
│   ├── processors/      # Response processors
│   └── utils/           # IPC utilities
└── atoms/               # Jotai state atoms
```

### Import Organization

**Import Order**
1. External dependencies
2. Internal modules (absolute imports)
3. Relative imports
4. Type imports (separate)

```typescript
// External
import { ipcMain, app } from "electron";
import fs from "node:fs";
import path from "node:path";

// Internal
import { db } from "@/db";
import { getBl1nkAppPath } from "@/paths/paths";
import { withLock } from "@/ipc/utils/lock_utils";

// Relative
import { createLoggedHandler } from "./safe_handle";

// Types
import type { App, CreateAppParams } from "../ipc_types";
```

## Documentation

### Code Comments

**When to Comment**
- Explain "why" not "what"
- Document complex algorithms
- Note security considerations
- Explain workarounds

```typescript
// Why? For some reason, file ordering is not stable on Windows.
// This is a workaround to ensure stable ordering, although
// ideally we'd like to sort it by modification time which is
// important for cache-ability.
if (IS_TEST_BUILD) {
  filesArray.sort((a, b) => a.path.localeCompare(b.path));
}
```

**JSDoc for Public APIs**
- Document function parameters
- Describe return values
- Note exceptions thrown
- Provide usage examples

```typescript
/**
 * Extract and format codebase files as a string to be included in prompts
 * @param appPath - Path to the codebase to extract
 * @param virtualFileSystem - Optional virtual filesystem to apply modifications
 * @returns Object containing formatted output and individual files
 */
export async function extractCodebase({
  appPath,
  chatContext,
  virtualFileSystem,
}: ExtractCodebaseParams): Promise<ExtractCodebaseResult> {
  // Implementation
}
```

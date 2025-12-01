# Development Guidelines

## Code Quality Standards

### TypeScript Conventions
- **Strict Type Safety**: All code uses TypeScript with strict type checking enabled
- **Explicit Return Types**: Functions declare return types explicitly (e.g., `Promise<boolean>`, `void`, `string`)
- **Type Imports**: Use `import type` for type-only imports to optimize bundle size
- **Interface Over Type**: Prefer `interface` for object shapes, `type` for unions/intersections
- **Zod Validation**: Use Zod schemas for runtime validation and type inference (`z.infer<typeof Schema>`)

### Naming Conventions
- **PascalCase**: React components, classes, interfaces, types (`PageObject`, `ChatStreamParams`, `BaseSchemaValidator`)
- **camelCase**: Functions, variables, methods (`getCurrentAppPath`, `validateXml`, `processStreamChunks`)
- **SCREAMING_SNAKE_CASE**: Constants and configuration (`MAX_CHAT_TURNS_IN_CONTEXT`, `TEMP_DIR`, `UNIQUE_ID_REQUIREMENTS`)
- **kebab-case**: File names, CSS classes, test IDs (`chat_stream_handlers.ts`, `test_helper.ts`, `data-testid="messages-list"`)
- **Descriptive Names**: Avoid abbreviations except common ones (e.g., `req`, `res`, `ctx`, `msg`)

### File Organization
- **Colocation**: Related files grouped by feature/domain (e.g., `ipc/handlers/`, `components/chat/`)
- **Index Files**: Avoid barrel exports; import directly from source files
- **Test Files**: Place tests adjacent to source with `.spec.ts` or `.test.ts` suffix
- **Helpers**: Utility functions in dedicated `utils/` or `helpers/` directories

### Code Structure
- **Single Responsibility**: Functions do one thing well (average 20-50 lines)
- **Early Returns**: Use guard clauses to reduce nesting
- **Error Handling**: Try-catch blocks with specific error messages and logging
- **Async/Await**: Prefer over raw Promises for readability
- **Destructuring**: Extract properties at function start for clarity

## Semantic Patterns

### React Component Patterns
```typescript
// Functional components with TypeScript props interface
interface ComponentProps {
  content: string;
  onAction?: () => void;
}

export const Component: React.FC<ComponentProps> = ({ content, onAction }) => {
  // State management with Jotai atoms
  const value = useAtomValue(someAtom);
  
  // Memoization for expensive computations
  const processed = useMemo(() => processData(content), [content]);
  
  // Early return for conditional rendering
  if (!content) return null;
  
  return <div>{processed}</div>;
};
```

### Async Handler Pattern
```typescript
// IPC handlers with comprehensive error handling
ipcMain.handle('action:name', async (event, params: ParamsType) => {
  try {
    // Validate input
    if (!params.required) {
      throw new Error('Missing required parameter');
    }
    
    // Perform operation with logging
    logger.log('Starting operation', params);
    const result = await performOperation(params);
    
    // Return typed result
    return result;
  } catch (error) {
    logger.error('Operation failed:', error);
    throw error; // Re-throw for client handling
  }
});
```

### Stream Processing Pattern
```typescript
// Async iteration with abort signal support
for await (const chunk of stream) {
  // Check for cancellation
  if (abortController.signal.aborted) {
    logger.log('Stream aborted');
    break;
  }
  
  // Process chunk
  processedData += transformChunk(chunk);
  
  // Periodic updates
  await updateProgress(processedData);
}
```

### Database Query Pattern
```typescript
// Drizzle ORM with relations and ordering
const result = await db.query.table.findFirst({
  where: eq(table.id, id),
  with: {
    relations: {
      orderBy: (rel, { asc }) => [asc(rel.createdAt)],
    },
  },
});
```

### Validation Pattern
```typescript
// XML/Schema validation with error collection
const errors: string[] = [];

for (const file of files) {
  try {
    validateFile(file);
  } catch (error) {
    errors.push(`${file}: ${error.message}`);
  }
}

if (errors.length > 0) {
  console.log(`FAILED - Found ${errors.length} errors:`);
  errors.forEach(e => console.log(`  ${e}`));
  return false;
}

console.log('PASSED - All validations successful');
return true;
```

## Internal API Usage

### IPC Communication
```typescript
// Client-side IPC invocation
const result = await IpcClient.getInstance().invoke('handler:name', params);

// Server-side safe send (prevents crashes on closed windows)
safeSend(event.sender, 'event:name', { data });

// Stream cancellation tracking
const abortController = new AbortController();
activeStreams.set(id, abortController);
// Later: abortController.abort();
```

### State Management with Jotai
```typescript
// Atom definition
export const selectedChatIdAtom = atom<number | null>(null);
export const isStreamingByIdAtom = atom<Map<number, boolean>>(new Map());

// Usage in components
const chatId = useAtomValue(selectedChatIdAtom);
const [streaming, setStreaming] = useAtom(isStreamingByIdAtom);
```

### Custom Tag Parsing
```typescript
// Pattern: Preprocess unclosed tags, then parse with regex
const { processedContent, inProgressTags } = preprocessUnclosedTags(content);
const tagPattern = new RegExp(`<(${tags.join('|')})\\s*([^>]*)>(.*?)<\\/\\1>`, 'gs');

while ((match = tagPattern.exec(processedContent)) !== null) {
  const [fullMatch, tag, attrs, content] = match;
  // Process tag...
}
```

### Test Helpers
```typescript
// Page Object pattern for E2E tests
export class PageObject {
  constructor(public electronApp: ElectronApplication, public page: Page) {}
  
  async sendPrompt(prompt: string, options = {}) {
    await this.getChatInput().fill(prompt);
    await this.page.getByRole('button', { name: 'Send' }).click();
    if (!options.skipWaitForCompletion) {
      await this.waitForChatCompletion();
    }
  }
  
  async snapshotMessages() {
    await expect(this.page.getByTestId('messages-list')).toMatchAriaSnapshot();
  }
}
```

## Frequently Used Idioms

### Conditional Execution
```typescript
// Optional chaining with nullish coalescing
const value = obj?.property ?? defaultValue;

// Array filtering with type guards
const validItems = items.filter((item): item is ValidType => 
  item !== null && item.hasRequiredProperty
);
```

### Path Handling
```typescript
// Cross-platform path resolution
const filePath = path.join(baseDir, relativePath);
const resolved = Path(filePath).resolve();
const relative = file.relative_to(baseDir);
```

### Logging Patterns
```typescript
// Scoped logger with context
const logger = log.scope('module-name');
logger.log('Operation started', { context });
logger.error('Operation failed:', error);
logger.warn('Potential issue detected');
```

### Retry Logic
```typescript
// Retry with exponential backoff
let attempts = 0;
const maxAttempts = 3;

while (attempts < maxAttempts) {
  try {
    return await operation();
  } catch (error) {
    attempts++;
    if (attempts >= maxAttempts) throw error;
    await sleep(Math.pow(2, attempts) * 1000);
  }
}
```

### Map/Set Usage
```typescript
// Tracking state with Map
const activeStreams = new Map<number, AbortController>();
activeStreams.set(id, controller);
const controller = activeStreams.get(id);
activeStreams.delete(id);

// Deduplication with Set
const uniqueIds = new Set(items.map(item => item.id));
```

## Popular Annotations

### JSDoc Comments
```typescript
/**
 * Validate XML files against XSD schemas.
 * 
 * @param xml_file - Path to XML file to validate
 * @param verbose - Enable verbose output
 * @returns Tuple of (is_valid, new_errors_set)
 */
```

### Test Annotations
```typescript
// Playwright test with custom timeout
test('should complete operation', async ({ po }) => {
  await po.sendPrompt('test prompt');
  await expect(po.page.getByText('result')).toBeVisible({
    timeout: Timeout.LONG
  });
});

// Skip test on specific platform
export const testSkipIfWindows = os.platform() === 'win32' ? test.skip : test;
```

### Type Assertions
```typescript
// Satisfies operator for type checking
const config = {
  key: 'value'
} satisfies ConfigType;

// As const for literal types
const CONSTANTS = {
  MAX_RETRIES: 3,
  TIMEOUT: 5000,
} as const;
```

## Best Practices

### Error Messages
- Include context: file paths, line numbers, operation details
- Provide actionable guidance: "MUST be fixed", "should add: <example>"
- Use consistent prefixes: "FAILED -", "PASSED -", "Warning:"

### Performance
- Use `useMemo` for expensive computations in React
- Batch database operations when possible
- Implement pagination for large datasets
- Cache file reads with Map-based caching

### Security
- Validate all user input with Zod schemas
- Sanitize file paths to prevent directory traversal
- Escape XML/HTML content before rendering
- Use environment variables for sensitive data

### Testing
- Write descriptive test names: `test('should validate unique IDs across files')`
- Use snapshot testing for UI components and complex outputs
- Mock external dependencies (file system, network, database)
- Test error paths and edge cases

### Documentation
- Document complex algorithms with inline comments
- Maintain README files for setup and architecture
- Use TypeScript types as living documentation
- Keep examples up-to-date with code changes

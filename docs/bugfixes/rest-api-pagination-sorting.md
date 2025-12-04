# Bug Fix: REST API Pagination and Sorting Issues

## Summary

Fixed critical bugs in the REST API `/v1/skills` endpoint related to pagination calculation and missing sort parameters when using the cloud API.

## Issues Found

### 1. Missing Sort Parameters (High Priority)

**Problem**: The `sortBy` and `sortOrder` query parameters were being parsed from the request but not passed to the cloud API client.

**Impact**: 
- Users could not sort skills when using the cloud API
- The API would always return results in the default order regardless of query parameters
- This created inconsistent behavior between local and cloud API modes

**Location**: `apps/server/src/routers/rest.router.ts`, lines 117-147

**Before**:
```typescript
const response = await client.skills.workspacesWorkspaceIdSkillsGet({
  workspaceId,
  page,
  perPage,
  search,
  // sortBy and sortOrder were missing!
})
```

**After**:
```typescript
const response = await client.skills.workspacesWorkspaceIdSkillsGet({
  workspaceId,
  page,
  perPage,
  search,
  sortBy,      // ✅ Now included
  sortOrder,   // ✅ Now included
})
```

### 2. Incorrect Pagination Calculation (Medium Priority)

**Problem**: The `hasMore` fallback calculation used the original `offset` variable instead of the calculated offset from the page-based response.

**Impact**:
- When cloud API meta information was incomplete, the `hasMore` flag could be incorrect
- This could cause pagination UI to show incorrect "next page" states
- Edge case but could confuse users when navigating through large skill lists

**Before**:
```typescript
hasMore:
  meta.page != null && meta.totalPages != null
    ? meta.page < meta.totalPages
    : offset + items.length < (meta.totalItems ?? items.length),
    // ❌ Using original offset, not calculated offset
```

**After**:
```typescript
const calculatedOffset = (pageMeta - 1) * perPageMeta

return res.json({
  items,
  total: totalItems,
  limit: perPageMeta,
  offset: calculatedOffset,
  hasMore:
    meta.page != null && meta.totalPages != null
      ? meta.page < meta.totalPages
      : calculatedOffset + items.length < totalItems,
      // ✅ Using calculated offset for consistency
})
```

## Testing

### Manual Testing Steps

1. **Test Sorting with Cloud API**:
   ```bash
   # Enable cloud API
   export USE_BL1NK_CLOUD=true
   
   # Test sorting by name ascending
   curl "http://localhost:3001/v1/skills?sortBy=name&sortOrder=asc"
   
   # Test sorting by date descending
   curl "http://localhost:3001/v1/skills?sortBy=updatedAt&sortOrder=desc"
   ```

2. **Test Pagination**:
   ```bash
   # Test first page
   curl "http://localhost:3001/v1/skills?limit=10&offset=0"
   
   # Test second page
   curl "http://localhost:3001/v1/skills?limit=10&offset=10"
   
   # Verify hasMore flag is correct
   ```

3. **Test with Incomplete Meta**:
   - Mock cloud API to return incomplete meta information
   - Verify pagination still works correctly

### Automated Tests

Created test file: `apps/server/src/routers/__tests__/rest.router.test.ts`

Test cases cover:
- ✅ Correct `hasMore` calculation with complete meta
- ✅ Correct `hasMore` on last page
- ✅ Sort parameters passed to cloud API
- ✅ Default sort parameters used when not provided
- ✅ Fallback pagination with incomplete meta

## Related Files

- `apps/server/src/routers/rest.router.ts` - Main fix
- `apps/server/src/routers/__tests__/rest.router.test.ts` - Test coverage
- `docs/bugfixes/rest-api-pagination-sorting.md` - This documentation

## Verification

To verify the fix works:

1. Start the server with cloud API enabled
2. Make requests with different sort parameters
3. Verify results are sorted correctly
4. Navigate through paginated results
5. Verify `hasMore` flag is accurate

## Future Improvements

1. Add integration tests that actually call the cloud API
2. Add E2E tests for pagination UI
3. Consider adding request/response logging for debugging
4. Add metrics for API performance monitoring

## References

- Cloud API Documentation: [Link to cloud API docs if available]
- Pagination Best Practices: [Link to internal docs]
- Related Issue: [Link to issue tracker if applicable]

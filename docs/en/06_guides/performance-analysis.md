# Performance Analysis Report

_Last updated: 2025-12-03_

## Executive Summary

- **Scope** – Full-stack review of the `apps/client`, `apps/server`, and supporting scripts/build tooling.
- **Goal** – Identify performance bottlenecks that hurt UX, increase cloud cost, and slow developer feedback.
- **Outcome** – Twenty-three concrete issues grouped by stack layer, plus a prioritized remediation plan covering four weeks of work.

## Critical Findings

### 1. Frontend (Next.js / React) – `apps/client`

| Area | Issue | Impact |
| --- | --- | --- |
| Main Page (`src/app/page.tsx`) | Multiple tRPC queries re-run every render; `skillsQuery.refetch()` called inside mutation callbacks forces redundant network calls; chat message state updates trigger full component re-renders. | 40–80% wasted renders, inflated bandwidth usage. |
| Monaco Editor | Dynamic import exists but editor still downloads ~2 MB bundle; no language worker code-splitting or feature trimming. | Slower initial load, degraded low-bandwidth experience. |
| Next.js Config | Missing image optimization, bundle analyzer, compression middleware, and font optimization. | Larger bundles, zero visibility into size regressions. |
| tRPC Query Strategy | `skillsQuery` fetches 100 records unconditionally, lacks pagination, and refetches after mutations instead of updating cache. | Over-fetching, slow list rendering, unnecessary API load. |

### 2. Backend (Node.js / tRPC / Prisma) – `apps/server`

| Area | Issue | Impact |
| --- | --- | --- |
| `routers/skill.router.ts` | Sequential `findMany` + `count` queries (N+1 style), contains filters on `name`/`description` without full-text indexes, SQLite concurrency limitations, no caching. | Slow searches, blocking writes under concurrency. |
| `routers/chat.router.ts` | Claude streaming capability unused; router waits for complete response before replying. | UX stalls for long completions, high memory usage. |
| HTTP Server (`src/index.ts`) | No compression, no rate limiting, no batching, permissive CORS (`origin: true`). | Larger payloads, potential abuse vector, inefficient network usage. |

### 3. API Integrations (AWS Bedrock / OpenRouter)

- `createBedrockClient()` instantiates a fresh SDK client per request (lines 26–34), adding 50–200 ms overhead and duplicate TLS/DNS work.
- External requests have no timeout or retry semantics; hung upstream calls block workers indefinitely.
- Credential validation fires real API calls (lines 121–170) without caching, wasting quota and adding latency.

### 4. Build & Supporting Scripts

- Tree shaking, build caching, and parallel pipelines are absent; TypeScript builds run serially.
- Backend watch script relies on `tsx` instead of faster SWC-based loaders.
- Frontend dev server lacks fast refresh tuning; monorepo has no Turborepo/Turbo cache.

## Priority Recommendations

### Priority 1 – Critical (Immediate ROI)

1. **Smart tRPC Cache Updates**
   - Location: `apps/client/src/app/page.tsx`.
   - Replace blanket `skillsQuery.refetch()` with direct cache writes:
     ```tsx
     const createMutation = trpc.skill.create.useMutation({
       onSuccess: (newSkill) => {
         setSelectedSkillId(newSkill.id)
         setIsDirty(false)
         queryClient.setQueryData(['skill', 'list'], (old) => ({
           ...old,
           items: [newSkill, ...(old?.items ?? [])],
           total: (old?.total ?? 0) + 1,
         }))
       },
     })
     ```
   - Combine with optimistic updates for snappier UX.

2. **Enable Streaming Responses**
   - Location: `apps/server/src/routers/chat.router.ts`.
   - Switch to `InvokeModelWithResponseStreamCommand` and surface tokens through tRPC subscriptions or SSE.
   - Expected result: first tokens in ~0.5 s vs. 5–10 s today.

3. **Database Indexing & Search Improvements**
   - File: `apps/server/prisma/schema.prisma`.
   - Add `@@index([description])` and consider SQLite FTS5 virtual table (`skill_fts`) for combined `name`/`description` full-text search.
   - Long-term: migrate to PostgreSQL + PgBouncer for pooled connections and advanced indexes.

4. **Response Compression**
   - File: `apps/server/src/index.ts`.
   - Add `compression` middleware before `express.json()`:
     ```ts
     import compression from 'compression'
     app.use(
       compression({
         level: 6,
         filter: (req, res) =>
           req.headers['x-no-compression'] ? false : compression.filter(req, res),
       }),
     )
     ```
   - Reduces JSON payload size by 60–90%.

### Priority 2 – High

1. **Singleton AWS Clients**
   - File: `apps/server/src/services/claude-service.ts`.
   - Cache `BedrockRuntimeClient` per region + access key:
     ```ts
     const clientCache = new Map<string, BedrockRuntimeClient>()
     function getBedrockClient(credentials: BedrockCredentials) {
       const key = `${credentials.region}:${credentials.accessKeyId}`
       if (!clientCache.has(key)) {
         clientCache.set(
           key,
           new BedrockRuntimeClient({
             region: credentials.region,
             credentials,
           }),
         )
       }
       return clientCache.get(key)!
     }
     ```
   - Remember to invalidate when credentials rotate.

2. **Add Request/Response Caching**
   - Introduce Redis (or Upstash) caching layer. Example for skills list:
     ```ts
     const cacheKey = `skills:${JSON.stringify(input)}`
     const cached = await redis.get(cacheKey)
     if (cached) return JSON.parse(cached)
     const result = await ctx.db.skill.findMany(...)
     await redis.setEx(cacheKey, 30, JSON.stringify(result))
     return result
     ```

3. **Optimize Monaco Bundle**
   - File: `apps/client/next.config.js`.
   - Use `monaco-editor-webpack-plugin` to ship only markdown language + required features.

4. **HTTP Hygiene**
   - Add rate limiting, gzip/brotli negotiation, and tighten CORS origins to trusted domains.

### Priority 3 – Medium

- **Bundle Analysis** – `@next/bundle-analyzer` gated by `ANALYZE=true pnpm build`.
- **Pagination** – Replace static `limit: 100` with cursor-based pagination on both client and server.
- **Request Timeouts** – Configure `NodeHttpHandler` with `requestTimeout`/`connectionTimeout` for Bedrock/OpenRouter.
- **SWC Tooling** – Update backend `package.json` scripts to use `@swc-node/register/esm --watch` for dev.
- **Performance Monitoring** – Capture slow requests via `perf_hooks.performance.now()` logging when duration > 1 s.

### Priority 4 – Low / Polish

- Add React Query Devtools in `apps/client/src/app/layout.tsx`.
- Implement targeted code splitting via `next/dynamic` for heavy components.
- Introduce performance dashboards + load testing scripts for regression tracking.

## Expected Gains

| Optimization | Impact | Effort |
| --- | --- | --- |
| Cache updates vs. refetch | 40–60% faster list interactions | Low |
| AWS client singleton | 30–50% faster API calls | Low |
| Streaming responses | 5–10× perceived speed | Medium |
| Response compression | 60–80% smaller payloads | Low |
| Database indexes | 10–100× faster search | Low |
| Monaco bundle trim | ~80% smaller editor chunk | Medium |
| PostgreSQL migration | 5–10× better write throughput | High |

## Implementation Roadmap

| Week | Focus | Key Tasks |
| --- | --- | --- |
| Week 1 | Priority 1 | Smart cache updates, DB indexes/FTS, compression middleware, singleton API client bootstrap. |
| Week 2 | Priority 2 | Streaming response plumbing, Monaco optimization, Redis caching, request timeouts. |
| Week 3 | Priority 3 | Bundle analyzer, pagination rollout, SWC migration, performance monitoring hooks. |
| Week 4 | Priority 4 | Code splitting, React Query devtools, load testing, documentation refresh. |

## Next Steps

1. Review and sign off on the remediation roadmap.
2. Create engineering tickets aligned with the weekly batches.
3. Schedule benchmarking checkpoints (before vs. after each milestone) to quantify wins.

---

For clarifications or deeper dives into any section, reach out via `#perf-ops` on Slack.

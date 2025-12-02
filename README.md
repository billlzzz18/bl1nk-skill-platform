# Claude Skill Builder

Web application for creating and managing Claude AI skills.

## Setup

1. Copy environment variables:
```bash
copy .env.example .env
```

2. Install dependencies:
```bash
pnpm install
```

3. Start Docker services:
```bash
docker-compose up -d
```

4. Run database migrations:
```bash
cd apps/server
pnpm prisma migrate dev
```

5. Start development servers:
```bash
pnpm dev
```

## Mock Cloud API

Some features rely on the OpenAPI contract defined under `specs/main/openapi.yaml`.  
When you need a local mock of the cloud API, run:

```bash
cd specs/main/generated/mock-server
cmd /c "set PORT=8081 && npm start"
```

This binds the Express stub to port `8081`, which matches the default `BL1NK_API_BASE_URL` used by the app.

## Structure

- \pps/client\ - Next.js frontend
- \pps/server\ - Node.js backend with tRPC
- \packages/shared\ - Shared types and utilities

## Tech Stack

- Next.js 15 + React 19
- tRPC + Prisma
- PostgreSQL + Redis
- Tailwind CSS
- Monaco Editor
# bl1nk-workspace-ai-mi

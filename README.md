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

# setup-phase0.ps1 - Phase 0: Foundation Setup
# รันด้วย: .\setup-phase0.ps1

Write-Host "=== Phase 0: Foundation Setup ===" -ForegroundColor Cyan
Write-Host ""

# ตรวจสอบว่าอยู่ใน root directory
if (-not (Test-Path "pnpm-workspace.yaml")) {
    Write-Host "ERROR: กรุณารันสคริปต์นี้ใน root directory ของโปรเจ็ค" -ForegroundColor Red
    exit 1
}

# 1. Setup Client (Next.js 15 + React 19)
Write-Host "[1/4] Setting up Client (Next.js)..." -ForegroundColor Yellow

Set-Location apps/client

$clientPackageJson = @"
{
  "name": "@claude-builder/client",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "clean": "rm -rf .next node_modules"
  },
  "dependencies": {
    "next": "^15.0.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@trpc/client": "^11.0.0",
    "@trpc/server": "^11.0.0",
    "@trpc/react-query": "^11.0.0",
    "@tanstack/react-query": "^5.59.0",
    "zustand": "^5.0.0",
    "zod": "^3.23.0",
    "@monaco-editor/react": "^4.6.0",
    "yaml": "^2.5.0",
    "react-markdown": "^9.0.0",
    "lucide-react": "^0.451.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.6.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.0.3"
  }
}
"@ | Out-File -FilePath "package.json" -Encoding UTF8

# next.config.js
@"
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  transpilePackages: ['@claude-builder/shared'],
}

module.exports = nextConfig
"@ | Out-File -FilePath "next.config.js" -Encoding UTF8

# tsconfig.json
@"
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
"@ | Out-File -FilePath "tsconfig.json" -Encoding UTF8

# tailwind.config.js
@"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
"@ | Out-File -FilePath "tailwind.config.js" -Encoding UTF8

# postcss.config.js
@"
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
"@ | Out-File -FilePath "postcss.config.js" -Encoding UTF8

# src/app/layout.tsx
@"
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Claude Skill Builder',
  description: 'Create and manage Claude AI skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  )
}
"@ | Out-File -FilePath "src/app/layout.tsx" -Encoding UTF8

# src/app/page.tsx
@"
export default function Home() {
  return (
    <main className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='text-center'>
        <h1 className='text-5xl font-bold text-gray-900 mb-4'>
          Claude Skill Builder
        </h1>
        <p className='text-xl text-gray-600 mb-8'>
          Create and manage your Claude AI skills
        </p>
        <button className='px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition'>
          Get Started
        </button>
      </div>
    </main>
  )
}
"@ | Out-File -FilePath "src/app/page.tsx" -Encoding UTF8

# src/app/globals.css
@"
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

body {
  color: rgb(var(--foreground-rgb));
}
"@ | Out-File -FilePath "src/app/globals.css" -Encoding UTF8

# src/lib/trpc.ts
@"
import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@claude-builder/server'

export const trpc = createTRPCReact<AppRouter>()
"@ | Out-File -FilePath "src/lib/trpc.ts" -Encoding UTF8

Set-Location ../..
Write-Host "✓ Client setup complete" -ForegroundColor Green
Write-Host ""

# 2. Setup Server (Node.js + tRPC)
Write-Host "[2/4] Setting up Server (tRPC + Prisma)..." -ForegroundColor Yellow

Set-Location apps/server

$serverPackageJson = @"
{
  "name": "@claude-builder/server",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio",
    "clean": "rm -rf dist node_modules"
  },
  "dependencies": {
    "@trpc/server": "^11.0.0",
    "@prisma/client": "^5.22.0",
    "express": "^4.21.0",
    "cors": "^2.8.5",
    "dotenv": "^16.4.0",
    "zod": "^3.23.0",
    "ioredis": "^5.4.0",
    "@aws-sdk/client-bedrock-runtime": "^3.679.0",
    "axios": "^1.7.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/express": "^5.0.0",
    "@types/cors": "^2.8.0",
    "typescript": "^5.6.0",
    "tsx": "^4.19.0",
    "prisma": "^5.22.0"
  }
}
"@ | Out-File -FilePath "package.json" -Encoding UTF8

# tsconfig.json
@"
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
"@ | Out-File -FilePath "tsconfig.json" -Encoding UTF8

# prisma/schema.prisma
New-Item -ItemType Directory -Force -Path "prisma" | Out-Null
@"
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Skill {
  id          String   @id @default(cuid())
  name        String
  description String?
  content     String   @db.Text
  version     Int      @default(1)
  isPublic    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([createdAt])
}

model ApiKey {
  id        String   @id @default(cuid())
  name      String
  provider  String   // "bedrock" | "openrouter"
  key       String   // encrypted
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
"@ | Out-File -FilePath "prisma/schema.prisma" -Encoding UTF8

# src/index.ts
@"
import express from 'express'
import cors from 'cors'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { appRouter } from './routers/_app'
import { createContext } from './context'
import dotenv from 'dotenv'

dotenv.config({ path: '../../.env' })

const app = express()
const PORT = process.env.API_PORT || 3001

app.use(cors())
app.use(express.json())

app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
)

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(\`🚀 Server running on http://localhost:\${PORT}\`)
  console.log(\`📡 tRPC endpoint: http://localhost:\${PORT}/trpc\`)
})
"@ | Out-File -FilePath "src/index.ts" -Encoding UTF8

# src/context.ts
@"
import { CreateExpressContextOptions } from '@trpc/server/adapters/express'
import { prisma } from './db/client'
import { redis } from './db/redis'

export const createContext = ({ req, res }: CreateExpressContextOptions) => {
  return {
    req,
    res,
    prisma,
    redis,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
"@ | Out-File -FilePath "src/context.ts" -Encoding UTF8

# src/db/client.ts
@"
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
"@ | Out-File -FilePath "src/db/client.ts" -Encoding UTF8

# src/db/redis.ts
@"
import Redis from 'ioredis'

export const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: 3,
  retryStrategy: (times) => {
    if (times > 3) return null
    return Math.min(times * 50, 2000)
  },
})

redis.on('connect', () => {
  console.log('✓ Redis connected')
})

redis.on('error', (err) => {
  console.error('Redis error:', err)
})
"@ | Out-File -FilePath "src/db/redis.ts" -Encoding UTF8

# src/routers/_app.ts
@"
import { initTRPC } from '@trpc/server'
import { Context } from '../context'
import { skillRouter } from './skill.router'

const t = initTRPC.context<Context>().create()

export const appRouter = t.router({
  skill: skillRouter,
})

export type AppRouter = typeof appRouter
"@ | Out-File -FilePath "src/routers/_app.ts" -Encoding UTF8

# src/routers/skill.router.ts
@"
import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import { Context } from '../context'

const t = initTRPC.context<Context>().create()

export const skillRouter = t.router({
  getAll: t.procedure.query(async ({ ctx }) => {
    return ctx.prisma.skill.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
  }),

  getById: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.skill.findUnique({
        where: { id: input.id },
      })
    }),

  create: t.procedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        content: z.string().min(1),
        isPublic: z.boolean().default(false),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.skill.create({
        data: input,
      })
    }),

  update: t.procedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        content: z.string().optional(),
        isPublic: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input
      return ctx.prisma.skill.update({
        where: { id },
        data: {
          ...data,
          version: { increment: 1 },
        },
      })
    }),

  delete: t.procedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.skill.delete({
        where: { id: input.id },
      })
    }),
})
"@ | Out-File -FilePath "src/routers/skill.router.ts" -Encoding UTF8

# src/services/claude-service.ts
@"
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime'
import axios from 'axios'

// AWS Bedrock Client
const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
})

export async function testSkillWithBedrock(skillContent: string, testMessage: string) {
  const payload = {
    anthropic_version: 'bedrock-2023-05-31',
    max_tokens: 2000,
    messages: [
      {
        role: 'user',
        content: \`Skill Definition:\n\${skillContent}\n\nTest Message: \${testMessage}\`,
      },
    ],
  }

  const command = new InvokeModelCommand({
    modelId: process.env.BEDROCK_MODEL_ID || 'anthropic.claude-3-5-sonnet-20241022-v2:0',
    body: JSON.stringify(payload),
  })

  const response = await bedrockClient.send(command)
  const result = JSON.parse(new TextDecoder().decode(response.body))
  
  return {
    response: result.content[0].text,
    latency: result.usage?.input_tokens || 0,
  }
}

export async function testSkillWithOpenRouter(skillContent: string, testMessage: string) {
  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: process.env.OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet',
      messages: [
        {
          role: 'user',
          content: \`Skill Definition:\n\${skillContent}\n\nTest Message: \${testMessage}\`,
        },
      ],
    },
    {
      headers: {
        Authorization: \`Bearer \${process.env.OPENROUTER_API_KEY}\`,
        'Content-Type': 'application/json',
      },
    }
  )

  return {
    response: response.data.choices[0].message.content,
    latency: response.data.usage?.total_tokens || 0,
  }
}
"@ | Out-File -FilePath "src/services/claude-service.ts" -Encoding UTF8

Set-Location ../..
Write-Host "✓ Server setup complete" -ForegroundColor Green
Write-Host ""

# 3. Setup Shared Package
Write-Host "[3/4] Setting up Shared Package..." -ForegroundColor Yellow

Set-Location packages/shared

$sharedPackageJson = @"
{
  "name": "@claude-builder/shared",
  "version": "1.0.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "clean": "rm -rf node_modules"
  },
  "dependencies": {
    "zod": "^3.23.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "typescript": "^5.6.0"
  }
}
"@ | Out-File -FilePath "package.json" -Encoding UTF8

# src/index.ts
@"
export * from './types'
export * from './schemas'
"@ | Out-File -FilePath "src/index.ts" -Encoding UTF8

# src/types.ts
@"
export type SkillProvider = 'bedrock' | 'openrouter'

export interface Skill {
  id: string
  name: string
  description?: string
  content: string
  version: number
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

export interface TestResult {
  response: string
  latency: number
  error?: string
}
"@ | Out-File -FilePath "src/types.ts" -Encoding UTF8

# schemas/skill.schema.ts
@"
import { z } from 'zod'

export const SkillSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  isPublic: z.boolean().default(false),
})

export const TestSkillSchema = z.object({
  skillId: z.string(),
  message: z.string().min(1, 'Test message is required'),
  provider: z.enum(['bedrock', 'openrouter']).default('bedrock'),
})
"@ | Out-File -FilePath "schemas/skill.schema.ts" -Encoding UTF8

Set-Location ../..
Write-Host "✓ Shared package setup complete" -ForegroundColor Green
Write-Host ""

# 4. Install Dependencies
Write-Host "[4/4] Installing dependencies..." -ForegroundColor Yellow
pnpm install

Write-Host ""
Write-Host "=== Phase 0 Setup Complete! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Copy .env.example to .env and fill in your API keys"
Write-Host "2. Start Docker: docker-compose up -d"
Write-Host "3. Run migrations: cd apps/server && pnpm prisma:migrate"
Write-Host "4. Start dev servers: pnpm dev"
Write-Host ""
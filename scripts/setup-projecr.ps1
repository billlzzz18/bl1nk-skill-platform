# setup-project.ps1 - สร้างโครงสร้างโปรเจ็คทั้งหมด
# รันด้วย: .\setup-project.ps1

Write-Host "=== Claude Skill Builder - Project Setup ===" -ForegroundColor Cyan
Write-Host ""

# ตรวจสอบ dependencies
Write-Host "Checking dependencies..." -ForegroundColor Yellow
$node_version = node --version
$pnpm_version = pnpm --version
$docker_version = docker --version

Write-Host "✓ Node.js: $node_version" -ForegroundColor Green
Write-Host "✓ pnpm: $pnpm_version" -ForegroundColor Green
Write-Host "✓ Docker: $docker_version" -ForegroundColor Green
Write-Host ""

# สร้าง root directory
$projectName = "claude-skill-builder"
Write-Host "Creating project: $projectName" -ForegroundColor Yellow

if (Test-Path $projectName) {
    $response = Read-Host "โฟลเดอร์ $projectName มีอยู่แล้ว ต้องการลบและสร้างใหม่? (y/N)"
    if ($response -eq "y") {
        Remove-Item -Recurse -Force $projectName
    } else {
        Write-Host "ยกเลิกการสร้างโปรเจ็ค" -ForegroundColor Red
        exit
    }
}

# สร้างโครงสร้างโฟลเดอร์
Write-Host "Creating folder structure..." -ForegroundColor Yellow

$folders = @(
    "$projectName/apps/client/src/app/(auth)",
    "$projectName/apps/client/src/app/dashboard/skills/[id]",
    "$projectName/apps/client/src/app/dashboard/skills/new",
    "$projectName/apps/client/src/app/dashboard/skills/library",
    "$projectName/apps/client/src/app/dashboard/api-keys",
    "$projectName/apps/client/src/app/dashboard/settings",
    "$projectName/apps/client/src/components/editor",
    "$projectName/apps/client/src/components/testing-console",
    "$projectName/apps/client/src/components/skill-card",
    "$projectName/apps/client/src/components/ui",
    "$projectName/apps/client/src/lib",
    "$projectName/apps/client/src/hooks",
    "$projectName/apps/client/src/styles",
    "$projectName/apps/client/public",
    "$projectName/apps/server/src/routers",
    "$projectName/apps/server/src/services",
    "$projectName/apps/server/src/middleware",
    "$projectName/apps/server/src/db",
    "$projectName/apps/server/src/utils",
    "$projectName/packages/shared/src",
    "$projectName/packages/shared/schemas",
    "$projectName/tests/e2e",
    "$projectName/tests/unit",
    "$projectName/scripts",
    "$projectName/docs",
    "$projectName/.github/workflows"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Force -Path $folder | Out-Null
}

Write-Host "✓ Folder structure created" -ForegroundColor Green
Write-Host ""

# สร้างไฟล์ root
Write-Host "Creating root configuration files..." -ForegroundColor Yellow

# pnpm-workspace.yaml
@"
packages:
  - 'apps/*'
  - 'packages/*'
"@ | Out-File -FilePath "$projectName/pnpm-workspace.yaml" -Encoding UTF8

# .gitignore
@"
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/
.nyc_output/

# Next.js
.next/
out/
build/
dist/

# Environment
.env
.env*.local

# Debug
npm-debug.log*
pnpm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Prisma
prisma/migrations/
"@ | Out-File -FilePath "$projectName/.gitignore" -Encoding UTF8

# .env.example
@"
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/claude_skills"
REDIS_URL="redis://localhost:6379"

# Claude API - AWS Bedrock
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your_aws_access_key"
AWS_SECRET_ACCESS_KEY="your_aws_secret_key"
BEDROCK_MODEL_ID="anthropic.claude-3-5-sonnet-20241022-v2:0"

# Claude API - OpenRouter (Alternative)
OPENROUTER_API_KEY="your_openrouter_key"
OPENROUTER_MODEL="anthropic/claude-3.5-sonnet"

# App Config
NODE_ENV="development"
PORT=3000
API_PORT=3001
"@ | Out-File -FilePath "$projectName/.env.example" -Encoding UTF8

# README.md
@"
# Claude Skill Builder

Web application for creating and managing Claude AI skills.

## Setup

1. Copy environment variables:
``````bash
copy .env.example .env
``````

2. Install dependencies:
``````bash
pnpm install
``````

3. Start Docker services:
``````bash
docker-compose up -d
``````

4. Run database migrations:
``````bash
cd apps/server
pnpm prisma migrate dev
``````

5. Start development servers:
``````bash
pnpm dev
``````

## Structure

- \`apps/client\` - Next.js frontend
- \`apps/server\` - Node.js backend with tRPC
- \`packages/shared\` - Shared types and utilities

## Tech Stack

- Next.js 15 + React 19
- tRPC + Prisma
- PostgreSQL + Redis
- Tailwind CSS
- Monaco Editor
"@ | Out-File -FilePath "$projectName/README.md" -Encoding UTF8

# docker-compose.yml
@"
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: claude-skills-db
    restart: unless-stopped
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: claude_skills
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    container_name: claude-skills-redis
    restart: unless-stopped
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
"@ | Out-File -FilePath "$projectName/docker-compose.yml" -Encoding UTF8

# package.json (root)
@"
{
  "name": "claude-skill-builder",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "pnpm --parallel -r dev",
    "build": "pnpm -r build",
    "test": "pnpm -r test",
    "lint": "pnpm -r lint",
    "clean": "pnpm -r clean && rm -rf node_modules"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "typescript": "^5.6.0",
    "prettier": "^3.3.0",
    "eslint": "^9.0.0"
  }
}
"@ | Out-File -FilePath "$projectName/package.json" -Encoding UTF8

Write-Host "✓ Root configuration files created" -ForegroundColor Green
Write-Host ""
Write-Host "=== Project structure created successfully! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. cd $projectName"
Write-Host "2. Run .\setup-phase0.ps1 to install dependencies"
Write-Host ""
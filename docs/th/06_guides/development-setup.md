# คู่มือติดตั้งสภาพแวดล้อม Development

## 📋 ความต้องการระบบ

### ซอฟต์แวร์ที่จำเป็น
- **Node.js** >= 20.0.0 (แนะนำ LTS ล่าสุด)
- **pnpm** >= 9.0.0
- **Git** >= 2.40.0
- **VS Code** (แนะนำ) หรือ editor อื่นๆ

### ระบบปฏิบัติการที่รองรับ
- Windows 10/11 (x64, arm64)
- macOS 12+ (Intel, Apple Silicon)
- Linux (Ubuntu 20.04+, Debian, Fedora)

## 🚀 การติดตั้งแบบเร็ว

### 1. Clone Repository

```bash
git clone https://github.com/bl1nk-org/claude-skill-builder.git
cd claude-skill-builder
```

### 2. ติดตั้ง Dependencies

```bash
# ติดตั้ง pnpm (ถ้ายังไม่มี)
npm install -g pnpm

# ติดตั้ง dependencies ทั้งหมด
pnpm install
```

### 3. ตั้งค่า Environment Variables

```bash
# Copy ไฟล์ตัวอย่าง
cp .env.example .env

# แก้ไขไฟล์ .env ตามต้องการ
```

### 4. Setup Database

```bash
# Generate Prisma Client
cd apps/server
pnpm prisma generate

# Run migrations
pnpm prisma migrate dev
```

### 5. เริ่ม Development Server

```bash
# กลับไปที่ root directory
cd ../..

# เริ่ม all services
pnpm dev
```

แอปจะเปิดที่:
- **Client**: http://localhost:3000
- **Server**: http://localhost:3001

## 🔧 การตั้งค่าแบบละเอียด

### Environment Variables

#### Client (.env)
```bash
# Database
DATABASE_URL=file:./local.db

# AI Providers
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key_here
AWS_SECRET_ACCESS_KEY=your_secret_here
ANTHROPIC_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
OPENROUTER_API_KEY=your_key_here

# Application
NODE_ENV=development
LOG_LEVEL=info
```

#### Server (.env)
```bash
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/db

# API
PORT=3001
CORS_ORIGIN=http://localhost:3000

# AWS
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key_here
AWS_SECRET_ACCESS_KEY=your_secret_here
```

### Database Setup

#### SQLite (Phase 1 - Default)
```bash
cd apps/server
pnpm prisma generate
pnpm prisma migrate dev --name init
```

#### PostgreSQL (Phase 2 - Optional)
```bash
# เริ่ม PostgreSQL ด้วย Docker
docker-compose up -d postgres

# Update DATABASE_URL ใน .env
DATABASE_URL=postgresql://postgres:password@localhost:5432/skillbuilder

# Run migrations
cd apps/server
pnpm prisma migrate dev
```

## 🛠️ VS Code Setup

### Extensions ที่แนะนำ

ติดตั้ง extensions เหล่านี้:

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "prisma.prisma",
    "ms-playwright.playwright"
  ]
}
```

### Workspace Settings

สร้างไฟล์ `.vscode/settings.json`:

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

## 📦 คำสั่งที่ใช้บ่อย

### Development
```bash
pnpm dev                    # เริ่ม all services
pnpm build                  # Build all packages
pnpm clean                  # ลบ build artifacts
```

### Testing
```bash
pnpm test                   # Run all tests
pnpm test:e2e              # Run E2E tests
pnpm test:unit             # Run unit tests
```

### Code Quality
```bash
pnpm lint                   # Lint all packages
pnpm lint:fix              # Fix linting issues
pnpm format                # Format code
pnpm type-check            # TypeScript check
```

### Validation
```bash
pnpm validate:skills       # ตรวจสอบ 15 skills
pnpm validate:agents       # ตรวจสอบ 501 agents
pnpm health                # Project health check
```

### Database
```bash
cd apps/server
pnpm prisma:studio         # เปิด Prisma Studio
pnpm prisma:generate       # Generate client
pnpm prisma:migrate        # Run migrations
```

## 🐛 แก้ไขปัญหาที่พบบ่อย

### 1. pnpm install ล้มเหลว

```bash
# ลบ node_modules และ lock file
rm -rf node_modules pnpm-lock.yaml

# ติดตั้งใหม่
pnpm install
```

### 2. Prisma Client ไม่พบ

```bash
cd apps/server
pnpm prisma generate
```

### 3. Port ถูกใช้งานอยู่

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### 4. TypeScript Errors

```bash
# ลบ build cache
pnpm clean

# Rebuild
pnpm build
```

### 5. Electron ไม่เปิด

```bash
cd apps/client
pnpm clean
pnpm install
pnpm dev
```

## 🔍 ตรวจสอบการติดตั้ง

รัน health check:

```bash
pnpm health
```

ผลลัพธ์ที่ถูกต้อง:
```
✅ Docker Services
✅ Dependencies Installed
✅ Client Built
✅ Server Built
✅ Skills (15)
✅ Agents (501)
✅ E2E Tests (74)
```

## 📚 ขั้นตอนถัดไป

1. อ่าน [Architecture Overview](../01_architecture/architecture-overview.md)
2. ดู [API Documentation](../02_api/trpc-overview.md)
3. เรียนรู้ [Testing Guide](./testing.md)
4. อ่าน [Contributing Guide](./contributing.md)

## 🆘 ต้องการความช่วยเหลือ?

- 📖 [Troubleshooting Guide](./troubleshooting.md)
- 🐛 [Report Issues](https://github.com/bl1nk-org/claude-skill-builder/issues)
- 💬 [Discussions](https://github.com/bl1nk-org/claude-skill-builder/discussions)

---

**อัพเดทล่าสุด**: 2025-01-XX

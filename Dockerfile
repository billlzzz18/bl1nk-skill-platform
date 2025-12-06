# Build stage
FROM node:20-alpine AS base

RUN corepack enable
WORKDIR /app

FROM base AS deps

# Ensure the generated SDK manifest exists even if omitted from the build context
RUN mkdir -p specs/main/generated/sdk \
    && printf '{\n  "name": "sdk",\n  "version": "0.1.0",\n  "description": "Auto-generated client SDK for the bl1nk Skill IDE API.",\n  "type": "module",\n  "main": "index.ts",\n  "types": "index.ts",\n  "private": true\n}\n' > specs/main/generated/sdk/package.json

# Copy manifest files needed for an accurate install step
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/server/package.json apps/server/
COPY packages/shared/package.json packages/shared/

# Install all workspace dependencies based on the lockfile and verify Prisma CLI is available
RUN pnpm install --frozen-lockfile --config.ignore-scripts=false && pnpm exec prisma --version
# >>> แก้ไข: เพิ่ม COPY . . เพื่อคัดลอกไฟล์โค้ดทั้งหมด (รวมถึง prisma/schema.prisma) <<<
COPY . .

# [แก้ไข OpenSSL]
RUN apk add --no-cache openssl 

# [แก้ไข Prisma Filter]
RUN pnpm install --frozen-lockfile --config.ignore-scripts=false && pnpm --filter @claude-builder/server exec prisma --version

FROM base AS builder

# Ensure production context for pruning behavior
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .
# [แก้ไข Symlinks] คัดลอกไฟล์ทั้งหมดจาก Stage deps (ตอนนี้มีโค้ดแล้ว)
COPY --from=deps /app .

# Generate Prisma client, build, and prune dev dependencies for the server workspace
RUN pnpm --filter @claude-builder/server prisma:generate \
    && pnpm --filter @claude-builder/server build \
    && pnpm --filter @claude-builder/server prune --prod

# Runtime stage
FROM node:20-alpine AS runtime

RUN corepack enable
WORKDIR /app/apps/server
ENV NODE_ENV=production

COPY --from=builder /app/apps/server/node_modules ./node_modules
COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/apps/server/package.json ./package.json
COPY --from=builder /app/apps/server/prisma ./prisma

CMD ["node", "dist/index.js"]
CMD ["node", "dist/index.js"]
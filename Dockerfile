# Build stage
FROM node:20-alpine AS base

RUN corepack enable
WORKDIR /app

FROM base AS deps

# Copy manifest files needed for an accurate install step
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/server/package.json apps/server/
COPY packages/shared/package.json packages/shared/
COPY specs/main/generated/sdk/package.json specs/main/generated/sdk/

# Install all workspace dependencies based on the lockfile
RUN pnpm install --frozen-lockfile

FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client and build only the server workspace
RUN pnpm --filter @claude-builder/server prisma:generate
RUN pnpm --filter @claude-builder/server build

# Prune dev dependencies to keep the runtime image small
RUN pnpm prune --prod

# Runtime stage
FROM node:20-alpine AS runtime

RUN corepack enable
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/apps/server/package.json ./package.json
COPY --from=builder /app/apps/server/prisma ./prisma

CMD ["node", "dist/index.js"]

# Docker Deployment Guide

The bl1nk Skill Builder can be deployed using Docker for consistent environments and simplified distribution.

## Prerequisites

- Docker and Docker Compose installed.
- Environment variables configured in `.env`.

## Docker Images

The repository includes a root `Dockerfile` that packages the entire monorepo. This allows for multi-stage builds and optimization.

### Build images locally
To build the image manually:
```bash
docker build -t bl1nk-skill-builder .
```

### Run using Docker Compose
A `docker-compose.yml` file is provided in the root directory for easy deployment:
```bash
docker-compose up -d
```

## Services

The Docker Compose configuration typically includes:
- **Server**: The Express/tRPC backend.
- **Client (optional)**: The Next.js frontend (can be served by the server or separate).
- **Database (Phase 2)**: PostgreSQL and Redis for cloud synchronization.

## Configuration

Environment variables can be passed to the container using a `.env` file or directly in `docker-compose.yml`. Key variables include:
- `DATABASE_URL`: Prisma database connection string.
- `ENCRYPTION_KEY`: AES-256 key for credential storage.
- `PORT`: Server port (default 3001).

## CI/CD Integration

Images are automatically built and pushed to the GitHub Container Registry (GHCR) using the `docker-build.yml` workflow on tags or manual dispatch.
- **Registry**: `ghcr.io/bl1nk-org/bl1nk-skill-platform`
- **Tags**: `latest`, `<version>`, `<sha>`

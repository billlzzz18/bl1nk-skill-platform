# GitHub Actions Workflows

## 📋 Available Workflows

### 1. CI Pipeline (`ci.yml`)
**Trigger**: Push/PR to main, develop  
**Purpose**: Main continuous integration pipeline

**Jobs**:
- Setup dependencies
- Lint code
- Type check
- Validate skills/agents
- Build packages
- Health check

**Duration**: ~10-15 minutes

### 2. Build Verification (`build-verification.yml`)
**Trigger**: Push/PR to main, develop  
**Purpose**: Verify all packages build successfully

**Jobs**:
- Build client (Electron + Next.js)
- Build server (tRPC + Express)
- Build shared packages

**Duration**: ~5-8 minutes

### 3. Database Check (`database-check.yml`)
**Trigger**: Changes to Prisma/Drizzle schemas  
**Purpose**: Validate database schemas and migrations

**Jobs**:
- Prisma validate & generate
- Drizzle generate
- Schema format check

**Duration**: ~2-3 minutes

### 4. Security Scan (`security-scan.yml`)
**Trigger**: Push/PR, Weekly schedule  
**Purpose**: Security vulnerability scanning

**Jobs**:
- Dependency audit
- CodeQL analysis
- Secret scanning (TruffleHog)

**Duration**: ~8-12 minutes

### 5. Electron Release (`electron-release.yml`)
**Trigger**: Version tags (v*.*.*), Manual dispatch  
**Purpose**: Build and release desktop applications

**Jobs**:
- Build Windows (x64, arm64)
- Build macOS (x64, arm64) with code signing
- Build Linux (deb, rpm)
- Create GitHub Release

**Duration**: ~30-45 minutes

### 6. Docker Build (`docker-build.yml`)
**Trigger**: Push to main, Version tags  
**Purpose**: Build and push Docker images

**Jobs**:
- Multi-platform build (amd64, arm64)
- Push to GitHub Container Registry
- Tag with version/sha

**Duration**: ~10-15 minutes

## 🚀 Usage

### Running Workflows Locally

Install [act](https://github.com/nektos/act):
```bash
# macOS
brew install act

# Windows
choco install act-cli

# Test CI workflow
act push -W .github/workflows/ci.yml
```

### Triggering Manual Release

1. Go to Actions tab
2. Select "Electron Release"
3. Click "Run workflow"
4. Enter version and options
5. Click "Run workflow"

## 📊 Workflow Status

Check workflow status:
- Repository → Actions tab
- View logs for each job
- Download artifacts

## 🔧 Configuration

### Required Secrets
See [SECRETS.md](../SECRETS.md) for complete list.

### Branch Protection
Recommended rules:
- Require status checks to pass
- Require CI workflow
- Require build verification
- Require security scan

## 📚 Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Secrets Management](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

---

**Last Updated**: 2025-01-XX

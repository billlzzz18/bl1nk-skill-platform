# Electron Packaging & Distribution

bl1nk Skill Builder is packaged using **Electron Forge** with **Vite** as the bundler. It supports multiple platforms including Windows, macOS, and Linux.

## Prerequisites

- Node.js >= 20.0.0
- pnpm (latest)
- Platform-specific build tools (e.g., Xcode for macOS, Visual Studio Build Tools for Windows)

## Configuration

The main configuration file for Electron Forge is located at `apps/client/forge.config.ts`. This file defines how the application is bundled, which makers are used for different platforms, and where the build artifacts are stored.

## Build Commands

From the root of the repository, you can use the following commands to package the application:

### Build all packages
First, ensure all shared packages and both apps are built:
```bash
pnpm build
```

### Package the Electron app
This command bundles the application into a folder without creating an installer:
```bash
pnpm --filter bl1nk-skill-ide package
```

### Make installers
This command creates platform-specific installers (e.g., .dmg, .exe, .deb):
```bash
pnpm --filter bl1nk-skill-ide make
```

The output will be available in `apps/client/out/`.

## Distribution

The application can be distributed as:
- **Windows**: .exe (Squirrel.Windows)
- **macOS**: .dmg, .zip (with Apple notarization if configured)
- **Linux**: .deb, .rpm, .AppImage

## Code Signing

Code signing is essential for production distribution to avoid security warnings.
- **macOS**: Requires an Apple Developer ID and notarization.
- **Windows**: Requires a DigiCert or similar certificate.

For more details on code signing configuration, refer to `.github/workflows/electron-release.yml`.

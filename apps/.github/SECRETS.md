# GitHub Secrets Configuration

This document lists all required GitHub Secrets for CI/CD workflows.

## 🔐 Required Secrets

### Code Signing (macOS)
- `APPLE_ID` - Apple Developer ID email
- `APPLE_PASSWORD` - App-specific password
- `APPLE_TEAM_ID` - Apple Team ID (10 characters)

### Code Signing (Windows)
- `WINDOWS_CERTIFICATE` - Base64 encoded certificate
- `WINDOWS_CERTIFICATE_PASSWORD` - Certificate password
- `SM_CODE_SIGNING_CERT_SHA1_HASH` - Certificate SHA1 hash

### Container Registry
- `GHCR_TOKEN` - GitHub token with packages:write permission
  - Note: GITHUB_TOKEN is automatically provided

### Testing & Coverage
- `CODECOV_TOKEN` - Codecov upload token (optional)

### Security Scanning
- `SNYK_TOKEN` - Snyk API token (optional)
- `SONAR_TOKEN` - SonarCloud token (optional)

### Notifications
- `SLACK_WEBHOOK_URL` - Slack webhook for notifications (optional)

## 📝 How to Add Secrets

1. Go to repository Settings
2. Navigate to Secrets and variables → Actions
3. Click "New repository secret"
4. Add name and value
5. Click "Add secret"

## 🔒 Security Best Practices

- Never commit secrets to repository
- Use environment-specific secrets
- Rotate secrets regularly
- Use least privilege principle
- Enable secret scanning

## 📚 Documentation

- [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Apple Notarization](https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution)
- [Windows Code Signing](https://docs.microsoft.com/en-us/windows/win32/seccrypto/cryptography-tools)

---

**Last Updated**: 2025-01-XX

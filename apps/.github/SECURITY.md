# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via:

1. **GitHub Security Advisory**: [Create a private security advisory](https://github.com/bl1nk-org/claude-skill-builder/security/advisories/new)
2. **Email**: security@bl1nk.site (if available)

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity
  - Critical: 1-3 days
  - High: 1-2 weeks
  - Medium: 2-4 weeks
  - Low: Next release cycle

## Security Best Practices

For detailed security guidelines, see [docs/SECURITY.md](../docs/SECURITY.md).

### For Users

- Keep the application updated
- Use strong encryption keys
- Don't share API credentials
- Review file permissions on sensitive data

### For Contributors

- Follow secure coding guidelines in [docs/SECURITY.md](../docs/SECURITY.md)
- Run `pnpm audit` before submitting PRs
- Never commit credentials or secrets
- Use environment variables for sensitive config

## Known Security Considerations

This is an Electron desktop application with the following security measures:

✅ **Implemented**:
- Context isolation enabled
- Node integration disabled in renderer
- Security fuses enabled
- AES-256-GCM credential encryption
- Path traversal protection
- Symlink loop protection

⚠️ **User Responsibility**:
- Secure storage of encryption keys
- API credential management
- File system permissions

## Security Updates

Security updates are released as soon as possible after a vulnerability is confirmed. Users will be notified through:

- GitHub Security Advisories
- Release notes
- Application update notifications (if auto-update enabled)

## Acknowledgments

We appreciate responsible disclosure of security vulnerabilities. Contributors who report valid security issues will be acknowledged in release notes (unless they prefer to remain anonymous).

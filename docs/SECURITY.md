# Security Guidelines

## Overview

Claude Skill Builder is an Electron desktop application. This document outlines security considerations specific to desktop applications and mitigation strategies.

## Desktop App Security Model

### Eliminated Risks (Not Applicable)
- ❌ **CSRF**: No browser cookies or cross-site requests
- ❌ **postMessage Origin**: No web window.postMessage API (unless using webview)
- ❌ **XSS in traditional sense**: Controlled rendering environment

### Active Risks (Must Address)

## 1. Path Traversal 🔴 HIGH

**Risk**: User input could access files outside intended directories.

**Attack Example**:
```javascript
// Vulnerable
const filePath = path.join(baseDir, userInput); // userInput = "../../etc/passwd"
fs.readFileSync(filePath);
```

**Mitigation** (Already Implemented):
```javascript
// scripts/health-check.js - Line 8-15
function countFiles(dir, extension, visited = new Set()) {
  const realPath = fs.realpathSync(dir);
  if (visited.has(realPath)) return 0;
  visited.add(realPath);
  
  const itemPath = path.normalize(path.join(dir, item.name));
  if (!itemPath.startsWith(path.normalize(dir))) continue; // ✅ Path validation
}
```

**Additional Protection**:
```javascript
function sanitizePath(userInput, baseDir) {
  const normalized = path.normalize(userInput).replace(/^(\.\.(\/|\\|$))+/, '');
  const absolute = path.resolve(baseDir, normalized);
  
  if (!absolute.startsWith(path.resolve(baseDir))) {
    throw new Error('Path traversal detected');
  }
  
  return absolute;
}
```

## 2. Credential Storage 🔥 CRITICAL

**Risk**: Hardcoded credentials can be extracted via reverse engineering.

**Current Implementation**:
- ✅ Encrypted storage via `apps/server/src/services/encryption.service.ts`
- ✅ AES-256-GCM encryption
- ✅ Environment variable for encryption key

**Best Practice** (Recommended):
```typescript
// Use OS-native keychain
import keytar from 'keytar';

// Store credential
await keytar.setPassword('claude-skill-builder', 'aws-key', apiKey);

// Retrieve credential
const apiKey = await keytar.getPassword('claude-skill-builder', 'aws-key');
```

**Never**:
```typescript
// ❌ DON'T DO THIS
const API_KEY = "sk-1234567890abcdef"; // Hardcoded
const config = { apiKey: process.env.API_KEY || "default-key" }; // Default fallback
```

## 3. Command Injection 🔴 HIGH

**Risk**: Executing shell commands with user input.

**Vulnerable Pattern**:
```javascript
const { exec } = require('child_process');
exec(`git clone ${userInput}`); // ❌ Dangerous
```

**Safe Pattern**:
```javascript
const { execFile } = require('child_process');

// Whitelist allowed commands
const ALLOWED_COMMANDS = ['git', 'npm', 'node'];

function safeExec(command, args) {
  if (!ALLOWED_COMMANDS.includes(command)) {
    throw new Error('Command not allowed');
  }
  
  // Use execFile with array args (no shell interpretation)
  return execFile(command, args, { shell: false });
}

// Usage
safeExec('git', ['clone', userRepo]); // ✅ Safe
```

## 4. Insecure File Permissions 🟡 MEDIUM

**Risk**: Files created with overly permissive access.

**Best Practice**:
```javascript
// Secure file creation
fs.writeFileSync('config.json', data, { 
  mode: 0o600 // Owner read/write only
});

// Secure directory creation
fs.mkdirSync('data', {
  mode: 0o700 // Owner only
});

// Check existing permissions
const stats = fs.statSync('sensitive.db');
if ((stats.mode & 0o777) > 0o600) {
  console.warn('⚠️ File has insecure permissions');
  fs.chmodSync('sensitive.db', 0o600);
}
```

## 5. Network Security 🟡 MEDIUM

**Risk**: Unencrypted communication or insecure TLS.

**Enforcement**:
```typescript
// Validate HTTPS
function validateUrl(url: string): void {
  if (!url.startsWith('https://')) {
    throw new Error('Only HTTPS URLs allowed');
  }
}

// Certificate pinning (optional for high security)
import https from 'https';
import fs from 'fs';

const agent = new https.Agent({
  rejectUnauthorized: true,
  ca: [fs.readFileSync('./certs/ca-cert.pem')]
});

fetch(url, { agent });
```

## 6. Electron-Specific Security

### Context Isolation ✅ Enabled

**forge.config.ts**:
```typescript
webPreferences: {
  contextIsolation: true,
  nodeIntegration: false,
  sandbox: true
}
```

### Security Fuses ✅ Enabled

```typescript
new FusesPlugin({
  version: FuseVersion.V1,
  [FuseV1Options.RunAsNode]: false,
  [FuseV1Options.EnableCookieEncryption]: true,
  [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
  [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
  [FuseV1Options.OnlyLoadAppFromAsar]: true,
})
```

### IPC Security

**Validate all IPC messages**:
```typescript
// apps/client/src/ipc/handlers/chat_handlers.ts
ipcMain.handle('chat:send', async (event, message) => {
  // ✅ Validate input
  if (typeof message !== 'string' || message.length > 10000) {
    throw new Error('Invalid message');
  }
  
  // ✅ Sanitize before processing
  const sanitized = message.trim();
  return processMessage(sanitized);
});
```

## Security Checklist

### Development
- [ ] No hardcoded credentials in source code
- [ ] All file paths validated and normalized
- [ ] No shell command execution with user input
- [ ] Secure file permissions (0o600 for sensitive files)
- [ ] HTTPS enforced for all network requests
- [ ] Input validation on all IPC handlers
- [ ] Dependencies regularly updated (`pnpm audit`)

### Build & Release
- [ ] Code signing certificate configured
- [ ] ASAR integrity validation enabled
- [ ] Security fuses enabled
- [ ] Environment variables documented in `.env.example`
- [ ] No `.env` file in version control
- [ ] Build artifacts scanned for secrets

### Runtime
- [ ] Encryption key stored securely (not in code)
- [ ] Database file has restricted permissions
- [ ] Logs don't contain sensitive data
- [ ] Auto-update uses HTTPS with signature verification
- [ ] Crash reports don't leak credentials

## Testing

### Security Testing Tools

```bash
# Dependency vulnerabilities
pnpm audit

# Electron security
npm install -g @doyensec/electronegativity
electronegativity -i apps/client

# Static analysis
npm install -g eslint-plugin-security
```

### Manual Testing

**Path Traversal**:
```bash
# Test with malicious paths
node -e "require('./scripts/health-check.js')" --path="../../etc/passwd"
```

**Credential Extraction**:
```bash
# Search for hardcoded secrets
grep -r "sk-" apps/
grep -r "password" apps/ | grep -v "password:"
```

**File Permissions**:
```bash
# Check created files
ls -la ~/.claude-skill-builder/
# Should show 600 (rw-------) for sensitive files
```

## Incident Response

### If Credentials Leaked

1. **Immediate**: Revoke compromised credentials
2. **Rotate**: Generate new credentials
3. **Audit**: Check access logs for unauthorized use
4. **Update**: Release patched version
5. **Notify**: Inform affected users

### Reporting Security Issues

**DO NOT** open public GitHub issues for security vulnerabilities.

**Contact**: security@bl1nk.site (if available) or create private security advisory on GitHub.

## References

- [Electron Security Guidelines](https://www.electronjs.org/docs/latest/tutorial/security)
- [OWASP Desktop App Security](https://owasp.org/www-project-desktop-app-security-top-10/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [CWE-22: Path Traversal](https://cwe.mitre.org/data/definitions/22.html)
- [CWE-78: Command Injection](https://cwe.mitre.org/data/definitions/78.html)

## Security Updates

| Date | Issue | Severity | Status |
|------|-------|----------|--------|
| 2024-01 | Path traversal in health-check.js | HIGH | ✅ Fixed |
| 2024-01 | Missing error handling in organize scripts | CRITICAL | ✅ Fixed |
| 2024-01 | Symlink loop vulnerability | MEDIUM | ✅ Fixed |

---

**Last Updated**: 2024-01-20  
**Next Review**: 2024-04-20

# Credential Router API

The `credential` router manages API credentials for various LLM providers (AWS Bedrock, OpenRouter, Anthropic, etc.). Sensitive data is encrypted before being stored in the database.

## Endpoints

### `list`
Lists all configured credentials. Sensitive data is excluded from the response.

**Input:** None

**Output:**
```typescript
{
  id: string;
  provider: ProviderType;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}[]
```

---

### `getByProvider`
Retrieves credential details for a specific provider, with sensitive data masked for display.

**Input:**
```typescript
{ provider: ProviderType }
```

**Output:**
```typescript
{
  id: string;
  provider: ProviderType;
  name: string;
  isActive: boolean;
  maskedData: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
} | null
```

---

### `save`
Saves or updates credentials for a provider. The input data is encrypted using AES-256-GCM before storage.

**Input:** `SaveCredentialInput` (provider-specific fields + `name`)

**Output:**
```typescript
{
  id: string;
  provider: ProviderType;
  name: string;
  isActive: boolean;
}
```

---

### `delete`
Deletes the credentials for a specific provider.

**Input:**
```typescript
{ provider: ProviderType }
```

**Output:** `{ success: true }`

---

### `setActive`
Enables or disables credentials for a provider.

**Input:**
```typescript
{
  provider: ProviderType;
  isActive: boolean;
}
```

**Output:**
```typescript
{
  id: string;
  provider: ProviderType;
  isActive: boolean;
}
```

---

### `test`
Validates configured credentials by attempting a simple API check or verifying the presence of required fields.

**Input:**
```typescript
{ provider: ProviderType }
```

**Output:**
```typescript
{
  success: true;
  provider: ProviderType;
  message: string;
}
```

---

### `getDecrypted`
Retrieves the decrypted credentials for a provider. **This is intended for internal server-side use only.**

**Input:**
```typescript
{ provider: ProviderType }
```

**Output:**
```typescript
{
  provider: ProviderType;
  credentials: BedrockCredentials | OpenRouterCredentials | ...;
}
```

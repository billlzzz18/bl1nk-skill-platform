import crypto from 'crypto'

/**
 * Encryption Service for API Credentials
 *
 * Uses AES-256-GCM for secure credential storage:
 * - AES-256: Industry-standard symmetric encryption
 * - GCM mode: Provides both encryption and authentication
 * - Random IV: Ensures same data encrypts differently each time
 *
 * Security considerations:
 * - ENCRYPTION_KEY must be 64 hex characters (32 bytes)
 * - Each encryption generates a unique IV
 * - Auth tag prevents tampering with encrypted data
 */

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 16 // 128 bits for GCM
const AUTH_TAG_LENGTH = 16 // 128 bits for GCM authentication

/**
 * Derives a 32-byte key from the environment variable.
 * Uses SHA-256 hash to normalize any input to exactly 32 bytes.
 */
function getEncryptionKey(): Buffer {
  const key = process.env.ENCRYPTION_KEY

  if (!key) {
    throw new Error(
      'ENCRYPTION_KEY environment variable is not set. ' +
        'Generate one with: node -e "console.log(crypto.randomBytes(32).toString(\'hex\'))"'
    )
  }

  // If key is already 64 hex chars (32 bytes), use directly
  if (/^[a-fA-F0-9]{64}$/.test(key)) {
    return Buffer.from(key, 'hex')
  }

  // Otherwise, hash the key to get consistent 32 bytes
  return crypto.createHash('sha256').update(key).digest()
}

/**
 * Encrypts plaintext data using AES-256-GCM.
 *
 * @param plaintext - The data to encrypt
 * @returns Base64 encoded string containing: IV + AuthTag + Ciphertext
 *
 * @example
 * const encrypted = encrypt('my-api-key')
 * // Returns: "base64EncodedString..."
 */
export function encrypt(plaintext: string): string {
  const key = getEncryptionKey()
  const iv = crypto.randomBytes(IV_LENGTH)

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv, {
    authTagLength: AUTH_TAG_LENGTH,
  })

  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final(),
  ])

  const authTag = cipher.getAuthTag()

  // Combine: IV (16 bytes) + AuthTag (16 bytes) + Ciphertext
  const combined = Buffer.concat([iv, authTag, encrypted])

  return combined.toString('base64')
}

/**
 * Decrypts data that was encrypted with the encrypt function.
 *
 * @param encryptedData - Base64 encoded string from encrypt()
 * @returns The original plaintext
 * @throws Error if decryption fails (wrong key, tampered data, etc.)
 *
 * @example
 * const decrypted = decrypt(encryptedString)
 * // Returns: "my-api-key"
 */
export function decrypt(encryptedData: string): string {
  const key = getEncryptionKey()
  const combined = Buffer.from(encryptedData, 'base64')

  if (combined.length < IV_LENGTH + AUTH_TAG_LENGTH) {
    throw new Error('Invalid encrypted data: too short')
  }

  // Extract components
  const iv = combined.subarray(0, IV_LENGTH)
  const authTag = combined.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH)
  const ciphertext = combined.subarray(IV_LENGTH + AUTH_TAG_LENGTH)

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv, {
    authTagLength: AUTH_TAG_LENGTH,
  })

  decipher.setAuthTag(authTag)

  const decrypted = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ])

  return decrypted.toString('utf8')
}

/**
 * Encrypts a JSON-serializable object.
 * Useful for storing structured credential data.
 *
 * @param data - Object to encrypt (must be JSON-serializable)
 * @returns Base64 encoded encrypted string
 *
 * @example
 * const encrypted = encryptJson({
 *   accessKeyId: 'AKIA...',
 *   secretAccessKey: '...',
 *   region: 'us-east-1'
 * })
 */
export function encryptJson<T>(data: T): string {
  const jsonString = JSON.stringify(data)
  return encrypt(jsonString)
}

/**
 * Decrypts data back to a JSON object.
 *
 * @param encryptedData - Base64 encoded string from encryptJson()
 * @returns The original object
 *
 * @example
 * const credentials = decryptJson<BedrockCredentials>(encryptedString)
 * // Returns: { accessKeyId: '...', secretAccessKey: '...', region: '...' }
 */
export function decryptJson<T>(encryptedData: string): T {
  const jsonString = decrypt(encryptedData)
  return JSON.parse(jsonString) as T
}

/**
 * Validates that the encryption key is properly configured.
 * Call this at startup to fail fast if encryption won't work.
 */
export function validateEncryptionConfig(): void {
  try {
    getEncryptionKey()
    // Test round-trip encryption
    const testData = 'encryption-test-' + Date.now()
    const encrypted = encrypt(testData)
    const decrypted = decrypt(encrypted)
    if (decrypted !== testData) {
      throw new Error('Encryption round-trip test failed')
    }
  } catch (error) {
    throw new Error(
      `Encryption configuration invalid: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

/**
 * Generates a secure random encryption key.
 * Use this to generate a new ENCRYPTION_KEY for .env
 *
 * @returns 64 character hex string (32 bytes)
 */
export function generateEncryptionKey(): string {
  return crypto.randomBytes(32).toString('hex')
}

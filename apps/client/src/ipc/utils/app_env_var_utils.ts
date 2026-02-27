/**
 * DO NOT USE LOGGER HERE.
 * Environment variables are sensitive and should not be logged.
 */

import { getBl1nkAppPath } from "@/paths/paths";
import { EnvVar } from "../ipc_types";
import path from "path";
import fs from "fs";

export const ENV_FILE_NAME = ".env.local";

function getEnvFilePath({ appPath }: { appPath: string }): string {
  return path.join(getBl1nkAppPath(appPath), ENV_FILE_NAME);
}

export async function updatePostgresUrlEnvVar({
  appPath,
  connectionUri,
}: {
  appPath: string;
  connectionUri: string;
}) {
  // Given the connection uri, update the env var for POSTGRES_URL
  const envVars = parseEnvFile(await readEnvFile({ appPath }));

  // Find existing POSTGRES_URL or add it if it doesn't exist
  const existingVar = envVars.find((envVar) => envVar.key === "POSTGRES_URL");
  if (existingVar) {
    existingVar.value = connectionUri;
  } else {
    envVars.push({
      key: "POSTGRES_URL",
      value: connectionUri,
    });
  }

  const envFileContents = serializeEnvFile(envVars);
  await fs.promises.writeFile(getEnvFilePath({ appPath }), envFileContents);
}

export async function updateDbPushEnvVar({
  appPath,
  disabled,
}: {
  appPath: string;
  disabled: boolean;
}) {
  try {
    // Try to read existing env file
    let envVars: EnvVar[];
    try {
      const content = await readEnvFile({ appPath });
      envVars = parseEnvFile(content);
    } catch {
      // If file doesn't exist, start with empty array
      envVars = [];
    }

    // Update or add DYAD_DISABLE_DB_PUSH
    const existingVar = envVars.find(
      (envVar) => envVar.key === "DYAD_DISABLE_DB_PUSH",
    );
    if (existingVar) {
      existingVar.value = disabled ? "true" : "false";
    } else {
      envVars.push({
        key: "DYAD_DISABLE_DB_PUSH",
        value: disabled ? "true" : "false",
      });
    }

    const envFileContents = serializeEnvFile(envVars);
    await fs.promises.writeFile(getEnvFilePath({ appPath }), envFileContents);
  } catch (error) {
    throw new Error(`Failed to update DB push environment variable`);
  }
}

export async function readPostgresUrlFromEnvFile({
  appPath,
}: {
  appPath: string;
}): Promise<string> {
  const contents = await readEnvFile({ appPath });
  const envVars = parseEnvFile(contents);
  const postgresUrl = envVars.find(
    (envVar) => envVar.key === "POSTGRES_URL",
  )?.value;
  if (!postgresUrl) {
    throw new Error("POSTGRES_URL not found in .env.local");
  }
  return postgresUrl;
}

export async function readEnvFile({
  appPath,
}: {
  appPath: string;
}): Promise<string> {
  return fs.promises.readFile(getEnvFilePath({ appPath }), "utf8");
}

// Helper function to parse .env.local file content
export function parseEnvFile(content: string): EnvVar[] {
  const envVars: EnvVar[] = [];
  const lines = content.split("\n");

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Skip empty lines and comments
    if (!trimmedLine || trimmedLine.startsWith("#")) {
      continue;
    }

    // Parse key=value pairs
    const equalIndex = trimmedLine.indexOf("=");
    if (equalIndex > 0) {
      const key = trimmedLine.substring(0, equalIndex).trim();
      const value = trimmedLine.substring(equalIndex + 1).trim();

      // Handle quoted values with potential inline comments
      let cleanValue = value;
      if (value.startsWith('"')) {
        // Find the closing quote, handling escaped quotes and escaped backslashes
        let endQuoteIndex = -1;
        let isEscaped = false;
        for (let i = 1; i < value.length; i++) {
          if (value[i] === '"' && !isEscaped) {
            endQuoteIndex = i;
            break;
          }
          if (value[i] === "\\") {
            isEscaped = !isEscaped;
          } else {
            isEscaped = false;
          }
        }
        if (endQuoteIndex !== -1) {
          cleanValue = value.slice(1, endQuoteIndex);
          // Unescape escaped quotes and backslashes
          cleanValue = cleanValue.replace(/\\"/g, '"').replace(/\\\\/g, "\\");
        }
      } else if (value.startsWith("'")) {
        // Find the closing quote for single quotes
        const endQuoteIndex = value.indexOf("'", 1);
        if (endQuoteIndex !== -1) {
          cleanValue = value.slice(1, endQuoteIndex);
        }
      }
      // For unquoted values, keep everything as-is (including potential # symbols)

      envVars.push({ key, value: cleanValue });
    }
  }

  return envVars;
}

// Helper function to serialize environment variables to .env.local format
export function serializeEnvFile(envVars: EnvVar[]): string {
  return envVars
    .map(({ key, value }) => {
      // Add quotes if value contains spaces or special characters
      const needsQuotes = /[\s#"'=&?]/.test(value);
      const escapedValue = value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      const quotedValue = needsQuotes ? `"${escapedValue}"` : value;
      return `${key}=${quotedValue}`;
    })
    .join("\n");
}

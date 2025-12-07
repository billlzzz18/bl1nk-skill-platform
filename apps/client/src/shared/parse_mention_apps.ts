/**
 * Regular expression to match app mentions in the format @app:AppName
 * Supports alphanumeric characters, underscores, and hyphens (but not dots)
 */
export const MENTION_REGEX = /@app:([a-zA-Z0-9_-][a-zA-Z0-9_-]*)/g;

/**
 * Parse app mentions from a prompt string
 * @param prompt - The prompt text to parse
 * @returns Array of mentioned app names
 */
export function parseAppMentions(prompt: string): string[] {
  const matches = prompt.matchAll(MENTION_REGEX);
  return Array.from(matches, (match) => match[1]);
}
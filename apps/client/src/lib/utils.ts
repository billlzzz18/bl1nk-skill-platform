/**
 * Utility functions for the client application.
 */

/**
 * Simple class name concatenator.
 * Filters out falsy values and joins class names with spaces.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Format a date for display.
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Generate a cute app name using random adjectives and nouns.
 */
export function generateCuteAppName(): string {
  const adjectives = [
    'sparkly', 'fluffy', 'cosmic', 'dreamy', 'sunny', 'moonlit', 'starry',
    'bubbly', 'cheery', 'dazzling', 'enchanted', 'fancy', 'glittery',
    'happy', 'jazzy', 'kind', 'lucky', 'magical', 'neat', 'optimistic',
    'playful', 'quirky', 'radiant', 'snazzy', 'twinkly', 'unique',
    'vibrant', 'witty', 'zany', 'adorable', 'brilliant', 'charming'
  ];

  const nouns = [
    'panda', 'unicorn', 'butterfly', 'rainbow', 'star', 'moon', 'sun',
    'cloud', 'flower', 'tree', 'bird', 'fish', 'cat', 'dog', 'rabbit',
    'elephant', 'lion', 'tiger', 'bear', 'wolf', 'fox', 'owl', 'eagle',
    'dolphin', 'whale', 'turtle', 'frog', 'bee', 'ladybug', 'dragonfly',
    'firefly', 'seashell', 'crystal', 'gem', 'crown', 'castle', 'garden'
  ];

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${adjective}-${noun}`;
}

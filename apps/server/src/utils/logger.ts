/**
 * Structured Logging Service
 *
 * Provides consistent logging across the application:
 * - JSON output in production (for log aggregation)
 * - Colorized console output in development
 * - Automatic timestamp and log level tagging
 * - Context support for tracing requests
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogContext {
  [key: string]: unknown
}

interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  context?: LogContext
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

// ANSI colors for development console
const COLORS = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  blue: '\x1b[34m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
} as const

const LEVEL_COLORS: Record<LogLevel, string> = {
  debug: COLORS.dim,
  info: COLORS.green,
  warn: COLORS.yellow,
  error: COLORS.red,
}

class Logger {
  private minLevel: LogLevel
  private isDevelopment: boolean

  constructor() {
    this.isDevelopment = process.env.NODE_ENV !== 'production'
    this.minLevel = this.isDevelopment ? 'debug' : 'info'
  }

  /**
   * Sets the minimum log level. Messages below this level are ignored.
   */
  setLevel(level: LogLevel): void {
    this.minLevel = level
  }

  /**
   * Creates a child logger with preset context.
   * Useful for adding request IDs or component names.
   *
   * @example
   * const reqLogger = logger.child({ requestId: '123' })
   * reqLogger.info('Processing request') // includes requestId
   */
  child(defaultContext: LogContext): ChildLogger {
    return new ChildLogger(this, defaultContext)
  }

  /**
   * Internal logging method.
   */
  private log(level: LogLevel, message: string, context?: LogContext): void {
    if (LOG_LEVELS[level] < LOG_LEVELS[this.minLevel]) {
      return
    }

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(context && Object.keys(context).length > 0 ? { context } : {}),
    }

    if (this.isDevelopment) {
      this.logDevelopment(entry)
    } else {
      this.logProduction(entry)
    }
  }

  /**
   * Development logging: colorized, human-readable output.
   */
  private logDevelopment(entry: LogEntry): void {
    const color = LEVEL_COLORS[entry.level]
    const time = entry.timestamp.split('T')[1].slice(0, 12)
    const levelTag = entry.level.toUpperCase().padEnd(5)

    let output = `${COLORS.dim}${time}${COLORS.reset} ${color}${levelTag}${COLORS.reset} ${entry.message}`

    if (entry.context) {
      const contextStr = Object.entries(entry.context)
        .map(([k, v]) => `${COLORS.cyan}${k}${COLORS.reset}=${formatValue(v)}`)
        .join(' ')
      output += ` ${contextStr}`
    }

    console.log(output)
  }

  /**
   * Production logging: JSON output for log aggregation.
   */
  private logProduction(entry: LogEntry): void {
    // Use appropriate console method for proper log routing
    const consoleFn =
      entry.level === 'error'
        ? console.error
        : entry.level === 'warn'
          ? console.warn
          : console.log

    consoleFn(JSON.stringify(entry))
  }

  // Public logging methods
  debug(message: string, context?: LogContext): void {
    this.log('debug', message, context)
  }

  info(message: string, context?: LogContext): void {
    this.log('info', message, context)
  }

  warn(message: string, context?: LogContext): void {
    this.log('warn', message, context)
  }

  error(message: string, context?: LogContext): void {
    this.log('error', message, context)
  }

  /**
   * Logs an error with stack trace extraction.
   */
  errorWithStack(message: string, error: unknown, context?: LogContext): void {
    const errorContext: LogContext = { ...context }

    if (error instanceof Error) {
      errorContext.errorName = error.name
      errorContext.errorMessage = error.message
      if (this.isDevelopment && error.stack) {
        errorContext.stack = error.stack.split('\n').slice(0, 5).join('\n')
      }
    } else {
      errorContext.errorValue = String(error)
    }

    this.log('error', message, errorContext)
  }
}

/**
 * Child logger with preset context.
 */
class ChildLogger {
  constructor(
    private parent: Logger,
    private defaultContext: LogContext
  ) {}

  debug(message: string, context?: LogContext): void {
    this.parent.debug(message, { ...this.defaultContext, ...context })
  }

  info(message: string, context?: LogContext): void {
    this.parent.info(message, { ...this.defaultContext, ...context })
  }

  warn(message: string, context?: LogContext): void {
    this.parent.warn(message, { ...this.defaultContext, ...context })
  }

  error(message: string, context?: LogContext): void {
    this.parent.error(message, { ...this.defaultContext, ...context })
  }

  errorWithStack(message: string, error: unknown, context?: LogContext): void {
    (this.parent as Logger).errorWithStack(message, error, {
      ...this.defaultContext,
      ...context,
    })
  }
}

/**
 * Formats a value for development console output.
 */
function formatValue(value: unknown): string {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'string') return `"${value}"`
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value)
    } catch {
      return '[Object]'
    }
  }
  return String(value)
}

// Singleton logger instance
export const logger = new Logger()

// Export types for consumers
export type { LogLevel, LogContext }

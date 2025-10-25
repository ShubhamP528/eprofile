/**
 * Database Logger
 * Comprehensive logging for database operations and debugging
 */

export interface LogEntry {
    timestamp: string;
    level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
    category: 'CONNECTION' | 'QUERY' | 'TRANSACTION' | 'MIGRATION' | 'VALIDATION';
    message: string;
    context?: Record<string, any>;
    duration?: number;
    error?: {
        name: string;
        message: string;
        stack?: string;
        code?: string;
    };
}

export class DatabaseLogger {
    private static logs: LogEntry[] = [];
    private static readonly MAX_LOGS = 1000;
    private static readonly isProduction = process.env.NODE_ENV === 'production';

    /**
     * Logs a database connection event
     */
    static logConnection(
        level: LogEntry['level'],
        message: string,
        context?: Record<string, any>,
        error?: Error
    ): void {
        this.log({
            level,
            category: 'CONNECTION',
            message,
            context,
            error: error ? this.serializeError(error) : undefined
        });
    }

    /**
     * Logs a database query event
     */
    static logQuery(
        level: LogEntry['level'],
        message: string,
        context?: Record<string, any>,
        duration?: number,
        error?: Error
    ): void {
        this.log({
            level,
            category: 'QUERY',
            message,
            context,
            duration,
            error: error ? this.serializeError(error) : undefined
        });
    }

    /**
     * Logs a database validation event
     */
    static logValidation(
        level: LogEntry['level'],
        message: string,
        context?: Record<string, any>,
        error?: Error
    ): void {
        this.log({
            level,
            category: 'VALIDATION',
            message,
            context,
            error: error ? this.serializeError(error) : undefined
        });
    }

    /**
     * Logs a database transaction event
     */
    static logTransaction(
        level: LogEntry['level'],
        message: string,
        context?: Record<string, any>,
        duration?: number,
        error?: Error
    ): void {
        this.log({
            level,
            category: 'TRANSACTION',
            message,
            context,
            duration,
            error: error ? this.serializeError(error) : undefined
        });
    }

    /**
     * Core logging function
     */
    private static log(entry: Omit<LogEntry, 'timestamp'>): void {
        const logEntry: LogEntry = {
            ...entry,
            timestamp: new Date().toISOString()
        };

        // Add to in-memory logs
        this.logs.push(logEntry);

        // Maintain log size limit
        if (this.logs.length > this.MAX_LOGS) {
            this.logs = this.logs.slice(-this.MAX_LOGS);
        }

        // Console output based on environment and level
        this.outputToConsole(logEntry);

        // In production, you might want to send to external logging service
        if (this.isProduction && (entry.level === 'ERROR' || entry.level === 'WARN')) {
            this.sendToExternalLogger(logEntry);
        }
    }

    /**
     * Outputs log entry to console with appropriate formatting
     */
    private static outputToConsole(entry: LogEntry): void {
        const prefix = `[${entry.timestamp}] [${entry.category}] [${entry.level}]`;
        const message = `${prefix} ${entry.message}`;

        switch (entry.level) {
            case 'DEBUG':
                if (!this.isProduction) {
                    console.debug(message, entry.context || '');
                }
                break;
            case 'INFO':
                console.info(message, entry.context || '');
                break;
            case 'WARN':
                console.warn(message, entry.context || '');
                if (entry.error) {
                    console.warn('Error details:', entry.error);
                }
                break;
            case 'ERROR':
                console.error(message, entry.context || '');
                if (entry.error) {
                    console.error('Error details:', entry.error);
                }
                break;
        }

        // Log duration if available
        if (entry.duration !== undefined) {
            console.log(`Duration: ${entry.duration}ms`);
        }
    }

    /**
     * Serializes error object for logging
     */
    private static serializeError(error: Error): LogEntry['error'] {
        return {
            name: error.name,
            message: error.message,
            stack: this.isProduction ? undefined : error.stack,
            code: (error as any).code
        };
    }

    /**
     * Sends critical logs to external logging service (placeholder)
     */
    private static sendToExternalLogger(entry: LogEntry): void {
        // In a real application, you would send this to services like:
        // - Sentry
        // - LogRocket
        // - DataDog
        // - CloudWatch
        // - etc.

        if (this.isProduction) {
            // Example: Send to monitoring service
            // monitoringService.log(entry);
            console.log('Would send to external logger:', JSON.stringify(entry, null, 2));
        }
    }

    /**
     * Gets recent logs for debugging
     */
    static getRecentLogs(count: number = 50, level?: LogEntry['level']): LogEntry[] {
        let logs = this.logs.slice(-count);

        if (level) {
            logs = logs.filter(log => log.level === level);
        }

        return logs;
    }

    /**
     * Gets logs by category
     */
    static getLogsByCategory(category: LogEntry['category'], count: number = 50): LogEntry[] {
        return this.logs
            .filter(log => log.category === category)
            .slice(-count);
    }

    /**
     * Gets error logs with context
     */
    static getErrorLogs(count: number = 20): LogEntry[] {
        return this.logs
            .filter(log => log.level === 'ERROR')
            .slice(-count);
    }

    /**
     * Clears all logs (use with caution)
     */
    static clearLogs(): void {
        this.logs = [];
        console.log('Database logs cleared');
    }

    /**
     * Gets log statistics
     */
    static getLogStats(): Record<string, any> {
        const stats = {
            total: this.logs.length,
            byLevel: {} as Record<string, number>,
            byCategory: {} as Record<string, number>,
            recentErrors: 0,
            averageDuration: 0
        };

        let totalDuration = 0;
        let durationCount = 0;
        const oneHourAgo = Date.now() - (60 * 60 * 1000);

        this.logs.forEach(log => {
            // Count by level
            stats.byLevel[log.level] = (stats.byLevel[log.level] || 0) + 1;

            // Count by category
            stats.byCategory[log.category] = (stats.byCategory[log.category] || 0) + 1;

            // Count recent errors
            if (log.level === 'ERROR' && new Date(log.timestamp).getTime() > oneHourAgo) {
                stats.recentErrors++;
            }

            // Calculate average duration
            if (log.duration !== undefined) {
                totalDuration += log.duration;
                durationCount++;
            }
        });

        if (durationCount > 0) {
            stats.averageDuration = Math.round(totalDuration / durationCount);
        }

        return stats;
    }

    /**
     * Creates a performance timer for database operations
     */
    static createTimer(operation: string): () => void {
        const startTime = Date.now();

        return () => {
            const duration = Date.now() - startTime;
            this.logQuery('INFO', `${operation} completed`, { operation }, duration);
        };
    }

    /**
     * Logs database connection attempt with detailed context
     */
    static logConnectionAttempt(
        url: string,
        attempt: number,
        maxAttempts: number,
        error?: Error
    ): void {
        const maskedUrl = this.maskSensitiveData(url);
        const context = {
            attempt,
            maxAttempts,
            maskedUrl,
            timestamp: new Date().toISOString()
        };

        if (error) {
            this.logConnection('ERROR', `Connection attempt ${attempt}/${maxAttempts} failed`, context, error);
        } else {
            this.logConnection('INFO', `Connection attempt ${attempt}/${maxAttempts} succeeded`, context);
        }
    }

    /**
     * Masks sensitive data in URLs and other strings
     */
    private static maskSensitiveData(data: string): string {
        // Mask password in database URLs
        return data.replace(/:([^:@]+)@/, ':***@');
    }

    /**
     * Logs environment validation results
     */
    static logEnvironmentValidation(
        isValid: boolean,
        errors: string[],
        warnings: string[]
    ): void {
        const context = {
            isValid,
            errorCount: errors.length,
            warningCount: warnings.length,
            environment: process.env.NODE_ENV
        };

        if (!isValid) {
            this.logValidation('ERROR', 'Environment validation failed', {
                ...context,
                errors,
                warnings
            });
        } else if (warnings.length > 0) {
            this.logValidation('WARN', 'Environment validation passed with warnings', {
                ...context,
                warnings
            });
        } else {
            this.logValidation('INFO', 'Environment validation passed', context);
        }
    }

    /**
     * Exports logs for external analysis
     */
    static exportLogs(format: 'json' | 'csv' = 'json'): string {
        if (format === 'json') {
            return JSON.stringify(this.logs, null, 2);
        }

        // CSV format
        const headers = ['timestamp', 'level', 'category', 'message', 'duration', 'error'];
        const csvRows = [headers.join(',')];

        this.logs.forEach(log => {
            const row = [
                log.timestamp,
                log.level,
                log.category,
                `"${log.message.replace(/"/g, '""')}"`,
                log.duration || '',
                log.error ? `"${log.error.message.replace(/"/g, '""')}"` : ''
            ];
            csvRows.push(row.join(','));
        });

        return csvRows.join('\n');
    }
}
/**
 * Database Connection Error Handler
 * Handles different types of database connection errors with appropriate recovery strategies
 */

export interface DatabaseError {
    type: 'CONNECTION' | 'AUTHENTICATION' | 'TIMEOUT' | 'VALIDATION' | 'UNKNOWN';
    code: string;
    message: string;
    timestamp: Date;
    context: Record<string, any>;
    recoverable: boolean;
    retryable: boolean;
}

export interface ErrorHandlingResult {
    shouldRetry: boolean;
    retryDelay: number;
    maxRetries: number;
    errorType: string;
    userMessage: string;
    technicalMessage: string;
}

export class DatabaseErrorHandler {
    private static readonly ERROR_PATTERNS = {
        CONNECTION: [
            /connection.*refused/i,
            /network.*unreachable/i,
            /timeout/i,
            /ECONNREFUSED/i,
            /ENOTFOUND/i,
            /ETIMEDOUT/i
        ],
        AUTHENTICATION: [
            /authentication.*failed/i,
            /invalid.*credentials/i,
            /access.*denied/i,
            /password.*authentication.*failed/i,
            /role.*does.*not.*exist/i
        ],
        VALIDATION: [
            /invalid.*database.*url/i,
            /malformed.*connection.*string/i,
            /invalid.*port/i,
            /database.*url.*format/i
        ],
        TIMEOUT: [
            /connection.*timeout/i,
            /query.*timeout/i,
            /pool.*timeout/i,
            /connect.*timeout/i
        ]
    };

    /**
     * Classifies and handles database errors
     */
    static handleError(error: Error, context: Record<string, any> = {}): ErrorHandlingResult {
        const dbError = this.classifyError(error, context);

        console.error(`Database Error [${dbError.type}]:`, {
            message: dbError.message,
            code: dbError.code,
            timestamp: dbError.timestamp,
            context: dbError.context
        });

        return this.getErrorHandlingStrategy(dbError);
    }

    /**
     * Classifies an error into specific database error types
     */
    private static classifyError(error: Error, context: Record<string, any>): DatabaseError {
        const message = error.message.toLowerCase();
        const stack = error.stack?.toLowerCase() || '';
        const fullText = `${message} ${stack}`;

        let type: DatabaseError['type'] = 'UNKNOWN';
        let recoverable = false;
        let retryable = false;

        // Check for specific error patterns
        for (const [errorType, patterns] of Object.entries(this.ERROR_PATTERNS)) {
            if (patterns.some(pattern => pattern.test(fullText))) {
                type = errorType as DatabaseError['type'];
                break;
            }
        }

        // Set recovery and retry flags based on error type
        switch (type) {
            case 'CONNECTION':
                recoverable = true;
                retryable = true;
                break;
            case 'TIMEOUT':
                recoverable = true;
                retryable = true;
                break;
            case 'AUTHENTICATION':
                recoverable = false;
                retryable = false;
                break;
            case 'VALIDATION':
                recoverable = false;
                retryable = false;
                break;
            default:
                recoverable = true;
                retryable = true;
        }

        // Extract error code if available
        const code = (error as any).code || 'UNKNOWN';

        return {
            type,
            code,
            message: error.message,
            timestamp: new Date(),
            context: {
                ...context,
                stack: error.stack,
                name: error.name
            },
            recoverable,
            retryable
        };
    }

    /**
     * Gets error handling strategy based on error type
     */
    private static getErrorHandlingStrategy(dbError: DatabaseError): ErrorHandlingResult {
        const baseStrategy = {
            shouldRetry: dbError.retryable,
            retryDelay: 1000,
            maxRetries: 3,
            errorType: dbError.type,
            userMessage: 'Database connection error occurred',
            technicalMessage: dbError.message
        };

        switch (dbError.type) {
            case 'CONNECTION':
                return {
                    ...baseStrategy,
                    retryDelay: 2000,
                    maxRetries: 5,
                    userMessage: 'Unable to connect to database. Please check your internet connection.',
                    technicalMessage: `Connection failed: ${dbError.message}`
                };

            case 'AUTHENTICATION':
                return {
                    ...baseStrategy,
                    shouldRetry: false,
                    maxRetries: 0,
                    userMessage: 'Database authentication failed. Please check your credentials.',
                    technicalMessage: `Authentication error: ${dbError.message}`
                };

            case 'TIMEOUT':
                return {
                    ...baseStrategy,
                    retryDelay: 3000,
                    maxRetries: 3,
                    userMessage: 'Database operation timed out. Retrying...',
                    technicalMessage: `Timeout error: ${dbError.message}`
                };

            case 'VALIDATION':
                return {
                    ...baseStrategy,
                    shouldRetry: false,
                    maxRetries: 0,
                    userMessage: 'Database configuration error. Please check your settings.',
                    technicalMessage: `Validation error: ${dbError.message}`
                };

            default:
                return {
                    ...baseStrategy,
                    retryDelay: 1500,
                    maxRetries: 2,
                    userMessage: 'An unexpected database error occurred.',
                    technicalMessage: `Unknown error: ${dbError.message}`
                };
        }
    }

    /**
     * Handles PrismaClientInitializationError specifically
     */
    static handlePrismaInitializationError(error: Error, context: Record<string, any> = {}): ErrorHandlingResult {
        console.error('Prisma Client Initialization Error:', error.message);

        // Check if it's a URL validation issue
        if (error.message.includes('database string is invalid') ||
            error.message.includes('connection string') ||
            error.message.includes('Invalid `prisma')) {

            return {
                shouldRetry: false,
                retryDelay: 0,
                maxRetries: 0,
                errorType: 'VALIDATION',
                userMessage: 'Database configuration error. The database connection string is invalid.',
                technicalMessage: `Prisma initialization failed: ${error.message}`
            };
        }

        // Handle as general connection error
        return this.handleError(error, {
            ...context,
            errorSource: 'PrismaClientInitialization'
        });
    }

    /**
     * Creates a user-friendly error message for production
     */
    static createUserFriendlyMessage(dbError: DatabaseError, isProduction: boolean = false): string {
        if (!isProduction) {
            return `Database Error: ${dbError.message}`;
        }

        switch (dbError.type) {
            case 'CONNECTION':
                return 'We are experiencing connectivity issues. Please try again in a moment.';
            case 'AUTHENTICATION':
                return 'Database authentication failed. Please contact support.';
            case 'TIMEOUT':
                return 'The request is taking longer than expected. Please try again.';
            case 'VALIDATION':
                return 'There is a configuration issue. Please contact support.';
            default:
                return 'We are experiencing technical difficulties. Please try again later.';
        }
    }

    /**
     * Logs error for monitoring and debugging
     */
    static logError(dbError: DatabaseError, additionalContext: Record<string, any> = {}): void {
        const logData = {
            timestamp: dbError.timestamp.toISOString(),
            type: dbError.type,
            code: dbError.code,
            message: dbError.message,
            recoverable: dbError.recoverable,
            retryable: dbError.retryable,
            context: {
                ...dbError.context,
                ...additionalContext
            }
        };

        // In production, you might want to send this to a monitoring service
        if (process.env.NODE_ENV === 'production') {
            // Example: Send to monitoring service
            // monitoringService.logError(logData);
            console.error('Database Error (Production):', JSON.stringify(logData, null, 2));
        } else {
            console.error('Database Error (Development):', logData);
        }
    }

    /**
     * Provides troubleshooting suggestions based on error type
     */
    static getTroubleshootingSuggestions(dbError: DatabaseError): string[] {
        const suggestions: string[] = [];

        switch (dbError.type) {
            case 'CONNECTION':
                suggestions.push(
                    'Check if the database server is running',
                    'Verify network connectivity',
                    'Check firewall settings',
                    'Verify the database host and port are correct'
                );
                break;

            case 'AUTHENTICATION':
                suggestions.push(
                    'Verify database username and password',
                    'Check if the database user has proper permissions',
                    'Ensure the database exists',
                    'Verify SSL configuration if required'
                );
                break;

            case 'VALIDATION':
                suggestions.push(
                    'Check DATABASE_URL format',
                    'Ensure all required parameters are present',
                    'Verify special characters are properly encoded',
                    'Check for typos in the connection string'
                );
                break;

            case 'TIMEOUT':
                suggestions.push(
                    'Increase connection timeout settings',
                    'Check database server performance',
                    'Verify network latency',
                    'Consider using connection pooling'
                );
                break;

            default:
                suggestions.push(
                    'Check application logs for more details',
                    'Verify database server status',
                    'Contact system administrator if issue persists'
                );
        }

        return suggestions;
    }
}
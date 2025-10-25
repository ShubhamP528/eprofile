/**
 * Connection Retry Logic with Exponential Backoff
 * Implements retry mechanisms for database connection failures
 */

export interface RetryConfig {
    maxRetries: number;
    baseDelay: number;
    maxDelay: number;
    backoffMultiplier: number;
    jitter: boolean;
}

export interface RetryResult<T> {
    success: boolean;
    result?: T;
    error?: Error;
    attempts: number;
    totalTime: number;
}

export class ConnectionRetry {
    private static readonly DEFAULT_CONFIG: RetryConfig = {
        maxRetries: 3,
        baseDelay: 1000,
        maxDelay: 30000,
        backoffMultiplier: 2,
        jitter: true
    };

    /**
     * Executes a function with retry logic and exponential backoff
     */
    static async withRetry<T>(
        operation: () => Promise<T>,
        config: Partial<RetryConfig> = {},
        operationName: string = 'operation'
    ): Promise<RetryResult<T>> {
        const finalConfig = { ...this.DEFAULT_CONFIG, ...config };
        const startTime = Date.now();
        let lastError: Error | undefined;

        console.log(`Starting ${operationName} with retry config:`, finalConfig);

        for (let attempt = 1; attempt <= finalConfig.maxRetries + 1; attempt++) {
            try {
                console.log(`${operationName} attempt ${attempt}/${finalConfig.maxRetries + 1}`);

                const result = await operation();
                const totalTime = Date.now() - startTime;

                console.log(`${operationName} succeeded on attempt ${attempt} after ${totalTime}ms`);

                return {
                    success: true,
                    result,
                    attempts: attempt,
                    totalTime
                };
            } catch (error) {
                lastError = error instanceof Error ? error : new Error(String(error));
                console.error(`${operationName} failed on attempt ${attempt}:`, lastError.message);

                // Don't wait after the last attempt
                if (attempt <= finalConfig.maxRetries) {
                    const delay = this.calculateDelay(attempt, finalConfig);
                    console.log(`Waiting ${delay}ms before retry...`);
                    await this.sleep(delay);
                }
            }
        }

        const totalTime = Date.now() - startTime;
        console.error(`${operationName} failed after ${finalConfig.maxRetries + 1} attempts in ${totalTime}ms`);

        return {
            success: false,
            error: lastError,
            attempts: finalConfig.maxRetries + 1,
            totalTime
        };
    }

    /**
     * Calculates delay for exponential backoff with optional jitter
     */
    private static calculateDelay(attempt: number, config: RetryConfig): number {
        // Calculate exponential backoff: baseDelay * (backoffMultiplier ^ (attempt - 1))
        let delay = config.baseDelay * Math.pow(config.backoffMultiplier, attempt - 1);

        // Cap at maximum delay
        delay = Math.min(delay, config.maxDelay);

        // Add jitter to prevent thundering herd
        if (config.jitter) {
            // Add random jitter of ±25%
            const jitterRange = delay * 0.25;
            const jitter = (Math.random() - 0.5) * 2 * jitterRange;
            delay = Math.max(0, delay + jitter);
        }

        return Math.round(delay);
    }

    /**
     * Sleep utility function
     */
    private static sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Retry database connection with specific configuration
     */
    static async retryDatabaseConnection(
        connectionFn: () => Promise<boolean>,
        customConfig?: Partial<RetryConfig>
    ): Promise<RetryResult<boolean>> {
        const config: Partial<RetryConfig> = {
            maxRetries: 5,
            baseDelay: 2000,
            maxDelay: 15000,
            backoffMultiplier: 1.5,
            jitter: true,
            ...customConfig
        };

        return this.withRetry(connectionFn, config, 'Database Connection');
    }

    /**
     * Retry database query with specific configuration
     */
    static async retryDatabaseQuery<T>(
        queryFn: () => Promise<T>,
        customConfig?: Partial<RetryConfig>
    ): Promise<RetryResult<T>> {
        const config: Partial<RetryConfig> = {
            maxRetries: 3,
            baseDelay: 1000,
            maxDelay: 8000,
            backoffMultiplier: 2,
            jitter: true,
            ...customConfig
        };

        return this.withRetry(queryFn, config, 'Database Query');
    }

    /**
     * Determines if an error is retryable
     */
    static isRetryableError(error: Error): boolean {
        const retryablePatterns = [
            /connection.*refused/i,
            /network.*unreachable/i,
            /timeout/i,
            /ECONNREFUSED/i,
            /ENOTFOUND/i,
            /ETIMEDOUT/i,
            /connection.*reset/i,
            /socket.*hang.*up/i,
            /temporary.*failure/i
        ];

        const errorMessage = error.message.toLowerCase();
        return retryablePatterns.some(pattern => pattern.test(errorMessage));
    }

    /**
     * Gets retry configuration based on error type
     */
    static getRetryConfigForError(error: Error): Partial<RetryConfig> {
        const errorMessage = error.message.toLowerCase();

        if (errorMessage.includes('timeout')) {
            return {
                maxRetries: 3,
                baseDelay: 3000,
                maxDelay: 12000,
                backoffMultiplier: 1.8
            };
        }

        if (errorMessage.includes('connection') && errorMessage.includes('refused')) {
            return {
                maxRetries: 5,
                baseDelay: 2000,
                maxDelay: 20000,
                backoffMultiplier: 2
            };
        }

        if (errorMessage.includes('network')) {
            return {
                maxRetries: 4,
                baseDelay: 2500,
                maxDelay: 15000,
                backoffMultiplier: 1.6
            };
        }

        // Default configuration for unknown errors
        return {
            maxRetries: 3,
            baseDelay: 1500,
            maxDelay: 10000,
            backoffMultiplier: 2
        };
    }

    /**
     * Circuit breaker pattern for preventing cascade failures
     */
    static createCircuitBreaker<T>(
        operation: () => Promise<T>,
        options: {
            failureThreshold: number;
            resetTimeout: number;
            monitoringPeriod: number;
        } = {
                failureThreshold: 5,
                resetTimeout: 60000,
                monitoringPeriod: 10000
            }
    ) {
        let failures = 0;
        let lastFailureTime = 0;
        let state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';

        return async (): Promise<T> => {
            const now = Date.now();

            // Reset failure count after monitoring period
            if (now - lastFailureTime > options.monitoringPeriod) {
                failures = 0;
            }

            // Check if circuit should be half-open
            if (state === 'OPEN' && now - lastFailureTime > options.resetTimeout) {
                state = 'HALF_OPEN';
                console.log('Circuit breaker: HALF_OPEN - attempting recovery');
            }

            // Reject immediately if circuit is open
            if (state === 'OPEN') {
                throw new Error('Circuit breaker is OPEN - operation rejected');
            }

            try {
                const result = await operation();

                // Success - reset circuit breaker
                if (state === 'HALF_OPEN') {
                    state = 'CLOSED';
                    failures = 0;
                    console.log('Circuit breaker: CLOSED - recovery successful');
                }

                return result;
            } catch (error) {
                failures++;
                lastFailureTime = now;

                // Open circuit if failure threshold reached
                if (failures >= options.failureThreshold) {
                    state = 'OPEN';
                    console.error(`Circuit breaker: OPEN - ${failures} failures detected`);
                }

                throw error;
            }
        };
    }
}
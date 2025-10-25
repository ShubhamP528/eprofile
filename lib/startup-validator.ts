/**
 * Application Startup Validator
 * Validates environment and database connectivity on startup
 */

import { EnvironmentValidator } from "./env-validator";
import { testDatabaseConnection } from "./prisma";

export interface StartupValidationResult {
    success: boolean;
    errors: string[];
    warnings: string[];
    environmentValid: boolean;
    databaseConnected: boolean;
}

export class StartupValidator {
    /**
     * Validates all startup requirements
     */
    static async validate(): Promise<StartupValidationResult> {
        const result: StartupValidationResult = {
            success: true,
            errors: [],
            warnings: [],
            environmentValid: false,
            databaseConnected: false
        };

        console.log('🚀 Starting application validation...');

        // Validate environment variables
        try {
            const envValidation = EnvironmentValidator.validate();
            result.environmentValid = envValidation.isValid;

            if (!envValidation.isValid) {
                result.success = false;
                result.errors.push(...envValidation.errors);
            }

            result.warnings.push(...envValidation.warnings);

            if (result.environmentValid) {
                console.log('✅ Environment variables validated');
            } else {
                console.error('❌ Environment validation failed');
            }
        } catch (error) {
            result.success = false;
            result.errors.push(`Environment validation error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            console.error('❌ Environment validation error:', error);
        }

        // Test database connection (only if environment is valid)
        if (result.environmentValid) {
            try {
                console.log('🔗 Testing database connection...');
                result.databaseConnected = await testDatabaseConnection();

                if (result.databaseConnected) {
                    console.log('✅ Database connection successful');
                } else {
                    result.success = false;
                    result.errors.push('Database connection failed');
                    console.error('❌ Database connection failed');
                }
            } catch (error) {
                result.success = false;
                result.databaseConnected = false;
                result.errors.push(`Database connection error: ${error instanceof Error ? error.message : 'Unknown error'}`);
                console.error('❌ Database connection error:', error);
            }
        } else {
            result.warnings.push('Skipping database connection test due to environment validation failures');
        }

        // Log summary
        if (result.success) {
            console.log('🎉 Application startup validation completed successfully');
            if (result.warnings.length > 0) {
                console.warn('⚠️  Warnings found:');
                result.warnings.forEach(warning => console.warn(`   - ${warning}`));
            }
        } else {
            console.error('💥 Application startup validation failed');
            console.error('Errors:');
            result.errors.forEach(error => console.error(`   - ${error}`));
        }

        return result;
    }

    /**
     * Validates startup and throws if critical errors exist
     */
    static async validateAndThrow(): Promise<void> {
        const validation = await this.validate();

        if (!validation.success) {
            const errorMessage = [
                'Application startup validation failed:',
                ...validation.errors
            ].join('\n');

            throw new Error(errorMessage);
        }
    }

    /**
     * Validates environment only (for quick checks)
     */
    static validateEnvironmentOnly(): void {
        try {
            EnvironmentValidator.validateAndThrow();
            console.log('✅ Environment validation passed');
        } catch (error) {
            console.error('❌ Environment validation failed:', error);
            throw error;
        }
    }

    /**
     * Gets diagnostic information for troubleshooting
     */
    static getDiagnostics(): Record<string, any> {
        return {
            nodeEnv: process.env.NODE_ENV,
            timestamp: new Date().toISOString(),
            environment: EnvironmentValidator.getEnvironmentSummary(),
            platform: {
                node: process.version,
                platform: process.platform,
                arch: process.arch
            }
        };
    }
}
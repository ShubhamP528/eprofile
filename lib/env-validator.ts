/**
 * Environment Variable Validator
 * Validates required environment variables on application startup
 */

import { DatabaseURLValidator } from "./database-url-validator";

export interface EnvValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
    missing: string[];
}

export interface RequiredEnvVars {
    DATABASE_URL: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
}

export interface OptionalEnvVars {
    GOOGLE_CLIENT_ID?: string;
    GOOGLE_CLIENT_SECRET?: string;
    RESEND_API_KEY?: string;
    CLOUDINARY_CLOUD_NAME?: string;
    CLOUDINARY_API_KEY?: string;
    CLOUDINARY_API_SECRET?: string;
    RAZORPAY_KEY_ID?: string;
    RAZORPAY_KEY_SECRET?: string;
}

export class EnvironmentValidator {
    private static readonly REQUIRED_VARS: (keyof RequiredEnvVars)[] = [
        'DATABASE_URL',
        'NEXTAUTH_SECRET',
        'NEXTAUTH_URL'
    ];

    private static readonly PRODUCTION_REQUIRED_VARS: string[] = [
        'GOOGLE_CLIENT_ID',
        'GOOGLE_CLIENT_SECRET'
    ];

    /**
     * Validates all environment variables
     */
    static validate(): EnvValidationResult {
        const result: EnvValidationResult = {
            isValid: true,
            errors: [],
            warnings: [],
            missing: []
        };

        const isProduction = process.env.NODE_ENV === 'production';

        // Check required variables
        for (const varName of this.REQUIRED_VARS) {
            const value = process.env[varName];
            if (!value) {
                result.isValid = false;
                result.missing.push(varName);
                result.errors.push(`Required environment variable ${varName} is not set`);
            } else {
                // Validate specific variables
                this.validateSpecificVar(varName, value, result, isProduction);
            }
        }

        // Check production-specific requirements
        if (isProduction) {
            for (const varName of this.PRODUCTION_REQUIRED_VARS) {
                const value = process.env[varName];
                if (!value) {
                    result.warnings.push(`Production environment variable ${varName} is not set`);
                }
            }
        }

        // Check for development-only values in production
        if (isProduction) {
            this.checkProductionSafety(result);
        }

        return result;
    }

    /**
     * Validates specific environment variables
     */
    private static validateSpecificVar(
        varName: string,
        value: string,
        result: EnvValidationResult,
        isProduction: boolean
    ): void {
        switch (varName) {
            case 'DATABASE_URL':
                this.validateDatabaseURL(value, result, isProduction);
                break;
            case 'NEXTAUTH_SECRET':
                this.validateNextAuthSecret(value, result, isProduction);
                break;
            case 'NEXTAUTH_URL':
                this.validateNextAuthURL(value, result, isProduction);
                break;
        }
    }

    /**
     * Validates DATABASE_URL
     */
    private static validateDatabaseURL(
        url: string,
        result: EnvValidationResult,
        isProduction: boolean
    ): void {
        const dbValidation = DatabaseURLValidator.validate(url);

        if (!dbValidation.isValid) {
            result.isValid = false;
            result.errors.push(...dbValidation.errors.map(err => `DATABASE_URL: ${err}`));
        }

        result.warnings.push(...dbValidation.warnings.map(warn => `DATABASE_URL: ${warn}`));

        // Environment-specific validation
        const envValidation = DatabaseURLValidator.validateEnvironment(
            url,
            isProduction ? 'production' : 'development'
        );
        result.warnings.push(...envValidation.warnings.map(warn => `DATABASE_URL: ${warn}`));
    }

    /**
     * Validates NEXTAUTH_SECRET
     */
    private static validateNextAuthSecret(
        secret: string,
        result: EnvValidationResult,
        isProduction: boolean
    ): void {
        if (secret.length < 32) {
            result.warnings.push('NEXTAUTH_SECRET should be at least 32 characters long');
        }

        if (isProduction && secret.includes('development')) {
            result.isValid = false;
            result.errors.push('NEXTAUTH_SECRET contains development-only value in production');
        }

        if (secret === 'your-super-secret-key-for-development-only-change-in-production') {
            if (isProduction) {
                result.isValid = false;
                result.errors.push('NEXTAUTH_SECRET is using default development value in production');
            } else {
                result.warnings.push('NEXTAUTH_SECRET is using default development value');
            }
        }
    }

    /**
     * Validates NEXTAUTH_URL
     */
    private static validateNextAuthURL(
        url: string,
        result: EnvValidationResult,
        isProduction: boolean
    ): void {
        try {
            const parsedUrl = new URL(url);

            if (isProduction && parsedUrl.hostname === 'localhost') {
                result.isValid = false;
                result.errors.push('NEXTAUTH_URL cannot use localhost in production');
            }

            if (isProduction && parsedUrl.protocol !== 'https:') {
                result.warnings.push('NEXTAUTH_URL should use HTTPS in production');
            }

            if (!isProduction && parsedUrl.protocol === 'http:' && parsedUrl.hostname === 'localhost') {
                // This is fine for development
            }
        } catch (error) {
            result.isValid = false;
            result.errors.push('NEXTAUTH_URL is not a valid URL');
        }
    }

    /**
     * Checks for production safety issues
     */
    private static checkProductionSafety(result: EnvValidationResult): void {
        // Check for test/development values in production
        const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
        if (razorpayKeyId && razorpayKeyId.startsWith('rzp_test_')) {
            result.warnings.push('RAZORPAY_KEY_ID is using test key in production');
        }

        // Check for placeholder values
        const placeholderPatterns = [
            'your-production-',
            'REPLACE_WITH_',
            'your-live-',
            'YOUR_LIVE_'
        ];

        Object.entries(process.env).forEach(([key, value]) => {
            if (value && placeholderPatterns.some(pattern => value.includes(pattern))) {
                result.warnings.push(`${key} appears to contain placeholder value`);
            }
        });
    }

    /**
     * Validates environment and throws if critical errors exist
     */
    static validateAndThrow(): void {
        const validation = this.validate();

        if (!validation.isValid) {
            const errorMessage = [
                'Environment validation failed:',
                ...validation.errors,
                '',
                'Missing variables:',
                ...validation.missing
            ].join('\n');

            throw new Error(errorMessage);
        }

        // Log warnings
        if (validation.warnings.length > 0) {
            console.warn('Environment validation warnings:');
            validation.warnings.forEach(warning => console.warn(`  - ${warning}`));
        }
    }

    /**
     * Gets environment summary for debugging
     */
    static getEnvironmentSummary(): Record<string, string> {
        const summary: Record<string, string> = {};

        // Safe environment variables (no secrets)
        const safeVars = [
            'NODE_ENV',
            'NEXTAUTH_URL',
            'NEXT_PUBLIC_RAZORPAY_KEY_ID',
            'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME'
        ];

        safeVars.forEach(varName => {
            summary[varName] = process.env[varName] || 'not set';
        });

        // Masked sensitive variables
        const sensitiveVars = [
            'DATABASE_URL',
            'NEXTAUTH_SECRET',
            'GOOGLE_CLIENT_SECRET',
            'RAZORPAY_KEY_SECRET',
            'CLOUDINARY_API_SECRET'
        ];

        sensitiveVars.forEach(varName => {
            const value = process.env[varName];
            if (value) {
                summary[varName] = `${value.substring(0, 8)}...${value.substring(value.length - 4)}`;
            } else {
                summary[varName] = 'not set';
            }
        });

        return summary;
    }
}
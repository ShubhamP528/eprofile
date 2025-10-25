/**
 * Database URL Validator and Sanitizer
 * Handles validation and encoding of PostgreSQL connection strings
 */

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
}

export interface DatabaseURLComponents {
    protocol: string;
    username: string;
    password: string;
    host: string;
    port: string;
    database: string;
    params: Record<string, string>;
}

export class DatabaseURLValidator {
    /**
     * Validates a PostgreSQL database URL format
     */
    static validate(url: string): ValidationResult {
        const result: ValidationResult = {
            isValid: true,
            errors: [],
            warnings: []
        };

        if (!url) {
            result.isValid = false;
            result.errors.push('Database URL is required');
            return result;
        }

        if (!url.startsWith('postgresql://')) {
            result.isValid = false;
            result.errors.push('Database URL must start with postgresql://');
            return result;
        }

        try {
            const components = this.parseURL(url);

            // Validate components
            if (!components.username) {
                result.isValid = false;
                result.errors.push('Username is required');
            }

            if (!components.password) {
                result.isValid = false;
                result.errors.push('Password is required');
            }

            if (!components.host) {
                result.isValid = false;
                result.errors.push('Host is required');
            }

            if (!components.port || isNaN(Number(components.port))) {
                result.isValid = false;
                result.errors.push('Valid port number is required');
            }

            if (!components.database) {
                result.isValid = false;
                result.errors.push('Database name is required');
            }

            // Check for special characters that need encoding
            if (components.password && this.hasSpecialCharacters(components.password)) {
                result.warnings.push('Password contains special characters that will be URL encoded');
            }
        } catch (error) {
            result.isValid = false;
            result.errors.push(error instanceof Error ? error.message : 'Failed to parse URL');
        }

        return result;
    }

    /**
     * Sanitizes and properly encodes a database URL
     */
    static sanitize(url: string): string {
        if (!url) return url;

        try {
            const components = this.parseURL(url);
            return this.buildURL(components);
        } catch (error) {
            console.error('Failed to sanitize database URL:', error);
            return url;
        }
    }

    /**
     * Encodes special characters in the password component
     */
    static encodePassword(password: string): string {
        if (!password) return password;

        // Encode special characters that can break URL parsing
        return encodeURIComponent(password);
    }

    /**
     * Parses a PostgreSQL URL into components
     */
    private static parseURL(url: string): DatabaseURLComponents {
        try {
            // Handle postgresql:// URLs by converting to a parseable format
            if (!url.startsWith('postgresql://')) {
                throw new Error('URL must start with postgresql://');
            }

            // Extract the part after postgresql://
            const urlPart = url.substring('postgresql://'.length);

            // Find the last @ symbol to separate credentials from host
            const lastAtIndex = urlPart.lastIndexOf('@');
            if (lastAtIndex === -1) {
                throw new Error('URL must contain credentials');
            }

            const credentials = urlPart.substring(0, lastAtIndex);
            const hostPart = urlPart.substring(lastAtIndex + 1);

            // Parse credentials (username:password)
            const colonIndex = credentials.indexOf(':');
            if (colonIndex === -1) {
                throw new Error('Credentials must contain username:password');
            }

            const username = credentials.substring(0, colonIndex);
            const password = credentials.substring(colonIndex + 1);

            // Parse host part (host:port/database?params)
            const [hostAndPort, ...pathParts] = hostPart.split('/');
            if (!hostAndPort || pathParts.length === 0) {
                throw new Error('URL must contain host:port/database');
            }

            const [host, port] = hostAndPort.split(':');
            if (!host || !port) {
                throw new Error('Host and port are required');
            }

            // Parse database and query parameters
            const pathAndQuery = pathParts.join('/');
            const [database, queryString] = pathAndQuery.split('?');

            // Parse query parameters
            const params: Record<string, string> = {};
            if (queryString) {
                const urlParams = new URLSearchParams(queryString);
                urlParams.forEach((value, key) => {
                    params[key] = value;
                });
            }

            return {
                protocol: 'postgresql',
                username,
                password,
                host,
                port,
                database,
                params
            };
        } catch (error) {
            throw new Error(`Failed to parse PostgreSQL URL: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Builds a properly encoded PostgreSQL URL from components
     */
    private static buildURL(components: DatabaseURLComponents): string {
        const {
            protocol,
            username,
            password,
            host,
            port,
            database,
            params
        } = components;

        // Encode the password to handle special characters
        const encodedPassword = this.encodePassword(password);

        // Build base URL
        let url = `${protocol}://${username}:${encodedPassword}@${host}:${port}/${database}`;

        // Add query parameters
        const paramEntries = Object.entries(params);
        if (paramEntries.length > 0) {
            const queryString = paramEntries
                .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
                .join('&');
            url += `?${queryString}`;
        }

        return url;
    }

    /**
     * Checks if a string contains special characters that need encoding
     */
    private static hasSpecialCharacters(str: string): boolean {
        // Characters that need encoding in URLs
        const specialChars = /[@:/?#[\]!$&'()*+,;=]/;
        return specialChars.test(str);
    }

    /**
     * Adds production-specific parameters to database URL
     */
    static addProductionParams(url: string, isProduction: boolean = false): string {
        if (!isProduction) return url;

        try {
            const components = this.parseURL(url);

            // Add production-specific parameters
            components.params = {
                ...components.params,
                pgbouncer: 'true',
                pool_timeout: '10',
                connect_timeout: '60',
                sslmode: 'require'
            };

            return this.buildURL(components);
        } catch (error) {
            console.error('Failed to add production parameters:', error);
            return url;
        }
    }

    /**
     * Validates environment-specific requirements
     */
    static validateEnvironment(url: string, environment: string): ValidationResult {
        const baseValidation = this.validate(url);

        if (!baseValidation.isValid) {
            return baseValidation;
        }

        if (environment === 'production') {
            // Additional production validations
            if (!url.includes('sslmode=require') && !url.includes('ssl=true')) {
                baseValidation.warnings.push('Production environment should use SSL connections');
            }

            if (!url.includes('pgbouncer=true')) {
                baseValidation.warnings.push('Production environment should use connection pooling');
            }
        }

        return baseValidation;
    }
}
/**
 * Utility functions for generating card URLs
 * Supports both path-based and subdomain-based URLs
 */

/**
 * Get the full URL for a card based on username
 * @param username - The card username
 * @returns Full URL to the card
 */
export function getCardUrl(username: string): string {
    const enableSubdomains = process.env.NEXT_PUBLIC_ENABLE_SUBDOMAINS === 'true'
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'eprofile.cv'

    if (enableSubdomains) {
        return `https://${username}.${rootDomain}`
    }

    return `https://${rootDomain}/${username}`
}

/**
 * Get the display URL for a card (without protocol)
 * @param username - The card username
 * @returns Display URL without https://
 */
export function getCardDisplayUrl(username: string): string {
    const enableSubdomains = process.env.NEXT_PUBLIC_ENABLE_SUBDOMAINS === 'true'
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'eprofile.cv'

    if (enableSubdomains) {
        return `${username}.${rootDomain}`
    }

    return `${rootDomain}/${username}`
}

/**
 * Check if subdomains are enabled
 * @returns boolean indicating if subdomain feature is enabled
 */
export function isSubdomainEnabled(): boolean {
    return process.env.NEXT_PUBLIC_ENABLE_SUBDOMAINS === 'true'
}

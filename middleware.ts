import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const url = request.nextUrl

  // Get root domain from environment or default
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'eprofile.cv'
  const enableSubdomains = process.env.NEXT_PUBLIC_ENABLE_SUBDOMAINS === 'true'

  // Skip if subdomains are not enabled
  if (!enableSubdomains) {
    return NextResponse.next()
  }

  // Main domain - no subdomain (including www)
  if (hostname === rootDomain || hostname === `www.${rootDomain}`) {
    return NextResponse.next()
  }

  // Check if this is a subdomain
  const hostParts = hostname.split('.')

  // If hostname matches pattern: subdomain.eprofile.cv
  if (hostname.endsWith(`.${rootDomain}`) && hostParts.length >= 3) {
    const subdomain = hostParts[0]

    // Skip reserved subdomains
    const reservedSubdomains = ['www', 'api', 'admin', 'dashboard', 'app', 'mail', 'ftp']
    if (reservedSubdomains.includes(subdomain.toLowerCase())) {
      return NextResponse.next()
    }

    // Rewrite subdomain to username route
    // Example: john.eprofile.cv → eprofile.cv/john
    const rewriteUrl = url.clone()

    // If accessing root of subdomain, rewrite to /[username]
    if (url.pathname === '/') {
      rewriteUrl.pathname = `/${subdomain}`
    } else {
      // If accessing a path on subdomain, prepend username
      rewriteUrl.pathname = `/${subdomain}${url.pathname}`
    }

    return NextResponse.rewrite(rewriteUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     * - api routes (handled separately)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
  ],
}

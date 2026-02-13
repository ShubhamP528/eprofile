# 🌐 Cloudflare Subdomain Setup for eProfile Cards

## Overview

This guide explains how to set up custom subdomains for user cards (e.g., `john.eprofile.cv` instead of `eprofile.cv/john`) using Cloudflare DNS management and Vercel hosting.

## Architecture Options

### Option 1: Wildcard Subdomain (Recommended)

**Pattern**: `username.eprofile.cv` → Shows user's card
**Example**: `john.eprofile.cv`, `jane.eprofile.cv`

### Option 2: Fixed Subdomain

**Pattern**: `card.eprofile.cv/username` → Shows user's card
**Example**: `card.eprofile.cv/john`, `card.eprofile.cv/jane`

## 🚀 Setup Guide - Wildcard Subdomain (Option 1)

### Step 1: Cloudflare DNS Configuration

1. **Log in to Cloudflare Dashboard**

   - Go to https://dash.cloudflare.com
   - Select your `eprofile.cv` domain

2. **Add Wildcard DNS Record**

   - Navigate to **DNS** → **Records**
   - Click **Add record**
   - Configure:
     ```
     Type:    CNAME
     Name:    *
     Target:  cname.vercel-dns.com
     Proxy:   DNS only (gray cloud) ⚠️ Important!
     TTL:     Auto
     ```
   - Click **Save**

3. **Verify DNS Record**
   ```
   Type    Name    Target                  Proxy Status
   CNAME   *       cname.vercel-dns.com    DNS only
   ```

### Step 2: Vercel Domain Configuration

1. **Go to Vercel Dashboard**

   - Navigate to your project
   - Go to **Settings** → **Domains**

2. **Add Wildcard Domain**

   - Click **Add**
   - Enter: `*.eprofile.cv`
   - Click **Add**

3. **Verify Domain**
   - Vercel will verify the DNS configuration
   - Wait for SSL certificate to be issued (usually 1-5 minutes)
   - Status should show "Valid Configuration"

### Step 3: Update Next.js Configuration

Update your `next.config.ts` to handle wildcard subdomains:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  // Enable wildcard domain handling
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/api/subdomain-handler",
        has: [
          {
            type: "host",
            value: "(?<subdomain>.*)\\.eprofile\\.cv",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

### Step 4: Create Subdomain Handler Middleware

Create `middleware.ts` in your project root:

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";

  // Extract subdomain
  const subdomain = hostname.split(".")[0];

  // Main domain - no subdomain
  if (hostname === "eprofile.cv" || hostname === "www.eprofile.cv") {
    return NextResponse.next();
  }

  // Subdomain detected - rewrite to username page
  if (subdomain && hostname.includes("eprofile.cv")) {
    // Rewrite to /[username] route
    const url = request.nextUrl.clone();
    url.pathname = `/${subdomain}${url.pathname === "/" ? "" : url.pathname}`;

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};
```

### Step 5: Update Environment Variables

Add to your `.env.production`:

```bash
# Domain Configuration
NEXT_PUBLIC_ROOT_DOMAIN=eprofile.cv
NEXT_PUBLIC_ENABLE_SUBDOMAINS=true
```

### Step 6: Test Subdomain Setup

1. **Create a test card** with username `test`
2. **Wait for DNS propagation** (usually 5-10 minutes)
3. **Test URLs**:
   - Main site: `https://eprofile.cv`
   - Test card (path): `https://eprofile.cv/test`
   - Test card (subdomain): `https://test.eprofile.cv`

## 🔧 Alternative Setup - Fixed Subdomain (Option 2)

If you prefer `card.eprofile.cv/username` instead of wildcard:

### Cloudflare DNS:

```
Type:    CNAME
Name:    card
Target:  cname.vercel-dns.com
Proxy:   DNS only
```

### Vercel Domains:

Add: `card.eprofile.cv`

### Middleware:

```typescript
export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";

  if (hostname === "card.eprofile.cv") {
    // Already on card subdomain, no rewrite needed
    return NextResponse.next();
  }

  return NextResponse.next();
}
```

## 📱 Update Card Sharing URLs

Update your card sharing component to use subdomains:

```typescript
// lib/utils/card-url.ts
export function getCardUrl(username: string): string {
  const enableSubdomains = process.env.NEXT_PUBLIC_ENABLE_SUBDOMAINS === "true";
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "eprofile.cv";

  if (enableSubdomains) {
    return `https://${username}.${rootDomain}`;
  }

  return `https://${rootDomain}/${username}`;
}
```

Update `components/cards/social-share.tsx`:

```typescript
import { getCardUrl } from "@/lib/utils/card-url";

// In your component:
const cardUrl = getCardUrl(card.username);
```

## 🔒 SSL Certificate Notes

- Vercel automatically provisions SSL certificates for wildcard domains
- Initial certificate issuance takes 1-5 minutes
- Certificates auto-renew every 90 days
- Cloudflare proxy must be **disabled** (gray cloud) for Vercel SSL to work

## ⚠️ Important Cloudflare Settings

### 1. Proxy Status

- **Must be "DNS only"** (gray cloud icon)
- If proxied (orange cloud), Vercel cannot issue SSL certificates

### 2. SSL/TLS Mode

- Go to **SSL/TLS** → **Overview**
- Set to **Full** or **Full (strict)**
- Never use "Flexible" mode

### 3. Always Use HTTPS

- Go to **SSL/TLS** → **Edge Certificates**
- Enable **Always Use HTTPS**

## 🧪 Testing Checklist

- [ ] Main domain works: `eprofile.cv`
- [ ] WWW redirect works: `www.eprofile.cv` → `eprofile.cv`
- [ ] Path-based URLs work: `eprofile.cv/username`
- [ ] Subdomain URLs work: `username.eprofile.cv`
- [ ] SSL certificate is valid for subdomains
- [ ] Dashboard still accessible: `eprofile.cv/dashboard`
- [ ] API routes work: `eprofile.cv/api/*`
- [ ] Authentication works on all domains

## 🐛 Troubleshooting

### Issue: "DNS_PROBE_FINISHED_NXDOMAIN"

**Solution**: DNS not propagated yet. Wait 5-10 minutes and clear DNS cache:

```bash
# Windows
ipconfig /flushdns

# Mac
sudo dscacheutil -flushcache

# Linux
sudo systemd-resolve --flush-caches
```

### Issue: SSL Certificate Error

**Solution**:

1. Ensure Cloudflare proxy is disabled (gray cloud)
2. Wait 5 minutes for Vercel to issue certificate
3. Check Vercel domain status

### Issue: Subdomain shows 404

**Solution**:

1. Verify middleware.ts is in project root
2. Check middleware matcher configuration
3. Ensure username exists in database

### Issue: Infinite Redirect Loop

**Solution**:

1. Check middleware logic
2. Verify NEXTAUTH_URL is set correctly
3. Ensure no conflicting rewrites in next.config.ts

## 📊 DNS Propagation Check

Check DNS propagation status:

- https://dnschecker.org
- Enter: `test.eprofile.cv`
- Should show: `cname.vercel-dns.com`

## 🎯 Benefits of Subdomain Setup

1. **Professional URLs**: `john.eprofile.cv` looks more professional
2. **Better Branding**: Each user gets their own subdomain
3. **SEO Benefits**: Subdomains can rank independently
4. **Easier Sharing**: Shorter, cleaner URLs
5. **Custom Domains**: Users can later add their own domains

## 🚀 Next Steps

After subdomain setup:

1. Update social sharing components
2. Update QR code generation
3. Update email templates with new URLs
4. Test all card features with subdomains
5. Update documentation for users

## 📝 User Communication

Inform users about the new subdomain feature:

- Old URL: `eprofile.cv/john` (still works)
- New URL: `john.eprofile.cv` (cleaner, more professional)
- Both URLs will work simultaneously

---

**Need Help?**

- Cloudflare Docs: https://developers.cloudflare.com/dns/
- Vercel Docs: https://vercel.com/docs/concepts/projects/domains
- Next.js Middleware: https://nextjs.org/docs/app/building-your-application/routing/middleware

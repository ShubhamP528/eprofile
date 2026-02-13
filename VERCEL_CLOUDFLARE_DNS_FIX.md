# 🔧 Vercel + Cloudflare DNS Configuration Fix

## Problem

Vercel shows "Invalid Configuration" and asks to update nameservers, but you want to keep Cloudflare for DNS management.

## Solution: Use Cloudflare DNS (Don't Change Nameservers)

You have two choices:

### ✅ Option A: Keep Cloudflare DNS (Recommended)

**Step 1: Remove Domain from Vercel Temporarily**

1. Go to Vercel → Your Project → Settings → Domains
2. Remove `*.eprofile.cv` if you added it
3. Keep only your Vercel deployment URL for now

**Step 2: Configure Cloudflare DNS**

1. Log in to Cloudflare Dashboard
2. Select `eprofile.cv` domain
3. Go to **DNS** → **Records**
4. Add/Update these records:

```
Type    Name    Content                     Proxy Status    TTL
----    ----    -------                     ------------    ---
A       @       76.76.19.61                 DNS only ☁️     Auto
CNAME   www     cname.vercel-dns.com        DNS only ☁️     Auto
```

**CRITICAL**: Proxy Status MUST be "DNS only" (gray cloud), NOT "Proxied" (orange cloud)

**Step 3: Get Vercel's Actual IP/CNAME**

1. In Vercel → Your Project → Settings → Domains
2. Click "Add Domain"
3. Enter: `eprofile.cv` (without www or wildcard)
4. Vercel will show you the exact DNS records to add
5. Copy those values and use them in Cloudflare

**Step 4: Add Domain to Vercel**

1. In Vercel → Settings → Domains
2. Add: `eprofile.cv`
3. Wait 1-2 minutes
4. Click "Refresh" button
5. Should show "Valid Configuration" ✅

**Step 5: Add WWW Redirect**

1. In Vercel → Settings → Domains
2. Add: `www.eprofile.cv`
3. Set to redirect to `eprofile.cv`

**Step 6: Add Wildcard (For Subdomains)**

1. In Cloudflare, add wildcard CNAME:

```
Type    Name    Content                     Proxy Status    TTL
----    ----    -------                     ------------    ---
CNAME   *       cname.vercel-dns.com        DNS only ☁️     Auto
```

2. In Vercel → Settings → Domains
3. Add: `*.eprofile.cv`
4. Wait for SSL certificate (5-10 minutes)

---

### Option B: Use Vercel DNS (Simpler but loses Cloudflare features)

**Step 1: Change Nameservers**

1. Go to your domain registrar (where you bought eprofile.cv)
2. Find DNS/Nameserver settings
3. Change nameservers to:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
4. Save changes

**Step 2: Wait for Propagation**

- Takes 1-48 hours (usually 2-6 hours)
- Check status: https://dnschecker.org

**Step 3: Verify in Vercel**

- Vercel will automatically detect the change
- Domain will show "Valid Configuration"

---

## Recommended: Option A (Keep Cloudflare)

### Why Keep Cloudflare?

- ✅ Better DDoS protection
- ✅ More DNS features
- ✅ Analytics and insights
- ✅ Page rules and redirects
- ✅ Faster DNS updates

### Critical Cloudflare Settings

**1. Proxy Status**

- MUST be "DNS only" (gray cloud ☁️)
- If orange cloud 🟠, Vercel cannot verify domain

**2. SSL/TLS Mode**

- Go to SSL/TLS → Overview
- Set to: **Full** or **Full (strict)**
- Never use "Flexible"

**3. Always Use HTTPS**

- Go to SSL/TLS → Edge Certificates
- Enable "Always Use HTTPS"

---

## Verification Steps

### Check DNS Records

```bash
# Check A record
nslookup eprofile.cv

# Check CNAME
nslookup www.eprofile.cv

# Check wildcard
nslookup test.eprofile.cv
```

### Check DNS Propagation

Visit: https://dnschecker.org

- Enter: `eprofile.cv`
- Should show Vercel's IP or CNAME

---

## Troubleshooting

### Issue: "Invalid Configuration" persists

**Solution 1: Clear Cloudflare Cache**

1. Cloudflare → Caching → Configuration
2. Click "Purge Everything"
3. Wait 5 minutes
4. Try again in Vercel

**Solution 2: Temporarily Disable Cloudflare Proxy**

1. In Cloudflare DNS records
2. Click orange cloud 🟠 to make it gray ☁️
3. Wait 5 minutes
4. Refresh in Vercel
5. Once verified, you can re-enable proxy (but not recommended)

**Solution 3: Remove and Re-add Domain**

1. Remove domain from Vercel
2. Wait 5 minutes
3. Re-add domain
4. Click "Refresh"

### Issue: SSL Certificate Error

**Cause**: Cloudflare proxy is enabled (orange cloud)

**Solution**:

1. Disable Cloudflare proxy (gray cloud)
2. Wait 5-10 minutes for Vercel to issue SSL
3. Check Vercel domain status

### Issue: Domain works but subdomains don't

**Solution**:

1. Verify wildcard CNAME exists in Cloudflare:
   ```
   CNAME   *   cname.vercel-dns.com   (DNS only)
   ```
2. Verify `*.eprofile.cv` is added in Vercel
3. Check middleware.ts is deployed
4. Wait 5-10 minutes for DNS propagation

---

## Step-by-Step Checklist

- [ ] Cloudflare: Add A record for @ → Vercel IP (gray cloud)
- [ ] Cloudflare: Add CNAME for www → cname.vercel-dns.com (gray cloud)
- [ ] Cloudflare: Add CNAME for \* → cname.vercel-dns.com (gray cloud)
- [ ] Cloudflare: Set SSL/TLS to "Full"
- [ ] Cloudflare: Enable "Always Use HTTPS"
- [ ] Vercel: Add domain `eprofile.cv`
- [ ] Vercel: Wait for "Valid Configuration"
- [ ] Vercel: Add domain `www.eprofile.cv`
- [ ] Vercel: Add domain `*.eprofile.cv`
- [ ] Wait 5-10 minutes for SSL certificates
- [ ] Test: Visit `https://eprofile.cv`
- [ ] Test: Visit `https://www.eprofile.cv`
- [ ] Test: Visit `https://test.eprofile.cv`

---

## Quick Commands

### Check Current Nameservers

```bash
nslookup -type=ns eprofile.cv
```

### Check DNS Records

```bash
# Windows
nslookup eprofile.cv
nslookup www.eprofile.cv

# Mac/Linux
dig eprofile.cv
dig www.eprofile.cv
```

### Flush DNS Cache

```bash
# Windows
ipconfig /flushdns

# Mac
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

# Linux
sudo systemd-resolve --flush-caches
```

---

## Expected DNS Configuration

After setup, your DNS should look like this:

**Cloudflare DNS Records:**

```
Type    Name    Content                     Proxy    TTL
A       @       76.76.19.61                 ☁️       Auto
CNAME   www     cname.vercel-dns.com        ☁️       Auto
CNAME   *       cname.vercel-dns.com        ☁️       Auto
```

**Vercel Domains:**

```
eprofile.cv          → Valid Configuration ✅
www.eprofile.cv      → Valid Configuration ✅
*.eprofile.cv        → Valid Configuration ✅
```

---

## Need Help?

If you're still seeing "Invalid Configuration":

1. **Screenshot your Cloudflare DNS records**
2. **Screenshot your Vercel domain settings**
3. **Run**: `nslookup eprofile.cv` and share output
4. **Check**: Are nameservers pointing to Cloudflare?
   ```bash
   nslookup -type=ns eprofile.cv
   ```
   Should show Cloudflare nameservers (e.g., `ns1.cloudflare.com`)

---

## Important Notes

- **Don't change nameservers** if you want to keep Cloudflare
- **Gray cloud (DNS only)** is required for Vercel to work
- **SSL certificates** take 5-10 minutes to issue
- **DNS propagation** can take up to 24 hours (usually 5-10 minutes)
- **Wildcard domains** require the base domain to work first

---

**Once configured correctly, you'll have:**

- ✅ Main site: `eprofile.cv`
- ✅ WWW redirect: `www.eprofile.cv` → `eprofile.cv`
- ✅ User subdomains: `username.eprofile.cv`
- ✅ Cloudflare protection and features
- ✅ Vercel hosting and SSL

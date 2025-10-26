# 🌐 eProfile Domain Setup Guide

## 🎯 **Domain: eprofile.cv**

Perfect choice! The `.cv` domain is ideal for an eProfile platform as it represents "Curriculum Vitae" - perfect branding alignment!

## 🚀 **Production Deployment Setup**

### **Step 1: Update Environment Variables**

Update your production environment variables for the custom domain:

```bash
# NextAuth Configuration
NEXTAUTH_URL="https://eprofile.cv"
NEXTAUTH_SECRET="your-secure-32-character-secret"

# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://neondb_owner:npg_wK25OlaZfPqV@ep-red-tooth-a4prhkus-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"

# Google OAuth (Update redirect URIs)
GOOGLE_CLIENT_ID="your-production-google-client-id"
GOOGLE_CLIENT_SECRET="your-production-google-client-secret"

# Other services...
RESEND_API_KEY="your-production-resend-key"
CLOUDINARY_CLOUD_NAME="your-production-cloud-name"
CLOUDINARY_API_KEY="your-production-api-key"
CLOUDINARY_API_SECRET="your-production-api-secret"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-production-cloud-name"
RAZORPAY_KEY_ID="rzp_live_your-live-key"
RAZORPAY_KEY_SECRET="your-live-secret"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_live_your-live-key"
```

### **Step 2: Vercel Domain Configuration**

1. **Go to Vercel Dashboard** → Your Project → Settings → Domains
2. **Add Custom Domain**: `eprofile.cv`
3. **Add WWW Redirect**: `www.eprofile.cv` → `eprofile.cv`
4. **Configure DNS** (see DNS section below)

### **Step 3: DNS Configuration**

Configure these DNS records with your domain registrar:

```
Type    Name    Value                           TTL
A       @       76.76.19.61                     300
CNAME   www     cname.vercel-dns.com            300
```

_Note: Use the actual IP/CNAME provided by Vercel_

### **Step 4: Google OAuth Setup**

Update your Google OAuth configuration:

**Authorized JavaScript Origins:**

- `https://eprofile.cv`
- `https://www.eprofile.cv`

**Authorized Redirect URIs:**

- `https://eprofile.cv/api/auth/callback/google`
- `https://www.eprofile.cv/api/auth/callback/google`

## 🎨 **Brand Identity Updated**

### **What's Changed:**

- ✅ **Project Name**: `visiting-card` → `eprofile`
- ✅ **App Title**: `ProCard` → `eProfile`
- ✅ **Navbar Branding**: Updated to "eProfile"
- ✅ **Metadata**: Updated titles and descriptions
- ✅ **Web App Manifest**: Updated for PWA support
- ✅ **Favicon**: Already matches the card icon theme

### **Brand Consistency:**

- **Name**: eProfile
- **Domain**: eprofile.cv
- **Tagline**: "Create and share professional eProfiles"
- **Color**: Blue (#2563eb)
- **Icon**: Card/document symbol

## 📱 **User Experience**

With `eprofile.cv`, users will get:

- **Professional URLs**: `eprofile.cv/username`
- **Easy to remember**: Short, brandable domain
- **CV Association**: `.cv` extension reinforces the professional profile concept
- **Global Appeal**: `.cv` is internationally recognized

## 🔧 **SEO Benefits**

The `.cv` domain provides:

- **Keyword Relevance**: CV = Curriculum Vitae
- **Professional Credibility**: Associated with professional profiles
- **Memorable**: Easy to remember and share
- **Brand Alignment**: Perfect for eProfiles

## 📋 **Deployment Checklist**

- [ ] Purchase `eprofile.cv` domain
- [ ] Configure DNS records
- [ ] Add domain to Vercel project
- [ ] Update `NEXTAUTH_URL` environment variable
- [ ] Update Google OAuth redirect URIs
- [ ] Test SSL certificate
- [ ] Verify all redirects work
- [ ] Update any hardcoded URLs in the app
- [ ] Test authentication flow
- [ ] Verify database connections

## 🎉 **Launch Ready**

Your eProfile platform is now ready for launch with:

- ✅ **Professional branding** with eProfile name
- ✅ **Perfect domain** with eprofile.cv
- ✅ **Consistent design** across all touchpoints
- ✅ **Production-ready** database with Neon
- ✅ **Scalable architecture** on Vercel
- ✅ **Professional features** for eProfiles

**eProfile.cv - The professional way to share your eProfile! 🚀**

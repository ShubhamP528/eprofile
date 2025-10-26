# eProfile Deployment Guide

This guide will help you deploy your eProfile application to production.

## 🚀 Pre-Deployment Checklist

### 1. Environment Variables Configuration

Create a production `.env` file with the following changes:

#### Database Configuration

```bash
# Replace SQLite with PostgreSQL for production
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"
```

**Recommended Database Providers:**

- **Vercel Postgres** (if deploying to Vercel)
- **Supabase** (free tier available)
- **PlanetScale** (MySQL alternative)
- **Railway** (PostgreSQL)

#### NextAuth.js Configuration

```bash
# Generate a secure secret (minimum 32 characters)
NEXTAUTH_SECRET="your-super-secure-secret-key-for-production"
# Update to your production domain
NEXTAUTH_URL="https://yourdomain.com"
```

#### Google OAuth Configuration

```bash
# Update with production OAuth credentials
GOOGLE_CLIENT_ID="your-production-google-client-id"
GOOGLE_CLIENT_SECRET="your-production-google-client-secret"
```

**Setup Steps:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your production domain to authorized origins
6. Add `https://yourdomain.com/api/auth/callback/google` to authorized redirect URIs

#### Email Service Configuration

```bash
# Get production API key from Resend
RESEND_API_KEY="your-production-resend-api-key"
```

**Setup Steps:**

1. Sign up at [Resend](https://resend.com/)
2. Verify your domain
3. Generate API key
4. Update email templates if needed

#### File Storage Configuration

```bash
# Production Cloudinary credentials
CLOUDINARY_CLOUD_NAME="your-production-cloud-name"
CLOUDINARY_API_KEY="your-production-api-key"
CLOUDINARY_API_SECRET="your-production-api-secret"
```

**Setup Steps:**

1. Create account at [Cloudinary](https://cloudinary.com/)
2. Get credentials from dashboard
3. Configure upload presets if needed

#### Payment Gateway Configuration

```bash
# Switch to Razorpay LIVE credentials
RAZORPAY_KEY_ID="rzp_live_your-live-key-id"
RAZORPAY_KEY_SECRET="your-live-key-secret"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_live_your-live-key-id"
```

**Setup Steps:**

1. Complete KYC verification on Razorpay
2. Switch to live mode
3. Generate live API keys
4. Test with small amounts first

### 2. Database Migration

#### For PostgreSQL/MySQL:

```bash
# Update prisma schema for production database
# In prisma/schema.prisma, change:
datasource db {
  provider = "postgresql"  # or "mysql"
  url      = env("DATABASE_URL")
}

# Generate and run migrations
npx prisma generate
npx prisma db push
```

### 3. Build Configuration

#### Update next.config.js (if needed):

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "lh3.googleusercontent.com"],
  },
  // Add any production-specific configurations
};

module.exports = nextConfig;
```

## 🌐 Deployment Platforms

### Option 1: Vercel (Recommended)

1. **Connect Repository:**

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel
   ```

2. **Configure Environment Variables:**

   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Add all production environment variables
   - Make sure to set `NEXTAUTH_URL` to your Vercel domain

3. **Database Setup:**
   - Use Vercel Postgres or external provider
   - Run migrations after deployment

### Option 2: Railway

1. **Deploy from GitHub:**

   - Connect your GitHub repository
   - Railway will auto-detect Next.js

2. **Add Environment Variables:**

   - Go to Variables tab in Railway dashboard
   - Add all required environment variables

3. **Database:**
   - Add PostgreSQL plugin in Railway
   - Use the provided DATABASE_URL

### Option 3: DigitalOcean App Platform

1. **Create App:**

   - Connect GitHub repository
   - Select Node.js environment

2. **Configure Build:**
   ```yaml
   # .do/app.yaml
   name: eprofile
   services:
     - name: web
       source_dir: /
       github:
         repo: your-username/eprofile
         branch: main
       run_command: npm start
       build_command: npm run build
       environment_slug: node-js
       instance_count: 1
       instance_size_slug: basic-xxs
   ```

## 🔧 Post-Deployment Steps

### 1. Domain Configuration

- Configure custom domain in your hosting platform
- Update `NEXTAUTH_URL` to match your domain
- Update Google OAuth redirect URIs

### 2. SSL Certificate

- Most platforms provide automatic SSL
- Verify HTTPS is working properly

### 3. Database Seeding (Optional)

```bash
# If you have seed data
npx prisma db seed
```

### 4. Testing

- Test user registration/login
- Test card creation and templates
- Test payment flow with small amounts
- Test email notifications
- Test file uploads

### 5. Monitoring Setup

```bash
# Optional: Add monitoring
SENTRY_DSN="your-sentry-dsn"
GOOGLE_ANALYTICS_ID="your-ga-id"
```

## 🔒 Security Considerations

### 1. Environment Variables

- Never commit `.env` files to version control
- Use platform-specific secret management
- Rotate secrets regularly

### 2. Database Security

- Use connection pooling for production
- Enable SSL for database connections
- Regular backups

### 3. API Security

- Rate limiting (consider adding middleware)
- Input validation (already implemented)
- CORS configuration if needed

## 📊 Performance Optimization

### 1. Next.js Optimizations

```javascript
// next.config.js
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  compress: true,
  poweredByHeader: false,
};
```

### 2. Database Optimization

- Add database indexes for frequently queried fields
- Use connection pooling
- Consider read replicas for high traffic

### 3. CDN Configuration

- Cloudinary automatically provides CDN for images
- Consider adding Vercel Edge Network or CloudFlare

## 🚨 Troubleshooting

### Common Issues:

1. **Database Connection Errors:**

   - Verify DATABASE_URL format
   - Check network connectivity
   - Ensure database exists

2. **OAuth Errors:**

   - Verify redirect URIs match exactly
   - Check domain configuration
   - Ensure NEXTAUTH_URL is correct

3. **Payment Issues:**

   - Verify live API keys
   - Check webhook configurations
   - Test with small amounts first

4. **Build Errors:**
   - Check all environment variables are set
   - Verify dependencies are installed
   - Check for TypeScript errors

### Support Resources:

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Prisma Production Guide](https://www.prisma.io/docs/guides/deployment)
- [NextAuth.js Deployment](https://next-auth.js.org/deployment)

## 📝 Final Checklist

- [ ] All environment variables configured
- [ ] Database migrated and accessible
- [ ] OAuth providers configured with production URLs
- [ ] Payment gateway switched to live mode
- [ ] Domain and SSL configured
- [ ] Email service configured and tested
- [ ] File uploads working
- [ ] All features tested in production
- [ ] Monitoring and analytics setup
- [ ] Backup strategy in place

---

🎉 **Congratulations!** Your eProfile application is now ready for production use.

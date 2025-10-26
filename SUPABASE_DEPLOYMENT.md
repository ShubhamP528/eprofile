# eProfile Deployment Guide with Supabase

## 🗄️ Database Setup (Supabase)

You're already using Supabase PostgreSQL! Here's what you need to do:

### 1. Generate and Push Database Schema

```bash
# Generate Prisma client for PostgreSQL
npx prisma generate

# Push your schema to Supabase
npx prisma db push

# Optional: Seed your database if you have seed data
npx prisma db seed
```

### 2. Verify Database Connection

```bash
# Test the connection
npx prisma studio
```

## 🚀 Deployment Steps

### Step 1: Update Environment Variables for Production

Create these environment variables in your deployment platform:

```bash
# Database (already configured)
DATABASE_URL="postgresql://postgres:Eprofile@2025@db.hfggxqoxcvyrqzjydatl.supabase.co:5432/postgres"

# NextAuth.js (MUST CHANGE FOR PRODUCTION)
NEXTAUTH_SECRET="your-secure-32-character-secret-key"
NEXTAUTH_URL="https://yourdomain.com"

# Google OAuth (update redirect URIs)
GOOGLE_CLIENT_ID="your-production-google-client-id"
GOOGLE_CLIENT_SECRET="your-production-google-client-secret"

# Email Service (get production key)
RESEND_API_KEY="your-production-resend-api-key"

# File Storage (production credentials)
CLOUDINARY_CLOUD_NAME="your-production-cloud-name"
CLOUDINARY_API_KEY="your-production-api-key"
CLOUDINARY_API_SECRET="your-production-api-secret"

# Payment Gateway (SWITCH TO LIVE KEYS)
RAZORPAY_KEY_ID="rzp_live_YOUR_LIVE_KEY"
RAZORPAY_KEY_SECRET="YOUR_LIVE_SECRET"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_live_YOUR_LIVE_KEY"
```

### Step 2: Deploy to Vercel (Recommended)

1. **Install Vercel CLI:**

   ```bash
   npm i -g vercel
   ```

2. **Deploy:**

   ```bash
   vercel
   ```

3. **Configure Environment Variables in Vercel:**

   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all the environment variables listed above
   - Make sure to set them for "Production" environment

4. **Update Google OAuth:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Update authorized redirect URIs to include:
     - `https://your-vercel-domain.vercel.app/api/auth/callback/google`
     - `https://yourdomain.com/api/auth/callback/google` (if using custom domain)

### Step 3: Database Migration on Deployment

Add this to your `package.json` scripts:

```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "postinstall": "prisma generate",
    "db:deploy": "prisma db push"
  }
}
```

### Step 4: Supabase Security Configuration

1. **Row Level Security (Optional but Recommended):**

   ```sql
   -- Enable RLS on sensitive tables
   ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
   ALTER TABLE "Card" ENABLE ROW LEVEL SECURITY;
   ALTER TABLE "PaymentHistory" ENABLE ROW LEVEL SECURITY;

   -- Create policies (example for Card table)
   CREATE POLICY "Users can view own cards" ON "Card"
     FOR SELECT USING (auth.uid()::text = "userId");

   CREATE POLICY "Users can insert own cards" ON "Card"
     FOR INSERT WITH CHECK (auth.uid()::text = "userId");
   ```

2. **Database Backup:**
   - Supabase automatically backs up your database
   - You can also set up additional backups via Supabase dashboard

## 🔧 Production Optimizations

### 1. Connection Pooling

Update your DATABASE_URL to use connection pooling:

```bash
# Add connection pooling parameters
DATABASE_URL="postgresql://postgres:Eprofile@2025@db.hfggxqoxcvyrqzjydatl.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
```

### 2. Prisma Configuration

Create `prisma/schema.prisma` optimizations:

```prisma
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["jsonProtocol"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL") // Optional: for migrations
}
```

### 3. Environment-Specific Configuration

Create `lib/prisma.ts` for production optimization:

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

## 🔒 Security Checklist

- [ ] Changed NEXTAUTH_SECRET to a secure 32+ character string
- [ ] Updated NEXTAUTH_URL to production domain
- [ ] Switched Razorpay to live keys (after KYC completion)
- [ ] Updated Google OAuth redirect URIs
- [ ] Configured production Cloudinary account
- [ ] Set up production Resend account
- [ ] Enabled Supabase database backups
- [ ] Configured proper CORS settings
- [ ] Set up monitoring and error tracking

## 🚨 Important Notes

1. **Razorpay Live Mode:**

   - Complete KYC verification first
   - Test with small amounts
   - Ensure webhook URLs are updated

2. **Database Security:**

   - Your Supabase database is already secured
   - Consider enabling Row Level Security for additional protection
   - Monitor database usage in Supabase dashboard

3. **Performance:**
   - Supabase provides connection pooling
   - Monitor query performance in Supabase dashboard
   - Consider adding database indexes for frequently queried fields

## 📊 Monitoring

1. **Supabase Dashboard:**

   - Monitor database performance
   - Check connection usage
   - View query logs

2. **Application Monitoring:**
   ```bash
   # Add to environment variables
   SENTRY_DSN="your-sentry-dsn"
   ```

## 🎉 You're Ready!

Your eProfile application is configured to work with Supabase PostgreSQL. The main things you need to update for production are:

1. ✅ Database: Already configured with Supabase
2. 🔄 NextAuth Secret: Generate new secure secret
3. 🔄 Domain URLs: Update to production domain
4. 🔄 Payment Keys: Switch to Razorpay live keys
5. 🔄 OAuth: Update redirect URIs

Run `npx prisma db push` to sync your schema with Supabase, then deploy!

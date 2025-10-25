# 🚀 Vercel Production Environment Setup

## ✅ **EXACT ENVIRONMENT VARIABLES FOR VERCEL**

Copy these exact values to your Vercel environment variables:

### **Database Configuration**

```
DATABASE_URL=postgresql://postgres:Eprofile%402025@db.hfggxqoxcvyrqzjydatl.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1&pool_timeout=10
```

### **NextAuth Configuration**

```
NEXTAUTH_SECRET=your-secure-32-character-secret-here-change-this
NEXTAUTH_URL=https://your-vercel-domain.vercel.app
```

### **Google OAuth (Update with your production values)**

```
GOOGLE_CLIENT_ID=your-production-google-client-id
GOOGLE_CLIENT_SECRET=your-production-google-client-secret
```

### **Other Services**

```
RESEND_API_KEY=your-production-resend-key
CLOUDINARY_CLOUD_NAME=your-production-cloud-name
CLOUDINARY_API_KEY=your-production-api-key
CLOUDINARY_API_SECRET=your-production-api-secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-production-cloud-name
RAZORPAY_KEY_ID=rzp_live_your-live-key-id
RAZORPAY_KEY_SECRET=your-live-key-secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_your-live-key-id
```

## 🔧 **STEP-BY-STEP VERCEL SETUP**

### **1. Access Vercel Dashboard**

- Go to [vercel.com](https://vercel.com)
- Navigate to your project
- Click **Settings** → **Environment Variables**

### **2. Update DATABASE_URL**

- Find existing `DATABASE_URL` or create new one
- Set value to: `postgresql://postgres:Eprofile%402025@db.hfggxqoxcvyrqzjydatl.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1&pool_timeout=10`
- Set environment to: **Production**

### **3. Update NEXTAUTH_SECRET**

- Generate a secure secret: `openssl rand -base64 32`
- Or use: `your-secure-32-character-secret-here-change-this`
- Set environment to: **Production**

### **4. Update NEXTAUTH_URL**

- Set to your actual Vercel domain: `https://your-app-name.vercel.app`
- Set environment to: **Production**

### **5. Redeploy**

- Go to **Deployments** tab
- Click **Redeploy** on the latest deployment
- Or push a new commit to trigger deployment

## 🧪 **VERIFY THE FIX**

After updating environment variables and redeploying:

1. **Check deployment logs** for database connection errors
2. **Test Google OAuth login** on your production site
3. **Try creating a card** to test database operations
4. **Check Vercel function logs** for any remaining errors

## 🔍 **TROUBLESHOOTING**

### **If you still get connection errors:**

1. **Check Supabase Status**

   - Go to your Supabase dashboard
   - Verify the project is not paused
   - Check connection limits

2. **Verify Environment Variables**

   - Ensure no extra spaces in values
   - Verify the URL is exactly as provided above
   - Check that variables are set for "Production" environment

3. **Check Vercel Logs**
   - Go to Vercel dashboard → Functions → View logs
   - Look for specific error messages

### **Common Issues:**

- **"Can't reach database server"** → Environment variables not updated
- **"Authentication failed"** → Password encoding issue (use %40 for @)
- **"Connection timeout"** → Add connection pooling parameters
- **"SSL certificate"** → Remove sslmode=require from URL

## 📋 **DEPLOYMENT CHECKLIST**

- [ ] Updated DATABASE_URL with URL-encoded password
- [ ] Added connection pooling parameters
- [ ] Updated NEXTAUTH_SECRET with secure value
- [ ] Updated NEXTAUTH_URL with production domain
- [ ] Set all environment variables to "Production"
- [ ] Redeployed the application
- [ ] Tested Google OAuth login
- [ ] Verified database operations work

---

**🎉 Your production deployment should now work perfectly!**

The key fix was URL-encoding the `@` symbol in your password (`@` → `%40`) and adding proper connection pooling for Vercel's serverless environment.

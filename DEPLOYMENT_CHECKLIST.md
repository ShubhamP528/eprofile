# 🚀 ProCard Deployment Checklist

## ✅ **Pre-Deployment Fixes Applied:**

### **1. Dependency Compatibility**

- ✅ Downgraded Next.js from 16.0.0 → 15.1.0
- ✅ Downgraded React from 19.2.0 → 18.3.1
- ✅ Downgraded Zod from 4.1.12 → 3.23.8
- ✅ Updated TypeScript types to match

### **2. Build Configuration**

- ✅ Added Prisma generation to build script
- ✅ Added postinstall script for Prisma
- ✅ Created .nvmrc for Node.js version
- ✅ Added vercel.json configuration

### **3. Database & Features**

- ✅ PostgreSQL schema migrated to Supabase
- ✅ Analytics API fixed for PostgreSQL
- ✅ Profile image upload working (base64)
- ✅ All 5 templates support profile images
- ✅ Feature restrictions implemented
- ✅ Payment integration ready

## 🔧 **Environment Variables Needed:**

### **Required for Production:**

```bash
# Database
DATABASE_URL="postgresql://postgres:Eprofile@2025@db.hfggxqoxcvyrqzjydatl.supabase.co:5432/postgres"

# NextAuth (CRITICAL - MUST CHANGE)
NEXTAUTH_SECRET="pkUUWLpb5ZqeuJ6Ce9Mta6NGzJ3VVn9y2BRvNvV8AL0="
NEXTAUTH_URL="https://yourdomain.vercel.app"

# Google OAuth (Update redirect URIs)
GOOGLE_CLIENT_ID="your-production-client-id"
GOOGLE_CLIENT_SECRET="your-production-client-secret"

# Email Service
RESEND_API_KEY="your-production-resend-key"

# File Storage
CLOUDINARY_CLOUD_NAME="dgsjppp4a"
CLOUDINARY_API_KEY="655944819687743"
CLOUDINARY_API_SECRET="I-lIFUXiMUJW-Rc7rN7C4H3gbGA"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dgsjppp4a"

# Payment Gateway (SWITCH TO LIVE)
RAZORPAY_KEY_ID="rzp_live_YOUR_LIVE_KEY"
RAZORPAY_KEY_SECRET="YOUR_LIVE_SECRET"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_live_YOUR_LIVE_KEY"
```

## 🚀 **Deployment Steps:**

### **1. Local Testing:**

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Test build
npm run build

# Test locally
npm run dev
```

### **2. Deploy to Vercel:**

```bash
# Method 1: Git Push (Recommended)
git add .
git commit -m "fix: resolve dependency conflicts for deployment"
git push

# Method 2: Vercel CLI
npm i -g vercel
vercel --prod
```

### **3. Configure Environment Variables:**

In Vercel Dashboard → Project → Settings → Environment Variables:

- Add all production environment variables
- Set for "Production" environment
- Redeploy after adding variables

### **4. Update OAuth Settings:**

- Go to Google Cloud Console
- Update authorized redirect URIs:
  - `https://your-domain.vercel.app/api/auth/callback/google`
- Update authorized origins:
  - `https://your-domain.vercel.app`

## ✅ **Post-Deployment Verification:**

### **1. Basic Functionality:**

- [ ] Homepage loads correctly
- [ ] User registration/login works
- [ ] Dashboard accessible

### **2. Card Features:**

- [ ] Card creation works
- [ ] Profile image upload works
- [ ] All 5 templates display correctly
- [ ] Card editing works
- [ ] Public card pages work

### **3. Advanced Features:**

- [ ] Services management (Pro feature)
- [ ] Gallery management (Pro feature)
- [ ] Testimonials management (Pro feature)
- [ ] Payment integration (Pro feature)
- [ ] Analytics tracking works

### **4. Subscription System:**

- [ ] Free plan limitations work
- [ ] Pro upgrade flow works
- [ ] Feature gates work correctly
- [ ] Razorpay integration works

## 🚨 **Common Issues & Solutions:**

### **Build Fails:**

- Check all environment variables are set
- Verify database connection string
- Check for TypeScript errors

### **Authentication Issues:**

- Verify NEXTAUTH_URL matches domain
- Check Google OAuth redirect URIs
- Ensure NEXTAUTH_SECRET is set

### **Database Issues:**

- Verify Supabase connection
- Check if tables exist
- Run `npx prisma db push` if needed

### **Payment Issues:**

- Switch to Razorpay live keys
- Test with small amounts first
- Verify webhook URLs

## 🎉 **Success Criteria:**

Your deployment is successful when:

- ✅ Build completes without errors
- ✅ All pages load correctly
- ✅ Authentication works
- ✅ Card creation/editing works
- ✅ Profile images display
- ✅ Payment flow works (if using live keys)
- ✅ All templates render properly

## 📞 **Support:**

If you encounter issues:

1. Check Vercel deployment logs
2. Verify all environment variables
3. Test database connection
4. Check browser console for errors

---

🚀 **Your ProCard application is ready for production!**

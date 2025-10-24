#!/usr/bin/env node

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

console.log("🚀 ProCard Production Setup\n");

// Generate secure NextAuth secret
const nextAuthSecret = crypto.randomBytes(32).toString("base64");

console.log("✅ Generated secure NEXTAUTH_SECRET:");
console.log(`NEXTAUTH_SECRET="${nextAuthSecret}"\n`);

// Check current environment
const envPath = path.join(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");

  console.log("📋 Current Configuration Status:");
  console.log("================================");

  // Check database
  if (envContent.includes("postgresql://")) {
    console.log("✅ Database: Supabase PostgreSQL configured");
  } else {
    console.log("❌ Database: Still using SQLite (update needed)");
  }

  // Check NextAuth secret
  if (envContent.includes("development-only")) {
    console.log("⚠️  NextAuth Secret: Using development secret (MUST CHANGE)");
  } else {
    console.log("✅ NextAuth Secret: Custom secret configured");
  }

  // Check NextAuth URL
  if (envContent.includes("localhost:3000")) {
    console.log("⚠️  NextAuth URL: Using localhost (update for production)");
  } else {
    console.log("✅ NextAuth URL: Production URL configured");
  }

  // Check Razorpay
  if (envContent.includes("rzp_test_")) {
    console.log(
      "⚠️  Razorpay: Using test keys (switch to live for production)"
    );
  } else if (envContent.includes("rzp_live_")) {
    console.log("✅ Razorpay: Live keys configured");
  } else {
    console.log("❌ Razorpay: Keys not found");
  }

  console.log("\n📝 Next Steps for Production:");
  console.log("=============================");
  console.log("1. Update NEXTAUTH_SECRET with the generated value above");
  console.log("2. Update NEXTAUTH_URL to your production domain");
  console.log("3. Switch Razorpay to live keys (after KYC)");
  console.log("4. Update Google OAuth redirect URIs");
  console.log("5. Configure production Cloudinary and Resend accounts");
  console.log("6. Run: npx prisma db push");
  console.log("7. Deploy to your chosen platform");

  console.log("\n🔗 Helpful Commands:");
  console.log("====================");
  console.log("Generate Prisma client: npx prisma generate");
  console.log("Push schema to database: npx prisma db push");
  console.log("View database: npx prisma studio");
  console.log("Deploy to Vercel: vercel");
} else {
  console.log("❌ .env file not found. Please create one first.");
}

console.log("\n📚 For detailed instructions, see:");
console.log("- SUPABASE_DEPLOYMENT.md (for your Supabase setup)");
console.log("- DEPLOYMENT.md (general deployment guide)");

#!/usr/bin/env node

/**
 * Quick fix for production database URL encoding issue
 * This script will help you create the correct DATABASE_URL for production
 */

const originalUrl =
  "postgresql://postgres:Eprofile@2025@db.hfggxqoxcvyrqzjydatl.supabase.co:5432/postgres";

console.log("🔧 Production Database URL Fix\n");

console.log("Original URL:", originalUrl);

// The issue is that the password contains @ symbol which breaks URL parsing
// We need to URL encode the password part
function fixDatabaseURL(url) {
  // Parse the URL manually
  const urlPart = url.substring("postgresql://".length);
  const lastAtIndex = urlPart.lastIndexOf("@");

  const credentials = urlPart.substring(0, lastAtIndex);
  const hostPart = urlPart.substring(lastAtIndex + 1);

  const colonIndex = credentials.indexOf(":");
  const username = credentials.substring(0, colonIndex);
  const password = credentials.substring(colonIndex + 1);

  // URL encode the password
  const encodedPassword = encodeURIComponent(password);

  // Rebuild the URL
  const fixedUrl = `postgresql://${username}:${encodedPassword}@${hostPart}`;

  return fixedUrl;
}

const fixedUrl = fixDatabaseURL(originalUrl);

console.log("\n✅ Fixed URL:", fixedUrl);

console.log("\n📋 For your production deployment, use this DATABASE_URL:");
console.log('DATABASE_URL="' + fixedUrl + '"');

console.log("\n🚀 Steps to fix your production deployment:");
console.log(
  "1. Update your Vercel environment variables with the fixed URL above"
);
console.log("2. Redeploy your application");
console.log("3. Test the authentication and database operations");

console.log(
  '\n💡 The issue was that the password "Eprofile@2025" contains an @ symbol'
);
console.log("   which was breaking the URL parsing. URL encoding fixes this.");

// Test the fix
console.log("\n🧪 Testing the fixed URL parsing:");
try {
  const testUrl = fixedUrl;
  const urlPart = testUrl.substring("postgresql://".length);
  const lastAtIndex = urlPart.lastIndexOf("@");

  const credentials = urlPart.substring(0, lastAtIndex);
  const hostPart = urlPart.substring(lastAtIndex + 1);

  const colonIndex = credentials.indexOf(":");
  const username = credentials.substring(0, colonIndex);
  const encodedPassword = credentials.substring(colonIndex + 1);
  const password = decodeURIComponent(encodedPassword);

  const [hostAndPort, ...pathParts] = hostPart.split("/");
  const [host, port] = hostAndPort.split(":");
  const database = pathParts.join("/");

  console.log("✅ Parsed successfully:");
  console.log("  Username:", username);
  console.log("  Password:", password);
  console.log("  Host:", host);
  console.log("  Port:", port);
  console.log("  Database:", database);
} catch (error) {
  console.error("❌ Test failed:", error.message);
}

#!/usr/bin/env node

/**
 * Test script to verify database connection fixes
 */

const { DatabaseURLValidator } = require("../lib/database-url-validator");

console.log("🧪 Testing Database URL Validator...\n");

// Test the current DATABASE_URL from environment
const testUrl = process.env.DATABASE_URL;

if (!testUrl) {
  console.error("❌ DATABASE_URL not found in environment");
  process.exit(1);
}

console.log("📋 Testing URL validation...");
const validation = DatabaseURLValidator.validate(testUrl);

if (validation.isValid) {
  console.log("✅ URL validation passed");
} else {
  console.log("❌ URL validation failed:");
  validation.errors.forEach((error) => console.log(`   - ${error}`));
}

if (validation.warnings.length > 0) {
  console.log("⚠️  Warnings:");
  validation.warnings.forEach((warning) => console.log(`   - ${warning}`));
}

console.log("\n📋 Testing URL sanitization...");
const sanitizedUrl = DatabaseURLValidator.sanitize(testUrl);
console.log("✅ URL sanitized successfully");

console.log("\n📋 Testing production parameters...");
const productionUrl = DatabaseURLValidator.addProductionParams(
  sanitizedUrl,
  true
);
console.log("✅ Production parameters added");

console.log("\n📋 Testing environment validation...");
const envValidation = DatabaseURLValidator.validateEnvironment(
  productionUrl,
  "production"
);
if (envValidation.warnings.length > 0) {
  console.log("⚠️  Environment warnings:");
  envValidation.warnings.forEach((warning) => console.log(`   - ${warning}`));
} else {
  console.log("✅ Environment validation passed");
}

console.log("\n🎉 Database URL validator tests completed!");

// Test environment validator
console.log("\n🧪 Testing Environment Validator...");

try {
  const { EnvironmentValidator } = require("../lib/env-validator");

  const envValidationResult = EnvironmentValidator.validate();

  if (envValidationResult.isValid) {
    console.log("✅ Environment validation passed");
  } else {
    console.log("❌ Environment validation failed:");
    envValidationResult.errors.forEach((error) => console.log(`   - ${error}`));
  }

  if (envValidationResult.warnings.length > 0) {
    console.log("⚠️  Environment warnings:");
    envValidationResult.warnings.forEach((warning) =>
      console.log(`   - ${warning}`)
    );
  }

  console.log("\n📊 Environment Summary:");
  const summary = EnvironmentValidator.getEnvironmentSummary();
  Object.entries(summary).forEach(([key, value]) => {
    console.log(`   ${key}: ${value}`);
  });
} catch (error) {
  console.error("❌ Environment validator test failed:", error.message);
}

console.log("\n🎉 All tests completed!");

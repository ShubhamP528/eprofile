#!/usr/bin/env node

/**
 * Business Information Update Script
 *
 * This script helps you update all placeholder business information
 * across your eProfile website for Razorpay live activation.
 *
 * Usage: node scripts/update-business-info.js
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Files that contain placeholder information
const FILES_TO_UPDATE = [
  "app/privacy/page.tsx",
  "app/terms/page.tsx",
  "app/refund/page.tsx",
  "app/business-info/page.tsx",
  "app/contact/page.tsx",
];

// Placeholder mappings
const PLACEHOLDERS = {
  "[Your Business Address]": "BUSINESS_ADDRESS",
  "[Complete Business Address with PIN Code]": "BUSINESS_ADDRESS_FULL",
  "[Your 10-digit Phone Number]": "PHONE_NUMBER",
  "[Your Contact Number]": "CONTACT_NUMBER",
  "[Your Support Number]": "SUPPORT_NUMBER",
  "[Your GST Number if applicable]": "GST_NUMBER",
  "[Your PAN Number]": "PAN_NUMBER",
  "[Your business registration details]": "REGISTRATION_DETAILS",
  "[Your Business Registration Number]": "REGISTRATION_NUMBER",
  "[Corporate Identification Number if applicable]": "CIN_NUMBER",
  "[Your City]": "CITY",
};

async function promptUser(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function collectBusinessInfo() {
  console.log("\n🏢 eProfile Business Information Update");
  console.log("=====================================\n");
  console.log("This script will help you update all placeholder information");
  console.log("in your legal pages for Razorpay live activation.\n");

  const businessInfo = {};

  // Collect business information
  businessInfo.BUSINESS_ADDRESS = await promptUser(
    "📍 Enter your complete business address (without PIN): "
  );
  businessInfo.BUSINESS_ADDRESS_FULL = await promptUser(
    "📍 Enter your complete business address with PIN code: "
  );
  businessInfo.PHONE_NUMBER = await promptUser(
    "📞 Enter your 10-digit phone number (without +91): "
  );
  businessInfo.CONTACT_NUMBER = businessInfo.PHONE_NUMBER; // Same as phone number
  businessInfo.SUPPORT_NUMBER = businessInfo.PHONE_NUMBER; // Same as phone number

  const hasGST = await promptUser("💼 Are you GST registered? (y/n): ");
  if (hasGST.toLowerCase() === "y" || hasGST.toLowerCase() === "yes") {
    businessInfo.GST_NUMBER = await promptUser("💼 Enter your GST number: ");
  } else {
    businessInfo.GST_NUMBER = "Not applicable (Not GST registered)";
  }

  businessInfo.PAN_NUMBER = await promptUser("🆔 Enter your PAN number: ");

  const businessType = await promptUser(
    "🏢 Business type (Individual/Partnership/Private Limited/LLP): "
  );
  if (
    businessType.toLowerCase().includes("private") ||
    businessType.toLowerCase().includes("company")
  ) {
    businessInfo.REGISTRATION_NUMBER = await promptUser(
      "📋 Enter your Company Registration Number: "
    );
    businessInfo.CIN_NUMBER = await promptUser(
      "🏛️ Enter your CIN (Corporate Identification Number): "
    );
    businessInfo.REGISTRATION_DETAILS = `Private Limited Company - CIN: ${businessInfo.CIN_NUMBER}`;
  } else if (businessType.toLowerCase().includes("llp")) {
    businessInfo.REGISTRATION_NUMBER = await promptUser(
      "📋 Enter your LLP Registration Number: "
    );
    businessInfo.CIN_NUMBER = "Not applicable (LLP)";
    businessInfo.REGISTRATION_DETAILS = `Limited Liability Partnership - Registration: ${businessInfo.REGISTRATION_NUMBER}`;
  } else {
    businessInfo.REGISTRATION_NUMBER = "Individual/Proprietorship";
    businessInfo.CIN_NUMBER = "Not applicable (Individual/Proprietorship)";
    businessInfo.REGISTRATION_DETAILS = "Individual/Proprietorship Business";
  }

  businessInfo.CITY = await promptUser(
    "🏙️ Enter your city for legal jurisdiction: "
  );

  return businessInfo;
}

function updateFile(filePath, businessInfo) {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    let updated = false;

    // Replace placeholders
    for (const [placeholder, key] of Object.entries(PLACEHOLDERS)) {
      if (content.includes(placeholder)) {
        content = content.replace(
          new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
          businessInfo[key]
        );
        updated = true;
      }
    }

    // Update phone number format
    content = content.replace(
      /\+91-\[Your 10-digit Phone Number\]/g,
      `+91-${businessInfo.PHONE_NUMBER}`
    );
    content = content.replace(
      /\+91-\[Your Contact Number\]/g,
      `+91-${businessInfo.CONTACT_NUMBER}`
    );
    content = content.replace(
      /\+91-\[Your Phone Number\]/g,
      `+91-${businessInfo.PHONE_NUMBER}`
    );

    if (updated) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`✅ Updated: ${filePath}`);
    } else {
      console.log(`ℹ️  No placeholders found in: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

function generateSummary(businessInfo) {
  console.log("\n📋 Business Information Summary");
  console.log("===============================\n");

  console.log(`🏢 Business Address: ${businessInfo.BUSINESS_ADDRESS_FULL}`);
  console.log(`📞 Phone Number: +91-${businessInfo.PHONE_NUMBER}`);
  console.log(`💼 GST Number: ${businessInfo.GST_NUMBER}`);
  console.log(`🆔 PAN Number: ${businessInfo.PAN_NUMBER}`);
  console.log(`📋 Registration: ${businessInfo.REGISTRATION_DETAILS}`);
  console.log(`🏙️ Legal Jurisdiction: ${businessInfo.CITY}`);

  console.log("\n✅ All placeholder information has been updated!");
  console.log("\n📝 Next Steps:");
  console.log("1. Review all updated legal pages");
  console.log("2. Prepare your business documents");
  console.log("3. Submit Razorpay live activation request");
  console.log("4. Update environment variables after approval");

  console.log("\n📚 Reference Documents:");
  console.log(
    "- RAZORPAY_LIVE_REQUIREMENTS.md - Complete requirements checklist"
  );
  console.log("- RAZORPAY_LIVE_ACTIVATION_CHECKLIST.md - Current status");
}

async function main() {
  try {
    // Collect business information
    const businessInfo = await collectBusinessInfo();

    console.log("\n🔄 Updating files...\n");

    // Update all files
    FILES_TO_UPDATE.forEach((file) => {
      const filePath = path.join(process.cwd(), file);
      if (fs.existsSync(filePath)) {
        updateFile(filePath, businessInfo);
      } else {
        console.log(`⚠️  File not found: ${file}`);
      }
    });

    // Generate summary
    generateSummary(businessInfo);
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    rl.close();
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { updateFile, PLACEHOLDERS };

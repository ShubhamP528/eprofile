#!/usr/bin/env node

/**
 * 1-Month Retention Email Marketing Campaign Script
 * 
 * Segments users who registered between 25 and 35 days ago:
 * - Segment A: No cards created yet. Encourages card creation and shows use cases.
 * - Segment B: Created card but on FREE tier. Up-sells to premium and highlights use cases.
 * 
 * Usage:
 *   Dry Run (view matches without sending):
 *     node scripts/send-monthly-campaign.js --dry-run
 * 
 *   Test Email (send sample of each email to a test address):
 *     node scripts/send-monthly-campaign.js --test-email=user@example.com
 * 
 *   Live Campaign Run (send emails to all target users in db):
 *     node scripts/send-monthly-campaign.js --force
 */

const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

// Configuration
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || "eProfile <onboarding@resend.dev>";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://www.eprofile.cv";

// Promo code details to display in the Segment B email
const PROMO_CODE = "EPROFILE20";
const PROMO_DISCOUNT = "20%";

// Use cases HTML snippet (to be injected in both emails)
const getUseCasesHtml = () => `
  <div style="margin-top: 35px; border-top: 1px solid #e5e7eb; padding-top: 30px;">
    <h3 style="font-size: 18px; font-weight: 700; color: #111827; margin-top: 0; margin-bottom: 20px; text-align: center;">💡 How to use your eProfile for Maximum Impact</h3>
    
    <table cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td width="50%" valign="top" style="padding-right: 10px; padding-bottom: 20px;">
          <div style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 8px; padding: 16px; min-height: 120px;">
            <div style="font-size: 20px; margin-bottom: 8px;">📧</div>
            <strong style="color: #0f172a; font-size: 14px; display: block; margin-bottom: 4px;">Email Signature</strong>
            <span style="font-size: 13px; color: #475569; line-height: 1.4;">Add your profile link at the bottom of your emails (e.g. <i>"Connect with me: eprofile.cv/username"</i>).</span>
          </div>
        </td>
        <td width="50%" valign="top" style="padding-left: 10px; padding-bottom: 20px;">
          <div style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 8px; padding: 16px; min-height: 120px;">
            <div style="font-size: 20px; margin-bottom: 8px;">🔗</div>
            <strong style="color: #0f172a; font-size: 14px; display: block; margin-bottom: 4px;">Social Bio Link</strong>
            <span style="font-size: 13px; color: #475569; line-height: 1.4;">Place it in your Instagram, LinkedIn, TikTok, and WhatsApp Business bios to group all your links.</span>
          </div>
        </td>
      </tr>
      <tr>
        <td width="50%" valign="top" style="padding-right: 10px;">
          <div style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 8px; padding: 16px; min-height: 120px;">
            <div style="font-size: 20px; margin-bottom: 8px;">💳</div>
            <strong style="color: #0f172a; font-size: 14px; display: block; margin-bottom: 4px;">NFC Tap Cards</strong>
            <span style="font-size: 13px; color: #475569; line-height: 1.4;">Program your URL into an NFC card or key fob to instantly share your contact details with a single tap.</span>
          </div>
        </td>
        <td width="50%" valign="top" style="padding-left: 10px;">
          <div style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 8px; padding: 16px; min-height: 120px;">
            <div style="font-size: 20px; margin-bottom: 8px;">🖼️</div>
            <strong style="color: #0f172a; font-size: 14px; display: block; margin-bottom: 4px;">Printed Media QR Codes</strong>
            <span style="font-size: 13px; color: #475569; line-height: 1.4;">Download your profile QR code and print it on brochures, physical flyers, posters, or packaging.</span>
          </div>
        </td>
      </tr>
    </table>
  </div>
`;

// Email template for Segment A (No card created)
const renderSegmentA = (name) => {
  const dashboardUrl = `${APP_URL}/dashboard`;
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Finish your eProfile</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f9fafb;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          }
          .header {
            background: linear-gradient(135deg, #2563eb, #4f46e5);
            padding: 40px 20px;
            text-align: center;
            color: #ffffff;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 800;
            letter-spacing: -0.025em;
          }
          .content {
            padding: 40px 30px;
            color: #374151;
            line-height: 1.6;
          }
          .content h2 {
            font-size: 20px;
            font-weight: 700;
            margin-top: 0;
            color: #111827;
          }
          .content p {
            margin-bottom: 24px;
            font-size: 16px;
          }
          .button-wrapper {
            text-align: center;
            margin: 35px 0;
          }
          .btn {
            background-color: #2563eb;
            color: #ffffff !important;
            padding: 14px 28px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            display: inline-block;
            transition: background-color 0.2s;
          }
          .features-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
          }
          .feature-item {
            margin-bottom: 12px;
            font-size: 15px;
          }
          .feature-item:last-child {
            margin-bottom: 0;
          }
          .icon {
            margin-right: 8px;
          }
          .footer {
            background-color: #f9fafb;
            padding: 20px 30px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            font-size: 13px;
            color: #9ca3af;
          }
          .footer a {
            color: #2563eb;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>eProfile</h1>
          </div>
          <div class="content">
            <h2>Hi ${name || "there"}, don't leave your network behind! 🚀</h2>
            <p>It's been a month since you signed up for eProfile. You're just one step away from building a high-impact digital presence that replaces paper business cards.</p>
            
            <p>Creating your profile takes less than 5 minutes:</p>
            <div class="features-box">
              <div class="feature-item"><span class="icon">✨</span> Choose from multiple modern templates</div>
              <div class="feature-item"><span class="icon">📞</span> Share all your contact links and social media accounts</div>
              <div class="feature-item"><span class="icon">💼</span> Display your services, portfolios, and client reviews</div>
              <div class="feature-item"><span class="icon">📲</span> Instantly share via a personalized URL or QR code</div>
            </div>

            <div class="button-wrapper">
              <a href="${dashboardUrl}" target="_blank" class="btn">Create Your Digital Card</a>
            </div>

            ${getUseCasesHtml()}
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} eProfile. All rights reserved.</p>
            <p>Need support? Contact us at <a href="mailto:support@eprofile.cv">support@eprofile.cv</a></p>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Email template for Segment B (Has card, on Free tier)
const renderSegmentB = (name, username) => {
  const dashboardUrl = `${APP_URL}/dashboard`;
  const cardUrl = username ? `${APP_URL}/${username}` : null;
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Upgrade your eProfile</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f9fafb;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          }
          .header {
            background: linear-gradient(135deg, #2563eb, #4f46e5);
            padding: 40px 20px;
            text-align: center;
            color: #ffffff;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 800;
            letter-spacing: -0.025em;
          }
          .content {
            padding: 40px 30px;
            color: #374151;
            line-height: 1.6;
          }
          .content h2 {
            font-size: 20px;
            font-weight: 700;
            margin-top: 0;
            color: #111827;
          }
          .content p {
            margin-bottom: 24px;
            font-size: 16px;
          }
          .coupon-box {
            background: linear-gradient(to right, #eff6ff, #f5f3ff);
            border: 2px dashed #3b82f6;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin-bottom: 30px;
          }
          .coupon-title {
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #1e3a8a;
            font-weight: 700;
            margin-bottom: 6px;
          }
          .coupon-code {
            font-family: monospace;
            font-size: 24px;
            color: #2563eb;
            font-weight: 800;
            margin: 10px 0;
          }
          .coupon-desc {
            font-size: 13px;
            color: #4f46e5;
          }
          .button-wrapper {
            text-align: center;
            margin: 35px 0;
          }
          .btn {
            background-color: #2563eb;
            color: #ffffff !important;
            padding: 14px 28px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            display: inline-block;
            transition: background-color 0.2s;
          }
          .features-grid {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
          }
          .feature-item {
            margin-bottom: 12px;
            font-size: 15px;
          }
          .feature-item:last-child {
            margin-bottom: 0;
          }
          .icon {
            margin-right: 8px;
          }
          .footer {
            background-color: #f9fafb;
            padding: 20px 30px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            font-size: 13px;
            color: #9ca3af;
          }
          .footer a {
            color: #2563eb;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>eProfile</h1>
          </div>
          <div class="content">
            <h2>Take your networking to the next level, ${name || "there"}! 💎</h2>
            <p>Congratulations on setting up your eProfile digital business card${cardUrl ? ` (at <a href="${cardUrl}">${username}</a>)` : ""}. It looks great, but did you know you can unlock a lot more with Premium?</p>
            
            <div class="coupon-box">
              <div class="coupon-title">Special Upgrade Offer</div>
              <div class="coupon-code">${PROMO_CODE}</div>
              <div class="coupon-desc">Get <strong>${PROMO_DISCOUNT} OFF</strong> any standard or pro plan today!</div>
            </div>

            <p>Upgrade to unlock advanced features for business and conversions:</p>
            <div class="features-grid">
              <div class="feature-item"><span class="icon">🏷️</span> <strong>Custom Domain:</strong> Link your card to your own domain (e.g. <i>yourname.com</i>).</div>
              <div class="feature-item"><span class="icon">💳</span> <strong>UPI & Custom Payments:</strong> Collect payments directly from your profile.</div>
              <div class="feature-item"><span class="icon">📊</span> <strong>Detailed Analytics:</strong> Track unique visitor views and click analytics.</div>
              <div class="feature-item"><span class="icon">📁</span> <strong>Service portfolios & Review sections:</strong> Display galleries, prices, and customer feedback.</div>
            </div>

            <div class="button-wrapper">
              <a href="${dashboardUrl}" target="_blank" class="btn">Upgrade to Premium</a>
            </div>

            ${getUseCasesHtml()}
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} eProfile. All rights reserved.</p>
            <p>Need support? Contact us at <a href="mailto:support@eprofile.cv">support@eprofile.cv</a></p>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Send email helper via Resend API
async function sendMail(to, subject, html) {
  if (!RESEND_API_KEY) {
    console.warn("⚠️ RESEND_API_KEY is not set. Skipping send to " + to);
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: [to],
        subject: subject,
        html: html,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      console.log(`✅ Email sent successfully to ${to} (Message ID: ${data.id})`);
      return true;
    } else {
      console.error(`❌ Resend API error sending to ${to}:`, data);
      return false;
    }
  } catch (error) {
    console.error(`❌ Exception sending to ${to}:`, error.message);
    return false;
  }
}

// Main function
async function runCampaign() {
  const prisma = new PrismaClient();

  try {
    const args = process.argv.slice(2);
    const dryRun = args.includes("--dry-run");
    const force = args.includes("--force");
    const testEmailArg = args.find(arg => arg.startsWith("--test-email="));
    const testEmailAddress = testEmailArg ? testEmailArg.split("=")[1] : null;

    if (!dryRun && !force && !testEmailAddress) {
      console.log("❌ Error: You must specify a mode to run this script.");
      console.log("\nUsage instructions:");
      console.log("  --dry-run                    : Run query and segment users without sending emails.");
      console.log("  --test-email=your@email.com   : Send one test email of each segment to the specified address.");
      console.log("  --force                      : Execute campaign and send emails to matching database users.");
      process.exit(1);
    }

    if (testEmailAddress) {
      console.log(`🧪 Running in test mode. Sending test emails to: ${testEmailAddress}`);
      
      const subjectA = "Finish your eProfile! 🚀 Create your digital visiting card";
      const htmlA = renderSegmentA("Test User A");
      
      const subjectB = "Unlock the power of your eProfile! 💎 Get 20% off Premium";
      const htmlB = renderSegmentB("Test User B", "testusername");

      console.log("Sending Segment A test...");
      await sendMail(testEmailAddress, subjectA, htmlA);

      console.log("Sending Segment B test...");
      await sendMail(testEmailAddress, subjectB, htmlB);
      
      console.log("🎉 Test emails sent!");
      return;
    }

    // Live or Dry-run logic
    console.log("🔍 Running user query...");
    console.log("📅 Targeting: All registered users");

    const users = await prisma.user.findMany({
      include: {
        cards: true
      }
    });

    console.log(`📊 Found ${users.length} total registered users.`);

    if (users.length === 0) {
      console.log("💤 No registered users found in the database. Campaign complete!");
      return;
    }

    let segmentACount = 0;
    let segmentBCount = 0;
    let skippedCount = 0;

    const segmentAUsers = [];
    const segmentBUsers = [];

    users.forEach(user => {
      if (user.cards.length === 0) {
        segmentACount++;
        segmentAUsers.push(user);
      } else if (user.cards.length > 0 && user.subscription === "FREE") {
        segmentBCount++;
        segmentBUsers.push(user);
      } else {
        skippedCount++;
      }
    });

    console.log(`\n📋 Target User Breakdown:`);
    console.log(`   - Segment A (No cards created): ${segmentACount} users`);
    console.log(`   - Segment B (Free tier with cards): ${segmentBCount} users`);
    console.log(`   - Skipped (Paid subscription or other): ${skippedCount} users`);

    if (dryRun) {
      console.log("\n⚠️ Running in --dry-run mode. No emails will be sent.");
      console.log("\nTarget users details:");
      
      if (segmentAUsers.length > 0) {
        console.log("\n=== Segment A Users ===");
        segmentAUsers.forEach(u => console.log(`- ${u.name || "No name"} (${u.email}) [Created: ${u.createdAt.toISOString().split("T")[0]}]`));
      }
      
      if (segmentBUsers.length > 0) {
        console.log("\n=== Segment B Users ===");
        segmentBUsers.forEach(u => console.log(`- ${u.name || "No name"} (${u.email}) [Username: ${u.cards[0].username}]`));
      }
      
      console.log("\n✅ Dry run completed successfully!");
      return;
    }

    if (force) {
      console.log(`\n📧 Executing live campaign! Dispatching emails using Resend...`);
      
      let sentCount = 0;
      let failCount = 0;

      // Process Segment A
      for (const user of segmentAUsers) {
        const subject = "Finish your eProfile! 🚀 Create your digital visiting card";
        const html = renderSegmentA(user.name);
        const success = await sendMail(user.email, subject, html);
        if (success) sentCount++; else failCount++;
        
        // Wait 100ms between calls to respect API rate limits
        await new Promise(r => setTimeout(r, 100));
      }

      // Process Segment B
      for (const user of segmentBUsers) {
        const username = user.cards[0]?.username;
        const subject = "Unlock the power of your eProfile! 💎 Get 20% off Premium";
        const html = renderSegmentB(user.name, username);
        const success = await sendMail(user.email, subject, html);
        if (success) sentCount++; else failCount++;
        
        await new Promise(r => setTimeout(r, 100));
      }

      console.log(`\n🎉 Campaign run finished!`);
      console.log(`   - Successfully sent: ${sentCount}`);
      console.log(`   - Failed: ${failCount}`);
    }

  } catch (error) {
    console.error("❌ Campaign execution error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

runCampaign();

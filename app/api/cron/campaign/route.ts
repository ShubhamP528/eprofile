import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/mail";

// Vercel Cron Secret check
const getAuthCheck = (req: NextRequest): boolean => {
  const authHeader = req.headers.get("Authorization");
  const cronSecret = process.env.CRON_SECRET || "development-secret";
  return authHeader === `Bearer ${cronSecret}`;
};

// Required days gap to progress to the next step
// e.g. REQUIRED_GAPS[0] is for step 0 -> step 1 (0 days gap, send immediately on cron run)
// REQUIRED_GAPS[1] is for step 1 -> step 2 (2 days gap)
// REQUIRED_GAPS[2] is for step 2 -> step 3 (3 days gap)
const REQUIRED_GAPS = [0, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2];

// Email subjects & content mapping
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://www.eprofile.cv";
const PROMO_CODE = "EPROFILE20";

const getSegmentATemplate = (name: string, step: number) => {
  const dashboardUrl = `${APP_URL}/dashboard/cards/new`;
  let subject = "";
  let body = "";

  switch (step) {
    case 1:
      subject = "eProfile: Create your first digital business card 🚀";
      body = `Hi ${name || "there"},\n\nWelcome to eProfile! Did you know it takes less than 5 minutes to create your professional digital business card?\n\nWe have 10 mobile-optimized, modern templates waiting for you. Just log in and add your details in the dashboard to get started:\n\n👉 Create your card: ${dashboardUrl}\n\nBest regards,\nThe eProfile Team`;
      break;
    case 2:
      subject = "Why paper business cards are holding you back 💡";
      body = `Hi ${name || "there"},\n\nThink about it: paper cards get lost, run out, and can never be updated when your phone number or links change.\n\nWith eProfile, you get a dynamic digital card that you can update instantly at any time. Best of all, it's eco-friendly and always ready to share.\n\n👉 Build your card today: ${dashboardUrl}\n\nBest regards,\nThe eProfile Team`;
      break;
    case 3:
      subject = "SEO tip: Add eProfile to your email signature 📧";
      body = `Hi ${name || "there"},\n\nOne of the easiest ways to share your digital profile is by adding it to your email signature.\n\nYou can simply write: "Connect with me: eprofile.cv/username" or add a link to the bottom of your daily emails. It's a great passive way to grow your network and collect leads.\n\n👉 Log in to set up your profile: ${dashboardUrl}\n\nBest regards,\nThe eProfile Team`;
      break;
    case 4:
      subject = "How to use your eProfile as a 'Link in Bio' 🔗";
      body = `Hi ${name || "there"},\n\nInstead of listing separate links for your LinkedIn, WhatsApp, website, and portfolio on social media, you can use your eProfile short link to group everything in one place.\n\nPut your custom eProfile link in your Instagram, LinkedIn, or WhatsApp Business bio. It directs clients and partners to your active contact channels instantly.\n\n👉 Complete your eProfile: ${dashboardUrl}\n\nBest regards,\nThe eProfile Team`;
      break;
    case 5:
      subject = "Tip: Choosing the right template for your business 🎨";
      body = `Hi ${name || "there"},\n\neProfile offers multiple professional templates tailored to different styles—whether you're a freelancer, consultant, or startup founder. You can change designs, colors, and layout configurations with one click in your dashboard.\n\nTake 2 minutes to select a style that matches your brand:\n\n👉 Edit your design: ${dashboardUrl}\n\nBest regards,\nThe eProfile Team`;
      break;
    case 6:
      subject = "Have you tried NFC card sharing? 💳";
      body = `Hi ${name || "there"},\n\nDigital visiting cards are even more powerful with NFC tags. You can write your custom eProfile link onto a cheap NFC card or keychain. When you tap it against someone's phone, your digital profile pops up instantly.\n\nIt's a fantastic icebreaker at networking events and ensures you never run out of cards.\n\n👉 Find your profile link: ${dashboardUrl}\n\nBest regards,\nThe eProfile Team`;
      break;
    case 7:
      subject = "Download your high-res QR code 📲";
      body = `Hi ${name || "there"},\n\nDid you know your eProfile comes with a built-in downloadable QR code? You can place this code on presentation slides, physical banners, shop windows, or marketing material.\n\nClients can scan the code to save your contact information or make payments instantly.\n\n👉 Download your QR code: ${dashboardUrl}\n\nBest regards,\nThe eProfile Team`;
      break;
    case 8:
      subject = "Showcase your list of services on your profile 💼";
      body = `Hi ${name || "there"},\n\nWith eProfile, you don't just share contact info; you can showcase what you sell. You can add up to 5 custom services with prices and details, and drag-and-drop them to sort. Let clients buy or inquire directly from your card.\n\n👉 Add your services: ${dashboardUrl}\n\nBest regards,\nThe eProfile Team`;
      break;
    case 9:
      subject = "Print your digital card QR code on flyers & packaging 🖼️";
      body = `Hi ${name || "there"},\n\nTake your offline marketing online. By printing your eProfile QR code on your product packaging, business cards, or event flyers, clients can scan it to instantly view your services, reviews, and social channels.\n\n👉 Get your QR code from your dashboard: ${dashboardUrl}\n\nBest regards,\nThe eProfile Team`;
      break;
    case 10:
      subject = "Build trust with a portfolio gallery on your profile 🖼️";
      body = `Hi ${name || "there"},\n\nShow, don't just tell. You can add up to 10 photos, videos, and document attachments directly on your profile page to showcase past projects, case studies, or catalog booklets.\n\nBuild immediate trust with prospective clients by displaying your work:\n\n👉 Manage your gallery: ${dashboardUrl}\n\nBest regards,\nThe eProfile Team`;
      break;
    case 11:
      subject = "Special welcome offer: 20% off eProfile Premium 🎁";
      body = `Hi ${name || "there"},\n\nWe want to help you build the best professional profile. Upgrade your account today and get 20% off standard or pro plans with coupon code: ${PROMO_CODE}.\n\nPremium unlocks custom domains (yourname.com), direct UPI/Razorpay/Paytm payment collections, advanced analytics, portfolios, and customer review sections.\n\n👉 Claim your 20% discount: ${dashboardUrl}\n\nBest regards,\nThe eProfile Team`;
      break;
    case 12:
      subject = "Quick question: How can we improve eProfile? 💬";
      body = `Hi ${name || "there"},\n\nI'm checking in to see if you have any questions or feedback about eProfile. What features would help you stand out more?\n\nIf you have any feedback or need help setting up your profile, just reply directly to this email—we read every single message.\n\nBest regards,\nThe eProfile Team`;
      break;
  }

  return { subject, body };
};

const getSegmentBTemplate = (name: string, step: number, username: string) => {
  const dashboardUrl = `${APP_URL}/dashboard`;
  const cardUrl = username ? `${APP_URL}/${username}` : null;
  let subject = "";
  let body = "";

  switch (step) {
    case 1:
      subject = "Link your eProfile to your Custom Domain 🏷️";
      body = `Hi ${name || "there"},\n\nCongratulations on setting up your eProfile card${cardUrl ? ` (at ${cardUrl})` : ""}! It looks great.\n\nTo make it truly professional, you can link it directly to your own web domain (like yourname.com). It removes eProfile branding and builds strong professional authority. Check it out in your premium dashboard:\n\n👉 Link custom domain: ${dashboardUrl}\n\nBest regards,\nThe eProfile Team`;
      break;
    case 2:
      subject = "Say goodbye to paper cards for good 💡";
      body = `Hi ${name || "there"},\n\nYour digital card is live! Remember to keep it updated whenever your details change. Any change you make in the dashboard is reflected instantly, so you'll never have to reprint paper business cards again.\n\n👉 Edit your details: ${dashboardUrl}\n\nBest regards,\nThe eProfile Team`;
      break;
    case 3:
      subject = "Quick tip: Add your eProfile to your email signature 📧";
      body = `Hi ${name || "there"},\n\nMake the most of your digital card by adding it to your email signature. You can write: "Connect with me: eprofile.cv/username" or add a hyperlink at the bottom of your daily emails. It's a great passive way to collect inquiries and leads.\n\n👉 View your profile link: ${dashboardUrl}\n\nBest regards,\nThe eProfile Team`;
      break;
    case 4:
      subject = "Maximize conversions: Link-in-Bio setup 🔗";
      body = `Hi ${name || "there"},\n\nKeep your audience focused. Place your eProfile link in your Instagram, LinkedIn, or WhatsApp Business bio so clients can find all your contact links, portfolio pieces, and services on a single, neat page.\n\n👉 Copy your bio link: ${dashboardUrl}\n\nBest regards,\nThe eProfile Team`;
      break;
    case 5:
      subject = "Collect payments directly from your profile 💳";
      body = `Hi ${name || "there"},\n\nDid you know you can collect payments directly through your profile? Premium tier allows you to set up direct UPI QR code support, Razorpay integration, or Paytm. Perfect for consultants, service providers, and business owners.\n\n👉 Enable payments: ${dashboardUrl}\n\nBest regards,\nThe eProfile Team`;
      break;
    case 6:
      subject = "Set up NFC tag sharing for instant tap 💳";
      body = `Hi ${name || "there"},\n\nWant to wow people at networking events? Write your eProfile URL onto a cheap NFC card or keychain. Tap it against a client's phone, and your profile page will open instantly. It's fast, modern, and memorable.\n\n👉 Find your sharing link: ${dashboardUrl}\n\nBest regards,\nThe eProfile Team`;
      break;
    case 7:
      subject = "Track views and clicks with Premium Analytics 📊";
      body = `Hi ${name || "there"},\n\nWith Premium, you get a full analytics dashboard. You can track total views, click rates on buttons (calls, WhatsApp, email), lead capture performance, and see how well your profile is converting prospects.\n\n👉 View your analytics: ${dashboardUrl}\n\nBest regards,\nThe eProfile Team`;
      break;
    case 8:
      subject = "Display your services with custom pricing 💼";
      body = `Hi ${name || "there"},\n\nShowcase your work effectively. You can display up to 5 custom services with prices and descriptions, select featured services, and order them by drag-and-drop. Make it easy for visitors to choose a service and reach out.\n\n👉 Configure your services: ${dashboardUrl}\n\nBest regards,\nThe eProfile Team`;
      break;
    case 9:
      subject = "Download and print your custom QR Code 🖼️";
      body = `Hi ${name || "there"},\n\nYou can download a high-res QR code for your card from your dashboard. Print it on brochures, posters, product packaging, or office flyers so people can scan to save your contact info instantly.\n\n👉 Download QR code: ${dashboardUrl}\n\nBest regards,\nThe eProfile Team`;
      break;
    case 10:
      subject = "Show star ratings and customer testimonials ⭐";
      body = `Hi ${name || "there"},\n\nSocial proof is the best sales pitch. Premium allows you to display client reviews and 5-star ratings directly on your digital business card to build trust with new visitors.\n\n👉 Manage testimonials: ${dashboardUrl}\n\nBest regards,\nThe eProfile Team`;
      break;
    case 11:
      subject = "Get 20% off eProfile Premium today 🎁";
      body = `Hi ${name || "there"},\n\nReady to unlock custom domains, direct payments, advanced templates, star ratings, and detailed analytics? Upgrade today and get 20% off standard or pro plans with coupon code: ${PROMO_CODE}.\n\n👉 Claim your 20% discount: ${dashboardUrl}\n\nBest regards,\nThe eProfile Team`;
      break;
    case 12:
      subject = "How can we make eProfile Premium better? 💬";
      body = `Hi ${name || "there"},\n\nI want to make sure you have everything you need to grow your professional network. What premium feature would you like to see next?\n\nIf you have any questions, suggestions, or need help setting up domains or payments, simply reply to this email. We read and answer every message.\n\nBest regards,\nThe eProfile Team`;
      break;
  }

  return { subject, body };
};

// Conversational personal-letter HTML wrapper to ensure Primary Tab delivery
const wrapConversationalHtml = (body: string, unsubscribeUrl: string) => {
  // Convert newlines to breaks for HTML display, keep text looking clean and personal
  const formattedBody = body.replace(/\n/g, "<br>");
  
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div>
      ${formattedBody}
    </div>
    <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 30px 0;">
    <p style="font-size: 12px; color: #9ca3af; text-align: center; line-height: 1.4;">
      eProfile, Rudraksh Colony, Janpth Road, Fulsunga, Rudrapur, Uttrakhand, Pin - 263153<br>
      If you no longer wish to receive onboarding tips, you can <a href="${unsubscribeUrl}" style="color: #2563eb; text-decoration: none;">unsubscribe here</a>.
    </p>
  </body>
</html>`;
};

export async function GET(req: NextRequest) {
  try {
    // 1. Security Check
    if (!getAuthCheck(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if running in mock/preview mode (e.g. simulation query parameters)
    const url = new URL(req.url);
    const testEmailAddress = url.searchParams.get("test_email");
    const testStep = parseInt(url.searchParams.get("test_step") || "0", 10);

    if (testEmailAddress && testStep >= 1 && testStep <= 12) {
      console.log(`🧪 Sending test campaign email for step ${testStep} to ${testEmailAddress}`);
      const unsubUrl = `${APP_URL}/unsubscribe?email=${encodeURIComponent(testEmailAddress)}`;
      
      const emailA = getSegmentATemplate("Test User A", testStep);
      await sendEmail({
        to: testEmailAddress,
        subject: emailA.subject,
        html: wrapConversationalHtml(emailA.body, unsubUrl),
      });

      const emailB = getSegmentBTemplate("Test User B", testStep, "testuser");
      await sendEmail({
        to: testEmailAddress,
        subject: emailB.subject,
        html: wrapConversationalHtml(emailB.body, unsubUrl),
      });

      return NextResponse.json({ success: true, message: `Test emails for step ${testStep} sent successfully.` });
    }

    // 2. Fetch users who are undergoing campaign sequence
    const now = new Date();
    const users = await prisma.user.findMany({
      where: {
        campaignStep: { lt: 12 },
      },
      include: {
        cards: true,
      },
    });

    let sentCount = 0;
    let skippedCount = 0;

    for (const user of users) {
      const currentStep = user.campaignStep; // 0 to 11
      const targetStep = currentStep + 1; // 1 to 12
      
      // Determine time diff since last campaign email or registration
      const lastSent = user.campaignLastSent || user.createdAt;
      const hoursDiff = (now.getTime() - lastSent.getTime()) / (1000 * 60 * 60);
      const daysDiff = hoursDiff / 24;

      const requiredGap = REQUIRED_GAPS[currentStep];

      // If gap is satisfied, trigger email
      if (daysDiff >= requiredGap) {
        let sent = false;
        const unsubUrl = `${APP_URL}/unsubscribe?email=${encodeURIComponent(user.email)}`;

        // Segment A: No cards created
        if (user.cards.length === 0) {
          const emailData = getSegmentATemplate(user.name || "", targetStep);
          sent = await sendEmail({
            to: user.email,
            subject: emailData.subject,
            html: wrapConversationalHtml(emailData.body, unsubUrl),
          });
        } 
        // Segment B: Has cards, on FREE subscription
        else if (user.cards.length > 0 && user.subscription === "FREE") {
          const username = user.cards[0].username;
          const emailData = getSegmentBTemplate(user.name || "", targetStep, username);
          sent = await sendEmail({
            to: user.email,
            subject: emailData.subject,
            html: wrapConversationalHtml(emailData.body, unsubUrl),
          });
        }
        // Paid premium user with cards, completed campaign step automatically
        else {
          await prisma.user.update({
            where: { id: user.id },
            data: { campaignStep: 12 },
          });
          skippedCount++;
          continue;
        }

        if (sent) {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              campaignStep: targetStep,
              campaignLastSent: now,
            },
          });
          sentCount++;
        }

        // Small throttle to avoid hitting Resend rate limits (approx 6-7 emails per second)
        await new Promise((resolve) => setTimeout(resolve, 150));
      }
    }

    return NextResponse.json({
      success: true,
      processed: users.length,
      sent: sentCount,
      skipped: skippedCount,
    });
  } catch (error) {
    console.error("Campaign cron execution error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

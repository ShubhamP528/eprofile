import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/mail";

// Vercel Cron Secret check
const getAuthCheck = (req: NextRequest): boolean => {
  const authHeader = req.headers.get("Authorization");
  const cronSecret = process.env.CRON_SECRET || "development-secret";
  return authHeader === `Bearer ${cronSecret}`;
};

interface Festival {
  date: string; // Format: YYYY-MM-DD
  name: string;
  subject: string;
  body: string;
}

const FESTIVALS: Festival[] = [
  {
    date: "2026-09-14",
    name: "Ganesh Chaturthi",
    subject: "Happy Ganesh Chaturthi! 🌸 Wishing you prosperity and wisdom",
    body: "May Lord Ganesha bless your life and work with wisdom, success, and prosperity. Let's make connections simpler and smarter by using your digital eProfile card this festive season.\n\nWarm regards,\nThe eProfile Team"
  },
  {
    date: "2026-10-20",
    name: "Dussehra",
    subject: "Happy Dussehra! 🏹 Celebrate victory and new beginnings",
    body: "Wishing you a happy and blessed Vijayadashami! May this day bring you the strength to conquer all obstacles and achieve success in all your professional endeavors. Keep your network connected with your eProfile card.\n\nWarm regards,\nThe eProfile Team"
  },
  {
    date: "2026-11-08",
    name: "Diwali",
    subject: "Happy Diwali! 🪔 Wishing you bright success and prosperity",
    body: "On this beautiful festival of lights, we wish you and your business abundance, joy, and success! Share your festive greetings and connect with clients easily using your eProfile digital card.\n\nWarm regards,\nThe eProfile Team"
  },
  {
    date: "2026-11-10",
    name: "Bhai Dooj",
    subject: "Happy Bhai Dooj! 🌟 Celebrating sibling bonds and connections",
    body: "Wishing you and your family a beautiful and blessed Bhai Dooj! May Ganesha and Lakshmi bring connection, harmony, and joy into your home.\n\nWarm regards,\nThe eProfile Team"
  },
  {
    date: "2027-01-14",
    name: "Makar Sankranti",
    subject: "Happy Makar Sankranti! 🌾 Wishing you new growth and success",
    body: "Wishing you a harvest of success, warmth, and fresh growth in your career on Makar Sankranti/Pongal! Share your digital profile card to reach new heights this harvest season.\n\nWarm regards,\nThe eProfile Team"
  },
  {
    date: "2027-03-06",
    name: "Maha Shivratri",
    subject: "Happy Maha Shivratri! 🙏 Wishing you peace and strength",
    body: "On this auspicious day of Maha Shivratri, may Lord Shiva bless you with peace, inner strength, and dedication to guide you in all your work.\n\nWarm regards,\nThe eProfile Team"
  },
  {
    date: "2027-03-22",
    name: "Holi",
    subject: "Happy Holi! 🎨 Wishing you a vibrant and colorful year ahead",
    body: "Wishing you a colorful, vibrant, and prosperous Holi! May your career and business bloom with success and joy this spring. Connect instantly with everyone you meet using eProfile.\n\nWarm regards,\nThe eProfile Team"
  },
  {
    date: "2027-04-15",
    name: "Rama Navami",
    subject: "Happy Rama Navami! 🏹 Celebrating virtues and success",
    body: "Wishing you a blessed and joyful Rama Navami! May the virtues of Lord Rama inspire dedication, success, and truth in your daily work.\n\nWarm regards,\nThe eProfile Team"
  },
  {
    date: "2027-04-22",
    name: "Hanuman Jayanti",
    subject: "Happy Hanuman Jayanti! 💪 Wishing you strength and courage",
    body: "May Lord Hanuman bless you with energy, strength, and unwavering focus on your professional goals. Have a blessed Hanuman Jayanti!\n\nWarm regards,\nThe eProfile Team"
  },
  {
    date: "2027-08-17",
    name: "Raksha Bandhan",
    subject: "Happy Raksha Bandhan! 🌟 Celebrating protection and connection",
    body: "Wishing you a wonderful Raksha Bandhan! Celebrate connections, trust, and protective bonds. Share your eProfile to build strong business ties.\n\nWarm regards,\nThe eProfile Team"
  },
  {
    date: "2027-08-25",
    name: "Krishna Janmashtami",
    subject: "Happy Krishna Janmashtami! 🦚 Wishing you joy and devotion",
    body: "Wishing you a blessed and joyful Krishna Janmashtami! May Ganesha and Krishna fill your work and home with love, joy, and spiritual harmony.\n\nWarm regards,\nThe eProfile Team"
  }
];

// Conversational personal-letter HTML wrapper to ensure Primary Tab delivery
const wrapConversationalHtml = (body: string, unsubscribeUrl: string) => {
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
      To stop receiving festival greetings, you can <a href="${unsubscribeUrl}" style="color: #2563eb; text-decoration: none;">unsubscribe here</a>.
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

    const url = new URL(req.url);
    const testDate = url.searchParams.get("test_date"); // Allows simulating dates in testing
    const testEmailAddress = url.searchParams.get("test_email"); // Allows testing specific address

    // 2. Determine target date to check (IST timezone)
    let dateStr: string;
    if (testDate) {
      dateStr = testDate;
    } else {
      const options = { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" } as const;
      const formatter = new Intl.DateTimeFormat("en-CA", options); // Canada locale formats as YYYY-MM-DD
      dateStr = formatter.format(new Date());
    }

    console.log(`📅 Festivals cron checking date: ${dateStr}`);

    // Find if there is a festival on this day
    const festival = FESTIVALS.find(f => f.date === dateStr);

    if (!festival) {
      return NextResponse.json({
        success: true,
        message: `No Hindu festival matched for date: ${dateStr}. No emails sent.`
      });
    }

    console.log(`🎉 Match found: ${festival.name}! Dispatching greetings...`);

    let sentCount = 0;
    const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://www.eprofile.cv";

    // 3. Handle specific test email request
    if (testEmailAddress) {
      const unsubUrl = `${APP_URL}/unsubscribe?email=${encodeURIComponent(testEmailAddress)}`;
      const personalizedBody = `Hi Test User,\n\n${festival.body}`;
      
      await sendEmail({
        to: testEmailAddress,
        subject: festival.subject,
        html: wrapConversationalHtml(personalizedBody, unsubUrl),
      });

      return NextResponse.json({
        success: true,
        message: `Sent test greeting for ${festival.name} to ${testEmailAddress}.`
      });
    }

    // 4. Query all users in the system to send wishes
    const users = await prisma.user.findMany({
      select: {
        email: true,
        name: true
      }
    });

    for (const user of users) {
      const unsubUrl = `${APP_URL}/unsubscribe?email=${encodeURIComponent(user.email)}`;
      const personalizedBody = `Hi ${user.name || "there"},\n\n${festival.body}`;
      
      const success = await sendEmail({
        to: user.email,
        subject: festival.subject,
        html: wrapConversationalHtml(personalizedBody, unsubUrl),
      });

      if (success) {
        sentCount++;
      }

      // Small throttle to avoid hitting Resend rate limits (approx 10 emails per second)
      await new Promise(r => setTimeout(r, 100));
    }

    return NextResponse.json({
      success: true,
      festival: festival.name,
      sent: sentCount,
      totalUsers: users.length
    });
  } catch (error) {
    console.error("Festivals cron execution error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

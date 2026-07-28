import { NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/mail";

export async function GET() {
  const testEmailAddress = "shubham2021prajapati@gmail.com";
  console.log(`📧 Sending test onboarding email to: ${testEmailAddress}...`);

  try {
    const success = await sendWelcomeEmail(testEmailAddress, "Shubham");
    if (success) {
      return NextResponse.json({
        success: true,
        message: `Welcome email sent successfully to ${testEmailAddress}! Check your inbox.`,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to send email. Ensure RESEND_API_KEY is configured in your .env.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

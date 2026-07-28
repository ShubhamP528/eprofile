const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || "eProfile <onboarding@resend.dev>";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://www.eprofile.cv";

interface MailOptions {
  to: string;
  subject: string;
  html: string;
}

/**
 * Core function to send an email via the Resend API.
 * Uses native fetch to avoid extra bundle size and npm dependencies.
 */
export async function sendEmail({ to, subject, html }: MailOptions): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.warn("⚠️ RESEND_API_KEY is not set. Skipping email dispatch.");
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
      console.log(`📧 Email sent successfully to ${to}. Message ID: ${data.id}`);
      return true;
    } else {
      console.error("❌ Failed to send email via Resend API:", data);
      return false;
    }
  } catch (error) {
    console.error("❌ Exception occurred while sending email:", error);
    return false;
  }
}

/**
 * Sends a premium onboarding/welcome email to a newly registered user.
 */
export async function sendWelcomeEmail(toEmail: string, userName: string): Promise<boolean> {
  const dashboardUrl = `${APP_URL}/dashboard`;
  const welcomeHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome to eProfile</title>
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
          .steps {
            background-color: #f3f4f6;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
          }
          .step-item {
            margin-bottom: 12px;
            font-size: 15px;
          }
          .step-item:last-child {
            margin-bottom: 0;
          }
          .step-number {
            font-weight: bold;
            color: #2563eb;
          }
          .button-wrapper {
            text-align: center;
            margin: 35px 0 15px 0;
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
            <h2>Welcome to the future of networking, ${userName || "there"}! 👋</h2>
            <p>Thank you for choosing eProfile. Your account is active, and you are ready to build a stunning, professional digital visiting card.</p>
            
            <p>Here are the first steps to get you started:</p>
            <div class="steps">
              <div class="step-item">
                <span class="step-number">1.</span> Create your first card in your dashboard.
              </div>
              <div class="step-item">
                <span class="step-number">2.</span> Choose from our premium, designed templates.
              </div>
              <div class="step-item">
                <span class="step-number">3.</span> Add your contact info, services, and social links.
              </div>
              <div class="step-item">
                <span class="step-number">4.</span> Share your custom link or QR code instantly.
              </div>
            </div>
            
            <div class="button-wrapper">
              <a href="${dashboardUrl}" target="_blank" class="btn">Create Your Digital Card</a>
            </div>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} eProfile. All rights reserved.</p>
            <p>Need support? Contact us at <a href="mailto:support@eprofile.cv">support@eprofile.cv</a></p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: toEmail,
    subject: "Welcome to eProfile! 🚀 Create your digital visiting card",
    html: welcomeHtml,
  });
}

import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, message, plan } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email and message are required" },
        { status: 400 }
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL || "support@eprofile.cv";

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Submission</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              background-color: #f9fafb;
              margin: 0;
              padding: 0;
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
              background: linear-gradient(135deg, #6366f1, #8b5cf6);
              padding: 30px 20px;
              text-align: center;
              color: #ffffff;
            }
            .header h1 {
              margin: 0;
              font-size: 22px;
              font-weight: 800;
            }
            .content {
              padding: 30px;
              color: #374151;
              line-height: 1.6;
            }
            .field-row {
              margin-bottom: 20px;
              border-bottom: 1px solid #f3f4f6;
              padding-bottom: 15px;
            }
            .field-row:last-child {
              border-bottom: none;
              padding-bottom: 0;
            }
            .label {
              font-weight: bold;
              color: #111827;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              margin-bottom: 5px;
            }
            .value {
              font-size: 16px;
              color: #4b5563;
              white-space: pre-wrap;
            }
            .footer {
              background-color: #f9fafb;
              padding: 20px 30px;
              border-top: 1px solid #e5e7eb;
              text-align: center;
              font-size: 12px;
              color: #9ca3af;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Message</h1>
            </div>
            <div class="content">
              <div class="field-row">
                <div class="label">Sender Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field-row">
                <div class="label">Sender Email</div>
                <div class="value">${email}</div>
              </div>
              <div class="field-row">
                <div class="label">Company</div>
                <div class="value">${company || "Not provided"}</div>
              </div>
              <div class="field-row">
                <div class="label">Interested Plan</div>
                <div class="value">${plan || "Not specified"}</div>
              </div>
              <div class="field-row">
                <div class="label">Message</div>
                <div class="value">${message}</div>
              </div>
            </div>
            <div class="footer">
              <p>Sent automatically from the eProfile Contact Form</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const success = await sendEmail({
      to: "shubham528prajapati@gmail.com",
      subject: `📩 New Contact Form Submission from ${name}`,
      html: emailHtml,
    });

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: "Failed to send contact email." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

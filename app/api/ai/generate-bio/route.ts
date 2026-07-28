import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    // Authenticate the user
    const authResult = await requireAuth();
    if (!authResult.success) {
      return authResult.error;
    }

    const { title, subtitle } = await request.json();

    if (!title) {
      return NextResponse.json(
        { success: false, error: "Name (title) is required to generate a bio" },
        { status: 400 }
      );
    }

    let GEMINI_API_KEY = "";
    try {
      const fs = require("fs");
      const path = require("path");
      const envPath = path.join(process.cwd(), ".env");
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, "utf-8");
        const match = envContent.match(/^GEMINI_API_KEY\s*=\s*(.*)$/m);
        if (match && match[1]) {
          GEMINI_API_KEY = match[1].replace(/^["']|["']$/g, "").trim();
        }
      }
    } catch (e) {
      console.error("Failed to read .env file directly:", e);
    }

    if (!GEMINI_API_KEY && process.env.GEMINI_API_KEY) {
      GEMINI_API_KEY = process.env.GEMINI_API_KEY.replace(/^["']|["']$/g, "").trim();
    }

    console.log("🔑 [DEBUG] Loaded Key:", GEMINI_API_KEY ? `${GEMINI_API_KEY.length} chars, starts with "${GEMINI_API_KEY.slice(0, 5)}", ends with "${GEMINI_API_KEY.slice(-5)}"` : "undefined");

    if (GEMINI_API_KEY) {
      // Call Gemini 1.5 Flash API
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Generate a professional, warm, and engaging bio (exactly 2 to 3 sentences, maximum 45 words) suitable for a digital business card. The person's name is "${title}"${
                      subtitle ? ` and their role/profession is "${subtitle}"` : ""
                    }. Do not include quotes, greetings, placeholders, or intro text. Just return the bio text directly.`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 4096,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (generatedText) {
          return NextResponse.json({ success: true, bio: generatedText });
        }
      } else {
        const errData = await response.json().catch(() => ({}));
        console.error("❌ Gemini API request failed:", {
          status: response.status,
          statusText: response.statusText,
          error: errData,
        });
      }
    }

    // Fallback template-based generator if Gemini fails or API key is not configured
    const roleText = subtitle ? ` a dedicated ${subtitle}` : " a seasoned professional";
    const templates = [
      `Hi, I'm ${title},${roleText} focused on delivering exceptional results, building meaningful professional connections, and driving innovation in my field.`,
      `Hello! I'm ${title},${roleText}. I specialize in creating impactful solutions, fostering collaboration, and helping clients achieve their goals.`,
      `Welcome to my profile! I'm ${title},${roleText} passionate about continuous learning, professional excellence, and crafting creative solutions to complex problems.`,
    ];

    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    return NextResponse.json({ success: true, bio: randomTemplate });
  } catch (error) {
    console.error("Error generating bio:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate bio" },
      { status: 500 }
    );
  }
}

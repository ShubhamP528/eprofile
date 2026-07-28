import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signAdminToken } from "@/lib/crypto-token";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const expectedUsername = process.env.ADMIN_USERNAME || "admin";
    const expectedPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (username === expectedUsername && password === expectedPassword) {
      const token = signAdminToken(username);
      const cookieStore = await cookies();

      cookieStore.set("admin_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid Username or Password" }, { status: 401 });
  } catch (error) {
    console.error("Admin login API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

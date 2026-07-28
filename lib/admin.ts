import { cookies } from "next/headers";
import { verifyAdminToken } from "./crypto-token";

/**
 * Checks if the user is authenticated as an admin by verifying the secure admin cookie.
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    if (!token) return false;
    return verifyAdminToken(token);
  } catch (error) {
    console.error("Error during isAdmin validation:", error);
    return false;
  }
}

import crypto from "crypto";

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "default_super_secret_admin_token_key_123456";

/**
 * Creates a signed token for admin authentication.
 */
export function signAdminToken(username: string): string {
  const expiry = Date.now() + 1000 * 60 * 60 * 24; // 24 hours expiry
  const payload = JSON.stringify({ username, expiry });
  const base64Payload = Buffer.from(payload).toString("base64");
  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(base64Payload)
    .digest("hex");
  return `${base64Payload}.${signature}`;
}

/**
 * Verifies a signed admin token.
 */
export function verifyAdminToken(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const [base64Payload, signature] = parts;

    // Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(base64Payload)
      .digest("hex");

    const isSignatureValid = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );

    if (!isSignatureValid) return false;

    // Verify expiry and content
    const payloadJson = Buffer.from(base64Payload, "base64").toString("utf-8");
    const payload = JSON.parse(payloadJson);

    if (payload.expiry < Date.now()) {
      return false;
    }

    const configUsername = process.env.ADMIN_USERNAME || "admin";
    return payload.username === configUsername;
  } catch (e) {
    return false;
  }
}

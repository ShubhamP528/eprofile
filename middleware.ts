import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // Add any additional middleware logic here
  // The auth function automatically handles authentication
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/cards/:path*",
    "/api/leads/:path*",
    "/api/analytics/:path*",
  ],
};

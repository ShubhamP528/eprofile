/**
 * Startup Provider
 * Validates environment and database connectivity on application startup
 */

import { StartupValidator } from "@/lib/startup-validator";

interface StartupProviderProps {
  children: React.ReactNode;
}

export default async function StartupProvider({
  children,
}: StartupProviderProps) {
  // Validate environment variables on server startup
  if (typeof window === "undefined") {
    try {
      // Only validate environment on server side to avoid blocking client
      StartupValidator.validateEnvironmentOnly();
    } catch (error) {
      console.error("Startup validation failed:", error);

      // In production, we might want to show an error page
      if (process.env.NODE_ENV === "production") {
        return (
          <div className="min-h-screen flex items-center justify-center bg-red-50">
            <div className="max-w-md mx-auto text-center p-6">
              <div className="text-red-600 text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-red-800 mb-2">
                Configuration Error
              </h1>
              <p className="text-red-600 mb-4">
                The application is not properly configured. Please check the
                server logs for details.
              </p>
              <p className="text-sm text-red-500">
                Error:{" "}
                {error instanceof Error
                  ? error.message
                  : "Unknown configuration error"}
              </p>
            </div>
          </div>
        );
      }

      // In development, just log the error and continue
      console.warn(
        "Continuing with startup validation errors in development mode"
      );
    }
  }

  return <>{children}</>;
}

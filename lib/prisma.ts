import { PrismaClient } from "@prisma/client";
import { DatabaseURLValidator } from "./database-url-validator";
import { DatabaseErrorHandler } from "./database-error-handler";

/**
 * Get properly configured database URL for the current environment
 */
function getDatabaseURL(): string {
  const rawUrl = process.env.DATABASE_URL;

  if (!rawUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  // For now, just use the raw URL since it's already properly encoded
  // The URL encoding was done manually in the .env file
  console.log("Using DATABASE_URL from environment");
  return rawUrl;
}



const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Create Prisma client with proper error handling
 */
function createPrismaClient(): PrismaClient {
  try {
    const databaseUrl = getDatabaseURL();
    const isProduction = process.env.NODE_ENV === "production";

    return new PrismaClient({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
      log: isProduction ? ["error"] : ["query"],
      errorFormat: "pretty",
    });
  } catch (error) {
    const errorHandling = DatabaseErrorHandler.handlePrismaInitializationError(
      error instanceof Error ? error : new Error(String(error)),
      {
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
      }
    );

    console.error("Failed to create Prisma client:", errorHandling.technicalMessage);

    if (process.env.NODE_ENV === 'production') {
      console.error("User message:", errorHandling.userMessage);
    }

    throw error;
  }
}

export const prisma =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/**
 * Test database connection
 */
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$connect();
    console.log("Database connection successful");
    return true;
  } catch (error) {
    const errorHandling = DatabaseErrorHandler.handleError(
      error instanceof Error ? error : new Error(String(error)),
      {
        operation: 'testConnection',
        timestamp: new Date().toISOString()
      }
    );

    console.error("Database connection failed:", errorHandling.technicalMessage);

    if (errorHandling.shouldRetry) {
      console.log(`Connection failed but retryable. Suggestions: ${DatabaseErrorHandler.getTroubleshootingSuggestions({
        type: errorHandling.errorType as any,
        code: 'CONNECTION_TEST_FAILED',
        message: errorHandling.technicalMessage,
        timestamp: new Date(),
        context: {},
        recoverable: true,
        retryable: true
      }).join(', ')}`);
    }

    return false;
  }
}

/**
 * Gracefully disconnect from database
 */
export async function disconnectDatabase(): Promise<void> {
  try {
    await prisma.$disconnect();
    console.log("Database disconnected successfully");
  } catch (error) {
    console.error("Error disconnecting from database:", error);
  }
}

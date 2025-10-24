import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prismaClient = new PrismaClient({
  log: ["query"],
});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prismaClient;
}

function getPrismaClient() {
  if (process.env.NODE_ENV === "production") {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error("DATABASE_URL is not defined");
    }
    const newUrl = `${url}?pgbouncer=true&pool_timeout=10`;
    return new PrismaClient({
      datasources: {
        db: {
          url: newUrl,
        },
      },
    });
  }
  return globalForPrisma.prisma ?? prismaClient;
}

export const prisma = getPrismaClient();

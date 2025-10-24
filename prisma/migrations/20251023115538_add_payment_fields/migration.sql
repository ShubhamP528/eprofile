-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "bio" TEXT,
    "profileImage" TEXT,
    "coverImage" TEXT,
    "template" TEXT NOT NULL DEFAULT 'template1',
    "customDomain" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "upiId" TEXT,
    "upiQrCode" TEXT,
    "razorpayId" TEXT,
    "paytmId" TEXT,
    "paymentEnabled" BOOLEAN NOT NULL DEFAULT false,
    "paymentText" TEXT DEFAULT 'Pay Now',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_cards" ("address", "bio", "coverImage", "createdAt", "customDomain", "email", "id", "isPublic", "phone", "profileImage", "seoDescription", "seoTitle", "subtitle", "template", "title", "updatedAt", "userId", "username") SELECT "address", "bio", "coverImage", "createdAt", "customDomain", "email", "id", "isPublic", "phone", "profileImage", "seoDescription", "seoTitle", "subtitle", "template", "title", "updatedAt", "userId", "username" FROM "cards";
DROP TABLE "cards";
ALTER TABLE "new_cards" RENAME TO "cards";
CREATE UNIQUE INDEX "cards_username_key" ON "cards"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

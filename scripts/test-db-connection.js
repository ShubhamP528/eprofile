#!/usr/bin/env node

const { PrismaClient } = require("@prisma/client");

async function testConnection() {
  const prisma = new PrismaClient();

  try {
    console.log("🔍 Testing database connection...");

    // Test basic connection
    await prisma.$connect();
    console.log("✅ Database connection successful!");

    // Test if tables exist
    const userCount = await prisma.user.count();
    console.log(`✅ Users table accessible (${userCount} users)`);

    const cardCount = await prisma.card.count();
    console.log(`✅ Cards table accessible (${cardCount} cards)`);

    // Test analytics tables
    try {
      const viewCount = await prisma.cardView.count();
      console.log(`✅ CardView table accessible (${viewCount} views)`);
    } catch (error) {
      console.log("⚠️  CardView table not found or empty");
    }

    try {
      const clickCount = await prisma.buttonClick.count();
      console.log(`✅ ButtonClick table accessible (${clickCount} clicks)`);
    } catch (error) {
      console.log("⚠️  ButtonClick table not found or empty");
    }

    try {
      const leadCount = await prisma.lead.count();
      console.log(`✅ Lead table accessible (${leadCount} leads)`);
    } catch (error) {
      console.log("⚠️  Lead table not found or empty");
    }

    console.log("\n🎉 Database is ready for production!");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();

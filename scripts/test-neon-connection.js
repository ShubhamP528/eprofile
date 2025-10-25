#!/usr/bin/env node

/**
 * Test Neon PostgreSQL connection
 */

const { Client } = require("pg");

const testNeonConnection = async () => {
  console.log("🧪 Testing Neon PostgreSQL Connection...\n");

  const connectionString =
    "postgresql://neondb_owner:npg_wK25OlaZfPqV@ep-red-tooth-a4prhkus-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require";

  console.log("Testing connection to Neon database...");

  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    console.log("Attempting to connect...");
    await client.connect();
    console.log("✅ Connection successful!");

    // Test a simple query
    console.log("Testing query...");
    const result = await client.query(
      "SELECT NOW() as current_time, version() as pg_version"
    );
    console.log("✅ Query successful:");
    console.log("  Current time:", result.rows[0].current_time);
    console.log(
      "  PostgreSQL version:",
      result.rows[0].pg_version.split(" ")[0]
    );

    // Check if our tables exist
    console.log("\nChecking existing tables...");
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);

    if (tablesResult.rows.length > 0) {
      console.log(
        "✅ Existing tables found:",
        tablesResult.rows.map((row) => row.table_name)
      );
    } else {
      console.log(
        "ℹ️  No tables found - database is empty (ready for schema push)"
      );
    }

    // Test connection pooling
    console.log("\nTesting connection with pooling parameters...");
    const pooledClient = new Client({
      connectionString:
        connectionString + "&pool_timeout=10&connect_timeout=60",
      ssl: { rejectUnauthorized: false },
    });

    await pooledClient.connect();
    console.log("✅ Connection pooling test successful");
    await pooledClient.end();
  } catch (error) {
    console.error("❌ Connection failed:", error.message);

    if (error.message.includes("timeout")) {
      console.log("\n💡 Timeout suggestions:");
      console.log("- Check internet connection");
      console.log("- Verify Neon database is not suspended");
      console.log("- Try increasing connection timeout");
    }

    if (error.message.includes("authentication")) {
      console.log("\n💡 Authentication suggestions:");
      console.log("- Verify username and password are correct");
      console.log("- Check if database user has proper permissions");
      console.log("- Ensure database exists");
    }

    if (
      error.message.includes("ssl") ||
      error.message.includes("certificate")
    ) {
      console.log("\n💡 SSL suggestions:");
      console.log("- SSL is required for Neon connections");
      console.log("- Try with sslmode=require parameter");
      console.log("- Check certificate configuration");
    }
  } finally {
    await client.end();
  }
};

const main = async () => {
  await testNeonConnection();

  console.log("\n📋 Next Steps:");
  console.log(
    "1. If connection works, push your Prisma schema: npx prisma db push"
  );
  console.log("2. Update your Vercel environment variables with the Neon URL");
  console.log("3. Redeploy your application");
  console.log("4. Test authentication and database operations");

  console.log("\n🎯 Neon Connection String for Production:");
  console.log(
    'DATABASE_URL="postgresql://neondb_owner:npg_wK25OlaZfPqV@ep-red-tooth-a4prhkus-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"'
  );
};

main().catch(console.error);

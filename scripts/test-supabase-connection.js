#!/usr/bin/env node

/**
 * Test Supabase connection for production deployment
 */

const { Client } = require("pg");

const testConnection = async () => {
  console.log("🧪 Testing Supabase Connection...\n");

  // Test with the URL-encoded password
  const connectionString =
    "postgresql://postgres:Eprofile%402025@db.hfggxqoxcvyrqzjydatl.supabase.co:5432/postgres";

  console.log(
    "Testing connection to:",
    connectionString.replace(/:([^:@]+)@/, ":***@")
  );

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
    const result = await client.query("SELECT NOW() as current_time");
    console.log("✅ Query successful:", result.rows[0]);

    // Test if our tables exist
    console.log("Checking if tables exist...");
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('User', 'Account', 'Card')
    `);

    console.log(
      "✅ Tables found:",
      tablesResult.rows.map((row) => row.table_name)
    );
  } catch (error) {
    console.error("❌ Connection failed:", error.message);

    if (error.message.includes("timeout")) {
      console.log("\n💡 Suggestions for timeout issues:");
      console.log("- Check if Supabase project is paused");
      console.log("- Verify network connectivity");
      console.log("- Try connecting from a different network");
    }

    if (error.message.includes("authentication")) {
      console.log("\n💡 Suggestions for authentication issues:");
      console.log("- Verify the password is correct");
      console.log("- Check if the database user exists");
      console.log("- Ensure the user has proper permissions");
    }

    if (
      error.message.includes("database") &&
      error.message.includes("does not exist")
    ) {
      console.log("\n💡 Suggestions for database issues:");
      console.log("- Verify the database name is correct");
      console.log("- Check if the database was created");
    }
  } finally {
    await client.end();
  }
};

// Test with different connection configurations
const testWithDifferentConfigs = async () => {
  console.log("\n🔧 Testing different connection configurations...\n");

  const configs = [
    {
      name: "Basic Connection",
      url: "postgresql://postgres:Eprofile%402025@db.hfggxqoxcvyrqzjydatl.supabase.co:5432/postgres",
    },
    {
      name: "With SSL",
      url: "postgresql://postgres:Eprofile%402025@db.hfggxqoxcvyrqzjydatl.supabase.co:5432/postgres?sslmode=require",
    },
    {
      name: "With Connection Pooling",
      url: "postgresql://postgres:Eprofile%402025@db.hfggxqoxcvyrqzjydatl.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1",
    },
    {
      name: "Production Optimized",
      url: "postgresql://postgres:Eprofile%402025@db.hfggxqoxcvyrqzjydatl.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1&pool_timeout=10&connect_timeout=60&sslmode=require",
    },
  ];

  for (const config of configs) {
    console.log(`Testing: ${config.name}`);
    const client = new Client({
      connectionString: config.url,
      ssl: { rejectUnauthorized: false },
    });

    try {
      await client.connect();
      console.log(`✅ ${config.name}: SUCCESS`);
      await client.end();
    } catch (error) {
      console.log(`❌ ${config.name}: FAILED - ${error.message}`);
    }
  }
};

const main = async () => {
  await testConnection();
  await testWithDifferentConfigs();

  console.log("\n📋 Next Steps:");
  console.log(
    "1. If connection works locally, update your Vercel environment variables"
  );
  console.log('2. Use the "Production Optimized" URL for best results');
  console.log(
    "3. Redeploy your application after updating environment variables"
  );
  console.log(
    "4. Check Supabase dashboard for any connection limits or issues"
  );
};

main().catch(console.error);

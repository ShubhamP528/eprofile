/**
 * Verification script to test Campaign and Festival Crons locally.
 * Make sure the Next.js dev server is running on http://localhost:3000.
 * 
 * Usage:
 *   node scratch/test-endpoints.js --campaign --step=3 --email=shubham2021prajapati@gmail.com
 *   node scratch/test-endpoints.js --festival --date=2026-11-08 --email=shubham2021prajapati@gmail.com
 */

const http = require("http");

const args = process.argv.slice(2);
const isCampaign = args.includes("--campaign");
const isFestival = args.includes("--festival");
const stepArg = args.find(a => a.startsWith("--step="));
const step = stepArg ? stepArg.split("=")[1] : "1";
const emailArg = args.find(a => a.startsWith("--email="));
const email = emailArg ? emailArg.split("=")[1] : "shubham2021prajapati@gmail.com";
const dateArg = args.find(a => a.startsWith("--date="));
const date = dateArg ? dateArg.split("=")[1] : "2026-11-08"; // Diwali date

if (!isCampaign && !isFestival) {
  console.log("❌ Error: Specify --campaign or --festival");
  console.log("Example:");
  console.log("  node scratch/test-endpoints.js --campaign --step=3 --email=your@email.com");
  console.log("  node scratch/test-endpoints.js --festival --date=2026-11-08 --email=your@email.com");
  process.exit(1);
}

const path = isCampaign 
  ? `/api/cron/campaign?test_email=${encodeURIComponent(email)}&test_step=${step}`
  : `/api/cron/festivals?test_email=${encodeURIComponent(email)}&test_date=${date}`;

console.log(`📡 Sending test trigger to: http://localhost:3000${path}`);

const options = {
  hostname: "localhost",
  port: 3000,
  path: path,
  method: "GET",
  headers: {
    "Authorization": "Bearer development-secret"
  }
};

const req = http.request(options, (res) => {
  let data = "";
  
  res.on("data", (chunk) => {
    data += chunk;
  });
  
  res.on("end", () => {
    console.log(`📊 Status Code: ${res.statusCode}`);
    try {
      const json = JSON.parse(data);
      console.log("📝 Response Body:", JSON.stringify(json, null, 2));
      if (res.statusCode === 200) {
        console.log("🎉 Test successful!");
      } else {
        console.log("❌ Test failed.");
      }
    } catch (e) {
      console.log("📝 Raw Response:", data);
    }
  });
});

req.on("error", (error) => {
  console.error("❌ Connection error. Is your Next.js dev server running on port 3000?", error.message);
});

req.end();

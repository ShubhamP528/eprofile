// Quick debug script to test URL parsing
const testUrl =
  "postgresql://postgres:Eprofile@2025@db.hfggxqoxcvyrqzjydatl.supabase.co:5432/postgres";

console.log("Testing URL:", testUrl);

// Extract the part after postgresql://
const urlPart = testUrl.substring("postgresql://".length);
console.log("URL part:", urlPart);

// Find the last @ symbol to separate credentials from host
const lastAtIndex = urlPart.lastIndexOf("@");
console.log("Last @ index:", lastAtIndex);

const credentials = urlPart.substring(0, lastAtIndex);
const hostPart = urlPart.substring(lastAtIndex + 1);

console.log("Credentials:", credentials);
console.log("Host part:", hostPart);

// Parse credentials (username:password)
const colonIndex = credentials.indexOf(":");
const username = credentials.substring(0, colonIndex);
const password = credentials.substring(colonIndex + 1);

console.log("Username:", username);
console.log("Password:", password);

// Parse host part (host:port/database?params)
const [hostAndPort, ...pathParts] = hostPart.split("/");
console.log("Host and port:", hostAndPort);
console.log("Path parts:", pathParts);

const [host, port] = hostAndPort.split(":");
console.log("Host:", host);
console.log("Port:", port);
console.log("Port is number:", !isNaN(Number(port)));

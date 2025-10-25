// Test the validator directly
const testUrl =
  "postgresql://postgres:Eprofile@2025@db.hfggxqoxcvyrqzjydatl.supabase.co:5432/postgres";

// Simulate the parsing logic
function parseURL(url) {
  if (!url.startsWith("postgresql://")) {
    throw new Error("URL must start with postgresql://");
  }

  const urlPart = url.substring("postgresql://".length);
  const lastAtIndex = urlPart.lastIndexOf("@");

  if (lastAtIndex === -1) {
    throw new Error("URL must contain credentials");
  }

  const credentials = urlPart.substring(0, lastAtIndex);
  const hostPart = urlPart.substring(lastAtIndex + 1);

  const colonIndex = credentials.indexOf(":");
  if (colonIndex === -1) {
    throw new Error("Credentials must contain username:password");
  }

  const username = credentials.substring(0, colonIndex);
  const password = credentials.substring(colonIndex + 1);

  const [hostAndPort, ...pathParts] = hostPart.split("/");
  if (!hostAndPort || pathParts.length === 0) {
    throw new Error("URL must contain host:port/database");
  }

  const [host, port] = hostAndPort.split(":");
  if (!host || !port) {
    throw new Error("Host and port are required");
  }

  const pathAndQuery = pathParts.join("/");
  const [database, queryString] = pathAndQuery.split("?");

  const params = {};
  if (queryString) {
    const urlParams = new URLSearchParams(queryString);
    urlParams.forEach((value, key) => {
      params[key] = value;
    });
  }

  return {
    protocol: "postgresql",
    username,
    password,
    host,
    port,
    database,
    params,
  };
}

try {
  const components = parseURL(testUrl);
  console.log("Parsed components:", components);

  // Validate components
  const errors = [];

  if (!components.username) errors.push("Username is required");
  if (!components.password) errors.push("Password is required");
  if (!components.host) errors.push("Host is required");
  if (!components.port || isNaN(Number(components.port)))
    errors.push("Valid port number is required");
  if (!components.database) errors.push("Database name is required");

  console.log("Validation errors:", errors);
  console.log("Port value:", components.port);
  console.log("Port as number:", Number(components.port));
  console.log("Is port NaN?", isNaN(Number(components.port)));
} catch (error) {
  console.error("Parsing error:", error.message);
}

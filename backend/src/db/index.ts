import { drizzle } from "drizzle-orm/libsql";

// You can specify any property from the libsql connection options
const dbUrl = process.env.TURSO_DB_URL || "file:dev.db";
const authToken = process.env.TURSO_DB_AUTH_TOKEN || undefined;

console.log("[DB Init] URL:", dbUrl?.substring(0, 30) + "...");
console.log("[DB Init] Has auth token:", !!authToken);

export const db = drizzle({
  connection: {
    url: dbUrl,
    authToken: authToken,
  },
});

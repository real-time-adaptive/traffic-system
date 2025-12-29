import { drizzle } from "drizzle-orm/libsql";

// You can specify any property from the libsql connection options
const dbUrl = process.env.TURSO_DB_URL || "file:dev.db";
const authToken = process.env.TURSO_DB_AUTH_TOKEN || undefined;

export const db = drizzle({
  connection: {
    url: dbUrl,
    authToken: authToken,
  },
});

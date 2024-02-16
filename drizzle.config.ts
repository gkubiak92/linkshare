import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.development.local" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  driver: "pg",
  out: "./src/db/migrations",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
  verbose: true,
  strict: true,
});

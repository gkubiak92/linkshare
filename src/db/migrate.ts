import { db } from "@/db";
import { migrate } from "drizzle-orm/postgres-js/migrator";

await migrate(db, { migrationsFolder: "./migrations" });

/**
 * This ensures tests don’t leak data between each other.
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

import "reflect-metadata";
import { sql } from "./src/common/database/sqlConnection";

beforeEach(async () => {
  console.log("⚠️ Truncating suppliers table...");

  await sql({
    text: "TRUNCATE TABLE inventory.suppliers RESTART IDENTITY CASCADE",
  });
});

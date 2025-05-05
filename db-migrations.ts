import fs from "node:fs";
import path from "node:path";
import { sql } from "./src/common/database/sqlConnection";

const MIGRATION_DIR = path.join(__dirname, "src", "migrations");

/**
 * Migrate changes to the database tables
 */
export async function runDBMigration() {
  // Ensure the schema and tracking table exist

  await sql({
    text: `
    CREATE SCHEMA IF NOT EXISTS inventory;
    CREATE TABLE IF NOT EXISTS inventory._migrations(
    id SERIAL PRIMARY KEY,
    filename TEXT NOT NULL UNIQUE,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );`,
  });

  // Get list of already-applied migration filenames
  const applied = await sql({
    text: `SELECT filename FROM inventory._migrations;`,
  });
  const appliedFiles = new Set(applied.rows.map((r) => r.filename));
  console.log({ appliedFiles });

  // Read and sort all SQL files in the migrations directory
  const migratingFiles = fs
    .readdirSync(MIGRATION_DIR)
    .filter((f) => f.endsWith(`.sql`))
    .sort();

  console.log({ migratingFiles });

  for (const file of migratingFiles) {
    if (appliedFiles.has(file)) {
      console.log(`🟡 Skipping already-applied migration: ${file}`);
      continue;
    }

    const queryText = fs.readFileSync(path.join(MIGRATION_DIR, file), "utf8");
    console.log({ queryText });

    console.log(`🔵 Running migration: ${file}`);

    await sql({ text: queryText });

    await sql({
      text: `INSERT INTO inventory._migrations (filename) VALUES ($1)`,
      params: [file],
    });
  }

  console.log("✅ All migrations applied.");
}

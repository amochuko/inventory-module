const childProcess = require("child_process");
const fs = require("node:fs");
const path = require("node:path");
import { DATABASE_URL, sql } from "../common/database/sqlConnection";

const MIGRATION_DIR = "./src/migrations";

function createMigrationTable(filePath: string) {
  if (!DATABASE_URL) {
    console.error("DATABASE_URL not set!");
    process.exit(1);
  }

  const command = `psql ${DATABASE_URL} -f ${filePath}`;
  childProcess.execSync(command, {
    stdio: "inherit",
  });
}

async function runMigration(filePath: string) {
  // createMigrationTable(filePath);

  const files = fs
    .readdirSync(path.resolve(MIGRATION_DIR))
    .filter((file: any) => file.endsWith(".sql"))
    .slice(1)
    .sort();

  try {
    for (const file of files) {
      const [name] = file.split(".sql");

      const res = await sql({
        text: `SELECT * FROM inventory.migrations WHERE name = $1`,
        params: [name],
      });

      if (!res.rowCount) {
        const filePath = path.join(MIGRATION_DIR, file);

        childProcess.execSync(`psql ${DATABASE_URL} -f ${filePath}`, {
          stdio: "inherit",
        });

        await sql({
          text: `INSERT INTO inventory.migrations (name) VALUES ($1) RETURNING *`,
          params: [name],
        });

        console.log(`✅ ${name} was migrated successfully`);
      }
    }
  } catch (err) {
    console.error("Error on query: ", err);
  }
}

async function main() {
  try {
    const res = await sql({ text: `SELECT NOW()`, params: [] });
    // console.log({ currentTime: res.rows });

    await runMigration("src/migrations/000_create_migrations_table.sql");
  } catch (err) {
    console.error(err);
  }
}

main().finally(async () => {
  process.exit(1);
});

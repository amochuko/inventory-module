import pg from "pg";
import env from "../utils/env";

export const dbClient = (() => {
  if (process.env.NODE_ENV === "development") {
    return new pg.Pool({
      host: env.PGHOST_LOCAL,
      user: env.PGUSER_LOCAL,
      database: env.PGDATABASE_LOCAL,
      password: env.PGPASSWORD_LOCAL,
      port: env.PGPORT_LOCAL,
      ssl: false,
    });
  } else if (process.env.NODE_ENV === "test") {
    return new pg.Pool({
      connectionString: env.POSTGRES_TEST_DATABASE_URL,
    });
  } else {
    return new pg.Pool({
      connectionString: env.PGDB_CONNECTION_STRING,
    });
  }
})();

dbClient.on("error", (err) => {
  console.log("Unexpected error on idle client: ", err);
  process.exit(-1);
});

type SQLArgs = {
  text: string;
  params?: any[];
};
export async function sql<T extends pg.QueryResultRow = any>(args: SQLArgs) {
  const client = await dbClient.connect();

  try {
    const result = await client.query<T>(args.text, args.params);
    return result;
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}

// for fetching just one row
export async function queryOne<T extends pg.QueryResultRow = any>(
  query: string,
  params: any[] = []
): Promise<T | null> {
  const result = await sql<T>({ text: query, params });
  return result.rows[0] || null;
}

// Transaction support
export async function withTransaction<T>(
  fn: (client: pg.PoolClient) => Promise<T>
): Promise<T> {
  const client = await dbClient.connect();

  try {
    await client.query("BEGIN");
    const result = await fn(client);
    await client.query("COMMIT");

    return result;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

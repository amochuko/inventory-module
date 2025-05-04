import pg from "pg";
import env from "../utils/env";

let pool: pg.Pool;

const nodeEnv = process.env.NODE_ENV;

export const dbClient = {
  getPool: () => {
    const testConnStr = env.PGDB_TEST_CONNECTION_STRING;
    const devConnStr = env.PGDB_DEV_CONNECTION_STRING;
    const prodConnStr = env.PGDB_PRO_CONNECTION_STRING;

    if (!pool) {
      pool = new pg.Pool({
        connectionString:
          nodeEnv === "test"
            ? testConnStr
            : nodeEnv === "development"
            ? devConnStr
            : prodConnStr,
      });
    }

    return pool;
  },
};

dbClient.getPool().on("connect", async (client) => {
  await client.query(`SET search_path TO inventory;`);
});

dbClient.getPool().on("error", (err) => {
  console.log("Unexpected error on idle client: ", err);
  process.exit(-1);
});

type SQLArgs = {
  text: string;
  params?: any[];
};
export async function sql<T extends pg.QueryResultRow = any>(args: SQLArgs) {
  const client = await dbClient.getPool().connect();
  console.log("🔌 Client acquired");

  try {
    const result = await client.query<T>(args.text, args.params);
    return result;
  } catch (err) {
    console.error("❌ Query error:", err);
    
    if (err instanceof Error) {
      throw err;
    }

    throw new Error(err as any);
  } finally {
    client.release();
    console.log("✅ Client released");
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
  const client = await dbClient.getPool().connect();

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

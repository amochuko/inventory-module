import pg from "pg";
import env from "../utils/env";

export const dbClient =
  process.env.NODE_ENV != "production"
    ? new pg.Pool({
        host: env.PGHOST_LOCAL,
        user: env.PGUSER_LOCAL,
        database: env.PGDATABASE_LOCAL,
        password: env.PGPASSWORD_LOCAL,
        port: env.PGPORT_LOCAL,
        ssl: false,
      })
    : new pg.Pool({
        connectionString: env.PGDB_CONNECTION_STRING,
      });

dbClient.on("error", (err) => {
  console.log("Unexpected error on idle client: ", err);
  process.exit(-1);
});

type SQLArgs = {
  query: string;
  params: (number | string | string[] | Buffer | ArrayBuffer)[];
};
export async function sql(args: SQLArgs) {
  const client = await dbClient.connect();

  try {
    const result = await client.query(args.query, args.params);
    return result;
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}

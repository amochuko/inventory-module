import { PoolClient } from "pg";
import { ErrorCodes } from "../../../error/app.error";

export async function simulateServerError(pool: PoolClient): Promise<void> {
  try {
    await pool.query("SELECT * FROM totally_invalid_table_name");
  } catch (err) {
    throw new Error(ErrorCodes.SERVER_ERROR);
  }
}

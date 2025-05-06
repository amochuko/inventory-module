import { sql } from "../../../common/database/sqlConnection";
import { ErrorCodes } from "../../../common/error/error.codes";

export async function simulateServerError(): Promise<void> {
  try {
    await sql({
      text: "SELECT * FROM totally_invalid_table_name",
    });
  } catch (err) {
    throw new Error(ErrorCodes.SERVER_ERROR);
  }
}

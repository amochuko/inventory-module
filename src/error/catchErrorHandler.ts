import { handlePostgresError } from "../common/database/dbErrorHandler";

export function catchErrorHandler(err: any, resource: string) {
  if (err instanceof Error) {
    throw err;
  }

  if (err.code) {
    throw handlePostgresError(err, resource);
  }

  throw new Error(err);
}

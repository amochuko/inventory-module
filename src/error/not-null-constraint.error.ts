import AppError, { ErrorCodes } from "./app.error";

export class NotNullConstraintError extends AppError {
  constructor(
    resource: string,
    code: ErrorCodes,
    statusCode: number,
    id?: string | number
  ) {
    super(`${resource} cannot have a null for name`.trim()), code, statusCode;
  }
}

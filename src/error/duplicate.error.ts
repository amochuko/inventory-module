import AppError, { ErrorCodes } from "./app.error";

export class DuplicateError extends AppError {
  constructor(
    resource: string,
    code: ErrorCodes,
    statusCode: number,
    id?: string | number
  ) {
    super(`${resource} with this name already exists`.trim()), code, statusCode;
  }
}


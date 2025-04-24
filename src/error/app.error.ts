export enum ErrorCodes {
  CREATION_FAILED = "CREATION_FAILED",
  FETCH_FAILED = "FETCH_FAILED",
  NOT_FOUND = "NOT_FOUND",
  DUPLICATE = "DUPLICATE",
  UNKNOWN = "UNKNOWN",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  SERVER_ERROR = "SERVER_ERROR",
}

export default class AppError extends Error {
  constructor(
    public code: number | ErrorCodes,
    public meta: Record<"ENTITY", Uppercase<string>> | Record<string, any>,
    message: string | ErrorCodes
  ) {
    super(message);
    this.code = code;
    this.meta = meta;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

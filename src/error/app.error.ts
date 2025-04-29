export enum ErrorCodes {
  CREATION_FAILED = "CREATION_FAILED",
  FETCH_FAILED = "FETCH_FAILED",
  NONE_NULL = "NONE_NULL",
  NOT_FOUND = "NOT_FOUND",
  DUPLICATE = "DUPLICATE",
  UNKNOWN = "UNKNOWN",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  SERVER_ERROR = "SERVER_ERROR",
  APP_ERROR = "APP_ERROR",
}

export default class AppError extends Error {
  public statusCode: number;
  public code: ErrorCodes;

  constructor(message: string, code = ErrorCodes.APP_ERROR, statusCode = 500) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

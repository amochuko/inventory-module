export enum ErrorCodes {
  CREATION_FAILED = "CREATION_FAILED",
  FETCH_FAILED = "FETCH_FAILED",
  NOT_FOUND = "NOT_FOUND",
  DUPLICATE = "DUPLICATE",
  UNKNOWN = "UNKNOWN",
}

export default class AppError extends Error {
  constructor(
    public code: ErrorCodes,
    public context: Record<"ENTITY", Uppercase<string>> | Record<string, any>,
    message: string
  ) {
    super(message);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

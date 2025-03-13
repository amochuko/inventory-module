export default class AppError extends Error {
  constructor(statusCode: number, message: string) {
    super(message);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

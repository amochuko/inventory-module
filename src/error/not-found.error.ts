import AppError, { ErrorCodes } from "./app.error";

type NotFoundErrorType = {
  resource: string;
  statusCode?: number;
  id?: string | number;
};
export class NotFoundError extends AppError {
  constructor({ resource, statusCode = 400, id }: NotFoundErrorType) {
    super(
      `${resource} ${id ? `with id '${id}' ` : ""}not found.`.trim(),
      ErrorCodes.NOT_FOUND,
      statusCode
    );
  }
}

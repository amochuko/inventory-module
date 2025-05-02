import AppError, { AppErrorOptions } from "./app.error";
import { ErrorCodes } from "./error.codes";

interface NotFoundErrorOptions extends AppErrorOptions {
  exensions: {
    errors: {
      id: string;
      entity: string;
    };
  };
}

export class NotFoundError extends AppError {
  constructor(msg = "", options: NotFoundErrorOptions) {
    const { id, entity } = options.exensions.errors;

    msg = id ? `${entity} with ID ${id} not found.` : `${entity} not found`;
    super(msg, {
      extensions: {
        code: ErrorCodes.NOT_FOUND,
        statusCode: 404,
        errors: {},
      },
    });
  }
}

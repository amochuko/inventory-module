import AppError from "./app.error";
import { ErrorCodes } from "./error.codes";

// TODO: Update AppError to use this format
type ValidationErrorOptions = {
  extensions: {
    code: ErrorCodes;
    statusCode?: number;
    errors: Record<string, any> | any[];
  };
};

/**
 * This is the ValidationError used to handle neccessary exception
 */
export default class ValidationError extends AppError {
  constructor(
    msg: string = "Invalid data provided",
    options: ValidationErrorOptions
  ) {
    super(msg, options.extensions.code, options.extensions.statusCode);

  }
}

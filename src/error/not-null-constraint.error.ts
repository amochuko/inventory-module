import AppError, { AppErrorOptions } from "./app.error";

interface NotNullConstraintErrorOption extends AppErrorOptions {
  exensions: {
    errors: {
      id?: string;
      entity: string;
    };
  };
}
export class NotNullConstraintError extends AppError {
  constructor(msg: string, options: NotNullConstraintErrorOption) {
    const { id, entity } = options.exensions.errors;
    msg = `${entity} cannot have a null for name`.trim();
    
    super(msg, options);
  }
}

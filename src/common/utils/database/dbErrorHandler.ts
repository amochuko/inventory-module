import AppError, { ErrorCodes } from "../../../error/app.error";

export function handlePostgresError(err: any, entity = "ENTITY") {
  const pgCode = err?.code;
  const message = err?.message || "";

  if (pgCode === "23505" || /duplicate key value/gi.test(message)) {
    return new AppError(
      `${entity} with this name already exists.`,
      ErrorCodes.DUPLICATE
    );
  }

  if (pgCode === "23503") {
    return new AppError(
      "Foreign key constraint failed. Related entity not found.",
      ErrorCodes.NOT_FOUND,
      400
    );
  }

  if (pgCode === "23502") {
    return new AppError(
      "A required field is missing or null.",
      ErrorCodes.VALIDATION_ERROR
    );
  }

  // Default fallback
  return new AppError(
    `Unexpected error occurred while working with ${entity}.`,
    ErrorCodes.SERVER_ERROR
  );
}

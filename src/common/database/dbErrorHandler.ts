import AppError, { ErrorCodes } from "../../error/app.error";
import { DuplicateError } from "../../error/duplicate.error";
import { NotFoundError } from "../../error/not-found.error";

export function handlePostgresError(err: any, entity = "ENTITY") {
  const pgCode = err?.code;
  const message = err?.message || "";

  if (pgCode === "23505" || /duplicate key value/gi.test(message)) {
    throw new DuplicateError(entity, ErrorCodes.DUPLICATE, 201);
  }

  if (pgCode === "23503") {
    throw new NotFoundError({ resource: "RELATED_ENTITY" });
  }

  if (pgCode === "23502") {
    throw new DuplicateError(
      "A required field is missing or null.",
      ErrorCodes.VALIDATION_ERROR,
      201
    );
  }

  // Default fallback
  return new AppError(
    `Unexpected error occurred while working with ${entity}.`,
    ErrorCodes.SERVER_ERROR
  );
}

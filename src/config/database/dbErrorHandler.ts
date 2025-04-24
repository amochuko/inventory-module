import AppError, { ErrorCodes } from "../../error/app.error";

export function handlePostgresError(err: any, entity = "ENTITY") {
  const pgCode = err?.code;
  const message = err?.message || "";

  if (pgCode === "23505" || /duplicate key value/gi.test(message)) {
    return new AppError(
      ErrorCodes.DUPLICATE,
      { ENTITY: entity, FIELD: "name" },
      `${entity} with this name already exists.`
    );
  }

  if (pgCode === "23503") {
    return new AppError(
      ErrorCodes.NOT_FOUND,
      { ENTITY: "RELATED_ENTITY" },
      "Foreign key constraint failed. Related entity not found."
    );
  }

  if (pgCode === "23502") {
    return new AppError(
      ErrorCodes.VALIDATION_ERROR,
      { ENTITY: entity },
      "A required field is missing or null."
    );
  }

  // Default fallback
  return new AppError(
    ErrorCodes.SERVER_ERROR,
    {
      ENTITY: entity,
      DETAIL: message,
    },
    `Unexpected error occurred while working with ${entity}.`
  );
}

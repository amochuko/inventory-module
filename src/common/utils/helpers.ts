import { GraphQLError } from "graphql";

export const parseIntSafe = (value: string): number | null => {
  if (/^(\d+)$/.test(value)) {
    return parseInt(value, 10);
  }

  return null;
};

export const applyTakeConstraints = (params: {
  min: number;
  max: number;
  value: number;
}) => {
  if (params.value < params.min || params.value > params.max) {
    throw new GraphQLError(
      `'take' argument value '${params.value}' is outside the valid range of '${params.min}' to '${params.max}'.`
    );
  }

  return params.value;
};

export function getAbbrevationCodeFromName(name: string) {
  const nameArr = name.split(" ");

  return nameArr.length > 1
    ? nameArr
        .map((n) => n.substring(0, 1))
        .join("")
        .substring(0, 3)
        .toUpperCase() +
        "-" +
        name.length
    : name.substring(0, 3).toUpperCase() + "-" + name.length;
}

export function generateStockKeepingUnit(
  categoryCode: string,
  productName: string,
  productId: string
): string {
  const abbrev = productName
    .replace(/[^A-Za-z0-9]/g, "") // remove special chars
    .substring(0, 5)
    .toUpperCase();

  const paddedId = productId.substring(0, 3).padStart(3, "0");

  return `${categoryCode}-${abbrev}-${paddedId}`;
}

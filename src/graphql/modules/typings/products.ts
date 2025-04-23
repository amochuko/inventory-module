import { Product } from "../../generated-types/graphql";

export type CreateProductArgs = Omit<
  Product,
  "id" | "created_at" | "updated_at" | "__typename"
>;

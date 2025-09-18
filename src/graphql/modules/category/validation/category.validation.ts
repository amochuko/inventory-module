import { z } from "zod";

export const CategoryIdSchema = z.object({
  id: z
    .string({
      required_error: "ID must not be empty",
      invalid_type_error: "ID must be a string",
    })
    .min(1, { message: "ID cannot be empty" })
    .trim(),
});

export const CategoryCreateArgSchema = z.object({
  description: z
    .string({
      required_error: "Description must not be empty",
      invalid_type_error: "Description must be a string",
    })
    .trim()
    .min(1, { message: "Description is required." }),
  name: z
    .string({
      required_error: "Name must not be empty",
      invalid_type_error: "Name must be a string",
    })
    .trim()
    .min(2, { message: "Name is required." }),
});

// export const CategoryUpdateArgSchema = CategoryCreateArgSchema.optional();
export const CategoryUpdateArgSchema = CategoryCreateArgSchema.partial();

export type CategoryCreateInput = z.infer<typeof CategoryCreateArgSchema>;
export type CategoryCreateArgs = CategoryCreateInput;

export const CategoryFilterOptionsSchema = z.object({
  byName: z.enum(["NAME"]).optional(),
  skip: z.number().int().min(0).optional(),
  take: z.number().int().min(1).max(100).optional(),
  term: z.string().min(2).optional(),
});

export const CategoryFilterSchema = z.object({
  filter: CategoryFilterOptionsSchema.optional(),
});

export type CategoryFilterArgs = z.infer<typeof CategoryFilterSchema>;

import { z } from "zod";

// This is the validation module for the supplier DTO

// SupplierCreateSchema
export const SupplierCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  address: z.string().min(1, "Address is required"),
  description: z.string().min(10, "Description is required"),
  phone: z.string().regex(/^\d{10,15}$/, "Phone must be 10–15 digits"),
});

// SupplierCreateArgs
export type SupplierCreateArgs = z.infer<typeof SupplierCreateSchema>;

// SupplierIdSchema
export const SupplierIdSchema = z.string().uuid("Invalid UUID format");

// SupplierUpdateEmailSchema
export const SupplierUpdateEmailSchema = z.object({
  id: z.string().uuid("Invalid UUID format"),
  newEmail: z.string().email("Invalid eamil format"),
});

// SupplierUpdateEmailArgs
export type SupplierUpdateEmailArgs = z.infer<typeof SupplierUpdateEmailSchema>;

// SupplierUpdateSchema
export const SupplierUpdateSchema = SupplierCreateSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be provided for update." }
);
// SupplierUpdateArgs
export type SupplierUpdateArgs = z.infer<typeof SupplierUpdateSchema>;

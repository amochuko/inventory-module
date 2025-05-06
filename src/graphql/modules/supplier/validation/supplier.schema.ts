import { z } from "zod";

export const CreateSupplierSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  address: z.string().min(1, "Address is required"),
  description: z.string().min(10, "Description is required"),
  phone: z.string().regex(/^\d{10,15}$/, "Phone must be 10–15 digits"),
});

export type CreateSupplierArgs = z.infer<typeof CreateSupplierSchema>;

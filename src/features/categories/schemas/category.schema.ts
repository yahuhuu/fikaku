import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().trim().min(1, "Category name is required").max(80),
  type: z.enum(["INCOME", "EXPENSE"]),
  color: z.string().trim().max(32).optional(),
  icon: z.string().trim().max(64).optional(),
});

export type CategoryInput = z.input<typeof categorySchema>;

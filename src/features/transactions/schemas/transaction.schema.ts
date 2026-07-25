import { z } from "zod";

export const transactionTypeSchema = z.enum(["INCOME", "EXPENSE"]);

export const transactionSchema = z.object({
  type: transactionTypeSchema,
  amount: z.coerce.number().positive("Amount must be greater than zero"),
  categoryId: z.string().trim().min(1).optional(),
  walletId: z.string().trim().min(1).optional(),
  familyId: z.string().trim().min(1).optional(),
  description: z.string().trim().max(255).optional(),
  date: z.coerce.date(),
});

export type TransactionInput = z.input<typeof transactionSchema>;

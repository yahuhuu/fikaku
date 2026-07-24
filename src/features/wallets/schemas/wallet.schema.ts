import { z } from "zod";

export const walletSchema = z.object({
  name: z.string().trim().min(1, "Wallet name is required").max(80),
  balance: z.coerce.number().min(0, "Balance cannot be negative"),
  currency: z.string().trim().min(3).max(3).transform((currency) => currency.toUpperCase()),
});

export type WalletInput = z.input<typeof walletSchema>;

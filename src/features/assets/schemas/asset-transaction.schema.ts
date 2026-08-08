import { z } from "zod";

export const assetTransactionTypeSchema = z.enum(["BUY", "SELL", "TOP_UP", "WITHDRAW", "DIVIDEND", "INTEREST", "FEE", "ADJUSTMENT"]);
const optionalNumber = z.preprocess((value) => value === "" || value === undefined || value === null ? undefined : value, z.coerce.number().nonnegative().optional());

export const assetTransactionSchema = z.object({
  assetId: z.string().trim().min(1, "Asset is required"),
  type: assetTransactionTypeSchema,
  quantity: optionalNumber,
  price: optionalNumber,
  amount: z.coerce.number().nonnegative("Amount must be zero or more"),
  date: z.coerce.date(),
  notes: z.string().trim().max(500).optional(),
}).superRefine((data, ctx) => {
  if (["BUY", "SELL"].includes(data.type)) {
    if (data.quantity === undefined || data.quantity <= 0) ctx.addIssue({ code: "custom", message: "Quantity is required", path: ["quantity"] });
    if (data.price === undefined || data.price <= 0) ctx.addIssue({ code: "custom", message: "Price is required", path: ["price"] });
  }
  if (data.amount <= 0) ctx.addIssue({ code: "custom", message: "Amount must be greater than zero", path: ["amount"] });
});

export type AssetTransactionInput = z.input<typeof assetTransactionSchema>;

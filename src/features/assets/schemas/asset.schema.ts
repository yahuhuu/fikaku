import { z } from "zod";

export const assetTypeSchema = z.enum(["STOCK", "MONEY_MARKET_MUTUAL_FUND", "EQUITY_MUTUAL_FUND", "FIXED_INCOME_MUTUAL_FUND", "BALANCED_MUTUAL_FUND", "CRYPTO", "DEPOSIT", "DIGITAL_BANK", "GOLD", "BOND", "OTHER"]);
export const assetValuationModeSchema = z.enum(["MANUAL_VALUE", "QUANTITY_PRICE"]);

const optionalNumber = z.preprocess((value) => value === "" || value === undefined || value === null ? undefined : value, z.coerce.number().nonnegative().optional());

export const assetSchema = z.object({
  familyId: z.string().trim().min(1).optional(),
  name: z.string().trim().min(2, "Asset name is required").max(100),
  symbol: z.string().trim().max(24).optional(),
  type: assetTypeSchema,
  valuationMode: assetValuationModeSchema,
  quantity: optionalNumber,
  currentPrice: optionalNumber,
  costBasis: z.coerce.number().nonnegative("Cost basis must be zero or more"),
  currentValue: optionalNumber,
  platform: z.string().trim().max(100).optional(),
  notes: z.string().trim().max(500).optional(),
}).superRefine((data, ctx) => {
  if (data.valuationMode === "QUANTITY_PRICE") {
    if (data.quantity === undefined) ctx.addIssue({ code: "custom", message: "Quantity is required", path: ["quantity"] });
    if (data.currentPrice === undefined) ctx.addIssue({ code: "custom", message: "Current price is required", path: ["currentPrice"] });
  }
  if (data.valuationMode === "MANUAL_VALUE" && data.currentValue === undefined) {
    ctx.addIssue({ code: "custom", message: "Current value is required", path: ["currentValue"] });
  }
});

export type AssetInput = z.input<typeof assetSchema>;

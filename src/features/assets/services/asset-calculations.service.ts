export function deriveAssetValues(data: {
  valuationMode: "MANUAL_VALUE" | "QUANTITY_PRICE";
  quantity?: number;
  currentPrice?: number;
  costBasis: number;
  currentValue?: number;
}) {
  if (data.valuationMode === "QUANTITY_PRICE") {
    const quantity = data.quantity ?? 0;
    const currentPrice = data.currentPrice ?? 0;
    const currentValue = quantity * currentPrice;
    const averageCost = quantity > 0 ? data.costBasis / quantity : 0;
    return { quantity, currentPrice, currentValue, averageCost };
  }
  return { quantity: undefined, currentPrice: undefined, currentValue: data.currentValue ?? 0, averageCost: undefined };
}

export function normalizeSymbol(symbol?: string) {
  const trimmed = symbol?.trim();
  return trimmed ? trimmed.toUpperCase() : undefined;
}

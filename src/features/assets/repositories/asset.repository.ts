export type AssetType = "STOCK" | "MONEY_MARKET_MUTUAL_FUND" | "EQUITY_MUTUAL_FUND" | "FIXED_INCOME_MUTUAL_FUND" | "BALANCED_MUTUAL_FUND" | "CRYPTO" | "DEPOSIT" | "DIGITAL_BANK" | "GOLD" | "BOND" | "OTHER";
export type AssetValuationMode = "MANUAL_VALUE" | "QUANTITY_PRICE";
export type AssetTransactionType = "BUY" | "SELL" | "TOP_UP" | "WITHDRAW" | "DIVIDEND" | "INTEREST" | "FEE" | "ADJUSTMENT";

export type AssetListItem = {
  id: string;
  userId: string;
  familyId: string | null;
  name: string;
  symbol: string | null;
  type: AssetType;
  valuationMode: AssetValuationMode;
  quantity: number | null;
  averageCost: number | null;
  currentPrice: number | null;
  costBasis: number;
  currentValue: number;
  platform: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UpsertAssetData = {
  userId: string;
  familyId?: string;
  name: string;
  symbol?: string;
  type: AssetType;
  valuationMode: AssetValuationMode;
  quantity?: number;
  averageCost?: number;
  currentPrice?: number;
  costBasis: number;
  currentValue: number;
  platform?: string;
  notes?: string;
};

export type UpdateAssetData = Omit<UpsertAssetData, "userId">;

export type AssetTransactionListItem = {
  id: string;
  assetId: string;
  userId: string;
  type: AssetTransactionType;
  quantity: number | null;
  price: number | null;
  amount: number;
  date: Date;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateAssetTransactionData = {
  assetId: string;
  userId: string;
  type: AssetTransactionType;
  quantity?: number;
  price?: number;
  amount: number;
  date: Date;
  notes?: string;
};

export type AssetRepository = {
  create(data: UpsertAssetData): Promise<AssetListItem>;
  listVisible(data: { userId: string; familyIds: string[] }): Promise<AssetListItem[]>;
  findById(id: string): Promise<AssetListItem | null>;
  updateById(id: string, data: UpdateAssetData): Promise<AssetListItem | null>;
  deleteById(id: string): Promise<boolean>;
};

export type AssetTransactionRepository = {
  create(data: CreateAssetTransactionData): Promise<AssetTransactionListItem>;
  listByAsset(assetId: string): Promise<AssetTransactionListItem[]>;
};

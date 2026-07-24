export type WalletListItem = {
  id: string;
  userId: string;
  name: string;
  balance: number;
  currency: string;
};

export type CreateWalletData = {
  userId: string;
  name: string;
  balance: number;
  currency: string;
};

export type WalletRepository = {
  create(data: CreateWalletData): Promise<WalletListItem>;
  listByUser(userId: string): Promise<WalletListItem[]>;
  deleteByUser(id: string, userId: string): Promise<boolean>;
};

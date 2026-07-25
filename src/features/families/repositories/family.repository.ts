export type FamilyRole = "OWNER" | "MEMBER";
export type FamilyTransactionMode = "AUTO_FAMILY" | "ALLOW_PERSONAL";

export type FamilyListItem = {
  id: string;
  name: string;
  transactionMode: FamilyTransactionMode;
  role: FamilyRole;
  memberCount: number;
};

export type FamilyMemberListItem = {
  id: string;
  userId: string;
  name: string | null;
  email: string;
  role: FamilyRole;
};

export type FamilyDetail = FamilyListItem & { members: FamilyMemberListItem[] };

export type CreateFamilyData = { userId: string; name: string; transactionMode: FamilyTransactionMode };
export type UpdateFamilySettingsData = { familyId: string; userId: string; name: string; transactionMode: FamilyTransactionMode };

export type AddFamilyMemberResult = { ok: true; member: FamilyMemberListItem } | { ok: false; error: string };

export type FamilyRepository = {
  create(data: CreateFamilyData): Promise<FamilyListItem>;
  listForUser(userId: string): Promise<FamilyDetail[]>;
  addMemberByEmail(data: { familyId: string; ownerId: string; email: string }): Promise<AddFamilyMemberResult>;
  updateSettings(data: UpdateFamilySettingsData): Promise<FamilyListItem | null>;
  isMember(data: { familyId: string; userId: string }): Promise<boolean>;
  canEditFamilyTransaction(data: { familyId: string; userId: string }): Promise<boolean>;
  canDeleteFamilyTransaction(data: { familyId: string; transactionOwnerId: string; userId: string }): Promise<boolean>;
};

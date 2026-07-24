export type ProfileUser = {
  id: string;
  name: string | null;
  email: string;
};

export type ProfileRepository = {
  findPasswordHashByUserId(userId: string): Promise<string | null>;
  updateUser(data: { userId: string; name: string; email: string }): Promise<ProfileUser>;
  updatePassword(userId: string, passwordHash: string): Promise<boolean>;
};

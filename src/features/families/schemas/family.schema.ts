import { z } from "zod";

export const familyTransactionModeSchema = z.enum(["AUTO_FAMILY", "ALLOW_PERSONAL"]);

export const createFamilySchema = z.object({
  name: z.string().trim().min(2, "Family name is required").max(80),
  transactionMode: familyTransactionModeSchema.default("AUTO_FAMILY"),
});

export const addFamilyMemberSchema = z.object({
  familyId: z.string().trim().min(1, "Family is required"),
  email: z.string().trim().email("Registered member email is required"),
});

export const updateFamilySettingsSchema = z.object({
  familyId: z.string().trim().min(1, "Family is required"),
  name: z.string().trim().min(2, "Family name is required").max(80),
  transactionMode: familyTransactionModeSchema,
});

export type CreateFamilyInput = z.input<typeof createFamilySchema>;
export type AddFamilyMemberInput = z.input<typeof addFamilyMemberSchema>;
export type UpdateFamilySettingsInput = z.input<typeof updateFamilySettingsSchema>;

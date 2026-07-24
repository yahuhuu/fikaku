import { z } from "zod";

export const adminUserControlsSchema = z.object({
  userId: z.string().min(1, "User id is required"),
  role: z.enum(["USER", "ADMIN"]),
  plan: z.enum(["FREE", "PRO", "BUSINESS"]),
  status: z.enum(["ACTIVE", "CANCELED", "EXPIRED"]),
});

export type AdminUserControlsInput = z.input<typeof adminUserControlsSchema>;

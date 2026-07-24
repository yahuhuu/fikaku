"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { updateProfile } from "../services/update-profile.service";
import { prismaProfileRepository } from "../repositories/prisma-profile.repository";

export async function updateProfileAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  const result = await updateProfile(
    { name: String(formData.get("name") ?? ""), email: String(formData.get("email") ?? "") },
    { userId: session.user.id, profileRepository: prismaProfileRepository },
  );
  if (!result.ok) redirect(`/settings?error=${encodeURIComponent(result.error)}`);
  revalidatePath("/settings");
  redirect("/settings?updated=1");
}

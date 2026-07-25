"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { prismaFamilyRepository } from "../repositories/prisma-family.repository";
import { addFamilyMember } from "../services/add-family-member.service";

export async function addFamilyMemberAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const result = await addFamilyMember({
    familyId: String(formData.get("familyId") ?? ""),
    email: String(formData.get("email") ?? ""),
  }, { ownerId: session.user.id, familyRepository: prismaFamilyRepository });

  if (result.ok === false) redirect(`/families?error=${encodeURIComponent(result.error)}`);
  revalidatePath("/families");
  redirect("/families?memberAdded=1");
}

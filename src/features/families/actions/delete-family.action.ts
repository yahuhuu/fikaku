"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { prismaFamilyRepository } from "../repositories/prisma-family.repository";
import { deleteFamily } from "../services/delete-family.service";

export async function deleteFamilyAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const result = await deleteFamily(
    { familyId: String(formData.get("familyId") ?? "") },
    { userId: session.user.id, familyRepository: prismaFamilyRepository },
  );

  if (result.ok === false) redirect(`/families?error=${encodeURIComponent(result.error)}`);

  revalidatePath("/families");
  revalidatePath("/transactions");
  revalidatePath("/reports");
  redirect("/families?deleted=1");
}

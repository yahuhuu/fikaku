"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { prismaFamilyRepository } from "../repositories/prisma-family.repository";
import { createFamily } from "../services/create-family.service";

export async function createFamilyAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const result = await createFamily({
    name: String(formData.get("name") ?? ""),
    transactionMode: formData.get("transactionMode") === "ALLOW_PERSONAL" ? "ALLOW_PERSONAL" : "AUTO_FAMILY",
  }, { userId: session.user.id, familyRepository: prismaFamilyRepository });

  if (result.ok === false) redirect(`/families?error=${encodeURIComponent(result.error)}`);
  revalidatePath("/families");
  revalidatePath("/transactions");
  redirect("/families?created=1");
}

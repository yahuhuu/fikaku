"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { prismaTransactionRepository } from "../repositories/prisma-transaction.repository";

export async function deleteTransactionAction(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const id = String(formData.get("id") ?? "");

  if (id) {
    await prismaTransactionRepository.deleteByUser(id, session.user.id);
  }

  revalidatePath("/transactions");
  revalidatePath("/dashboard");
  revalidatePath("/reports");
  redirect("/transactions?deleted=1");
}

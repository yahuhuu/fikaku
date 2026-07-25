import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { FamiliesPage } from "@/features/families/components/families-page";
import { authOptions } from "@/shared/lib/auth";

type PageProps = {
  searchParams: Promise<{ created?: string; updated?: string; memberAdded?: string; deleted?: string; error?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  return <FamiliesPage userId={session.user.id} searchParams={await searchParams} />;
}

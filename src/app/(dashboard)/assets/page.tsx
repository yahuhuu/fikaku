import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { AssetsPage } from "@/features/assets/components/assets-page";
import { authOptions } from "@/shared/lib/auth";

type PageProps = {
  searchParams: Promise<{ created?: string; updated?: string; deleted?: string; transactionAdded?: string; error?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  return <AssetsPage userId={session.user.id} searchParams={await searchParams} />;
}

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { ReportsPage } from "@/features/reports/components/reports-page";
import { authOptions } from "@/shared/lib/auth";

type PageProps = {
  searchParams: Promise<{
    month?: string;
    familyId?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  return <ReportsPage userId={session.user.id} searchParams={await searchParams} />;
}

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { DashboardPage } from "@/features/dashboard/components/dashboard-page";
import { authOptions } from "@/shared/lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  return <DashboardPage userId={session.user.id} />;
}

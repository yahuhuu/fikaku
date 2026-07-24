import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { DashboardShell } from "@/shared/components/layout/dashboard-shell";
import { authOptions } from "@/shared/lib/auth";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return <DashboardShell>{children}</DashboardShell>;
}

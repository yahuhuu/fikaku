import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";

export default async function SubscriptionsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  return (
    <main className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#53b6e0]">Subscription</p>
        <h1 className="mt-2 text-3xl font-bold text-[#000000]">Subscriptions</h1>
        <p className="mt-2 max-w-2xl text-[#94a3b8]">Kelola informasi paket dan status subscription akun kamu.</p>
      </div>
      <section className="rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#000000]">Plan saat ini</h2>
        <p className="mt-2 text-[#94a3b8]">Manajemen subscription detail akan ditambahkan di iterasi berikutnya.</p>
      </section>
    </main>
  );
}

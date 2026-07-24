import Link from "next/link";

export default function AdminUsersPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-8 text-slate-950">
      <section className="mx-auto max-w-5xl space-y-6">
        <Link className="font-black text-emerald-700" href="/admin">← Admin</Link>
        <h1 className="text-3xl font-bold">Users</h1>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-500">User table scaffold. Hubungkan ke MySQL lewat Prisma repository setelah auth aktif.</div>
      </section>
    </main>
  );
}

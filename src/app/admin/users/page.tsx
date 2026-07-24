import Link from "next/link";

export default function AdminUsersPage() {
  return (
    <main className="min-h-screen bg-white p-8 text-[#000000]">
      <section className="mx-auto max-w-5xl space-y-6">
        <Link className="font-black text-[#53b6e0]" href="/admin">← Admin</Link>
        <h1 className="text-3xl font-bold">Users</h1>
        <div className="rounded-2xl border border-[#e5e5e5] bg-white p-8 text-[#94a3b8]">User table scaffold. Hubungkan ke MySQL lewat Prisma repository setelah auth aktif.</div>
      </section>
    </main>
  );
}

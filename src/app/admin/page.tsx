import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-white p-8 text-[#000000]">
      <section className="mx-auto max-w-5xl space-y-6">
        <Link className="font-black text-[#53b6e0]" href="/dashboard">← fikaku dashboard</Link>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#53b6e0]">Admin</p>
          <h1 className="mt-3 text-3xl font-bold">Admin dashboard</h1>
          <p className="mt-2 text-[#94a3b8]">Area admin untuk users, subscriptions, dan SaaS metrics.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {["Total users", "Active subscriptions", "MRR placeholder"].map((item) => (
            <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-sm" key={item}>
              <p className="text-sm text-[#94a3b8]">{item}</p>
              <p className="mt-3 text-3xl font-black">0</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

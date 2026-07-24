import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-8 text-slate-950">
      <section className="mx-auto max-w-5xl space-y-6">
        <Link className="font-black text-emerald-700" href="/dashboard">← fikaku dashboard</Link>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">Admin</p>
          <h1 className="mt-3 text-3xl font-bold">Admin dashboard</h1>
          <p className="mt-2 text-slate-600">Area admin untuk users, subscriptions, dan SaaS metrics.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {["Total users", "Active subscriptions", "MRR placeholder"].map((item) => (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" key={item}>
              <p className="text-sm text-slate-500">{item}</p>
              <p className="mt-3 text-3xl font-black">0</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

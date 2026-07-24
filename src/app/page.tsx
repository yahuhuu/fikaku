import Link from "next/link";

const features = [
  "Multi-user SaaS ready",
  "Transaction, wallet, category",
  "Monthly report foundation",
  "Admin and subscription structure",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#d1fae5,transparent_40%),#f8fafc] px-6 py-8 text-slate-950">
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        <Link className="text-2xl font-black text-emerald-700" href="/">fikaku</Link>
        <div className="flex items-center gap-3 text-sm font-semibold">
          <Link className="text-slate-600 hover:text-emerald-700" href="/pricing">Pricing</Link>
          <Link className="rounded-full border border-slate-300 px-4 py-2 text-slate-700" href="/login">Login</Link>
          <Link className="rounded-full bg-emerald-600 px-4 py-2 text-white" href="/register">Register</Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-6xl gap-10 py-24 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-600">Personal Finance SaaS</p>
          <h1 className="mt-6 text-5xl font-black tracking-tight md:text-7xl">Kelola uang lebih jelas dengan fikaku.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Fikaku adalah fondasi SaaS untuk mencatat pemasukan, pengeluaran, wallet, kategori, dan laporan bulanan berbasis Next.js + MySQL.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="rounded-2xl bg-emerald-600 px-6 py-4 font-bold text-white shadow-lg shadow-emerald-200" href="/dashboard">Lihat dashboard</Link>
            <Link className="rounded-2xl border border-slate-300 bg-white px-6 py-4 font-bold text-slate-800" href="/transactions">Cek transaksi</Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-white bg-white/80 p-6 shadow-2xl shadow-emerald-100 backdrop-blur">
          <p className="text-sm font-semibold text-slate-500">MVP architecture</p>
          <div className="mt-5 space-y-3">
            {features.map((feature) => (
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 font-semibold text-slate-700" key={feature}>✓ {feature}</div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

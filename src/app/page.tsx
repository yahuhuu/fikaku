import Link from "next/link";

const features = [
  "Multi-user SaaS ready",
  "Transaction, wallet, category",
  "Monthly report foundation",
  "Admin and subscription structure",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white px-4 py-6 text-[#000000] md:px-8">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-[#e5e5e5] bg-white px-4 py-3 shadow-[0_10px_30px_rgba(83,182,224,0.10)]">
        <Link className="text-2xl font-black text-[#53b6e0]" href="/">fikaku</Link>
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Link className="rounded-xl px-3 py-2 text-[#94a3b8] hover:bg-[#e5fbff] hover:text-[#53b6e0]" href="/pricing">Pricing</Link>
          <Link className="rounded-xl border border-[#e5e5e5] px-4 py-2 text-[#000000] hover:bg-[#e5fbff]" href="/login">Login</Link>
          <Link className="rounded-xl bg-[#53b6e0] px-4 py-2 text-white shadow-[0_10px_24px_rgba(83,182,224,0.24)]" href="/register">Register</Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-6xl gap-8 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#53b6e0]">Personal Finance SaaS</p>
          <h1 className="mt-6 max-w-2xl text-[30px] font-black leading-tight tracking-tight md:text-[42px]">Kelola uang lebih jelas dengan fikaku.</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#94a3b8]">Fikaku adalah fondasi SaaS untuk mencatat pemasukan, pengeluaran, wallet, kategori, dan laporan bulanan berbasis Next.js + MySQL.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="rounded-xl bg-[#53b6e0] px-6 py-4 font-bold text-white shadow-[0_10px_24px_rgba(83,182,224,0.24)]" href="/dashboard">Lihat dashboard</Link>
            <Link className="rounded-xl border border-[#e5e5e5] bg-white px-6 py-4 font-bold text-[#000000] hover:bg-[#e5fbff]" href="/transactions">Cek transaksi</Link>
          </div>
        </div>
        <div className="rounded-2xl border border-[#e5e5e5] bg-[#e5fbff] p-6 shadow-[0_10px_30px_rgba(83,182,224,0.12)]">
          <p className="text-sm font-semibold text-[#94a3b8]">MVP architecture</p>
          <div className="mt-5 space-y-4">
            {features.map((feature) => (
              <div className="rounded-2xl border border-[#e5e5e5] bg-white p-4 font-semibold text-[#000000]" key={feature}>✓ {feature}</div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

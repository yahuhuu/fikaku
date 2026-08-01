import Link from "next/link";

const plans = [
  { name: "Free", price: "Rp0", features: ["100 transaksi/bulan", "1 wallet", "Dashboard basic"] },
  { name: "Pro", price: "Rp49rb", features: ["Unlimited transaksi", "Multi wallet", "Reports & export"] },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-6 text-[#000000] md:px-8">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-[#e5e5e5] bg-white px-4 py-3 shadow-[0_10px_30px_rgba(83,182,224,0.10)]">
        <Link className="text-2xl font-black text-[#53b6e0]" href="/">fikaku</Link>
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Link className="rounded-xl px-3 py-2 text-[#94a3b8] hover:bg-[#e5fbff] hover:text-[#53b6e0]" href="/">Home</Link>
          <Link className="rounded-xl border border-[#e5e5e5] px-4 py-2 text-[#000000] hover:bg-[#e5fbff]" href="/login">Login</Link>
          <Link className="rounded-xl bg-[#53b6e0] px-4 py-2 text-white shadow-[0_10px_24px_rgba(83,182,224,0.24)]" href="/register">Register</Link>
        </div>
      </nav>

      <section className="mx-auto max-w-5xl py-16">
        <p className="font-bold uppercase tracking-[0.3em] text-[#53b6e0]">Pricing</p>
        <h1 className="mt-4 text-4xl font-black text-[#000000]">Plan SaaS fikaku</h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <article className="rounded-2xl border border-[#e5e5e5] bg-white p-8 shadow-sm" key={plan.name}>
              <h2 className="text-2xl font-bold">{plan.name}</h2>
              <p className="mt-4 text-4xl font-black text-[#53b6e0]">{plan.price}</p>
              <ul className="mt-6 space-y-3 text-[#94a3b8]">{plan.features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

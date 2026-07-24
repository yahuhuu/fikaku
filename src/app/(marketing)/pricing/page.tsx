const plans = [
  { name: "Free", price: "Rp0", features: ["100 transaksi/bulan", "1 wallet", "Dashboard basic"] },
  { name: "Pro", price: "Rp49rb", features: ["Unlimited transaksi", "Multi wallet", "Reports & export"] },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16">
      <section className="mx-auto max-w-5xl">
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

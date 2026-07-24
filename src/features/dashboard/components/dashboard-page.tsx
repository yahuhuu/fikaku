import { SummaryCards } from "./summary-cards";
import { calculateDashboardSummary } from "../services/calculate-dashboard-summary.service";

const sampleTransactions = [
  { type: "INCOME" as const, amount: 8_500_000 },
  { type: "EXPENSE" as const, amount: 1_250_000 },
  { type: "EXPENSE" as const, amount: 450_000 },
];

export function DashboardPage() {
  const summary = calculateDashboardSummary(sampleTransactions);

  return (
    <main className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Fikaku Dashboard</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-950">Ringkasan keuangan</h1>
        <p className="mt-2 max-w-2xl text-slate-600">MVP awal menyiapkan struktur SaaS, schema MySQL, dan fondasi feature-driven untuk transaksi, wallet, kategori, laporan, subscription, dan admin.</p>
      </div>
      <SummaryCards {...summary} />
      <section className="rounded-3xl border border-dashed border-emerald-300 bg-emerald-50 p-6 text-emerald-900">
        <h2 className="font-semibold">Next step</h2>
        <p className="mt-2 text-sm">Isi DATABASE_URL MySQL VPS, lalu jalankan Prisma migration sebelum menghubungkan form ke database.</p>
      </section>
    </main>
  );
}

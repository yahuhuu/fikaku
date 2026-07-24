import { SummaryCards } from "./summary-cards";
import { getDashboardSummary } from "../queries/get-dashboard-summary.query";

type DashboardPageProps = {
  userId: string;
};

export async function DashboardPage({ userId }: DashboardPageProps) {
  const month = new Date().toISOString().slice(0, 7);
  const summary = await getDashboardSummary({ userId, month });

  return (
    <main className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#53b6e0]">Fikaku Dashboard</p>
        <h1 className="mt-3 text-3xl font-bold text-[#000000]">Ringkasan keuangan</h1>
        <p className="mt-2 max-w-2xl text-[#94a3b8]">Dashboard ini memakai transaksi real dari MySQL untuk bulan berjalan.</p>
      </div>
      <SummaryCards {...summary} />
      <section className="rounded-2xl border border-dashed border-[#53b6e0]/30 bg-[#e5fbff] p-6 text-emerald-900">
        <h2 className="font-semibold">Mulai input data</h2>
        <p className="mt-2 text-sm">Buka menu Transactions untuk menambahkan pemasukan dan pengeluaran pertama.</p>
      </section>
    </main>
  );
}

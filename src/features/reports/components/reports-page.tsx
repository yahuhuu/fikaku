import { CategoryBreakdown } from "./category-breakdown";
import { CashflowTable } from "./cashflow-table";
import { ReportSummaryCards } from "./report-summary-cards";
import { getMonthlyReport } from "../queries/get-monthly-report.query";

type ReportsPageProps = {
  userId: string;
  searchParams?: {
    month?: string;
  };
};

export async function ReportsPage({ userId, searchParams }: ReportsPageProps) {
  const selectedMonth = searchParams?.month ?? new Date().toISOString().slice(0, 7);
  const report = await getMonthlyReport({ userId, month: selectedMonth });

  return (
    <main className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#53b6e0]">Monthly report</p>
          <h1 className="mt-2 text-3xl font-bold text-[#000000]">Reports</h1>
          <p className="mt-2 max-w-2xl text-[#94a3b8]">Pantau ringkasan income, expense, breakdown kategori, dan cashflow harian.</p>
        </div>
        <form className="flex gap-3 rounded-2xl border border-[#e5e5e5] bg-white p-3 shadow-sm">
          <input className="rounded-xl border border-[#e5e5e5] px-4 py-3 text-[#000000]" defaultValue={selectedMonth} name="month" type="month" />
          <button className="rounded-xl bg-[#111033] px-4 py-3 font-semibold text-white" type="submit">Filter</button>
        </form>
      </div>

      <ReportSummaryCards summary={report.summary} />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <CategoryBreakdown items={report.expenseByCategory} />
        <CashflowTable rows={report.dailyCashflow} />
      </div>
    </main>
  );
}

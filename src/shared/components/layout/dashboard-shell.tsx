import Link from "next/link";

const navItems = [
  ["Dashboard", "/dashboard"],
  ["Transactions", "/transactions"],
  ["Categories", "/categories"],
  ["Wallets", "/wallets"],
  ["Reports", "/reports"],
  ["Settings", "/settings"],
  ["Admin", "/admin"],
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <aside className="fixed hidden h-screen w-64 border-r border-slate-200 bg-white p-6 md:block">
        <Link className="text-2xl font-black text-emerald-700" href="/dashboard">fikaku</Link>
        <nav className="mt-10 space-y-1">
          {navItems.map(([label, href]) => (
            <Link className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-700" href={href} key={href}>{label}</Link>
          ))}
        </nav>
      </aside>
      <div className="md:pl-64">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/85 px-6 py-4 backdrop-blur">
          <p className="font-semibold text-slate-700">Personal Finance SaaS</p>
        </header>
        <div className="p-6 md:p-10">{children}</div>
      </div>
    </div>
  );
}

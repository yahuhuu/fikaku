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
    <div className="min-h-screen bg-white text-[#000000]">
      <aside className="fixed hidden h-screen w-64 border-r border-[#e5e5e5] bg-white p-6 md:block">
        <Link className="text-2xl font-black text-[#53b6e0]" href="/dashboard">fikaku</Link>
        <nav className="mt-10 space-y-2">
          {navItems.map(([label, href]) => (
            <Link className="block rounded-2xl px-4 py-3 text-sm font-medium text-[#94a3b8] hover:bg-[#e5fbff] hover:text-[#53b6e0]" href={href} key={href}>{label}</Link>
          ))}
        </nav>
      </aside>
      <div className="md:pl-64">
        <header className="sticky top-0 z-10 border-b border-[#e5e5e5] bg-white/90 px-6 py-4 backdrop-blur">
          <p className="font-semibold text-[#000000]">Personal Finance SaaS</p>
        </header>
        <div className="p-4 md:p-8">{children}</div>
      </div>
    </div>
  );
}

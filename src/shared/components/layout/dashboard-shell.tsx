"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FolderKanban,
  LayoutDashboard,
  Moon,
  PieChart,
  Settings,
  Sun,
  Tags,
  UserCircle,
  UsersRound,
  Wallet,
  X,
} from "lucide-react";
import {
  getNextTheme,
  resolveStoredTheme,
  THEME_STORAGE_KEY,
  type ThemeMode,
} from "@/shared/theme/theme-preference";
import { getNavigationTitle } from "@/shared/navigation/navigation-labels";
import { getShellNavItems, type UserRole } from "@/shared/navigation/shell-navigation";

const navIcons = {
  "/dashboard": LayoutDashboard,
  "/transactions": CreditCard,
  "/categories": Tags,
  "/wallets": Wallet,
  "/families": UsersRound,
  "/reports": PieChart,
  "/admin": FolderKanban,
};

const bottomNavItems = [{ label: "Settings", href: "/settings", icon: Settings }];
const mobileBottomNavItems = [
  { label: "Home", href: "/dashboard", icon: LayoutDashboard },
  { label: "Transaksi", href: "/transactions", icon: CreditCard },
  { label: "Wallet", href: "/wallets", icon: Wallet },
  { label: "Reports", href: "/reports", icon: PieChart },
  { label: "Settings", href: "/settings", icon: Settings },
];

function getInitialCollapsed() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem("fikaku-sidebar-collapsed") === "true";
}

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  return resolveStoredTheme(window.localStorage.getItem(THEME_STORAGE_KEY));
}

export function DashboardShell({ children, userRole }: { children: React.ReactNode; userRole: UserRole }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(getInitialCollapsed);
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sidebarWidth = collapsed ? 96 : 272;
  const isLight = theme === "light";
  const navigationTitle = getNavigationTitle(pathname);
  const navItems = getShellNavItems(userRole);

  useEffect(() => {
    window.localStorage.setItem("fikaku-sidebar-collapsed", String(collapsed));
  }, [collapsed]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  function toggleCollapsed() {
    setCollapsed((value) => !value);
  }

  function toggleTheme() {
    setTheme((value) => getNextTheme(value));
  }

  const navBase = "flex h-11 items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]";
  const navSize = collapsed ? "w-full px-4 md:w-12 md:justify-center md:px-0" : "w-full px-4 md:w-56";

  return (
    <div className="min-h-screen bg-[var(--shell-bg)] text-[var(--shell-text)] transition-colors duration-200" data-sidebar={collapsed ? "collapsed" : "expanded"} data-theme={theme}>
      {mobileOpen ? (
        <button
          aria-label="Close mobile menu overlay"
          className="fixed inset-0 z-40 bg-[var(--shell-overlay)] md:hidden"
          onClick={() => setMobileOpen(false)}
          type="button"
        />
      ) : null}

      <aside
        className={`fixed inset-y-4 left-4 z-50 flex w-[min(320px,calc(100vw-32px))] flex-col rounded-2xl border border-[var(--shell-border)] bg-[var(--shell-panel)] p-6 text-[var(--shell-text)] shadow-[var(--shell-card-shadow)] transition-[width,padding,transform,background-color,color,border-color] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${collapsed ? "md:w-24 md:px-6 md:py-8" : "md:w-[272px] md:p-8"}`}
        data-collapsed={collapsed}
      >
        <div className={`flex h-8 items-center ${collapsed ? "justify-between md:justify-center" : "justify-between"}`}>
          <Link className="flex items-center gap-3 overflow-hidden transition-opacity hover:opacity-80" href="/dashboard" onClick={() => setMobileOpen(false)}>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#53b6e0] text-sm font-black text-white">F</span>
            <span
              className={`whitespace-nowrap text-[22px] font-black text-[var(--shell-text)] transition-[width,opacity,transform] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                collapsed ? "w-28 translate-x-0 opacity-100 md:w-0 md:-translate-x-2 md:opacity-0" : "w-28 translate-x-0 opacity-100"
              }`}
            >
              fikaku
            </span>
          </Link>
          <button
            aria-label="Toggle sidebar"
            className={`hidden h-8 w-8 shrink-0 items-center justify-center rounded-md text-[var(--shell-muted)] transition-colors hover:bg-[var(--shell-hover)] hover:text-[#53b6e0] md:flex ${collapsed ? "absolute left-8 top-20" : ""}`}
            onClick={toggleCollapsed}
            type="button"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
          <button
            aria-label="Close menu"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[var(--shell-muted)] transition-colors hover:bg-[var(--shell-hover)] hover:text-[#53b6e0] md:hidden"
            onClick={() => setMobileOpen(false)}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className={`${collapsed ? "mt-10 md:mt-20" : "mt-10"}`}>
          <p
            className={`mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--shell-muted)] transition-[opacity,transform] duration-200 ${
              collapsed ? "translate-x-0 opacity-100 md:-translate-x-2 md:opacity-0" : "translate-x-0 opacity-100"
            }`}
          >
            Menu
          </p>
          <nav className="grid gap-1">
            {navItems.map((item) => {
              const Icon = navIcons[item.href as keyof typeof navIcons];
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  className={`${navBase} ${navSize} ${active ? "bg-[#53b6e0]/10 text-[#53b6e0]" : "text-[var(--shell-muted)] hover:bg-[var(--shell-hover)] hover:text-[var(--shell-text)]"}`}
                  href={item.href}
                  key={item.href}
                  onClick={() => setMobileOpen(false)}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span
                    className={`overflow-hidden whitespace-nowrap transition-[width,opacity,transform] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                      collapsed ? "w-36 translate-x-0 opacity-100 md:w-0 md:-translate-x-2 md:opacity-0" : "w-36 translate-x-0 opacity-100"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <nav className="mt-auto grid gap-1">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                className={`${navBase} ${navSize} ${active ? "bg-[#53b6e0]/10 text-[#53b6e0]" : "text-[var(--shell-muted)] hover:bg-[var(--shell-hover)] hover:text-[var(--shell-text)]"}`}
                href={item.href}
                key={item.href}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span
                  className={`overflow-hidden whitespace-nowrap transition-[width,opacity,transform] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    collapsed ? "w-36 translate-x-0 opacity-100 md:w-0 md:-translate-x-2 md:opacity-0" : "w-36 translate-x-0 opacity-100"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <header
        className="fixed inset-x-4 top-4 z-30 flex h-16 items-center justify-between rounded-2xl border border-[var(--shell-border)] bg-[var(--shell-panel)] px-6 text-[var(--shell-text)] shadow-[var(--shell-card-shadow)] transition-[margin-left,background-color,color,border-color] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] md:sticky md:inset-x-auto md:ml-[calc(var(--sidebar-width)+32px)] md:mr-4"
        style={{ "--sidebar-width": `${sidebarWidth}px` } as React.CSSProperties}
      >
        <div className="min-w-0 md:hidden">
          <p className="truncate text-sm font-semibold text-[var(--shell-text)]">{navigationTitle}</p>
          <p className="truncate text-xs text-[var(--shell-muted)]">Fikaku mobile workspace</p>
        </div>
        <div className="hidden md:block">
          <p className="text-sm font-semibold text-[var(--shell-text)]">Personal Finance SaaS</p>
          <p className="text-xs text-[var(--shell-muted)]">Manage cashflow, wallets, categories, and reports.</p>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <button
            aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--shell-panel-strong)] text-[var(--shell-muted)] transition-colors hover:text-[#53b6e0]"
            onClick={toggleTheme}
            title={`Switch to ${isLight ? "dark" : "light"} mode`}
            type="button"
          >
            {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--shell-panel-strong)] text-[var(--shell-muted)] transition-colors hover:text-[#53b6e0]" type="button" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </button>
          <Link className="flex items-center gap-3 transition-opacity hover:opacity-80" href="/settings" onClick={() => setMobileOpen(false)}>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#53b6e0] text-white"><UserCircle className="h-5 w-5" /></span>
            <span className="hidden text-left sm:block">
              <span className="block text-sm font-semibold text-[var(--shell-text)]">Fikaku User</span>
              <span className="block text-xs text-[var(--shell-muted)]">Finance manager</span>
            </span>
          </Link>
        </div>
      </header>

      <main
        className="ml-4 mr-4 mt-24 pb-28 transition-[margin-left] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] md:ml-[calc(var(--sidebar-width)+32px)] md:mt-4 md:pb-8"
        style={{ "--sidebar-width": `${sidebarWidth}px` } as React.CSSProperties}
      >
        <div className="rounded-2xl border border-[var(--shell-border)] bg-[var(--color-bg)] p-4 text-[var(--color-text)] shadow-[var(--shell-card-shadow)] transition-colors duration-200 md:p-6">{children}</div>
      </main>

      <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-5 rounded-2xl border border-[var(--shell-border)] bg-[var(--shell-panel)] p-2 text-[var(--shell-muted)] shadow-[var(--shell-card-shadow)] md:hidden">
        {mobileBottomNavItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-semibold transition-colors ${active ? "bg-[#53b6e0]/10 text-[#53b6e0]" : "hover:bg-[var(--shell-hover)] hover:text-[var(--shell-text)]"}`}
              href={item.href}
              key={item.href}
            >
              <Icon className="h-4 w-4" />
              <span className="max-w-full truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

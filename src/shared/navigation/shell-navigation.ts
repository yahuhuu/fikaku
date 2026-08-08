export type UserRole = "USER" | "ADMIN";

export type ShellNavItem = {
  label: string;
  href: string;
  adminOnly?: boolean;
};

export const mainShellNavItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Transactions", href: "/transactions" },
  { label: "Wallets", href: "/wallets" },
  { label: "Assets", href: "/assets" },
  { label: "Reports", href: "/reports" },
] satisfies ShellNavItem[];

export const settingsShellNavItems = [
  { label: "Profile", href: "/settings" },
  { label: "Categories", href: "/categories" },
  { label: "Families", href: "/families" },
  { label: "Subscriptions", href: "/subscriptions" },
] satisfies ShellNavItem[];

export function getShellNavItems(role: UserRole) {
  void role;
  return mainShellNavItems;
}

export function getSettingsNavItems() {
  return settingsShellNavItems;
}

export function isSettingsMenuPath(pathname: string) {
  return ["/settings", "/categories", "/families", "/subscriptions"].some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

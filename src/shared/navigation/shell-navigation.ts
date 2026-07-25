export type UserRole = "USER" | "ADMIN";

export type ShellNavItem = {
  label: string;
  href: string;
  adminOnly?: boolean;
};

export const shellNavItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Transactions", href: "/transactions" },
  { label: "Categories", href: "/categories" },
  { label: "Wallets", href: "/wallets" },
  { label: "Families", href: "/families" },
  { label: "Reports", href: "/reports" },
  { label: "Admin", href: "/admin", adminOnly: true },
] satisfies ShellNavItem[];

export function getShellNavItems(role: UserRole) {
  return shellNavItems.filter((item) => !item.adminOnly || role === "ADMIN");
}

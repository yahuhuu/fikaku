const navigationTitles = [
  { prefix: "/dashboard", title: "Dashboard" },
  { prefix: "/transactions", title: "Transactions" },
  { prefix: "/categories", title: "Categories" },
  { prefix: "/wallets", title: "Wallets" },
  { prefix: "/families", title: "Families" },
  { prefix: "/reports", title: "Reports" },
  { prefix: "/settings", title: "Settings" },
  { prefix: "/admin", title: "Admin" },
];

export function getNavigationTitle(pathname: string) {
  return navigationTitles.find((item) => pathname === item.prefix || pathname.startsWith(`${item.prefix}/`))?.title ?? "Fikaku";
}

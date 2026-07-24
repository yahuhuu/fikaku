export function normalizePagination(page = 1, perPage = 20) {
  const safePage = Math.max(1, page);
  const safePerPage = Math.min(100, Math.max(1, perPage));

  return {
    page: safePage,
    perPage: safePerPage,
    skip: (safePage - 1) * safePerPage,
    take: safePerPage,
  };
}

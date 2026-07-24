export type ActionResult<T = void> =
  | { ok: true; data?: T; message?: string }
  | { ok: false; error: string };

export type PaginationParams = {
  page?: number;
  perPage?: number;
};

export function parseRupiahInput(value: string) {
  return value.replace(/\D/g, "");
}

export function formatRupiahInput(value: string) {
  const digits = parseRupiahInput(value);
  if (!digits) return "";

  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `Rp. ${grouped}`;
}

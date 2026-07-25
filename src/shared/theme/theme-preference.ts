export type ThemeMode = "dark" | "light";

export const THEME_STORAGE_KEY = "fikaku-theme";

export function isThemeMode(value: unknown): value is ThemeMode {
  return value === "dark" || value === "light";
}

export function resolveStoredTheme(value: string | null): ThemeMode {
  return isThemeMode(value) ? value : "dark";
}

export function getNextTheme(theme: ThemeMode): ThemeMode {
  return theme === "dark" ? "light" : "dark";
}

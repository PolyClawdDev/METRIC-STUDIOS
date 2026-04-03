/** Client-side cookie helpers (middleware sets `ms-lang`; user lock uses `ms-lang-locked`). */

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`)
  );
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

export function setCookie(
  name: string,
  value: string,
  options: { maxAgeSeconds?: number; path?: string } = {}
) {
  if (typeof document === "undefined") return;
  const maxAge = options.maxAgeSeconds ?? 60 * 60 * 24 * 365;
  const path = options.path ?? "/";
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=${path}; max-age=${maxAge}; SameSite=Lax`;
}

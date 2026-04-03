import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Sets a default language cookie from geo when the visitor has not chosen a language yet.
 * On Vercel, `x-vercel-ip-country` is the ISO 3166-1 alpha-2 country code.
 * Norway → Norwegian; any other detected country → English.
 * If the header is missing (e.g. local dev), default stays Norwegian.
 */
export function middleware(request: NextRequest) {
  const res = NextResponse.next();

  if (request.cookies.get("ms-lang-locked")?.value === "1") {
    return res;
  }

  const existing = request.cookies.get("ms-lang")?.value;
  if (existing === "no" || existing === "en") {
    return res;
  }

  const country = request.headers.get("x-vercel-ip-country") ?? "";
  let lang: "no" | "en";
  if (!country) {
    lang = "no";
  } else if (country === "NO") {
    lang = "no";
  } else {
    lang = "en";
  }

  res.cookies.set("ms-lang", lang, {
    path: "/",
    maxAge: ONE_YEAR,
    sameSite: "lax",
  });

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|icon\\.png|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|mov|webm)).*)",
  ],
};

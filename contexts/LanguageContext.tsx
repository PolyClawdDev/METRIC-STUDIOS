"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import type { Lang } from "@/lib/translations";
import { t } from "@/lib/translations";
import { getCookie, setCookie } from "@/lib/cookies";

type Tr = typeof t.no | typeof t.en;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  tr: Tr;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "no",
  setLang: () => {},
  tr: t.no as Tr,
});

function applyDocumentLang(lang: Lang) {
  document.documentElement.lang = lang === "en" ? "en" : "no";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("no");

  useLayoutEffect(() => {
    let resolved: Lang = "no";
    const locked = getCookie("ms-lang-locked") === "1";

    if (locked) {
      const stored = localStorage.getItem("ms-lang") as Lang | null;
      if (stored === "en" || stored === "no") {
        resolved = stored;
      } else {
        const fromCookie = getCookie("ms-lang");
        if (fromCookie === "en" || fromCookie === "no") resolved = fromCookie;
      }
    } else {
      // Geo-driven: cookie (refreshed every request in middleware) wins over stale localStorage.
      const fromCookie = getCookie("ms-lang");
      if (fromCookie === "en" || fromCookie === "no") {
        resolved = fromCookie;
        localStorage.setItem("ms-lang", fromCookie);
      } else {
        const stored = localStorage.getItem("ms-lang") as Lang | null;
        if (stored === "en" || stored === "no") resolved = stored;
      }
    }

    setLangState(resolved);
    applyDocumentLang(resolved);
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("ms-lang", newLang);
    applyDocumentLang(newLang);
    setCookie("ms-lang", newLang);
    setCookie("ms-lang-locked", "1");
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, tr: t[lang] as Tr }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

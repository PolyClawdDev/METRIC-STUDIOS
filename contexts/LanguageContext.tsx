"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Lang } from "@/lib/translations";
import { t } from "@/lib/translations";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  tr: typeof t.no;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "no",
  setLang: () => {},
  tr: t.no,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("no");

  useEffect(() => {
    const saved = localStorage.getItem("ms-lang") as Lang | null;
    if (saved === "en" || saved === "no") setLangState(saved);
  }, []);

  function setLang(newLang: Lang) {
    setLangState(newLang);
    localStorage.setItem("ms-lang", newLang);
    document.documentElement.lang = newLang === "en" ? "en" : "no";
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, tr: t[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

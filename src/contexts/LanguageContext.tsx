"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { Lang } from "@/types";
import translations from "@/i18n";
import { enOverrides } from "@/i18n/en-overrides";

interface LanguageContextType {
  lang: Lang;
  t: typeof translations.fr;
  toggleLang: () => void;
  setLang: (l: Lang) => void;
  isArabic: boolean;
  dir: "ltr" | "rtl";
  L: (frText: string, arText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANG_ORDER: Lang[] = ["fr", "en", "ar"];
const STORAGE_KEY = "espace-marrakesh-lang";

function getInitialLang(): Lang {
  if (typeof window !== "undefined") {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "fr" || saved === "en" || saved === "ar") return saved;
  }
  return "fr";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const toggleLang = useCallback(() => {
    setLangState((prev) => LANG_ORDER[(LANG_ORDER.indexOf(prev) + 1) % LANG_ORDER.length]);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const L = useCallback(
    (frText: string, arText: string): string => {
      if (lang === "ar") return arText;
      return enOverrides[frText] ?? frText;
    },
    [lang]
  );

  const value: LanguageContextType = {
    lang,
    t: translations[lang],
    toggleLang,
    setLang,
    isArabic: lang === "ar",
    dir: lang === "ar" ? "rtl" : "ltr",
    L,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLang must be used within LanguageProvider");
  return context;
}

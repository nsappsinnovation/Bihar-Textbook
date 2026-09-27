import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "./translations";

const STORAGE_KEY = "brlpp.lang";
const LanguageContext = createContext(null);

const initialLang = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === "hi" ? "hi" : "en";
  } catch {
    return "en";
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const t = useCallback(
    (key, vars) => {
      const entry = translations[key];
      let text = entry ? entry[lang === "hi" ? 1 : 0] : key;
      if (vars) {
        Object.entries(vars).forEach(([k, v]) => {
          text = text.replaceAll(`{${k}}`, v);
        });
      }
      return text;
    },
    [lang]
  );

  const value = useMemo(
    () => ({ lang, setLang, toggle: () => setLang((l) => (l === "en" ? "hi" : "en")), t }),
    [lang, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useT = () => useContext(LanguageContext);

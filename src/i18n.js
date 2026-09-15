import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/translation.json";
import hi from "./locales/hi/translation.json";

const SESSION_KEY = "i18nLanguage";

// Retrieve stored language from sessionStorage (if any)
const storedLang = sessionStorage.getItem(SESSION_KEY);

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
  },
  lng: storedLang || "en", // Use stored language or default to English
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already escapes
  },
});

// Whenever the language changes, persist in sessionStorage
i18n.on("languageChanged", (lng) => {
  sessionStorage.setItem(SESSION_KEY, lng);
});

export default i18n;
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const SESSION_KEY = "i18nLanguage";

// Each language file is its own download, fetched only when that language is used
// (English is also loaded for Hindi readers, as the fallback for any missing text).
const loaders = {
  en: () => import("./locales/en/translation.json"),
  hi: () => import("./locales/hi/translation.json"),
};

const lazyLocales = {
  type: "backend",
  init() {},
  read(language, namespace, callback) {
    const load = loaders[language];
    if (!load) return callback(null, {});
    load()
      .then((module) => callback(null, module.default))
      .catch((error) => callback(error, null));
  },
};

// Retrieve stored language from sessionStorage (if any)
const storedLang = sessionStorage.getItem(SESSION_KEY);

// Resolves once the starting language is loaded; main.jsx waits for it before rendering
export const i18nReady = i18n
  .use(lazyLocales)
  .use(initReactI18next)
  .init({
    lng: storedLang || "en", // Use stored language or default to English
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React already escapes
    },
    // Language switches wait for the file, then re-render (no Suspense boundary needed)
    react: { useSuspense: false },
  });

// Whenever the language changes, persist in sessionStorage
i18n.on("languageChanged", (lng) => {
  sessionStorage.setItem(SESSION_KEY, lng);
});

export default i18n;

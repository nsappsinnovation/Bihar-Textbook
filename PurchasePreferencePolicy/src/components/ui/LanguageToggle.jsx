import { HiOutlineLanguage } from "react-icons/hi2";
import { useT } from "../../i18n/LanguageContext";

// Active language is highlighted in the portal's brand colour.
export default function LanguageToggle({ dark = false, className = "" }) {
  const { lang, setLang, t } = useT();
  return (
    <div
      role="group"
      aria-label={t("language")}
      className={`inline-flex items-center gap-1 rounded-xl p-1 text-xs font-semibold ${
        dark ? "bg-white/10 ring-1 ring-white/20" : "bg-slate-100 ring-1 ring-slate-200"
      } ${className}`}
    >
      <HiOutlineLanguage className={`mx-1 h-4 w-4 ${dark ? "text-brand-100" : "text-slate-400"}`} />
      {[
        ["en", "English"],
        ["hi", "हिन्दी"],
      ].map(([code, label]) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`rounded-lg px-2.5 py-1.5 transition ${
            lang === code
              ? "bg-white text-brand-700 shadow-sm"
              : dark
                ? "text-brand-50 hover:bg-white/10"
                : "text-slate-500 hover:text-slate-800"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

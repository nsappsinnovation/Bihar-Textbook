import { Link } from "react-router-dom";
import { useT } from "../../i18n/LanguageContext";

export default function PublicFooter() {
  const { t } = useT();
  return (
    <footer className="no-print border-t border-brand-900/10 bg-white/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:px-6">
        <p className="text-center sm:text-left">{t("footerText", { year: new Date().getFullYear() })}</p>
        <Link to="/admin/login" className="font-semibold text-brand-700 hover:text-brand-800">
          {t("adminLoginLink")}
        </Link>
      </div>
    </footer>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { FiGrid } from "react-icons/fi";
import BrandMark from "./BrandMark";
import LanguageToggle from "../ui/LanguageToggle";
import { useT } from "../../i18n/LanguageContext";
import { useAuth } from "../../context/AuthContext";

export default function PublicHeader() {
  const { t } = useT();
  const { mobile, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="no-print sticky top-0 z-30 border-b border-brand-900/10 bg-cream/85 backdrop-blur">
      <div className="h-1 bg-gradient-to-r from-brand-700 via-gold-500 to-brand-700" />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to={mobile ? "/my-applications" : "/"} className="min-w-0">
          <BrandMark compact subtitle={t("idaShort")} />
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>
          {mobile && (
            <>
              <Link
                to="/my-applications"
                className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 md:inline-flex"
              >
                <FiGrid className="h-4 w-4 text-slate-400" />
                {t("myApplications")}
              </Link>
              <button
                onClick={async () => {
                  // Leave the protected page first so no "resume after login" redirect is recorded.
                  navigate("/", { replace: true, state: null });
                  await logout();
                }}
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
              >
                <IoLogOutOutline className="h-5 w-5 text-slate-400" />
                <span className="hidden sm:inline">{t("logout")}</span>
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end border-t border-slate-100 px-4 py-2 sm:hidden">
        <LanguageToggle />
      </div>
    </header>
  );
}

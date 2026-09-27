import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoLogOutOutline } from "react-icons/io5";
import { FiBookOpen, FiMenu, FiX, FiUsers } from "react-icons/fi";
import LanguageToggle from "../ui/LanguageToggle";
import { useT } from "../../i18n/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { districtLabel } from "../../lib/locations";
import { ROLE_STATE } from "../../lib/adminApi";
import { clearAdminCache } from "../../lib/useAdminEnterprises";

function Sidebar({ onNavigate }) {
  const { t, lang } = useT();
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const isState = admin?.role === ROLE_STATE;

  const items = [
    { to: "/admin", label: t("dashboard"), icon: LuLayoutDashboard, end: true },
    { to: "/admin/directory", label: t("directory"), icon: FiBookOpen },
    ...(isState ? [{ to: "/admin/users", label: t("manageAdmins"), icon: FiUsers }] : []),
  ];

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col overflow-y-auto border-r border-brand-900/10 bg-white">
      <div className="flex items-center gap-3 px-5 py-5">
        <img src="/dept-industries.png" className="h-10 w-10 object-contain" alt="" />
        <div className="leading-tight">
          <p className="text-sm font-bold text-slate-900">{t("deptShort")}</p>
          <p className="text-[11px] text-slate-400">{t("adminPortal")}</p>
        </div>
      </div>

      <div className="relative mx-4 mb-2 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 p-4 text-white shadow-lg shadow-brand-900/25">
        <div aria-hidden className="bg-contours-gold pointer-events-none absolute inset-0 opacity-60" />
        <p className="relative text-[11px] font-medium text-brand-100">{isState ? t("stateAdmin") : t("districtAdmin")}</p>
        <p className="relative mt-0.5 truncate text-base font-bold">{admin?.name}</p>
        <span className="relative mt-2 inline-flex rounded-full bg-gold-500 px-2.5 py-0.5 text-[11px] font-bold text-brand-950">
          {isState ? t("allDistricts") : districtLabel(admin?.district, lang)}
        </span>
      </div>

      <nav className="mt-4 flex-1 space-y-1 px-3">
        <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">{t("menu")}</p>
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive ? "bg-brand-50 text-brand-800" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={19} className={isActive ? "text-brand-700" : "text-slate-400"} />
                <span>{label}</span>
                {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-gold-500" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-2 border-t border-slate-100 p-3">
        <LanguageToggle className="w-full justify-center" />
        <button
          onClick={async () => {
            clearAdminCache();
            await logout();
            navigate("/admin/login", { replace: true });
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
        >
          <IoLogOutOutline size={20} className="text-slate-400" />
          <span>{t("logout")}</span>
        </button>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);
  const { t } = useT();

  return (
    <div className="flex min-h-screen bg-cream">
      <div className="no-print sticky top-0 hidden h-screen lg:flex">
        <Sidebar />
      </div>

      {open && (
        <div className="no-print fixed inset-0 z-40 flex lg:hidden">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative h-full animate-fade-up">
            <Sidebar onNavigate={() => setOpen(false)} />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute -right-12 top-4 rounded-xl bg-white p-2 text-slate-600 shadow"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="no-print sticky top-0 z-30 flex items-center justify-between border-b border-brand-900/10 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
          <button onClick={() => setOpen(true)} aria-label="Open menu" className="rounded-xl p-2 text-slate-600 hover:bg-slate-100">
            <FiMenu className="h-5 w-5" />
          </button>
          <p className="text-sm font-bold text-slate-900">{t("adminPortal")}</p>
          <img src="/dept-industries.png" className="h-8 w-8 object-contain" alt="" />
        </div>
        <main className="bg-grid flex-1">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-10 lg:py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

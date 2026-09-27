import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FiUser, FiLock, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { Input } from "../../components/ui/Field";
import LanguageToggle from "../../components/ui/LanguageToggle";
import BrandMark from "../../components/layout/BrandMark";
import { useT } from "../../i18n/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { adminLogin } from "../../lib/adminApi";
import { clearAdminCache } from "../../lib/useAdminEnterprises";

export default function AdminLogin() {
  const { t, lang } = useT();
  const { admin, setAdmin } = useAuth();
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (admin) return <Navigate to="/admin" replace />;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await adminLogin(loginId, password);
      if (!result || result.error) {
        setError(result?.error || "errRequired");
        return;
      }
      clearAdminCache();
      setAdmin(result.admin);
      navigate("/admin", { replace: true });
    } catch (err) {
      console.error(err);
      setError("errGeneric");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-cream lg:grid lg:grid-cols-2">
      <div className="relative flex min-h-screen flex-col px-4 py-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex items-center justify-between gap-3">
          <BrandMark />
          <LanguageToggle className="shrink-0" />
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-100 px-3 py-1 text-xs font-bold text-gold-800 ring-1 ring-gold-200">
              <HiOutlineShieldCheck className="h-3.5 w-3.5" />
              {t("adminPortal")}
            </span>
            <h1 className="mt-5 font-display text-4xl leading-tight text-brand-900 sm:text-5xl">{t("adminLoginTitle")}</h1>
            <p className="mt-2 text-sm text-slate-500">{t("adminLoginSub")}</p>

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              <Input
                name="loginId"
                label={t("adminId")}
                icon={FiUser}
                autoComplete="username"
                placeholder={t("adminIdPlaceholder")}
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                required
              />
              <Input
                name="password"
                label={t("password")}
                icon={FiLock}
                type="password"
                autoComplete="current-password"
                placeholder={t("passwordPlaceholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <Alert tone="error">{t(error)}</Alert>}
              <Button type="submit" size="lg" loading={loading} iconRight={FiArrowRight} className="w-full">
                {loading ? t("signingIn") : t("signIn")}
              </Button>
            </form>

          </div>
        </div>

        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-800">
          <FiArrowLeft className="h-3.5 w-3.5" />
          {t("portalTitle")}
        </Link>
      </div>

      <div className="relative hidden overflow-hidden bg-gradient-to-br from-brand-800 via-brand-900 to-brand-950 lg:block">
        <div aria-hidden className="bg-contours-gold absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_70%_40%,#000_0%,transparent_75%)]" />
        <div aria-hidden className="absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-gold-500/20 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
        <div className="relative flex h-full flex-col justify-between p-14">
          <div className="max-w-xl">
            <p className={`text-sm font-bold text-gold-300 ${lang === "en" ? "uppercase tracking-[0.16em]" : ""}`}>{t("govBihar")}</p>
            <img src="/dept-industries.png" alt="" className="mt-6 h-24 w-24 rounded-full bg-white p-1 object-contain shadow-lg" />
            <p className="mt-5 text-2xl font-semibold text-gold-100">{t("deptName")}</p>
          </div>
          <div className="max-w-xl">
            <p className="font-display text-3xl leading-snug text-white">{t("portalTitle")}</p>
            <p className="mt-4 text-base leading-7 text-brand-100/90">{t("adminLoginSub")}</p>
          </div>
          <div className="flex items-center gap-8 border-t border-white/15 pt-6 text-white">
            <div>
              <p className="text-2xl font-bold">{t("stateAdmin")}</p>
              <p className="text-xs text-gold-200/80">{t("allDistricts")}</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{t("districtAdmin")}</p>
              <p className="text-xs text-gold-200/80">{t("district")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

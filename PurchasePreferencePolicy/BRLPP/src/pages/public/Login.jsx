import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiGrid, FiCheckCircle } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import Button from "../../components/ui/Button";
import LanguageToggle from "../../components/ui/LanguageToggle";
import BrandMark from "../../components/layout/BrandMark";
import Alert from "../../components/ui/Alert";
import CitizenLogin from "../../components/CitizenLogin";
import { useT } from "../../i18n/LanguageContext";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { t, lang } = useT();
  const { mobile, profile, logout } = useAuth();
  const location = useLocation();
  // The home page's "Submit Land Details" button arrives with intent "apply".
  const [intent] = useState(location.state?.intent || null);
  const [inLoginFlow, setInLoginFlow] = useState(false);
  const mobileRef = useRef(null);

  const signedIn = mobile && !inLoginFlow;
  const year = new Date().getFullYear();

  return (
    <div className="flex min-h-screen flex-col bg-cream lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      {/* ---------- Hero (top on mobile, right on desktop) ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-900 to-brand-950 text-white lg:order-last lg:sticky lg:top-0 lg:h-screen">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "62px 62px",
          }}
        />
        <div aria-hidden className="bg-contours-gold absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_70%_40%,#000_0%,transparent_75%)]" />
        <div aria-hidden className="absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-gold-500/20 blur-[100px]" />

        <div className="relative flex h-full flex-col px-5 pb-12 pt-5 sm:px-10 lg:px-16 lg:py-14">
          {/* Mobile brand bar */}
          <div className="flex items-center justify-between gap-3 lg:hidden">
            <Link to="/" className="flex min-w-0 items-center gap-2.5">
              <img src="/bihar-seal.png" alt="" className="h-9 w-9 shrink-0 rounded-full bg-white/90 p-0.5 object-contain" />
              <p className="truncate text-xs font-semibold text-brand-100">{t("idaShort")}</p>
            </Link>
            <LanguageToggle dark className="shrink-0" />
          </div>

          {/* The portal is introduced on the home page; here the panel only sets the
              context so the form stays the single thing to do on this screen. */}
          <div className="mt-6 lg:my-auto">
            {/* Letter-spacing breaks Devanagari shaping, so only track the English label. */}
            <p className={`hidden text-xs font-bold text-gold-300 lg:block ${lang === "en" ? "uppercase tracking-[0.18em]" : ""}`}>
              {t("idaName")}
            </p>
            <h1 className="max-w-md font-display text-[1.7rem] leading-tight sm:text-4xl lg:mt-4 lg:text-5xl">
              {t("portalTitle")}
            </h1>
            <p className="mt-1.5 text-sm font-medium text-gold-100 sm:text-base">{t("portalTitleAlt")}</p>
          </div>

          <p className="mt-auto hidden max-w-md pt-10 text-xs leading-5 text-brand-200/80 lg:block">{t("disclaimerText")}</p>
        </div>
      </section>

      {/* ---------- Login ---------- */}
      <section
        className="relative z-10 -mt-6 flex flex-1 flex-col rounded-t-3xl bg-cream px-5 pt-8 sm:px-10 lg:mt-0 lg:min-h-screen lg:rounded-none lg:px-14 lg:pt-10 xl:px-20"
      >
        {/* Desktop brand bar */}
        <div className="hidden items-center justify-between gap-3 lg:flex">
          <Link to="/" className="min-w-0">
            <BrandMark />
          </Link>
          <LanguageToggle className="shrink-0" />
        </div>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center pb-10 lg:py-12">
          {signedIn ? (
            <div className="animate-fade-up space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-50 text-brand-700">
                <FiCheckCircle className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-display text-3xl leading-tight text-brand-900">
                  {profile?.name ? t("welcome", { name: profile.name }) : t("loggedInAs", { mobile })}
                </h2>
                {profile?.name && <p className="mt-1 text-sm text-slate-500">{t("loggedInAs", { mobile })}</p>}
              </div>
              <Button to="/my-applications" size="lg" icon={FiGrid} className="w-full">
                {t("goToMyApplications")}
              </Button>
              <Button variant="danger" icon={IoLogOutOutline} className="w-full" onClick={logout}>
                {t("logout")}
              </Button>
            </div>
          ) : (
            <div className="animate-fade-up">
              <h2 className="font-display text-3xl leading-tight text-brand-900">{t("applicantLogin")}</h2>
              <p className="mt-1.5 text-sm text-slate-500">{t("applicantLoginSub")}</p>
              {intent === "apply" && (
                <Alert tone="info" className="mt-5">
                  {t("loginToSubmit")}
                </Alert>
              )}
              <div className="mt-7">
                <CitizenLogin intent={intent} mobileRef={mobileRef} onFlowChange={setInLoginFlow} />
              </div>
            </div>
          )}
        </div>

        <p className="mx-auto w-full max-w-sm pb-6 text-[11px] leading-5 text-slate-400 lg:hidden">{t("disclaimerText")}</p>

        <footer className="mx-auto flex w-full max-w-sm items-center justify-between gap-3 border-t border-brand-900/10 py-4 text-[11px] text-slate-500 lg:max-w-none">
          <span>© {year} IDA, Bihar</span>
          <Link to="/admin/login" className="font-semibold text-slate-500 hover:text-brand-700">
            {t("adminLoginLink")}
          </Link>
        </footer>
      </section>
    </div>
  );
}

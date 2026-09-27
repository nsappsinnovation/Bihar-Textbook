import { lazy, Suspense, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiArrowUpRight, FiCheck } from "react-icons/fi";
import LanguageToggle from "../../components/ui/LanguageToggle";
import { useT } from "../../i18n/LanguageContext";
import { useAuth } from "../../context/AuthContext";

// WebGL contours are decorative: loaded lazily and skipped for reduced motion.
const Topography = lazy(() => import("../../components/landing/Topography"));

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;


function Leader({ image, name, designation, align = "left", className = "" }) {
  const { lang } = useT();
  return (
    <figure className={`m-0 w-[132px] sm:w-[160px] lg:w-[190px] ${align === "right" ? "justify-self-end text-right" : ""} ${className}`}>
      <div className="relative h-[162px] overflow-hidden rounded-[18px] border border-brand-900/15 bg-white/70 shadow-[0_22px_55px_rgba(74,29,21,0.14)] sm:h-[196px] lg:h-[232px] lg:rounded-[20px]">
        <img src={image} alt={name} className="h-full w-full object-cover saturate-[0.92]" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-brand-900/25 to-transparent" />
      </div>
      <figcaption className={`grid gap-1 pt-3 ${align === "right" ? "justify-items-end" : ""}`}>
        <span className="font-display text-[0.95rem] leading-tight text-brand-900 sm:text-base lg:text-lg">{name}</span>
        <strong
          className={`text-[0.62rem] font-bold leading-snug text-gold-600 ${lang === "en" ? "uppercase tracking-[0.1em]" : "text-xs"}`}
        >
          {designation}
        </strong>
      </figcaption>
    </figure>
  );
}

export default function Home() {
  const { t, lang } = useT();
  const { mobile } = useAuth();
  const [contoursOk, setContoursOk] = useState(() => !prefersReducedMotion());
  const onUnsupported = useCallback(() => setContoursOk(false), []);
  const en = lang === "en";
  const eyebrow = en ? "uppercase tracking-[0.16em] text-[0.62rem]" : "text-xs";
  const applyTo = mobile ? "/apply" : "/login";

  return (
    <div className="relative isolate flex min-h-svh flex-col overflow-hidden bg-cream text-brand-900">
      {/* ---------- Background ---------- */}
      <div
        aria-hidden
        className="bg-grid absolute inset-0 -z-20 [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_80%,transparent)]"
      />
      <div
        aria-hidden
        className="absolute -right-[30%] top-0 -z-10 h-[70%] w-[150%] opacity-80 [mask-image:radial-gradient(ellipse_at_62%_48%,#000_0%,rgba(0,0,0,0.85)_42%,transparent_75%)] lg:-right-[12%] lg:top-[6%] lg:h-[92%] lg:w-[72%]"
      >
        {contoursOk ? (
          <Suspense fallback={<div className="bg-contours h-full w-full" />}>
            <Topography
              className="h-full w-full"
              speed={0.16}
              bands={5.6}
              thickness={0.02}
              scale={0.9}
              glow={0.04}
              opacity={0.32}
              morphAmount={2.4}
              onUnsupported={onUnsupported}
            />
          </Suspense>
        ) : (
          <div className="bg-contours h-full w-full" />
        )}
      </div>
      <div aria-hidden className="absolute -bottom-[22rem] -right-[16rem] -z-10 h-[56rem] w-[56rem] rounded-full bg-gold-500/25 blur-[110px]" />
      <div aria-hidden className="absolute -left-[18rem] -top-[20rem] -z-10 h-[40rem] w-[40rem] rounded-full bg-brand-500/15 blur-[110px]" />

      {/* ---------- Top bar ---------- */}
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 pt-5 sm:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img src="/bihar-seal.png" alt={t("govBihar")} className="h-11 w-11 shrink-0 object-contain" />
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-bold">{t("govBihar")}</p>
            <p className="truncate text-xs text-brand-900/60">{t("idaShort")}</p>
          </div>
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-900/20 bg-white/60 px-4 py-2 text-sm font-semibold text-brand-900 backdrop-blur transition hover:border-brand-700 hover:bg-white"
          >
            {t("login")}
            <FiArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-6 sm:px-8">
        {/* ---------- Masthead ---------- */}
        <div className="mt-6 grid grid-cols-[1fr_auto] items-center gap-4 border-b border-brand-900/15 pb-4 lg:mt-10 lg:grid-cols-[1fr_auto_auto] lg:gap-16">
          <div className="grid gap-1">
            <span className={`font-bold text-gold-600 ${eyebrow}`}>{t("homePolicy")}</span>
            <strong className="text-sm font-semibold sm:text-base">{t("idaName")}</strong>
          </div>
          <p className={`hidden items-center gap-3 font-bold text-brand-900/55 lg:flex ${eyebrow}`}>
            {t("homeAuthority")} <i className="h-px w-7 bg-brand-900/35" /> {t("govBihar")}
          </p>
          <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-700 text-xs font-bold text-gold-100">
            {new Date().getFullYear()}
          </span>
        </div>

        {/* ---------- Stage ---------- */}
        <section
          aria-labelledby="home-title"
          className="my-auto grid grid-cols-2 items-center gap-x-4 gap-y-8 py-10 lg:grid-cols-[190px_minmax(0,1fr)_190px] lg:gap-12 lg:py-14"
        >
          <Leader
            image="/images/official/cm-bihar.png"
            name={t("cmName")}
            designation={t("cmDesignation")}
            className="row-start-2 lg:row-start-1"
          />

          <div className="relative col-span-2 row-start-1 text-center lg:col-span-1 lg:col-start-2">
            <div
              aria-hidden
              className="absolute -inset-x-[7%] -inset-y-[10%] -z-10 bg-[radial-gradient(ellipse_at_center,rgba(246,242,231,0.96)_0%,rgba(246,242,231,0.8)_50%,transparent_82%)]"
            />
            <p className="font-display text-[2.1rem] leading-none text-gold-600 sm:text-5xl lg:text-6xl">{t("homeTitleLead")}</p>
            <div className={`mx-auto mt-3 grid max-w-xl grid-cols-[1fr_auto_1fr] items-center gap-3 font-bold text-brand-900/55 ${eyebrow}`}>
              <i className="h-px bg-brand-900/20" />
              <span>{t("homeRule")}</span>
              <i className="h-px bg-brand-900/20" />
            </div>
            <h1
              id="home-title"
              className={`mt-3 font-extrabold leading-[0.95] text-brand-900 ${
                en ? "text-[2.7rem] tracking-[-0.045em] sm:text-6xl lg:text-[5.4rem]" : "font-display text-[2.6rem] sm:text-6xl lg:text-7xl"
              }`}
            >
              {t("homeTitleMain")}
            </h1>
            <p className="mt-3 text-base font-medium text-brand-700 sm:text-lg">{t("homeTitleOther")}</p>

            <div className="mx-auto mt-7 grid max-w-xl items-center gap-3 sm:grid-cols-[auto_1fr] sm:text-left">
              <span className={`justify-self-center rounded-full bg-gold-500 px-4 py-2 font-bold text-brand-950 ${eyebrow}`}>
                {t("homePill")}
              </span>
              <p className="text-sm leading-relaxed text-brand-900/75">{t("homeStatement")}</p>
            </div>

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Link
                to={applyTo}
                state={mobile ? undefined : { intent: "apply" }}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-brand-700 py-2 pl-6 pr-2 text-left text-white shadow-xl shadow-brand-900/25 transition hover:bg-brand-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/40"
              >
                <span className="leading-tight">
                  <span className="block text-[15px] font-bold">{t("submitLandDetails")}</span>
                  <span className="block text-xs font-medium text-gold-100/80">{t("submitLandDetailsAlt")}</span>
                </span>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gold-500 text-brand-950 transition group-hover:translate-x-0.5">
                  <FiArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link
                to={mobile ? "/my-applications" : "/login"}
                className="inline-flex items-center justify-center rounded-full border border-brand-900/25 bg-white/60 px-6 py-3.5 text-sm font-semibold text-brand-900 backdrop-blur transition hover:border-brand-700 hover:bg-white"
              >
                {mobile ? t("myApplications") : t("applicantLogin")}
              </Link>
            </div>
          </div>

          <Leader
            image="/images/official/industries-minister.png"
            name={t("ministerName")}
            designation={t("ministerDesignation")}
            align="right"
            className="row-start-2 lg:col-start-3 lg:row-start-1"
          />
        </section>

        {/* ---------- Footer strip ---------- */}
        <footer className="border-t border-brand-900/15 pt-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-brand-900/70">{t("homePurpose")}</p>
            <ul className="flex flex-wrap gap-2">
              {["factFree", "factBilingual", "factPlots"].map((k) => (
                <li
                  key={k}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-900/15 bg-white/60 px-3 py-1.5 text-xs font-semibold text-brand-900"
                >
                  <FiCheck className="h-3.5 w-3.5 text-brand-500" />
                  {t(k)}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex flex-col gap-3 text-[11px] leading-5 text-brand-900/50 sm:flex-row sm:items-start sm:justify-between">
            <p className="max-w-3xl">{t("disclaimerText")}</p>
            <div className="flex shrink-0 items-center gap-4">
              <div className="sm:hidden">
                <LanguageToggle />
              </div>
              <Link to="/admin/login" className="font-semibold text-brand-900/70 hover:text-brand-700">
                {t("adminLoginLink")}
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

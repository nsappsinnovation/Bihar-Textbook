import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import useLeaders, { initialsOf, prefersReducedMotion } from "../home-shared/useLeaders";

// WebGL contours are decorative: loaded lazily and skipped for reduced motion
const Topography = lazy(() => import("../Topography"));

// `zoom` shrinks a tightly cropped photo inside the same frame, anchored at the bottom so the shoulders stay on the edge
function Leader({ leader, align = "left", zoom = 1, className = "" }) {
  const right = align === "right";
  return (
    <figure className={`m-0 w-[136px] sm:w-[164px] lg:w-[196px] ${right ? "justify-self-end text-right" : ""} ${className}`}>
      <div className="relative h-[168px] overflow-hidden rounded-[20px] border border-bt-navy/10 bg-gradient-to-b from-white to-bt-sky shadow-[0_24px_55px_rgba(11,43,79,0.16)] sm:h-[200px] lg:h-[238px]">
        {!leader.image ? (
          <span className="grid h-full w-full place-items-center text-4xl font-bold text-bt-navy/40">{initialsOf(leader.name)}</span>
        ) : (
        <img
          src={leader.image}
          alt={leader.name}
          className="h-full w-full origin-bottom object-cover object-top"
          style={
            zoom !== 1
              ? {
                  transform: `scale(${zoom})`,
                  // fade the photo's own side edges into the frame once it no longer fills it
                  maskImage: "linear-gradient(to right, transparent, #000 14%, #000 86%, transparent)",
                  WebkitMaskImage: "linear-gradient(to right, transparent, #000 14%, #000 86%, transparent)",
                }
              : undefined
          }
        />
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bt-navy/25 to-transparent" />
      </div>
      <figcaption className={`grid gap-1 pt-3 ${right ? "justify-items-end" : ""}`}>
        <span className="text-[15px] font-bold leading-tight tracking-tight text-slate-900 lg:text-base">{leader.name}</span>
        <strong className="text-[10px] font-bold uppercase leading-snug tracking-[0.08em] text-blue-600 [html.lang-hi_&]:normal-case [html.lang-hi_&]:tracking-normal [html.lang-hi_&]:text-xs">
          {leader.role}
        </strong>
      </figcaption>
    </figure>
  );
}

// Same footprint as a leader card, shown while the leaders are loading
function LeaderSkeleton({ align = "left", className = "" }) {
  const right = align === "right";
  return (
    <div aria-hidden className={`w-[136px] sm:w-[164px] lg:w-[196px] ${right ? "justify-self-end" : ""} ${className}`}>
      <div className="h-[168px] animate-pulse rounded-[20px] bg-bt-navy/[0.06] sm:h-[200px] lg:h-[238px]" />
      <div className={`grid gap-2 pt-3 ${right ? "justify-items-end" : ""}`}>
        <span className="h-3.5 w-28 animate-pulse rounded bg-bt-navy/[0.06]" />
        <span className="h-2.5 w-20 animate-pulse rounded bg-bt-navy/[0.06]" />
      </div>
    </div>
  );
}

export default function V1Hero() {
  const { t } = useTranslation();
  const leaders = useLeaders();
  const [contours] = useState(() => !prefersReducedMotion());

  return (
    <section aria-labelledby="v1-title" className="relative isolate overflow-hidden bg-gradient-to-b from-bt-sky via-[#f4f8fe] to-white font-sans text-slate-900">
      {/* Backdrop: grid, animated contour lines, brand-blue and mango glows */}
      <div aria-hidden className="absolute inset-0 -z-20 [background-image:linear-gradient(rgba(11,43,79,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(11,43,79,0.05)_1px,transparent_1px)] [background-size:62px_62px] [mask-image:linear-gradient(to_bottom,transparent,#000_18%,#000_78%,transparent)]" />
      {contours && (
        <div aria-hidden className="absolute -right-[30%] top-0 -z-10 h-[70%] w-[150%] opacity-80 [mask-image:radial-gradient(ellipse_at_60%_50%,#000_0%,rgba(0,0,0,0.85)_40%,transparent_74%)] lg:-right-[10%] lg:top-[8%] lg:h-[90%] lg:w-[74%]">
          <Suspense fallback={null}>
            <Topography
              className="h-full w-full"
              lowColor="#124d9c"
              midColor="#2563eb"
              highColor="#7aa2e0"
              speed={0.16}
              bands={5.6}
              thickness={0.02}
              glow={0.04}
              opacity={0.3}
              morphAmount={2.4}
            />
          </Suspense>
        </div>
      )}
      <div aria-hidden className="absolute -bottom-[24rem] -right-[14rem] -z-10 h-[52rem] w-[52rem] rounded-full bg-mango/30 blur-[120px]" />
      <div aria-hidden className="absolute -left-[16rem] -top-[18rem] -z-10 h-[40rem] w-[40rem] rounded-full bg-bt-bright/15 blur-[110px]" />

      {/* Same container as the navbar and every section below, so the left edges line up */}
      {/* Fills the screen; the content is centred in the space below the navbar */}
      <div className="flex min-h-svh flex-col justify-center px-6 pb-16 pt-28 md:px-12 lg:px-24">
      <div className="mx-auto w-full max-w-[1280px]">
        {/* Eyebrow in the page-wide label style */}
        <div className="flex items-center justify-center gap-2">
          <span className="h-px w-6 bg-blue-600" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 [html.lang-hi_&]:text-xs [html.lang-hi_&]:tracking-normal">
            {t("homeV1.govUndertaking", "A Government of Bihar Undertaking")} · {t("homeV2.estd", "Est. 1965")}
          </span>
          <span className="h-px w-6 bg-blue-600" />
        </div>

        {/* Stage: leader, title, leader */}
        <div className="grid grid-cols-2 items-center gap-x-4 gap-y-10 pt-8 lg:grid-cols-[196px_minmax(0,1fr)_196px] lg:gap-12 lg:pt-10">
          {leaders === null ? (
            <LeaderSkeleton className="row-start-2 lg:row-start-1" />
          ) : (
            leaders[0] && <Leader leader={leaders[0]} className="row-start-2 lg:row-start-1" />
          )}

          <div className="relative col-span-2 row-start-1 text-center lg:col-span-1 lg:col-start-2">
            <div aria-hidden className="absolute -inset-x-[8%] -inset-y-[12%] -z-10 bg-[radial-gradient(ellipse_at_center,rgba(244,248,254,0.95)_0%,rgba(244,248,254,0.75)_50%,transparent_80%)]" />
            <p className="font-sora text-2xl font-semibold leading-tight tracking-[-0.02em] text-bt-blue sm:text-3xl lg:text-[2.1rem]">
              {t("homeV1.lead", "Every child, every classroom")}
            </p>
            {/* Two set lines: "Bihar State Textbook" / "Publishing Corporation Ltd." (kept whole from sm up) */}
            <h1 id="v1-title" className="mt-6 text-[2.5rem] font-bold leading-[1.04] tracking-tight text-slate-900 sm:text-[clamp(2.5rem,5.2vw,3.4rem)] lg:text-[clamp(2.6rem,4vw,4rem)] [html.lang-hi_&]:leading-tight">
              <span className="block">{t("homeV1.titleLine1", "Bihar State Textbook")}</span>{" "}
              <span className="block sm:whitespace-nowrap">{t("homeV1.titleLine2", "Publishing Corporation Ltd.")}</span>
            </h1>
            <p className="mx-auto mt-7 max-w-xl text-[15px] font-medium leading-relaxed text-slate-500">
              {t("homeV1.statement", "From Class 1 to Class 12, we publish the textbooks that Bihar Board schools learn from, and put them online for every learner.")}
            </p>

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Link
                to="/books/1"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-bt-blue py-2 pl-6 pr-2 text-[15px] font-bold text-white shadow-xl shadow-bt-navy/25 transition hover:bg-bt-navy"
              >
                {t("homeV1.ctaPrimary", "Browse textbooks")}
                <span className="grid h-10 w-10 place-items-center rounded-full bg-mango text-bt-navy transition group-hover:translate-x-0.5">
                  <ArrowRight size={16} aria-hidden="true" />
                </span>
              </Link>
              <Link
                to="/notice"
                className="inline-flex items-center justify-center rounded-full border border-bt-navy/25 bg-white/70 px-6 py-3.5 text-sm font-bold text-bt-navy backdrop-blur transition hover:border-bt-blue hover:bg-white"
              >
                {t("homeV1.ctaSecondary", "Notices & tenders")}
              </Link>
            </div>
          </div>

          {leaders === null ? (
            <LeaderSkeleton align="right" className="row-start-2 lg:col-start-3 lg:row-start-1" />
          ) : (
            leaders[1] && <Leader leader={leaders[1]} align="right" zoom={0.78} className="row-start-2 lg:col-start-3 lg:row-start-1" />
          )}
        </div>
      </div>
      </div>
    </section>
  );
}

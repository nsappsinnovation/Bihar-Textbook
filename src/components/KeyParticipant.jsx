import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Topography from "./Topography";
import useLeaders, { initialsOf } from "./home-shared/useLeaders";

export default function KeyParticipant() {
  const { t } = useTranslation();
  // Leaders are managed in Admin → Leaders (same request as the home hero)
  const data = useLeaders();

  return (
    <section id="key-participants" className="relative isolate overflow-hidden bg-[#0b2b4f] py-16 md:py-24 px-6 font-sans">
      {/* Animated contour lines, masked to fade out toward the top-left */}
      <Topography className="absolute z-0 -right-[10%] -bottom-[18%] w-[78%] h-[112%] opacity-90 [mask-image:radial-gradient(ellipse_at_62%_58%,#000_0%,rgba(0,0,0,0.92)_44%,transparent_76%)]" />
      {/* Brand-blue glow, depth gradient and a faint 64px grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 82% 78%, rgba(96,165,250,0.14), transparent 34%), linear-gradient(180deg, rgba(13,14,35,0.24), rgba(13,14,35,0.62)), linear-gradient(rgba(248,250,252,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(248,250,252,0.035) 1px, transparent 1px)",
          backgroundSize: "auto, auto, 64px 64px, 64px 64px",
        }}
      />
      <div className="relative z-[2] max-w-[1400px] mx-auto">
        {/* --- Minimalist Header (Matching FlagshipEvents) --- */}
        <div className="max-w-[1280px] mx-auto mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-6 bg-[#60a5fa]"></div>
              <span className="text-[10px] font-bold text-[#60a5fa] uppercase tracking-[0.2em]">{t("keyParticipant.badge", "Leadership")}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 leading-tight">
              {t("keyParticipant.heading", "Leading The Way")} <br />
              <span className="text-white/50 font-medium">{t("keyParticipant.headingHighlight", "In Educational Excellence")}</span>
            </h2>
            <p className="text-sm text-white/60 font-medium leading-relaxed mb-4">
              {t("keyParticipant.description", "Meet the visionary leaders shaping the future of learning in Bihar.")}
            </p>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto">
          {/* A swipeable row on phones, a grid from sm up */}
          <div className="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 -mx-4 px-4 pb-6 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
            {data === null
              ? [0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-[78%] shrink-0 snap-start sm:w-full sm:shrink">
                    <div className="h-[390px] rounded-2xl bg-white/[0.06] animate-pulse" />
                  </div>
                ))
              : data.map((item) => (
                  <div key={item.id ?? item.name} className="w-[78%] shrink-0 snap-start sm:w-full sm:shrink">
                    <ParticipantCard item={item} />
                  </div>
                ))}
          </div>
          {data?.length === 0 && (
            <p className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-10 text-center text-sm font-medium text-white/60">
              {t("keyParticipant.empty", "Leadership details will be published here soon.")}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
function ParticipantCard({ item }) {
  const { t } = useTranslation();

  const getTranslatedInfo = (name, role) => {
    const nameLower = name ? String(name).toLowerCase() : "";
    if (nameLower.includes("samrat")) {
      return { name: t("keyParticipant.leaders.samrat.name", name), role: t("keyParticipant.leaders.samrat.role", role) };
    }
    if (nameLower.includes("mithilesh")) {
      return { name: t("keyParticipant.leaders.mithilesh.name", name), role: t("keyParticipant.leaders.mithilesh.role", role) };
    }
    if (nameLower.includes("vinod")) {
      return { name: t("keyParticipant.leaders.vinod.name", name), role: t("keyParticipant.leaders.vinod.role", role) };
    }
    if (nameLower.includes("rajiv")) {
      return { name: t("keyParticipant.leaders.rajiv.name", name), role: t("keyParticipant.leaders.rajiv.role", role) };
    }
    if (nameLower.includes("dharmendra")) {
      return { name: t("keyParticipant.leaders.dharmendra.name", name), role: t("keyParticipant.leaders.dharmendra.role", role) };
    }
    if (nameLower.includes("yatendra")) {
      return { name: t("keyParticipant.leaders.yatendra.name", name), role: t("keyParticipant.leaders.yatendra.role", role) };
    }
    return { name, role };
  };

  const info = getTranslatedInfo(item.name, item.role);

  return (
    <div
      className="
        group relative h-[390px] overflow-hidden cursor-pointer
        rounded-2xl bg-white border border-gray-100
      "
    >
      {/* BLUE BACKGROUND */}
      <div
        className="
          absolute inset-0 bg-[#332F82]
          transition-[clip-path] duration-[1800ms]
          ease-in-out
          z-0
          [clip-path:ellipse(75%_50%_at_50%_100%)]
          group-hover:[clip-path:ellipse(180%_180%_at_50%_50%)]
        "
      />

      {/* TEXT */}
      <div className="relative z-20 p-5 lg:p-4">
        <h3
          className="
            text-lg lg:text-base font-bold text-[#1a1a1a] leading-snug
            transition-colors duration-[1800ms] ease-in-out
            group-hover:text-white
          "
        >
          {info.name}
        </h3>

        <p
          className="
            mt-2 lg:mt-1.5 text-[13px] lg:text-xs leading-relaxed text-gray-500 font-medium
            transition-colors duration-[1800ms] ease-in-out
            group-hover:text-indigo-100
          "
        >
          {info.role}
        </p>
      </div>

      {/* IMAGE FIXED TO CARD BOTTOM */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-center">
        {item.image ? (
          <LeaderPhoto key={item.image} src={item.image} alt={item.name} />
        ) : (
          // No photo uploaded: show initials instead of requesting a stand-in image
          <div className="mb-10 grid h-32 w-32 place-items-center rounded-full bg-slate-100 text-4xl font-bold text-slate-400 transition-colors duration-[1800ms] group-hover:bg-white/15 group-hover:text-white/80">
            {initialsOf(item.name)}
          </div>
        )}
      </div>
    </div>
  );
}

// Leader photos are uploaded at different widths and heights. Every photo gets the same fixed
// frame, and object-cover fills that frame from the image regardless of its original size — so
// every card shows the same frame size no matter what dimensions were uploaded. object-cover
// alone only crops the one axis that doesn't already match the frame's shape: a square photo
// (e.g. 438x438) crops left/right but keeps its full height, so whatever headroom/shoulders was
// in that photo stays fully visible and the face reads small; a tall photo (e.g. 750x938) crops
// top/bottom instead, trimming that same headroom, so the face reads bigger. The small extra
// zoom below crops a bit off every photo on both axes — square or tall — instead of leaving one
// axis completely uncropped, so heads come out a much closer size across different photo shapes.
function LeaderPhoto({ src, alt, onError }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-[230px] max-w-[88%] lg:w-[210px] aspect-[23/27] overflow-hidden origin-bottom transition-transform duration-[1500ms] ease-in-out group-hover:scale-105">
      <img
        loading="lazy"
        decoding="async"
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          setLoaded(true);
          onError?.(e);
        }}
        className={`absolute inset-0 w-full h-full object-cover object-top origin-top scale-110 drop-shadow-2xl transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

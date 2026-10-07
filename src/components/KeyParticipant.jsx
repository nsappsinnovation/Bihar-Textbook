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
          <LeaderPhoto key={item.image} src={item.image} alt={item.name} boost={/samrat/i.test(item.name) ? CM_PHOTO_BOOST : 1} />
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

// Leader photos are transparent cut-outs uploaded at different sizes and crops (some tight on the head,
// some with headroom and more torso). Every photo gets the same frame, and once loaded we read its alpha
// channel to find the head, then scale and place the photo so every head is the same width and starts at
// the same height. If the pixels can't be read (e.g. a cross-origin upload in local dev) it falls back to
// filling the frame from the top.
const FRAME_ASPECT = 23 / 27; // width / height, matches aspect-[23/27] on the frame
const HEAD_WIDTH = 0.42; // head width as a fraction of the frame width
const CM_PHOTO_BOOST = 1.18; // the Chief Minister's photo is shown a bit larger than the rest
const HEAD_TOP = 0.08; // gap above the head as a fraction of the frame height

function measureHead(img) {
  const w = 120;
  const h = Math.max(1, Math.round((img.naturalHeight / img.naturalWidth) * w));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(img, 0, 0, w, h);
  const { data } = ctx.getImageData(0, 0, w, h); // throws on a cross-origin image

  const rowSpan = (y) => {
    let left = -1;
    let right = -1;
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * 4 + 3] > 128) {
        if (left < 0) left = x;
        right = x;
      }
    }
    return left < 0 ? null : [left, right + 1];
  };

  let top = 0;
  while (top < h && !rowSpan(top)) top++;
  if (top >= h) return null;

  // Head width: median span across rows 8-16% down the figure (forehead to eyes)
  const spans = [];
  for (let y = Math.round(top + 0.08 * (h - top)); y <= Math.round(top + 0.16 * (h - top)) && y < h; y++) {
    const span = rowSpan(y);
    if (span) spans.push(span);
  }
  if (!spans.length) return null;
  spans.sort((a, b) => a[1] - a[0] - (b[1] - b[0]));
  const [left, right] = spans[Math.floor(spans.length / 2)];
  // A span as wide as the photo means the crop is so tight there's no clear head outline
  if (right - left > 0.9 * w) return null;

  return { top: top / h, headWidth: (right - left) / w, headCenter: (left + right) / 2 / w, ratio: img.naturalHeight / img.naturalWidth };
}

function LeaderPhoto({ src, alt, boost = 1, onError }) {
  const [layout, setLayout] = useState(null); // null = measuring, false = fallback, object = placement

  const place = (img) => {
    try {
      const m = measureHead(img);
      if (!m) return setLayout(false);
      const frameHeight = 1 / FRAME_ASPECT; // in frame widths
      const headTop = HEAD_TOP * frameHeight;
      // Rendered image width in frame widths; grow it if needed so the photo still reaches the frame's bottom edge
      const minScale = (frameHeight - headTop) / ((1 - m.top) * m.ratio);
      const scale = Math.max(HEAD_WIDTH / m.headWidth, minScale) * boost;
      const y = headTop - m.top * scale * m.ratio;
      setLayout({
        width: `${scale * 100}%`,
        left: `${(0.5 - m.headCenter * scale) * 100}%`,
        top: `${(y / frameHeight) * 100}%`,
      });
    } catch {
      setLayout(false);
    }
  };

  return (
    <div className="relative w-[230px] max-w-[88%] lg:w-[210px] aspect-[23/27] overflow-hidden origin-bottom transition-transform duration-[1500ms] ease-in-out group-hover:scale-105">
      <img
        loading="lazy"
        decoding="async"
        src={src}
        alt={alt}
        onLoad={(e) => place(e.currentTarget)}
        onError={(e) => {
          setLayout(false);
          onError?.(e);
        }}
        style={layout ? { position: "absolute", maxWidth: "none", height: "auto", ...layout } : undefined}
        className={`drop-shadow-2xl transition-opacity duration-300 ${layout === null ? "opacity-0" : "opacity-100"} ${
          layout ? "" : "absolute inset-0 w-full h-full object-cover object-top"
        }`}
      />
    </div>
  );
}

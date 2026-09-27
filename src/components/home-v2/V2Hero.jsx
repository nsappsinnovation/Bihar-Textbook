import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Check } from "lucide-react";

function Chip({ children, className = "" }) {
  return (
    <span className={`absolute z-20 inline-flex items-center gap-2 rounded-full border border-slate-100 bg-white px-3.5 py-2 text-xs font-semibold text-bt-navy shadow-[0_14px_30px_-12px_rgba(11,43,79,0.35)] ${className}`}>
      {children}
    </span>
  );
}

const Tick = () => (
  <span className="grid h-4 w-4 place-items-center rounded-full bg-bt-navy text-white">
    <Check size={10} strokeWidth={3} aria-hidden="true" />
  </span>
);

// Editorial hero: serif headline on the left, a collage of classroom images
// with floating labels on the right
export default function V2Hero() {
  const { t } = useTranslation();
  const tags = [t("homeV2.tagHindi", "Hindi"), t("homeV2.tagUrdu", "Urdu"), t("homeV2.tagScience", "Science")];

  return (
    <section aria-labelledby="v2-title" className="relative overflow-hidden bg-white font-manrope">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:pb-24 lg:pt-36">
        {/* Copy */}
        <div>
          <p className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600">
            <span className="text-mango" aria-hidden="true">★</span>
            <strong className="text-bt-navy">{t("homeV2.estd", "Est. 1965")}</strong>
            {t("homeV2.gov", "· A Government of Bihar Undertaking")}
          </p>
          <h1 id="v2-title" className="font-serif text-[2.9rem] leading-[1.02] text-bt-ink sm:text-6xl lg:text-[4.4rem] [html.lang-hi_&]:leading-[1.2]">
            {t("homeV2.title", "Textbooks for every classroom in Bihar")}
          </h1>
          <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-slate-600">
            {t("homeV2.lead", "The Bihar State Textbook Publishing Corporation prints the books Bihar Board schools learn from, Class 1 to 12, and takes learning further with audio, sign language and virtual reality.")}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/books/1" className="inline-flex items-center gap-2 rounded-full bg-bt-navy px-6 py-3.5 text-sm font-bold text-white transition hover:bg-bt-blue">
              {t("homeV2.ctaPrimary", "Browse textbooks")} <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/notice" className="inline-flex items-center rounded-full border border-bt-navy/80 px-6 py-3.5 text-sm font-bold text-bt-navy transition hover:bg-bt-navy hover:text-white">
              {t("homeV2.ctaSecondary", "Notices & tenders")}
            </Link>
          </div>
        </div>

        {/* Collage */}
        <div className="relative mx-auto h-[440px] w-full max-w-[520px] sm:h-[540px]">
          <div aria-hidden className="absolute inset-x-6 inset-y-8 rounded-[48px] bg-bt-sky" />
          <div aria-hidden className="absolute -left-6 top-10 h-40 w-40 rounded-full bg-mango/25 blur-3xl" />

          {/* Main image */}
          <div className="absolute left-1/2 top-0 z-10 h-[360px] w-[250px] -translate-x-1/2 overflow-hidden rounded-[30px] border-[6px] border-white shadow-[0_30px_60px_-24px_rgba(11,43,79,0.45)] sm:h-[440px] sm:w-[300px]">
            <img src="/images/hero/audio.webp" alt="" className="h-full w-full object-cover object-[46%_50%]" />
            <span className="absolute left-3 top-3 rounded-full bg-bt-bright px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              {t("homeV2.liveTag", "Audio library")}
            </span>
          </div>

          {/* Small image card */}
          <div className="absolute bottom-6 left-0 z-20 hidden w-[150px] overflow-hidden rounded-2xl border-4 border-white bg-white shadow-xl sm:block">
            <img src="/images/hero/sign.webp" alt="" className="h-[120px] w-full object-cover object-[40%_60%]" />
            <p className="px-2 py-2 text-[11px] font-bold text-bt-navy">{t("homeV2.signCard", "Sign language classes")}</p>
          </div>

          {/* Stat card */}
          <div className="absolute bottom-16 right-0 z-20 w-[150px] rounded-2xl bg-bt-blue p-4 text-white shadow-xl sm:bottom-24 sm:w-[170px]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">{t("homeV2.statEyebrow", "Textbooks for")}</p>
            <p className="mt-1 whitespace-nowrap font-serif text-2xl leading-none sm:text-3xl">{t("homeV2.statValue", "Class 1–12")}</p>
            <p className="mt-2 text-[11px] leading-snug text-white/80">{t("homeV2.statText", "Every Bihar Board class")}</p>
          </div>

          <Chip className="right-2 top-8 sm:right-0"><Tick /> {t("homeV2.chip1", "Bihar Board curriculum")}</Chip>
          <Chip className="right-6 top-[5.5rem] sm:right-2"><Tick /> {t("homeV2.chip2", "Read online")}</Chip>

          {/* Tag row */}
          <div className="absolute -bottom-2 left-1/2 z-20 w-max -translate-x-1/2 rounded-2xl bg-white p-3 shadow-[0_18px_40px_-16px_rgba(11,43,79,0.4)]">
            <p className="mb-2 text-[11px] font-bold text-bt-navy">{t("homeV2.tagsTitle", "Find books by subject")}</p>
            <div className="flex gap-1.5">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full border border-bt-blue/20 bg-bt-sky px-2.5 py-1 text-[11px] font-semibold text-bt-blue">+ {tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

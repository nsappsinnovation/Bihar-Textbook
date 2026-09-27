import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";

// One spine per class; heights and colours vary like books on a real shelf
const SPINES = [
  { h: "h-[210px]", bg: "bg-bt-blue", fg: "text-white", band: "bg-mango" },
  { h: "h-[240px]", bg: "bg-mango", fg: "text-bt-navy", band: "bg-bt-navy" },
  { h: "h-[195px]", bg: "bg-bt-navy", fg: "text-white", band: "bg-[#8ab4f8]" },
  { h: "h-[228px]", bg: "bg-[#b9a6ea]", fg: "text-bt-navy", band: "bg-white" },
  { h: "h-[250px]", bg: "bg-[#2f8f6f]", fg: "text-white", band: "bg-mango" },
  { h: "h-[205px]", bg: "bg-[#f6c9ad]", fg: "text-bt-navy", band: "bg-bt-blue" },
  { h: "h-[236px]", bg: "bg-bt-bright", fg: "text-white", band: "bg-white" },
  { h: "h-[200px]", bg: "bg-[#0d0e23]", fg: "text-white", band: "bg-mango" },
  { h: "h-[244px]", bg: "bg-[#9fd8c2]", fg: "text-bt-navy", band: "bg-bt-navy" },
  { h: "h-[218px]", bg: "bg-bt-blue", fg: "text-white", band: "bg-[#f6c9ad]" },
  { h: "h-[232px]", bg: "bg-mango", fg: "text-bt-navy", band: "bg-bt-blue" },
  { h: "h-[254px]", bg: "bg-bt-navy", fg: "text-white", band: "bg-mango" },
];

// White band right under the hero: the class picker drawn as a shelf of textbooks
export default function V1Bookshelf() {
  const { t } = useTranslation();

  return (
    <section className="relative isolate overflow-hidden bg-white px-6 py-20 font-sans md:px-12 lg:px-24 lg:py-24">
      <div aria-hidden className="absolute -right-32 -top-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-mango/25 blur-[110px]" />

      <div className="mx-auto grid max-w-[1280px] items-end gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:pb-10">
          <SectionHeader
            eyebrow={t("homeV1.classes", "Class 1 to 12")}
            title={t("homeV1.ctaTitle", "Find your textbooks")}
            description={t("homeV1.shelfText", "Take a book off the shelf: pick your class to read every Bihar Board textbook for it online.")}
          />
          <Link to="/contact" className="mt-3 inline-flex items-center gap-2 border-b-2 border-slate-900 pb-0.5 text-sm font-bold text-slate-900 transition hover:gap-3">
            {t("homeV1.ctaContact", "Need help? Contact the corporation")} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <nav aria-label={t("homeV1.ctaTitle", "Find your textbooks")} className="-mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
          <div className="relative w-max min-w-full pt-10">
            <ul className="flex items-end gap-1.5 px-3">
              {SPINES.map((s, i) => {
                const classId = i + 1;
                return (
                  <li key={classId}>
                    <Link
                      to={`/books/${classId}`}
                      aria-label={t("nav.classN", { classId, defaultValue: `Class ${classId}` })}
                      className={`group relative flex w-[44px] flex-col items-center justify-between overflow-hidden rounded-t-[6px] rounded-b-[3px] py-3 shadow-[inset_-6px_0_0_rgba(0,0,0,0.12),inset_2px_0_0_rgba(255,255,255,0.25)] transition-transform duration-300 hover:-translate-y-5 sm:w-[48px] xl:w-[52px] ${s.h} ${s.bg} ${s.fg}`}
                    >
                      <span aria-hidden className={`h-1.5 w-full ${s.band}`} />
                      <span aria-hidden className="text-[10px] font-extrabold uppercase tracking-[0.2em] [writing-mode:vertical-rl] rotate-180 opacity-80">
                        {t("homeV1.spineLabel", "Class")}
                      </span>
                      <span aria-hidden className="text-2xl font-black leading-none tracking-tight sm:text-[1.6rem]">{classId}</span>
                      <span aria-hidden className={`h-1.5 w-full ${s.band}`} />
                    </Link>
                  </li>
                );
              })}
            </ul>
            {/* Shelf */}
            <div aria-hidden className="h-4 rounded-sm bg-gradient-to-b from-[#b7864f] to-[#8a5e33] shadow-[0_18px_30px_-12px_rgba(60,35,10,0.55)]" />
            <div aria-hidden className="mx-6 h-3 bg-gradient-to-b from-[#6e4a26]/60 to-transparent" />
          </div>
        </nav>
      </div>
    </section>
  );
}

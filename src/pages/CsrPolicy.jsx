import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FileText, Users, Layers, IndianRupee, Settings2,
  Target, LineChart, Info, BookMarked, ScrollText,
  Download, Printer, ArrowUp, List, ChevronDown, FileDown
} from "lucide-react";
import { csrPolicyDefaults, csrPolicyContents, romanize, loadCsrPolicy } from "../data/csrPolicyData";
import { fileUrl } from "../services/api";

const sectionIcons = {
  introduction: FileText,
  vision: ScrollText,
  committee: Users,
  scope: Layers,
  budget: IndianRupee,
  implementation: Settings2,
  activities: Target,
  monitoring: LineChart,
  miscellaneous: Info,
  annexure: BookMarked
};

/* Print rules: strip the chrome so "Print / Save as PDF" yields a clean document */
const printStyles = `
  @media print {
    .csr-no-print { display: none !important; }
    .csr-doc { box-shadow: none !important; border: none !important; padding: 0 !important; }
    .csr-section { break-inside: avoid; page-break-inside: avoid; border: none !important;
                   box-shadow: none !important; padding: 0 0 18px 0 !important; }
    body { background: #fff !important; }
  }
`;

/* ---------- Building blocks ---------- */

const Section = ({ no, anchor, title, sectionLabel = "Section", children }) => {
  const Icon = sectionIcons[anchor] || FileText;
  return (
    <motion.section
      id={anchor}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="csr-section scroll-mt-28 bg-white border border-slate-200/80 rounded-[28px] p-7 md:p-11 shadow-[0_2px_20px_rgb(15,23,42,0.04)] hover:shadow-[0_8px_36px_rgb(15,23,42,0.07)] transition-shadow duration-300"
    >
      <div className="flex items-start gap-4 md:gap-5 pb-6 mb-7 border-b border-slate-100">
        <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
          <Icon className="w-[22px] h-[22px]" />
        </div>
        <div className="pt-0.5">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-1.5">
            {sectionLabel} {no}
          </div>
          <h2 className="text-[20px] md:text-[25px] font-black text-slate-900 leading-[1.2] tracking-tight">
            {title}
          </h2>
        </div>
      </div>
      <div>{children}</div>
    </motion.section>
  );
};

const Paragraph = ({ children }) => (
  <p className="text-[15.5px] text-slate-600 font-medium leading-[1.9] mb-5 last:mb-0">
    {children}
  </p>
);

/* Bulleted list — the objectives in section 2 are bulleted in the source document */
const BulletList = ({ items }) => (
  <ul className="space-y-4">
    {items.map((item, idx) => (
      <li
        key={idx}
        className="flex gap-4 rounded-2xl px-4 py-3.5 -mx-1 hover:bg-slate-50/80 transition-colors"
      >
        <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-[11px]" />
        <span className="text-[15px] text-slate-600 font-medium leading-[1.85]">{item}</span>
      </li>
    ))}
  </ul>
);

/* Roman-numbered list — mirrors the (i), (ii), (iii) clause numbering of the document */
const RomanList = ({ items }) => (
  <ol className="space-y-2">
    {items.map((item, idx) => (
      <li
        key={idx}
        className="group flex gap-4 rounded-2xl px-4 py-4 -mx-1 hover:bg-blue-50/40 transition-colors"
      >
        <span className="shrink-0 w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-blue-100 border border-slate-200 group-hover:border-blue-200 text-[11px] font-black text-slate-500 group-hover:text-blue-700 flex items-center justify-center transition-colors">
          {romanize(idx)}
        </span>
        <span className="text-[15px] text-slate-600 font-medium leading-[1.85] pt-1">{item}</span>
      </li>
    ))}
  </ol>
);

/* Primary download control, reused in the hero, sidebar and mobile bar */
const DownloadButton = ({ url, fileName, size, label = "Download Policy (PDF)", variant = "primary", className = "" }) => {
  const base =
    "csr-no-print group inline-flex items-center justify-center gap-3 rounded-2xl font-black transition-all";
  const styles = {
    primary:
      "px-7 py-4 bg-blue-600 text-white text-[14px] shadow-xl shadow-blue-600/25 hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-600/30 hover:-translate-y-0.5",
    ghost:
      "px-7 py-4 bg-white border border-slate-200 text-slate-700 text-[14px] hover:border-slate-300 hover:bg-slate-50",
    block:
      "w-full px-5 py-4 bg-blue-600 text-white text-[13px] shadow-lg shadow-blue-600/20 hover:bg-blue-700"
  };
  return (
    <a
      href={url}
      download={fileName}
      className={`${base} ${styles[variant]} ${className}`}
    >
      <Download className="w-[18px] h-[18px] transition-transform group-hover:translate-y-0.5" />
      <span>{label}</span>
      {size && (
        <span
          className={`text-[11px] font-bold ${
            variant === "ghost" ? "text-slate-400" : "text-white/70"
          }`}
        >
          {size}
        </span>
      )}
    </a>
  );
};

const CsrPolicy = () => {
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';

  const [csr, setCsr] = useState(csrPolicyDefaults);
  const [activeSection, setActiveSection] = useState("introduction");
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  /* Content is managed in Admin → CSR Policy */
  useEffect(() => {
    loadCsrPolicy(i18n.language).then(setCsr);
  }, [i18n.language]);

  /* Reading progress + back-to-top visibility */
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      setProgress(scrollable > 0 ? (el.scrollTop / scrollable) * 100 : 0);
      setShowTop(el.scrollTop > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToSection = useCallback((anchor) => {
    setActiveSection(anchor);
    setMobileTocOpen(false);
  }, []);

  const activeIndex = csrPolicyContents.findIndex((s) => s.anchor === activeSection);

  const getSectionTitle = (anchor, defaultTitle) => {
    const item = csrPolicyContents.find(s => s.anchor === anchor);
    if (!item) return defaultTitle;
    return isHindi ? item.titleHi : item.titleEn;
  };

  const sectionLabelText = isHindi ? 'अनुभाग' : 'Section';

  return (
    <div className="bg-[#F7F8FA] min-h-screen font-sans text-slate-800 pb-32 lg:pb-24">
      <style>{printStyles}</style>

      {/* ================= READING PROGRESS ================= */}
      <div className="csr-no-print fixed top-0 left-0 right-0 h-1 bg-transparent z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-700 transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ================= HERO ================= */}
      <section className="relative w-full overflow-hidden bg-white">
        <div
          className="absolute inset-0 z-0 opacity-70"
          style={{
            backgroundImage: `url('images/csr.webp')`,
            backgroundPosition: "right center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/20 md:to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 md:py-28">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 text-[10px] md:text-[11px] font-black uppercase tracking-[0.18em] text-blue-700 border border-blue-200 bg-blue-50/80 rounded-full pl-3 pr-4 py-2 mb-7"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              {csr.organisation}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-[38px] md:text-[58px] font-black text-slate-900 leading-[1.05] tracking-tight"
            >
              {t('csrPolicyPage.titlePart1', 'Corporate Social')}<br />
              <span className="text-blue-700">{t('csrPolicyPage.titlePart2', 'Responsibility Policy')}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex flex-wrap items-center gap-2.5"
            >
              {[
                t('csrPolicyPage.sectionsCount', { count: csrPolicyContents.length, defaultValue: `${csrPolicyContents.length} Sections` }),
                t('csrPolicyPage.companiesAct', 'Companies Act, 2013'),
                t('csrPolicyPage.scheduleVII', 'Schedule VII'),
                t('csrPolicyPage.csrRules', 'CSR Rules, 2014')
              ].map((chip) => (
                <span
                  key={chip}
                  className="text-[11px] font-bold text-slate-500 bg-white/90 border border-slate-200 rounded-lg px-3 py-2"
                >
                  {chip}
                </span>
              ))}
            </motion.div>

            {/* Primary calls to action */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-3"
            >
              <DownloadButton
                url={fileUrl(csr.pdfUrl)}
                fileName={csr.pdfFileName}
                size={csr.pdfSizeLabel}
                label={t('csrPolicyPage.downloadPdf', 'Download Policy (PDF)')}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= MOBILE CONTENTS (collapsible) ================= */}
      <div className="csr-no-print lg:hidden max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          <button
            onClick={() => setMobileTocOpen((v) => !v)}
            className="w-full flex items-center justify-between px-5 py-4"
          >
            <span className="flex items-center gap-3 text-[13px] font-black text-slate-900 uppercase tracking-wider">
              <List className="w-4 h-4 text-blue-600" />
              {t('csrPolicyPage.contents', 'Contents')}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform ${
                mobileTocOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence initial={false}>
            {mobileTocOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden border-t border-slate-100"
              >
                <div className="p-3 space-y-1">
                  {csrPolicyContents.map((item) => {
                    const topicText = isHindi ? item.topicHi : item.topicEn;
                    return (
                      <button
                        key={item.anchor}
                        onClick={() => goToSection(item.anchor)}
                        className={`w-full flex gap-3 items-start text-left rounded-xl px-3 py-2.5 transition-colors ${
                          activeSection === item.anchor
                            ? "bg-blue-50 text-blue-700"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-[11px] font-black text-slate-400 shrink-0 mt-[2px]">
                          {String(item.no).padStart(2, "0")}
                        </span>
                        <span className="text-[12.5px] font-bold leading-snug">{topicText}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ================= CONTENTS + DOCUMENT ================= */}
      <div className="csr-doc relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 lg:mt-14">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* --- Sidebar: contents + download --- */}
          <aside className="csr-no-print hidden lg:block lg:w-[310px] shrink-0">
            <div className="lg:sticky lg:top-24 space-y-4">

              <div className="bg-white border border-slate-200 rounded-[28px] p-6 shadow-[0_4px_28px_rgb(15,23,42,0.05)]">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-[12px] font-black uppercase tracking-[0.15em] text-slate-900">
                    {t('csrPolicyPage.contents', 'Contents')}
                  </h2>
                  <span className="text-[10px] font-black text-slate-400 tabular-nums">
                    {Math.max(activeIndex + 1, 1)} / {csrPolicyContents.length}
                  </span>
                </div>

                <nav className="space-y-0.5">
                  {csrPolicyContents.map((item) => {
                    const isActive = activeSection === item.anchor;
                    const topicText = isHindi ? item.topicHi : item.topicEn;
                    return (
                      <button
                        key={item.anchor}
                        onClick={() => goToSection(item.anchor)}
                        className={`relative w-full flex gap-3 items-start text-left rounded-xl pl-4 pr-3 py-2.5 transition-all ${
                          isActive
                            ? "bg-blue-50 text-blue-700"
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                        }`}
                      >
                        <span
                          className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full bg-blue-600 transition-all ${
                            isActive ? "h-6 opacity-100" : "h-0 opacity-0"
                          }`}
                        />
                        <span
                          className={`text-[10px] font-black shrink-0 mt-[3px] tabular-nums ${
                            isActive ? "text-blue-600" : "text-slate-300"
                          }`}
                        >
                          {String(item.no).padStart(2, "0")}
                        </span>
                        <span className="text-[12.5px] font-bold leading-snug">{topicText}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>


            </div>
          </aside>

          {/* --- Policy body --- */}
          <div className="flex-1 space-y-5">

            {/* 1. Introduction & Background */}
            {activeSection === "introduction" && (
              <Section no={1} anchor="introduction" title={getSectionTitle('introduction', 'Introduction & Background')} sectionLabel={sectionLabelText}>
                {csr.introParagraphs.map((para, idx) => (
                  <Paragraph key={idx}>{para}</Paragraph>
                ))}
              </Section>
            )}

            {/* 2. CSR Vision & Policy Statement */}
            {activeSection === "vision" && (
              <Section
                no={2}
                anchor="vision"
                title={getSectionTitle('vision', 'CSR Vision & Policy Statement — Objectives of this CSR Policy')}
                sectionLabel={sectionLabelText}
              >
                <Paragraph>{csr.objectivesIntro}</Paragraph>
                <div className="mt-6">
                  <BulletList items={csr.objectives} />
                </div>
              </Section>
            )}

            {/* 3. CSR Committee Composition and Responsibility */}
            {activeSection === "committee" && (
              <Section no={3} anchor="committee" title={getSectionTitle('committee', 'CSR Committee Composition and Responsibility')} sectionLabel={sectionLabelText}>
                <Paragraph>{csr.committeeText}</Paragraph>
              </Section>
            )}

            {/* 4. Scope & Applicability */}
            {activeSection === "scope" && (
              <Section no={4} anchor="scope" title={getSectionTitle('scope', 'Scope & Applicability')} sectionLabel={sectionLabelText}>
                <Paragraph>{csr.scopeText}</Paragraph>
              </Section>
            )}

            {/* 5. CSR Budget */}
            {activeSection === "budget" && (
              <Section no={5} anchor="budget" title={getSectionTitle('budget', 'CSR Budget')} sectionLabel={sectionLabelText}>
                <RomanList items={csr.budgetItems} />
              </Section>
            )}

            {/* 6. Implementation */}
            {activeSection === "implementation" && (
              <Section no={6} anchor="implementation" title={getSectionTitle('implementation', 'Implementation')} sectionLabel={sectionLabelText}>
                <RomanList items={csr.implementationItems} />
              </Section>
            )}

            {/* 7. Activities / Focus Areas */}
            {activeSection === "activities" && (
              <Section no={7} anchor="activities" title={getSectionTitle('activities', 'Activities / Focus Areas')} sectionLabel={sectionLabelText}>
                <Paragraph>{csr.activitiesIntro}</Paragraph>
                <div className="mt-6">
                  <RomanList items={csr.activities} />
                </div>
              </Section>
            )}

            {/* 8. Monitoring */}
            {activeSection === "monitoring" && (
              <Section no={8} anchor="monitoring" title={getSectionTitle('monitoring', 'Monitoring')} sectionLabel={sectionLabelText}>
                <RomanList items={csr.monitoringItems} />
              </Section>
            )}

            {/* 9. Miscellaneous Information */}
            {activeSection === "miscellaneous" && (
              <Section no={9} anchor="miscellaneous" title={getSectionTitle('miscellaneous', 'Miscellaneous Information')} sectionLabel={sectionLabelText}>
                <ol className="space-y-2">
                  {csr.miscellaneousItems.map((item, idx) => (
                    <li
                      key={idx}
                      className="group flex gap-4 rounded-2xl px-4 py-4 -mx-1 hover:bg-blue-50/40 transition-colors"
                    >
                      <span className="shrink-0 w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-blue-100 border border-slate-200 group-hover:border-blue-200 text-[11px] font-black text-slate-500 group-hover:text-blue-700 flex items-center justify-center transition-colors">
                        {romanize(idx)}
                      </span>
                      <span className="text-[15px] text-slate-600 font-medium leading-[1.85] pt-1">
                        <span className="font-black text-slate-900">{item.label}:</span> {item.text}
                      </span>
                    </li>
                  ))}
                </ol>
              </Section>
            )}

            {/* 10. Annexure A */}
            {activeSection === "annexure" && (
              <Section no={10} anchor="annexure" title={getSectionTitle('annexure', 'Annexure')} sectionLabel={sectionLabelText}>
                <a
                  href={fileUrl(csr.pdfUrl)}
                  download={csr.pdfFileName}
                  className="group flex items-center gap-4 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-2xl px-5 py-5 transition-colors"
                >
                  <BookMarked className="w-5 h-5 text-blue-600 shrink-0" />
                  <span className="flex-1 text-[15px] font-bold text-slate-700">
                    {csr.annexureTitle}
                  </span>
                  <Download className="csr-no-print w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </a>
              </Section>
            )}

          </div>
        </div>
      </div>


      {/* ================= BACK TO TOP ================= */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="csr-no-print hidden lg:flex fixed bottom-8 right-8 z-40 w-12 h-12 rounded-2xl bg-slate-900 text-white items-center justify-center shadow-xl hover:bg-black transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CsrPolicy;
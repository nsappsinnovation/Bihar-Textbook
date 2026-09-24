import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiLayers } from 'react-icons/fi';
import {
  BookOpen,
  Calculator,
  ChartColumnIncreasing,
  FileText,
  Settings,
  UserRound,
  Users,
  UsersRound,
  Warehouse,
} from 'lucide-react';

// Brand colours used across the site (navbar, headings)
const BRAND = "#124d9c";
const LINE = "bg-[#124d9c]/35";
const BORDER_LINE = "border-[#124d9c]/35";

const OrgStructure = () => {
  const { t } = useTranslation();
  const k = (key, fallback) => t(`knowUsPage.orgStructure.chart.${key}`, fallback);

  const officers = [
    { key: "companySecretary", label: k("companySecretary", "Company Secretary"), icon: <UsersRound size={20} strokeWidth={2} /> },
    { key: "cao", label: k("cao", "CAO cum Financial Advisor"), icon: <ChartColumnIncreasing size={20} strokeWidth={2} /> },
    { key: "accountsOfficer", label: k("accountsOfficer", "Accounts Officer"), icon: <Calculator size={20} strokeWidth={2} /> },
    { key: "managerPA", label: k("managerPA", "Manager (P & A)"), icon: <UserRound size={20} strokeWidth={2} /> },
    { key: "managerMS", label: k("managerMS", "Manager (M & S)"), icon: <Settings size={20} strokeWidth={2} /> },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12">
      {/* ================= HERO SECTION ================= */}
      <section className="relative text-center mb-16 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-extrabold text-[#0d0e23] tracking-tight mb-4"
        >
          {t("knowUsPage.orgStructure.titlePart1", "Organisational")} <span className="text-blue-600">{t("knowUsPage.orgStructure.titleHighlight", "Structure")}</span>
        </motion.h1>

        <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed font-medium">
          {t("knowUsPage.orgStructure.subtitle", "Our hierarchical framework designed to ensure transparency, accountability, and excellence in the educational publishing ecosystem of Bihar.")}
        </p>
      </section>

      {/* ================= DIAGRAM SECTION ================= */}
      <section className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-transparent border border-slate-300 p-4 md:p-10 relative"
        >
          <div className="relative rounded-2xl bg-white border border-slate-100 px-3 py-10 md:px-8 md:py-12 overflow-hidden">
            {/* Soft brand backdrop */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(18,77,156,0.07),transparent_60%)]" />

            <div className="relative flex flex-col items-center">
              {/* ---------- Top chain ---------- */}
              <TopNode
                icon={<Users size={22} strokeWidth={2} />}
                title={k("board", "Board of Directors")}
                className="bg-gradient-to-br from-[#124d9c] to-[#0b2b4f] text-white border-transparent shadow-[0_12px_30px_-12px_rgba(18,77,156,0.7)]"
                iconClass="bg-white/15 text-white ring-1 ring-white/25"
              />
              <VLine />
              <TopNode
                icon={<FileText size={22} strokeWidth={2} />}
                title={k("secretary", "Secretary,")}
                subtitle={k("educationDepartment", "Education Department")}
                className="bg-white border-[#124d9c]/20 text-[#0d0e23]"
                iconClass="bg-[#124d9c]/10 text-[#124d9c]"
              />
              <VLine />
              <TopNode
                icon={<UserRound size={22} strokeWidth={2} />}
                title={k("managingDirector", "Managing Director")}
                className="bg-[#124d9c]/[0.06] border-[#124d9c]/40 text-[#0d0e23] ring-4 ring-[#124d9c]/[0.06]"
                iconClass="bg-[#124d9c] text-white"
              />

              {/* ---------- Units ---------- */}
              {/* Mobile: straight line down; desktop: branch into the two units */}
              <VLine className="h-8 lg:hidden" />
              <div className="hidden lg:block w-0.5 h-8 bg-[#124d9c]/35" />

              <div className="w-full flex flex-col lg:flex-row lg:items-stretch">
                {/* Publication Unit */}
                <div className="lg:flex-[5] flex flex-col items-center">
                  <BranchTop position="first" />
                  <UnitNode
                    icon={<BookOpen size={20} strokeWidth={2} />}
                    title={k("publicationUnit", "Publication Unit")}
                    iconClass="bg-[#124d9c] text-white"
                  />

                  <VLine className="h-6 lg:h-5" />
                  <div className="hidden lg:block w-full">
                    <div className="flex">
                      {officers.map((o, i) => (
                        <div key={o.key} className="flex-1 flex flex-col items-center">
                          <BranchTop position={i === 0 ? "first" : i === officers.length - 1 ? "last" : "middle"} short />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:flex gap-3 lg:gap-0">
                    {officers.map((o, i) => (
                      <div
                        key={o.key}
                        className={`lg:flex-1 lg:px-1.5 flex flex-col items-center ${i === officers.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}
                      >
                        <OfficerCard icon={o.icon} label={o.label} />
                      </div>
                    ))}
                  </div>

                  <div className="hidden lg:block w-full">
                    <div className="flex">
                      {officers.map((o, i) => (
                        <div key={o.key} className="flex-1 flex flex-col items-center">
                          <BranchBottom position={i === 0 ? "first" : i === officers.length - 1 ? "last" : "middle"} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <VLine className="h-6 lg:h-5" />

                  <TotalCard value={88} label={k("sanctionedPost", "Sanctioned Post")} total={k("total", "Total")} />
                </div>

                {/* Divider between units on mobile */}
                <div className="lg:hidden h-10" />

                {/* Press Unit (Godown) */}
                <div className="lg:flex-[2] flex flex-col items-center">
                  <BranchTop position="last" />
                  <div className="w-full flex-1 flex flex-col items-center lg:pl-6">
                    <UnitNode
                      icon={<Warehouse size={20} strokeWidth={2} />}
                      title={k("pressUnit", "Press Unit (Godown)")}
                      iconClass="bg-[#0b2b4f] text-white"
                    />
                    <div className="w-0.5 flex-1 min-h-8 bg-[#124d9c]/35 relative">
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#124d9c]" />
                    </div>
                    <div className="h-2" />
                    <TotalCard value={279} label={k("sanctionedPost", "Sanctioned Post")} total={k("total", "Total")} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-100">
            <Feature icon={<FiLayers />} title={t("knowUsPage.orgStructure.govTitle", "Governance")} desc={t("knowUsPage.orgStructure.govDesc", "Headed by the Managing Director under the Department of Education, Bihar.")} />
            <Feature icon={<FiLayers />} title={t("knowUsPage.orgStructure.opsTitle", "Operations")} desc={t("knowUsPage.orgStructure.opsDesc", "Structured into specialized wings: Academic, Sales, Accounts, and Printing.")} />
            <Feature icon={<FiLayers />} title={t("knowUsPage.orgStructure.transTitle", "Transparency")} desc={t("knowUsPage.orgStructure.transDesc", "Standard protocols for decision making and administrative flows.")} />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

/* ---------- Chart pieces ---------- */

// "Manager (P & A)" -> "Manager" with "(P & A)" on its own line, so brackets never split mid-way
const SplitLabel = ({ text }) => {
  const match = /^(.*?)\s*(\([^)]*\))$/.exec(text || "");
  if (!match) return text;
  return (
    <>
      {match[1]}
      <span className="block whitespace-nowrap">{match[2]}</span>
    </>
  );
};

// Vertical connector with an arrow dot at the bottom
const VLine = ({ className = "h-8" }) => (
  <div className={`relative w-0.5 ${LINE} ${className}`}>
    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#124d9c]" />
  </div>
);

// Horizontal branch above a child: joins siblings, then drops a stub into the child
const BranchTop = ({ position, short = false }) => (
  <div className="hidden lg:flex w-full flex-col items-center">
    <div className="w-full flex">
      <div className={`h-0.5 flex-1 ${position === "first" ? "" : LINE}`} />
      <div className={`h-0.5 flex-1 ${position === "last" ? "" : LINE}`} />
    </div>
    <div className={`relative w-0.5 ${LINE} ${short ? "h-4" : "h-6"}`}>
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#124d9c]" />
    </div>
  </div>
);

// Mirror of BranchTop: gathers the officer cards into the total below
const BranchBottom = ({ position }) => (
  <div className="w-full flex flex-col items-center">
    <div className={`w-0.5 h-4 ${LINE}`} />
    <div className="w-full flex">
      <div className={`h-0.5 flex-1 ${position === "first" ? "" : LINE}`} />
      <div className={`h-0.5 flex-1 ${position === "last" ? "" : LINE}`} />
    </div>
  </div>
);

const TopNode = ({ icon, title, subtitle, className, iconClass }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className={`w-full max-w-sm rounded-2xl border px-5 py-4 flex items-center gap-4 shadow-sm ${className}`}
  >
    <span className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${iconClass}`}>
      {icon}
    </span>
    <span className="flex flex-col text-left">
      <span className="text-base md:text-lg font-bold leading-tight">{title}</span>
      {subtitle && <span className="text-sm text-slate-500 font-medium">{subtitle}</span>}
    </span>
  </motion.div>
);

const UnitNode = ({ icon, title, iconClass }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: 0.1 }}
    className="w-full max-w-md rounded-2xl border border-[#124d9c]/25 bg-white px-5 py-4 flex items-center justify-center gap-4 shadow-[0_10px_30px_-18px_rgba(18,77,156,0.6)] border-t-4 border-t-[#124d9c]"
  >
    <span className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${iconClass}`}>
      {icon}
    </span>
    <span className="text-base md:text-lg font-bold text-[#0d0e23] leading-tight"><SplitLabel text={title} /></span>
  </motion.div>
);

const OfficerCard = ({ icon, label }) => (
  <div className="w-full h-full min-h-[128px] rounded-2xl border border-slate-200 bg-white px-2 py-4 flex flex-col items-center justify-center gap-3 text-center shadow-sm hover:border-[#124d9c]/40 hover:shadow-md transition-all">
    <span className="w-11 h-11 rounded-full bg-[#124d9c]/[0.08] text-[#124d9c] flex items-center justify-center">
      {icon}
    </span>
    <span className="text-[13px] font-semibold text-[#0d0e23] leading-snug"><SplitLabel text={label} /></span>
  </div>
);

const TotalCard = ({ value, label, total }) => (
  <div className={`rounded-2xl border ${BORDER_LINE} bg-[#124d9c]/[0.05] px-6 py-3.5 flex items-center gap-4`}>
    <span className="w-11 h-11 rounded-full bg-white text-[#124d9c] flex items-center justify-center shadow-sm">
      <Users size={20} strokeWidth={2} />
    </span>
    <span className="flex flex-col leading-tight">
      <span className="text-sm font-semibold text-[#0d0e23]">
        {total} <span className="text-2xl font-extrabold" style={{ color: BRAND }}>{value}</span>
      </span>
      <span className="text-xs text-slate-500 font-medium">{label}</span>
    </span>
  </div>
);

/* Helper Component */
const Feature = ({ icon, title, desc }) => (
  <div className="flex flex-col gap-3">
    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
      {icon}
    </div>
    <h3 className="text-sm font-black text-[#0d0e23]">{title}</h3>
    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

export default OrgStructure;

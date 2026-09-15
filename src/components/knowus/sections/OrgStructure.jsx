import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiLayers } from 'react-icons/fi';

const OrgStructure = () => {
  const { t } = useTranslation();

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
      <section className="max-w-5xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-transparent border border-slate-300 p-4 md:p-12 relative group"
        >
          

          <div className="relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center min-h-[500px]">
            <img loading="lazy" decoding="async"
              src="/images/classes/orgstructure.webp"
              alt="BSTBPC Organisational Hierarchy"
              className="w-full h-auto object-contain transition-transform duration-700 hover:scale-105"
              onError={(e) => {
                e.target.src = "https://placehold.co/1200x800/f8fafc/64748b?text=Organisational+Structure+Diagram";
              }}
            />
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

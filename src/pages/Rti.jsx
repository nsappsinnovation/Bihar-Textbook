import React from "react";
import { FiUser, FiPhone, FiMail, FiMapPin, FiExternalLink, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getSetting } from "../services/settingService";

const disclosureItems = [
  { key: "orgStructure", defaultText: "Organization Structure" },
  { key: "duties", defaultText: "Duties & Responsibilities" },
  { key: "decisionMaking", defaultText: "Decision Making Process" },
  { key: "directory", defaultText: "Directory of Officers" },
  { key: "remuneration", defaultText: "Monthly Remuneration" },
  { key: "budget", defaultText: "Budget Allocation" },
  { key: "subsidy", defaultText: "Execution of Subsidy Programs" },
  { key: "licenses", defaultText: "Grant of Licenses" }
];

const RTI = () => {
  const { t } = useTranslation();
  // Managed in Admin → RTI. null = loading, {} = not published yet.
  const [rtiData, setRtiData] = React.useState(null);

  React.useEffect(() => {
    getSetting('dc-rti')
      .then((value) => setRtiData(value && typeof value === 'object' ? value : {}))
      .catch(() => setRtiData({}));
  }, []);

  const loading = rtiData === null;
  const notAvailable = t('rtiPage.notAvailable', 'Not available yet');
  const show = (value) => (loading ? null : value || notAvailable);

  // The corporation's office address is fixed; the RTI officer's details come only from the admin panel
  const OFFICE_ADDRESS = 'Pathya Pustak Bhawan, Buddh Marg, Budh Vihar, Fraser Road Area, Patna - 800001';
  const displayAddress = !rtiData?.address || rtiData.address === OFFICE_ADDRESS
    ? t('rtiPage.defaultAddress', OFFICE_ADDRESS)
    : rtiData.address;

  return (
    <div className="min-h-screen bg-[#f8fafc] -mt-[81px]">
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-48 pb-56 text-center text-white overflow-hidden bg-gradient-to-br from-[#0b2b4f] to-[#124d9c]">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 md:left-32 grid grid-cols-3 gap-2 opacity-20">
            {[...Array(9)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white"></div>)}
        </div>
        <div className="absolute bottom-40 right-10 md:right-32 grid grid-cols-3 gap-2 opacity-20">
            {[...Array(9)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white"></div>)}
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4"
          >
            {t('rtiPage.titlePart1', 'Right To')} <span className="text-blue-500">{t('rtiPage.titleHighlight', 'Information')}</span> {t('rtiPage.titlePart2', '(RTI)')}
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1.5 w-20 bg-blue-500 mx-auto rounded-full mb-6" 
          />
          <p className="text-white/90 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-light">
            {t('rtiPage.subtitle', 'Ensuring transparency and accountability in governance through the Right to Information Act, 2005.')}
          </p>
        </div>

        {/* CSS Wave Bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
          <svg className="relative block w-full h-[60px] md:h-[120px]" preserveAspectRatio="none" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M0 0C480 130 960 130 1440 0V100H0V0Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="relative -mt-44 pb-24 px-6 z-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - PIO Details */}
            <div className="lg:col-span-1 h-full">
              <div
                className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 h-full flex flex-col"
              >
                
                <h3 className="text-lg font-black text-[#0d0e23] mb-2">{t('rtiPage.nodalOfficer', 'Nodal Officer')}</h3>

                <div className="divide-y divide-slate-100">
                  <ContactItem icon={<FiUser />} label={t('rtiPage.pioLabel', 'Public Information Officer')} value={show(rtiData?.officer)} />
                  <ContactItem
                    icon={<FiPhone />}
                    label={t('rtiPage.phoneLabel', 'Contact Number')}
                    value={show(rtiData?.phone)}
                    href={rtiData?.phone ? `tel:${rtiData.phone.replace(/[^\d+]/g, '')}` : undefined}
                  />
                  <ContactItem
                    icon={<FiMail />}
                    label={t('rtiPage.emailLabel', 'Email Address')}
                    value={show(rtiData?.email)}
                    href={rtiData?.email ? `mailto:${rtiData.email}` : undefined}
                  />
                  <ContactItem icon={<FiMapPin />} label={t('rtiPage.addressLabel', 'Office Address')} value={loading ? null : displayAddress} />
                </div>

                <div className="mt-auto pt-8 border-t border-slate-100">
                  <a href="https://rtionline.gov.in/" target="_blank" rel="noopener noreferrer" className="w-full py-4 rounded-xl bg-[#0d0e23] text-white text-xs md:text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-blue-100">
                    {t('rtiPage.fileOnline', 'File Online RTI')} <FiExternalLink />
                  </a>
                </div>
              </div>
            </div>

            {/* Middle/Right Column - Guidelines */}
            <div className="lg:col-span-2 h-full">
              <div 
                className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-100 h-full"
              >
                <h2 className="text-xl md:text-2xl font-black text-[#0d0e23] mb-6 flex items-center gap-4">
                  {t('rtiPage.proactiveDisclosures', 'Proactive Disclosures')}
                </h2>
                <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed mb-10">
                  {t('rtiPage.disclosuresIntro', 'Under Section 4(1)(b) of the RTI Act 2005, every public authority has the obligation to provide information to the public at regular intervals through various means of communication.')}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {disclosureItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-all group cursor-default">
                      <FiCheckCircle className="text-blue-500 flex-shrink-0" />
                      <span className="text-sm font-bold text-slate-700">{t(`rtiPage.items.${item.key}`, item.defaultText)}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

/* Helper Components */
// One row of the Nodal Officer card: fixed-size icon tile, then label and value (long values wrap cleanly)
const ContactItem = ({ icon, label, value, href }) => (
  <div className="flex items-start gap-4 py-4">
    <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-[17px]">
      {icon}
    </div>
    <div className="min-w-0 flex-1 pt-0.5">
      <div className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-[0.14em] leading-none mb-1.5">{label}</div>
      {value == null ? (
        <div className="h-4 w-40 rounded bg-slate-200/70 animate-pulse" aria-hidden />
      ) : href ? (
        <a href={href} className="block text-sm md:text-[15px] font-semibold text-slate-800 leading-relaxed break-words hover:text-blue-600 transition-colors">
          {value}
        </a>
      ) : (
        <div className="text-sm md:text-[15px] font-semibold text-slate-800 leading-relaxed break-words">{value}</div>
      )}
    </div>
  </div>
);

export default RTI;

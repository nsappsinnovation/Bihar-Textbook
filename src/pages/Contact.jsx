import React from "react";
import { 
  Phone, Mail, MapPin, Clock, Twitter, Facebook, Linkedin, 
  GraduationCap, PenTool, ChevronDown, BookOpen, MessageSquare
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-[#FAFAFA] min-h-screen font-sans">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-24 pb-56 text-center overflow-hidden bg-gradient-to-br from-[#0b2b4f] to-[#124d9c]">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 md:left-32 grid grid-cols-3 gap-2 opacity-20">
            {[...Array(9)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white"></div>)}
        </div>
        <div className="absolute bottom-40 right-10 md:right-32 grid grid-cols-3 gap-2 opacity-20">
            {[...Array(9)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white"></div>)}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-[58px] font-display font-black tracking-tight mb-4 text-white"
          >
            {t("contact.title", "Contact")} <span className="text-blue-500">{t("contact.titleHighlight", "Us")}</span>
          </motion.h1>

          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1.5 bg-blue-500 mx-auto rounded-full mb-8 shadow-[0_0_15px_rgba(59,130,246,0.6)]" 
          />

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-blue-50/80 text-[15px] md:text-[17px] font-medium leading-relaxed max-w-xl mx-auto"
          >
            {t("contact.subtitle", "Empowering education through transparent communication. Get in touch for institutional support, textbook inquiries, or corporate assistance.")}
          </motion.p>
        </div>

        {/* CSS Wave Bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
          <svg className="relative block w-full h-[60px] md:h-[120px]" preserveAspectRatio="none" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M0 0C480 130 960 130 1440 0V100H0V0Z" fill="#FAFAFA" />
          </svg>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 z-20 -mt-44 pb-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Central Card */}
          <div className="bg-white rounded-[32px] shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] border border-slate-100 p-8 md:p-14 mb-8">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
              
              {/* LEFT SIDE - Info */}
              <div className="w-full flex flex-col text-center items-center">
                <div className="mb-14">
                    <h2 className="text-2xl md:text-[28px] font-black text-slate-900 leading-tight mb-4">
                        {t("contact.commitmentHeader", "Committed to Educational Success")}
                    </h2>
                    <p className="text-[14.5px] text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
                        {t("contact.commitmentDesc", "We're here to support every student, teacher, and school across Bihar. Our dedicated helpdesk ensures your queries never go unanswered.")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full text-left">
                  <InfoItem icon={<MapPin className="w-5 h-5" />} title={t("footer.registeredOffice", "Registered Office")}>
                    {t("footer.address", "Pathya Pustak Bhawan, Buddh Marg, Fraser Road Area, Patna - 800001")}<br />
                    {t("footer.addressRegion", "Bihar, India")}
                  </InfoItem>

                  <InfoItem icon={<Mail className="w-5 h-5" />} title={t("contact.emailId", "Email Id")}>
                    textbookmd@gmail.com
                  </InfoItem>

                  <InfoItem icon={<Phone className="w-5 h-5" />} title={t("contact.phoneNumber", "Phone Number")}>
                    06122221975
                  </InfoItem>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#EEF5FF] flex items-center justify-center text-blue-600 shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-black text-slate-900 mb-1">{t("contact.serviceHours", "Service Hours")}</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-[13px] text-slate-500 font-medium italic">{t("contact.monToSat", "Mon to Sat")}</span>
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[11px] font-bold tracking-wide">{t("contact.serviceTime", "10 AM — 5 PM")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

/* ================= HELPER COMPONENTS ================= */

const InfoItem = ({ icon, title, children }) => (
  <div className="flex items-start gap-5">
    <div className="w-12 h-12 rounded-2xl bg-[#EEF5FF] flex items-center justify-center text-blue-600 shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="text-[15px] font-black text-slate-900 mb-1">{title}</h4>
      <p className="text-[13px] text-slate-500 leading-relaxed font-medium">{children}</p>
    </div>
  </div>
);

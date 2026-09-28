import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  BookOpen, CalendarCheck, ShieldCheck, UserCheck, 
  Target, TrendingUp, ChevronsRight, Award, GraduationCap
} from 'lucide-react';
import { getSetting } from '../../../services/settingService';
import { fileUrl } from '../../../services/api';

const MdMessage = () => {
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';

  // Managed in Admin → Know Us → MD Message. null = loading, {} = not published yet.
  const [mdData, setMdData] = useState(null);

  useEffect(() => {
    getSetting('md_message')
      .then((value) => setMdData(value && typeof value === 'object' ? { ...value, photo: fileUrl(value.photo) || '' } : {}))
      .catch(() => setMdData({}));
  }, []);

  const loading = mdData === null;
  const name = mdData?.name || '';
  const displayName = isHindi && name === 'Shri Yatendra Kumar Pal' ? 'श्री यतेंद्र कुमार पाल' : name;
  const initials = name.replace(/^(shri|smt|sri|dr)\.?\s+/i, '').split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('');

  return (
    <div className="bg-white text-slate-800 pb-8">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-10">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-10">
          
          {/* Left Sidebar - MD Profile */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="relative mb-6">
              {/* Dotted Pattern Background */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[radial-gradient(#e2e8f0_2px,transparent_2px)] [background-size:12px_12px] opacity-70 z-0"></div>
              
              {/* MD Photo */}
              <div className="relative z-10 w-64 lg:w-full max-w-[280px] aspect-[4/5] rounded-[32px] overflow-hidden bg-slate-100 shadow-sm border border-slate-100">
                {loading ? (
                  <div className="w-full h-full animate-pulse bg-slate-200/70" />
                ) : mdData.photo ? (
                  <img loading="lazy" decoding="async" src={mdData.photo} alt={displayName} className="w-full h-full object-cover" />
                ) : (
                  // No photo published: show initials instead of requesting a stand-in image
                  <div className="w-full h-full grid place-items-center text-6xl font-black text-slate-300">{initials}</div>
                )}
              </div>
            </div>

            {loading ? (
              <div className="h-7 w-56 mb-2 rounded-lg bg-slate-200/70 animate-pulse" />
            ) : (
              displayName && <h2 className="text-2xl font-black text-slate-900 mb-1">{displayName}</h2>
            )}
            <p className="text-sm font-bold text-blue-600 tracking-wide uppercase mb-2">
              {t("knowUsPage.mdMessage.designation", "Managing Director")}
            </p>
            <p className="text-sm text-slate-600 leading-snug mb-6">
              {t("knowUsPage.mdMessage.corporation", "Bihar State Text Book Publishing Corporation Ltd.")}
            </p>
            <div className="w-12 h-1 bg-blue-600 rounded-full mb-8 lg:mx-0 mx-auto"></div>

            
          </div>

          {/* Right Main Content */}
          <div className="lg:col-span-8 pt-4 lg:pt-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] mb-2 tracking-tight">
              {t("knowUsPage.mdMessage.titlePart1", "Managing Director's")}<br/>
              <span className="text-blue-700">{t("knowUsPage.mdMessage.titlePart2", "Message")}</span>
            </h1>
            <div className="w-16 h-1.5 bg-blue-700 rounded-full mb-10 mt-6"></div>

            {/* Vision Banner */}
            <div className="bg-[#F0F7FF] rounded-[20px] p-5 flex items-center gap-5 mb-10 border border-blue-100/50">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 border border-blue-100 shadow-sm">
                <BookOpen className="text-blue-600 w-6 h-6" />
              </div>
              <p className="text-slate-700 font-semibold text-lg leading-snug">
                {t("knowUsPage.mdMessage.visionText", "A vision for excellence in educational resources and equitable access across Bihar.")}
              </p>
            </div>

            {/* Welcome Note */}
            <div>
              <h3 className="text-[13px] font-black text-slate-800 tracking-[0.2em] uppercase mb-5">
                {t("knowUsPage.mdMessage.welcomeNoteHeader", "Welcome Note")}
              </h3>
              {loading ? (
                <div className="space-y-3" aria-hidden>
                  {[100, 95, 98, 70].map((w) => (
                    <div key={w} className="h-4 rounded bg-slate-200/70 animate-pulse" style={{ width: `${w}%` }} />
                  ))}
                </div>
              ) : mdData.welcomeNote ? (
                <div className="prose prose-slate prose-lg max-w-none text-slate-600 whitespace-pre-wrap font-medium leading-relaxed">
                  {mdData.welcomeNote}
                </div>
              ) : (
                <p className="text-slate-500 font-medium">
                  {t("knowUsPage.mdMessage.notAvailable", "The Managing Director's message will be published here soon.")}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Our Commitment Section */}
        <div className="border border-slate-200/80 rounded-[32px] p-6 md:p-10 mb-10 relative bg-white shadow-[0_4px_40px_rgb(0,0,0,0.02)]">
          <div className="text-center mb-12">
            <h3 className="text-[15px] font-black text-slate-900 tracking-[0.15em] uppercase inline-block relative pb-4">
              {t("knowUsPage.mdMessage.ourCommitment", "OUR COMMITMENT")}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-full"></span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Commitment 1 */}
            <div className="flex flex-col items-center text-center px-2">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-5 border border-blue-100">
                <CalendarCheck className="text-blue-600 w-7 h-7" />
              </div>
              <p className="text-[13px] font-bold text-slate-700 leading-relaxed">
                {t("knowUsPage.mdMessage.commitment1", "Timely printing and distribution of textbooks")}
              </p>
            </div>
            
            {/* Commitment 2 */}
            <div className="flex flex-col items-center text-center px-2">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-5 border border-blue-100">
                <ShieldCheck className="text-blue-600 w-7 h-7" />
              </div>
              <p className="text-[13px] font-bold text-slate-700 leading-relaxed">
                {t("knowUsPage.mdMessage.commitment2", "Maintaining the highest standards of quality")}
              </p>
            </div>

            {/* Commitment 3 */}
            <div className="flex flex-col items-center text-center px-2">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-5 border border-blue-100">
                <UserCheck className="text-blue-600 w-7 h-7" />
              </div>
              <p className="text-[13px] font-bold text-slate-700 leading-relaxed">
                {t("knowUsPage.mdMessage.commitment3", "Strengthening transparency and accountability")}
              </p>
            </div>

            {/* Commitment 4 */}
            <div className="flex flex-col items-center text-center px-2">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-5 border border-blue-100">
                <GraduationCap className="text-blue-600 w-7 h-7" />
              </div>
              <p className="text-[13px] font-bold text-slate-700 leading-relaxed">
                {t("knowUsPage.mdMessage.commitment4", "Ensuring textbooks reach every student across the state")}
              </p>
            </div>
          </div>

         
        </div>

        {/* Focus on Quality & Innovation */}
        <div className="mb-10">
          <div className="text-center mb-12">
            <h3 className="text-[18px] font-black text-slate-900 tracking-wide uppercase">
              {t("knowUsPage.mdMessage.focusTitle", "FOCUS ON QUALITY & INNOVATION")}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center">
              <Target className="text-blue-600 w-12 h-12 mb-4" strokeWidth={1.5} />
              <h4 className="text-[12px] font-black text-slate-900 tracking-wider uppercase mb-3">
                {t("knowUsPage.mdMessage.collaborationTitle", "COLLABORATION")}
              </h4>
              <p className="text-[14px] text-slate-600 font-medium leading-relaxed">
                {t("knowUsPage.mdMessage.collaborationDesc", "Working together with all stakeholders to achieve our shared goals.")}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center">
              <TrendingUp className="text-blue-600 w-12 h-12 mb-4" strokeWidth={1.5} />
              <h4 className="text-[12px] font-black text-slate-900 tracking-wider uppercase mb-3">
                {t("knowUsPage.mdMessage.qualityTitle", "QUALITY FIRST")}
              </h4>
              <p className="text-[14px] text-slate-600 font-medium leading-relaxed">
                {t("knowUsPage.mdMessage.qualityDesc", "Every stage is carefully supervised to deliver excellence.")}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center">
              <ChevronsRight className="text-blue-600 w-12 h-12 mb-4" strokeWidth={1.5} />
              <h4 className="text-[12px] font-black text-slate-900 tracking-wider uppercase mb-3">
                {t("knowUsPage.mdMessage.movingForwardTitle", "MOVING FORWARD")}
              </h4>
              <p className="text-[14px] text-slate-600 font-medium leading-relaxed">
                {t("knowUsPage.mdMessage.movingForwardDesc", "Committed to timely delivery and better learning outcomes for every student.")}
              </p>
            </div>
          </div>
        </div>

        {/* Signature Banner */}
        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-0 bg-white pt-6 mt-10 border-t border-slate-100">
          <div className="flex items-center gap-4 md:pr-10 md:w-[45%] shrink-0">
            <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 shadow-sm">
              <Award className="text-blue-600 w-6 h-6" />
            </div>
            <div>
              {displayName && <h4 className="text-[16px] font-black text-slate-900 leading-tight">{displayName}</h4>}
              <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wide mt-1">
                {t("knowUsPage.mdMessage.designation", "MANAGING DIRECTOR")}, BSTBPC
              </p>
            </div>
          </div>
          
          <div className="md:pl-10 md:border-l-2 border-slate-100 flex items-center">
            <p 
              className="text-[18px] md:text-[20px] text-blue-700 font-serif italic font-semibold leading-relaxed text-center md:text-left"
            >
              {t("knowUsPage.mdMessage.corporation", "Bihar State Text Book Publishing Corporation Ltd.")}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MdMessage;

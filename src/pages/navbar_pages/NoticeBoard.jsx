import React, { useState, useEffect } from "react";
import { ArrowUpRight, Bell, Eye, Activity, Calendar, FileText, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { getNotices } from '../../services/noticeService';
import { buildBoardItems } from '../../data/noticeBoardItems';

const NoticeCard = ({ notice }) => {
  const { t } = useTranslation();
  return (
    <a 
      href={notice.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group cursor-pointer bg-white border border-slate-100 hover:border-blue-100 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col md:flex-row gap-4 md:items-center justify-between mx-1 block"
    >
      {/* Left Accent Line */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${notice.category === 'Tender' ? 'bg-amber-400' : notice.category === 'Notice' ? 'bg-rose-400' : 'bg-blue-400'} opacity-70 group-hover:opacity-100 group-hover:w-1.5`}></div>
      
      <div className="flex-1 pl-2">
        <div className="flex items-center gap-3 mb-2">
          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
            notice.category === 'Tender' ? 'bg-amber-50 text-amber-600' :
            notice.category === 'Notice' ? 'bg-rose-50 text-rose-600' :
            'bg-blue-50 text-blue-600'
          }`}>
            {notice.category}
          </span>
          {notice.isUrgent && (
            <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-red-500 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> {t("noticeBoard.urgent", "Urgent")}
            </span>
          )}
          <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1 ml-auto md:ml-0">
             <Calendar size={10} /> {notice.date}
          </span>
        </div>

        <h3 className="text-base font-semibold text-slate-800 leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {notice.title}
        </h3>

        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 mt-2">
          <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
            {t("noticeBoard.ref", "Ref:")} {notice.ref}
          </span>
          {notice.deadline && (
            <span className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
              {t("noticeBoard.deadline", "Deadline:")} {notice.deadline}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 md:border-l md:border-slate-100 md:pl-6 pt-4 md:pt-0 border-t border-slate-50 md:border-t-0 mt-2 md:mt-0">
         <div className="flex flex-col items-center justify-center px-4 py-2.5 rounded-full bg-slate-50 text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm group-hover:shadow-md group-hover:scale-105">
            <span className="flex items-center gap-2 text-xs font-semibold tracking-wide">
              <Eye size={16} /> <span className="hidden md:inline">{t("noticeBoard.viewPdf", "View PDF")}</span>
            </span>
         </div>
      </div>
    </a>
  );
};

// Grey placeholder shown while the list is loading
const NoticeCardSkeleton = () => (
  <div className="bg-white border border-slate-100 rounded-xl p-5 md:p-6 shadow-sm mx-1 flex items-center justify-between gap-4 animate-pulse">
    <div className="flex-1 space-y-3">
      <div className="flex gap-3">
        <div className="h-4 w-16 rounded bg-slate-100"></div>
        <div className="h-4 w-20 rounded bg-slate-100"></div>
      </div>
      <div className="h-4 w-3/4 rounded bg-slate-100"></div>
      <div className="h-5 w-24 rounded-md bg-slate-100"></div>
    </div>
    <div className="hidden md:block h-10 w-28 rounded-full bg-slate-100"></div>
  </div>
);

// Icon and colours per tab, matching the stats cards
const EMPTY_STYLES = {
  All: { Icon: Bell, color: "text-rose-500", bg: "bg-rose-500/10 border-rose-500/20" },
  Notice: { Icon: Bell, color: "text-rose-500", bg: "bg-rose-500/10 border-rose-500/20" },
  Circular: { Icon: Award, color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/20" },
  Tender: { Icon: FileText, color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/20" },
};

// Shown instead of the list when the selected tab has nothing to show
const EmptyState = ({ tab, onShowAll }) => {
  const { t } = useTranslation();
  const { Icon, color, bg } = EMPTY_STYLES[tab];
  const isAll = tab === "All";
  const key = tab.toLowerCase();
  const title = isAll
    ? t("noticeBoard.empty.allTitle", "No notices or tenders published yet")
    : t(`noticeBoard.empty.tabTitle.${key}`, `No ${key}s right now`);
  const description = isAll
    ? t("noticeBoard.empty.allDesc", "New notices, circulars and tenders will appear here as soon as they are published.")
    : t("noticeBoard.empty.tabDesc", "Check back soon, or view all the latest updates.");

  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-6 py-12 md:py-16 mx-1 flex flex-col items-center text-center">
      <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-5 ${bg}`}>
        <Icon className={color} size={26} />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-sm">{description}</p>
      {/* The archive link already sits beside the list, so the card only offers going back to "All" */}
      {onShowAll && (
        <button
          type="button"
          onClick={onShowAll}
          className="mt-6 px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors"
        >
          {t("noticeBoard.empty.showAll", "View all updates")}
        </button>
      )}
    </div>
  );
};

// The list only scrolls endlessly when there are enough items to fill the box
const MARQUEE_MIN_ITEMS = 4;

// tone swaps the (dark) section background so other home page versions can reuse this section
const TONES = { default: "bg-[#0a1d4f]", blue: "bg-[#124d9c]" };

export default function NoticeBoard({ tone = "default" }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("All");
  const [notices, setNotices] = useState([]);
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotices().then((all) => {
      setNotices(all.filter((n) => n.type === 'Notice'));
      setTenders(all.filter((n) => n.type === 'Tender'));
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const boardItems = buildBoardItems(notices, tenders);
  const filteredNotices = boardItems.filter(notice =>
    activeTab === "All" ? true : notice.category === activeTab
  ).slice(0, 8); // Showing 8 for a better mix view

  const totalNotices = notices.filter(n => n.category !== 'Circular').length;
  const totalCirculars = notices.filter(n => n.category === 'Circular').length;
  const totalTenders = tenders.length;

  return (
    <section className={`w-full ${TONES[tone] || TONES.default} py-16 px-6 md:px-12 lg:px-24 font-sans text-white overflow-hidden relative isolate`}>
      {/* Royal blue with a single warm gold accent, so it reads apart from the navy Leaders section and footer:
          gold glow top-right, blue light bottom-left, depth gradient and a faint dot texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 88% 8%, rgba(242,196,109,0.08), transparent 30%), radial-gradient(circle at 6% 96%, rgba(59,130,246,0.12), transparent 38%), linear-gradient(180deg, rgba(6,14,40,0.2), rgba(6,14,40,0.6)), radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1.2px)",
          backgroundSize: "auto, auto, auto, 22px 22px",
        }}
      />
      <style>
        {`
          @keyframes marquee-y {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(0, -50%, 0); }
          }
          .animate-marquee-y {
            animation: marquee-y 35s linear infinite;
            will-change: transform;
          }
          .animate-marquee-y:hover {
            animation-play-state: paused;
          }
          .marquee-container {
            height: 540px;
            overflow: hidden;
            position: relative;
            mask-image: linear-gradient(to bottom, transparent, black 2%, black 98%, transparent);
            -webkit-mask-image: linear-gradient(to bottom, transparent, black 2%, black 98%, transparent);
          }
        `}
      </style>

      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Header & Stats */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: 24 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="h-px bg-[#d4b27a]"
                ></motion.div>
                <span className="text-[10px] font-bold text-[#d4b27a] uppercase tracking-[0.2em]">{t("noticeBoard.badge", "Updates & Tenders")}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 leading-tight">
                {t("noticeBoard.heading", "Official Notices")} <br /> <span className="text-[#d4b27a] font-medium">{t("noticeBoard.headingHighlight", "& Circulars")}</span>
              </h2>
              <p className="text-sm text-blue-100/80 font-medium leading-relaxed mb-4">
                {t("noticeBoard.description", "Stay updated with the latest administrative announcements, tenders, and educational circulars from the Bihar State Text Book Publishing Corporation Ltd.")}
              </p>

              {/* Premium Stats Overview Widget */}
              <div className="flex flex-col gap-4 mt-6 mb-8">
                {/* Tenders Card */}
                <div className="bg-[#f7f0e4] p-5 rounded-2xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.18)] flex items-center justify-between group hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)] group-hover:scale-110 transition-transform">
                      <FileText className="text-amber-500" size={22} />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800 tracking-wider">{t("noticeBoard.tendersLabel", "Tenders")}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-medium">{t("noticeBoard.tendersSub", "E-procurement & contracts")}</p>
                    </div>
                  </div>
                  <span className="text-2xl font-black text-amber-500 tracking-tight">{totalTenders}</span>
                </div>

                {/* Live Notices Card */}
                <div className="bg-[#f5ecee] p-5 rounded-2xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.18)] flex items-center justify-between group hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)] group-hover:scale-110 transition-transform">
                      <Bell className="text-rose-500" size={22} />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800 tracking-wider">{t("noticeBoard.noticesLabel", "Official Notices")}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-medium">{t("noticeBoard.noticesSub", "Administrative announcements")}</p>
                    </div>
                  </div>
                  <span className="text-2xl font-black text-rose-500 tracking-tight">{totalNotices}</span>
                </div>

                {/* Academic Circulars Card */}
                <div className="bg-[#e6ecf3] p-5 rounded-2xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.18)] flex items-center justify-between group hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:scale-110 transition-transform">
                      <Award className="text-blue-500" size={22} />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800 tracking-wider">{t("noticeBoard.circularsLabel", "Academic Circulars")}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-medium">{t("noticeBoard.circularsSub", "Curriculum & syllabus updates")}</p>
                    </div>
                  </div>
                  <span className="text-2xl font-black text-blue-500 tracking-tight">{totalCirculars}</span>
                </div>
              </div>
            </div>

            {/* View All Button */}
            <div className="hidden lg:block">
               <Link to="/notice" className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-white rounded-full text-sm font-bold text-[#124d9c] hover:bg-blue-50 hover:shadow-lg hover:shadow-black/20 transition-all group">
                 {t("noticeBoard.viewArchive", "View Document Archive")}
                 <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
               </Link>
            </div>
          </motion.div>

          {/* Right Column: Interactive List */}
          <div className="lg:w-2/3 flex flex-col">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-white/20 pb-px overflow-x-auto scrollbar-hide shrink-0">
              {["All", "Circular", "Tender", "Notice"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all relative whitespace-nowrap ${
                    activeTab === tab ? "text-white" : "text-blue-200/70 hover:text-white"
                  }`}
                >
                  {t(`noticeBoard.tab.${tab.toLowerCase()}`, tab)}
                  {activeTab === tab && (
                    <motion.span 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-[#d4b27a] rounded-t-full"
                    />
                  )}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="flex flex-col gap-4 py-2">
                {[0, 1, 2].map((i) => <NoticeCardSkeleton key={i} />)}
              </div>
            ) : filteredNotices.length === 0 ? (
              <EmptyState
                tab={activeTab}
                onShowAll={activeTab !== "All" && boardItems.length > 0 ? () => setActiveTab("All") : null}
              />
            ) : filteredNotices.length < MARQUEE_MIN_ITEMS ? (
              <div className="flex flex-col gap-4 py-2">
                {filteredNotices.map((notice) => (
                  <NoticeCard key={notice.id} notice={notice} />
                ))}
              </div>
            ) : (
              /* Marquee List Container */
              <div className="marquee-container">
                <div className="flex flex-col gap-4 py-2 animate-marquee-y">
                  {/* Duplicate list for infinite scroll effect */}
                  {filteredNotices.map((notice) => (
                    <NoticeCard key={`${notice.id}-1`} notice={notice} />
                  ))}
                  {filteredNotices.map((notice) => (
                    <NoticeCard key={`${notice.id}-2`} notice={notice} />
                  ))}
                </div>
              </div>
            )}

            <Link to="/notice" className="lg:hidden mt-8 flex items-center justify-center w-full gap-2 px-6 py-3 bg-white border border-white rounded-xl text-sm font-bold text-[#124d9c] hover:bg-blue-50 transition-all group">
                 {t("noticeBoard.viewArchive", "View Document Archive")}
                 <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

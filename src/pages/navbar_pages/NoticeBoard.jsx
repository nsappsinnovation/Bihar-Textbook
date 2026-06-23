import React, { useState } from "react";
import { ArrowUpRight, Bell, Eye, Activity, Calendar, Hash } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { noticesData as actualNotices } from './Notice';
import { tendersData } from '../../data/tendersData';

const combinedData = [];
const maxLength = Math.max(actualNotices.length, tendersData.length);

for (let i = 0; i < maxLength; i++) {
  if (i < actualNotices.length) {
    const n = actualNotices[i];
    combinedData.push({
      id: `notice-${n.id}`,
      category: ["Circular", "Tender"].includes(n.category) ? n.category : "Notice",
      title: n.title,
      date: n.date || "Recent",
      deadline: null,
      ref: `NTC-${n.id}`,
      isUrgent: n.isUrgent || false,
      fileSize: "PDF",
      link: n.document
    });
  }
  if (i < tendersData.length) {
    const t = tendersData[i];
    combinedData.push({
      id: `tender-${t.id}`,
      category: "Tender",
      title: t.title,
      date: "Recent", 
      deadline: null,
      ref: `TND-${t.id}`,
      isUrgent: false,
      fileSize: "PDF",
      link: t.link
    });
  }
}

const NoticeCard = ({ notice }) => (
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
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Urgent
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
          <Hash size={12} className="text-slate-400" /> Ref: {notice.ref}
        </span>
        {notice.deadline && (
          <span className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
            Deadline: {notice.deadline}
          </span>
        )}
      </div>
    </div>

    {/* Actions */}
    <div className="flex items-center gap-3 md:border-l md:border-slate-100 md:pl-6 pt-4 md:pt-0 border-t border-slate-50 md:border-t-0 mt-2 md:mt-0">
       <div className="flex flex-col items-center justify-center px-4 py-2.5 rounded-full bg-slate-50 text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm group-hover:shadow-md group-hover:scale-105">
          <span className="flex items-center gap-2 text-xs font-semibold tracking-wide">
            <Eye size={16} /> <span className="hidden md:inline">View PDF</span>
          </span>
       </div>
    </div>
  </a>
);

export default function NoticeBoard() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredNotices = combinedData.filter(notice => 
    activeTab === "All" ? true : notice.category === activeTab
  ).slice(0, 8); // Showing 8 for a better mix view

  // Hardcoded values as per exact user requirements
  const totalNotices = 232;
  const totalTenders = 230;

  const chartData = [
    { name: 'Notices', Count: totalNotices, color: '#3b82f6' },
    { name: 'Tenders', Count: totalTenders, color: '#f59e0b' }
  ];

  return (
    <section className="w-full bg-[#fcfcfd] py-16 px-6 md:px-12 lg:px-24 font-sans text-slate-900 border-t border-slate-100 overflow-hidden relative">
      <style>
        {`
          @keyframes marquee-y {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          .animate-marquee-y {
            animation: marquee-y 35s linear infinite;
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

      {/* Premium Background Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#fcfcfd] via-[#fcfcfd]/60 to-transparent"></div>
        {/* Glowing Orbs */}
        <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[100px]"></div>
        <div className="absolute bottom-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-amber-400/10 blur-[100px]"></div>
      </div>

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
                  className="h-px bg-blue-600"
                ></motion.div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">Updates & Tenders</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4 leading-tight">
                Official Notices <br /> <span className="text-slate-400 font-medium">& Circulars</span>
              </h2>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-4">
                Stay updated with the latest administrative announcements, active tenders, and educational circulars from the Bihar State Text Book Publishing Corporation.
              </p>

              {/* Stats Graph - Premium Bar Chart */}
              <div className="h-[270px] w-full mt-4 mb-8 bg-white/80 backdrop-blur-xl p-5 rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden flex flex-col justify-center">
                 <h3 className="absolute top-5 left-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Total Volume</h3>
                 <div className="absolute top-5 right-5 flex items-center gap-2 z-10">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                    <span className="text-[9px] uppercase tracking-widest font-black text-emerald-600">Live Data</span>
                 </div>
                 
                 <ResponsiveContainer width="100%" height={190} className="mt-8">
                   <BarChart data={chartData} margin={{ top: 20, right: 20, left: -25, bottom: 0 }}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 700 }} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} />
                     <Tooltip 
                       cursor={{ fill: 'rgba(241,245,249,0.5)' }}
                       contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '13px', fontWeight: 700 }} 
                     />
                     <Bar dataKey="Count" radius={[6, 6, 0, 0]} barSize={45}>
                       {chartData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                     </Bar>
                   </BarChart>
                 </ResponsiveContainer>
              </div>
            </div>

            {/* View All Button */}
            <div className="hidden lg:block">
               <Link to="/notice" className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-700 hover:text-blue-600 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 transition-all group">
                 View Document Archive
                 <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
               </Link>
            </div>
          </motion.div>

          {/* Right Column: Interactive List */}
          <div className="lg:w-2/3 flex flex-col">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-slate-200 pb-px overflow-x-auto scrollbar-hide shrink-0">
              {["All", "Circular", "Tender", "Notice"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all relative whitespace-nowrap ${
                    activeTab === tab ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.span 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Marquee List Container */}
            <div className={`marquee-container ${activeTab !== "All" ? "overflow-y-auto" : ""}`}>
              <div className={`flex flex-col gap-4 py-2 ${activeTab === "All" ? "animate-marquee-y" : ""}`}>
                 {activeTab === "All" ? (
                   <>
                     {/* Duplicate list for infinite scroll effect */}
                     {filteredNotices.map((notice, idx) => (
                       <NoticeCard key={`${notice.id}-1`} notice={notice} />
                     ))}
                     {filteredNotices.map((notice, idx) => (
                       <NoticeCard key={`${notice.id}-2`} notice={notice} />
                     ))}
                   </>
                 ) : (
                   filteredNotices.map((notice, idx) => (
                     <NoticeCard key={notice.id} notice={notice} />
                   ))
                 )}
              </div>
            </div>

            <Link to="/notice" className="lg:hidden mt-8 flex items-center justify-center w-full gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:text-blue-600 transition-all group">
                 View Document Archive 
                 <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

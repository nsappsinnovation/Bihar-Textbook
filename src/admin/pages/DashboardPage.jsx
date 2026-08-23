import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardCards from '../components/DashboardCards';
import RecentActivities from '../components/RecentActivities';
import { getStoredTextbooksData } from '../../utils/textbookStorage';
import { noticesData } from '../../pages/navbar_pages/Notice';
import { tendersData } from '../../data/tendersData';

/**
 * Dashboard Page
 * Main overview page with stats, charts, and recent activities
 */
export default function DashboardPage() {
  const [actualStats, setActualStats] = useState([]);

  useEffect(() => {
    const calculateStats = () => {
      // 1. Total Books (Match BooksPage logic)
      let bookCount = 0;
      try {
        const savedTextbooks = localStorage.getItem('bihar_textbooks_data_v2');
        let parsed;
        if (savedTextbooks) {
          parsed = JSON.parse(savedTextbooks);
        } else {
          parsed = getStoredTextbooksData();
        }
        
        if (parsed && parsed.classes) {
          parsed.classes.forEach(c => {
            if (c.books) bookCount += c.books.length;
          });
        }
      } catch (e) {}

      // 2. Total Notices & Tenders (Match NoticesPage logic)
      let noticeCount = 0;
      let tenderCount = 0;
      try {
        const savedNotices = localStorage.getItem('website_notices_v6');
        if (savedNotices) {
          const parsed = JSON.parse(savedNotices);
          noticeCount = parsed.filter(n => !n.category || n.category.toLowerCase() !== 'tender').length;
          tenderCount = parsed.filter(n => n.category && n.category.toLowerCase() === 'tender').length;
        } else {
          noticeCount = noticesData.length;
          tenderCount = tendersData.length;
        }
      } catch (e) {}

      // 3. Total Gallery Media (Photos + Videos)
      let mediaCount = 0;
      try {
        const photos = JSON.parse(localStorage.getItem('module_content_gl-photo') || '[]');
        const videos = JSON.parse(localStorage.getItem('module_content_gl-video') || '[]');
        mediaCount = photos.length + videos.length;
      } catch (e) {}

      setActualStats([
        {
          id: 1,
          title: 'Total Books',
          value: bookCount,
          icon: 'BookOpen',
          color: 'blue',
          sparkline: [10, 15, 12, 18, 24, 20, 28], 
        },
        {
          id: 2,
          title: 'Total Notices',
          value: noticeCount,
          icon: 'Bell',
          color: 'cyan',
          sparkline: [5, 8, 12, 10, 15, 20, 25],
        },
        {
          id: 3,
          title: 'Tenders',
          value: tenderCount,
          icon: 'Building2',
          color: 'indigo',
          sparkline: [8, 12, 10, 15, 13, 18, 22],
        },
        {
          id: 4,
          title: 'Gallery Media',
          value: mediaCount,
          icon: 'School', 
          color: 'emerald',
          sparkline: [20, 22, 25, 24, 28, 30, 35],
        }
      ]);
    };

    calculateStats();
    
    window.addEventListener('storage', calculateStats);
    window.addEventListener('websiteDataUpdated', calculateStats);
    window.addEventListener('textbooks_updated', calculateStats);
    
    return () => {
      window.removeEventListener('storage', calculateStats);
      window.removeEventListener('websiteDataUpdated', calculateStats);
      window.removeEventListener('textbooks_updated', calculateStats);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-card border border-gray-100 flex flex-col xl:flex-row items-center justify-between gap-8"
      >
        <div className="relative z-10 flex-1">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}, Admin!
          </h1>
          <p className="text-sm text-gray-500 mt-3 max-w-2xl leading-relaxed font-medium">
            Manage the Bihar State Text Book Publishing Corporation ecosystem. Monitor real-time activities, update content, and oversee department performance from your central hub.
          </p>
        </div>
        
                
        {/* Decorative background element */}
        <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-blue-50/40 to-transparent pointer-events-none" />
      </motion.div>

      {/* Statistics Cards */}
      <DashboardCards stats={actualStats} />

      {/* Recent Activities */}
      <div className="mt-6">
        <RecentActivities />
      </div>
    </motion.div>
  );
}

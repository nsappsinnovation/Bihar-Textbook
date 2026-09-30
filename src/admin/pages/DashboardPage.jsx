import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardCards from '../components/DashboardCards';
import AnalyticsCharts from '../components/AnalyticsCharts';
import RecentActivities from '../components/RecentActivities';
import { getDashboard } from '../../services/dashboardService';

/**
 * Dashboard Page
 * Main overview page with stats, charts, and recent activities (all from the backend)
 */
export default function DashboardPage({ addToast }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    getDashboard(year)
      .then(setDashboard)
      .catch(() => addToast?.('Could not load dashboard data', 'error'));
  }, [year, addToast]);

  const counts = dashboard?.counts || {};
  const stats = [
    { id: 1, title: 'Total Books', value: counts.books || 0, icon: 'BookOpen', color: 'blue' },
    { id: 2, title: 'Total Notices', value: counts.notices || 0, icon: 'Bell', color: 'cyan' },
    { id: 3, title: 'Tenders', value: counts.tenders || 0, icon: 'Building2', color: 'indigo' },
    { id: 4, title: 'Gallery Media', value: (counts.photos || 0) + (counts.videos || 0), icon: 'School', color: 'emerald' },
  ];

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
            Manage the Bihar State Textbook Publishing Corporation Ltd. ecosystem. Monitor real-time activities, update content, and oversee department performance from your central hub.
          </p>
        </div>

        {/* Decorative background element */}
        <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-blue-50/40 to-transparent pointer-events-none" />
      </motion.div>

      {/* Statistics Cards */}
      <DashboardCards stats={stats} />

      {/* Charts */}
      {dashboard && (
        <AnalyticsCharts
          distribution={dashboard.distribution}
          monthlyUploads={dashboard.monthlyUploads}
          contentTypes={dashboard.contentTypes}
          year={year}
          onYearChange={setYear}
        />
      )}

      {/* Recent Activities */}
      <div className="mt-6">
        <RecentActivities />
      </div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import DashboardCards from '../components/DashboardCards';
import AnalyticsCharts from '../components/AnalyticsCharts';
import RecentActivities from '../components/RecentActivities';
import { dashboardStats, recentActivities } from '../data/dummyData';
import { Sparkles, Plus } from 'lucide-react';

/**
 * Dashboard Page
 * Main overview page with stats, charts, and recent activities
 */
export default function DashboardPage() {
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
        className="relative overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-card border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100 flex items-center gap-1.5">
              
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Welcome back</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}, Admin!
          </h1>
          <p className="text-sm text-gray-500 mt-2 max-w-xl leading-relaxed">
            Here's your overview of the Bihar State Text Book Publishing Corporation. Monitor operations, manage resources, and track performance.
          </p>
        </div>
        
        <div className="relative z-10 flex-shrink-0 hidden md:block text-right bg-gray-50 rounded-xl p-4 border border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Today's Date</p>
          <p className="text-lg font-bold text-gray-800">
            {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        
        {/* Decorative background element */}
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none" />
      </motion.div>

      {/* Statistics Cards */}
      <DashboardCards stats={dashboardStats} />

      {/* Analytics Charts */}
      <AnalyticsCharts />

      {/* Recent Activities */}
      <div className="mt-6">
        <RecentActivities activities={recentActivities} />
      </div>
    </motion.div>
  );
}

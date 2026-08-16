import { motion } from 'framer-motion';
import DashboardCards from '../components/DashboardCards';
import RecentActivities from '../components/RecentActivities';
import { dashboardStats } from '../data/dummyData';
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
        className="relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-card border border-gray-100 flex flex-col xl:flex-row items-center justify-between gap-8"
      >
        <div className="relative z-10 flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest">System Operational</span>
            </div>
          </div>
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
      <DashboardCards stats={dashboardStats} />

      {/* Recent Activities */}
      <div className="mt-6">
        <RecentActivities />
      </div>
    </motion.div>
  );
}

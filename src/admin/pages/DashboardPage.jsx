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

      {/* Recent Activities & Website Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <RecentActivities activities={recentActivities} />
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-gray-800">Website Sections</h3>
            <p className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase">Live Editor</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 flex-1">
            {[
              { label: 'Collaborative Learning', icon: 'Plus' },
              { label: 'Events (View All)', icon: 'Plus' },
              { label: 'Education Excellence', icon: 'Plus' },
              { label: 'Gallery', icon: 'Plus' },
              { label: 'Documents', icon: 'Plus' },
              { label: 'Notice & Tenders', icon: 'Plus' },
            ].map((section, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02, backgroundColor: '#EFF6FF' }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-gray-50/50 group transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-blue-600 mb-2 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Plus className="w-4 h-4" />
                </div>
                <p className="text-[11px] font-bold text-gray-700 text-center leading-tight">{section.label}</p>
                <p className="text-[9px] text-gray-400 mt-1 uppercase tracking-tighter font-semibold">Edit / Add / Remove</p>
              </motion.button>
            ))}
          </div>
          
          <button className="w-full mt-6 py-2.5 rounded-xl border border-dashed border-gray-200 text-xs font-semibold text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-all">
            + Manage More Sections
          </button>
        </div>
      </div>
    </motion.div>
  );
}

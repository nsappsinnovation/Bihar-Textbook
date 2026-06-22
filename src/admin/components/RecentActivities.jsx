import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCheck, Upload, BookPlus, Edit3, LogIn, Trash2, Server,
} from 'lucide-react';
import { useActivityLog } from '../hooks/useCustomHooks';

// Activity type icon and color mapping
const activityConfig = {
  update: { icon: UserCheck, color: 'bg-blue-100 text-blue-600' },
  upload: { icon: Upload, color: 'bg-green-100 text-green-600' },
  create: { icon: BookPlus, color: 'bg-indigo-100 text-indigo-600' },
  edit: { icon: Edit3, color: 'bg-amber-100 text-amber-600' },
  login: { icon: LogIn, color: 'bg-cyan-100 text-cyan-600' },
  delete: { icon: Trash2, color: 'bg-red-100 text-red-600' },
  system: { icon: Server, color: 'bg-gray-100 text-gray-600' },
};

// Status badge colors
const statusColors = {
  completed: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  pending: 'bg-amber-50 text-amber-600 border-amber-100',
  warning: 'bg-red-50 text-red-500 border-red-100',
};

/**
 * Recent Activities Section
 * Shows a timeline of recent actions performed on the dashboard
 */
export default function RecentActivities() {
  const { activities, removeActivity } = useActivityLog();
  const [showAll, setShowAll] = useState(false);

  const displayedActivities = showAll ? activities : activities.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.4 }}
      className="bg-white rounded-2xl p-6 shadow-card border border-gray-100/50 mt-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-bold text-gray-800">Recent Activities</h3>
        <button 
          onClick={() => setShowAll(!showAll)}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors px-4 py-2 rounded-xl hover:bg-blue-50 border border-transparent hover:border-blue-100"
        >
          {showAll ? 'Show Recent' : 'View All'}
        </button>
      </div>

      <div className="space-y-2">
        <AnimatePresence initial={false}>
          {displayedActivities.map((activity, index) => {
            const config = activityConfig[activity.type] || activityConfig.system;
            const Icon = config.icon;
            const statusColor = statusColors[activity.status] || statusColors.completed;

            return (
              <motion.div
                key={activity.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-4 p-3.5 rounded-2xl hover:bg-gray-50/80 transition-all duration-200 group border border-transparent hover:border-gray-100"
              >
                {/* Activity Icon */}
                <div className={`w-11 h-11 rounded-xl ${config.color} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-sm`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Activity Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 font-bold truncate leading-tight">
                    {activity.action}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{activity.user}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[11px] text-gray-400 font-medium">{activity.time}</span>
                  </div>
                </div>

                {/* Actions & Status */}
                <div className="flex items-center gap-3">
                  <span className={`hidden sm:inline-flex text-[10px] font-bold px-2.5 py-1 rounded-lg border ${statusColor} flex-shrink-0 uppercase tracking-tighter`}>
                    {activity.status}
                  </span>
                  <button 
                    onClick={() => removeActivity(activity.id)}
                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    title="Remove log"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {activities.length === 0 && (
          <div className="py-12 text-center text-gray-400 font-medium bg-gray-50/50 rounded-2xl border border-dashed border-gray-100">
            No recent activities recorded.
          </div>
        )}
      </div>
    </motion.div>
  );
}

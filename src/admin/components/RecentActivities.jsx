import { motion } from 'framer-motion';
import {
  UserCheck, Upload, BookPlus, Edit3, LogIn, Trash2, Server,
} from 'lucide-react';

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
export default function RecentActivities({ activities }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.4 }}
      className="bg-white rounded-2xl p-6 shadow-card border border-gray-100/50 mt-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-bold text-gray-800">Recent Activities</h3>
        <button className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-50">
          View All
        </button>
      </div>

      <div className="space-y-1">
        {activities.map((activity, index) => {
          const config = activityConfig[activity.type] || activityConfig.system;
          const Icon = config.icon;
          const statusColor = statusColors[activity.status] || statusColors.completed;

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.05, duration: 0.3 }}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
            >
              {/* Activity Icon */}
              <div className={`w-10 h-10 rounded-xl ${config.color} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                <Icon className="w-4.5 h-4.5" />
              </div>

              {/* Activity Details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 font-medium truncate">
                  {activity.action}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-gray-500">{activity.user}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              </div>

              {/* Status Badge */}
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusColor} flex-shrink-0 capitalize`}>
                {activity.status}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

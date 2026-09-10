import { motion } from 'framer-motion';
import {
  BookOpen, Users, Bell, Building2, School, UserCheck,
  TrendingUp, TrendingDown,
} from 'lucide-react';
import { useAnimatedCounter } from '../hooks/useCustomHooks';

// Icon map
const iconMap = {
  BookOpen, Users, Bell, Building2, School, UserCheck,
};

/**
 * Individual stat card with animated counter, sparkline, and glassmorphism
 */
function StatCard({ stat, index }) {
  const animatedValue = useAnimatedCounter(stat.value, 1500 + index * 200);

  // Color config mapping
  const colorConfig = {
    blue: {
      bg: 'bg-blue-50',
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-700',
      text: 'text-blue-700',
      sparkline: '#3B82F6',
      ring: 'ring-blue-100',
    },
    indigo: {
      bg: 'bg-indigo-50',
      iconBg: 'bg-gradient-to-br from-indigo-500 to-indigo-700',
      text: 'text-indigo-700',
      sparkline: '#6366F1',
      ring: 'ring-indigo-100',
    },
    cyan: {
      bg: 'bg-cyan-50',
      iconBg: 'bg-gradient-to-br from-cyan-500 to-cyan-700',
      text: 'text-cyan-700',
      sparkline: '#06B6D4',
      ring: 'ring-cyan-100',
    },
    emerald: {
      bg: 'bg-emerald-50',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-700',
      text: 'text-emerald-700',
      sparkline: '#10B981',
      ring: 'ring-emerald-100',
    },
    amber: {
      bg: 'bg-amber-50',
      iconBg: 'bg-gradient-to-br from-amber-500 to-amber-700',
      text: 'text-amber-700',
      sparkline: '#F59E0B',
      ring: 'ring-amber-100',
    },
    rose: {
      bg: 'bg-rose-50',
      iconBg: 'bg-gradient-to-br from-rose-500 to-rose-700',
      text: 'text-rose-700',
      sparkline: '#F43F5E',
      ring: 'ring-rose-100',
    },
  };

  const colors = colorConfig[stat.color] || colorConfig.blue;
  const Icon = iconMap[stat.icon] || BookOpen;

  // Generate SVG sparkline path
  const generateSparkline = (data) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const width = 100;
    const height = 32;
    const step = width / (data.length - 1);

    const points = data.map((val, i) => {
      const x = i * step;
      const y = height - ((val - min) / range) * height;
      return `${x},${y}`;
    });

    return `M${points.join(' L')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100/50 overflow-hidden group cursor-pointer"
    >
      {/* Subtle gradient overlay on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 ${colors.iconBg}`} />

      <div className="relative flex items-start justify-between mb-4">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Sparkline (only when the stat has trend data) */}
        {stat.sparkline?.length > 1 && (
        <svg width="100" height="32" className="opacity-60 group-hover:opacity-100 transition-opacity">
          <defs>
            <linearGradient id={`gradient-${stat.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.sparkline} stopOpacity="0.3" />
              <stop offset="100%" stopColor={colors.sparkline} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={generateSparkline(stat.sparkline)}
            fill="none"
            stroke={colors.sparkline}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={`${generateSparkline(stat.sparkline)} L100,32 L0,32 Z`}
            fill={`url(#gradient-${stat.id})`}
          />
        </svg>
        )}
      </div>

      {/* Value */}
      <div className="relative">
        <p className="text-2xl font-bold text-gray-800 tracking-tight">
          {animatedValue.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500 mt-0.5 font-medium">{stat.title}</p>
      </div>


    </motion.div>
  );
}

/**
 * Dashboard Cards Grid
 */
export default function DashboardCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
      {stats.map((stat, index) => (
        <StatCard key={stat.id} stat={stat} index={index} />
      ))}
    </div>
  );
}

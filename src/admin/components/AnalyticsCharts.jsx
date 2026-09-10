import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, BarChart3, Package } from 'lucide-react';
import { recentYears } from '../../services/dashboardService';

/**
 * Custom tooltip for charts
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-xl border border-gray-100">
        <p className="text-xs font-semibold text-gray-800 mb-1">{label || payload[0].name}</p>
        {payload.map((entry, i) => (
          <p key={i} className="text-xs text-gray-600">
            <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: entry.color || entry.payload?.fill }} />
            {entry.name}: <span className="font-semibold">{Number(entry.value).toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const COLORS = ['#3B82F6', '#6366F1', '#06B6D4', '#10B981', '#F59E0B', '#F43F5E'];

/**
 * Analytics Charts Section for Dashboard (data comes from GET /api/admin/dashboard)
 * - distribution: 12 rows { monthName, distributed, target } for `year` (edited in Admin → Book Distribution)
 * - monthlyUploads: last 12 months { month, uploads }
 * - contentTypes: [{ name, value }] item counts
 */
export default function AnalyticsCharts({ distribution = [], monthlyUploads = [], contentTypes = [], year, onYearChange }) {
  const hasDistribution = distribution.some((row) => row.distributed > 0 || row.target > 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
      {/* Book Distribution Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="bg-white rounded-2xl p-6 shadow-card border border-gray-100/50"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-blue-600" />
              </div>
              Book Distribution
            </h3>
            <p className="text-xs text-gray-500 mt-1 ml-10">Distribution vs target overview</p>
          </div>
          <select
            value={year}
            onChange={(e) => onYearChange(Number(e.target.value))}
            className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer hover:bg-gray-100 transition-colors"
          >
            {recentYears().map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        {hasDistribution ? (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={distribution} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="monthName" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F8FAFC' }} />
              <Bar dataKey="distributed" name="Distributed" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" name="Target" fill="#E2E8F0" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-60 flex items-center justify-center text-center text-sm text-gray-400 font-medium">
            No distribution figures for {year} yet.<br />Add them in Book Distribution.
          </div>
        )}
      </motion.div>

      {/* Monthly Upload Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="bg-white rounded-2xl p-6 shadow-card border border-gray-100/50"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-cyan-600" />
              </div>
              Monthly Uploads
            </h3>
            <p className="text-xs text-gray-500 mt-1 ml-10">Books, notices, tenders and gallery items — last 12 months</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={monthlyUploads}>
            <defs>
              <linearGradient id="uploadGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis allowDecimals={false} tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="uploads" name="Uploads" stroke="#06B6D4" fill="url(#uploadGradient)" strokeWidth={2.5} dot={{ r: 3, fill: '#06B6D4', stroke: '#fff', strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Content Type Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="bg-white rounded-2xl p-6 shadow-card border border-gray-100/50 lg:col-span-2"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Package className="w-4 h-4 text-indigo-600" />
              </div>
              Content Distribution
            </h3>
            <p className="text-xs text-gray-500 mt-1 ml-10">Number of items by type</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-1/2 h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={contentTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1500}
                >
                  {contentTypes.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {contentTypes.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full shadow-sm flex-shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-sm text-gray-600 font-semibold group-hover:text-gray-900 transition-colors truncate max-w-[100px] sm:max-w-none">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-gray-800 bg-gray-100/50 px-2 py-0.5 rounded-md">{item.value.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

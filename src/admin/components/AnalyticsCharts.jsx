import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { chartData } from '../data/dummyData';
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';

/**
 * Custom tooltip for charts
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-xl border border-gray-100">
        <p className="text-xs font-semibold text-gray-800 mb-1">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} className="text-xs text-gray-600">
            <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
            {entry.name}: <span className="font-semibold">{entry.value.toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const COLORS = ['#3B82F6', '#6366F1', '#06B6D4', '#10B981', '#F59E0B', '#F43F5E'];

/**
 * Analytics Charts Section for Dashboard
 */
export default function AnalyticsCharts() {
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
          <select className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
            <option>This Year</option>
            <option>Last Year</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={chartData.bookDistribution} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="distributed" name="Distributed" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="target" name="Target" fill="#E2E8F0" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
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
            <p className="text-xs text-gray-500 mt-1 ml-10">Books uploaded per month</p>
          </div>
          <select className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
            <option>This Year</option>
            <option>Last Year</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={chartData.monthlyUploads}>
            <defs>
              <linearGradient id="uploadGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="uploads" name="Uploads" stroke="#06B6D4" fill="url(#uploadGradient)" strokeWidth={2.5} dot={{ r: 3, fill: '#06B6D4', stroke: '#fff', strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Department Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="bg-white rounded-2xl p-6 shadow-card border border-gray-100/50"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                <PieChartIcon className="w-4 h-4 text-indigo-600" />
              </div>
              Department Activity
            </h3>
            <p className="text-xs text-gray-500 mt-1 ml-10">Activity distribution by department</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ResponsiveContainer width="50%" height={200}>
            <PieChart>
              <Pie
                data={chartData.departmentActivity}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {chartData.departmentActivity.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex-1 space-y-2">
            {chartData.departmentActivity.map((dept, index) => (
              <div key={dept.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[index] }} />
                <span className="text-xs text-gray-600 flex-1 truncate">{dept.name}</span>
                <span className="text-xs font-semibold text-gray-800">{dept.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Recent Updates Graph */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="bg-white rounded-2xl p-6 shadow-card border border-gray-100/50"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                <Activity className="w-4 h-4 text-emerald-600" />
              </div>
              Recent Updates
            </h3>
            <p className="text-xs text-gray-500 mt-1 ml-10">System activity over time</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData.bookDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="distributed" name="Updates" stroke="#10B981" strokeWidth={2.5} dot={{ r: 3, fill: '#10B981', stroke: '#fff', strokeWidth: 2 }} />
            <Line type="monotone" dataKey="target" name="Expected" stroke="#E2E8F0" strokeWidth={2} strokeDasharray="5 5" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}

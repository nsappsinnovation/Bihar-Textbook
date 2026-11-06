import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, UserCheck, CalendarDays, TrendingUp, Smartphone, Tablet, Monitor, BarChart3, BookOpen } from 'lucide-react';
import { useAnimatedCounter } from '../hooks/useCustomHooks';
import { getVisitSummary } from '../../services/visitService';
import useMissions from '../../components/home-shared/useMissions';
import ProgrammeIcon from '../../components/home-v1/ProgrammeIcon';

const DEVICE_META = {
  phone: { label: 'Phone', icon: Smartphone, color: '#3B82F6' },
  tablet: { label: 'Tablet', icon: Tablet, color: '#F59E0B' },
  desktop: { label: 'Desktop', icon: Monitor, color: '#10B981' },
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-xl border border-gray-100">
      <p className="text-xs font-semibold text-gray-700">
        <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: p.payload.fill }} />
        {p.name}: <span className="font-bold">{Number(p.value).toLocaleString()}</span>
      </p>
    </div>
  );
};

function Kpi({ icon: Icon, label, value, index }) {
  const animated = useAnimatedCounter(value ?? 0, 1200 + index * 150);
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="bg-white rounded-2xl p-5 shadow-card border border-gray-100/50"
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-gray-100 text-gray-500">
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-2xl font-bold text-gray-800 tabular-nums">{animated.toLocaleString()}</p>
      <p className="text-xs text-gray-500 mt-0.5 font-medium">{label}</p>
    </motion.div>
  );
}

function DeviceSplit({ byDevice }) {
  const rows = ['phone', 'tablet', 'desktop'].map((key) => ({
    key,
    name: DEVICE_META[key].label,
    value: byDevice.find((d) => d.device === key)?.count || 0,
    fill: DEVICE_META[key].color,
  }));
  const total = rows.reduce((sum, r) => sum + r.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.2 }}
      className="bg-white rounded-2xl p-6 shadow-card border border-gray-100/50"
    >
      <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
          <Smartphone className="w-4 h-4 text-gray-500" />
        </div>
        Visits by Device
      </h3>

      {total === 0 ? (
        <p className="text-xs text-gray-400 text-center py-10">No visits recorded yet.</p>
      ) : (
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-full sm:w-1/2 h-[180px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={rows} cx="50%" cy="50%" innerRadius={52} outerRadius={75} paddingAngle={4} dataKey="value" animationDuration={1200}>
                  {rows.map((r) => (
                    <Cell key={r.key} fill={r.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full sm:w-1/2 space-y-3">
            {rows.map((r) => {
              const Icon = DEVICE_META[r.key].icon;
              const pct = total ? Math.round((r.value / total) * 100) : 0;
              return (
                <div key={r.key} className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-gray-100 text-gray-500">
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-xs font-semibold text-gray-600 flex-1">{r.name}</span>
                  <span className="text-xs font-bold text-gray-800 tabular-nums">{r.value.toLocaleString()}</span>
                  <span className="text-[11px] font-medium text-gray-400 tabular-nums w-9 text-right">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}

// A book's itemKey is "<classId>:<subject>" — shown as "Class 2 · Ganit" instead of the raw key.
function formatBookLabel(itemKey) {
  const [classId, subject] = itemKey.split(':');
  const niceSubject = subject ? subject.replace(/[_-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : itemKey;
  return classId ? `Class ${classId} · ${niceSubject}` : itemKey;
}

function Leaderboard({ title, icon: Icon, rows, renderIcon, renderLabel, delay }) {
  const maxVisits = Math.max(1, ...rows.map((r) => r.visits));

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="bg-white rounded-2xl p-6 shadow-card border border-gray-100/50"
    >
      <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
          <Icon className="w-4 h-4 text-gray-500" />
        </div>
        {title}
      </h3>

      {rows.length === 0 ? (
        <p className="text-xs text-gray-400 text-center py-10">No visits recorded yet.</p>
      ) : (
        <div className="space-y-4">
          {rows.map((r) => (
            <div key={r.itemKey} className="flex items-center gap-3.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gray-100 text-gray-500">
                {renderIcon(r)}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-gray-700 truncate">{renderLabel(r)}</p>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[11px] text-gray-400 tabular-nums">{r.unique.toLocaleString()} unique</span>
                    <span className="text-xs font-bold text-gray-800 tabular-nums w-10 text-right">{r.visits.toLocaleString()}</span>
                  </div>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-indigo-500" style={{ width: `${(r.visits / maxVisits) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/**
 * Visitor analytics for the Books section and the 8 Learning Playground features.
 * Reads GET /api/admin/visits/summary — a backend route that does not exist yet (see
 * src/services/visitService.js). Until it's added, this page shows a clear "not connected"
 * state instead of silently displaying misleading zeros.
 */
const EMPTY_SUMMARY = { totals: { all: 0, month: 0, uniqueAll: 0, uniqueMonth: 0 }, byDevice: [], books: [], playground: [] };

export default function AnalyticsPage() {
  const [summary, setSummary] = useState(EMPTY_SUMMARY);
  const missions = useMissions(); // for playground titles/icons, same source the homepage uses

  useEffect(() => {
    getVisitSummary()
      .then(setSummary)
      .catch(() => {}); // backend not live yet (or request failed) — keep showing the zeroed UI
  }, []);

  const totals = summary?.totals || {};
  const missionByLink = Object.fromEntries((missions || []).map((m) => [m.link, m]));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">Visitor activity for the Books section and the Learning Playground features.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi icon={Users} label="Total Visitors" value={totals.all} index={0} />
        <Kpi icon={CalendarDays} label="This Month" value={totals.month} index={1} />
        <Kpi icon={UserCheck} label="Unique (All-time)" value={totals.uniqueAll} index={2} />
        <Kpi icon={TrendingUp} label="Unique (This Month)" value={totals.uniqueMonth} index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <DeviceSplit byDevice={summary?.byDevice || []} />

        <Leaderboard
          title="Books"
          icon={BookOpen}
          rows={summary?.books || []}
          delay={0.25}
          renderIcon={() => <BookOpen className="w-4 h-4" />}
          renderLabel={(r) => formatBookLabel(r.itemKey)}
        />
      </div>

      <Leaderboard
        title="Learning Playground"
        icon={BarChart3}
        rows={summary?.playground || []}
        delay={0.3}
        renderIcon={(r) => <ProgrammeIcon link={r.itemKey} className="w-4 h-4" />}
        renderLabel={(r) => missionByLink[r.itemKey]?.title || r.itemKey}
      />
    </motion.div>
  );
}

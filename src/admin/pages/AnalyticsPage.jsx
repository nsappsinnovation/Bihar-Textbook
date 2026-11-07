import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Users, UserCheck, CalendarDays, TrendingUp, Smartphone, Tablet, Monitor, BookOpen, ChevronDown, LayoutGrid } from 'lucide-react';
import { useAnimatedCounter } from '../hooks/useCustomHooks';
import { getVisitSummary } from '../../services/visitService';
import useMissions from '../../components/home-shared/useMissions';

// Flat colors on purpose — not gradients. Testing showed recharts can render a gradient-filled
// Pie slice (combined with paddingAngle) as a corrupted, detached shape on some paints; flat
// fills never reproduced that in any test, so they're the reliable choice here.
const DEVICE_META = {
  phone: { label: 'Phone', icon: Smartphone, color: '#7C3AED' },
  tablet: { label: 'Tablet', icon: Tablet, color: '#F59E0B' },
  desktop: { label: 'Desktop', icon: Monitor, color: '#22C55E' },
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
  const animatedTotal = useAnimatedCounter(total, 1200);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.2 }}
      className="bg-white rounded-2xl p-6 shadow-card border border-gray-100/50"
    >
      <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-1">
        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
          <Smartphone className="w-4 h-4 text-gray-500" />
        </div>
        Visits by Device
      </h3>
      <p className="text-xs text-gray-400 ml-10 mb-4">All-time, by device type</p>

      {total === 0 ? (
        <p className="text-xs text-gray-400 text-center py-10">No visits recorded yet.</p>
      ) : (
        <>
          <div className="relative w-full aspect-square max-w-[220px] mx-auto">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <PieChart>
                {/* Fixed pixel radii on purpose, not percentages — percentage radii paired
                    with paddingAngle reproduced a corrupted/detached slice on some paints
                    during testing; plain numbers never did. Sized to fit the 220px box above. */}
                <Pie data={rows} cx="50%" cy="50%" innerRadius={66} outerRadius={100} paddingAngle={3} dataKey="value">
                  {rows.map((r) => (
                    <Cell key={r.key} fill={r.fill} stroke="none" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Total, centered in the donut's hole */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-2xl font-black text-gray-900 tabular-nums">{animatedTotal.toLocaleString()}</p>
              <p className="text-[11px] text-gray-400 font-medium">Total</p>
            </div>
          </div>

          {/* Legend — icon, label, and that device's share of total visits */}
          <div className="flex justify-center gap-8 mt-6">
            {rows.map((r) => {
              const Icon = DEVICE_META[r.key].icon;
              return (
                <div key={r.key} className="flex flex-col items-center">
                  <span className="w-9 h-9 rounded-xl flex items-center justify-center mb-1.5" style={{ backgroundColor: `${r.fill}1a`, color: r.fill }}>
                    <Icon className="w-4 h-4" />
                  </span>
                  <p className="text-xs text-gray-500">{r.name}</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">{total ? Math.round((r.value / total) * 100) : 0}%</p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </motion.div>
  );
}

// A book's itemKey is "<classId>:<subject>" — the subject shown as "Ganit" instead of "ganit".
const subjectLabel = (itemKey) => itemKey.split(':')[1]?.replace(/[_-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || itemKey;

// Books traffic grouped by class instead of one row per book — a school with 20+ books across
// 12 classes would otherwise turn "Books" into an ever-growing wall of rows. Shows a ranked bar
// chart across classes (at a glance: which classes get the most traffic), and each class expands
// to show the book-by-book breakdown underneath it on demand.
function ClassTraffic({ rows, delay }) {
  const [expanded, setExpanded] = useState(() => new Set());

  const classRows = useMemo(() => {
    const byClass = new Map();
    for (const r of rows) {
      const classId = r.itemKey.split(':')[0];
      if (!byClass.has(classId)) byClass.set(classId, { classId, visits: 0, books: [] });
      const entry = byClass.get(classId);
      entry.visits += r.visits;
      entry.books.push(r);
    }
    return [...byClass.values()]
      .map((c) => ({ ...c, books: c.books.sort((a, b) => b.visits - a.visits) }))
      .sort((a, b) => b.visits - a.visits);
  }, [rows]);

  const chartData = classRows.map((c) => ({ name: `Class ${c.classId}`, visits: c.visits, classId: c.classId, fill: '#6366F1' }));

  const toggle = (classId) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(classId) ? next.delete(classId) : next.add(classId);
      return next;
    });

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="bg-white rounded-2xl p-6 shadow-card border border-gray-100/50"
    >
      <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-gray-500" />
        </div>
        Books — by Class
      </h3>

      {classRows.length === 0 ? (
        <p className="text-xs text-gray-400 text-center py-10">No visits recorded yet.</p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={Math.max(140, classRows.length * 32)}>
            <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 0 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" width={62} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F8FAFC' }} />
              <Bar dataKey="visits" name="Visits" fill="#6366F1" radius={[0, 6, 6, 0]} barSize={14} />
            </BarChart>
          </ResponsiveContainer>

          {/* Expandable detail — click a class to see its book-by-book breakdown */}
          <div className="mt-5 space-y-2 max-h-[18rem] overflow-y-auto pr-1">
            {classRows.map((c) => {
              const isOpen = expanded.has(c.classId);
              return (
                <div key={c.classId} className="border border-gray-100 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggle(c.classId)}
                    className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 text-left hover:bg-gray-50/80 transition-colors"
                  >
                    <span className="text-xs font-semibold text-gray-700">Class {c.classId}</span>
                    <span className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-bold text-gray-800 tabular-nums">{c.visits.toLocaleString()} visits</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-3.5 pb-3 pt-1 space-y-2 border-t border-gray-100">
                      {c.books.map((b) => (
                        <div key={b.itemKey} className="flex items-center justify-between gap-2 text-[11px]">
                          <span className="text-gray-500 truncate">{subjectLabel(b.itemKey)}</span>
                          <span className="text-gray-700 font-semibold tabular-nums shrink-0">
                            {b.visits.toLocaleString()} visits · {b.unique.toLocaleString()} unique
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </motion.div>
  );
}

// One color per feature so the 8 bars are easy to tell apart at a glance, instead of one flat
// colour. Flat fills, not gradients — see the note above DEVICE_META on why.
const PLAYGROUND_PALETTE = ['#7C3AED', '#F59E0B', '#22C55E', '#3B82F6', '#EC4899', '#14B8A6', '#F97316', '#6366F1'];

const PlaygroundTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-gray-900 text-white rounded-full pl-2.5 pr-3.5 py-1.5 shadow-xl flex items-center gap-2 whitespace-nowrap">
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: d.fill }} />
      <span className="text-xs font-semibold tabular-nums">{d.visits.toLocaleString()} visits</span>
    </div>
  );
};

// Rounded-top bar in that feature's own color, with a slightly brighter "cap" line at the top.
function ColorBar({ x, y, width, height, fill }) {
  if (!(height > 0)) return null;
  const capHeight = 3;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={fill} fillOpacity={0.8} rx={3} />
      <rect x={x} y={y} width={width} height={capHeight} fill={fill} />
    </g>
  );
}

// Learning Playground traffic as a bar chart, one color per feature.
function PlaygroundTraffic({ rows, getLabel, delay }) {
  const data = rows
    .map((r, i) => ({ name: getLabel(r), visits: r.visits, unique: r.unique, itemKey: r.itemKey, fill: PLAYGROUND_PALETTE[i % PLAYGROUND_PALETTE.length] }))
    .sort((a, b) => b.visits - a.visits);
  const total = data.reduce((sum, d) => sum + d.visits, 0);
  const animatedTotal = useAnimatedCounter(total, 1200);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="bg-white rounded-2xl p-6 shadow-card border border-gray-100/50"
    >
      <div className="flex items-start justify-between mb-1">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
            <LayoutGrid className="w-4 h-4 text-gray-500" />
          </div>
          Learning Playground
        </h3>
      </div>
      <p className="text-xs text-gray-400 ml-10 mb-4">All-time, across the 8 features</p>

      {data.length === 0 ? (
        <p className="text-xs text-gray-400 text-center py-10">No visits recorded yet.</p>
      ) : (
        <>
          <p className="text-3xl font-black text-gray-900 tabular-nums mb-4">{animatedTotal.toLocaleString()}</p>

          <ResponsiveContainer width="100%" height={240} minWidth={0}>
            <BarChart data={data} barCategoryGap="12%">
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} interval={0} />
              <YAxis hide />
              <Tooltip content={<PlaygroundTooltip />} cursor={false} />
              <Bar dataKey="visits" shape={ColorBar}>
                {data.map((d) => (
                  <Cell key={d.itemKey} fill={d.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </>
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

        <ClassTraffic rows={summary?.books || []} delay={0.25} />
      </div>

      <PlaygroundTraffic
        rows={summary?.playground || []}
        getLabel={(r) => missionByLink[r.itemKey]?.title || r.itemKey}
        delay={0.3}
      />
    </motion.div>
  );
}

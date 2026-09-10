import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Truck } from 'lucide-react';
import { useActivityLog } from '../hooks/useCustomHooks';
import { getDistribution, saveDistribution, recentYears } from '../../services/dashboardService';
import { errorMessage } from '../../services/api';

/**
 * Book Distribution Page
 * Monthly textbooks distributed vs target, shown in the dashboard "Book Distribution" chart.
 */
export default function BookDistributionPage({ addToast }) {
  const { logActivity } = useActivityLog();
  const [year, setYear] = useState(new Date().getFullYear());
  const [rows, setRows] = useState([]); // [{ month, monthName, distributed, target }]
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getDistribution(year)
      .then(setRows)
      .catch(() => addToast?.('Could not load distribution figures', 'error'));
  }, [year, addToast]);

  const updateRow = (month, field, value) => {
    setRows((prev) => prev.map((row) => (row.month === month ? { ...row, [field]: value } : row)));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const months = rows.map(({ month, distributed, target }) => ({
        month,
        distributed: Number(distributed) || 0,
        target: Number(target) || 0,
      }));
      setRows(await saveDistribution(year, months));
      addToast?.(`Distribution figures for ${year} saved`, 'success');
      logActivity(`Updated book distribution figures for ${year}`, 'Admin', 'edit');
    } catch (error) {
      addToast?.(errorMessage(error, 'Could not save distribution figures'), 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const totalDistributed = rows.reduce((sum, row) => sum + (Number(row.distributed) || 0), 0);
  const totalTarget = rows.reduce((sum, row) => sum + (Number(row.target) || 0), 0);
  const inputClass =
    'w-full px-3 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-right';

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Book Distribution</h1>
            <p className="text-sm text-gray-500 mt-0.5">Monthly textbooks distributed vs target (shown on the dashboard)</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {recentYears().map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      {/* Month table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-[11px] font-semibold uppercase tracking-wider border-b border-gray-100">
              <th className="py-3 px-5">Month</th>
              <th className="py-3 px-5 text-right">Books Distributed</th>
              <th className="py-3 px-5 text-right">Target</th>
              <th className="py-3 px-5 text-right">Achieved</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm">
            {rows.map((row) => {
              const target = Number(row.target) || 0;
              const achieved = target ? Math.round(((Number(row.distributed) || 0) / target) * 100) : null;
              return (
                <tr key={row.month}>
                  <td className="py-2.5 px-5 font-semibold text-gray-700">{row.monthName} {year}</td>
                  <td className="py-2.5 px-5 w-48">
                    <input type="number" min="0" value={row.distributed} onChange={(e) => updateRow(row.month, 'distributed', e.target.value)} className={inputClass} />
                  </td>
                  <td className="py-2.5 px-5 w-48">
                    <input type="number" min="0" value={row.target} onChange={(e) => updateRow(row.month, 'target', e.target.value)} className={inputClass} />
                  </td>
                  <td className="py-2.5 px-5 text-right font-semibold text-gray-600">{achieved === null ? '—' : `${achieved}%`}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 font-bold text-gray-800 text-sm border-t border-gray-100">
              <td className="py-3 px-5">Total {year}</td>
              <td className="py-3 px-5 text-right">{totalDistributed.toLocaleString()}</td>
              <td className="py-3 px-5 text-right">{totalTarget.toLocaleString()}</td>
              <td className="py-3 px-5 text-right">{totalTarget ? `${Math.round((totalDistributed / totalTarget) * 100)}%` : '—'}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </motion.div>
  );
}

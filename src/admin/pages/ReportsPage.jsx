import { motion } from 'framer-motion';
import { BarChart3, Download } from 'lucide-react';

export default function ReportsPage({ addToast }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center h-[calc(100vh-140px)]"
    >
      <div className="w-24 h-24 rounded-full bg-indigo-50 flex items-center justify-center mb-6">
        <BarChart3 className="w-12 h-12 text-indigo-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">System Reports</h2>
      <p className="text-gray-500 text-center max-w-md mb-8">
        Generate detailed reports for book distributions, user activity, and system analytics.
      </p>
      <motion.button
        onClick={() => addToast('Report generation started', 'success')}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Download className="w-5 h-5" />
        Generate Monthly Report
      </motion.button>
    </motion.div>
  );
}

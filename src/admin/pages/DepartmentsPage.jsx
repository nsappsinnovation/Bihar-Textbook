import { motion } from 'framer-motion';
import { Building2, Plus, Edit3, Trash2, Users } from 'lucide-react';
import { departmentOptions } from '../data/dummyData';

export default function DepartmentsPage({ addToast }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Departments</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage organizational departments</p>
        </div>
        <motion.button
          onClick={() => addToast('Add Department clicked', 'info')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold shadow-lg shadow-blue-500/20"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-4 h-4" />
          Add Department
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {departmentOptions.map((dept, index) => (
          <motion.div
            key={dept}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white p-6 rounded-2xl shadow-card border border-gray-100 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-indigo-500" />
              </div>
            </div>
            <h3 className="text-base font-bold text-gray-800 mb-2">{dept}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Users className="w-4 h-4" />
              <span>{Math.floor(Math.random() * 50) + 10} Employees</span>
            </div>
            <div className="flex items-center gap-2 pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="flex-1 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">Edit</button>
              <button className="flex-1 py-1.5 text-xs font-medium text-red-500 bg-red-50 rounded-lg hover:bg-red-100">Delete</button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

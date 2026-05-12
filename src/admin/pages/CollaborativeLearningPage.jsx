import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, BookOpen } from 'lucide-react';

/**
 * Collaborative Learning Management Page
 * Allows adding/removing/editing CL modules
 */
export default function CollaborativeLearningPage({ addToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Local state for CL items with persistence
  const [clItems, setClItems] = useState(() => {
    const saved = localStorage.getItem('website_cl_modules');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Teacher Training Workshop', category: 'Training', date: '2026-05-10', status: 'Active' },
      { id: 2, title: 'Student Innovation Hub', category: 'Innovation', date: '2026-05-12', status: 'Draft' },
      { id: 3, title: 'Digital Literacy Campaign', category: 'Literacy', date: '2026-05-15', status: 'Active' },
      { id: 4, title: 'Global Learning Exchange', category: 'Exchange', date: '2026-05-20', status: 'Active' },
    ];
  });

  const handleAddModule = () => {
    const newModule = {
      id: Date.now(),
      title: 'New Learning Module',
      category: 'General',
      date: new Date().toISOString().split('T')[0],
      status: 'Draft'
    };
    const updated = [...clItems, newModule];
    setClItems(updated);
    localStorage.setItem('website_cl_modules', JSON.stringify(updated));
    addToast?.('Module Added', 'success');
  };

  const handleDelete = (id) => {
    const updated = clItems.filter(item => item.id !== id);
    setClItems(updated);
    localStorage.setItem('website_cl_modules', JSON.stringify(updated));
    addToast?.('Updated', 'info');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Collaborative Learning</h1>
          <p className="text-sm text-gray-500 mt-1">Manage learning modules and collaborative initiatives</p>
        </div>
        <button 
          onClick={handleAddModule}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-sm hover:bg-blue-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Module</span>
        </button>
      </div>

      {/* Stats Mini Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Modules</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{clItems.length}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Modules</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{clItems.filter(i => i.status === 'Active').length}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Drafts</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">{clItems.filter(i => i.status === 'Draft').length}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search modules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-all text-sm font-semibold">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Module Title</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Launch Date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {clItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-gray-700">{item.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold text-gray-500 px-2 py-1 bg-gray-100 rounded-md">{item.category}</span>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-500">{item.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      item.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      <span className={`w-1 h-1 rounded-full ${item.status === 'Active' ? 'bg-emerald-600' : 'bg-amber-600'}`} />
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Plus, Edit3, Trash2, Pin, Paperclip, Calendar,
  Bell, ChevronDown, AlertCircle, Clock,
} from 'lucide-react';
import Modal, { FormInput, ToggleSwitch } from '../components/Modal';
import { notices, noticeCategories } from '../data/dummyData';
import { useDebounce } from '../hooks/useCustomHooks';

const priorityStyles = {
  High: 'bg-red-50 text-red-600 border-red-200',
  Medium: 'bg-amber-50 text-amber-600 border-amber-200',
  Low: 'bg-blue-50 text-blue-600 border-blue-200',
};

const priorityIcons = {
  High: AlertCircle,
  Medium: Clock,
  Low: Bell,
};

/**
 * Notices & Announcements Page
 */
export default function NoticesPage({ addToast }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);

  const debouncedSearch = useDebounce(searchQuery);

  const filteredNotices = useMemo(() => {
    return notices.filter((notice) => {
      const matchesSearch = notice.title.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || notice.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [debouncedSearch, selectedCategory]);

  // Sort pinned notices first
  const sortedNotices = useMemo(() => {
    return [...filteredNotices].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
  }, [filteredNotices]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Notices & Announcements</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage official notices and announcements</p>
        </div>
        <motion.button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-shadow"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          id="add-notice-btn"
        >
          <Plus className="w-4 h-4" />
          Add Notice
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-card border border-gray-100/50 mb-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search notices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
              id="search-notices"
            />
          </div>
          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {noticeCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notice Cards */}
      <div className="space-y-4">
        {sortedNotices.map((notice, index) => {
          const PriorityIcon = priorityIcons[notice.priority] || Bell;

          return (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ x: 4 }}
              className={`bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover border transition-all duration-300 cursor-pointer ${
                notice.pinned ? 'border-blue-200 bg-blue-50/20' : 'border-gray-100/50'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Priority Icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  notice.priority === 'High' ? 'bg-red-100 text-red-500' :
                  notice.priority === 'Medium' ? 'bg-amber-100 text-amber-500' :
                  'bg-blue-100 text-blue-500'
                }`}>
                  <PriorityIcon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {notice.pinned && (
                      <Pin className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
                    )}
                    <h3 className="text-sm font-bold text-gray-800 truncate">{notice.title}</h3>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">{notice.description}</p>

                  {/* Meta */}
                  <div className="flex items-center flex-wrap gap-3">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${priorityStyles[notice.priority]}`}>
                      {notice.priority}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(notice.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    {notice.hasAttachment && (
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Paperclip className="w-3 h-3" />
                        Attachment
                      </span>
                    )}
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {notice.category}
                    </span>
                    <span className="text-xs text-gray-400">by {notice.author}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => addToast(`Editing: ${notice.title}`, 'info')}
                    className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    title="Edit"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => addToast(`Deleted: ${notice.title}`, 'error')}
                    className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {sortedNotices.length === 0 && (
        <div className="py-16 text-center bg-white rounded-2xl shadow-card">
          <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-500">No notices found</p>
          <p className="text-xs text-gray-400 mt-1">Try adjusting your search or category filter</p>
        </div>
      )}

      {/* Add Notice Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Notice" size="lg">
        <FormInput label="Title" placeholder="Enter notice title" required id="notice-title" />
        <FormInput label="Description" type="textarea" placeholder="Enter notice content..." required id="notice-description" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
            <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all bg-white" id="notice-category">
              {noticeCategories.filter(c => c !== 'All').map(cat => <option key={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Priority</label>
            <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all bg-white" id="notice-priority">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>
        <ToggleSwitch label="Pin this notice" checked={isPinned} onChange={setIsPinned} id="notice-pin" />
        <ToggleSwitch label="Schedule publishing" checked={isScheduled} onChange={setIsScheduled} id="notice-schedule" />
        <FormInput label="Upload Attachment (PDF)" type="file" id="notice-attachment" />

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={() => setShowAddModal(false)}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <motion.button
            onClick={() => {
              setShowAddModal(false);
              addToast('Notice published successfully!', 'success');
            }}
            className="px-5 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold shadow-lg shadow-blue-500/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Publish Notice
          </motion.button>
        </div>
      </Modal>
    </motion.div>
  );
}

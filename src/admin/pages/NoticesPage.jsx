import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Plus, Edit3, Trash2, Pin, Paperclip, Calendar,
  Bell, ChevronDown, AlertCircle, Clock,
} from 'lucide-react';
import Modal, { FormInput, ToggleSwitch } from '../components/Modal';
import { notices, noticeCategories } from '../data/dummyData';
import { noticesData } from '../../pages/navbar_pages/Notice';
import { tendersData } from '../../data/tendersData';
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

import { useActivityLog } from '../hooks/useCustomHooks';

/**
 * Notices & Announcements Page
 */
export default function NoticesPage({ addToast, forcedCategory }) {
  const { logActivity } = useActivityLog();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(forcedCategory || 'All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  
  // Local state for notices with persistence
  const [noticeList, setNoticeList] = useState(() => {
    const saved = localStorage.getItem('website_notices_v6');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      ...noticesData.map(n => ({ ...n, id: `notice-${n.id}` })),
      ...tendersData.map(t => ({ ...t, id: `tender-${t.id}` }))
    ];
  });

  const noticeOptions = ["Recruitment", "Financial", "Technical", "Circular", "Corrigendum", "Other"];
  const tenderOptions = ["Active", "E-Tender", "Procurement", "Services", "Other"];
  const categoryOptions = forcedCategory === 'Tender' ? tenderOptions : noticeOptions;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: categoryOptions[0],
    priority: 'Low',
    pinned: false,
    date: new Date().toISOString(),
    author: 'Admin',
    document: null
  });

  const debouncedSearch = useDebounce(searchQuery);

  const parseDate = (dateStr) => {
    try {
      if (!dateStr) return new Date();
      if (typeof dateStr === 'string' && dateStr.includes('/')) {
        const parts = dateStr.split('/');
        return new Date(parts[2], parts[1] - 1, parts[0]);
      }
      const d = new Date(dateStr);
      return isNaN(d.getTime()) ? new Date() : d;
    } catch {
      return new Date();
    }
  };

  const formatDate = (dateStr) => {
    try {
      const d = parseDate(dateStr);
      return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch { return dateStr || ''; }
  };

  const filteredNotices = useMemo(() => {
    return noticeList.filter((notice) => {
      const matchesSearch = notice.title.toLowerCase().includes(debouncedSearch.toLowerCase());
      
      let matchesCategory = true;
      if (forcedCategory) {
        if (forcedCategory === 'Tender') {
          matchesCategory = tenderOptions.includes(notice.category) || notice.category.toLowerCase().includes('tender');
        } else {
          matchesCategory = !tenderOptions.includes(notice.category) && !notice.category.toLowerCase().includes('tender');
        }
      } else {
        matchesCategory = selectedCategory === 'All' || notice.category === selectedCategory;
      }

      return matchesSearch && matchesCategory;
    });
  }, [noticeList, debouncedSearch, selectedCategory, forcedCategory]);

  // Sort pinned notices first
  const sortedNotices = useMemo(() => {
    return [...filteredNotices].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
  }, [filteredNotices]);

  const handleSaveNotice = () => {
    let updatedList;
    if (editingNotice) {
      updatedList = noticeList.map(n => n.id === editingNotice.id ? { ...formData, id: n.id } : n);
      addToast('Updated', 'success');
      logActivity(`Updated notice: ${formData.title}`, 'Admin', 'edit');
    } else {
      const newNotice = { ...formData, id: Date.now() };
      updatedList = [newNotice, ...noticeList];
      addToast('Notice published successfully!', 'success');
      logActivity(`Published new notice: ${formData.title}`, 'Admin', 'upload');
    }
    setNoticeList(updatedList);
    localStorage.setItem('website_notices_v6', JSON.stringify(updatedList));
    localStorage.setItem('website_notices_last_updated', new Date().toISOString());
    window.dispatchEvent(new Event('websiteDataUpdated'));
    setShowAddModal(false);
    setEditingNotice(null);
    resetForm();
  };

  const handleDelete = (id) => {
    const itemToDelete = noticeList.find(n => n.id === id);
    const updatedList = noticeList.filter(n => n.id !== id);
    setNoticeList(updatedList);
    localStorage.setItem('website_notices_v6', JSON.stringify(updatedList));
    localStorage.setItem('website_notices_last_updated', new Date().toISOString());
    window.dispatchEvent(new Event('websiteDataUpdated'));
    addToast('Notice deleted', 'error');
    if (itemToDelete) {
      logActivity(`Deleted notice: ${itemToDelete.title}`, 'Admin', 'delete');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: categoryOptions[0],
      priority: 'Low',
      pinned: false,
      date: new Date().toISOString(),
      author: 'Admin',
      document: null
    });
  };

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setFormData(notice);
    setShowAddModal(true);
  };

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
          <h1 className="text-2xl font-bold text-gray-800">
            {forcedCategory ? `Manage ${forcedCategory}s` : 'Notices & Announcements'}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {forcedCategory ? `Add and edit official ${forcedCategory.toLowerCase()}s` : 'Manage official notices and announcements'}
          </p>
        </div>
        <motion.button
          onClick={() => { resetForm(); setEditingNotice(null); setShowAddModal(true); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-shadow"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          id="add-notice-btn"
        >
          <Plus className="w-4 h-4" />
          {'Add'}
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-card border border-gray-100/50 mb-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${forcedCategory?.toLowerCase() || 'notices'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
              id="search-notices"
            />
          </div>
          {/* Category pills - Only show if not forced */}
          {!forcedCategory && (
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
          )}
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
              className={`bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover border transition-all duration-300 ${
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
                    {notice.priority && (
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${priorityStyles[notice.priority]}`}>
                        {notice.priority}
                      </span>
                    )}
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(notice.date)}
                    </span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {notice.category}
                    </span>
                    {notice.document && (
                      <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                        <Paperclip className="w-3 h-3" />
                        {notice.document}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(notice)}
                    className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    title="Edit"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(notice.id)}
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
        </div>
      )}

      {/* Add Notice Modal */}
      <Modal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
        title={editingNotice ? "Edit Notice" : "Add New Notice"} 
        size="lg"
      >
        <div className="space-y-4">
          <FormInput 
            label="Title" 
            placeholder="Enter notice title" 
            required 
            value={formData.title}
            onChange={(val) => setFormData(prev => ({ ...prev, title: val }))}
            id="notice-title" 
          />
          <FormInput 
            label="Description" 
            type="textarea" 
            placeholder="Enter notice content..." 
            required 
            value={formData.description}
            onChange={(val) => setFormData(prev => ({ ...prev, description: val }))}
            id="notice-description" 
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
              <input 
                type="date"
                value={parseDate(formData.date).toISOString().split('T')[0]}
                onChange={(e) => setFormData(prev => ({ ...prev, date: new Date(e.target.value).toISOString() }))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all bg-white" 
                id="notice-date"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all bg-white" 
                id="notice-category"
              >
                {categoryOptions.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Priority</label>
              <select 
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all bg-white" 
                id="notice-priority"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <ToggleSwitch 
            label="Pin this notice" 
            checked={formData.pinned} 
            onChange={(val) => setFormData(prev => ({ ...prev, pinned: val }))} 
            id="notice-pin" 
          />

          <div className="mb-4 mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Upload Document (PDF)</label>
            <input 
              type="file" 
              accept=".pdf"
              onChange={(e) => setFormData(prev => ({ ...prev, document: e.target.files[0]?.name }))}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all bg-white"
            />
            {formData.document && (
              <p className="mt-2 text-xs text-emerald-600 font-medium flex items-center gap-1">
                <Paperclip className="w-3 h-3" /> {formData.document}
              </p>
            )}
          </div>
          
          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={() => setShowAddModal(false)}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <motion.button
              onClick={handleSaveNotice}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {editingNotice ? "Update Notice" : "Publish Notice"}
            </motion.button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}

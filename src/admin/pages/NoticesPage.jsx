import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Edit3, Trash2, Pin, Paperclip, Calendar, Bell } from 'lucide-react';
import Modal, { FormInput, ToggleSwitch } from '../components/Modal';
import { useDebounce, useActivityLog } from '../hooks/useCustomHooks';
import { getNotices, createNotice, updateNotice, deleteNotice } from '../../services/noticeService';
import { uploadFile, noticeUploadFolder } from '../../services/uploadService';
import { errorMessage } from '../../services/api';

const today = () => new Date().toISOString().slice(0, 10);

/**
 * Notices & Announcements Page
 */
export default function NoticesPage({ addToast, forcedCategory }) {
  const { logActivity } = useActivityLog();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(forcedCategory || 'All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  
  const [noticeList, setNoticeList] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const noticeOptions = ["Recruitment", "Financial", "Technical", "Circular", "Corrigendum", "Other"];
  const tenderOptions = ["Active", "E-Tender", "Procurement", "Services", "Other"];
  const categoryOptions = forcedCategory === 'Tender' ? tenderOptions : noticeOptions;
  const itemType = forcedCategory === 'Tender' ? 'Tender' : 'Notice';

  const emptyForm = () => ({
    title: '',
    description: '',
    type: itemType,
    category: categoryOptions[0],
    pinned: false,
    date: today(),
    document: '',
  });
  const [formData, setFormData] = useState(emptyForm);

  const debouncedSearch = useDebounce(searchQuery);

  const loadNotices = useCallback(() => {
    getNotices(forcedCategory)
      .then(setNoticeList)
      .catch(() => addToast('Could not load notices', 'error'));
  }, [forcedCategory, addToast]);

  useEffect(() => {
    loadNotices();
  }, [loadNotices]);

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

  // The list from the API is already sorted with pinned items first
  const sortedNotices = useMemo(() => {
    return noticeList.filter((notice) => {
      const matchesSearch = notice.title.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || selectedCategory === forcedCategory || notice.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [noticeList, debouncedSearch, selectedCategory, forcedCategory]);

  const handleSaveNotice = async () => {
    if (!formData.title.trim()) {
      addToast('Please enter a title', 'error');
      return;
    }
    try {
      if (editingNotice) {
        await updateNotice(editingNotice.id, formData);
        addToast('Updated', 'success');
        logActivity(`Updated ${itemType.toLowerCase()}: ${formData.title}`, 'Admin', 'edit');
      } else {
        await createNotice(formData);
        addToast(`${itemType} published successfully!`, 'success');
        logActivity(`Published new ${itemType.toLowerCase()}: ${formData.title}`, 'Admin', 'upload');
      }
      setShowAddModal(false);
      setEditingNotice(null);
      resetForm();
      loadNotices();
    } catch (error) {
      addToast(errorMessage(error, 'Could not save'), 'error');
    }
  };

  const handleDelete = async (id) => {
    const itemToDelete = noticeList.find(n => n.id === id);
    if (!window.confirm(`Delete "${itemToDelete?.title}"?`)) return;
    try {
      await deleteNotice(id);
      addToast(`${itemType} deleted`, 'error');
      logActivity(`Deleted ${itemType.toLowerCase()}: ${itemToDelete?.title}`, 'Admin', 'delete');
      loadNotices();
    } catch (error) {
      addToast(errorMessage(error, 'Could not delete'), 'error');
    }
  };

  const handleDocumentChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const path = await uploadFile(file, 'document', noticeUploadFolder(formData.type, formData.category));
      setFormData(prev => ({ ...prev, document: path }));
      addToast('Document uploaded', 'success');
    } catch (error) {
      addToast(errorMessage(error, 'Upload failed'), 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setFormData(emptyForm());
  };

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setFormData({ ...notice });
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
              {['All', ...categoryOptions].map((cat) => (
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
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-100 text-blue-500">
                  <Bell className="w-5 h-5" />
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
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(notice.date)}
                    </span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {notice.category}
                    </span>
                    {notice.link && (
                      <a href={notice.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium hover:underline">
                        <Paperclip className="w-3 h-3" />
                        View document
                      </a>
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
        title={editingNotice ? `Edit ${itemType}` : `Add New ${itemType}`} 
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
              <input 
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
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
              onChange={handleDocumentChange}
              disabled={isUploading}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all bg-white"
            />
            {isUploading && <p className="mt-2 text-xs text-gray-500">Uploading…</p>}
            {formData.document && !isUploading && (
              <p className="mt-2 text-xs text-emerald-600 font-medium flex items-center gap-1">
                <Paperclip className="w-3 h-3" /> {formData.document.split('/').pop()}
                <button type="button" onClick={() => setFormData(prev => ({ ...prev, document: '' }))} className="ml-2 text-red-500 hover:underline">Remove</button>
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
              disabled={isUploading}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {editingNotice ? `Update ${itemType}` : `Publish ${itemType}`}
            </motion.button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}

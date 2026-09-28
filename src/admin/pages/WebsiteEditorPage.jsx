import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, Edit2, Image as ImageIcon, User as UserIcon, FileText, Upload, RefreshCw, Quote, BadgeCheck, Camera, Calendar, Search } from 'lucide-react';
import Modal, { FormInput } from '../components/Modal';
import { useActivityLog } from '../hooks/useCustomHooks';
import { getSetting, saveSetting } from '../../services/settingService';
import { getDirectory, createDirectoryRow, updateDirectoryRow, deleteDirectoryRow } from '../../services/directoryService';
import { getSections, createSection, updateSection, deleteSection } from '../../services/sectionService';
import { moduleUploadFolder, UPLOAD_FOLDERS } from '../../services/uploadService';
import UploadProgress from '../components/UploadProgress';
import { useFileUpload } from '../hooks/useFileUpload';
import { fileUrl, errorMessage, isUploadedFile } from '../../services/api';

// Where each module's content is stored in the backend.
// Modules not listed here are section lists (gl-photo, gl-video, gl-press, ...).
const SETTING_MODULES = { 'dc-rti': 'dc-rti', 'ku-md-message': 'md_message' };
const DIRECTORY_MODULES = { 'ku-board': 'board_member', 'ku-list-md': 'past_md' };

// Directory row <-> editor item
const fromDirectoryRow = (row) => ({
  id: row.id,
  title: row.name,
  designation: row.designation || '',
  since: row.tenureFrom || '',
  from: row.tenureFrom || '',
  to: row.tenureTo || '',
  status: row.status || 'Active',
});
const toDirectoryRow = (module, item) =>
  module === 'ku-list-md'
    ? { name: item.title, tenureFrom: item.from, tenureTo: item.to }
    : { name: item.title, designation: item.designation, tenureFrom: item.since || 'Current', status: item.status || 'Active' };

// Section row <-> editor item. One videoUrl column holds either an uploaded file or a YouTube link.
const fromSection = (row) => {
  const isUploadedVideo = isUploadedFile(row.videoUrl);
  return {
    id: row.id,
    title: row.title,
    desc: row.description || '',
    category: row.category || '',
    document: row.imageUrl || row.documentUrl || '',
    videoUrl: isUploadedVideo ? '' : row.videoUrl || '',
    uploadedVideo: isUploadedVideo ? row.videoUrl : '',
    date: row.publishDate ? row.publishDate.slice(0, 10) : '',
  };
};
const toSection = (module, item) => ({
  module,
  title: item.title,
  description: item.desc || '',
  category: item.category || '',
  // Gallery modules store an image; the others store a PDF
  ...(module.startsWith('gl-') ? { imageUrl: item.document || '' } : { documentUrl: item.document || '' }),
  videoUrl: item.uploadedVideo || item.videoUrl || '',
  publishDate: item.date || undefined,
});

const parseToIsoDate = (dateStr) => {
  if (!dateStr) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateStr)) {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const d = parts[0].padStart(2, '0');
      const m = parts[1].padStart(2, '0');
      const y = parts[2];
      return `${y}-${m}-${d}`;
    }
  }
  return '';
};

const formatIsoToDdMmYyyy = (isoStr) => {
  if (!isoStr) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(isoStr)) {
    const [y, m, d] = isoStr.split('-');
    return `${d}/${m}/${y}`;
  }
  return isoStr;
};

export default function WebsiteEditorPage({ module, addToast }) {
  const { logActivity } = useActivityLog();
  const [content, setContent] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ title: '', desc: '', type: '', category: '', document: '' });
  const [mdSearchQuery, setMdSearchQuery] = useState('');
  const [rtiData, setRtiData] = useState({ officer: '', phone: '', email: '', address: '' });
  const [mdData, setMdData] = useState({
    name: '',
    designation: 'Managing Director',
    photo: '/images/KeyParticipants/shri_yatendra_pal.webp',
    quote: '',
    welcomeNote: '',
    qualityNote: '',
    collaboration: '',
    movingForward: ''
  });

  const getModuleName = (id) => {
    if (id.startsWith('book-class-')) return `Manage Books - Class ${id.split('-').pop()}`;
    if (id.startsWith('ku-')) {
      const sub = id.split('-').slice(1).join(' ');
      return `Manage ${sub.charAt(0).toUpperCase() + sub.slice(1)}`;
    }
    if (id.startsWith('gl-')) return `Gallery - ${id.split('-').pop().charAt(0).toUpperCase() + id.split('-').pop().slice(1)}`;
    if (id.startsWith('dc-')) return `Documents - ${id.split('-').pop().toUpperCase()}`;
    const mapping = {
      opmp: 'One Platform Many Possibilities',
      ku: 'Know Us',
      gl: 'Media Gallery',
      dc: 'Documents Repository',
      csr: 'CSR Policy',
      tr: 'Tools & Resources'
    };
    return mapping[id] || 'Content Editor';
  };

  // Load this module's content from the backend
  const loadContent = useCallback(() => {
    let request;
    if (SETTING_MODULES[module]) {
      request = getSetting(SETTING_MODULES[module]).then((value) => {
        if (value && module === 'dc-rti') setRtiData(value);
        if (value && module === 'ku-md-message') setMdData((prev) => ({ ...prev, ...value }));
      });
    } else if (DIRECTORY_MODULES[module]) {
      request = getDirectory(DIRECTORY_MODULES[module]).then((rows) => setContent(rows.map(fromDirectoryRow)));
    } else {
      request = getSections(module, { includeDrafts: true }).then((rows) => setContent(rows.map(fromSection)));
    }
    request.catch((error) => addToast?.(errorMessage(error, 'Could not load content'), 'error'));
  }, [module, addToast]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  // Save button for the single-document modules (RTI, MD message)
  const handleSave = async () => {
    const value = module === 'dc-rti' ? rtiData : mdData;
    try {
      await saveSetting(SETTING_MODULES[module], value, module === 'dc-rti' ? 'Documents' : 'KnowUs');
      addToast?.('Details Updated', 'success');
      logActivity(`Updated ${getModuleName(module)}`, 'Admin', 'edit');
    } catch (error) {
      addToast?.(errorMessage(error, 'Could not save'), 'error');
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({ title: '', desc: '', type: 'PDF', category: 'Stakeholder', document: '' });
    setIsModalOpen(true);
  };

  // Uploads in progress (shown as "Uploading… 42%"); saving waits until they finish
  const { upload, progressOf, isUploading } = useFileUpload();

  // Uploads the chosen file to the backend and keeps its path in the form
  const handleFileUpload = async (e, field = 'document') => {
    const file = e.target.files[0];
    if (!file) return;
    const kind = field === 'uploadedVideo' ? 'video' : module.startsWith('gl-') ? 'image' : 'document';
    try {
      const path = await upload(field, file, kind, moduleUploadFolder(module));
      setFormData(prev => ({ ...prev, [field]: path }));
      addToast?.('File uploaded', 'success');
    } catch (error) {
      addToast?.(errorMessage(error, 'Upload failed'), 'error');
    }
  };

  const handleMdPhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const path = await upload('mdPhoto', file, 'image', UPLOAD_FOLDERS.mdMessage);
      setMdData(prev => ({ ...prev, photo: path }));
      addToast?.('Photo uploaded — click Save to publish', 'success');
    } catch (error) {
      addToast?.(errorMessage(error, 'Upload failed'), 'error');
    }
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      desc: item.desc || '',
      type: item.type || 'PDF',
      category: item.category || 'Stakeholder',
      document: item.document || '',
      videoUrl: item.videoUrl || '',
      uploadedVideo: item.uploadedVideo || '',
      date: item.date || '',
      designation: item.designation || '',
      since: item.since || '',
      status: item.status || 'Active',
      from: item.from || '',
      to: item.to || '',
    });
    setIsModalOpen(true);
  };

  const saveItem = async () => {
    // Items without an image are saved without one: the public gallery shows YouTube's own
    // thumbnail for videos and never substitutes stock pictures.
    const item = { ...formData };

    try {
      const directoryType = DIRECTORY_MODULES[module];
      if (editingItem) {
        if (directoryType) await updateDirectoryRow(directoryType, editingItem.id, toDirectoryRow(module, item));
        else await updateSection(editingItem.id, toSection(module, item));
        addToast?.('Item Updated', 'success');
        logActivity(`Updated ${item.title || 'Item'} in ${getModuleName(module)}`, 'Admin', 'edit');
      } else {
        if (directoryType) await createDirectoryRow(directoryType, { ...toDirectoryRow(module, item), sortOrder: content.length });
        else await createSection({ ...toSection(module, item), sortOrder: content.length });
        addToast?.('Item Added', 'success');
        logActivity(`Added ${item.title || 'Item'} to ${getModuleName(module)}`, 'Admin', 'create');
      }
      setIsModalOpen(false);
      loadContent();
    } catch (error) {
      addToast?.(errorMessage(error, 'Could not save item'), 'error');
    }
  };

  const removeItem = async (id) => {
    const itemToDelete = content.find(i => i.id === id);
    if (!window.confirm(`Remove "${itemToDelete?.title || 'this item'}"?`)) return;
    try {
      if (DIRECTORY_MODULES[module]) await deleteDirectoryRow(DIRECTORY_MODULES[module], id);
      else await deleteSection(id);
      addToast?.('Item Removed', 'error');
      logActivity(`Removed ${itemToDelete?.title || 'Item'} from ${getModuleName(module)}`, 'Admin', 'delete');
      loadContent();
    } catch (error) {
      addToast?.(errorMessage(error, 'Could not remove item'), 'error');
    }
  };

  const filteredMdList = content.filter(item => {
    const name = (item.title || item.name || '').toLowerCase();
    const from = (item.from || item.designation || '').toLowerCase();
    const to = (item.to || item.department || item.employeeId || '').toLowerCase();
    const q = mdSearchQuery.toLowerCase();
    return name.includes(q) || from.includes(q) || to.includes(q);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >


      {module === 'dc-rti' ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6 w-full">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800">Nodal Officer Details (RTI)</h3>
                <p className="text-xs text-slate-500 font-medium">Manage Public Information Officer details for RTI section</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <FormInput 
              label="Public Information Officer Name" 
              value={rtiData.officer}
              onChange={(val) => setRtiData(prev => ({ ...prev, officer: val }))}
            />
            <FormInput 
              label="Contact Number" 
              value={rtiData.phone}
              onChange={(val) => setRtiData(prev => ({ ...prev, phone: val }))}
            />
            <FormInput 
              label="Email Address" 
              value={rtiData.email}
              onChange={(val) => setRtiData(prev => ({ ...prev, email: val }))}
            />
            <FormInput 
              label="Office Address" 
              type="textarea"
              value={rtiData.address}
              onChange={(val) => setRtiData(prev => ({ ...prev, address: val }))}
            />
            <div className="pt-2">
              <button 
                onClick={handleSave}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-[0.99]"
              >
                <Save className="w-5 h-5" />
                <span>Save Nodal Officer Details</span>
              </button>
            </div>
          </div>
        </div>
      ) : module === 'ku-md-message' ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6 w-full">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                <UserIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800">MD Profile & Message Settings</h3>
                <p className="text-xs text-slate-500 font-medium">Update the Managing Director's details shown on the website</p>
              </div>
            </div>
          </div>

          {/* Side by Side 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* Left Box: Personal Info */}
            <div className="bg-slate-50/60 rounded-2xl p-5 border border-slate-100 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-blue-600" />
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Personal Information</h4>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    MD Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <UserIcon className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={mdData.name}
                      onChange={(e) => setMdData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Shri Yatendra Kumar Pal"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Photo Upload Box */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Managing Director Photo
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
                    <div className="relative w-24 shrink-0 aspect-[4/5] rounded-xl overflow-hidden border-2 border-blue-100 bg-slate-100 shadow-sm group">
                      <img 
                        loading="lazy" 
                        decoding="async" 
                        src={fileUrl(mdData.photo) || '/images/KeyParticipants/shri_yatendra_pal.webp'} 
                        alt="MD Preview" 
                        className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                        onError={(e) => {
                          e.target.src = '/images/KeyParticipants/shri_yatendra_pal.webp';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <Camera className="w-5 h-5 text-white" />
                      </div>
                      {progressOf('mdPhoto') !== undefined && (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-1.5 bg-white/90">
                          <span className="w-6 h-6 border-[3px] border-blue-600 border-t-transparent rounded-full animate-spin" />
                          <span className="text-[10px] font-bold text-blue-700">{progressOf('mdPhoto') >= 100 ? '…' : `${progressOf('mdPhoto')}%`}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-2 text-center sm:text-left w-full">
                      <p className="text-xs font-semibold text-slate-700">Upload high quality portrait (4:5 ratio)</p>
                      <p className="text-[11px] text-slate-400">Supported formats: JPG, PNG, WEBP. Max size: 2MB</p>
                      
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                        <label className={`inline-flex items-center gap-2 px-3.5 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs shadow-sm transition-all ${isUploading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:bg-blue-700'}`}>
                          <Upload className="w-3.5 h-3.5" />
                          <span>{progressOf('mdPhoto') !== undefined ? 'Uploading…' : 'Upload Photo'}</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleMdPhotoUpload} 
                            disabled={isUploading}
                          />
                        </label>

                        {mdData.photo !== '/images/KeyParticipants/shri_yatendra_pal.webp' && (
                          <button
                            type="button"
                            onClick={() => {
                              setMdData(prev => ({ ...prev, photo: '/images/KeyParticipants/shri_yatendra_pal.webp' }));
                              addToast?.('Reset to default photo', 'info');
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-all"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Reset Default</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Box: Message Content */}
            <div className="bg-slate-50/60 rounded-2xl p-5 border border-slate-100 space-y-4 flex flex-col justify-between">
              <div className="flex-1 flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Quote className="w-4 h-4 text-blue-600" />
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Welcome Message Content</h4>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {mdData.welcomeNote ? mdData.welcomeNote.length : 0} characters
                  </span>
                </div>

                <div className="relative flex-1 flex flex-col">
                  <textarea
                    value={mdData.welcomeNote}
                    onChange={(e) => setMdData(prev => ({ ...prev, welcomeNote: e.target.value }))}
                    placeholder="Enter Managing Director's welcome note..."
                    className="w-full h-full min-h-[220px] p-4 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all leading-relaxed shadow-sm resize-y"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button 
              onClick={handleSave}
              disabled={isUploading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2.5 transition-all transform active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              <span className="text-base">{isUploading ? 'Uploading photo…' : 'Save MD Message Details'}</span>
            </button>
          </div>
        </div>
      ) : (module === 'ku-list-md' || module === 'ku-board' || module === 'ku-employees') ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6 w-full">
          {/* Top Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                <UserIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  {module === 'ku-list-md' ? 'List of Managing Directors' : module === 'ku-board' ? 'Board of Directors' : 'Our Employees'}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {module === 'ku-list-md' ? 'Manage official historical directory of MDs & appointment dates' : 'Manage and organize staff directory profiles'}
                </p>
              </div>
            </div>

            <button 
              onClick={openAddModal}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Profile</span>
            </button>
          </div>

          {/* Search & Statistics Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Filter by name, date or department..."
                value={mdSearchQuery}
                onChange={(e) => setMdSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end text-xs font-semibold text-slate-600">
              <span className="bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm">
                Total Records: <span className="text-blue-600 font-bold">{content.length}</span>
              </span>
            </div>
          </div>

          {/* MD Directory Table */}
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/70 text-slate-600 text-[11px] font-semibold uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3.5 px-4 text-center w-12">S.No.</th>
                    <th className="py-3.5 px-5">{module === 'ku-list-md' ? 'Managing Director' : module === 'ku-board' ? 'Board Member' : 'Employee'}</th>
                    <th className="py-3.5 px-5 text-center">{module === 'ku-list-md' ? 'From' : 'Designation'}</th>
                    {/* Board of Directors shows only name and designation */}
                    {module !== 'ku-board' && (
                      <th className="py-3.5 px-5 text-center">{module === 'ku-list-md' ? 'To' : 'Department & ID'}</th>
                    )}
                    <th className="py-3.5 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredMdList.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors group">
                      <td className="py-4 px-4 text-center font-semibold text-slate-500 text-[13px]">
                        {(idx + 1).toString().padStart(2, '0')}
                      </td>
                      <td className="py-4 px-5">
                        <div>
                          <p className="font-bold text-slate-800 text-base">{item.title || item.name}</p>
                          <p className="text-xs text-slate-400 font-medium">
                             {module === 'ku-list-md' ? 'Managing Director, BSTBPC' : module === 'ku-board' ? 'Board Member, BSTBPC' : 'Employee, BSTBPC'}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-center">
                        {module === 'ku-list-md' ? (
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50/60 text-blue-700 rounded-xl font-bold border border-blue-100/80 text-[13px] justify-center w-full max-w-[130px]">
                            <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
                            <span>{item.from || 'N/A'}</span>
                          </div>
                        ) : (
                          <span className="font-bold text-slate-700 text-[15px]">{item.designation || 'N/A'}</span>
                        )}
                      </td>
                      {module !== 'ku-board' && (
                      <td className="py-4 px-5 text-center">
                        {module === 'ku-list-md' ? (
                          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold border text-[13px] justify-center w-full max-w-[130px] ${
                            item.to?.toLowerCase() === 'present' || !item.to
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                              : 'bg-slate-50 text-slate-700 border-slate-200'
                          }`}>
                            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                            <span>{item.to || 'Present'}</span>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-1.5 text-left">
                             <span className="text-xs text-slate-600 font-medium">Dept: <span className="font-bold">{item.department || 'N/A'}</span></span>
                             <span className="text-[11px] uppercase font-bold tracking-wider w-fit px-2 py-0.5 rounded-md border bg-blue-50 text-blue-600 border-blue-200">ID: {item.employeeId || 'N/A'}</span>
                          </div>
                        )}
                      </td>
                      )}
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => openEditModal(item)}
                            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                            title="Edit Profile"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                            title="Delete Profile"
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

            {filteredMdList.length === 0 && (
              <div className="py-12 text-center text-slate-400 font-medium">
                No records match "{mdSearchQuery}"
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-base font-bold text-gray-800">Section Content</h3>
            <button 
              onClick={openAddModal}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg font-bold text-[11px] uppercase tracking-wider hover:bg-blue-100 transition-all"
            >
              <Plus className="w-3 h-3" />
              Add
            </button>
          </div>

          <div className={module.startsWith('gl-') ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6" : "grid grid-cols-1 md:grid-cols-2 gap-6"}>
            {content.map((item) => (
              <div key={item.id} className={module.startsWith('gl-') 
                ? "relative aspect-square rounded-3xl overflow-hidden border-2 border-gray-100 group hover:border-blue-400 transition-all shadow-sm"
                : "p-4 rounded-2xl border border-gray-100 bg-gray-50/30 flex items-start justify-between group"
              }>
                {module.startsWith('gl-') ? (
                  <>
                    {item.document ? (
                      <img loading="lazy" decoding="async" 
                        src={fileUrl(item.document)} 
                        alt="Gallery" 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                        onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400">
                        <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                        <span className="text-[10px] uppercase font-bold tracking-wider">No Image</span>
                      </div>
                    )}
                    {module === 'gl-video' && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                      <button onClick={() => openEditModal(item)} className="p-3 bg-white rounded-full text-gray-700 hover:text-blue-600 transition-all transform translate-y-4 group-hover:translate-y-0 shadow-lg">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button onClick={() => removeItem(item.id)} className="p-3 bg-white rounded-full text-gray-700 hover:text-red-600 transition-all transform translate-y-4 group-hover:translate-y-0 shadow-lg">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    {item.title && (
                      <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                        <p className="text-[10px] font-bold text-white uppercase tracking-wider truncate">{item.title}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex gap-4">
                      <div className={`${module === 'gl-photo' ? 'w-24 h-24' : 'w-12 h-12'} rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-blue-600 transition-all overflow-hidden`}>
                        {item.document && (module.startsWith('gl-') || module.startsWith('book-')) ? (
                          <img loading="lazy" decoding="async" src={fileUrl(item.document)} alt="Thumb" className="w-full h-full object-cover" />
                        ) : (
                          module === 'gl' ? <ImageIcon size={20} /> : module === 'dc' ? <FileText size={20} /> : <UserIcon size={20} />
                        )}
                      </div>
                      {module !== 'gl-photo' && (
                        <div>
                          <h4 className="text-sm font-bold text-gray-700">{item.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                              {item.category || (module === 'ku-board' ? 'Director' : 'General')}
                            </span>
                            {module.startsWith('gl-') ? (
                              <span className="text-[10px] text-gray-400 font-semibold uppercase">
                                {module === 'gl-photo' ? 'Image' : 'Video'}
                              </span>
                            ) : module === 'ku-employees' ? (
                              <span className="text-[10px] text-gray-400 font-semibold uppercase">
                                {item.designation || item.department || ''}
                              </span>
                            ) : (
                              <span className="text-[10px] text-gray-400 font-semibold uppercase">
                                {item.since ? `Since ${item.since}` : ''}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => openEditModal(item)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
            
            {content.length === 0 && (
              <div className="col-span-2 py-12 text-center text-gray-400 font-medium border-2 border-dashed border-gray-100 rounded-3xl">
                No items in this section yet.
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Settings Panel Removed */}
      <div className="h-10" /> 


      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingItem ? "Edit Profile" : "Add Profile"} 
      >
        <div className="space-y-4">
          <FormInput 
            label={module === 'gl-photo' ? "Photo Description" : module === 'ku-board' || module === 'ku-list-md' || module === 'ku-employees' ? "Full Name" : "Title / Name"} 
            placeholder={module === 'gl-photo' ? "Enter description for this photo" : "Enter name"} 
            value={formData.title}
            onChange={(val) => setFormData(prev => ({ ...prev, title: val }))}
          />
          {module === 'ku-employees' && (
            <>
              <FormInput 
                label="Designation" 
                placeholder="e.g. Accountant" 
                value={formData.designation}
                onChange={(val) => setFormData(prev => ({ ...prev, designation: val }))}
              />
              <FormInput 
                label="Department" 
                placeholder="e.g. Finance, Sales" 
                value={formData.department}
                onChange={(val) => setFormData(prev => ({ ...prev, department: val }))}
              />
              <FormInput 
                label="Employee ID" 
                placeholder="e.g. EMP001" 
                value={formData.employeeId}
                onChange={(val) => setFormData(prev => ({ ...prev, employeeId: val }))}
              />
            </>
          )}

          {module === 'ku-list-md' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>From</span>
                  <span className="text-[10px] text-blue-600 font-bold flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Calendar Picker
                  </span>
                </label>
                <div className="relative flex items-center">
                  <input 
                    type="date"
                    value={parseToIsoDate(formData.from)}
                    onChange={(e) => {
                      const raw = e.target.value;
                      setFormData(prev => ({ ...prev, from: formatIsoToDdMmYyyy(raw) }));
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>To</span>
                  <span className="text-[10px] text-blue-600 font-bold flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Calendar Picker
                  </span>
                </label>
                <div className="relative flex items-center">
                  <input 
                    type="date"
                    value={parseToIsoDate(formData.to)}
                    onChange={(e) => {
                      const raw = e.target.value;
                      setFormData(prev => ({ ...prev, to: formatIsoToDdMmYyyy(raw) }));
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}
          {module === 'ku-board' && (
            <>
              <FormInput 
                label="Designation" 
                placeholder="e.g. Managing Director" 
                value={formData.designation}
                onChange={(val) => setFormData(prev => ({ ...prev, designation: val }))}
              />
            </>
          )}
          {(module.startsWith('gl-') || module === 'ku-board' || module === 'ku-list-md' || module === 'ku-employees') ? (
            <>
              { (module === 'ku-board' || module === 'ku-list-md' || module === 'ku-employees') ? null : (
                <>
                  {(module === 'gl-video' || module === 'gl-press') ? (
                    <>
                      <FormInput 
                        label="Category / Tag" 
                        placeholder="e.g. Event, News, Meeting" 
                        value={formData.category}
                        onChange={(val) => setFormData(prev => ({ ...prev, category: val }))}
                      />
                      {module === 'gl-press' && (
                        <>
                          <FormInput 
                            label="Date" 
                            type="date"
                            placeholder="Select Date"
                            value={formData.date}
                            onChange={(val) => setFormData(prev => ({ ...prev, date: val }))}
                          />
                          <FormInput 
                            label="Description / Excerpt" 
                            type="textarea" 
                            placeholder="Enter a brief description for this press release" 
                            value={formData.desc}
                            onChange={(val) => setFormData(prev => ({ ...prev, desc: val }))}
                          />
                        </>
                      )}
                    </>
                  ) : null}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {module === 'gl-photo' ? "Select Photo (Max 2MB)" : module === 'gl-video' ? "Upload Thumbnail (Max 2MB)" : module === 'gl-press' ? "Upload Cover Image (Max 2MB)" : "Upload PDF Document (Max 20MB)"}
                    </label>
                    <div className="flex items-center gap-4">
                      <label className={`flex-1 ${isUploading ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                        <input 
                          type="file" 
                          accept={module.startsWith('gl-') ? "image/*" : ".pdf"} 
                          className="hidden" 
                          onChange={handleFileUpload} 
                          disabled={isUploading}
                        />
                        <div className="relative overflow-hidden px-6 py-8 rounded-2xl border-2 border-dashed border-gray-200 text-center hover:border-blue-400 hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-2">
                          {progressOf('document') !== undefined && <UploadProgress variant="overlay" percent={progressOf('document')} />}
                          {module.startsWith('gl-') ? <ImageIcon className="w-8 h-8 text-gray-300" /> : <FileText className="w-8 h-8 text-gray-300" />}
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                            {formData.document 
                              ? (module.startsWith('gl-') ? "Change Selected Photo" : "Change Selected PDF") 
                              : (module.startsWith('gl-') ? "Click to Choose Photo (Max 2MB)" : "Click to Choose PDF (Max 20MB)")}
                          </span>
                        </div>
                      </label>
                      {formData.document && module.startsWith('gl-') && (
                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-blue-100 shadow-sm group">
                          <img loading="lazy" decoding="async" src={fileUrl(formData.document)} alt="Preview" className="w-full h-full object-cover" />
                          <button 
                            onClick={(e) => { e.preventDefault(); setFormData(prev => ({ ...prev, document: '' })); }}
                            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-white hover:text-red-400"
                          >
                            <Trash2 className="w-6 h-6" />
                          </button>
                        </div>
                      )}
                      {formData.document && !module.startsWith('gl-') && (
                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-blue-100 shadow-sm flex items-center justify-center bg-blue-50 text-blue-600 group">
                          <FileText className="w-10 h-10" />
                          <button 
                            onClick={(e) => { e.preventDefault(); setFormData(prev => ({ ...prev, document: '' })); }}
                            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-white hover:text-red-400"
                          >
                            <Trash2 className="w-6 h-6" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  {module === 'gl-video' && (
                    <>
                      <FormInput 
                        label="Video Link (YouTube)" 
                        placeholder="https://youtube.com/watch?v=..." 
                        value={formData.videoUrl}
                        onChange={(val) => setFormData(prev => ({ ...prev, videoUrl: val }))}
                      />
                      <div className="mb-4 mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Or Upload Video (MP4 - Max 50MB)</label>
                        <div className="flex items-center gap-4">
                          <label className={`flex-1 ${isUploading ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                            <input 
                              type="file" 
                              accept="video/*"
                              className="hidden" 
                              onChange={(e) => handleFileUpload(e, 'uploadedVideo')} 
                              disabled={isUploading}
                            />
                            <div className={`relative overflow-hidden ${progressOf('uploadedVideo') !== undefined ? 'min-h-[110px]' : ''} px-6 py-4 rounded-xl border-2 border-dashed border-gray-200 text-center hover:border-blue-400 hover:bg-blue-50 transition-all`}>
                              {progressOf('uploadedVideo') !== undefined && <UploadProgress variant="overlay" percent={progressOf('uploadedVideo')} label="Uploading video" />}
                              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                {formData.uploadedVideo ? "Video Uploaded - Click to Change" : "Click to Upload Video (Max 50MB)"}
                              </span>
                            </div>
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <FormInput 
              label="Description" 
              type="textarea" 
              placeholder="Enter description" 
              value={formData.desc}
              onChange={(val) => setFormData(prev => ({ ...prev, desc: val }))}
            />
          )}
          
          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <motion.button
              onClick={saveItem}
              disabled={isUploading}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isUploading ? 'Uploading…' : 'Save Item'}
            </motion.button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}

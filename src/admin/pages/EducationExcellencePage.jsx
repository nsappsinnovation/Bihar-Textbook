import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Save, X, LayoutGrid } from 'lucide-react';
import Modal, { FormInput } from '../components/Modal';
import { useActivityLog } from '../hooks/useCustomHooks';
import { getSections, createSection, updateSection, deleteSection } from '../../services/sectionService';
import { uploadFile, moduleUploadFolder } from '../../services/uploadService';
import { fileUrl, errorMessage } from '../../services/api';

// module: section list to edit — "tr" (Tools & Resources) or "cl" (Latest Initiatives)
export default function EducationExcellencePage({ addToast, title = "Tools & Resources", module = "tr" }) {
  const { logActivity } = useActivityLog();
  const [missions, setMissions] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ title: '', desc: '', link: '', image: '', content: '' });

  const loadMissions = useCallback(() => {
    getSections(module, { includeDrafts: true })
      .then((rows) => setMissions(rows.map((row) => ({
        id: row.id,
        title: row.title,
        desc: row.description || '',
        link: row.link || '',
        image: row.imageUrl || '',
        content: row.content || '',
      }))))
      .catch(() => addToast?.('Could not load items', 'error'));
  }, [module, addToast]);

  useEffect(() => {
    loadMissions();
  }, [loadMissions]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const path = await uploadFile(file, 'image', moduleUploadFolder(module));
      setFormData(prev => ({ ...prev, image: path }));
    } catch (error) {
      addToast?.(errorMessage(error, 'Image upload failed'), 'error');
    }
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ title: '', desc: '', link: '', image: '', content: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({ title: item.title, desc: item.desc, link: item.link || '', image: item.image, content: item.content || '' });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.desc || !formData.image) {
      addToast?.('Please fill required fields', 'error');
      return;
    }

    const section = {
      module,
      title: formData.title,
      description: formData.desc,
      link: formData.link,
      imageUrl: formData.image,
      content: formData.content,
    };
    try {
      if (editingItem) {
        await updateSection(editingItem.id, section);
        addToast?.('Item Updated', 'success');
        logActivity(`Updated ${title}: ${formData.title}`, 'Admin', 'edit');
      } else {
        await createSection({ ...section, sortOrder: missions.length });
        addToast?.('Item Added', 'success');
        logActivity(`Added new ${title}: ${formData.title}`, 'Admin', 'create');
      }
      setIsModalOpen(false);
      loadMissions();
    } catch (error) {
      addToast?.(errorMessage(error, 'Could not save item'), 'error');
    }
  };

  const handleDelete = async (id) => {
    const itemToDelete = missions.find(m => m.id === id);
    if (!window.confirm(`Delete "${itemToDelete?.title}"?`)) return;
    try {
      await deleteSection(id);
      addToast?.('Item Deleted', 'info');
      logActivity(`Deleted ${title}: ${itemToDelete?.title}`, 'Admin', 'delete');
      loadMissions();
    } catch (error) {
      addToast?.(errorMessage(error, 'Could not delete item'), 'error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">{title}</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Manage entries and detailed content for this section</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-6 py-3.5 bg-gray-900 text-white rounded-2xl font-bold text-sm shadow-xl shadow-gray-900/10 hover:bg-black transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>

      {/* Grid Container */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
          <AnimatePresence>
            {missions.map((mission) => (
              <motion.div
                key={mission.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center group relative text-center"
              >
                <div className="absolute -top-4 right-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-all z-20">
                  <button 
                    onClick={() => handleOpenEdit(mission)}
                    className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 shadow-sm transition-all"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(mission.id)}
                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 shadow-sm transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="w-28 h-28 mb-6 flex items-center justify-center relative transition-transform duration-300 group-hover:scale-105 overflow-hidden rounded-2xl bg-gray-50 border border-gray-100">
                  <img loading="lazy" decoding="async" 
                    src={fileUrl(mission.image)} 
                    alt={mission.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight">
                    {mission.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-bold leading-relaxed max-w-[160px]">
                    {mission.desc}
                  </p>
                  {mission.content && (
                    <p className="text-[10px] text-gray-300 italic line-clamp-1 mt-1 font-medium">
                      {mission.content}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {missions.length === 0 && (
            <div className="col-span-full py-24 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-dashed border-gray-200">
                <LayoutGrid className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No Entries Found</h3>
              <p className="text-gray-400 text-sm mt-1">Start by adding a new entry to this section.</p>
            </div>
          )}
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingItem ? "Edit Entry" : "Create New Entry"} 
      >
        <div className="space-y-5">
          <FormInput 
            label="Title" 
            placeholder="e.g. VIRTUAL REALITY LAB" 
            value={formData.title}
            onChange={(val) => setFormData(prev => ({ ...prev, title: val }))}
          />
          <FormInput 
            label="Short Tagline / Description" 
            placeholder="e.g. Immersive Learning Experiences" 
            value={formData.desc}
            onChange={(val) => setFormData(prev => ({ ...prev, desc: val }))}
          />
          <FormInput 
            label="Navigation Link" 
            placeholder="e.g. /vr or /audio-books" 
            value={formData.link}
            onChange={(val) => setFormData(prev => ({ ...prev, link: val }))}
          />
          
          <div>
            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Detailed Content</label>
            <textarea
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none text-sm font-medium text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 transition-all min-h-[120px]"
              placeholder="Provide 'proper detail' about this initiative here..."
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">Upload Image</label>
            <div className="flex flex-col items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-3xl cursor-pointer bg-gray-50/50 hover:bg-gray-50 transition-all overflow-hidden">
                {formData.image ? (
                  <img loading="lazy" decoding="async" src={fileUrl(formData.image)} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Plus className="w-8 h-8 text-gray-300 mb-2" />
                    <p className="text-xs font-bold text-gray-400 uppercase">Select File</p>
                  </div>
                )}
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-3 rounded-2xl text-sm font-bold text-gray-500 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 rounded-2xl bg-blue-600 text-white text-sm font-black shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all"
            >
              Save Entry
            </button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}


import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, User, Image as ImageIcon } from 'lucide-react';
import Modal, { FormInput } from '../components/Modal';
import { useActivityLog } from '../hooks/useCustomHooks';
import { getDirectory, createDirectoryRow, updateDirectoryRow, deleteDirectoryRow } from '../../services/directoryService';
import { uploadFile, UPLOAD_FOLDERS } from '../../services/uploadService';
import { fileUrl, errorMessage } from '../../services/api';

const TYPE = 'leader';

/**
 * Leaders Management Page
 */
export default function LeadersManagementPage({ addToast }) {
  const { logActivity } = useActivityLog();
  const [leaders, setLeaders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ name: '', role: '', image: '' });

  const loadLeaders = useCallback(() => {
    getDirectory(TYPE)
      .then((rows) => setLeaders(rows.map((r) => ({ id: r.id, name: r.name, role: r.designation || '', image: r.photoUrl || '' }))))
      .catch(() => addToast?.('Could not load leaders', 'error'));
  }, [addToast]);

  useEffect(() => {
    loadLeaders();
  }, [loadLeaders]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const path = await uploadFile(file, 'image', UPLOAD_FOLDERS.leaders);
      setFormData(prev => ({ ...prev, image: path }));
    } catch (error) {
      addToast?.(errorMessage(error, 'Image upload failed'), 'error');
    }
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ name: '', role: '', image: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.role || !formData.image) {
      addToast?.('Please fill all required fields', 'error');
      return;
    }

    const row = { name: formData.name, designation: formData.role, photoUrl: formData.image };
    try {
      if (editingItem) {
        await updateDirectoryRow(TYPE, editingItem.id, row);
        addToast?.('Leader Updated', 'success');
        logActivity(`Updated Leader: ${formData.name}`, 'Admin', 'edit');
      } else {
        await createDirectoryRow(TYPE, { ...row, sortOrder: leaders.length });
        addToast?.('Leader Added', 'success');
        logActivity(`Added new Leader: ${formData.name}`, 'Admin', 'create');
      }
      setIsModalOpen(false);
      loadLeaders();
    } catch (error) {
      addToast?.(errorMessage(error, 'Could not save leader'), 'error');
    }
  };

  const handleDelete = async (id) => {
    const itemToDelete = leaders.find(l => l.id === id);
    if (!window.confirm(`Remove ${itemToDelete?.name}?`)) return;
    try {
      await deleteDirectoryRow(TYPE, id);
      addToast?.('Leader Removed', 'info');
      logActivity(`Removed Leader: ${itemToDelete?.name}`, 'Admin', 'delete');
      loadLeaders();
    } catch (error) {
      addToast?.(errorMessage(error, 'Could not remove leader'), 'error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Leaders</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Manage Leader profiles</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Leader</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <AnimatePresence>
          {leaders.map((leader) => (
            <motion.div
              key={leader.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50"
            >
              {/* Photo Area */}
              <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
                {leader.image ? (
                  <img loading="lazy" decoding="async" 
                    src={fileUrl(leader.image)} 
                    alt={leader.name} 
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : null}
                <div className={`${leader.image ? 'hidden' : 'flex'} w-full h-full items-center justify-center bg-gray-100`}>
                  <div className="flex flex-col items-center text-gray-300">
                    <User className="w-16 h-16 mb-2" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">No Photo</span>
                  </div>
                </div>
                
                {/* Admin Actions Overlay */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button 
                    onClick={() => handleOpenEdit(leader)}
                    className="p-3 bg-white text-blue-600 rounded-2xl hover:scale-110 shadow-xl transition-all"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(leader.id)}
                    className="p-3 bg-white text-red-600 rounded-2xl hover:scale-110 shadow-xl transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Info Area */}
              <div className="p-6 flex flex-col flex-1 bg-white">
                <h3 className="text-lg font-extrabold text-gray-900 leading-tight mb-1">
                  {leader.name}
                </h3>
                
                <p className="text-[12px] text-gray-400 font-bold leading-relaxed">
                  {leader.role}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {leaders.length === 0 && (
          <div className="col-span-full py-24 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center">
            <User className="w-12 h-12 text-gray-200 mb-4" />
            <h3 className="text-lg font-bold text-gray-900">No Profiles Added</h3>
            <p className="text-sm text-gray-400 mt-1">Add leaders to display them on the website.</p>
          </div>
        )}
      </div>

      {/* Management Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingItem ? "Edit Profile" : "Add New Profile"} 
      >
        <div className="space-y-5">
          <FormInput 
            label="Full Name" 
            placeholder="e.g. Anand Kumar" 
            value={formData.name}
            onChange={(val) => setFormData(prev => ({ ...prev, name: val }))}
          />
          
          <FormInput 
            label="Role / Designation" 
            placeholder="e.g. Managing Director, BSTBPC" 
            value={formData.role}
            onChange={(val) => setFormData(prev => ({ ...prev, role: val }))}
          />

          <div>
            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">Portrait Photo (Max 2MB)</label>
            <div className="flex flex-col items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-200 rounded-3xl cursor-pointer bg-gray-50/50 hover:bg-gray-50 transition-all overflow-hidden">
                {formData.image ? (
                  <img loading="lazy" decoding="async" src={fileUrl(formData.image)} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="w-8 h-8 text-gray-300 mb-2" />
                    <p className="text-xs font-bold text-gray-400 uppercase">Upload Photo</p>
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
              className="px-6 py-3 rounded-2xl bg-indigo-600 text-white text-sm font-black shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all"
            >
              {editingItem ? "Update Profile" : "Add Profile"}
            </button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}

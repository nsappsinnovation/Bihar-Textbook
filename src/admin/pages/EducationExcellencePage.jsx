import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Save, X, LayoutGrid } from 'lucide-react';
import Modal, { FormInput } from '../components/Modal';

export default function EducationExcellencePage({ addToast }) {
  const [missions, setMissions] = useState(() => {
    const saved = localStorage.getItem('website_missions');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'VIRTUAL REALITY LAB', desc: 'Immersive Learning Experiences', image: '/images/missions/headset.png' },
      { id: 2, title: 'AUDIO LIBRARY', desc: 'Accessible Digital Content', image: '/images/missions/audio-book.png' },
      { id: 3, title: 'SIGN LANGUAGE', desc: 'Inclusive Educational Tools', image: '/images/missions/friend.png' },
      { id: 4, title: 'DIVERSE LANGUAGE', desc: 'Universal Digital Access', image: '/images/missions/diverse.png' },
      { id: 5, title: 'AI INTELLIGENCE', desc: 'Smart Adaptive Tutoring', image: '/images/missions/ai.png' },
      { id: 6, title: 'TEACHER TRAINING', desc: 'Advanced Pedagogy Support', image: '/images/missions/teacher.png' },
      { id: 7, title: 'MOBILE LIBRARIES', desc: 'Rural Knowledge Outreach', image: '/images/missions/library.png' },
      { id: 8, title: 'HERITAGE ARCHIVE', desc: 'Cultural Document Preservation', image: '/images/missions/history.png' },
      { id: 9, title: 'CYBER SECURITY', desc: 'Online Safety & Scam Protection', image: '/images/missions/cyber-security.png' },
      { id: 10, title: 'BASIC LEARNING SKILLS', desc: 'Communication & Life Skills', image: '/images/missions/abilities.png' },
    ];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ title: '', desc: '', image: '' });

  const saveToStorage = (updated) => {
    setMissions(updated);
    localStorage.setItem('website_missions', JSON.stringify(updated));
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ title: '', desc: '', image: '/images/missions/headset.png' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({ title: item.title, desc: item.desc, image: item.image });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.desc) {
      addToast?.('Please fill all fields', 'error');
      return;
    }

    let updated;
    if (editingItem) {
      updated = missions.map(m => m.id === editingItem.id ? { ...m, ...formData } : m);
      addToast?.('Item Updated', 'success');
    } else {
      updated = [...missions, { id: Date.now(), ...formData }];
      addToast?.('Item Added', 'success');
    }
    saveToStorage(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    const updated = missions.filter(m => m.id !== id);
    saveToStorage(updated);
    addToast?.('Item Deleted', 'info');
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
          <h1 className="text-2xl font-bold text-gray-800">Education Excellence</h1>
          <p className="text-sm text-gray-500 mt-1">Manage tools and resources displayed on the homepage</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-sm hover:bg-emerald-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Tool</span>
        </button>
      </div>

      {/* Grid Container matching the reference image */}
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
                {/* Admin Actions (Visible on hover) */}
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

                {/* Icon Wrapper */}
                <div className="w-24 h-24 mb-6 flex items-center justify-center relative transition-transform duration-300 group-hover:scale-110">
                  <img 
                    src={mission.image} 
                    alt={mission.title} 
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Text Content */}
                <div className="space-y-2">
                  <h4 className="text-[#1e293b] text-sm font-extrabold uppercase tracking-tight">
                    {mission.title}
                  </h4>
                  <p className="text-[11px] text-[#64748b] font-medium leading-relaxed max-w-[160px]">
                    {mission.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {missions.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-400 font-medium border-2 border-dashed border-gray-100 rounded-3xl">
              No tools added yet. Click "Add New Tool" to get started.
            </div>
          )}
        </div>
      </div>

      {/* Modal for Adding/Editing */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingItem ? "Edit Tool" : "Add New Tool"} 
      >
        <div className="space-y-4">
          <FormInput 
            label="Title (Uppercase recommended)" 
            placeholder="e.g. VIRTUAL REALITY LAB" 
            value={formData.title}
            onChange={(val) => setFormData(prev => ({ ...prev, title: val }))}
          />
          <FormInput 
            label="Description" 
            placeholder="e.g. Immersive Learning Experiences" 
            value={formData.desc}
            onChange={(val) => setFormData(prev => ({ ...prev, desc: val }))}
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Icon Image</label>
            <div className="grid grid-cols-5 gap-2">
              {[
                'headset.png', 'audio-book.png', 'friend.png', 'diverse.png', 'ai.png',
                'teacher.png', 'library.png', 'history.png', 'cyber-security.png', 'abilities.png'
              ].map(img => (
                <button
                  key={img}
                  onClick={() => setFormData(prev => ({ ...prev, image: `/images/missions/${img}` }))}
                  className={`p-2 rounded-lg border-2 transition-all ${formData.image.includes(img) ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100 hover:border-gray-200'}`}
                >
                  <img src={`/images/missions/${img}`} alt="icon" className="w-8 h-8 object-contain mx-auto" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}


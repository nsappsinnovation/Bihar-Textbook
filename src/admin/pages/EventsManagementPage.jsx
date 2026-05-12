import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Calendar, MapPin, LayoutGrid, Image as ImageIcon, User, X } from 'lucide-react';
import Modal, { FormInput } from '../components/Modal';
import { useActivityLog } from '../hooks/useCustomHooks';

/**
 * Events Management Page
 * Rebuilt to match the user's premium card design
 */
export default function EventsManagementPage({ addToast }) {
  const { logActivity } = useActivityLog();
  
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('website_events');
    return saved ? JSON.parse(saved) : [
      { 
        id: 1, 
        title: 'Bihar Diwas 2026 Education Fair', 
        desc: "A celebration of Bihar's educational history with a showcase of local textbook heritage, interactive...", 
        date: '12 JAN, 2026', 
        location: 'Patna', 
        image: '/images/events/event1.jpg',
        tag: 'FESTIVAL'
      },
      { 
        id: 2, 
        title: 'Community Outreach for Rural Literacy', 
        desc: 'A massive textbook distribution camp and awareness drive for underprivileged students in...', 
        date: '15 JAN, 2026', 
        location: 'Gaya', 
        image: '/images/events/event2.jpg',
        tag: 'OUTREACH'
      },
      { 
        id: 3, 
        title: 'Teacher Training: New Curriculum 2026', 
        desc: 'A workshop focused on training teachers for the newly introduced textbooks and pedagogical shift...', 
        date: '20 JAN, 2026', 
        location: 'Muzaffarpur', 
        image: '/images/events/event3.jpg',
        tag: 'WORKSHOP'
      },
    ];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ 
    title: '', 
    desc: '', 
    date: '', 
    location: '', 
    image: '', 
    tag: 'EVENT' 
  });

  const saveToStorage = (updated) => {
    setEvents(updated);
    localStorage.setItem('website_events', JSON.stringify(updated));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        addToast?.('Image is too large (Max 1MB)', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ title: '', desc: '', date: '', location: '', image: '', tag: 'EVENT' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.date || !formData.location || !formData.image) {
      addToast?.('Please fill all required fields', 'error');
      return;
    }

    let updated;
    if (editingItem) {
      updated = events.map(e => e.id === editingItem.id ? { ...e, ...formData } : e);
      addToast?.('Event Updated', 'success');
      logActivity(`Updated event: ${formData.title}`, 'Admin', 'edit');
    } else {
      updated = [...events, { id: Date.now(), ...formData }];
      addToast?.('Event Created', 'success');
      logActivity(`Created new event: ${formData.title}`, 'Admin', 'create');
    }
    saveToStorage(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    const itemToDelete = events.find(e => e.id === id);
    const updated = events.filter(e => e.id !== id);
    saveToStorage(updated);
    addToast?.('Event Deleted', 'info');
    if (itemToDelete) {
      logActivity(`Deleted event: ${itemToDelete.title}`, 'Admin', 'delete');
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
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Events Management</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Create and manage upcoming events, fairs, and workshops</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-6 py-3.5 bg-gray-900 text-white rounded-2xl font-bold text-sm shadow-xl shadow-gray-900/10 hover:bg-black transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Event</span>
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-12">
        <AnimatePresence>
          {events.map((event) => (
            <motion.div
              key={event.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="group flex flex-col bg-white rounded-3xl overflow-hidden transition-all duration-300"
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden rounded-[2rem] bg-gray-50 mb-6">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-5 left-5">
                  <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black text-gray-900 uppercase tracking-[0.2em] border border-white/50 shadow-sm">
                    {event.tag}
                  </span>
                </div>
                
                {/* Admin Actions Overlay */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button 
                    onClick={() => handleOpenEdit(event)}
                    className="p-3 bg-white text-blue-600 rounded-2xl hover:scale-110 shadow-xl transition-all"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(event.id)}
                    className="p-3 bg-white text-red-600 rounded-2xl hover:scale-110 shadow-xl transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col flex-1 px-1">
                <div className="flex items-center gap-2 text-[#3b82f6] mb-3">
                  <Calendar className="w-4 h-4" />
                  <span className="text-[11px] font-extrabold uppercase tracking-widest">{event.date}</span>
                </div>
                
                <h3 className="text-xl font-extrabold text-[#1e293b] leading-tight mb-3 group-hover:text-blue-600 transition-colors">
                  {event.title}
                </h3>
                
                <p className="text-sm text-[#64748b] font-medium leading-relaxed mb-6 line-clamp-2">
                  {event.desc}
                </p>
                
                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#94a3b8]">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs font-bold">{event.location}</span>
                  </div>
                  
                  <button className="flex items-center gap-1.5 text-[11px] font-black text-[#2563eb] uppercase tracking-widest group-hover:gap-2.5 transition-all">
                    <span>DETAIL</span>
                    <User className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {events.length === 0 && (
          <div className="col-span-full py-24 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-10 h-10 text-gray-200" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No Events Posted</h3>
            <p className="text-sm text-gray-400 mt-1 max-w-[280px]">Your events and workshops will appear here once you create them.</p>
          </div>
        )}
      </div>

      {/* Modal for Adding/Editing */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingItem ? "Edit Event Details" : "Create New Event"} 
      >
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <FormInput 
              label="Event Title" 
              placeholder="e.g. Annual Book Fair" 
              value={formData.title}
              onChange={(val) => setFormData(prev => ({ ...prev, title: val }))}
            />
            <FormInput 
              label="Tag (e.g. WORKSHOP)" 
              placeholder="EVENT" 
              value={formData.tag}
              onChange={(val) => setFormData(prev => ({ ...prev, tag: val.toUpperCase() }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput 
              label="Date" 
              placeholder="e.g. 15 JAN, 2026" 
              value={formData.date}
              onChange={(val) => setFormData(prev => ({ ...prev, date: val }))}
            />
            <FormInput 
              label="Location" 
              placeholder="e.g. Patna / Virtual" 
              value={formData.location}
              onChange={(val) => setFormData(prev => ({ ...prev, location: val }))}
            />
          </div>

          <div>
            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Short Description</label>
            <textarea
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none text-sm font-medium text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 transition-all min-h-[100px]"
              placeholder="Brief summary of the event..."
              value={formData.desc}
              onChange={(e) => setFormData(prev => ({ ...prev, desc: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">Event Banner Image</label>
            <div className="flex flex-col items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-200 rounded-3xl cursor-pointer bg-gray-50/50 hover:bg-gray-50 transition-all overflow-hidden">
                {formData.image ? (
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="w-8 h-8 text-gray-300 mb-2" />
                    <p className="text-xs font-bold text-gray-400 uppercase">Select Banner</p>
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
              className="px-6 py-3 rounded-2xl bg-gray-900 text-white text-sm font-black shadow-xl shadow-gray-900/20 hover:bg-black transition-all"
            >
              {editingItem ? "Update Event" : "Post Event"}
            </button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}

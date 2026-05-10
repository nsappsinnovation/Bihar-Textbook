import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Printer, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  UserCircle2,
  Building,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Modal, { FormInput } from '../components/Modal';
import { useActivityLog } from '../hooks/useCustomHooks';

/**
 * Register Printers Management Page
 * Professional registry for printing partners
 */
export default function RegisterPrintersPage({ addToast }) {
  const { logActivity } = useActivityLog();
  const storageKey = 'website_registered_printers';

  const [printers, setPrinters] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Bihar State Corrugated Boxes Ltd.', category: 'Packaging & Printing', location: 'Patna', status: 'Active' },
      { id: 2, name: 'Ganga Digital Offset', category: 'Textbook Production', location: 'Hajipur', status: 'Active' },
      { id: 3, name: 'Prabhat Printing Press', category: 'Security Printing', location: 'Bhagalpur', status: 'Under Review' },
      { id: 4, name: 'Modern Paper Converters', category: 'Notebooks & Forms', location: 'Muzaffarpur', status: 'Active' },
    ];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPrinter, setEditingPrinter] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Textbook Production',
    location: '',
    status: 'Active'
  });

  const saveToStorage = (updated) => {
    setPrinters(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const handleOpenAdd = () => {
    setEditingPrinter(null);
    setFormData({ name: '', category: 'Textbook Production', location: '', status: 'Active' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (printer) => {
    setEditingPrinter(printer);
    setFormData({ ...printer });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.location) {
      addToast?.('Please fill all required fields', 'error');
      return;
    }

    let updated;
    if (editingPrinter) {
      updated = printers.map(p => p.id === editingPrinter.id ? { ...p, ...formData } : p);
      addToast?.('Printer information updated', 'success');
      logActivity(`Updated Printer: ${formData.name}`, 'Admin', 'edit', 'ku-printers');
    } else {
      updated = [...printers, { id: Date.now(), ...formData }];
      addToast?.('New printer registered successfully', 'success');
      logActivity(`Registered new Printer: ${formData.name}`, 'Admin', 'create', 'ku-printers');
    }
    saveToStorage(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    const printer = printers.find(p => p.id === id);
    const updated = printers.filter(p => p.id !== id);
    saveToStorage(updated);
    addToast?.('Printer removed from registry', 'info');
    if (printer) {
      logActivity(`Removed Printer: ${printer.name}`, 'Admin', 'delete');
    }
  };

  const filteredPrinters = printers.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'TOTAL PRINTERS', value: printers.length, icon: Printer, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'ACTIVE PARTNERS', value: printers.filter(p => p.status === 'Active').length, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'PENDING REVIEW', value: printers.filter(p => p.status === 'Under Review').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'LOCATIONS', value: [...new Set(printers.map(p => p.location))].length, icon: MapPin, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-20"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm group hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300"
          >
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} mb-6 w-fit group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <h4 className="text-3xl font-black text-gray-900 mb-1">{stat.value}</h4>
            <p className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Registry Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-black text-gray-900">Registered Printers</h3>
            <p className="text-sm text-gray-400 font-medium mt-1">Official directory of BSTBPC printing partners</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Search printers, categories or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-sm font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
            <button 
              onClick={handleOpenAdd}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Register Printer</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">Printer Info</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">Location</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">Status</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence>
                {filteredPrinters.map((printer) => (
                  <motion.tr 
                    key={printer.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group hover:bg-gray-50/30 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                          <Building className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors">{printer.name}</p>
                          <p className="text-[11px] font-bold text-gray-400 mt-0.5">{printer.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-gray-300" />
                        <span className="text-sm font-bold text-gray-600">{printer.location}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        {printer.status === 'Active' ? (
                          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg">
                            <CheckCircle className="w-3 h-3" />
                            <span className="text-[10px] font-black uppercase tracking-wider">Active</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-lg">
                            <AlertCircle className="w-3 h-3" />
                            <span className="text-[10px] font-black uppercase tracking-wider">Under Review</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                         <button 
                          onClick={() => handleOpenEdit(printer)}
                          className="px-4 py-2 bg-gray-50 text-gray-900 border border-gray-100 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                        >
                          Profile
                        </button>
                        <button 
                          onClick={() => handleDelete(printer.id)}
                          className="p-2.5 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {filteredPrinters.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-gray-200" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No partners found</h3>
              <p className="text-sm text-gray-400 mt-1">Try searching for a different name or location</p>
            </div>
          )}
        </div>
      </div>

      {/* Printer Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingPrinter ? "Update Printer Profile" : "Register New Printer Partner"} 
      >
        <div className="space-y-5">
          <FormInput 
            label="Printer Agency Name" 
            placeholder="e.g. Bihar State Corrugated Boxes Ltd." 
            value={formData.name}
            onChange={(val) => setFormData(prev => ({ ...prev, name: val }))}
          />
          
          <div className="grid grid-cols-2 gap-4">
             <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Category</label>
              <select 
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none text-sm font-bold text-gray-700 focus:ring-2 focus:ring-blue-500/20 transition-all"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              >
                <option value="Packaging & Printing">Packaging & Printing</option>
                <option value="Textbook Production">Textbook Production</option>
                <option value="Security Printing">Security Printing</option>
                <option value="Notebooks & Forms">Notebooks & Forms</option>
                <option value="Digital Offset">Digital Offset</option>
              </select>
            </div>
            <FormInput 
              label="Location (City)" 
              placeholder="e.g. Patna" 
              value={formData.location}
              onChange={(val) => setFormData(prev => ({ ...prev, location: val }))}
            />
          </div>

          <div>
            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Verification Status</label>
            <div className="flex gap-4">
              {['Active', 'Under Review'].map(s => (
                <button
                  key={s}
                  onClick={() => setFormData(prev => ({ ...prev, status: s }))}
                  className={`flex-1 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                    formData.status === s 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' 
                    : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
            <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-2xl text-sm font-bold text-gray-500 hover:bg-gray-100 transition-colors">Cancel</button>
            <button onClick={handleSave} className="px-6 py-3 rounded-2xl bg-blue-600 text-white text-sm font-black shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all">
              {editingPrinter ? "Update Profile" : "Register Agency"}
            </button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Shield, 
  MapPin, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Mail, 
  Phone,
  UserCheck,
  Building2,
  Briefcase
} from 'lucide-react';
import Modal, { FormInput } from '../components/Modal';
import { useActivityLog } from '../hooks/useCustomHooks';

/**
 * Officers Management Page
 * Standardized with high-end grid stats and registry table
 */
export default function OfficersPage({ addToast }) {
  const { logActivity } = useActivityLog();
  const storageKey = 'module_content_ku-officers';
  
  const [officers, setOfficers] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Shri. Rajesh Kumar', designation: 'General Manager', department: 'ADMINISTRATION', email: 'gm.admin@bstbpc.gov.in', phone: '+91-612-2221975' },
      { id: 2, name: 'Shri. Vinay Singh', designation: 'Deputy Manager', department: 'PRODUCTION', email: 'dm.prod@bstbpc.gov.in', phone: '+91-612-2221976' },
      { id: 3, name: 'Ms. Priya Sahay', designation: 'Finance Officer', department: 'FINANCE', email: 'fo@bstbpc.gov.in', phone: '+91-612-2221977' },
    ];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOfficer, setEditingOfficer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    department: 'ADMINISTRATION',
    email: '',
    phone: ''
  });

  const saveToStorage = (updated) => {
    setOfficers(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const handleOpenAdd = () => {
    setEditingOfficer(null);
    setFormData({ name: '', designation: '', department: 'ADMINISTRATION', email: '', phone: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (off) => {
    setEditingOfficer(off);
    setFormData({ ...off });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.designation || !formData.department) {
      addToast?.('Please fill all required fields', 'error');
      return;
    }

    let updated;
    if (editingOfficer) {
      updated = officers.map(o => o.id === editingOfficer.id ? { ...o, ...formData } : o);
      addToast?.('Officer details updated', 'success');
      logActivity(`Updated Officer: ${formData.name}`, 'Admin', 'edit');
    } else {
      updated = [...officers, { id: Date.now(), ...formData }];
      addToast?.('New officer added to registry', 'success');
      logActivity(`Added new Officer: ${formData.name}`, 'Admin', 'create');
    }
    saveToStorage(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    const offToDelete = officers.find(o => o.id === id);
    const updated = officers.filter(o => o.id !== id);
    saveToStorage(updated);
    addToast?.('Officer removed from registry', 'info');
    if (offToDelete) {
      logActivity(`Removed Officer: ${offToDelete.name}`, 'Admin', 'delete');
    }
  };

  const filteredOfficers = officers.filter(off => 
    off.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    off.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    off.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'SENIOR OFFICERS', value: `${officers.length}`, icon: Shield, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'DEPARTMENTS', value: [...new Set(officers.map(o => o.department))].length, icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'AVG EXPERIENCE', value: '15yrs', icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'TOTAL STAFF', value: '120+', icon: Users, color: 'text-sky-500', bg: 'bg-sky-50' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300"
          >
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} mb-6 group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <h4 className="text-3xl font-black text-gray-900 mb-1">{stat.value}</h4>
            <p className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Registry Section */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-widest">Officers Registry</h3>
            <p className="text-sm text-gray-400 font-medium mt-1">Directory of BSTBPC senior officials</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Search by name, role or dept..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-sm font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
            <button 
              onClick={handleOpenAdd}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 text-white rounded-2xl font-bold text-sm shadow-xl shadow-gray-900/10 hover:bg-black transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Register Officer</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">Name & Contact</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">Designation</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">Department</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence>
                {filteredOfficers.map((off) => (
                  <motion.tr 
                    key={off.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group hover:bg-gray-50/30 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                          <UserCheck className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-gray-900">{off.name}</p>
                          <div className="flex items-center gap-3 mt-1 text-[11px] font-bold text-gray-400">
                            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {off.email}</span>
                            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {off.phone}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-bold text-gray-600">{off.designation}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-gray-100 text-[10px] font-black text-gray-500 rounded-lg uppercase tracking-wider">
                        {off.department}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleOpenEdit(off)}
                          className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(off.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
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
          
          {filteredOfficers.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-gray-200" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No officers found</h3>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </div>

      {/* Officer Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingOfficer ? "Edit Officer Details" : "Register New Official"} 
      >
        <div className="space-y-5">
          <FormInput 
            label="Full Name" 
            placeholder="e.g. Shri. Rajesh Kumar" 
            value={formData.name}
            onChange={(val) => setFormData(prev => ({ ...prev, name: val }))}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormInput 
              label="Designation" 
              placeholder="e.g. General Manager" 
              value={formData.designation}
              onChange={(val) => setFormData(prev => ({ ...prev, designation: val }))}
            />
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Department</label>
              <select 
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none text-sm font-bold text-gray-700 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                value={formData.department}
                onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
              >
                <option value="ADMINISTRATION">ADMINISTRATION</option>
                <option value="FINANCE">FINANCE</option>
                <option value="PRODUCTION">PRODUCTION</option>
                <option value="SALES">SALES</option>
                <option value="HR">HR</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput 
              label="Email Address" 
              placeholder="name@bstbpc.gov.in" 
              value={formData.email}
              onChange={(val) => setFormData(prev => ({ ...prev, email: val }))}
            />
            <FormInput 
              label="Contact Number" 
              placeholder="+91-XXX-XXXXXXX" 
              value={formData.phone}
              onChange={(val) => setFormData(prev => ({ ...prev, phone: val }))}
            />
          </div>

          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
            <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-2xl text-sm font-bold text-gray-500 hover:bg-gray-100 transition-colors">Cancel</button>
            <button onClick={handleSave} className="px-6 py-3 rounded-2xl bg-gray-900 text-white text-sm font-black shadow-xl shadow-gray-900/10 hover:bg-black transition-all">
              {editingOfficer ? "Update Record" : "Register Officer"}
            </button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}

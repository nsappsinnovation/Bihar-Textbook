import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  ShieldCheck, 
  UserCircle2, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Mail,
  Award,
  Building,
  GanttChart
} from 'lucide-react';
import Modal, { FormInput } from '../components/Modal';
import { useActivityLog } from '../hooks/useCustomHooks';

/**
 * Board of Directors Management Page
 * Standardized with high-end grid stats and registry table
 */
export default function BoardOfDirectorsPage({ addToast }) {
  const { logActivity } = useActivityLog();
  const storageKey = 'module_content_ku-board';
  
  const [directors, setDirectors] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Shri. Robert L. Chongthu', designation: 'Chairman', organization: 'Education Department, Bihar', email: 'chairman@bstbpc.gov.in' },
      { id: 2, name: 'Shri. K.K. Pathak', designation: 'Director', organization: 'Education Department, Bihar', email: 'director@bstbpc.gov.in' },
    ];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDirector, setEditingDirector] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    organization: '',
    email: ''
  });

  const saveToStorage = (updated) => {
    setDirectors(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const handleOpenAdd = () => {
    setEditingDirector(null);
    setFormData({ name: '', designation: '', organization: '', email: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (dir) => {
    setEditingDirector(dir);
    setFormData({ ...dir });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.designation) {
      addToast?.('Please fill all required fields', 'error');
      return;
    }

    let updated;
    if (editingDirector) {
      updated = directors.map(d => d.id === editingDirector.id ? { ...d, ...formData } : d);
      addToast?.('Director profile updated', 'success');
      logActivity(`Updated Director: ${formData.name}`, 'Admin', 'edit');
    } else {
      updated = [...directors, { id: Date.now(), ...formData }];
      addToast?.('New Director added to board', 'success');
      logActivity(`Added new Director: ${formData.name}`, 'Admin', 'create');
    }
    saveToStorage(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    const dirToDelete = directors.find(d => d.id === id);
    const updated = directors.filter(d => d.id !== id);
    saveToStorage(updated);
    addToast?.('Director removed from board', 'info');
    if (dirToDelete) {
      logActivity(`Removed Director: ${dirToDelete.name}`, 'Admin', 'delete');
    }
  };

  const filteredDirectors = directors.filter(dir => 
    dir.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dir.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dir.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'BOARD MEMBERS', value: `${directors.length}`, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'CHAIRMAN', value: '1', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'MEETINGS / YR', value: '4', icon: GanttChart, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'TENURE', value: '3yrs', icon: Award, color: 'text-amber-600', bg: 'bg-amber-50' },
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
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-widest">Board of Directors</h3>
            <p className="text-sm text-gray-400 font-medium mt-1">Management and governing body of BSTBPC</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Search directors by name or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-sm font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>
            <button 
              onClick={handleOpenAdd}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Appoint Director</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">Director Details</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">Designation</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">Organization</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence>
                {filteredDirectors.map((dir) => (
                  <motion.tr 
                    key={dir.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group hover:bg-gray-50/30 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                          <UserCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-gray-900">{dir.name}</p>
                          <div className="flex items-center gap-2 mt-1 text-[11px] font-bold text-gray-400">
                            <Mail className="w-3 h-3 text-indigo-400" />
                            <span>{dir.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-wider ${
                        dir.designation === 'Chairman' ? 'bg-indigo-50 text-indigo-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {dir.designation}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                        <Building className="w-4 h-4 text-gray-300" />
                        {dir.organization}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleOpenEdit(dir)}
                          className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(dir.id)}
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
          
          {filteredDirectors.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-gray-200" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No directors found</h3>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </div>

      {/* Director Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingDirector ? "Edit Director Details" : "Appoint New Director"} 
      >
        <div className="space-y-5">
          <FormInput 
            label="Full Name" 
            placeholder="e.g. Shri. Robert L. Chongthu" 
            value={formData.name}
            onChange={(val) => setFormData(prev => ({ ...prev, name: val }))}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormInput 
              label="Designation" 
              placeholder="e.g. Chairman" 
              value={formData.designation}
              onChange={(val) => setFormData(prev => ({ ...prev, designation: val }))}
            />
            <FormInput 
              label="Official Email" 
              placeholder="name@bstbpc.gov.in" 
              value={formData.email}
              onChange={(val) => setFormData(prev => ({ ...prev, email: val }))}
            />
          </div>

          <FormInput 
            label="Organization / Parent Dept" 
            placeholder="e.g. Education Department, Bihar" 
            value={formData.organization}
            onChange={(val) => setFormData(prev => ({ ...prev, organization: val }))}
          />

          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
            <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-2xl text-sm font-bold text-gray-500 hover:bg-gray-100 transition-colors">Cancel</button>
            <button onClick={handleSave} className="px-6 py-3 rounded-2xl bg-indigo-600 text-white text-sm font-black shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all">
              {editingDirector ? "Update Appointment" : "Register Director"}
            </button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}

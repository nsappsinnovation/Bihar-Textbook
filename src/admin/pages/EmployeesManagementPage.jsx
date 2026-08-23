import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Award, 
  Heart, 
  TrendingUp, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Download,
  Filter,
  MoreVertical,
  X,
  UserCheck
} from 'lucide-react';
import Modal, { FormInput } from '../components/Modal';
import { useActivityLog } from '../hooks/useCustomHooks';

/**
 * Employees Management Page
 * Featuring real-time stats and a professional directory table
 */
export default function EmployeesManagementPage({ addToast }) {
  const { logActivity } = useActivityLog();
  const storageKey = 'module_content_ku-employee_v2';
  
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(emp => emp.type !== 'Outsource');
        }
      } catch (e) {
        console.error("Error parsing stored employees", e);
      }
    }
    return [
      { id: 1, employeeId: 'EMP001', name: 'Azimul Hassan', designation: 'Assistant Cum Cashier', type: 'Regular', department: 'Establishment' },
      { id: 2, employeeId: 'EMP002', name: 'Binod Kumar', designation: 'Sales Assistant', type: 'Regular', department: 'Sales' },
      { id: 3, employeeId: 'EMP003', name: 'Santosh Kumar', designation: 'Dispatch', type: 'Regular', department: 'Dispatch' },
      { id: 4, employeeId: 'EMP004', name: 'Rajesh Hembrom', designation: 'Security Encharge', type: 'Regular', department: 'Security' },
      { id: 5, employeeId: 'EMP005', name: 'Binod Kumar', designation: 'Peon', type: 'Regular', department: 'MD Cell' },
      { id: 6, employeeId: 'EMP006', name: 'Rakesh Kumar', designation: 'Account Assistant', type: 'Contract', department: 'Accounts' },
      { id: 7, employeeId: 'EMP007', name: 'Sukriti Kumari', designation: 'Account Assistant', type: 'Contract', department: 'Accounts' },
      { id: 8, employeeId: 'EMP008', name: 'MD Ashad', designation: 'Assistant', type: 'Contract', department: 'Accounts' },
      { id: 9, employeeId: 'EMP009', name: 'KN Rai', designation: 'Assistant', type: 'Contract', department: 'Legal' },
      { id: 10, employeeId: 'EMP010', name: 'CK Yadav', designation: 'Sales Assistant', type: 'Contract', department: 'Sales' }
    ];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    type: 'Regular',
    department: ''
  });

  const saveToStorage = (updated) => {
    setEmployees(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const handleOpenAdd = () => {
    setEditingEmployee(null);
    setFormData({
      name: '',
      designation: '',
      type: 'Regular',
      department: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (emp) => {
    setEditingEmployee(emp);
    setFormData({ ...emp });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.designation) {
      addToast?.('Please fill all required fields', 'error');
      return;
    }

    let updated;
    if (editingEmployee) {
      updated = employees.map(e => e.id === editingEmployee.id ? { ...e, ...formData } : e);
      addToast?.('Employee details updated', 'success');
      logActivity(`Updated Employee: ${formData.name}`, 'Admin', 'edit');
    } else {
      updated = [...employees, { id: Date.now(), ...formData }];
      addToast?.('New employee added to registry', 'success');
      logActivity(`Added new Employee: ${formData.name}`, 'Admin', 'create');
    }
    saveToStorage(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    const empToDelete = employees.find(e => e.id === id);
    const updated = employees.filter(e => e.id !== id);
    saveToStorage(updated);
    addToast?.('Employee removed from registry', 'info');
    if (empToDelete) {
      logActivity(`Removed Employee: ${empToDelete.name}`, 'Admin', 'delete');
    }
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (emp.type || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >

      {/* Directory Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6 w-full">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Our Employees</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Manage and organize staff directory profiles</p>
            </div>
          </div>
          
          <button 
            onClick={handleOpenAdd}
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
              placeholder="Filter by name, designation or dept..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end text-xs font-semibold text-slate-600">
            <span className="bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm">
              Total Records: <span className="text-blue-600 font-bold">{employees.length}</span>
            </span>
          </div>
        </div>

        {/* Directory Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 shadow-sm bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/70 text-slate-600 text-[11px] font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3.5 px-4 text-center w-12">S.No.</th>
                  <th className="py-3.5 px-5">Employee Name</th>
                  <th className="py-3.5 px-5">Designation</th>
                  <th className="py-3.5 px-5">Type</th>
                  <th className="py-3.5 px-5">Department</th>
                  <th className="py-3.5 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                <AnimatePresence>
                  {filteredEmployees.map((emp, index) => (
                    <motion.tr 
                      key={emp.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-slate-50/60 transition-colors group"
                    >
                      <td className="py-4 px-4 text-center font-semibold text-slate-500 text-[13px]">
                        {(index + 1).toString().padStart(2, '0')}
                      </td>
                      <td className="py-4 px-5">
                        <div>
                          <p className="font-bold text-slate-800 text-base">{emp.name}</p>
                          <p className="text-xs text-slate-400 font-medium">Employee, BSTBPC</p>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <span className="font-bold text-slate-700 text-[15px]">{emp.designation}</span>
                      </td>
                      <td className="py-4 px-5">
                        <span className="text-slate-600 font-medium">{emp.type}</span>
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex flex-col gap-1.5">
                           <span className="text-xs text-slate-600 font-medium">Dept: <span className="font-bold">{emp.department}</span></span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handleOpenEdit(emp)}
                            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                            title="Edit Profile"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(emp.id)}
                            className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                            title="Delete Profile"
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
            
            {filteredEmployees.length === 0 && (
              <div className="py-12 text-center text-slate-400 font-medium">
                No records match "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Employee Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingEmployee ? "Edit Employee Details" : "Register New Employee"} 
      >
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput 
              label="Full Name" 
              placeholder="e.g. Shri. Manoj Kumar" 
              value={formData.name}
              onChange={(val) => setFormData(prev => ({ ...prev, name: val }))}
            />
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Type</label>
              <select 
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none text-sm font-bold text-gray-700 focus:ring-2 focus:ring-blue-500/20 transition-all"
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              >
                <option value="Regular">Regular</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput 
              label="Designation" 
              placeholder="e.g. Accountant" 
              value={formData.designation}
              onChange={(val) => setFormData(prev => ({ ...prev, designation: val }))}
            />
            <FormInput 
              label="Department" 
              placeholder="e.g. Accounts" 
              value={formData.department}
              onChange={(val) => setFormData(prev => ({ ...prev, department: val }))}
            />
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
              className="px-6 py-3 rounded-2xl bg-blue-600 text-white text-sm font-bold shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all"
            >
              {editingEmployee ? "Update Record" : "Register Employee"}
            </button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}

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
    return saved ? JSON.parse(saved) : [
      { id: 1, employeeId: 'EMP001', name: 'Azimul Hassan', designation: 'Assistant Cum Cashier', type: 'Regular', department: 'Establishment' },
      { id: 2, employeeId: 'EMP002', name: 'Binod Kumar', designation: 'Sales Assistant', type: 'Regular', department: 'Sales' },
      { id: 3, employeeId: 'EMP003', name: 'Santosh Kumar', designation: 'Dispatch', type: 'Regular', department: 'Dispatch' },
      { id: 4, employeeId: 'EMP004', name: 'Rajesh Hembrom', designation: 'Security Encharge', type: 'Regular', department: 'Security' },
      { id: 5, employeeId: 'EMP005', name: 'Binod Kumar', designation: 'Peon', type: 'Regular', department: 'MD Cell' },
      { id: 6, employeeId: 'EMP006', name: 'Rakesh Kumar', designation: 'Account Assistant', type: 'Contract', department: 'Accounts' },
      { id: 7, employeeId: 'EMP007', name: 'Sukriti Kumari', designation: 'Account Assistant', type: 'Contract', department: 'Accounts' },
      { id: 8, employeeId: 'EMP008', name: 'MD Ashad', designation: 'Assistant', type: 'Contract', department: 'Accounts' },
      { id: 9, employeeId: 'EMP009', name: 'KN Rai', designation: 'Assistant', type: 'Contract', department: 'Legal' },
      { id: 10, employeeId: 'EMP010', name: 'CK Yadav', designation: 'Sales Assistant', type: 'Contract', department: 'Sales' },
      { id: 11, employeeId: 'EMP011', name: 'Mukesh Kumar Ojha', designation: 'Account Expert', type: 'Outsource', department: 'Accounts' },
      { id: 12, employeeId: 'EMP012', name: 'Kishan', designation: 'Programmer', type: 'Outsource', department: 'MD Cell' },
      { id: 13, employeeId: 'EMP013', name: 'Alok Kumar', designation: 'Computer Operator', type: 'Outsource', department: 'Accounts' },
      { id: 14, employeeId: 'EMP014', name: 'Jyotish Kumar', designation: 'Computer Operator', type: 'Outsource', department: 'Sales & Marketing' },
      { id: 15, employeeId: 'EMP015', name: 'Jitendra Kumar', designation: 'Computer Operator', type: 'Outsource', department: 'Establishment' },
      { id: 16, employeeId: 'EMP016', name: 'Sandeep Kumar', designation: 'Computer Operator', type: 'Outsource', department: 'Accounts' },
      { id: 17, employeeId: 'EMP017', name: 'Soni Kumari', designation: 'Computer Operator', type: 'Outsource', department: 'Company Secretary' },
      { id: 18, employeeId: 'EMP018', name: 'Shruti Sailesh', designation: 'Computer Operator', type: 'Outsource', department: 'Establishment' },
      { id: 19, employeeId: 'EMP019', name: 'Ruhi', designation: 'Computer Operator', type: 'Outsource', department: 'Legal' }
    ];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    designation: '',
    type: 'Regular',
    department: 'Accounts'
  });

  const saveToStorage = (updated) => {
    setEmployees(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const handleOpenAdd = () => {
    setEditingEmployee(null);
    setFormData({
      employeeId: `EMP${String(employees.length + 1).padStart(3, '0')}`,
      name: '',
      designation: '',
      type: 'Regular',
      department: 'Accounts'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (emp) => {
    setEditingEmployee(emp);
    setFormData({ ...emp });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.employeeId || !formData.designation) {
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
    emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Employee Directory</h3>
            <p className="text-sm text-gray-400 font-medium mt-1">Official registry of BSTBPC staff members</p>
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
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">Employee ID</th>
                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">Name</th>
                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">Designation</th>
                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">Type</th>
                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">Department</th>
                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence>
                {filteredEmployees.map((emp) => (
                  <motion.tr 
                    key={emp.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group hover:bg-gray-50/30 transition-colors"
                  >
                    <td className="px-8 py-5">
                      <span className="text-sm font-bold text-blue-600 tracking-tight">{emp.employeeId}</span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                          <UserCheck className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold text-gray-900">{emp.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-bold text-gray-500">{emp.designation}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-bold text-gray-500">{emp.type}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-gray-100 text-[10px] font-bold text-gray-500 rounded-lg uppercase tracking-wider">
                        {emp.department}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleOpenEdit(emp)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(emp.id)}
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
          
          {filteredEmployees.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-gray-200" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No matches found</h3>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </div>

      {/* Employee Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingEmployee ? "Edit Employee Details" : "Register New Employee"} 
      >
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <FormInput 
              label="Employee ID" 
              placeholder="e.g. EMP001" 
              value={formData.employeeId}
              onChange={(val) => setFormData(prev => ({ ...prev, employeeId: val }))}
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
                <option value="Outsource">Outsource</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput 
              label="Full Name" 
              placeholder="e.g. Shri. Manoj Kumar" 
              value={formData.name}
              onChange={(val) => setFormData(prev => ({ ...prev, name: val }))}
            />
            <FormInput 
              label="Department" 
              placeholder="e.g. Accounts" 
              value={formData.department}
              onChange={(val) => setFormData(prev => ({ ...prev, department: val }))}
            />
          </div>

          <FormInput 
            label="Designation" 
            placeholder="e.g. Accountant" 
            value={formData.designation}
            onChange={(val) => setFormData(prev => ({ ...prev, designation: val }))}
          />

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

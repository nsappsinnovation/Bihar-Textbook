import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Plus, Edit3, Trash2, Mail, Phone, MapPin,
  Users, ChevronDown,
} from 'lucide-react';
import Modal, { FormInput } from '../components/Modal';
import { officers, departmentOptions } from '../data/dummyData';
import { useDebounce } from '../hooks/useCustomHooks';

const statusStyles = {
  Active: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  'On Leave': 'bg-amber-50 text-amber-600 border-amber-200',
  Inactive: 'bg-gray-100 text-gray-500 border-gray-200',
};

const avatarColors = [
  'from-blue-500 to-blue-700',
  'from-indigo-500 to-indigo-700',
  'from-cyan-500 to-cyan-700',
  'from-emerald-500 to-emerald-700',
  'from-amber-500 to-amber-700',
  'from-rose-500 to-rose-700',
];

/**
 * Officers Management Page
 * Professional officer cards with search, filter, and add modal
 */
export default function OfficersPage({ addToast }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const debouncedSearch = useDebounce(searchQuery);

  const filteredOfficers = useMemo(() => {
    return officers.filter((officer) => {
      const matchesSearch = officer.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        officer.designation.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesDept = selectedDept === 'All' || officer.department === selectedDept;
      return matchesSearch && matchesDept;
    });
  }, [debouncedSearch, selectedDept]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Officers Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage officers and their designations</p>
        </div>
        <motion.button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-shadow"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          id="add-officer-btn"
        >
          <Plus className="w-4 h-4" />
          Add Officer
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-card border border-gray-100/50 mb-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search officers by name or designation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
              id="search-officers"
            />
          </div>
          <div className="relative">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="appearance-none w-full sm:w-48 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all pr-10"
              id="filter-department"
            >
              <option value="All">All Departments</option>
              {departmentOptions.map(dept => <option key={dept} value={dept}>{dept}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Officer Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredOfficers.map((officer, index) => (
          <motion.div
            key={officer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl shadow-card hover:shadow-card-hover border border-gray-100/50 overflow-hidden transition-all duration-300 group"
          >
            {/* Top Gradient Strip */}
            <div className={`h-1.5 bg-gradient-to-r ${avatarColors[index % avatarColors.length]}`} />

            <div className="p-6">
              {/* Avatar & Status */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
                  {officer.avatar}
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusStyles[officer.status]}`}>
                  {officer.status}
                </span>
              </div>

              {/* Name & Designation */}
              <h3 className="text-base font-bold text-gray-800 mb-0.5">{officer.name}</h3>
              <p className="text-sm text-blue-600 font-medium mb-1">{officer.designation}</p>
              <p className="text-xs text-gray-500 flex items-center gap-1 mb-4">
                <MapPin className="w-3 h-3" />
                {officer.department}
              </p>

              {/* Contact Info */}
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  <span className="truncate">{officer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <span>{officer.phone}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                <motion.button
                  onClick={() => addToast(`Editing ${officer.name}`, 'info')}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                  whileTap={{ scale: 0.97 }}
                >
                  <Edit3 className="w-3 h-3" />
                  Edit
                </motion.button>
                <motion.button
                  onClick={() => addToast(`Deleted ${officer.name}`, 'error')}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 transition-colors"
                  whileTap={{ scale: 0.97 }}
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredOfficers.length === 0 && (
        <div className="py-16 text-center bg-white rounded-2xl shadow-card">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-500">No officers found</p>
          <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filter</p>
        </div>
      )}

      {/* Add Officer Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Officer" size="lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <FormInput label="Full Name" placeholder="Enter officer's full name" required id="officer-name" />
          <FormInput label="Designation" placeholder="e.g., Director" required id="officer-designation" />
          <FormInput label="Department" placeholder="e.g., Administration" required id="officer-department" />
          <FormInput label="Contact Number" placeholder="+91 98XXXXXXXX" id="officer-phone" />
          <FormInput label="Email" type="email" placeholder="name@bstbpc.gov.in" id="officer-email" />
        </div>
        <FormInput label="Description" type="textarea" placeholder="Brief description of role..." id="officer-description" />
        <FormInput label="Upload Photo" type="file" id="officer-photo" />

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={() => setShowAddModal(false)}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <motion.button
            onClick={() => {
              setShowAddModal(false);
              addToast('Officer added successfully!', 'success');
            }}
            className="px-5 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold shadow-lg shadow-blue-500/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add Officer
          </motion.button>
        </div>
      </Modal>
    </motion.div>
  );
}

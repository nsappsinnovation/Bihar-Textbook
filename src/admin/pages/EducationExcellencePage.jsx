import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, UserPlus, Trash2, Edit, Award, User, Briefcase, Linkedin } from 'lucide-react';

export default function EducationExcellencePage({ addToast }) {
  const [leaders, setLeaders] = useState(() => {
    const saved = localStorage.getItem('website_leaders');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Dr. Ramesh Kumar', role: 'Chief Academic Officer', achievement: 'Excellence in Digital Curriculum', image: 'https://ui-avatars.com/api/?name=Ramesh+Kumar' },
      { id: 2, name: 'Mrs. Sunita Verma', role: 'Innovation Lead', achievement: 'Global Learning Pioneer', image: 'https://ui-avatars.com/api/?name=Sunita+Verma' },
    ];
  });

  const handleAddLeader = () => {
    const newLeader = {
      id: Date.now(),
      name: 'New Academic Leader',
      role: 'Staff Member',
      achievement: 'Added new contribution',
      image: 'https://ui-avatars.com/api/?name=New+Leader'
    };
    const updated = [...leaders, newLeader];
    setLeaders(updated);
    localStorage.setItem('website_leaders', JSON.stringify(updated));
    addToast?.('Leader Added', 'success');
  };

  const handleDelete = (id) => {
    const updated = leaders.filter(l => l.id !== id);
    setLeaders(updated);
    localStorage.setItem('website_leaders', JSON.stringify(updated));
    addToast?.('Updated', 'info');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Education Excellence</h1>
          <p className="text-sm text-gray-500 mt-1">Manage academic leaders, achievements, and excellence records</p>
        </div>
        <button 
          onClick={handleAddLeader}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-sm hover:bg-emerald-700 transition-all"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Leader</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            Top Academic Leaders
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-50">
          {leaders.map((leader) => (
            <div key={leader.id} className="p-6 flex items-start justify-between group hover:bg-gray-50/50 transition-colors">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden border-2 border-white shadow-sm">
                  <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-800">{leader.name}</h4>
                  <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-0.5">
                    <Briefcase className="w-3 h-3" />
                    {leader.role}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-2 max-w-[200px] leading-relaxed">
                    {leader.achievement}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(leader.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          
          {leaders.length === 0 && (
            <div className="p-12 text-center col-span-2 text-gray-400 font-medium">
              No leaders added yet. Click "Add New Leader" to get started.
            </div>
          )}
        </div>
      </div>

      {/* Excellence Stats Section */}
      <div className="bg-emerald-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold">Manage Awards & Certificates</h3>
            <p className="text-emerald-300 text-sm mt-2 max-w-sm">
              Update the latest achievements and certificates displayed in the Education Excellence section.
            </p>
          </div>
          <button className="px-6 py-3 bg-white text-emerald-900 rounded-xl font-bold text-sm shadow-xl hover:bg-emerald-50 transition-all">
            Upload Certificate
          </button>
        </div>
        
        {/* Decorative background circle */}
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      </div>
    </motion.div>
  );
}

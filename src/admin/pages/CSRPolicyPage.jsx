import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Save, Eye, X, Download, Plus, Trash2, 
  CheckCircle2, ArrowRight, Zap, Target, BookOpen, Globe, Heart, Activity,
  Handshake, Coins, Clock
} from 'lucide-react';

export default function CSRPolicyPage({ addToast }) {
  const [formData, setFormData] = useState({
    // Section 2: About & Social Leadership
    aboutDescription: 'Bihar State Text Book Publishing Corporation Ltd. (BSTBPC) is committed to advancing social responsibility beyond educational publishing. Our CSR initiatives are designed to contribute meaningfully to inclusive growth, environmental sustainability, and community development across Bihar.',
    aboutSecondaryDesc: 'We believe that education is a powerful catalyst for change. Through our CSR programs, we aim to support underserved communities, promote equitable access to learning resources, and strengthen institutional capacities at the grassroots level.',
    
    // Footer Stats
    strategyYear: '2026',
    livesImpacted: '15M+',
    govtApproval: '100%'
  });

  useEffect(() => {
    const saved = localStorage.getItem('website_csr_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData(prev => ({
        ...prev,
        ...parsed
      }));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('website_csr_data', JSON.stringify(formData));
    addToast?.('CSR Content Updated Successfully', 'success');
    window.dispatchEvent(new Event('websiteDataUpdated'));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({ ...prev, [parent]: { ...prev[parent], [child]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleListChange = (idx, value, listName) => {
    const newList = [...formData[listName]];
    newList[idx] = value;
    setFormData(prev => ({ ...prev, [listName]: newList }));
  };

  const getIcon = (name) => {
    const icons = { BookOpen, Globe, Heart, Shield, Activity, Zap, Target };
    const Icon = icons[name] || Shield;
    return <Icon className="w-5 h-5" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-20 scrollbar-hide"
    >
      {/* Header Sticky Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-10 bg-[#F8FAFC]/90 backdrop-blur-md py-4 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            CSR Policy Hub
          </h1>
          <p className="text-sm text-gray-500 mt-1">Full sequential management with live parity</p>
        </div>
        <div className="flex items-center gap-3">

          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-12">

        <div className="space-y-4">
          <h3 className="text-xs font-black text-indigo-600 uppercase tracking-widest px-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600" />
            1. About Our CSR Commitment
          </h3>
          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm space-y-8">
            <div className="space-y-4 p-6 bg-slate-50 rounded-3xl">
              <div className="space-y-4">
                <textarea name="aboutDescription" value={formData.aboutDescription} onChange={handleChange} rows={4} className="w-full px-4 py-3 rounded-xl bg-white border border-gray-100 text-sm outline-none focus:border-indigo-500 resize-none" placeholder="Primary description..." />
                <textarea name="aboutSecondaryDesc" value={formData.aboutSecondaryDesc} onChange={handleChange} rows={4} className="w-full px-4 py-3 rounded-xl bg-white border border-gray-100 text-sm outline-none focus:border-indigo-500 resize-none" placeholder="Secondary description..." />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest px-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            2. Footer Stats
          </h3>
          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Strategy Year</label>
              <input name="strategyYear" value={formData.strategyYear} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 text-base font-bold outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Lives Impacted</label>
              <input name="livesImpacted" value={formData.livesImpacted} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 text-base font-bold outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Govt Approval</label>
              <input name="govtApproval" value={formData.govtApproval} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 text-base font-bold outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all" />
            </div>
          </div>
        </div>
      </div>


    </motion.div>
  );
}

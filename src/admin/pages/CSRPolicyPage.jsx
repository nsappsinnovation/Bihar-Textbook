import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Save, Eye, X, Download, Plus, Trash2, 
  CheckCircle2, ArrowRight, Zap, Target, BookOpen, Globe, Heart, Activity,
  Handshake, Coins, Clock
} from 'lucide-react';

export default function CSRPolicyPage({ addToast }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [formData, setFormData] = useState({
    heroTitle: 'Empowering Communities, Transforming Futures',
    heroSubtitle: 'BSTBPC is committed to building a knowledge-driven society by advancing educational equity and social responsibility across the heart of Bihar.',
    
    // Section 2: About & Social Leadership
    aboutTitle: 'About Our CSR Commitment',
    aboutDescription: 'Bihar State Text Book Publishing Corporation Ltd. (BSTBPC) is committed to advancing social responsibility beyond educational publishing. Our CSR initiatives are designed to contribute meaningfully to inclusive growth, environmental sustainability, and community development across Bihar.',
    aboutSecondaryDesc: 'We believe that education is a powerful catalyst for change. Through our CSR programs, we aim to support underserved communities, promote equitable access to learning resources, and strengthen institutional capacities at the grassroots level.',
    socialLeadershipTitle: 'Social Leadership',
    socialLeadershipDesc: 'Dedicated to the holistic upliftment of the underprivileged sections of Bihar.',
    compliancePoints: [
      { id: 1, title: 'Statutory Compliance', desc: 'Governed by the Companies Act, 2013 and official government guidelines.' },
      { id: 2, title: 'Transparent Monitoring', desc: 'Rigorous impact assessment for every project we undertake.' }
    ],
    downloadUrl: '#',
    stats: {
      districts: '100+',
      allocation: '2%'
    },

    // Section 3: Vision & Mission
    vision: 'To build an inclusive and knowledge-driven society by supporting initiatives that promote education, sustainability, and community well-being.',
    missionPoints: [
      'Enhance access to quality education in rural areas',
      'Promote digital literacy and inclusive learning',
      'Support environmental sustainability initiatives',
      'Strengthen social infrastructure through responsible governance'
    ],

    // Section 4: Impact Areas
    impactAreas: [
      { id: 1, title: 'Educational Access', desc: 'Providing textbooks, learning materials, and infrastructure support to government schools in rural and semi-urban areas of Bihar.', icon: 'BookOpen' },
      { id: 2, title: 'Digital Inclusion', desc: 'Promoting access to digital learning tools, smart classrooms, and digital literacy initiatives to bridge the technological divide.', icon: 'Globe' },
      { id: 3, title: 'Community Welfare', desc: 'Supporting health awareness programs, skill development workshops, and meaningful community outreach initiatives.', icon: 'Heart' },
      { id: 4, title: 'Environmental Sustainability', desc: 'Encouraging eco-friendly printing practices, paper recycling, and green campus initiatives to safeguard our natural resources.', icon: 'Shield' }
    ],

    // Section 5: Recent Initiatives
    recentInitiatives: [
      { id: 1, title: 'Learning Kit Distribution', desc: 'Distributed over 50,000 comprehensive learning kits to students in rural districts across Bihar.' },
      { id: 2, title: 'Green Bihar Plantation Drive', desc: 'Planted 10,000+ saplings in collaboration with local schools to promote environmental awareness.' },
      { id: 3, title: 'Teacher Digital Workshops', desc: 'Conducted 100+ digital literacy workshops training educators in modern pedagogical tools.' },
      { id: 4, title: 'Inclusive Content Support', desc: 'Developed specialized educational materials for differently-abled students for inclusive learning.' }
    ],

    // Section 6: Partner With Us
    partnerTitle: 'Partner With Us',
    partnerDesc: 'We welcome collaborations with organizations, NGOs, and corporate partners to scale our CSR impact. Together, we can create sustainable educational ecosystems in Bihar.',
    
    // Section 7: CSR Investment
    investmentTitle: 'CSR Investment Overview',
    investmentStats: [
      { label: 'Annual Expenditure', value: '₹5.2 Cr' },
      { label: 'Beneficiaries', value: '1.2M+' }
    ],

    // Section 8: Governance
    futureRoadmap: [
      'Expansion of digital education programs',
      'Promoting green printing & sustainability',
      'Expanding community health awareness'
    ],
    governance: 'Our CSR activities are governed by the Companies Act, 2013. A dedicated committee oversees project approval, budget utilization, and impact assessment.'
  });

  useEffect(() => {
    const saved = localStorage.getItem('website_csr_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData(prev => ({
        ...prev,
        ...parsed,
        stats: { ...prev.stats, ...(parsed.stats || {}) },
        impactAreas: parsed.impactAreas || prev.impactAreas,
        missionPoints: parsed.missionPoints || prev.missionPoints,
        recentInitiatives: parsed.recentInitiatives || prev.recentInitiatives,
        compliancePoints: parsed.compliancePoints || prev.compliancePoints,
        futureRoadmap: parsed.futureRoadmap || prev.futureRoadmap,
        investmentStats: parsed.investmentStats || prev.investmentStats
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-30 bg-[#F8FAFC]/90 backdrop-blur-md py-4 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            CSR Policy Hub
          </h1>
          <p className="text-sm text-gray-500 mt-1">Full sequential management with live parity</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsPreviewOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold text-sm shadow-sm hover:bg-gray-50 transition-all"
          >
            <Eye className="w-4 h-4" />
            <span>Full Preview</span>
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Sync Content</span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section 1: Hero */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest px-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            1. Hero Section
          </h3>
          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Main Heading</label>
              <input name="heroTitle" value={formData.heroTitle} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 text-base font-bold outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Sub-headline</label>
              <textarea name="heroSubtitle" value={formData.heroSubtitle} onChange={handleChange} rows={2} className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 text-sm font-medium outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 resize-none transition-all" />
            </div>
          </div>
        </div>

        {/* Section 2: About & Social Leadership */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-indigo-600 uppercase tracking-widest px-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600" />
            2. About & Social Leadership
          </h3>
          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 p-6 bg-slate-50 rounded-3xl">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">Narrative Content</h4>
                <div className="space-y-4">
                  <textarea name="aboutDescription" value={formData.aboutDescription} onChange={handleChange} rows={4} className="w-full px-4 py-3 rounded-xl bg-white border border-gray-100 text-sm outline-none focus:border-indigo-500 resize-none" placeholder="Primary description..." />
                  <textarea name="aboutSecondaryDesc" value={formData.aboutSecondaryDesc} onChange={handleChange} rows={4} className="w-full px-4 py-3 rounded-xl bg-white border border-gray-100 text-sm outline-none focus:border-indigo-500 resize-none" placeholder="Secondary description..." />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4 p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100">
                  <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest border-b border-indigo-100 pb-2 flex items-center justify-between">
                    Social Leadership Card
                    <Shield className="w-3 h-3" />
                  </h4>
                  <input name="socialLeadershipTitle" value={formData.socialLeadershipTitle} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-white border border-indigo-100 text-sm font-bold text-indigo-900" />
                  <textarea name="socialLeadershipDesc" value={formData.socialLeadershipDesc} onChange={handleChange} rows={2} className="w-full px-4 py-2 rounded-lg bg-white border border-indigo-100 text-xs text-indigo-700 outline-none resize-none" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-gray-100 rounded-2xl">
                    <label className="text-[9px] font-black text-gray-400 uppercase block mb-1">Districts</label>
                    <input name="stats.districts" value={formData.stats.districts} onChange={handleChange} className="w-full text-lg font-black text-blue-600 outline-none" />
                  </div>
                  <div className="p-4 bg-white border border-gray-100 rounded-2xl">
                    <label className="text-[9px] font-black text-gray-400 uppercase block mb-1">Allocation</label>
                    <input name="stats.allocation" value={formData.stats.allocation} onChange={handleChange} className="w-full text-lg font-black text-blue-600 outline-none" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Compliance & Transparency Cards</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.compliancePoints.map((point, i) => (
                  <div key={point.id} className="p-5 rounded-2xl bg-white border border-gray-100 space-y-2 hover:border-indigo-200 transition-all">
                    <input 
                      value={point.title} 
                      onChange={(e) => {
                        const newList = [...formData.compliancePoints];
                        newList[i].title = e.target.value;
                        setFormData(prev => ({ ...prev, compliancePoints: newList }));
                      }}
                      className="w-full font-bold text-sm text-gray-800 outline-none" 
                    />
                    <textarea 
                      value={point.desc} 
                      onChange={(e) => {
                        const newList = [...formData.compliancePoints];
                        newList[i].desc = e.target.value;
                        setFormData(prev => ({ ...prev, compliancePoints: newList }));
                      }}
                      rows={2}
                      className="w-full text-xs text-gray-500 outline-none resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Vision & Mission */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-emerald-600 uppercase tracking-widest px-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            3. Vision & Mission
          </h3>
          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Our CSR Vision</label>
              <textarea name="vision" value={formData.vision} onChange={handleChange} rows={5} className="w-full px-5 py-4 rounded-2xl bg-emerald-50/30 border border-emerald-100 text-sm font-medium italic outline-none focus:border-emerald-500 transition-all resize-none" />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Mission Pillars</label>
              <div className="space-y-3">
                {formData.missionPoints.map((point, i) => (
                  <div key={i} className="flex gap-3 items-center group">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-black shrink-0">{i+1}</div>
                    <input 
                      value={point} 
                      onChange={(e) => handleListChange(i, e.target.value, 'missionPoints')} 
                      className="flex-1 bg-transparent border-b border-gray-100 py-2 text-sm outline-none focus:border-emerald-500 transition-all" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Impact Areas */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-amber-600 uppercase tracking-widest px-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            4. Key Impact Areas
          </h3>
          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
            {formData.impactAreas.map((area, i) => (
              <div key={area.id} className="p-6 rounded-3xl bg-amber-50/20 border border-amber-100/30 space-y-3 relative group">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-amber-100 flex items-center justify-center text-amber-600 mb-2">
                  {getIcon(area.icon)}
                </div>
                <input 
                  value={area.title} 
                  onChange={(e) => {
                    const newList = [...formData.impactAreas];
                    newList[i].title = e.target.value;
                    setFormData(prev => ({ ...prev, impactAreas: newList }));
                  }}
                  className="w-full bg-transparent font-black text-gray-800 text-base outline-none" 
                />
                <textarea 
                  value={area.desc} 
                  onChange={(e) => {
                    const newList = [...formData.impactAreas];
                    newList[i].desc = e.target.value;
                    setFormData(prev => ({ ...prev, impactAreas: newList }));
                  }}
                  rows={3} 
                  className="w-full bg-transparent text-xs text-gray-500 outline-none resize-none leading-relaxed" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Recent Initiatives */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-rose-600 uppercase tracking-widest px-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-600" />
            5. Recent Initiatives
          </h3>
          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
            {formData.recentInitiatives.map((init, i) => (
              <div key={init.id} className="p-6 rounded-3xl bg-rose-50/30 border border-rose-100/50 space-y-3 relative group">
                <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center text-xs font-black">{i+1}</div>
                <input 
                  value={init.title} 
                  onChange={(e) => {
                    const newList = [...formData.recentInitiatives];
                    newList[i].title = e.target.value;
                    setFormData(prev => ({ ...prev, recentInitiatives: newList }));
                  }}
                  className="w-full bg-transparent font-bold text-gray-800 text-sm outline-none" 
                />
                <textarea 
                  value={init.desc} 
                  onChange={(e) => {
                    const newList = [...formData.recentInitiatives];
                    newList[i].desc = e.target.value;
                    setFormData(prev => ({ ...prev, recentInitiatives: newList }));
                  }}
                  rows={2}
                  className="w-full bg-transparent text-[10px] text-gray-400 outline-none resize-none" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: Partner With Us */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest px-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            6. Partnership Call-to-Action
          </h3>
          <div className="bg-[#0F172A] rounded-[2.5rem] p-12 border border-slate-800 shadow-xl relative overflow-hidden group">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            
            <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto space-y-6">
               <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <Handshake className="w-8 h-8" />
               </div>
               
               <div className="space-y-4 w-full">
                  <input 
                    name="partnerTitle" 
                    value={formData.partnerTitle} 
                    onChange={handleChange} 
                    className="w-full text-3xl font-black text-white bg-transparent outline-none text-center" 
                    placeholder="Partner With Us"
                  />
                  <textarea 
                    name="partnerDesc" 
                    value={formData.partnerDesc} 
                    onChange={handleChange} 
                    rows={2} 
                    className="w-full text-base text-slate-400 bg-transparent outline-none resize-none leading-relaxed text-center font-medium"
                    placeholder="We welcome collaboration with educational institutions, NGOs, and community organizations..."
                  />
               </div>

               <div className="pt-4 w-full flex flex-col items-center gap-4">
                  <button className="px-10 py-4 bg-white text-[#0F172A] rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-2xl hover:scale-105 transition-all">
                    Explore Partnership
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    Response time: ~48 Hours
                  </p>
               </div>
            </div>
          </div>
        </div>

        {/* Section 7: CSR Investment */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-purple-600 uppercase tracking-widest px-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-600" />
            7. Investment Overview
          </h3>
          <div className="bg-slate-900 rounded-[2.5rem] p-10 border border-slate-800 shadow-xl space-y-8">
            <div className="flex items-center gap-4 text-white">
               <Coins className="w-8 h-8 text-purple-400" />
               <input name="investmentTitle" value={formData.investmentTitle} onChange={handleChange} className="text-xl font-bold bg-transparent outline-none flex-1" />
            </div>
            <div className="grid grid-cols-2 gap-8">
               {formData.investmentStats.map((stat, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-slate-800/50 border border-slate-700/50">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">{stat.label}</label>
                     <input 
                        value={stat.value} 
                        onChange={(e) => {
                          const newList = [...formData.investmentStats];
                          newList[i].value = e.target.value;
                          setFormData(prev => ({ ...prev, investmentStats: newList }));
                        }}
                        className="text-3xl font-black text-purple-400 bg-transparent outline-none w-full" 
                     />
                  </div>
               ))}
            </div>
          </div>
        </div>

        {/* Section 8: Governance */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            8. Governance & Roadmap
          </h3>
          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10">
             <div className="space-y-4">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Regulatory Framework</label>
                <textarea name="governance" value={formData.governance} onChange={handleChange} rows={5} className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 text-sm font-medium outline-none focus:border-slate-500 transition-all resize-none" />
             </div>
             <div className="space-y-4">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Future Roadmap</label>
                <div className="space-y-3">
                   {formData.futureRoadmap.map((item, i) => (
                      <div key={i} className="flex gap-3 items-center group">
                         <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-black shrink-0">{i+1}</div>
                         <input 
                           value={item} 
                           onChange={(e) => handleListChange(i, e.target.value, 'futureRoadmap')} 
                           className="flex-1 bg-transparent border-b border-gray-100 py-2 text-sm outline-none focus:border-slate-500 transition-all" 
                         />
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Full Landscape Sequence Preview Modal */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/95 flex items-center justify-center p-4 md:p-8 overflow-hidden backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="w-full h-full max-w-[1400px] bg-[#F8FAFC] rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden relative border border-white/10"
            >
              {/* Browser-style Header */}
              <div className="h-14 bg-slate-900 flex items-center justify-between px-8 text-white shrink-0">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="ml-6 bg-slate-800 px-4 py-1.5 rounded-lg text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Globe className="w-3 h-3" />
                    bihar-text-book.vercel.app/csr-policy
                  </div>
                </div>
                <button 
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-1.5 hover:bg-slate-800 rounded-xl transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sequential Page Content */}
              <div className="flex-1 overflow-y-auto scrollbar-hide bg-white">
                {/* 1. HERO SECTION */}
                <section className="bg-gradient-to-br from-[#1E293B] to-[#1E40AF] py-32 px-12 text-center text-white relative">
                   <motion.h2 className="text-6xl font-black mb-8 leading-tight max-w-5xl mx-auto">
                     {formData.heroTitle}
                   </motion.h2>
                   <div className="w-32 h-2.5 bg-blue-500 mx-auto rounded-full mb-10 shadow-[0_0_30px_rgba(59,130,246,0.6)]" />
                   <p className="text-xl text-blue-100/70 max-w-2xl mx-auto leading-relaxed font-light">{formData.heroSubtitle}</p>
                </section>

                {/* 2. ABOUT & SOCIAL LEADERSHIP */}
                <section className="py-24 px-20 max-w-7xl mx-auto relative -mt-20">
                  <div className="bg-white rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] p-16 flex flex-col lg:flex-row gap-16 border border-gray-100">
                    <div className="flex-1 space-y-8">
                       <h3 className="text-4xl font-black text-slate-900 leading-tight">
                         About Our <br/>
                         <span className="text-blue-600">CSR Commitment</span>
                       </h3>
                       <div className="space-y-6 text-gray-500 text-lg leading-relaxed">
                          <p>{formData.aboutDescription}</p>
                          <p className="font-light">{formData.aboutSecondaryDesc}</p>
                       </div>
                       <div className="grid grid-cols-2 gap-6 pt-6">
                         {formData.compliancePoints.map(p => (
                            <div key={p.id} className="p-6 rounded-[2rem] bg-gray-50 border border-gray-100">
                               <CheckCircle2 className="w-6 h-6 text-blue-600 mb-4" />
                               <h5 className="font-bold text-gray-900 mb-2">{p.title}</h5>
                               <p className="text-xs text-gray-400">{p.desc}</p>
                            </div>
                         ))}
                       </div>
                    </div>

                    <div className="w-full lg:w-[450px] space-y-6">
                       <div className="bg-slate-950 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full" />
                          <Shield className="w-12 h-12 text-blue-500 mb-8" />
                          <h4 className="text-3xl font-black mb-4 italic tracking-tight">{formData.socialLeadershipTitle}</h4>
                          <p className="text-gray-400 text-sm leading-relaxed mb-10">{formData.socialLeadershipDesc}</p>
                          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                             Download Report <ArrowRight className="w-4 h-4" />
                          </button>
                       </div>

                       <div className="flex gap-6">
                          <div className="flex-1 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl text-center">
                             <div className="text-4xl font-black text-slate-900 mb-2">{formData.stats.districts}</div>
                             <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Districts</div>
                          </div>
                          <div className="flex-1 bg-blue-600 p-8 rounded-[2.5rem] shadow-xl text-white text-center">
                             <div className="text-4xl font-black mb-2">{formData.stats.allocation}</div>
                             <div className="text-[10px] font-bold text-blue-100 uppercase tracking-widest">Allocation</div>
                          </div>
                       </div>
                    </div>
                  </div>
                </section>

                {/* 3. VISION & MISSION */}
                <section className="py-24 px-20 max-w-7xl mx-auto grid grid-cols-2 gap-10">
                   <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm">
                      <Target className="w-12 h-12 text-blue-600 mb-8" />
                      <h4 className="text-2xl font-black text-slate-900 mb-6">Our Vision</h4>
                      <p className="text-xl text-gray-500 leading-relaxed italic font-light">"{formData.vision}"</p>
                   </div>
                   <div className="bg-slate-950 rounded-[3rem] p-12 shadow-2xl">
                      <h4 className="text-2xl font-black text-white mb-10">Our Mission</h4>
                      <div className="space-y-6">
                        {formData.missionPoints.map((p, i) => (
                           <div key={i} className="flex gap-5 items-start">
                              <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
                              <span className="text-gray-300 text-lg font-light">{p}</span>
                           </div>
                        ))}
                      </div>
                   </div>
                </section>

                {/* 4. KEY IMPACT AREAS */}
                <section className="py-32 px-20 bg-slate-50">
                   <div className="max-w-7xl mx-auto">
                      <h3 className="text-4xl font-black text-center text-slate-900 mb-4">Key Impact Areas</h3>
                      <p className="text-center text-gray-500 text-lg font-light mb-20">Strategic descriptions of our focused social interventions.</p>
                      <div className="grid grid-cols-4 gap-8">
                        {formData.impactAreas.map((area) => (
                           <div key={area.id} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all">
                              <div className="w-16 h-16 rounded-[1.5rem] bg-blue-50 flex items-center justify-center text-blue-600 mb-10">
                                 {getIcon(area.icon)}
                              </div>
                              <h4 className="text-2xl font-black text-slate-900 mb-6">{area.title}</h4>
                              <p className="text-gray-500 text-sm leading-relaxed">{area.desc}</p>
                           </div>
                        ))}
                      </div>
                   </div>
                </section>

                {/* 5. RECENT INITIATIVES */}
                <section className="py-32 px-20 bg-white">
                   <div className="max-w-7xl mx-auto">
                      <h3 className="text-4xl font-black text-slate-900 mb-20">Recent <span className="text-blue-600">Initiatives</span></h3>
                      <div className="grid grid-cols-2 gap-10">
                        {formData.recentInitiatives.map((init, i) => (
                           <div key={i} className="bg-[#F8FAFC] p-12 rounded-[3.5rem] border border-gray-100 flex gap-10 items-center">
                              <div className="w-20 h-20 rounded-[2rem] bg-blue-600 text-white flex items-center justify-center text-3xl font-black shrink-0">
                                 {i+1}
                              </div>
                              <div>
                                 <h4 className="text-2xl font-black text-slate-900 mb-2">{init.title}</h4>
                                 <p className="text-gray-500 text-base font-light leading-relaxed">{init.desc}</p>
                              </div>
                           </div>
                        ))}
                      </div>
                   </div>
                </section>

                {/* 6. PARTNER WITH US */}
                <section className="py-32 px-10">
                   <div className="max-w-6xl mx-auto bg-[#0F172A] rounded-[4rem] p-24 text-white text-center relative overflow-hidden shadow-2xl">
                      {/* Grid Dots Pattern */}
                      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#fff 1.2px, transparent 1.2px)', backgroundSize: '32px 32px' }} />
                      
                      <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                         <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto text-blue-400">
                            <Handshake className="w-10 h-10" />
                         </div>
                         <h3 className="text-6xl font-black tracking-tight">{formData.partnerTitle}</h3>
                         <p className="text-xl font-medium text-slate-400 leading-relaxed mx-auto max-w-2xl">{formData.partnerDesc}</p>
                         
                         <div className="pt-6 flex flex-col items-center gap-6">
                            <button className="px-12 py-6 bg-white text-slate-900 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl flex items-center gap-3">
                               Explore Partnership
                               <ArrowRight className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-[0.25em]">
                               <Clock className="w-4 h-4" />
                               Our team typically responds within 48 business hours.
                            </div>
                         </div>
                      </div>
                   </div>
                </section>

                {/* 7. CSR INVESTMENT */}
                <section className="py-32 px-20 bg-slate-950 text-white">
                   <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
                      <div className="flex-1 space-y-6">
                         <h3 className="text-4xl font-black">{formData.investmentTitle}</h3>
                         <p className="text-gray-400 text-xl font-light">BSTBPC maintains absolute transparency in fund allocation and project auditing.</p>
                      </div>
                      <div className="flex gap-8">
                         {formData.investmentStats.map((stat, i) => (
                            <div key={i} className="bg-slate-900 p-12 rounded-[3rem] border border-slate-800 text-center min-w-[200px]">
                               <div className="text-5xl font-black text-purple-400 mb-2">{stat.value}</div>
                               <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
                            </div>
                         ))}
                      </div>
                   </div>
                </section>

                {/* 8. GOVERNANCE (FOOTER) */}
                <section className="py-32 px-20 bg-white border-t border-gray-100">
                   <div className="max-w-7xl mx-auto grid grid-cols-2 gap-20">
                      <div className="space-y-8">
                         <div className="flex items-center gap-4 text-blue-600">
                            <Shield className="w-10 h-10" />
                            <span className="text-xl font-black uppercase tracking-widest">GOVERNANCE</span>
                         </div>
                         <p className="text-2xl font-light text-gray-500 leading-relaxed">
                            {formData.governance}
                         </p>
                      </div>
                      <div className="bg-slate-50 p-12 rounded-[3rem] border border-gray-100">
                         <h4 className="text-xl font-bold mb-10 pb-6 border-b border-gray-200">Future Roadmap</h4>
                         <ul className="space-y-6">
                           {formData.futureRoadmap.map((item, i) => (
                              <li key={i} className="flex gap-4 items-center">
                                 <div className="w-2 h-2 rounded-full bg-blue-500" />
                                 <span className="text-gray-600 text-base">{item}</span>
                              </li>
                           ))}
                         </ul>
                      </div>
                   </div>
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

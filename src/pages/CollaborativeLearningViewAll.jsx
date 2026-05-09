import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, ArrowUpRight, Target, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const initiatives = [
  { id: 1, title: 'Teacher Training Workshop', desc: 'Comprehensive digital pedagogy training for state teachers.', icon: Users, color: 'bg-blue-500' },
  { id: 2, title: 'Innovation Lab Setup', desc: 'Establishing state-of-the-art labs for student research.', icon: Zap, color: 'bg-amber-500' },
  { id: 3, title: 'Regional Curriculum Hub', desc: 'Localized content development for diverse learning needs.', icon: BookOpen, color: 'bg-emerald-500' },
  { id: 4, title: 'Global Exchange Program', desc: 'Connecting Bihar students with global educational experts.', icon: Target, color: 'bg-purple-500' },
];

export default function CollaborativeLearningViewAll() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Header */}
      <div className="bg-slate-900 pt-32 pb-24 px-6 md:px-12 lg:px-24 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-bold text-sm mb-12 transition-all group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            BACK TO HOME
          </Link>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-none">
            Collaborative <span className="text-slate-500">Learning</span> <br /> 
            <span className="text-blue-500">Initiatives</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl font-light leading-relaxed">
            Discover how we are transforming education in Bihar through state-wide collaborations, digital innovations, and inclusive training programs.
          </p>
        </div>
        
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -mr-40 -mt-20" />
      </div>

      {/* Grid Content */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {initiatives.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[32px] p-10 shadow-sm border border-slate-100 group hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500"
            >
              <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center text-white mb-8 shadow-lg shadow-current/20`}>
                <item.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-lg text-slate-500 font-medium leading-relaxed mb-8">
                {item.desc}
              </p>
              <button className="flex items-center gap-2 text-xs font-black text-slate-900 uppercase tracking-widest group-hover:gap-3 transition-all">
                LEARN MORE <ArrowUpRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { 
  Plus, 
  Layout, 
  BookOpen, 
  MessageSquare, 
  Users, 
  Info, 
  Image as ImageIcon, 
  FileText, 
  Bell, 
  Sparkles,
  ArrowRight,
  Shield
} from 'lucide-react';

export default function WebsiteManagementHub({ setActivePage }) {
  const sections = [
    { id: 'opmp', label: 'Platform Sections', sub: 'One Platform Many Possibilities', icon: Layout, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'cl', label: 'Collaborative Learning', sub: 'CL Management & Initiatives', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'ev', label: 'Events & News', sub: 'EV Activities & Updates', icon: MessageSquare, color: 'text-rose-600', bg: 'bg-rose-50' },
    { id: 'ee', label: 'Education Leaders', sub: 'EE Excellence & Leader Profiles', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'ku', label: 'Know Us / Bio', sub: 'KU Identity & Corporate Info', icon: Info, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'gl', label: 'Media Gallery', sub: 'GL Visuals & Photo Albums', icon: ImageIcon, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'dc', label: 'Documents/PDFs', sub: 'DC Repository & Downloads', icon: FileText, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { id: 'nt', label: 'Notices & Tenders', sub: 'NT Official Updates', icon: Bell, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 'csr', label: 'CSR Policy', sub: 'CSR Impact & Governance', icon: Shield, color: 'text-blue-700', bg: 'bg-blue-100' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header Section */}
      <div className="relative bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Decorative background circle */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Grid of Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <motion.button
              key={section.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setActivePage?.(section.id)}
              whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
              whileTap={{ scale: 0.98 }}
              className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm transition-all group flex flex-col items-start text-left"
            >
              <div className={`w-14 h-14 rounded-2xl ${section.bg} flex items-center justify-center ${section.color} mb-6 group-hover:scale-110 transition-transform`}>
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{section.label}</h3>
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-6">{section.sub}</p>
              
              <div className="mt-auto flex items-center gap-2 text-xs font-bold text-blue-600 group-hover:gap-3 transition-all">
                <span>MANAGE CONTENT</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Quick Tips */}
      <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-xl font-bold">Pro Tip: Bulk Uploads</h3>
            <p className="text-gray-400 text-sm mt-2 max-w-sm">
              You can now upload multiple images to the Media Gallery at once by dragging them into the upload zone.
            </p>
          </div>
          <button className="px-6 py-3 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all">
            View Documentation
          </button>
        </div>
      </div>
    </motion.div>
  );
}

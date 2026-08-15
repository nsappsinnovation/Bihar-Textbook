import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Bell,
  Building2,
  UserCog,
  Settings,
  LogOut,
  ChevronLeft,
  Moon,
  BookMarked,
  CreditCard,
  Globe,
  ChevronDown,
  FileText,
  Image as ImageIcon,
  Info,
  Shield,
} from 'lucide-react';

/**
 * Sidebar navigation items configuration grouped by categories
 */
const navGroups = [
  {
    title: 'MANAGEMENT',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { 
        id: 'ee', 
        label: 'Leaders and Educators', 
        icon: Users,
      },
      { 
        id: 'ku', 
        label: 'Know Us', 
        icon: Info,
        hasSubItems: true,
        subItems: [
          { id: 'ku-md-message', label: 'MD Message' },
          { id: 'ku-board', label: 'Board of Directors' },
          { id: 'ku-list-md', label: 'List of MD' },
          { id: 'ku-employee', label: 'Our Employee' },

          // { id: 'ku-printers', label: 'Empanalled Printers' },
        ]
      },
      { 
        id: 'books', 
        label: 'Books Management', 
        icon: BookMarked,
        hasSubItems: true,
        subItems: Array.from({ length: 12 }, (_, i) => ({ id: `book-class-${i + 1}`, label: `Class ${i + 1}` })),
      },
      { 
        id: 'gl', 
        label: 'Gallery', 
        icon: ImageIcon,
        hasSubItems: true,
        subItems: [
          { id: 'gl-photo', label: 'Photo Gallery' },
          { id: 'gl-video', label: 'Video Gallery' },
          { id: 'gl-press', label: 'Press Release' },
        ]
      },
      { id: 'dc-rti', label: 'RTI', icon: FileText },
      { 
        id: 'notice-tender', 
        label: 'Notice & Tender', 
        icon: Bell,
        hasSubItems: true,
        subItems: [
          { id: 'notices', label: 'Notices' },
          { id: 'tenders', label: 'Tenders' },
        ]
      },
      { id: 'csr', label: 'CSR Policy', icon: Shield },
    ]
  },
  {
    title: 'SYSTEM',
    items: [
      { id: 'settings', label: 'Settings', icon: Settings },
    ]
  }
];

export default function Sidebar({ activePage, setActivePage, isMobileOpen, setIsMobileOpen }) {
  const [expandedItems, setExpandedItems] = useState([]); // All sections closed by default
  const [userSettings, setUserSettings] = useState(() => {
    const saved = localStorage.getItem('adminSettings');
    return saved ? JSON.parse(saved) : { firstName: 'Anushka', lastName: 'Nandan', bio: 'ADMIN' };
  });

  useEffect(() => {
    const handleUpdate = () => {
      const saved = localStorage.getItem('adminSettings');
      if (saved) setUserSettings(JSON.parse(saved));
    };

    window.addEventListener('settingsUpdated', handleUpdate);
    return () => window.removeEventListener('settingsUpdated', handleUpdate);
  }, []);

  const handleNavClick = (item) => {
    if (item.hasSubItems) {
      setExpandedItems(prev => 
        prev.includes(item.id) 
          ? prev.filter(i => i !== item.id) 
          : [...prev, item.id]
      );
    } else {
      setActivePage(item.id);
      if (isMobileOpen) setIsMobileOpen(false);
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#F9FAFB] border-r border-gray-200 overflow-hidden">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-5 py-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center">
            <img loading="lazy" decoding="async" src="/logo.webp" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-lg font-extrabold text-[#064E3B] tracking-tight">BSTBPC</span>
        </div>

      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-10 min-h-0 scrollbar-hide" data-lenis-prevent="true">
        {navGroups.map((group) => (
          <div key={group.title}>
            <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-5">
              {group.title}
            </p>
            <div className="space-y-1.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                const isExpanded = expandedItems.includes(item.id);

                return (
                  <div key={item.id} className="space-y-1">
                    <button
                      onClick={() => handleNavClick(item)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 group
                        ${isActive 
                          ? 'bg-[#ECFDF5] text-[#065F46] shadow-sm' 
                          : 'text-[#6B7280] hover:bg-gray-100 hover:text-gray-900'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-[#059669]' : 'text-gray-400 group-hover:text-gray-500'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.hasSubItems && (
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                      )}
                    </button>

                    {/* Sub Items */}
                    <AnimatePresence>
                      {item.hasSubItems && isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-11 space-y-1"
                        >
                          {item.subItems.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => { setActivePage(sub.id); if (isMobileOpen) setIsMobileOpen(false); }}
                              className={`w-full text-left px-3 py-2 rounded-lg text-[12px] font-medium transition-colors
                                ${activePage === sub.id 
                                  ? 'text-[#059669] bg-[#ECFDF5]/50' 
                                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'
                                }
                              `}
                            >
                              {sub.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Profile & Logout */}
      <div className="p-3 mt-auto space-y-4">
        {/* Log out */}
        <button 
          onClick={() => window.location.href = '/'}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-[#6B7280] hover:bg-red-50 hover:text-red-600 transition-all group"
        >
          <LogOut className="w-[18px] h-[18px] text-gray-400 group-hover:text-red-500" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block fixed left-0 top-0 h-screen w-64 z-40">
        {sidebarContent}
      </aside>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', bounce: 0.1, duration: 0.4 }}
              className="fixed left-0 top-0 h-screen w-64 z-50 lg:hidden shadow-2xl"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

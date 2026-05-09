import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Bell,
  MessageSquare,
  Building2,
  UserCog,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  Moon,
  ChevronRight,
  BookMarked,
  CreditCard,
} from 'lucide-react';

/**
 * Sidebar navigation items configuration grouped by categories
 */
const navGroups = [
  {
    title: 'MANAGEMENT',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'books', label: 'Books Management', icon: BookMarked },
      { id: 'officers', label: 'Officers Management', icon: Users },
      { id: 'notices', label: 'Notices & Tenders', icon: Bell },
    ]
  },
  {
    title: 'ORGANIZATION',
    items: [
      { id: 'departments', label: 'Departments', icon: Building2 },
      { id: 'users', label: 'Users & Roles', icon: UserCog },
      { id: 'reports', label: 'Reports & Ledger', icon: CreditCard },
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
  const handleNavClick = (id) => {
    setActivePage(id);
    if (isMobileOpen) setIsMobileOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#F9FAFB] border-r border-gray-200">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-5 py-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 flex items-center justify-center">
            <img src="/bstbpc_logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-xl font-extrabold text-[#064E3B] tracking-tight">BSTBPC</span>
        </div>
        <button className="p-1.5 rounded-lg bg-white border border-gray-100 shadow-sm text-gray-400 hover:text-gray-600 transition-colors">
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-10 scrollbar-hide">
        {navGroups.map((group) => (
          <div key={group.title}>
            <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-5">
              {group.title}
            </p>
            <div className="space-y-3">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
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
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Profile & Logout */}
      <div className="p-3 mt-auto space-y-4">
        {/* User Card */}
        <div className="px-3 py-3 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-emerald-50 flex items-center justify-center text-[#065F46] font-bold text-xs border border-emerald-100">
            AU
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-[#064E3B] truncate">Admin User</p>
            <p className="text-[11px] font-medium text-gray-400 truncate leading-none mt-0.5">Senior Manager</p>
          </div>
        </div>

        {/* Log out */}
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-[#6B7280] hover:bg-red-50 hover:text-red-600 transition-all group">
          <LogOut className="w-[18px] h-[18px] text-gray-400 group-hover:text-red-500" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block fixed left-0 top-0 h-screen w-55 z-40">
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

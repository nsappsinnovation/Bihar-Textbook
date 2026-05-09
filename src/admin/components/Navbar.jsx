import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Menu,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
} from 'lucide-react';
import { useClickOutside } from '../hooks/useCustomHooks';

/**
 * Navbar Component
 * Sticky top navigation bar with search, notifications, and admin profile
 */
export default function Navbar({ isMobileOpen, setIsMobileOpen, activePage }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  useClickOutside(profileRef, () => setShowProfileMenu(false));
  useClickOutside(notifRef, () => setShowNotifications(false));

  // Format current date
  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Page title mapping
  const pageTitles = {
    dashboard: 'Dashboard',
    books: 'Books Management',
    officers: 'Officers Management',
    notices: 'Notices & Announcements',
    messages: 'Messages',
    departments: 'Departments',
    users: 'Users',
    reports: 'Reports',
    settings: 'Settings',
  };

  const dummyNotifications = [
    { id: 1, text: 'New textbook uploaded - Mathematics Class 10', time: '2 min ago', unread: true },
    { id: 2, text: 'Officer profile updated by Rajesh Kumar', time: '15 min ago', unread: true },
    { id: 3, text: 'System maintenance scheduled for tonight', time: '1 hour ago', unread: false },
    { id: 4, text: 'Budget report approved by Finance dept', time: '3 hours ago', unread: false },
  ];

  const unreadCount = dummyNotifications.filter(n => n.unread).length;

  return (
    <header className="sticky top-0 z-30 glass border-b border-gray-200/50">
      <div className="flex items-center justify-between h-[72px] px-4 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
            aria-label="Toggle sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Page Title & Welcome */}
          <div className="hidden sm:block">
            <h2 className="text-xl font-bold text-gray-800">
              {pageTitles[activePage] || 'Dashboard'}
            </h2>
            <p className="text-xs text-gray-500">{currentDate}</p>
          </div>
        </div>

        {/* Center - Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search books, officers, notices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100/80 border border-gray-200/50 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
              id="global-search"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search */}
          <button className="md:hidden w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
            <Search className="w-5 h-5" />
          </button>

          {/* Notification Bell */}
          <div className="relative" ref={notifRef}>
            <motion.button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
              whileTap={{ scale: 0.95 }}
              aria-label="Notifications"
              id="notification-bell"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse-dot">
                  {unreadCount}
                </span>
              )}
            </motion.button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl shadow-black/8 border border-gray-100 overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
                    <p className="text-xs text-gray-500">{unreadCount} new notifications</p>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {dummyNotifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${notif.unread ? 'bg-blue-50/30' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          {notif.unread && (
                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                          )}
                          <div className={!notif.unread ? 'ml-5' : ''}>
                            <p className="text-sm text-gray-700 leading-relaxed">{notif.text}</p>
                            <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2.5 text-center border-t border-gray-100">
                    <button className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-gray-200" />

          {/* Admin Profile */}
          <div className="relative" ref={profileRef}>
            <motion.button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 transition-colors"
              whileTap={{ scale: 0.98 }}
              id="admin-profile"
            >
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-white text-sm font-bold shadow-md shadow-blue-500/20">
                AD
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-gray-800 leading-tight">Admin</p>
                <p className="text-[11px] text-gray-500 leading-tight">Super Admin</p>
              </div>
              <ChevronDown className="hidden sm:block w-4 h-4 text-gray-400" />
            </motion.button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-14 w-56 bg-white rounded-2xl shadow-xl shadow-black/8 border border-gray-100 overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">Admin User</p>
                    <p className="text-xs text-gray-500">admin@bstbpc.gov.in</p>
                  </div>
                  <div className="py-1.5">
                    {[
                      { icon: User, label: 'My Profile' },
                      { icon: Settings, label: 'Settings' },
                    ].map((item) => (
                      <button
                        key={item.label}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors"
                      >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 py-1.5">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

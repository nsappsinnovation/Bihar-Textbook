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
import { useClickOutside, useActivityLog } from '../hooks/useCustomHooks';

/**
 * Navbar Component
 */
export default function Navbar({ isMobileOpen, setIsMobileOpen, activePage, setActivePage, user, onLogout }) {
  const { activities, markAsRead } = useActivityLog();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const searchRef = useRef(null);

  useClickOutside(profileRef, () => setShowProfileMenu(false));
  useClickOutside(notifRef, () => setShowNotifications(false));
  useClickOutside(searchRef, () => setIsSearchFocused(false));

  const unreadCount = activities.filter(a => !a.read).length;
  const userName = user?.fullName || 'Admin';
  const userInitials = userName.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();

  const handleNotifClick = (notif) => {
    markAsRead(notif.id);
    setActivePage('notifications');
    setShowNotifications(false);
  };

  const searchSuggestions = [
    { type: 'Page', title: 'Upload New Textbook', link: 'books' },
    { type: 'Setting', title: 'Email Notifications', link: 'settings' },
    { type: 'Quick Link', title: 'Manage Notices', link: 'notices' },
  ].filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) && searchQuery.length > 1);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm shadow-black/[0.02]">
      <div className="flex items-center justify-between h-[80px] px-4 lg:px-10">
        {/* Left Section */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-all border border-gray-100"
          >
            <Menu className="w-5.5 h-5.5" />
          </button>

          <div className="hidden sm:block">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Dashboard</h2>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
        </div>

        {/* Center - Advanced Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-xl mx-12 relative" ref={searchRef}>
          <div className={`relative w-full transition-all duration-300 ${isSearchFocused ? 'scale-[1.02]' : ''}`}>
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors ${isSearchFocused ? 'text-blue-600' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search books, notices..."
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-50 border-2 border-transparent text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500/10 focus:ring-4 focus:ring-blue-500/[0.03] transition-all"
            />
          </div>

          {/* Search Suggestions Dropdown */}
          <AnimatePresence>
            {isSearchFocused && searchQuery.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-16 left-0 right-0 bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 overflow-hidden py-2"
              >
                {searchSuggestions.length > 0 ? searchSuggestions.map((s, i) => (
                  <button 
                    key={i} 
                    onClick={() => { setActivePage(s.link); setIsSearchFocused(false); }}
                    className="w-full px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">{s.type}</span>
                      <span className="text-sm font-semibold text-gray-800">{s.title}</span>
                    </div>
                    <ChevronDown className="-rotate-90 w-4 h-4 text-gray-300" />
                  </button>
                )) : (
                  <div className="px-5 py-4 text-center text-sm text-gray-400">No results found for "{searchQuery}"</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <div className="relative" ref={notifRef}>
            <motion.button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-all border border-gray-100"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5.5 h-5.5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-4 ring-white">
                  {unreadCount}
                </span>
              )}
            </motion.button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.95 }}
                  className="absolute right-0 top-14 w-85 bg-white rounded-3xl shadow-2xl shadow-black/15 border border-gray-100 overflow-hidden"
                >
                  <div className="px-6 py-5 bg-gray-50/50 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-gray-900">Notifications</h3>
                      
                    </div>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                    {activities.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => handleNotifClick(notif)}
                        className={`px-6 py-4 border-b border-gray-50 hover:bg-gray-50/80 transition-colors cursor-pointer group relative ${!notif.read ? 'bg-blue-50/20' : ''}`}
                      >
                        {!notif.read && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />
                        )}
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 transition-all ${!notif.read ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                            {notif.avatar}
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm leading-snug ${!notif.read ? 'text-gray-900 font-bold' : 'text-gray-800 font-semibold'}`}>{notif.action}</p>
                            <p className="text-[11px] text-gray-400 mt-1 font-medium">{notif.time} • {notif.user}</p>
                          </div>
                          {!notif.read && (
                            <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => { setActivePage('notifications'); setShowNotifications(false); }}
                    className="w-full py-4 text-xs font-bold text-blue-600 hover:bg-blue-50/50 transition-colors border-t border-gray-100"
                  >
                    View All Notifications
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-gray-100" />

          {/* Admin Profile */}
          <div className="relative" ref={profileRef}>
            <motion.button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 pl-2 pr-4 py-2 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-xs font-black">
                {userInitials}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-bold text-gray-900 leading-tight">{userName}</p>
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mt-0.5">Admin</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-300 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
            </motion.button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.95 }}
                  className="absolute right-0 top-14 w-60 bg-white rounded-3xl shadow-2xl shadow-black/15 border border-gray-100 overflow-hidden"
                >
                  <div className="px-6 py-5 border-b border-gray-50 bg-gray-50/30">
                    <p className="text-sm font-bold text-gray-900">{userName}</p>
                    <p className="text-xs text-gray-500 font-medium">{user?.email}</p>
                  </div>
                  <div className="py-2">
                    {[
                      { icon: User, label: 'My Profile', action: () => setActivePage('settings') },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={() => { item.action(); setShowProfileMenu(false); }}
                        className="w-full flex items-center gap-3.5 px-6 py-3 text-sm font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all"
                      >
                        <item.icon className="w-4.5 h-4.5" />
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-gray-50 py-2">
                    <button 
                      onClick={onLogout}
                      className="w-full flex items-center gap-3.5 px-6 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
                    >
                      <LogOut className="w-4.5 h-4.5" />
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

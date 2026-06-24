import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Info, 
  Shield, 
  AlertTriangle,
  Eye,
  Check,
  X
} from 'lucide-react';
import { useActivityLog } from '../hooks/useCustomHooks';
import Modal from '../components/Modal';

/**
 * Notifications Management Page
 * Displays all system notifications with deletion and read/unread capabilities
 */
export default function NotificationsPage({ setActivePage }) {
  const { activities, removeActivity, clearAllActivities, markAsRead } = useActivityLog();
  const [selectedNotif, setSelectedNotif] = useState(null);

  const getIcon = (type) => {
    switch (type) {
      case 'upload': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'delete': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'edit': return <Info className="w-5 h-5 text-blue-500" />;
      case 'create': return <CheckCircle className="w-5 h-5 text-indigo-500" />;
      default: return <Bell className="w-5 h-5 text-indigo-500" />;
    }
  };

  const handleView = (notif) => {
    if (!notif.read) {
      markAsRead(notif.id);
    }
    
    if (notif.link) {
      setActivePage(notif.link);
    } else {
      setSelectedNotif(notif);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Notifications</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Manage and track all system-wide activities</p>
        </div>
        <button 
          onClick={clearAllActivities}
          className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 rounded-xl font-bold text-sm hover:bg-red-100 transition-all border border-red-100"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear All History</span>
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-50">
          <AnimatePresence initial={false}>
            {activities.map((notif, index) => (
              <motion.div
                key={notif.id}
                layout
                onClick={() => handleView(notif)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: 20 }}
                className={`group flex items-start gap-5 p-6 transition-all relative cursor-pointer hover:bg-gray-50 ${notif.read ? 'bg-white' : 'bg-blue-50/30'}`}
              >
                {/* Status Indicator */}
                {!notif.read && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />
                )}

                {/* Icon Wrapper */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform ${notif.read ? 'bg-gray-50' : 'bg-white shadow-sm'}`}>
                  {getIcon(notif.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h3 className={`text-base font-bold truncate pr-10 ${notif.read ? 'text-gray-600 font-semibold' : 'text-gray-900'}`}>
                        {notif.action}
                      </h3>
                      
                      <div className="flex items-center flex-wrap gap-4 mt-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                          <Shield className="w-3.5 h-3.5" />
                          {notif.user}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                          <Clock className="w-3.5 h-3.5" />
                          {notif.time}
                        </div>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-tighter ${
                          notif.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {notif.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleView(notif); }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all tooltip"
                        title="View Details"
                      >
                        <Eye className="w-4.5 h-4.5" />
                      </button>
                      
                      {!notif.read && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); markAsRead(notif.id); }}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                          title="Mark as Read"
                        >
                          <Check className="w-4.5 h-4.5" />
                        </button>
                      )}

                      <button 
                        onClick={(e) => { e.stopPropagation(); removeActivity(notif.id); }}
                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {activities.length === 0 && (
            <div className="py-24 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No Notifications</h3>
              <p className="text-gray-400 text-sm mt-1">You're all caught up! New activities will appear here.</p>
            </div>
          )}
        </div>
      </div>

      {/* Notification Details Modal */}
      <Modal 
        isOpen={!!selectedNotif} 
        onClose={() => setSelectedNotif(null)} 
        title="Notification Details"
      >
        {selectedNotif && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                {getIcon(selectedNotif.type)}
              </div>
              <div>
                <h4 className="text-lg font-black text-gray-900 leading-tight">{selectedNotif.action}</h4>
                <p className="text-sm text-gray-500 font-medium">{selectedNotif.time}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-gray-100 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">User</p>
                <p className="text-sm font-bold text-gray-900">{selectedNotif.user}</p>
              </div>
              <div className="p-4 border border-gray-100 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                <p className="text-sm font-bold text-emerald-600 uppercase tracking-tighter">{selectedNotif.status}</p>
              </div>
            </div>

            <div className="p-4 border border-gray-100 rounded-2xl">
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Activity Type</p>
               <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg uppercase">
                    {selectedNotif.type}
                  </span>
               </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button 
                onClick={() => setSelectedNotif(null)}
                className="px-6 py-3 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
}

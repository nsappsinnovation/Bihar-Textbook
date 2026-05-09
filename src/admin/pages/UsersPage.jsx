import { motion } from 'framer-motion';
import { UserCog, Plus } from 'lucide-react';

export default function UsersPage({ addToast }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center h-[calc(100vh-140px)]"
    >
      <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-6">
        <UserCog className="w-12 h-12 text-blue-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Users Management</h2>
      <p className="text-gray-500 text-center max-w-md mb-8">
        Manage system users, roles, and permissions. This module is currently under development.
      </p>
      <motion.button
        onClick={() => addToast('Feature coming soon!', 'info')}
        className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white text-sm font-semibold shadow-lg shadow-blue-500/20"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus className="w-5 h-5" />
        Invite User
      </motion.button>
    </motion.div>
  );
}

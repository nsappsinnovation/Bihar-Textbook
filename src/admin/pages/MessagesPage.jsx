import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Reply, Trash2, Archive, Star, Send,
  MessageSquare, ChevronLeft,
} from 'lucide-react';
import { messages } from '../data/dummyData';

const avatarColors = [
  'from-blue-500 to-blue-700',
  'from-indigo-500 to-indigo-700',
  'from-cyan-500 to-cyan-700',
  'from-emerald-500 to-emerald-700',
  'from-amber-500 to-amber-700',
  'from-rose-500 to-rose-700',
];

/**
 * Messages Page
 * Inbox-style message system with conversation list and message preview
 */
export default function MessagesPage({ addToast }) {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');
  const [showMobileMessage, setShowMobileMessage] = useState(false);

  const filteredMessages = messages.filter(msg =>
    msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectMessage = (msg) => {
    setSelectedMessage(msg);
    setShowMobileMessage(true);
  };

  const handleBack = () => {
    setShowMobileMessage(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your inbox and conversations</p>
      </div>

      <div className="bg-white rounded-2xl shadow-card border border-gray-100/50 overflow-hidden h-[calc(100vh-220px)] min-h-[500px] flex">
        {/* Conversation List */}
        <div className={`w-full lg:w-[380px] border-r border-gray-100 flex flex-col ${showMobileMessage ? 'hidden lg:flex' : 'flex'}`}>
          {/* Search */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
                id="search-messages"
              />
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto">
            {filteredMessages.map((msg, index) => (
              <motion.button
                key={msg.id}
                onClick={() => handleSelectMessage(msg)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 }}
                className={`w-full text-left px-4 py-3.5 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                  selectedMessage?.id === msg.id ? 'bg-blue-50/50 border-l-2 border-l-blue-500' : ''
                } ${!msg.read ? 'bg-blue-50/20' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {msg.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-sm truncate ${!msg.read ? 'font-bold text-gray-800' : 'font-medium text-gray-700'}`}>
                        {msg.sender}
                      </p>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {msg.starred && <Star className="w-3 h-3 text-amber-400 fill-amber-400" />}
                        <span className="text-[11px] text-gray-400">{msg.time}</span>
                      </div>
                    </div>
                    <p className={`text-xs mt-0.5 truncate ${!msg.read ? 'font-semibold text-gray-700' : 'text-gray-600'}`}>
                      {msg.subject}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">{msg.preview}</p>
                  </div>
                  {!msg.read && (
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Message Content */}
        <div className={`flex-1 flex flex-col ${showMobileMessage ? 'flex' : 'hidden lg:flex'}`}>
          {selectedMessage ? (
            <>
              {/* Message Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-4">
                <button
                  onClick={handleBack}
                  className="lg:hidden w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-gray-800 truncate">{selectedMessage.subject}</h3>
                  <p className="text-xs text-gray-500">{selectedMessage.sender} • {selectedMessage.date}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => addToast('Message starred', 'info')}
                    className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-amber-50 hover:text-amber-500 transition-colors"
                    title="Star"
                  >
                    <Star className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => addToast('Message archived', 'info')}
                    className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    title="Archive"
                  >
                    <Archive className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => addToast('Message deleted', 'error')}
                    className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message Body */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${avatarColors[selectedMessage.id % avatarColors.length]} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                    {selectedMessage.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{selectedMessage.sender}</p>
                    <p className="text-xs text-gray-400">{selectedMessage.time} • {selectedMessage.date}</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-5">
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {selectedMessage.fullMessage}
                  </p>
                </div>
              </div>

              {/* Reply Section */}
              <div className="px-6 py-4 border-t border-gray-100">
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <textarea
                      placeholder="Type your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all resize-none"
                      id="reply-input"
                    />
                  </div>
                  <motion.button
                    onClick={() => {
                      if (replyText.trim()) {
                        addToast('Reply sent!', 'success');
                        setReplyText('');
                      }
                    }}
                    className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white shadow-lg shadow-blue-500/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-base font-semibold text-gray-500">Select a message</p>
              <p className="text-sm text-gray-400 mt-1 text-center max-w-xs">
                Choose a conversation from the list to read and reply to messages
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

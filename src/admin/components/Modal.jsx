import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

/**
 * Reusable Modal Component
 * Supports animated open/close transitions with backdrop blur
 */
export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`fixed inset-0 z-50 flex items-center justify-center p-4`}
            onClick={onClose}
          >
            <div
              className={`${sizeClasses[size]} w-full bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                <motion.button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors"
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-6 py-5">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Reusable Form Input
 */
export function FormInput({ label, type = 'text', placeholder, value, onChange, required = false, id, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const [rect, setRect] = useState(null);

  const handleToggle = () => {
    if (containerRef.current) {
      setRect(containerRef.current.getBoundingClientRect());
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen && containerRef.current) {
        setRect(containerRef.current.getBoundingClientRect());
      }
    };
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isOpen]);

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all resize-none"
        />
      ) : type === 'file' ? (
        <div className="w-full px-4 py-6 rounded-xl border-2 border-dashed border-gray-200 text-center hover:border-blue-300 transition-colors cursor-pointer">
          <p className="text-sm text-gray-500">
            <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-400 mt-1">PDF, PNG, JPG up to 10MB</p>
        </div>
      ) : type === 'select' ? (
        <div className="relative" ref={containerRef}>
          <div 
            onClick={handleToggle}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white flex justify-between items-center cursor-pointer hover:border-blue-300 transition-all focus:ring-2 focus:ring-blue-500/20"
          >
            <span className={value ? "text-gray-800 font-medium" : "text-gray-400"}>
              {value || placeholder || 'Select...'}
            </span>
            <svg className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
          {rect && typeof document !== 'undefined' && createPortal(
            <AnimatePresence>
              {isOpen && (
                <>
                  <div className="fixed inset-0 z-[100]" onClick={() => setIsOpen(false)}></div>
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: 'fixed',
                      top: rect.bottom + 8,
                      left: rect.left,
                      width: rect.width,
                    }}
                    className="z-[110] bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto origin-top"
                  >
                    {placeholder && (
                      <div 
                        className="px-4 py-2.5 text-sm text-gray-400 hover:bg-gray-50 cursor-pointer border-b border-gray-50"
                        onClick={() => { onChange(''); setIsOpen(false); }}
                      >
                        {placeholder}
                      </div>
                    )}
                    {options && options.map(opt => (
                      <div 
                        key={opt.value || opt}
                        className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-blue-50 transition-colors ${value === (opt.value || opt) ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-700 font-medium'}`}
                        onClick={() => { onChange(opt.value || opt); setIsOpen(false); }}
                      >
                        {opt.label || opt}
                      </div>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>,
            document.body
          )}
        </div>
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
        />
      )}
    </div>
  );
}

/**
 * Reusable Toggle Switch
 */
export function ToggleSwitch({ label, checked, onChange, id }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
      <button
        id={id}
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

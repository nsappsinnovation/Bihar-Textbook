import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, Upload } from 'lucide-react';
import Modal from '../components/Modal';
import { useActivityLog } from '../hooks/useCustomHooks';

/**
 * Register Printers Management Page
 * Just for managing the Official Printer Registry PDF
 */
export default function RegisterPrintersPage({ addToast }) {
  const { logActivity } = useActivityLog();
  const storageKey = 'website_registered_printers_pdf';

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : {
      officialList: { pdfUrl: '/printer.pdf', fileName: 'REGISTERED_PRINTERS.PDF' }
    };
  });

  const saveToStorage = (updated) => {
    try {
      setData(updated);
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (err) {
      console.error('Storage Error:', err);
      addToast?.('File is too large for browser storage. Please use a smaller PDF.', 'error');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.type !== 'application/pdf') {
      addToast?.('Please upload a valid PDF file', 'error');
      return;
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB Limit
      addToast?.('File too large. Maximum size is 2MB.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = { officialList: { pdfUrl: reader.result, fileName: file.name } };
      saveToStorage(updated);
      addToast?.('Registered Printers PDF updated successfully', 'success');
      logActivity('Updated Registered Printers PDF', 'Admin', 'upload');
    };
    reader.readAsDataURL(file);
  };

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewUrl, setViewUrl] = useState('');

  const viewPdf = () => {
    if (!data.officialList.pdfUrl) {
      addToast?.('No PDF file uploaded yet', 'info');
      return;
    }

    try {
      const pdfUrl = data.officialList.pdfUrl;
      if (pdfUrl.startsWith('/')) {
        setViewUrl(pdfUrl);
        setIsViewModalOpen(true);
        return;
      }
      const bin = atob(pdfUrl.split(',')[1]);
      const array = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) {
        array[i] = bin.charCodeAt(i);
      }
      const blob = new Blob([array], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setViewUrl(url);
      setIsViewModalOpen(true);
    } catch (err) {
      console.error('View Error:', err);
      addToast?.('Error preparing PDF viewer', 'error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-20"
    >
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-widest">Official Printer Registry</h3>
            <p className="text-sm text-gray-400 font-medium mt-1">Manage the central directory PDF document for registered printers</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={viewPdf}
              className="px-6 py-3 bg-gray-50 text-gray-700 hover:text-blue-600 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              <span>Preview PDF</span>
            </button>
          </div>
        </div>

        <div className="p-12 flex flex-col items-center justify-center text-center bg-gray-50/30">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mb-6 shadow-inner">
            <FileText className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-black text-gray-900 mb-2">{data.officialList.fileName}</h4>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">Currently Active Document</p>
          
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>Upload New PDF</span>
              <input 
                type="file" 
                accept="application/pdf"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isViewModalOpen} 
        onClose={() => setIsViewModalOpen(false)} 
        title="Document Preview"
      >
        <div className="w-full h-[60vh] bg-gray-100 rounded-2xl overflow-hidden mt-4">
          <iframe 
            src={`${viewUrl}#toolbar=0`} 
            className="w-full h-full border-none"
            title="PDF Preview"
          />
        </div>
        <div className="mt-6 flex justify-end">
          <button onClick={() => setIsViewModalOpen(false)} className="px-6 py-3 rounded-2xl bg-gray-900 text-white text-sm font-black uppercase tracking-widest hover:bg-black transition-all">
            Close Preview
          </button>
        </div>
      </Modal>
    </motion.div>
  );
}

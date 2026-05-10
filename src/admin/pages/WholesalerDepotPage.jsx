import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Phone, 
  FileText, 
  Download, 
  Eye, 
  Plus, 
  Trash2, 
  Edit2, 
  Upload,
  Search,
  LayoutGrid,
  CheckCircle2,
  Users
} from 'lucide-react';
import Modal, { FormInput } from '../components/Modal';
import { useActivityLog } from '../hooks/useCustomHooks';

/**
 * Wholeseller & Depot Network Management Page
 * Matches the 'Wholeseller & Depot Network' layout
 */
export default function WholesalerDepotPage({ addToast }) {
  const { logActivity } = useActivityLog();
  const storageKey = 'website_wholesaler_depot';

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : {
      stats: { depots: '38', wholesalers: '450+' },
      officialList: { pdfUrl: '', fileName: 'WHOLESALER_DIRECTORY.PDF' },
      hubs: [
        { id: 1, name: 'Patna Central Depot', type: 'Main Depot', location: 'Budh Marg, Patna', contact: '0612-2221975' },
        { id: 2, name: 'Muzaffarpur Regional Centre', type: 'Regional', location: 'Mithanpura, Muzaffarpur', contact: '0621-2245678' },
        { id: 3, name: 'Gaya Distribution Point', type: 'Regional', location: 'Civil Lines, Gaya', contact: '0631-2223456' },
        { id: 4, name: 'Bhagalpur Storage Hub', type: 'Regional', location: 'Adampur, Bhagalpur', contact: '0641-2227890' },
      ]
    };
  });

  const [isHubModalOpen, setIsHubModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [editingHub, setEditingHub] = useState(null);
  const [hubFormData, setHubFormData] = useState({ name: '', type: 'Main Depot', location: '', contact: '' });
  const [statsFormData, setStatsFormData] = useState({ depots: '', wholesalers: '' });

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
      const updated = { ...data, officialList: { ...data.officialList, pdfUrl: reader.result, fileName: file.name } };
      saveToStorage(updated);
      addToast?.('Directory PDF updated successfully', 'success');
      logActivity('Updated Wholesaler Directory PDF', 'Admin', 'upload');
    };
    reader.readAsDataURL(file);
  };

  const handleOpenStats = () => {
    setStatsFormData({ ...data.stats });
    setIsStatsModalOpen(true);
  };


  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewUrl, setViewUrl] = useState('');

  const viewPdf = () => {
    if (!data.officialList.pdfUrl) {
      addToast?.('No PDF file uploaded yet', 'info');
      return;
    }

    try {
      const base64 = data.officialList.pdfUrl;
      const bin = atob(base64.split(',')[1]);
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

  const handleSaveStats = () => {
    const updated = { ...data, stats: statsFormData };
    saveToStorage(updated);
    setIsStatsModalOpen(false);
    addToast?.('Network stats updated', 'success');
    logActivity('Updated Wholesaler/Depot Stats', 'Admin', 'edit');
  };

  const handleOpenAddHub = () => {
    setEditingHub(null);
    setHubFormData({ name: '', type: 'Main Depot', location: '', contact: '' });
    setIsHubModalOpen(true);
  };

  const handleOpenEditHub = (hub) => {
    setEditingHub(hub);
    setHubFormData({ ...hub });
    setIsHubModalOpen(true);
  };

  const handleSaveHub = () => {
    if (!hubFormData.name || !hubFormData.location) {
      addToast?.('Please fill all fields', 'error');
      return;
    }

    let updatedHubs;
    if (editingHub) {
      updatedHubs = data.hubs.map(h => h.id === editingHub.id ? { ...h, ...hubFormData } : h);
      addToast?.('Hub updated', 'success');
    } else {
      updatedHubs = [...data.hubs, { id: Date.now(), ...hubFormData }];
      addToast?.('New hub added', 'success');
    }
    
    saveToStorage({ ...data, hubs: updatedHubs });
    setIsHubModalOpen(false);
    logActivity(`${editingHub ? 'Updated' : 'Added'} Hub: ${hubFormData.name}`, 'Admin', editingHub ? 'edit' : 'create', 'ku-wholeseller');
  };

  const handleDeleteHub = (id) => {
    const updatedHubs = data.hubs.filter(h => h.id !== id);
    saveToStorage({ ...data, hubs: updatedHubs });
    addToast?.('Hub removed', 'info');
    logActivity('Removed a distribution hub', 'Admin', 'delete', 'ku-wholeseller');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-20"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Wholeseller & Depot Network</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Manage distribution hubs and official directory PDF</p>
        </div>
      </div>

      {/* Main Management Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* PDF Management Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm h-full flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl w-fit">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-gray-900">Official Directory</h3>
              <p className="text-xs text-gray-400 font-bold leading-relaxed">
                Upload the latest PDF directory of authorized wholesalers and depots for public access.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Download className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active File</p>
                    <p className="text-sm font-bold text-gray-700 truncate">{data.officialList.fileName}</p>
                  </div>
                  <button 
                    onClick={viewPdf}
                    className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center justify-center shrink-0"
                    title="View PDF"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <label className="block w-full cursor-pointer group">
                <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
                <div className="flex items-center justify-center gap-3 px-6 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20">
                  <Upload className="w-4 h-4" />
                  <span>Update Directory</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Stats Summary Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 h-fit">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative group">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl w-fit mb-6">
              <Building2 className="w-6 h-6" />
            </div>
            <h4 className="text-3xl font-black text-gray-900 mb-1">{data.stats.depots}</h4>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">District Depots</p>
            <button 
              onClick={handleOpenStats}
              className="absolute top-8 right-8 p-2.5 text-gray-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative group">
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl w-fit mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="text-3xl font-black text-gray-900 mb-1">{data.stats.wholesalers}</h4>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Authorized Wholesalers</p>
            <button 
              onClick={handleOpenStats}
              className="absolute top-8 right-8 p-2.5 text-gray-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Hubs Registry */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-widest">Major Hubs Registry</h3>
            <p className="text-sm text-gray-400 font-medium mt-1">Manage strategic distribution locations across Bihar</p>
          </div>
          <button 
            onClick={handleOpenAddHub}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-gray-900/10"
          >
            <Plus className="w-4 h-4" />
            <span>Register New Hub</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">Depot Name</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">Type</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">Location</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence>
                {data.hubs.map((hub) => (
                  <motion.tr 
                    key={hub.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="group hover:bg-gray-50/30 transition-colors"
                  >
                    <td className="px-8 py-5">
                      <span className="text-sm font-black text-gray-900">{hub.name}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-wider ${
                        hub.type === 'Main Depot' ? 'bg-blue-50 text-blue-600' : 'bg-indigo-50 text-indigo-600'
                      }`}>
                        {hub.type}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm text-gray-500 font-bold">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-gray-300" />
                        {hub.location}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleOpenEditHub(hub)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteHub(hub.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Hub Modal */}
      <Modal 
        isOpen={isHubModalOpen} 
        onClose={() => setIsHubModalOpen(false)} 
        title={editingHub ? "Edit Hub Details" : "Register New Hub"} 
      >
        <div className="space-y-5">
          <FormInput 
            label="Hub Name" 
            placeholder="e.g. Patna Central Depot" 
            value={hubFormData.name}
            onChange={(val) => setHubFormData(prev => ({ ...prev, name: val }))}
          />
          <div className="grid grid-cols-2 gap-4">
             <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Hub Type</label>
              <select 
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none text-sm font-bold text-gray-700 focus:ring-2 focus:ring-blue-500/20 transition-all"
                value={hubFormData.type}
                onChange={(e) => setHubFormData(prev => ({ ...prev, type: e.target.value }))}
              >
                <option value="Main Depot">Main Depot</option>
                <option value="Regional">Regional</option>
                <option value="District">District</option>
              </select>
            </div>
            <FormInput 
              label="Contact Number" 
              placeholder="e.g. 0612-2221975" 
              value={hubFormData.contact}
              onChange={(val) => setHubFormData(prev => ({ ...prev, contact: val }))}
            />
          </div>
          <FormInput 
            label="Location" 
            placeholder="e.g. Budh Marg, Patna" 
            value={hubFormData.location}
            onChange={(val) => setHubFormData(prev => ({ ...prev, location: val }))}
          />

          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
            <button onClick={() => setIsHubModalOpen(false)} className="px-6 py-3 rounded-2xl text-sm font-bold text-gray-500 hover:bg-gray-100 transition-colors">Cancel</button>
            <button onClick={handleSaveHub} className="px-6 py-3 rounded-2xl bg-blue-600 text-white text-sm font-black shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all">
              {editingHub ? "Update Hub" : "Register Hub"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Stats Modal */}
      <Modal 
        isOpen={isStatsModalOpen} 
        onClose={() => setIsStatsModalOpen(false)} 
        title="Update Network Stats" 
      >
        <div className="space-y-5">
          <FormInput 
            label="District Depots Count" 
            placeholder="e.g. 38" 
            value={statsFormData.depots}
            onChange={(val) => setStatsFormData(prev => ({ ...prev, depots: val }))}
          />
          <FormInput 
            label="Authorized Wholesalers" 
            placeholder="e.g. 450+" 
            value={statsFormData.wholesalers}
            onChange={(val) => setStatsFormData(prev => ({ ...prev, wholesalers: val }))}
          />
          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
            <button onClick={() => setIsStatsModalOpen(false)} className="px-6 py-3 rounded-2xl text-sm font-bold text-gray-500 hover:bg-gray-100 transition-colors">Cancel</button>
            <button onClick={handleSaveStats} className="px-6 py-3 rounded-2xl bg-blue-600 text-white text-sm font-black shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all">Save Stats</button>
          </div>
        </div>
      </Modal>

      {/* PDF View Modal */}
      <Modal 
        isOpen={isViewModalOpen} 
        onClose={() => setIsViewModalOpen(false)} 
        title="Directory Preview" 
      >
        <div className="w-full h-[70vh] bg-gray-50 rounded-2xl overflow-hidden relative border border-gray-100 shadow-inner">
           {viewUrl ? (
             <iframe 
               src={viewUrl} 
               className="w-full h-full border-none" 
               title="PDF Preview"
             />
           ) : (
             <div className="flex items-center justify-center h-full text-gray-400 font-bold">
               Loading Preview...
             </div>
           )}
        </div>
      </Modal>
    </motion.div>
  );
}

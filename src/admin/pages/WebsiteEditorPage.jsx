import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, Edit2, Image as ImageIcon, Link as LinkIcon, FileText } from 'lucide-react';

export default function WebsiteEditorPage({ module, addToast }) {
  const [content, setContent] = useState([]);
  
  const getModuleName = (id) => {
    if (id.startsWith('book-class-')) return `Manage Books - Class ${id.split('-').pop()}`;
    if (id.startsWith('ku-')) {
      const sub = id.split('-').slice(1).join(' ');
      return `Manage ${sub.charAt(0).toUpperCase() + sub.slice(1)}`;
    }
    if (id.startsWith('gl-')) return `Gallery - ${id.split('-').pop().charAt(0).toUpperCase() + id.split('-').pop().slice(1)}`;
    if (id.startsWith('dc-')) return `Documents - ${id.split('-').pop().toUpperCase()}`;
    
    const mapping = {
      opmp: 'One Platform Many Possibilities',
      ku: 'Know Us',
      gl: 'Media Gallery',
      dc: 'Documents Repository',
      csr: 'CSR Policy',
      tr: 'Tools & Resources'
    };
    return mapping[id] || 'Content Editor';
  };

  useEffect(() => {
    const saved = localStorage.getItem(`module_content_${module}`);
    if (saved) {
      setContent(JSON.parse(saved));
    } else {
      // Generate some dummy content if it's a new sub-page
      const dummy = [
        { id: 1, title: `Primary ${getModuleName(module)} entry`, desc: 'This is a sample entry that you can edit or remove.' },
        { id: 2, title: `Secondary ${getModuleName(module)} entry`, desc: 'Manage your website content efficiently here.' }
      ];
      setContent(dummy);
    }
  }, [module]);

  const handleSave = () => {
    localStorage.setItem(`module_content_${module}`, JSON.stringify(content));
    addToast?.('Updated', 'success');
  };

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      title: 'New Content Item',
      desc: 'Edit this description',
      type: 'Custom'
    };
    const updated = [...content, newItem];
    setContent(updated);
    localStorage.setItem(`module_content_${module}`, JSON.stringify(updated));
    addToast?.('Item Added', 'success');
  };

  const removeItem = (id) => {
    const updated = content.filter(i => i.id !== id);
    setContent(updated);
    localStorage.setItem(`module_content_${module}`, JSON.stringify(updated));
    addToast?.('Updated', 'info');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{getModuleName(module)}</h1>
          <p className="text-sm text-gray-500 mt-1">Add, remove, or edit items for this website section</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all">
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-sm hover:bg-blue-700 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-base font-bold text-gray-800">Section Content</h3>
          <button 
            onClick={addItem}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg font-bold text-[11px] uppercase tracking-wider hover:bg-blue-100 transition-all"
          >
            <Plus className="w-3 h-3" />
            Add Item
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl border border-gray-100 bg-gray-50/30 flex items-start justify-between group">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-blue-600 transition-all">
                  {module === 'gl' ? <ImageIcon size={20} /> : module === 'dc' ? <FileText size={20} /> : <LinkIcon size={20} />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-700">{item.title}</h4>
                  <p className="text-[11px] text-gray-400 mt-1 uppercase font-semibold">
                    {item.type || item.desc || 'Active Element'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
          
          {content.length === 0 && (
            <div className="col-span-2 py-12 text-center text-gray-400 font-medium border-2 border-dashed border-gray-100 rounded-3xl">
              No items in this section yet.
            </div>
          )}
        </div>
      </div>
      
      {/* Settings Panel */}
      <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-xl font-bold">Section SEO & Settings</h3>
          <p className="text-gray-400 text-sm mt-2 max-w-lg font-light leading-relaxed">
            Manage meta tags, section visibility, and layout style for the {moduleNames[module]} section on the live website.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-5 bg-blue-600 rounded-full relative p-0.5">
                <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm" />
              </div>
              <span className="text-xs font-bold text-gray-300">Visible on Homepage</span>
            </div>
          </div>
        </div>
        
        {/* Abstract background element */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[80px]" />
      </div>
    </motion.div>
  );
}

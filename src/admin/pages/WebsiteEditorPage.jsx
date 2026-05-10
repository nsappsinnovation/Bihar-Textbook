import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, Edit2, Image as ImageIcon, Link as LinkIcon, FileText } from 'lucide-react';
import Modal, { FormInput } from '../components/Modal';

export default function WebsiteEditorPage({ module, addToast }) {
  const [content, setContent] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ title: '', desc: '', type: '', category: '', size: '', document: '' });
  const [rtiData, setRtiData] = useState({ 
    officer: 'Shri. Rajesh Kumar', 
    phone: '+91 612 222 1975', 
    email: 'rti.bstbpc@bihar.gov.in', 
    address: 'Budh Marg, Patna - 800001' 
  });
  const [mdData, setMdData] = useState({
    name: 'Shri Yatendra Kumar Pal',
    designation: 'Managing Director',
    photo: '/images/KeyParticipants/shri_yatendra_pal.png',
    quote: 'Ensuring that textiles of knowledge reach every student in Bihar, timely and with uncompromised quality.',
    welcomeNote: 'It gives me immense pleasure to connect with all stakeholders through this platform. The Bihar State Text Book Publishing Corporation Ltd. plays a pivotal role in strengthening the foundation of education by ensuring the timely production and distribution of quality textbooks across the state.',
    qualityNote: 'Quality remains at the core of our operations. From manuscript approval to final printing, every stage undergoes strict supervision and inspection.',
    collaboration: 'The successful execution of our responsibilities is possible through the collective efforts of our officers, employees, registered printers, wholesalers, depot staff, and education departments across districts.',
    movingForward: 'As we move ahead, our vision remains clear — to ensure that every student in Bihar receives quality textbooks on time, without compromise.'
  });
  const categoryOptions = ["Stakeholder", "Educational", "Corporate", "HR", "General"];
  
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
    // Reset states when module changes
    setContent([]);
    setRtiData({ 
      officer: 'Shri. Rajesh Kumar', 
      phone: '+91 612 222 1975', 
      email: 'rti.bstbpc@bihar.gov.in', 
      address: 'Budh Marg, Patna - 800001' 
    });

    const saved = localStorage.getItem(`module_content_${module}`);
    let dataLoaded = false;

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (module === 'dc-rti') {
          if (parsed && typeof parsed === 'object' && parsed.officer) {
            setRtiData(parsed);
            dataLoaded = true;
          }
        } else if (module === 'ku-md-message') {
          if (parsed && typeof parsed === 'object' && parsed.name) {
            setMdData(parsed);
            dataLoaded = true;
          }
        } else {
          const parsedArray = Array.isArray(parsed) ? parsed : [];
          if (parsedArray.length === 0 && (module === 'ku-board' || module === 'gl-photo' || module === 'gl-video' || module === 'gl-press' || module === 'ku-list-md' || module === 'ku-officers' || module === 'ku-employees')) {
            dataLoaded = false; 
          } else if (parsedArray.length > 0) {
            setContent(parsedArray);
            dataLoaded = true;
          }
        }
      } catch (e) {
        console.error("Error parsing saved data", e);
      }
    }

    if (!dataLoaded) {
      let dummy = [];
      if (module === 'dc-reg-forms') {
        dummy = [
          { id: 1, title: "Vendor Registration Form", category: "Stakeholder", type: "PDF", size: "1.2 MB" },
          { id: 2, title: "Author Empanelment Application", category: "Educational", type: "PDF", size: "850 KB" },
          { id: 3, title: "Publisher Registration Portal Form", category: "Corporate", type: "DOCX", size: "450 KB" },
          { id: 4, title: "School Textbook Requisition Form", category: "Stakeholder", type: "PDF", size: "1.5 MB" },
          { id: 5, title: "Employee Benefit Claim Form", category: "HR", type: "PDF", size: "620 KB" },
          { id: 6, title: "New Distribution Agency Request", category: "Corporate", type: "PDF", size: "2.1 MB" },
        ];
      } else if (module === 'ku-board') {
        dummy = [
          { id: 1, title: "Shri. S. Siddharth, IAS", designation: "ACS, Dept. of Education (Chairman)", since: "Current", status: "Active" },
          { id: 2, title: "Shri. Sunny Sinha", designation: "Managing Director", since: "Current", status: "Active" },
          { id: 3, title: "Shri. Anand Sharma", designation: "Director, Primary Education", since: "2023", status: "Active" },
          { id: 4, title: "Ms. Rekha Kumari", designation: "Director, Secondary Education", since: "2022", status: "Active" },
          { id: 5, title: "Shri. Manoj Kumar", designation: "Spl. Secretary, Finance Dept.", since: "2023", status: "Active" },
        ];
      } else if (module === 'ku-officers') {
        dummy = [
          { id: 1, title: "Shri. Rajesh Kumar", designation: "Chief Administrative Officer", email: "rajesh.cao@bihar.gov.in", phone: "+91 612 222 1975" },
          { id: 2, title: "Ms. Neha Sharma", designation: "General Manager (Sales)", email: "neha.gm@bstbpc.in", phone: "+91 612 222 1976" },
          { id: 3, title: "Shri. Amit Singh", designation: "Finance Controller", email: "amit.finance@bstbpc.in", phone: "+91 612 222 1977" },
          { id: 4, title: "Shri. Vipul Agarwal", designation: "Production Manager", email: "vipul.prod@bstbpc.in", phone: "+91 612 222 1978" },
          { id: 5, title: "Ms. Priyanka Verma", designation: "Academic Coordinator", email: "priyanka.acad@bstbpc.in", phone: "+91 612 222 1979" },
        ];
      } else if (module === 'ku-employees') {
        dummy = [
          { id: 1, title: "Shri. Manoj Kumar", designation: "Accountant", department: "Finance", employeeId: "EMP001" },
          { id: 2, title: "Ms. Suman Kumari", designation: "Office Assistant", department: "Administration", employeeId: "EMP002" },
          { id: 3, title: "Shri. Rakesh Singh", designation: "Data Entry Operator", department: "Production", employeeId: "EMP003" },
          { id: 4, title: "Ms. Anita Devi", designation: "Clerk", department: "Sales", employeeId: "EMP004" },
        ];
      } else if (module === 'gl-photo') {
        dummy = [
          { id: 1, title: "Bihar Text Book Corporation", document: "/images/hero_classroom.png", span: "col-span-1 md:col-span-2 row-span-2", category: "General" },
          { id: 2, title: "Digital Initiative", document: "/images/hero_digital.png", span: "col-span-1 md:col-span-1 row-span-1", category: "Digital" },
          { id: 3, title: "AI Learning", document: "/images/hero_ai_new.png", span: "col-span-1 md:col-span-1 row-span-1", category: "AI" },
          { id: 4, title: "Audio Books", document: "/images/hero_audio_new.png", span: "col-span-1 md:col-span-1 row-span-2", category: "Audio" },
          { id: 5, title: "Archive Section", document: "/images/hero_archive.png", span: "col-span-1 md:col-span-2 row-span-1", category: "Archive" },
        ];
      } else if (module === 'gl-video') {
        dummy = [
          { id: 1, title: "Bihar Film City Meeting", document: "/gallery/biharFilmCityMeeting.jpeg", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", category: "Meeting" },
          { id: 2, title: "MD Speech Highlights", document: "/gallery/rubymam.jpeg", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", category: "Speech" },
          { id: 3, title: "Event Recording", document: "/gallery/rubymam2.jpeg", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", category: "Event" },
        ];
      } else if (module === 'gl-press') {
        dummy = [
          { id: 1, title: "State Education Summit 2026", document: "/images/hero_classroom.png", category: "News" },
          { id: 2, title: "Annual Report Release", document: "/images/hero_archive.png", category: "Press" },
          { id: 3, title: "New Digital Library Launch", document: "/images/hero_digital.png", category: "Update" },
        ];
      } else if (module === 'ku-list-md') {
        dummy = [
          { id: 1, title: "Sri Sunny Sinha", from: "29/11/2023", to: "29/04/2024" },
          { id: 2, title: "Sri Baidya Nath Yadav, IAS", from: "09/04/2023", to: "29/11/2023" },
          { id: 3, title: "Shri Manoj Kumar I.A.S", from: "05/08/2021", to: "31/12/2022" },
          { id: 4, title: "Dr. Ranjit Kumar Singh I.A.S", from: "18/09/2019", to: "30/07/2021" },
          { id: 5, title: "Shri Arvind Kumar Verma I.A.S", from: "14/05/2018", to: "31/08/2019" },
          { id: 6, title: "Shri M. Ramchandrudu I.A.S", from: "31/10/2016", to: "14/05/2018" },
          { id: 7, title: "Shri Vishaw Mohan Patel I.A.S", from: "04/07/2015", to: "31/10/2016" },
          { id: 8, title: "Shri K. Senthil Kumar I.A.S", from: "06/04/2015", to: "04/07/2015" },
          { id: 9, title: "Shri Dilip Kumar I.A.S", from: "18/12/2014", to: "06/04/2015" },
          { id: 10, title: "Shri J.K.P. Singh I.R.P.S", from: "28/09/2011", to: "18/12/2014" },
          { id: 11, title: "Shri Ashutosh I.A.S", from: "06/05/2009", to: "28/09/2011" },
          { id: 12, title: "Hasnain Ahmad I.A.S", from: "18/03/2008", to: "30/04/2009" },
          { id: 13, title: "Freaq Ahmad I.A.S", from: "11/06/2007", to: "17/03/2008" },
          { id: 14, title: "Shri Ashok Kumar Singh I.A.S", from: "07/05/2007", to: "30/06/2007" },
          { id: 15, title: "Shri Vaidhnath Mishra I.A.S", from: "04/03/2006", to: "30/04/2007" },
          { id: 16, title: "Shri Ashok Kumar Singh I.A.S", from: "10/02/2006", to: "23/02/2006" },
          { id: 17, title: "Shri R.S.B. Singh I.A.S", from: "15/04/2005", to: "31/12/2005" },
          { id: 18, title: "Shri Maheshwar Prasad Singh I.A.S", from: "04/01/2001", to: "14/04/2005" },
          { id: 19, title: "Shri Vaidhnath Prasad I.A.S", from: "16/12/2000", to: "03/01/2001" },
          { id: 20, title: "Shri Avinash Kumar I.A.S", from: "19/05/2000", to: "27/11/2000" },
          { id: 21, title: "Shri Arvind Kumar Choudhary I.A.S", from: "20/08/1999", to: "14/05/2000" },
          { id: 22, title: "Shri W.N. Singh B.A.S", from: "06/10/1998", to: "19/08/1999" },
          { id: 23, title: "Shri Dipak Kumar I.A.S", from: "09/07/1998", to: "05/10/1998" },
          { id: 24, title: "Shri S. Shamimuddin I.A.S", from: "01/12/1997", to: "08/07/1998" },
          { id: 25, title: "Shri Badunath Prasad Rai I.A.S", from: "26/09/1996", to: "30/11/1997" },
          { id: 26, title: "Shri Vishnu Kumar I.A.S", from: "26/07/1996", to: "21/09/1996" },
          { id: 27, title: "Shri Vijay Prakash I.A.S", from: "03/06/1995", to: "26/07/1996" },
          { id: 28, title: "Shri Ram Krishan Khandelwal I.A.S", from: "13/07/1994", to: "13/06/1995" },
          { id: 29, title: "Shri B.P. Choudhary I.A.S", from: "07/12/1992", to: "15/04/1993" },
          { id: 30, title: "Shri Indu Shekhar Chaturvedi I.A.S", from: "01/10/1992", to: "07/12/1992" },
          { id: 31, title: "Shri A.B. Chaturvedi I.A.S", from: "28/02/1992", to: "01/10/1992" },
          { id: 32, title: "Shri Phool Singh I.A.S", from: "28/08/1991", to: "28/02/1992" },
          { id: 33, title: "Shri N.K. Sinha I.A.S", from: "05/06/1991", to: "28/08/1991" },
          { id: 34, title: "Shri B. Ram", from: "14/10/1977", to: "16/12/1977" },
          { id: 35, title: "Shri B.P. Sinha", from: "17/07/1975", to: "14/10/1977" },
          { id: 36, title: "Shri Mithilesh Kumar I.A.S", from: "13/06/1989", to: "05/06/1991" },
          { id: 37, title: "Shri H.K. Prasad I.A.S", from: "07/12/1986", to: "13/06/1989" },
          { id: 38, title: "Shri A.K. Dubey I.A.S", from: "06/12/1986", to: "07/12/1986" },
          { id: 39, title: "Shri Pancham Lal I.A.S", from: "22/05/1986", to: "25/11/1986" },
          { id: 40, title: "Shri B.N. Choudhary I.A.S", from: "12/09/1984", to: "22/05/1986" },
          { id: 41, title: "Shri R.C.P. Verma", from: "15/10/1980", to: "08/06/1981" },
          { id: 42, title: "Shrimati Krishna Singh I.A.S", from: "16/12/1977", to: "07/06/1978" },
          { id: 43, title: "Shri R.N. Rai", from: "08/06/1981", to: "14/07/1981" },
          { id: 44, title: "Shri R.S. Chaube", from: "05/03/1975", to: "17/07/1975" }
        ];
      } else if (module !== 'dc-rti' && module !== 'ku-md-message') {
        dummy = [
          { id: 1, title: `Primary ${getModuleName(module)} entry`, desc: 'This is a sample entry that you can edit or remove.' },
          { id: 2, title: `Secondary ${getModuleName(module)} entry`, desc: 'Manage your website content efficiently here.' }
        ];
      }
      setContent(dummy);
    }
  }, [module]);

  const handleSave = () => {
    const dataToSave = module === 'dc-rti' ? rtiData : module === 'ku-md-message' ? mdData : content;
    localStorage.setItem(`module_content_${module}`, JSON.stringify(dataToSave));
    addToast?.(module === 'dc-rti' || module === 'ku-md-message' ? 'Details Updated' : 'Layout Updated', 'success');
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({ title: '', desc: '', type: 'PDF', category: 'Stakeholder', size: '1.2 MB', document: '' });
    setIsModalOpen(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a local URL for preview purposes
      const localUrl = URL.createObjectURL(file);
      setFormData(prev => ({ 
        ...prev, 
        document: localUrl, 
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
      }));
      addToast?.('File Ready for Preview', 'success');
    }
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({ 
      title: item.title || '', 
      desc: item.desc || '', 
      type: item.type || 'PDF', 
      category: item.category || 'Stakeholder', 
      size: item.size || '1.2 MB',
      document: item.document || '',
      designation: item.designation || '',
      since: item.since || '',
      status: item.status || 'Active',
      from: item.from || '',
      to: item.to || '',
      email: item.email || '',
      phone: item.phone || '',
      department: item.department || '',
      employeeId: item.employeeId || ''
    });
    setIsModalOpen(true);
  };

  const saveItem = () => {
    let updated;
    if (editingItem) {
      updated = content.map(i => i.id === editingItem.id ? { ...editingItem, ...formData } : i);
      addToast?.('Item Updated', 'success');
    } else {
      updated = [...content, { id: Date.now(), ...formData }];
      addToast?.('Item Added', 'success');
    }
    setContent(updated);
    localStorage.setItem(`module_content_${module}`, JSON.stringify(updated));
    setIsModalOpen(false);
  };

  const removeItem = (id) => {
    const updated = content.filter(i => i.id !== id);
    setContent(updated);
    localStorage.setItem(`module_content_${module}`, JSON.stringify(updated));
    addToast?.('Item Removed', 'error');
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

      {module === 'dc-rti' ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-2xl">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Nodal Officer Details</h3>
          <div className="space-y-4">
            <FormInput 
              label="Public Information Officer Name" 
              value={rtiData.officer}
              onChange={(val) => setRtiData(prev => ({ ...prev, officer: val }))}
            />
            <FormInput 
              label="Contact Number" 
              value={rtiData.phone}
              onChange={(val) => setRtiData(prev => ({ ...prev, phone: val }))}
            />
            <FormInput 
              label="Email Address" 
              value={rtiData.email}
              onChange={(val) => setRtiData(prev => ({ ...prev, email: val }))}
            />
            <FormInput 
              label="Office Address" 
              type="textarea"
              value={rtiData.address}
              onChange={(val) => setRtiData(prev => ({ ...prev, address: val }))}
            />
            <div className="pt-4">
              <button 
                onClick={handleSave}
                className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all"
              >
                Save Nodal Officer Details
              </button>
            </div>
          </div>
        </div>
      ) : module === 'ku-md-message' ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-4xl">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Managing Director's Profile & Message</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-blue-600 uppercase tracking-widest">Personal Info</h4>
              <FormInput 
                label="MD Full Name" 
                value={mdData.name}
                onChange={(val) => setMdData(prev => ({ ...prev, name: val }))}
              />
              <FormInput 
                label="Designation" 
                value={mdData.designation}
                onChange={(val) => setMdData(prev => ({ ...prev, designation: val }))}
              />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">MD Photo</label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 cursor-pointer">
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) setMdData(prev => ({ ...prev, photo: URL.createObjectURL(file) }));
                    }} />
                    <div className="px-4 py-3 rounded-xl border-2 border-dashed border-gray-200 text-center hover:border-blue-400 transition-all">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Change Photo</span>
                    </div>
                  </label>
                  <div className="w-16 h-20 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                    <img src={mdData.photo} alt="MD" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              <FormInput 
                label="Sidebar Short Quote" 
                type="textarea"
                value={mdData.quote}
                onChange={(val) => setMdData(prev => ({ ...prev, quote: val }))}
              />
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-blue-600 uppercase tracking-widest">Message Content</h4>
              <FormInput 
                label="Welcome Note" 
                type="textarea"
                value={mdData.welcomeNote}
                onChange={(val) => setMdData(prev => ({ ...prev, welcomeNote: val }))}
              />
              <FormInput 
                label="Quality & Innovation Note" 
                type="textarea"
                value={mdData.qualityNote}
                onChange={(val) => setMdData(prev => ({ ...prev, qualityNote: val }))}
              />
              <FormInput 
                label="Collaboration Text" 
                type="textarea"
                value={mdData.collaboration}
                onChange={(val) => setMdData(prev => ({ ...prev, collaboration: val }))}
              />
              <FormInput 
                label="Moving Forward Text" 
                type="textarea"
                value={mdData.movingForward}
                onChange={(val) => setMdData(prev => ({ ...prev, movingForward: val }))}
              />
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100">
            <button 
              onClick={handleSave}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all"
            >
              Save MD Message Details
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-base font-bold text-gray-800">Section Content</h3>
            <button 
              onClick={openAddModal}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg font-bold text-[11px] uppercase tracking-wider hover:bg-blue-100 transition-all"
            >
              <Plus className="w-3 h-3" />
              Add Item
            </button>
          </div>

          <div className={module.startsWith('gl-') ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6" : "grid grid-cols-1 md:grid-cols-2 gap-6"}>
            {content.map((item) => (
              <div key={item.id} className={module.startsWith('gl-') 
                ? "relative aspect-square rounded-3xl overflow-hidden border-2 border-gray-100 group hover:border-blue-400 transition-all shadow-sm"
                : "p-4 rounded-2xl border border-gray-100 bg-gray-50/30 flex items-start justify-between group"
              }>
                {module.startsWith('gl-') ? (
                  <>
                    <img src={item.document} alt="Gallery" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                    {module === 'gl-video' && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                      <button onClick={() => openEditModal(item)} className="p-3 bg-white rounded-full text-gray-700 hover:text-blue-600 transition-all transform translate-y-4 group-hover:translate-y-0 shadow-lg">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button onClick={() => removeItem(item.id)} className="p-3 bg-white rounded-full text-gray-700 hover:text-red-600 transition-all transform translate-y-4 group-hover:translate-y-0 shadow-lg">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    {item.title && (
                      <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                        <p className="text-[10px] font-bold text-white uppercase tracking-wider truncate">{item.title}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex gap-4">
                      <div className={`${module === 'gl-photo' ? 'w-24 h-24' : 'w-12 h-12'} rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-blue-600 transition-all overflow-hidden`}>
                        {item.document && (module.startsWith('gl-') || module.startsWith('book-')) ? (
                          <img src={item.document} alt="Thumb" className="w-full h-full object-cover" />
                        ) : (
                          module === 'gl' ? <ImageIcon size={20} /> : module === 'dc' ? <FileText size={20} /> : <LinkIcon size={20} />
                        )}
                      </div>
                      {module !== 'gl-photo' && (
                        <div>
                          <h4 className="text-sm font-bold text-gray-700">{item.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                              {item.category || item.status || 'General'}
                            </span>
                            {module.startsWith('gl-') ? (
                              <span className="text-[10px] text-gray-400 font-semibold uppercase">
                                {module === 'gl-photo' ? 'Image' : 'Video'}
                              </span>
                            ) : (
                              <span className="text-[10px] text-gray-400 font-semibold uppercase">
                                {item.since ? `Since ${item.since}` : (item.size || '1.2 MB')}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => openEditModal(item)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
            
            {content.length === 0 && (
              <div className="col-span-2 py-12 text-center text-gray-400 font-medium border-2 border-dashed border-gray-100 rounded-3xl">
                No items in this section yet.
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Settings Panel Removed */}
      <div className="h-10" /> 


      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingItem ? "Edit Item" : "Add Item"} 
      >
        <div className="space-y-4">
          {module !== 'gl-photo' && (
            <FormInput 
              label={module === 'ku-board' || module === 'ku-list-md' || module === 'ku-officers' || module === 'ku-employees' ? "Full Name" : "Title / Name"} 
              placeholder="Enter name" 
              value={formData.title}
              onChange={(val) => setFormData(prev => ({ ...prev, title: val }))}
            />
          )}
          {module === 'ku-employees' && (
            <>
              <FormInput 
                label="Designation" 
                placeholder="e.g. Accountant" 
                value={formData.designation}
                onChange={(val) => setFormData(prev => ({ ...prev, designation: val }))}
              />
              <FormInput 
                label="Department" 
                placeholder="e.g. Finance, Sales" 
                value={formData.department}
                onChange={(val) => setFormData(prev => ({ ...prev, department: val }))}
              />
              <FormInput 
                label="Employee ID" 
                placeholder="e.g. EMP001" 
                value={formData.employeeId}
                onChange={(val) => setFormData(prev => ({ ...prev, employeeId: val }))}
              />
            </>
          )}
          {module === 'ku-officers' && (
            <>
              <FormInput 
                label="Designation" 
                placeholder="e.g. Chief Administrative Officer" 
                value={formData.designation}
                onChange={(val) => setFormData(prev => ({ ...prev, designation: val }))}
              />
              <FormInput 
                label="Email Address" 
                placeholder="e.g. name@example.com" 
                value={formData.email}
                onChange={(val) => setFormData(prev => ({ ...prev, email: val }))}
              />
              <FormInput 
                label="Phone Number" 
                placeholder="e.g. +91 1234567890" 
                value={formData.phone}
                onChange={(val) => setFormData(prev => ({ ...prev, phone: val }))}
              />
            </>
          )}
          {module === 'ku-list-md' && (
            <>
              <FormInput 
                label="Appointment Date" 
                placeholder="e.g. 29/11/2023" 
                value={formData.from}
                onChange={(val) => setFormData(prev => ({ ...prev, from: val }))}
              />
              <FormInput 
                label="Tenure End" 
                placeholder="e.g. 29/04/2024" 
                value={formData.to}
                onChange={(val) => setFormData(prev => ({ ...prev, to: val }))}
              />
            </>
          )}
          {module === 'ku-board' && (
            <>
              <FormInput 
                label="Designation" 
                placeholder="e.g. Managing Director" 
                value={formData.designation}
                onChange={(val) => setFormData(prev => ({ ...prev, designation: val }))}
              />
              <FormInput 
                label="Since / From" 
                placeholder="e.g. 2023" 
                value={formData.since}
                onChange={(val) => setFormData(prev => ({ ...prev, since: val }))}
              />
              <FormInput 
                label="Status" 
                type="select"
                options={["Active", "Ex-Director"]}
                value={formData.status}
                onChange={(val) => setFormData(prev => ({ ...prev, status: val }))}
              />
            </>
          )}
          {(module === 'dc-reg-forms' || module.startsWith('gl-') || module === 'ku-board' || module === 'ku-list-md' || module === 'ku-officers' || module === 'ku-employees') ? (
            <>
              { (module === 'ku-board' || module === 'ku-list-md' || module === 'ku-officers' || module === 'ku-employees') ? null : (
                <>
                  {(module === 'gl-video' || module === 'gl-press') ? (
                    <FormInput 
                      label="Category / Tag" 
                      placeholder="e.g. Event, News, Meeting" 
                      value={formData.category}
                      onChange={(val) => setFormData(prev => ({ ...prev, category: val }))}
                    />
                  ) : module === 'dc-reg-forms' ? (
                    <FormInput 
                      label="Category" 
                      type="select"
                      options={categoryOptions}
                      value={formData.category}
                      onChange={(val) => setFormData(prev => ({ ...prev, category: val }))}
                    />
                  ) : null}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {module === 'gl-photo' ? "Select Photo" : module === 'gl-video' ? "Upload Thumbnail" : module === 'gl-press' ? "Upload Cover Image" : "Upload PDF Document"}
                    </label>
                    <div className="flex items-center gap-4">
                      <label className="flex-1 cursor-pointer">
                        <input 
                          type="file" 
                          accept={module.startsWith('gl-') ? "image/*" : ".pdf"} 
                          className="hidden" 
                          onChange={handleFileUpload} 
                        />
                        <div className="px-6 py-8 rounded-2xl border-2 border-dashed border-gray-200 text-center hover:border-blue-400 hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-2">
                          <ImageIcon className="w-8 h-8 text-gray-300" />
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                            {formData.document ? "Change Selected Photo" : "Click to Choose Photo"}
                          </span>
                        </div>
                      </label>
                      {formData.document && (
                        <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-blue-100 shadow-sm">
                          <img src={formData.document} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                  {module === 'gl-video' && (
                    <FormInput 
                      label="Video Link (YouTube/Vimeo)" 
                      placeholder="https://youtube.com/watch?v=..." 
                      value={formData.videoUrl}
                      onChange={(val) => setFormData(prev => ({ ...prev, videoUrl: val }))}
                    />
                  )}
                </>
              )}
            </>
          ) : (
            <FormInput 
              label="Description" 
              type="textarea" 
              placeholder="Enter description" 
              value={formData.desc}
              onChange={(val) => setFormData(prev => ({ ...prev, desc: val }))}
            />
          )}
          
          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <motion.button
              onClick={saveItem}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Save Item
            </motion.button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}

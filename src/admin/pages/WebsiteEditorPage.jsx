import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, Edit2, Image as ImageIcon, User as UserIcon, FileText, Upload, RefreshCw, Eye, Sparkles, Quote, BadgeCheck, Camera, CheckCircle2 } from 'lucide-react';
import Modal, { FormInput } from '../components/Modal';
import { useActivityLog } from '../hooks/useCustomHooks';

export default function WebsiteEditorPage({ module, addToast }) {
  const { logActivity } = useActivityLog();
  const [content, setContent] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ title: '', desc: '', type: '', category: '', document: '' });
  const [rtiData, setRtiData] = useState({ 
    officer: 'Shri. Rajesh Kumar', 
    phone: '06122221975', 
    email: 'rti.bstbpc@bihar.gov.in', 
    address: 'Pathya Pustak Bhawan, Buddh Marg, Budh Vihar, Fraser Road Area, Patna - 800001' 
  });
  const [mdData, setMdData] = useState({
    name: 'Shri Yatendra Kumar Pal',
    designation: 'Managing Director',
    photo: '/images/KeyParticipants/shri_yatendra_pal.webp',
    quote: 'Ensuring that textiles of knowledge reach every student in Bihar, timely and with uncompromised quality.',
    welcomeNote: 'It gives me immense pleasure to connect with all stakeholders through this platform. The Bihar State Text Book Publishing Corporation Ltd. plays a pivotal role in strengthening the foundation of education by ensuring the timely production and distribution of quality textbooks across the state.',
    qualityNote: 'Quality remains at the core of our operations. From manuscript approval to final printing, every stage undergoes strict supervision and inspection.',
    collaboration: 'The successful execution of our responsibilities is possible through the collective efforts of our officers, employees, empanalled printers, and education departments across districts.',
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
      phone: '06122221975', 
      email: 'rti.bstbpc@bihar.gov.in', 
      address: 'Pathya Pustak Bhawan, Buddh Marg, Budh Vihar, Fraser Road Area, Patna - 800001' 
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
            if (!parsed.photo || parsed.photo.startsWith('blob:')) {
              parsed.photo = '/images/KeyParticipants/shri_yatendra_pal.webp';
            }
            setMdData(parsed);
            dataLoaded = true;
          }
        } else {
          const parsedArray = Array.isArray(parsed) ? parsed : [];
          if (parsedArray.length === 0 && (module === 'ku-board' || module === 'gl-photo' || module === 'gl-video' || module === 'gl-press' || module === 'ku-list-md' || module === 'ku-employees')) {
            dataLoaded = false; 
          } else if (parsedArray.length > 0) {
            let processedArray = parsedArray;
            let hasFixes = false;
            
            if (module.startsWith('gl-')) {
              const defaults = module === 'gl-photo' ? [
                "/images/hero/classroom.webp", "/images/hero/audio.webp", "/images/hero/vr.webp", "/images/hero/sign.webp", "/images/hero/linguistic.webp", "/images/csr.webp"
              ] : module === 'gl-video' ? [
                "/images/hero/classroom.webp", "/images/hero/audio.webp", "/images/hero/vr.webp", "/images/KeyParticipants/shri_yatendra_pal.webp", "/images/hero/sign.webp", "/images/hero/linguistic.webp"
              ] : [
                "/images/hero/classroom.webp", "/images/hero/audio.webp", "/images/hero/vr.webp", "/images/hero/sign.webp", "/images/hero/linguistic.webp"
              ];
              
              const getYouTubeIdLocal = (url) => {
                if (!url) return null;
                const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                const match = url.match(regExp);
                return (match && match[2].length === 11) ? match[2] : null;
              };

              processedArray = parsedArray.map((item) => {
                const doc = item.document;
                if (!doc || typeof doc !== 'string' || doc.trim() === "" || doc === "undefined" || doc === "null") {
                  hasFixes = true;
                  let autoThumbnail = "";
                  if (module === 'gl-video' && item.videoUrl) {
                    const ytId = getYouTubeIdLocal(item.videoUrl);
                    if (ytId) autoThumbnail = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
                  }
                  
                  let finalFallback = autoThumbnail;
                  if (!finalFallback) {
                    finalFallback = module === 'gl-video' ? "/images/hero/audio.webp" : "/images/hero/classroom.webp";
                  }
                  
                  return { ...item, document: finalFallback };
                }
                return item;
              });
            }

            setContent(processedArray);
            if (hasFixes) {
               localStorage.setItem(`module_content_${module}`, JSON.stringify(processedArray));
               window.dispatchEvent(new Event('storage'));
            }
            dataLoaded = true;
          }
        }
      } catch (e) {
        console.error("Error parsing saved data", e);
      }
    }

    if (!dataLoaded) {
      let dummy = [];
      if (module === 'ku-board') {
        dummy = [
          { id: 1, title: "Shri. S. Siddharth, IAS", designation: "ACS, Dept. of Education (Chairman)", since: "Current", status: "Active" },
          { id: 2, title: "Shri. Sunny Sinha", designation: "Managing Director", since: "Current", status: "Active" },
          { id: 3, title: "Shri. Anand Sharma", designation: "Director, Primary Education", since: "2023", status: "Active" },
          { id: 4, title: "Ms. Rekha Kumari", designation: "Director, Secondary Education", since: "2022", status: "Active" },
          { id: 5, title: "Shri. Manoj Kumar", designation: "Spl. Secretary, Finance Dept.", since: "2023", status: "Active" },
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
          { id: 1, title: "Primary Classroom Learning Environment", document: "/images/hero/classroom.webp" },
          { id: 2, title: "E-Learning & Digital Books Portal", document: "/images/hero/audio.webp" },
          { id: 3, title: "Mobile VR Lab Tour Experience", document: "/images/hero/vr.webp" },
          { id: 4, title: "Inclusive Sign Language Training Class", document: "/images/hero/sign.webp" },
          { id: 5, title: "Diverse Regional Dialects Learning Program", document: "/images/hero/linguistic.webp" },
          { id: 6, title: "Corporate Social Responsibility Initiatives", document: "/images/csr.webp" },
          { id: 7, title: "Educational Campaigns", document: "/images/goodnight.webp" },
          { id: 8, title: "Key Participant Session", document: "/images/KeyParticipants/sri_mithlesh.webp" },
          { id: 9, title: "Conference Highlights", document: "/images/KeyParticipants/girish_kumar_choudhary.webp" },
          { id: 10, title: "Academic Discussions", document: "/images/KeyParticipants/abhyanand.webp" },
          { id: 11, title: "Leadership Meeting", document: "/images/KeyParticipants/sri-vinod.webp" },
          { id: 12, title: "Executive Briefing", document: "/images/KeyParticipants/shri_yatendra_pal.webp" },
          { id: 13, title: "Community Outreach", document: "/images/KeyParticipants/samrat.webp" },
          { id: 14, title: "Student Engagement", document: "/images/KeyParticipants/anand.webp" }
        ];
      } else if (module === 'gl-video') {
        dummy = [
          { id: 1, title: "Bihar Digital Classrooms Launch Highlights", document: "/images/hero/classroom.webp", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", category: "Launch" },
          { id: 2, title: "Rural Literacy Outreach & Community Distribution Drives", document: "/images/hero/audio.webp", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", category: "Community" },
          { id: 3, title: "Teacher Training Workshop on Interactive Smart Textbooks", document: "/images/hero/vr.webp", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", category: "Training" },
          { id: 4, title: "Academic Session 2026-27 High-Level Inauguration Ceremony", document: "/images/KeyParticipants/shri_yatendra_pal.webp", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", category: "Ceremony" },
          { id: 5, title: "Accessible Audio Books and Inclusive Pedagogy Program", document: "/images/hero/sign.webp", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", category: "Program" },
          { id: 6, title: "Smart AI Revision Modules Student Pilot Feedback", document: "/images/hero/linguistic.webp", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", category: "Feedback" }
        ];
      } else if (module === 'gl-press') {
        dummy = [
          { id: 1, title: "Launch of Digital Learning Initiatives Across 500 Schools", document: "/images/hero/classroom.webp", category: "Initiatives", desc: "The State Text Book Publishing Corporation today announced a major rollout of VR and AR educational tools, aiming to modernize learning infrastructure in rural districts.", date: "2025-10-15" },
          { id: 2, title: "New Curriculum Guidelines Released for Upcoming Academic Year", document: "/images/hero/audio.webp", category: "Curriculum", desc: "Updated guidelines emphasize regional history, environmental awareness, and foundational literacy skills. All textbooks have been revised accordingly.", date: "2025-09-28" },
          { id: 3, title: "Partnership Announced with National Digital Library", document: "/images/hero/vr.webp", category: "Partnerships", desc: "To expand access to supplementary reading materials across remote districts, a strategic partnership has been formalized.", date: "2025-08-10" },
          { id: 4, title: "Annual Board Meeting Summary and Future Outlook", document: "/images/hero/sign.webp", category: "Corporate", desc: "Key stakeholders convened to discuss the previous quarter's achievements and outline strategic directions for upcoming distributions.", date: "2025-07-22" },
          { id: 5, title: "NEP 2020 Textbook Alignment Milestone Completed", document: "/images/hero/linguistic.webp", category: "Reform", desc: "The corporation has successfully completed the alignment of all primary and secondary level textbooks with the New Education Policy 2020 standards.", date: "2025-05-10" },
        ];
      } else if (module === 'ku-list-md') {
        dummy = [
          { id: 1, title: "Shri Sunny Sinha", from: "29/11/2023", to: "29/04/2024" },
          { id: 2, title: "Shri Baidya Nath Yadav, IAS", from: "09/04/2023", to: "29/11/2023" },
          { id: 3, title: "Shri Manoj Kumar IAS", from: "05/08/2021", to: "31/12/2022" },
          { id: 4, title: "Dr. Ranjit Kumar Singh IAS", from: "18/09/2019", to: "30/07/2021" },
          { id: 5, title: "Shri Arvind Kumar Verma IAS", from: "14/05/2018", to: "31/08/2019" },
          { id: 6, title: "Shri M. Ramchandrudu IAS", from: "31/10/2016", to: "14/05/2018" },
          { id: 7, title: "Shri Vishaw Mohan Patel IAS", from: "04/07/2015", to: "31/10/2016" },
          { id: 8, title: "Shri K. Senthil Kumar IAS", from: "06/04/2015", to: "04/07/2015" },
          { id: 9, title: "Shri Dilip Kumar IAS", from: "18/12/2014", to: "06/04/2015" },
          { id: 10, title: "Shri J.K.P. Singh I.R.P.S", from: "28/09/2011", to: "18/12/2014" },
          { id: 11, title: "Shri Ashutosh IAS", from: "06/05/2009", to: "28/09/2011" },
          { id: 12, title: "Hasnain Ahmad IAS", from: "18/03/2008", to: "30/04/2009" },
          { id: 13, title: "Freaq Ahmad IAS", from: "11/06/2007", to: "17/03/2008" },
          { id: 14, title: "Shri Ashok Kumar Singh IAS", from: "07/05/2007", to: "30/06/2007" },
          { id: 15, title: "Shri Vaidhnath Mishra IAS", from: "04/03/2006", to: "30/04/2007" },
          { id: 16, title: "Shri Ashok Kumar Singh IAS", from: "10/02/2006", to: "23/02/2006" },
          { id: 17, title: "Shri R.S.B. Singh IAS", from: "15/04/2005", to: "31/12/2005" },
          { id: 18, title: "Shri Maheshwar Prasad Singh IAS", from: "04/01/2001", to: "14/04/2005" },
          { id: 19, title: "Shri Vaidhnath Prasad IAS", from: "16/12/2000", to: "03/01/2001" },
          { id: 20, title: "Shri Avinash Kumar IAS", from: "19/05/2000", to: "27/11/2000" },
          { id: 21, title: "Shri Arvind Kumar Choudhary IAS", from: "20/08/1999", to: "14/05/2000" },
          { id: 22, title: "Shri W.N. Singh B.A.S", from: "06/10/1998", to: "19/08/1999" },
          { id: 23, title: "Shri Dipak Kumar IAS", from: "09/07/1998", to: "05/10/1998" },
          { id: 24, title: "Shri S. Shamimuddin IAS", from: "01/12/1997", to: "08/07/1998" },
          { id: 25, title: "Shri Badunath Prasad Rai IAS", from: "26/09/1996", to: "30/11/1997" },
          { id: 26, title: "Shri Vishnu Kumar IAS", from: "26/07/1996", to: "21/09/1996" },
          { id: 27, title: "Shri Vijay Prakash IAS", from: "03/06/1995", to: "26/07/1996" },
          { id: 28, title: "Shri Ram Krishan Khandelwal IAS", from: "13/07/1994", to: "13/06/1995" },
          { id: 29, title: "Shri B.P. Choudhary IAS", from: "07/12/1992", to: "15/04/1993" },
          { id: 30, title: "Shri Indu Shekhar Chaturvedi IAS", from: "01/10/1992", to: "07/12/1992" },
          { id: 31, title: "Shri A.B. Chaturvedi IAS", from: "28/02/1992", to: "01/10/1992" },
          { id: 32, title: "Shri Phool Singh IAS", from: "28/08/1991", to: "28/02/1992" },
          { id: 33, title: "Shri N.K. Sinha IAS", from: "05/06/1991", to: "28/08/1991" },
          { id: 34, title: "Shri B. Ram", from: "14/10/1977", to: "16/12/1977" },
          { id: 35, title: "Shri B.P. Sinha", from: "17/07/1975", to: "14/10/1977" },
          { id: 36, title: "Shri Mithilesh Kumar IAS", from: "13/06/1989", to: "05/06/1991" },
          { id: 37, title: "Shri H.K. Prasad IAS", from: "07/12/1986", to: "13/06/1989" },
          { id: 38, title: "Shri A.K. Dubey IAS", from: "06/12/1986", to: "07/12/1986" },
          { id: 39, title: "Shri Pancham Lal IAS", from: "22/05/1986", to: "25/11/1986" },
          { id: 40, title: "Shri B.N. Choudhary IAS", from: "12/09/1984", to: "22/05/1986" },
          { id: 41, title: "Shri R.C.P. Verma", from: "15/10/1980", to: "08/06/1981" },
          { id: 42, title: "Shrimati Krishna Singh IAS", from: "16/12/1977", to: "07/06/1978" },
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
    logActivity(`Updated ${getModuleName(module)}`, 'Admin', 'edit');
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({ title: '', desc: '', type: 'PDF', category: 'Stakeholder', document: '' });
    setIsModalOpen(true);
  };

  const handleFileUpload = (e, field = 'document') => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = field === 'uploadedVideo' ? 5 * 1024 * 1024 : 2 * 1024 * 1024; // 5MB for video, 2MB for images/docs
      if (file.size > maxSize) {
        addToast?.(`File too large! Max allowed is ${field === 'uploadedVideo' ? '5MB' : '2MB'}.`, 'error');
        return;
      }

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 800;
            const MAX_HEIGHT = 800;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.6); // Compress to 60% quality JPEG
            
            setFormData(prev => ({ 
              ...prev, 
              [field]: dataUrl 
            }));
            addToast?.('Image Optimized & Ready', 'success');
          };
          img.src = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({ 
            ...prev, 
            [field]: reader.result 
          }));
          addToast?.('File Ready', 'success');
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({ 
      title: item.title || '', 
      desc: item.desc || '', 
      type: item.type || 'PDF', 
      category: item.category || 'Stakeholder', 
      document: item.document || '',
      uploadedVideo: item.uploadedVideo || '',
      date: item.date || '',
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
    const finalFormData = { ...formData };
    
    // Auto-assign default image if none is provided
    if (module.startsWith('gl-') && (!finalFormData.document || finalFormData.document.trim() === "")) {
      if (module === 'gl-video') {
        const getYouTubeId = (url) => {
          if (!url) return null;
          const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
          const match = url.match(regExp);
          return (match && match[2].length === 11) ? match[2] : null;
        };
        const ytId = getYouTubeId(finalFormData.videoUrl);
        if (ytId) {
          finalFormData.document = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
        } else {
          finalFormData.document = "/images/hero/audio.webp";
        }
      } else {
        finalFormData.document = "/images/hero/classroom.webp";
      }
    }

    if (editingItem) {
      updated = content.map(i => i.id === editingItem.id ? { ...editingItem, ...finalFormData } : i);
      addToast?.('Item Updated', 'success');
      logActivity(`Updated ${finalFormData.title || 'Item'} in ${getModuleName(module)}`, 'Admin', 'edit');
    } else {
      updated = [...content, { id: Date.now(), ...finalFormData }];
      addToast?.('Item Added', 'success');
      logActivity(`Added ${finalFormData.title || 'Item'} to ${getModuleName(module)}`, 'Admin', 'create');
    }
    
    try {
      localStorage.setItem(`module_content_${module}`, JSON.stringify(updated));
      setContent(updated);
      setIsModalOpen(false);
    } catch (e) {
      console.error("Storage Error:", e);
      addToast?.('Storage limit exceeded! File too large.', 'error');
    }
  };

  const removeItem = (id) => {
    const itemToDelete = content.find(i => i.id === id);
    const updated = content.filter(i => i.id !== id);
    setContent(updated);
    localStorage.setItem(`module_content_${module}`, JSON.stringify(updated));
    addToast?.('Item Removed', 'error');
    if (itemToDelete) {
      logActivity(`Removed ${itemToDelete.title || 'Item'} from ${getModuleName(module)}`, 'Admin', 'delete');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >


      {module === 'dc-rti' ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 max-w-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800">Nodal Officer Details (RTI)</h3>
                <p className="text-xs text-slate-500 font-medium">Manage Public Information Officer details for RTI section</p>
              </div>
            </div>
          </div>

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
            <div className="pt-2">
              <button 
                onClick={handleSave}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-[0.99]"
              >
                <Save className="w-5 h-5" />
                <span>Save Nodal Officer Details</span>
              </button>
            </div>
          </div>
        </div>
      ) : module === 'ku-md-message' ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6 max-w-6xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                <UserIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800">MD Profile & Message Settings</h3>
                <p className="text-xs text-slate-500 font-medium">Update the Managing Director's details shown on the website</p>
              </div>
            </div>
          </div>

          {/* Side by Side 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* Left Box: Personal Info */}
            <div className="bg-slate-50/60 rounded-2xl p-5 border border-slate-100 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-blue-600" />
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Personal Information</h4>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    MD Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <UserIcon className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={mdData.name}
                      onChange={(e) => setMdData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Shri Yatendra Kumar Pal"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Photo Upload Box */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Managing Director Photo
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
                    <div className="relative w-24 shrink-0 aspect-[4/5] rounded-xl overflow-hidden border-2 border-blue-100 bg-slate-100 shadow-sm group">
                      <img 
                        loading="lazy" 
                        decoding="async" 
                        src={mdData.photo || '/images/KeyParticipants/shri_yatendra_pal.webp'} 
                        alt="MD Preview" 
                        className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                        onError={(e) => {
                          e.target.src = '/images/KeyParticipants/shri_yatendra_pal.webp';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <Camera className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    <div className="flex-1 space-y-2 text-center sm:text-left w-full">
                      <p className="text-xs font-semibold text-slate-700">Upload high quality portrait (4:5 ratio)</p>
                      <p className="text-[11px] text-slate-400">Supported formats: JPG, PNG, WEBP. Max size: 2MB</p>
                      
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                        <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-sm transition-all">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Photo</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                if (file.size > 2 * 1024 * 1024) {
                                  addToast?.('File too large! Max allowed is 2MB.', 'error');
                                  return;
                                }
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setMdData(prev => ({ ...prev, photo: reader.result }));
                                  addToast?.('Photo preview updated', 'success');
                                };
                                reader.readAsDataURL(file);
                              }
                            }} 
                          />
                        </label>

                        {mdData.photo !== '/images/KeyParticipants/shri_yatendra_pal.webp' && (
                          <button
                            type="button"
                            onClick={() => {
                              setMdData(prev => ({ ...prev, photo: '/images/KeyParticipants/shri_yatendra_pal.webp' }));
                              addToast?.('Reset to default photo', 'info');
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-all"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Reset Default</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Box: Message Content */}
            <div className="bg-slate-50/60 rounded-2xl p-5 border border-slate-100 space-y-4 flex flex-col justify-between">
              <div className="flex-1 flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Quote className="w-4 h-4 text-blue-600" />
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Welcome Message Content</h4>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {mdData.welcomeNote ? mdData.welcomeNote.length : 0} characters
                  </span>
                </div>

                <div className="relative flex-1 flex flex-col">
                  <textarea
                    value={mdData.welcomeNote}
                    onChange={(e) => setMdData(prev => ({ ...prev, welcomeNote: e.target.value }))}
                    placeholder="Enter Managing Director's welcome note..."
                    className="w-full h-full min-h-[220px] p-4 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all leading-relaxed shadow-sm resize-y"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button 
              onClick={handleSave}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2.5 transition-all transform active:scale-[0.99]"
            >
              <Save className="w-5 h-5" />
              <span className="text-base">Save MD Message Details</span>
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
              Add
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
                    {item.document ? (
                      <img loading="lazy" decoding="async" 
                        src={item.document} 
                        alt="Gallery" 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                        onError={(e) => {
                          e.target.onerror = null; 
                          e.target.src = module === 'gl-video' ? "/images/hero/audio.webp" : "/images/hero/classroom.webp";
                          
                          // Also try to heal localStorage silently
                          try {
                            const saved = JSON.parse(localStorage.getItem(`module_content_${module}`) || "[]");
                            const updated = saved.map(i => i.id === item.id ? { ...i, document: e.target.src } : i);
                            localStorage.setItem(`module_content_${module}`, JSON.stringify(updated));
                            window.dispatchEvent(new Event('storage'));
                          } catch (err) {}
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400">
                        <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                        <span className="text-[10px] uppercase font-bold tracking-wider">No Image</span>
                      </div>
                    )}
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
                          <img loading="lazy" decoding="async" src={item.document} alt="Thumb" className="w-full h-full object-cover" />
                        ) : (
                          module === 'gl' ? <ImageIcon size={20} /> : module === 'dc' ? <FileText size={20} /> : <UserIcon size={20} />
                        )}
                      </div>
                      {module !== 'gl-photo' && (
                        <div>
                          <h4 className="text-sm font-bold text-gray-700">{item.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                              {item.category || (module === 'ku-board' ? 'Director' : 'General')}
                            </span>
                            {module.startsWith('gl-') ? (
                              <span className="text-[10px] text-gray-400 font-semibold uppercase">
                                {module === 'gl-photo' ? 'Image' : 'Video'}
                              </span>
                            ) : module === 'ku-list-md' ? (
                              <span className="text-[10px] text-gray-400 font-semibold uppercase">
                                {item.from && item.to ? `${item.from} - ${item.to}` : (item.from ? `From ${item.from}` : '')}
                              </span>
                            ) : module === 'ku-employees' ? (
                              <span className="text-[10px] text-gray-400 font-semibold uppercase">
                                {item.designation || item.department || ''}
                              </span>
                            ) : (
                              <span className="text-[10px] text-gray-400 font-semibold uppercase">
                                {item.since ? `Since ${item.since}` : ''}
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
          <FormInput 
            label={module === 'gl-photo' ? "Photo Description" : module === 'ku-board' || module === 'ku-list-md' || module === 'ku-employees' ? "Full Name" : "Title / Name"} 
            placeholder={module === 'gl-photo' ? "Enter description for this photo" : "Enter name"} 
            value={formData.title}
            onChange={(val) => setFormData(prev => ({ ...prev, title: val }))}
          />
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
            </>
          )}
          {(module.startsWith('gl-') || module === 'ku-board' || module === 'ku-list-md' || module === 'ku-employees') ? (
            <>
              { (module === 'ku-board' || module === 'ku-list-md' || module === 'ku-employees') ? null : (
                <>
                  {(module === 'gl-video' || module === 'gl-press') ? (
                    <>
                      <FormInput 
                        label="Category / Tag" 
                        placeholder="e.g. Event, News, Meeting" 
                        value={formData.category}
                        onChange={(val) => setFormData(prev => ({ ...prev, category: val }))}
                      />
                      {module === 'gl-press' && (
                        <>
                          <FormInput 
                            label="Date" 
                            type="date"
                            placeholder="Select Date"
                            value={formData.date}
                            onChange={(val) => setFormData(prev => ({ ...prev, date: val }))}
                          />
                          <FormInput 
                            label="Description / Excerpt" 
                            type="textarea" 
                            placeholder="Enter a brief description for this press release" 
                            value={formData.desc}
                            onChange={(val) => setFormData(prev => ({ ...prev, desc: val }))}
                          />
                        </>
                      )}
                    </>
                  ) : null}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {module === 'gl-photo' ? "Select Photo (Max 2MB)" : module === 'gl-video' ? "Upload Thumbnail (Max 2MB)" : module === 'gl-press' ? "Upload Cover Image (Max 2MB)" : "Upload PDF Document (Max 2MB)"}
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
                          {module.startsWith('gl-') ? <ImageIcon className="w-8 h-8 text-gray-300" /> : <FileText className="w-8 h-8 text-gray-300" />}
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                            {formData.document 
                              ? (module.startsWith('gl-') ? "Change Selected Photo" : "Change Selected PDF") 
                              : (module.startsWith('gl-') ? "Click to Choose Photo (Max 2MB)" : "Click to Choose PDF (Max 2MB)")}
                          </span>
                        </div>
                      </label>
                      {formData.document && module.startsWith('gl-') && (
                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-blue-100 shadow-sm group">
                          <img loading="lazy" decoding="async" src={formData.document} alt="Preview" className="w-full h-full object-cover" />
                          <button 
                            onClick={(e) => { e.preventDefault(); setFormData(prev => ({ ...prev, document: '' })); }}
                            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-white hover:text-red-400"
                          >
                            <Trash2 className="w-6 h-6" />
                          </button>
                        </div>
                      )}
                      {formData.document && !module.startsWith('gl-') && (
                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-blue-100 shadow-sm flex items-center justify-center bg-blue-50 text-blue-600 group">
                          <FileText className="w-10 h-10" />
                          <button 
                            onClick={(e) => { e.preventDefault(); setFormData(prev => ({ ...prev, document: '' })); }}
                            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-white hover:text-red-400"
                          >
                            <Trash2 className="w-6 h-6" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  {module === 'gl-video' && (
                    <>
                      <FormInput 
                        label="Video Link (YouTube)" 
                        placeholder="https://youtube.com/watch?v=..." 
                        value={formData.videoUrl}
                        onChange={(val) => setFormData(prev => ({ ...prev, videoUrl: val }))}
                      />
                      <div className="mb-4 mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Or Upload Video (MP4 - Max 5MB)</label>
                        <div className="flex items-center gap-4">
                          <label className="flex-1 cursor-pointer">
                            <input 
                              type="file" 
                              accept="video/*"
                              className="hidden" 
                              onChange={(e) => handleFileUpload(e, 'uploadedVideo')} 
                            />
                            <div className="px-6 py-4 rounded-xl border-2 border-dashed border-gray-200 text-center hover:border-blue-400 hover:bg-blue-50 transition-all">
                              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                {formData.uploadedVideo ? "Video Uploaded - Click to Change" : "Click to Upload Video (Max 5MB)"}
                              </span>
                            </div>
                          </label>
                        </div>
                      </div>
                    </>
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

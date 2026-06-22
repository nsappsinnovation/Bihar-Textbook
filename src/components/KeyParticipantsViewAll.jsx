import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { motion } from "framer-motion";

// Data from KeyParticipant.jsx
const industryData = [
  {
    name: "Shri Samrat Choudhary",
    role: "Hon'ble Chief Minister, Bihar",
    image: "/images/KeyParticipants/samrat.png",
    category: "Leadership",
  },
  {
    name: "Sri Mithilesh Tiwari",
    role: "Hon'ble Education Minister, Bihar",
    image: "/images/KeyParticipants/sri_mithlesh.png",
    category: "Leadership",
  },
  {
    name: "Shri Vinod Singh Gunjiyal",
    role: "Secretary, Education Department",
    image: "/images/KeyParticipants/sri-vinod.png",
    category: "Leadership",
  },
  {
    name: "Shri Yatendra Kumar Pal, IAS",
    role: "Managing Director, Bihar State Text Book Publishing Corporation (BSTBPC)",
    image: "/images/KeyParticipants/shri_yatendra_pal.png",
    category: "Leadership",
  },
];

const academiaData = [
  {
    name: "Anand Kumar",
    role: "Founder, Super 30 & Mathematician",
    image: "/images/KeyParticipants/Anand kumar pic.png",
    category: "Visionaries",
  },
  {
    name: "HC Verma",
    role: "Renowned Physicist & Educator, IIT Kanpur (Born in Bihar)",
    image: "/images/KeyParticipants/hc-verma-pic.png",
    category: "Visionaries",
  },
  {
    name: "Prof. Girish Kumar Choudhary",
    role: "Vice Chancellor, Patna University",
    image: "/images/KeyParticipants/girish_kumar_choudhary.png",
    category: "Visionaries",
  },
  {
    name: "Abhayanand",
    role: "Former DGP Bihar & Co-founder of Super 30",
    image: "/images/KeyParticipants/abhyanand.png",
    category: "Visionaries",
  },
];

const allParticipants = [...industryData, ...academiaData];

export default function KeyParticipantViewAll() {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [allData, setAllData] = useState(() => {
    const saved = localStorage.getItem('website_leaders_v3');
    if (saved) {
      try {
        let parsed = JSON.parse(saved);
        let updated = false;
        parsed = parsed.map(item => {
          if (item.name === "Shri Sunil Kumar" || item.name === "Sri Sunil Kumar") {
            updated = true;
            return {
              ...item,
              name: "Sri Mithilesh Tiwari",
              role: "Hon'ble Education Minister, Bihar",
              image: "/images/KeyParticipants/sri_mithlesh.png"
            };
          }
          if (item.name === "Shri Dr. B. Rajender, IAS" || item.name === "Dr. B. Rajender") {
            updated = true;
            return {
              ...item,
              name: "Shri Vinod Singh Gunjiyal",
              role: "Secretary, Education Department",
              image: "/images/KeyParticipants/sri-vinod.png"
            };
          }
          return item;
        });
        if (updated) {
          localStorage.setItem('website_leaders_v3', JSON.stringify(parsed));
        }
        return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return allParticipants.map(p => ({ ...p, tag: p.category ? p.category.toUpperCase() : 'LEADERSHIP' }));
  });

  const filtered = allData.filter((p) => {
    const matchesCategory = filter === "All" || (p.tag && p.tag.toLowerCase() === filter.toLowerCase());
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="min-h-screen bg-[#fdfbf9] font-sans relative overflow-hidden">
      {/* --- HERO SECTION --- */}
      <div className="relative pt-24 pb-16 px-6">
          {/* Background Elements matching Photo Gallery */}
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-75 pointer-events-none" />
          <div className="absolute right-[-100px] top-1/4 w-80 h-80 border border-slate-200/50 rounded-[48px] rotate-[22deg] pointer-events-none" />
          <div className="absolute left-[-150px] bottom-1/4 w-[400px] h-[400px] border border-slate-200/40 rounded-full pointer-events-none" />
        
          <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center">
                <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-8 font-medium text-sm self-start md:absolute md:left-0 md:top-0">
                    <ArrowLeft size={16} /> Back to Home
                </Link>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-indigo-50/80 backdrop-blur-sm border border-indigo-100 mb-6 shadow-sm"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
                  <span className="text-indigo-800 text-xs font-bold tracking-wider uppercase">
                    Leadership & Academia
                  </span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight mb-6"
                >
                    Shaping the Future <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                        Together
                    </span>
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed"
                >
                    Meet the distinguished leaders and visionary educators who are driving the transformation of Bihar's educational landscape.
                </motion.p>
          </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 relative z-20 pb-20">
            
            {/* TOOLBAR */}
            <div className="bg-white rounded-2xl p-4 shadow-xl shadow-slate-200/50 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-100">
                
                {/* Search */}
                <div className="relative w-full md:w-96 group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search by name..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all font-medium"
                    />
                </div>

                {/* Filters */}
                <div className="flex p-1 bg-slate-100/80 rounded-xl">
                    {["All", "Leadership", "Visionaries"].map((item) => (
                        <button
                            key={item}
                            onClick={() => setFilter(item)}
                            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                                filter === item
                                ? "bg-white text-indigo-900 shadow-sm transform scale-105"
                                : "text-slate-500 hover:text-slate-700"
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filtered.map((item, i) => (
                    <ParticipantCard key={i} item={item} />
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-32">
                    <div className="inline-block p-4 rounded-full bg-slate-100 mb-4">
                        <Search className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">No participants found</h3>
                    <p className="text-slate-500 mt-2">Try adjusting your search or filter criteria.</p>
                </div>
            )}

      </div>
    </section>
  );
}


// --- Simplified Card Design ---
function ParticipantCard({ item }) {
    return (
      <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full">
        {/* ===== IMAGE ON TOP ===== */}
        <div className="h-[320px] w-full bg-[#f0f4f8] overflow-hidden relative group">
          {/* Subtle gradient behind image */}
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-top drop-shadow-lg"
          />
        </div>
  
        {/* ===== INFO AT BOTTOM ===== */}
        <div className="p-6 flex flex-col flex-1 bg-white relative z-10">
            <span className="self-start px-2.5 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest rounded-md mb-3 border border-indigo-100">
                {item.category || item.tag}
            </span>
  
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 leading-tight">
                {item.name}
            </h3>
    
            <p className="text-sm text-slate-500 font-medium leading-relaxed border-t border-slate-100 pt-3 mt-auto">
                {item.role}
            </p>
        </div>
      </div>
    );
  }

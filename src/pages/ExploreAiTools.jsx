import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: 'All', label: 'All Tools', icon: '🌐' },
  { id: 'Writing', label: 'Writing', icon: '✍️' },
  { id: 'Image', label: 'Image', icon: '🖼️' },
  { id: 'Voice', label: 'Voice', icon: '🎙️' },
  { id: 'Learning', label: 'Learning', icon: '🎓' },
  { id: 'Productivity', label: 'Productivity', icon: '⚡' }
];

const toolsDataList = [
  { 
    name: 'ChatGPT', 
    tag: 'Writing Assistant', 
    desc: 'AI chatbot that helps answer questions, write content, and explain ideas.', 
    icon: '💬', 
    color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/35', 
    iconBg: 'bg-emerald-600/30 text-emerald-400',
    categories: ['Writing', 'Learning'] 
  },
  { 
    name: 'Google Gemini', 
    tag: 'Learning Assistant', 
    desc: 'AI assistant by Google that helps with writing, learning, and exploring ideas.', 
    icon: '✨', 
    color: 'bg-purple-500/20 text-purple-300 border-purple-500/35', 
    iconBg: 'bg-purple-600/30 text-purple-400',
    categories: ['Writing', 'Learning', 'Productivity'] 
  },
  { 
    name: 'Canva AI', 
    tag: 'Image Creator', 
    desc: 'AI design tool that helps create posters, presentations, and images easily.', 
    icon: '🎨', 
    color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/35', 
    iconBg: 'bg-cyan-600/30 text-cyan-400',
    categories: ['Image', 'Productivity'] 
  },
  { 
    name: 'QuillBot', 
    tag: 'Writing Helper', 
    desc: 'AI writing tool that helps paraphrase, summarize, and improve your writing.', 
    icon: '🤖', 
    color: 'bg-teal-500/20 text-teal-300 border-teal-500/35', 
    iconBg: 'bg-teal-600/30 text-teal-400',
    categories: ['Writing'] 
  },
  { 
    name: 'ElevenLabs', 
    tag: 'Voice AI', 
    desc: 'AI voice tool that converts text into natural-sounding speech.', 
    icon: '🔊', 
    color: 'bg-pink-500/20 text-pink-300 border-pink-500/35', 
    iconBg: 'bg-pink-600/30 text-pink-400',
    categories: ['Voice'] 
  },
  { 
    name: 'DeepL', 
    tag: 'Translation', 
    desc: 'AI tool that helps translate text more accurately and naturally.', 
    icon: '🌐', 
    color: 'bg-blue-500/20 text-blue-300 border-blue-500/35', 
    iconBg: 'bg-blue-600/30 text-blue-400',
    categories: ['Writing', 'Productivity'] 
  }
];

const ExploreAiTools = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTools = selectedCategory === 'All' 
    ? toolsDataList 
    : toolsDataList.filter(t => t.categories.includes(selectedCategory));

  return (
    <div className="h-screen w-screen overflow-hidden relative font-sans select-none">
      {/* Full BG Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/ai/challenge.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-slate-950/20 to-slate-950/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/60" />

      {/* Main Container */}
      <div className="relative z-10 h-full w-full flex flex-col p-4 md:p-6 lg:p-8">

        {/* ──── HEADER ──── */}
        <header className="w-full relative flex items-center justify-center shrink-0 mb-5 min-h-[50px]">
          <button
            onClick={() => navigate('/ai-intelligence-dashboard')}
            className="absolute left-0 w-10 h-10 bg-[#071330]/80 backdrop-blur-md rounded-full flex items-center justify-center text-white/80 hover:bg-white/10 transition-all border border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.2)]"
          >
            <ArrowLeft size={18} />
          </button>
          
          <div className="text-center flex flex-col items-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none">
              EXPLORE <span className="text-cyan-400">AI TOOLS</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed font-semibold mt-1.5">
              Discover amazing AI tools that can help you learn, create, write and do much more!
            </p>
          </div>
        </header>

        {/* ──── CONTENT AREA ──── */}
        <div className="flex-1 overflow-hidden">
          <div className="bg-[#05112e]/90 backdrop-blur-xl border-2 border-blue-500/30 rounded-[24px] p-5 shadow-[0_0_50px_rgba(0,0,0,0.7)] text-white h-full flex flex-col space-y-4">
            
            {/* 2. CATEGORIES */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]'
                      : 'bg-[#0d1f42]/60 border-blue-500/15 text-slate-350 hover:bg-[#122b5c]/70 hover:border-blue-500/35'
                  }`}
                >
                  <span className="text-sm">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* 3. TOOLS GRID — fills remaining space */}
            <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTools.map((tool) => (
                  <motion.div 
                    key={tool.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#0d1f42]/40 border border-blue-500/15 rounded-xl p-4 flex flex-col justify-between hover:border-blue-400/40 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all group relative"
                  >
                    <div className="absolute top-4 right-4 text-yellow-400 text-xs">⭐</div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${tool.iconBg}`}>
                          {tool.icon}
                        </div>
                        <div className="flex flex-col">
                          <h4 className="text-[15px] font-black text-white leading-tight">{tool.name}</h4>
                          <span className={`text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full mt-1 border w-max ${tool.color}`}>
                            {tool.tag}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-350 leading-relaxed font-semibold">
                        {tool.desc}
                      </p>
                    </div>

                    <div className="mt-3 flex justify-end">
                      <button className="w-7 h-7 rounded-full bg-blue-600/15 border border-blue-500/35 flex items-center justify-center text-blue-400 text-sm group-hover:bg-blue-600 group-hover:text-white transition-all cursor-pointer">
                        →
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ExploreAiTools;

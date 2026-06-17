import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Sparkles, PenTool, Image, Volume2, 
  GraduationCap, Cpu, MessageSquare, Palette, Bot, Globe 
} from 'lucide-react';

const toolsCategories = [
  { id: 'All', label: 'All Tools', icon: <Sparkles size={16} /> },
  { id: 'Writing', label: 'Writing', icon: <PenTool size={16} /> },
  { id: 'Image', label: 'Image', icon: <Image size={16} /> },
  { id: 'Voice', label: 'Voice', icon: <Volume2 size={16} /> },
  { id: 'Learning', label: 'Learning', icon: <GraduationCap size={16} /> },
  { id: 'Productivity', label: 'Productivity', icon: <Cpu size={16} /> }
];

const toolsDataList = [
  { name: 'ChatGPT', tag: 'Writing Assistant', desc: 'AI chatbot that helps answer questions, write content, and explain ideas.', icon: <MessageSquare size={22} />, color: 'bg-slate-50 text-slate-700', iconBg: 'bg-slate-100 text-slate-700', categories: ['Writing', 'Learning'] },
  { name: 'Google Gemini', tag: 'Learning Assistant', desc: 'AI assistant by Google that helps with writing, learning, and exploring ideas.', icon: <Sparkles size={22} />, color: 'bg-indigo-50 text-indigo-700', iconBg: 'bg-indigo-100 text-indigo-750', categories: ['Writing', 'Learning', 'Productivity'] },
  { name: 'Canva AI', tag: 'Image Creator', desc: 'AI design tool that helps create posters, presentations, and images easily.', icon: <Palette size={22} />, color: 'bg-blue-50 text-blue-750', iconBg: 'bg-blue-100 text-blue-750', categories: ['Image', 'Productivity'] },
  { name: 'QuillBot', tag: 'Writing Helper', desc: 'AI writing tool that helps paraphrase, summarize, and improve your writing.', icon: <Bot size={22} />, color: 'bg-slate-50 text-slate-700', iconBg: 'bg-slate-100 text-slate-700', categories: ['Writing'] },
  { name: 'ElevenLabs', tag: 'Voice AI', desc: 'AI voice tool that converts text into natural-sounding speech.', icon: <Volume2 size={22} />, color: 'bg-indigo-50 text-indigo-700', iconBg: 'bg-indigo-100 text-indigo-750', categories: ['Voice'] },
  { name: 'DeepL', tag: 'Translation', desc: 'AI tool that helps translate text more accurately and naturally.', icon: <Globe size={22} />, color: 'bg-blue-50 text-blue-750', iconBg: 'bg-blue-100 text-blue-750', categories: ['Writing', 'Productivity'] }
];

const ExploreAiTools = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const filteredTools = selectedCategory === 'All' ? toolsDataList : toolsDataList.filter(t => t.categories.includes(selectedCategory));

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans text-slate-900 overflow-x-hidden relative p-6 md:p-12">
      {/* Floating Back Button */}
      <button
        onClick={() => navigate("/ai-intelligence-dashboard")}
        className="fixed top-5 left-5 z-50 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-indigo-850 hover:shadow-lg transition-all border border-slate-100 group"
      >
        <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <div className="max-w-6xl mx-auto pt-10">
        <div className="bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Explore AI Tools</h2>
              <p className="text-sm text-slate-500 font-medium">Discover powerful tools that make learning and creating easy.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {toolsCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-indigo-900 text-white shadow-md shadow-indigo-150'
                      : 'bg-slate-50 text-slate-650 hover:bg-slate-100'
                  }`}
                >
                  <span>{cat.icon}</span> <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTools.map(tool => (
              <div key={tool.name} className="p-5 rounded-[20px] border border-slate-100 bg-white hover:border-indigo-150 hover:shadow-lg transition-all group cursor-pointer relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center ${tool.iconBg}`}>
                    {tool.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-850 transition-colors">{tool.name}</h4>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mt-1 inline-block ${tool.color}`}>
                      {tool.tag}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-slate-505 leading-relaxed font-medium">
                  {tool.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreAiTools;

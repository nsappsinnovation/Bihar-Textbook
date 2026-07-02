import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Globe, Rocket, FlaskConical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VrSimulators from './VrSimulators';
import VrTechLearning from './VrTechLearning';
import VrVirtualLab from './VrVirtualLab';

const VrDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('tech-learning'); // 'simulators' | 'tech-learning' | 'virtual-lab'

  const handleSectionSwitch = (section) => {
    setActiveSection(section);
    const targetId = 
      section === 'simulators' ? "simulators-section" : 
      section === 'virtual-lab' ? "virtual-lab-section" : 
      "tech-learning-section";
    setTimeout(() => {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);
  };

  const quickStats = [
    { 
      label: 'Learn VR Technology', 
      value: 'How It Works?', 
      icon: <Rocket className="text-blue-600" />, 
      color: 'bg-blue-50' 
    },
    { 
      label: 'Virtual Labs', 
      value: 'Practice in VR', 
      icon: <FlaskConical className="text-emerald-600" />, 
      color: 'bg-emerald-50' 
    },
    { 
      label: '360° Worlds', 
      value: 'Explore places', 
      icon: <Globe className="text-purple-600" />, 
      color: 'bg-purple-50' 
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex font-sans text-slate-900 overflow-x-hidden">
      <button
        onClick={() => navigate("/")}
        className="fixed top-3 left-3 md:top-5 md:left-5 z-50 w-9 h-9 md:w-10 md:h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-blue-600 hover:shadow-lg transition-all border border-slate-100 group"
      >
        <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>
      
      {/* Main Content */}
      <main className="flex-1 min-h-screen pb-12 overflow-y-auto">
        <div className="px-4 sm:px-6 md:px-12 2xl:px-20 space-y-6 md:space-y-8 pt-4 2xl:max-w-[1600px] 2xl:mx-auto">

          {/* Hero & Stats Section */}
          <div className="relative">
            {/* Hero Section */}
            <section className="bg-white rounded-[16px] md:rounded-[24px] overflow-hidden relative border border-slate-100 flex items-center min-h-[200px] sm:min-h-[260px] md:min-h-[300px] 2xl:min-h-[380px] pb-4 md:pb-6">
              <div className="relative z-10 p-5 sm:p-8 md:p-10 lg:w-1/2 space-y-3 md:space-y-4">
                 <h1 className="text-[24px] sm:text-[28px] md:text-[36px] lg:text-[42px] 2xl:text-[52px] font-extrabold leading-[1.05] tracking-tight text-[#1e293b]">
                    Step into <br /> Imagination. <br />
                    <span className="text-blue-600">Learn in VR.</span>
                 </h1>
                 <p className="text-slate-500 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-medium leading-relaxed max-w-sm">
                   Explore, interact and understand difficult concepts through immersive VR experiences.
                 </p>
                 
                 <div className="pt-2">
                   <button 
                     onClick={() => handleSectionSwitch('tech-learning')}
                     className="px-5 py-2.5 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-full font-bold text-[12px] sm:text-[14px] flex items-center gap-2 hover:bg-blue-700 transition-colors w-max shadow-sm shadow-blue-200"
                   >
                     Start Learning <ArrowRight size={16} />
                   </button>
                 </div>
              </div>

              <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full">
                 <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
                 <img src="/images/vr/rhs.png" alt="VR Learning" className="w-full h-full object-cover object-right-top" />
              </div>
            </section>

            {/* Quick Stats Row */}
            <section id="content-section" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6 relative z-20 -mt-6 md:-mt-8 px-3 sm:px-4 md:px-12">
              {quickStats.map((stat, i) => (
                <div 
                  key={i}
                  onClick={() => {
                    if (i === 0) {
                      handleSectionSwitch('tech-learning');
                    } else if (i === 1) {
                      handleSectionSwitch('virtual-lab');
                    } else {
                      handleSectionSwitch('simulators');
                    }
                  }}
                  className="bg-white rounded-[16px] p-4 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex items-center gap-4 transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                >
                   <div className={`w-[48px] h-[48px] ${stat.color} rounded-[12px] flex items-center justify-center shrink-0 [&>svg]:w-5 [&>svg]:h-5`}>
                      {stat.icon}
                   </div>
                   <div>
                      <h4 className="text-[14px] font-extrabold text-[#1E293B] leading-tight">{stat.label}</h4>
                      <p className="text-[11px] font-medium text-slate-400 mt-0.5">{stat.value}</p>
                   </div>
                </div>
              ))}
            </section>
          </div>

          {/* Bottom Interactive Section (Toggled between Simulators, Tech Learning, and Virtual Lab) */}
          {activeSection === 'simulators' ? (
            <div className="pt-4 pb-12" id="simulators-section">
              <VrSimulators />
            </div>
          ) : activeSection === 'virtual-lab' ? (
            <div className="pt-4 pb-12" id="virtual-lab-section">
              <VrVirtualLab />
            </div>
          ) : (
            <div id="tech-learning-section" className="pt-4 pb-12">
              <VrTechLearning 
                isEmbedded={true} 
                onBack={() => {
                  setActiveSection('simulators');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
              />
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default VrDashboard;

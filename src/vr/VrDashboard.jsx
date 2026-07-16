import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Globe, Rocket, FlaskConical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VrSimulators from './VrSimulators';
import VrTechLearning from './VrTechLearning';
import VrVirtualLab from './VrVirtualLab';

const VrHeadsetIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="7" width="20" height="10" rx="2" ry="2"></rect>
    <path d="M9 17v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2"></path>
    <path d="M2 12h20"></path>
  </svg>
);

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
      icon: <Rocket className="text-indigo-600" />, 
      color: 'bg-indigo-50' 
    },
    { 
      label: 'VR Science Labs', 
      value: 'Immersive Practice', 
      icon: <VrHeadsetIcon className="text-purple-600" />, 
      color: 'bg-purple-100' 
    },
    { 
      label: '360° Worlds', 
      value: 'Explore places', 
      icon: <Globe className="text-indigo-600" />, 
      color: 'bg-indigo-50' 
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex font-sans text-slate-900 overflow-x-hidden">
      <button
        onClick={() => navigate("/#missions-grid")}
        className="absolute top-[96px] md:top-[112px] left-[24px] md:left-[48px] z-50 w-9 h-9 md:w-10 md:h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-blue-600 hover:shadow-lg transition-all border border-slate-100 group"
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
              </div>

              <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full">
                 <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
                 <img src="/images/vr/rhs.png" alt="VR Learning" className="w-full h-full object-cover object-right-top" />
              </div>
            </section>

            {/* Quick Stats Row */}
            <section id="content-section" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6 relative z-20 -mt-6 md:-mt-8 px-3 sm:px-4 md:px-12">
              {quickStats.map((stat, i) => {
                const isActive = i === 0 ? activeSection === 'tech-learning' : i === 1 ? activeSection === 'virtual-lab' : activeSection === 'simulators';
                return (
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
                    className={`bg-white rounded-[16px] p-3 md:p-4 border ${isActive ? 'border-blue-500 ring-2 ring-blue-500/10 shadow-md' : 'border-slate-50 shadow-[0_4px_20px_rgba(0,0,0,0.06)]'} flex items-center gap-3 md:gap-4 hover:shadow-md transition-shadow cursor-pointer group`}
                  >
                     <div className={`w-[44px] h-[44px] ${isActive ? 'bg-blue-600 text-white' : stat.color} rounded-[12px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform [&>svg]:w-5 [&>svg]:h-5`}>
                        {React.cloneElement(stat.icon, { className: isActive ? 'text-white' : stat.icon.props.className })}
                     </div>
                     <div>
                        <h4 className={`text-[13px] font-bold leading-tight transition-colors ${isActive ? 'text-blue-700' : 'text-[#1e1b4b] group-hover:text-blue-600'}`}>{stat.label}</h4>
                        <p className={`text-[11px] font-medium mt-0.5 ${isActive ? 'text-blue-600/80' : 'text-slate-550 text-slate-500'}`}>{stat.value}</p>
                     </div>
                  </div>
                );
              })}
            </section>
          </div>

          {/* Bottom Interactive Section (Toggled between Simulators, Tech Learning, and Virtual Lab) */}
          {activeSection === 'simulators' ? (
            <div className="px-4 sm:px-10 md:px-12 lg:px-14 xl:px-14 max-w-[1380px] mx-auto pt-4 pb-12" id="simulators-section">
              <VrSimulators />
            </div>
          ) : activeSection === 'virtual-lab' ? (
            <div className="px-4 sm:px-10 md:px-12 lg:px-14 xl:px-14 max-w-[1380px] mx-auto pt-4 pb-12" id="simulators-section">
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

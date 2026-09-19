import React, { useMemo } from "react";
import {
  FiUsers,
  FiBookOpen,
  FiMonitor,
  FiTruck,
  FiCreditCard,
  FiZap,
  FiSun,
} from "react-icons/fi";
import {
  RiGraduationCapLine,
  RiFlaskLine,
  RiBookmarkLine,
  RiLeafLine,
} from "react-icons/ri";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const CoreMissions = () => {
  const { t } = useTranslation();

  const missions = useMemo(
    () => [
      {
        id: 1,
        titleKey: "coreMissions.items.title0",
        descKey: "coreMissions.items.desc0",
        title: "Accessible Learning Resources",
        icon: <FiUsers />,
        color: "#6366f1",
        description:
          "Making textbooks and learning resources accessible to learners across Bihar.",
      },
      {
        id: 2,
        titleKey: "coreMissions.items.title1",
        descKey: "coreMissions.items.desc1",
        title: "Curriculum-Based Content",
        icon: <FiBookOpen />,
        color: "#eab308",
        description:
          "Publishing textbooks prepared in accordance with the curriculum and academic framework of Bihar.",
      },
      {
        id: 3,
        titleKey: "coreMissions.items.title2",
        descKey: "coreMissions.items.desc2",
        title: "Local Language & Context",
        icon: <FiSun />,
        color: "#22c55e",
        description:
          "Providing learning materials across subjects and languages relevant to learners in Bihar.",
      },
      {
        id: 4,
        titleKey: "coreMissions.items.title3",
        descKey: "coreMissions.items.desc3",
        title: "Statewide Textbook Supply",
        icon: <FiTruck />,
        color: "#3b82f6",
        description:
          "Supporting the printing and distribution of textbooks to destinations across Bihar.",
      },
      {
        id: 5,
        titleKey: "coreMissions.items.title4",
        descKey: "coreMissions.items.desc4",
        title: "Affordable Textbooks",
        icon: <FiCreditCard />,
        color: "#ef4444",
        description:
          "Supporting access to textbooks for school students through the state's textbook publishing system.",
      },
      {
        id: 6,
        titleKey: "coreMissions.items.title5",
        descKey: "coreMissions.items.desc5",
        title: "Learning Support Materials",
        icon: <FiZap />,
        color: "#f97316",
        description:
          "Providing textbooks, workbooks, handbooks and other educational materials for students and educators.",
      },
      {
        id: 7,
        titleKey: "coreMissions.items.title6",
        descKey: "coreMissions.items.desc6",
        title: "Digital Access",
        icon: <RiGraduationCapLine />,
        color: "#a855f7",
        description:
          "Making textbooks available online for students to access learning materials digitally.",
      },
      {
        id: 8,
        titleKey: "coreMissions.items.title7",
        descKey: "coreMissions.items.desc7",
        title: "Efficient Publishing",
        icon: <RiLeafLine />,
        color: "#db2777",
        description:
          "Coordinating textbook printing, publishing and supply to support timely availability of learning materials.",
      },
    ],
    [t],
  );

  const CentralBook = () => (
    <motion.div
      initial={{ rotateY: 0 }}
      whileInView={{ rotateY: 360 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="relative w-full h-full flex items-center justify-center text-[#222f6d]"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-12 h-12"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
      {/* Decorative Rings */}
      <div className="absolute inset-0 border border-[#222f6d]/10 rounded-full animate-[spin_12s_linear_infinite]" />
      <div className="absolute inset-[-6px] border border-dashed border-[#222f6d]/10 rounded-full animate-[spin_18s_linear_infinite_reverse]" />
    </motion.div>
  );

  // Constants
  const ORBIT_DURATION = 60; // seconds for full rotation
  const RADIUS = 300; // Reduced distance to bring elements closer

  return (
    <section className="py-18 bg-white overflow-hidden relative min-h-[850px] flex items-center border-t border-gray-50/50">
      {/* Enhanced Technical Background Image */}
      <div
        className="absolute inset-0 opacity-[0.25] pointer-events-none bg-no-repeat bg-center mix-blend-multiply"
        style={{
          backgroundImage: "url('/images/core_mission_bg.webp')",
          backgroundSize: "75% auto",
        }}
      />

      <div className="container mx-auto px-6 relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold text-[#0d0e23] mb-6 tracking-tight">
            {t("coreMissions.headingLine1", "The Eight")}{" "}
            <span className="text-blue-600/90">
              {t("coreMissions.headingLine2", "Core Pillars")}
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-gray-500 text-lg font-light leading-relaxed">
            {t(
              "coreMissions.subheading",
              "A structured framework guiding BSTBPC’s mission to strengthen learning outcomes across Bihar.",
            )}
          </p>
        </div>

        {/* --- MOBILE VIEW (Grid) --- */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className="bg-white p-4 rounded-xl border border-gray-100 flex items-start gap-4 shadow-sm"
            >
              <div
                className="w-10 h-10 shrink-0 rounded-full bg-gray-50 flex items-center justify-center text-[14px]"
                style={{ color: mission.color }}
              >
                {mission.icon}
              </div>
              <div>
                <h3 className="font-semibold text-sm text-[#0d0e23] mb-1">
                  {t(mission.titleKey, mission.title)}
                </h3>
                <p className="text-[11px] text-gray-500 leading-snug">
                  {t(mission.descKey, mission.description)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* --- DESKTOP ORBIT VIEW --- */}
        <div className="hidden lg:flex justify-center items-center h-[900px] relative -mt-32">
          {/* Main Container - Centered */}
          <div className="relative w-[1000px] h-[1000px] flex items-center justify-center group/orbit pointer-events-none">
            {/* 1. CENTRAL HUB (Static - does not orbit) */}
            <div className="absolute z-30 w-32 h-32 bg-white rounded-full border border-gray-100/60 flex items-center justify-center p-6 shadow-sm pointer-events-auto">
              <CentralBook />
            </div>

            {/* 2. ORBIT SYSTEM (Rotates CW) */}
            <div className="absolute inset-0 animate-[slowOrbit_60s_linear_infinite] group-hover/orbit:[animation-play-state:paused]">
              {missions.map((mission, idx) => {
                // Calculate position on the circle
                const angleDeg = idx * (360 / missions.length);
                const angleRad = (angleDeg - 90) * (Math.PI / 180); // -90 to start top
                const x = Math.cos(angleRad) * RADIUS;
                const y = Math.sin(angleRad) * RADIUS;

                // Determine text alignment based on position
                return (
                  <div
                    key={mission.id}
                    className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                  >
                    {/* 
                      3. NODE COUNTER-ROTATION (Rotates CCW)
                      This cancels the system rotation, keeping the node upright.
                      The Icon is the absolute CENTER.
                    */}
                    <div className="animate-[slowOrbitReverse_60s_linear_infinite] group-hover/orbit:[animation-play-state:paused] relative group flex items-center justify-center w-12 h-12 pointer-events-auto">
                      {/* ICON (The Anchor) */}
                      <div
                        className="w-16 h-16 shrink-0 rounded-full bg-white border border-gray-100 flex items-center justify-center text-2xl shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-blue-200 group-hover:shadow-lg cursor-pointer relative z-20"
                        style={{ color: mission.color }}
                      >
                        {mission.icon}
                      </div>

                      {/* MAIN TEXT (Title) - Attached Permanent Below */}
                      <div className="absolute top-[120%] left-1/2 -translate-x-1/2 w-[180px] text-center z-10 pointer-events-none">
                        <h4 className="font-bold text-[13px] text-slate-600 leading-tight inline-block">
                          {t(mission.titleKey, mission.title)}
                        </h4>
                      </div>

                      {/* HOVER DESCRIPTION - Optional Tooltip for extra info */}
                      <div className="absolute top-full mt-8 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 w-[220px]">
                        <div className="bg-white p-3 rounded-xl shadow-xl border border-gray-100 text-center relative after:content-[''] after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-b-white">
                          <p className="text-[11px] text-gray-500 leading-snug">
                            {t(mission.descKey, mission.description)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Orbit Path Visual */}
            <div className="absolute inset-0 rounded-full border border-dashed border-gray-200/50 pointer-events-none scale-[0.8] opacity-50" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slowOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slowOrbitReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </section>
  );
};

export default CoreMissions;

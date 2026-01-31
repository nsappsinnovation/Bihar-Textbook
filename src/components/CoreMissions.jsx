import React, { useMemo } from "react";
import {
  FiUsers,
  FiBookOpen,
  FiMonitor,
  FiTruck,
  FiCreditCard,
  FiZap,
} from "react-icons/fi";
import { RiGraduationCapLine, RiFlaskLine } from "react-icons/ri";
import { motion } from "framer-motion";

/**
 * ✅ Improvements:
 * 1) "Ferris Wheel" Rotation: Nodes orbit the center, but text/icon stays upright.
 * 2) 8-Point Symmetry: Added "Research & Innovation" for perfect balance.
 * 3) Math-based positioning: Ensures a perfect circle (no uneven wobble).
 */

const CoreMissions = () => {
  const missions = useMemo(
    () => [
      {
        id: 1,
        title: "Inclusive & Equitable Learning",
        icon: <FiUsers />,
        color: "#6366f1", // Indigo
        description: "Ensuring every learner across Bihar has equal access to high-quality resources.",
      },
      {
        id: 2,
        title: "Quality & Pedagogy Standards",
        icon: <FiBookOpen />,
        color: "#eab308", // Yellow
        description: "Strengthening content accuracy via structured review and continuous improvement.",
      },
      {
        id: 3,
        title: "Digital Learning Ecosystem",
        icon: <FiMonitor />,
        color: "#22c55e", // Green
        description: "Expanding access via e-books and interactive content aligned with modern needs.",
      },
      {
        id: 4,
        title: "Seamless Supply Chain",
        icon: <FiTruck />,
        color: "#3b82f6", // Blue
        description: "Ensuring efficient textbook delivery to every school—down to the last mile.",
      },
      {
        id: 5,
        title: "Affordable Textbooks",
        icon: <FiCreditCard />,
        color: "#ef4444", // Red
        description: "Providing quality learning materials at minimal cost to support all families.",
      },
      {
        id: 6,
        title: "Empowered Educators",
        icon: <FiZap />,
        color: "#f97316", // Orange
        description: "Supporting teachers through structured guides and training-aligned materials.",
      },
      {
        id: 7,
        title: "Future-Ready Learners",
        icon: <RiGraduationCapLine />,
        color: "#a855f7", // Purple
        description: "Enabling 21st-century skills through updated curriculum and modern pedagogy.",
      },
      {
        id: 8,
        title: "Research & Innovation",
        icon: <RiFlaskLine />,
        color: "#db2777", // Pink
        description: "Fostering educational research and innovative practices for systemic growth.",
      },
    ],
    []
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
    <section className="py-24 bg-white overflow-hidden relative min-h-[850px] flex items-center border-t border-gray-50/50">
      {/* Enhanced Technical Background Image */}
      <div
        className="absolute inset-0 opacity-[0.25] pointer-events-none bg-no-repeat bg-center mix-blend-multiply"
        style={{
          backgroundImage: "url('/images/core_mission_bg.png')",
          backgroundSize: "75% auto",
        }}
      />

      <div className="container mx-auto px-6 relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-gray-50/80 rounded-full mb-4 border border-gray-100">
            <span className="text-gray-500 font-bold tracking-[0.25em] uppercase text-[9px]">
              Strategic Intent
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-[#0d0e23] mb-6 tracking-tight">
            The Eight <span className="text-blue-600/90">Core Pillars</span>
          </h2>
          <p className="max-w-3xl mx-auto text-gray-500 text-lg font-light leading-relaxed">
            A structured framework guiding BSTPC’s mission to strengthen learning outcomes across Bihar.
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
                  {mission.title}
                </h3>
                <p className="text-[11px] text-gray-500 leading-snug">
                  {mission.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* --- DESKTOP ORBIT VIEW --- */}
        <div className="hidden lg:flex justify-center items-center h-[900px] relative mt-12">

          {/* Main Container - Centered */}
          <div className="relative w-[1000px] h-[1000px] flex items-center justify-center">

            {/* 1. CENTRAL HUB (Static - does not orbit) */}
            <div className="absolute z-30 w-32 h-32 bg-white rounded-full border border-gray-100/60 flex items-center justify-center p-6 shadow-sm">
              <CentralBook />
            </div>

            {/* 2. ORBIT SYSTEM (Rotates CW) */}
            <div className="absolute inset-0 animate-[slowOrbit_60s_linear_infinite]">
              {missions.map((mission, idx) => {
                // Calculate position on the circle
                const angleDeg = idx * (360 / missions.length);
                const angleRad = (angleDeg - 90) * (Math.PI / 180); // -90 to start top
                const x = Math.cos(angleRad) * RADIUS;
                const y = Math.sin(angleRad) * RADIUS;

                // Determine text alignment based on position
                const isLeft = x < -10;

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
                    */}
                    <div className="animate-[slowOrbitReverse_60s_linear_infinite] flex items-center justify-center relative group">

                      {/* Connection Line to Center (Optional - can be added here if needed) */}

                      {/* CONTENT BUBBLE */}
                      {/* Flex direction based on side to avoid text covering icon */}
                      <div className={`flex items-center gap-3 w-[220px] transition-all duration-300 ${isLeft ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>

                        {/* ICON (The Anchor) */}
                        <div
                          className="w-12 h-12 shrink-0 rounded-full bg-white border border-gray-100 flex items-center justify-center text-lg shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:border-blue-200 group-hover:shadow-[0_10px_25px_-5px_rgba(59,130,246,0.4)] cursor-pointer relative z-20"
                          style={{ color: mission.color }}
                        >
                          {mission.icon}
                        </div>

                        {/* TEXT */}
                        <div className="flex-1 opacity-80 group-hover:opacity-100 transition-opacity">
                          <h4 className="font-semibold text-[14px] text-[#0d0e23] leading-tight mb-1 group-hover:text-blue-600 transition-colors">
                            {mission.title}
                          </h4>
                          <p className="text-[11px] text-gray-500 leading-snug hidden group-hover:block absolute top-[120%] bg-white p-3 rounded-lg shadow-xl border border-gray-100 w-[200px] z-50">
                            {mission.description}
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
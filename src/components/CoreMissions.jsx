import React, { useMemo } from "react";
import {
  FiUsers,
  FiBookOpen,
  FiMonitor,
  FiTruck,
  FiCreditCard,
  FiZap,
} from "react-icons/fi";
import { RiGraduationCapLine } from "react-icons/ri";

/**
 * ✅ Improvements:
 * 1) Slow rotation of the whole radial system (very subtle + professional)
 * 2) "Upright labels" (nodes counter-rotate so text stays readable)
 * 3) Cleaner, more official content (BSTPC tone)
 * 4) Slight hover polish + better spacing and readability
 */

const CoreMissions = () => {
  const missions = useMemo(
    () => [
      {
        id: 1,
        title: "Inclusive & Equitable Learning",
        icon: <FiUsers />,
        color: "#6366f1",
        position: "right-top",
        description:
          "Ensuring every learner in Bihar—across rural and urban regions—has equal access to high-quality learning resources.",
      },
      {
        id: 2,
        title: "Quality & Pedagogy Standards",
        icon: <FiBookOpen />,
        color: "#eab308",
        position: "top",
        description:
          "Strengthening content accuracy, pedagogy, and editorial rigor through structured review, validation, and continuous improvement.",
      },
      {
        id: 3,
        title: "Digital Learning Ecosystem",
        icon: <FiMonitor />,
        color: "#22c55e",
        position: "left-top",
        description:
          "Expanding access via e-books, interactive content, and digital delivery channels aligned with modern classroom needs.",
      },
      {
        id: 4,
        title: "Seamless Supply & Distribution",
        icon: <FiTruck />,
        color: "#3b82f6",
        position: "left-center",
        description:
          "Ensuring timely, transparent, and efficient textbook delivery to every school—down to the last mile.",
      },
      {
        id: 5,
        title: "Affordable & Accessible Textbooks",
        icon: <FiCreditCard />,
        color: "#ef4444",
        position: "left-bottom",
        description:
          "Providing quality learning materials at minimal cost to support affordability for families and institutions.",
      },
      {
        id: 6,
        title: "Empowered Educators",
        icon: <FiZap />,
        color: "#f97316",
        position: "bottom",
        description:
          "Supporting teachers through structured guides, classroom resources, and training-aligned academic materials.",
      },
      {
        id: 7,
        title: "Future-Ready Learners",
        icon: <RiGraduationCapLine />,
        color: "#a855f7",
        position: "right-bottom",
        description:
          "Enabling 21st-century skills through updated curriculum design, competency-based learning, and modern pedagogy alignment.",
      },
    ],
    []
  );

  const CentralBook = () => (
    <div className="relative w-full h-full flex items-center justify-center text-[#222f6d]">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>

      {/* subtle decorative rings */}
      <div className="absolute inset-0 border border-[#222f6d]/10 rounded-full animate-[spin_12s_linear_infinite]" />
      <div className="absolute inset-[-6px] border border-dashed border-[#222f6d]/10 rounded-full animate-[spin_18s_linear_infinite_reverse]" />
    </div>
  );

  // Expanded coordinates for layout
  const getFixedPosition = (pos) => {
    switch (pos) {
      case "top":
        return { x: 0, y: -250 };
      case "right-top":
        return { x: 340, y: -160 };
      case "right-bottom":
        return { x: 340, y: 160 };
      case "bottom":
        return { x: 0, y: 250 };
      case "left-bottom":
        return { x: -340, y: 160 };
      case "left-center":
        return { x: -400, y: 0 };
      case "left-top":
        return { x: -340, y: -160 };
      default:
        return { x: 0, y: 0 };
    }
  };

  // Hair-line path connections
  const getPath = (pos) => {
    const c = 500;
    const offset = 62;
    switch (pos) {
      case "top":
        return `M ${c} ${c - offset} L ${c} ${c - 250}`;
      case "right-top":
        return `M ${c + offset} ${c} Q ${c + 180} ${c} ${c + 340} ${c - 160}`;
      case "right-bottom":
        return `M ${c + offset} ${c} Q ${c + 180} ${c} ${c + 340} ${c + 160}`;
      case "bottom":
        return `M ${c} ${c + offset} L ${c} ${c + 250}`;
      case "left-bottom":
        return `M ${c - offset} ${c} Q ${c - 180} ${c} ${c - 340} ${c + 160}`;
      case "left-center":
        return `M ${c - offset} ${c} L ${c - 400} ${c}`;
      case "left-top":
        return `M ${c - offset} ${c} Q ${c - 180} ${c} ${c - 340} ${c - 160}`;
      default:
        return "";
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden relative min-h-[820px] flex items-center border-t border-gray-50/50">
      {/* Minimal Grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#222f6d 1px, transparent 1px), linear-gradient(90deg, #222f6d 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-gray-50/80 rounded-full mb-4 border border-gray-100">
            <span className="text-gray-500 font-bold tracking-[0.25em] uppercase text-[9px]">
              Strategic Intent
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#0d0e23] mb-4 tracking-tight">
            The Seven <span className="text-blue-600/80">Core Pillars</span>
          </h2>

          <p className="max-w-2xl mx-auto text-gray-500 text-base font-light leading-relaxed">
            A structured framework guiding BSTPC’s mission to strengthen learning outcomes across Bihar.
          </p>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className="bg-white p-4 rounded-xl border border-gray-100 flex items-start gap-4 group shadow-[0_2px_10px_-6px_rgba(0,0,0,0.10)] hover:shadow-[0_18px_40px_-22px_rgba(0,0,0,0.25)] transition"
            >
              <div
                className="w-10 h-10 shrink-0 rounded-full bg-gray-50 flex items-center justify-center text-[14px] opacity-90"
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

        {/* Desktop Radial */}
        <div className="hidden lg:flex justify-center items-center h-[680px] relative mt-12">
          {/* Rotating system container */}
          <div className="relative w-[1000px] h-[1000px] flex items-center justify-center animate-[slowOrbit_40s_linear_infinite]">
            {/* Central Hub (counter-rotate to keep it upright) */}
            <div className="relative z-30 w-32 h-32 bg-white rounded-full border border-gray-100/60 flex items-center justify-center p-6 shadow-sm transition-all hover:scale-[1.03] animate-[slowOrbitReverse_40s_linear_infinite]">
              <CentralBook />
            </div>

            {/* Nodes (counter-rotate so text stays upright) */}
            <div className="absolute inset-0 flex items-center justify-center animate-[slowOrbitReverse_40s_linear_infinite]">
              <div className="relative w-1 h-1">
                {missions.map((mission, idx) => {
                  const pos = getFixedPosition(mission.position);
                  const isLeft = mission.position.includes("left");

                  return (
                    <div key={idx} className="absolute inset-0 flex items-center justify-center">
                      {/* Connection */}
                      <svg
                        className="absolute w-[1000px] h-[1000px] overflow-visible pointer-events-none"
                        viewBox="0 0 1000 1000"
                      >
                        <path
                          d={getPath(mission.position)}
                          fill="none"
                          stroke="#e2e8f0"
                          strokeWidth="0.6"
                          strokeDasharray="3 4"
                          className="opacity-70"
                        />
                      </svg>

                      {/* Node */}
                      <div
                        className="absolute"
                        style={{
                          top: pos.y,
                          left: pos.x,
                          transform: "translate(-50%, -50%)",
                          pointerEvents: "auto",
                        }}
                      >
                        <div
                          className={`flex items-center gap-4 group ${
                            isLeft ? "flex-row-reverse text-right" : ""
                          }`}
                        >
                            
                          {/* Icon pod */}
                          <div
                            className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-lg relative z-20 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:border-blue-200 group-hover:shadow-[0_18px_35px_-22px_rgba(59,130,246,0.6)]"
                            style={{ color: mission.color }}
                          >
                            {mission.icon}
                          </div>

                          {/* Content */}
                          <div className="w-[230px]">
                            <h4 className="font-semibold text-[15px] text-[#0d0e23] mb-0.5 transition-colors group-hover:text-blue-600">
                              {mission.title}
                            </h4>

                            <div className="max-h-0 group-hover:max-h-24 overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100">
                              <p className="text-xs text-gray-600 font-normal leading-relaxed pt-1">
                                {mission.description}
                              </p>
                            </div>

                            <div
                              className={`mt-2 h-[1px] w-0 group-hover:w-24 transition-all duration-500 ${
                                isLeft ? "ml-auto" : ""
                              }`}
                              style={{ backgroundColor: mission.color, opacity: 0.25 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Soft radial glow */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_60%)] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes slowOrbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes slowOrbitReverse {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
      `}</style>
    </section>
  );
};

export default CoreMissions;
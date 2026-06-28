import React from "react";
import { GraduationCap, BookOpen, Landmark, Building2, Users, Truck, Lightbulb, HeartHandshake, Briefcase, Quote } from "lucide-react";

const stakeholderData = [
  {
    name: "Students & Learners",
    role: "Core Beneficiary",
    icon: GraduationCap,
    quote: "The ultimate beneficiaries of our ecosystem, whose curiosity and growth drive every educational initiative in Bihar.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    name: "Teachers & Educators",
    role: "Academic Pillar",
    icon: BookOpen,
    quote: "The pillars of our society who mold young minds and bring the curriculum to life through dedicated pedagogy.",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    name: "Educational Institutions",
    role: "Learning Grounds",
    icon: Landmark,
    quote: "The foundational grounds where infrastructure meets innovation to foster holistic development and learning.",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
  {
    name: "Department of Education",
    role: "Policy Maker",
    icon: Building2,
    quote: "The guiding force establishing policies and ensuring equitable access to quality education for all across the state.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    name: "Parents & Guardians",
    role: "Support System",
    icon: Users,
    quote: "The essential partners in learning who support, encourage, and nurture students beyond the classroom walls.",
    color: "text-pink-500",
    bg: "bg-pink-50",
  },
  {
    name: "Logistics Partners",
    role: "Supply Chain",
    icon: Truck,
    quote: "The crucial link ensuring that every student receives the right textbooks and learning materials on time.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    name: "Curriculum Experts",
    role: "Knowledge Architects",
    icon: Lightbulb,
    quote: "The visionary minds crafting modern, NEP-aligned syllabi to prepare our youth for the challenges of tomorrow.",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    name: "CSR & NGO Partners",
    role: "Collaborators",
    icon: HeartHandshake,
    quote: "The collaborative forces bringing additional resources, innovation, and support to bridge educational gaps.",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    name: "District Officers",
    role: "Field Leaders",
    icon: Briefcase,
    quote: "The on-ground leaders implementing state policies and ensuring administrative excellence at the grassroots.",
    color: "text-cyan-500",
    bg: "bg-cyan-50",
  },
];

export default function StakeHolder() {
  const row1 = [...stakeholderData.slice(0, 5), ...stakeholderData.slice(0, 5), ...stakeholderData.slice(0, 5)];
  const row2 = [...stakeholderData.slice(4, 9), ...stakeholderData.slice(4, 9), ...stakeholderData.slice(4, 9)];

  const StakeholderCard = ({ item }) => {
    const Icon = item.icon;
    return (
      <div
        className="
          w-[290px] md:w-[330px] h-[190px] md:h-[210px] flex-shrink-0 flex flex-col p-5 mx-4
          rounded-2xl bg-white border border-slate-200/50 shadow-none
        "
      >
        <div className="mb-2.5">
          <svg className={`w-5.5 h-5.5 ${item.color} opacity-15`} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
          </svg>
        </div>

        <div className="flex-grow mb-3 overflow-y-auto no-scrollbar">
          <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
            "{item.quote}"
          </p>
        </div>

        <div className="flex items-center gap-3 mt-auto pt-2.5 border-t border-slate-100">
          <div className={`w-8 h-8 md:w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${item.bg} ${item.color}`}>
            <Icon size={18} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-xs md:text-sm font-bold text-slate-800 leading-tight">
              {item.name}
            </h3>
            <p className={`mt-0.5 text-[8px] md:text-[9px] font-bold uppercase tracking-wider leading-snug ${item.color}`}>
              {item.role}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#fffdf8] py-24 border-t border-slate-100 font-sans">
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(calc(-100% / 3)); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* --- Standardized Header --- */}
      <div className="max-w-[1400px] mx-auto mb-16 px-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-8 h-[1.5px] bg-[#5ba7f7]" />
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#5ba7f7]">
            Our Network
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-4">
          Collaborating for an <br />
          <span className="text-slate-400">Educated & Empowered Bihar</span>
        </h2>
        <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed max-w-3xl">
          Building a unified ecosystem with students, educators, and institutional partners to drive sustainable growth.
        </p>
      </div>

      {/* Marquee Rows Container */}
      <div className="relative flex flex-col gap-8 w-full max-w-[100vw] overflow-hidden">
        {/* ROW 1 - Scrolling Left */}
        <div className="w-full no-scrollbar overflow-hidden">
          <div className="flex w-max animate-scroll-left px-4">
            {row1.map((item, i) => (
              <StakeholderCard key={`row1-${i}`} item={item} />
            ))}
          </div>
        </div>

        {/* ROW 2 - Scrolling Right */}
        <div className="w-full no-scrollbar overflow-hidden">
          <div className="flex w-max animate-scroll-right px-4">
            {row2.map((item, i) => (
              <StakeholderCard key={`row2-${i}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";

const row1 = [
  "Students & Learners",
  "Teachers & Educators",
  "Educational Institutions",
  "Department of Education, Bihar",
];

const row2 = [
  "Parents & Guardians",
  "Printing & Logistics Partners",
  "Curriculum Experts",
  "CSR & NGO Partners",
  "District Education Officers",
];

export default function StakeHolder() {
  const StakeholderCard = ({ text }) => (
    <div className="group relative inline-flex items-center gap-3 px-8 py-5 rounded-2xl text-sm font-bold text-slate-700
      bg-white border border-slate-200
      transition-all duration-500 ease-out
      hover:border-indigo-300
      whitespace-nowrap cursor-default overflow-hidden">

      <div className="w-2 h-2 rounded-full bg-indigo-500 transition-transform duration-300 group-hover:scale-125" />
      <span className="relative z-10">{text}</span>
    </div>
  );

  return (
    <section className="relative w-full overflow-hidden bg-[#fcfcfd] py-24 px-6 md:px-12 lg:px-24 border-t border-slate-100">

      {/* --- Standardized Header (Simple Like Others) --- */}
      <div className="max-w-[1280px] mx-auto mb-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-indigo-500"></div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em]">Our Network</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
            Collaborating for an <br />
            <span className="text-slate-400">Educated & Empowered Bihar</span>
          </h2>
          <p className="text-lg text-slate-500 font-normal leading-relaxed">
            Building a unified ecosystem with students, educators, and institutional partners to drive sustainable growth.
          </p>
        </div>
      </div>

      {/* Marquee Rows Container */}
      <div className="flex flex-col gap-10">

        {/* ROW 1 - Right to Left */}
        <div className="flex overflow-hidden">
          <div className="flex gap-8 animate-marquee whitespace-nowrap">
            {[...row1, ...row1, ...row1].map((item, i) => (
              <StakeholderCard key={`row1-1-${i}`} text={item} />
            ))}
          </div>
        </div>

        {/* ROW 2 - Left to Right */}
        <div className="flex overflow-hidden">
          <div className="flex gap-8 animate-marquee-reverse whitespace-nowrap">
            {[...row2, ...row2, ...row2].map((item, i) => (
              <StakeholderCard key={`row2-1-${i}`} text={item} />
            ))}
          </div>
        </div>

      </div>

      {/* Edge Fades */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#fcfcfd] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#fcfcfd] to-transparent z-10 pointer-events-none" />

    </section>
  );
}

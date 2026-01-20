
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
  const Button = ({ text }) => (
    <div className="group/btn relative inline-flex items-center gap-3 px-6 py-4 rounded-xl text-sm md:text-base font-semibold text-white
      bg-white/5 backdrop-blur-lg border border-white/10
      transition-all duration-500 ease-out
      hover:border-indigo-400/50 hover:bg-white/10
      hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]
      whitespace-nowrap cursor-default overflow-hidden">

      {/* Animated Gradient Background on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-orange-400/20 to-indigo-600/20 
        opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700" />

      {/* Subtle Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
        -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />

      <div className="relative w-2 h-2 rounded-full bg-indigo-400 group-hover/btn:scale-125 group-hover/btn:bg-orange-400 transition-all duration-300" />
      <span className="relative z-10">{text}</span>
    </div>
  );

  return (
    <section className="relative w-full overflow-hidden bg-[#06081f] py-24 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(251,146,60,0.05),transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto text-center mb-16">
        <p className="uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold text-indigo-300/80 mb-4">
          Our Valued Stakeholders & Partners
        </p>
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]">
          Collaborating for an <br />
          <span className="bg-gradient-to-r from-indigo-300 via-white to-orange-200 bg-clip-text text-transparent">
            Educated & Empowered Bihar
          </span>
        </h2>
      </div>

      {/* Marquee Rows Container */}
      <div className="flex flex-col gap-10">

        {/* ROW 1 - Right to Left */}
        <div className="flex overflow-hidden group">
          <div className="flex gap-6 animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
            {[...row1, ...row1].map((item, i) => (
              <Button key={`row1-1-${i}`} text={item} />
            ))}
            {/* Duplicate for seamless effect */}
            {[...row1, ...row1].map((item, i) => (
              <Button key={`row1-2-${i}`} text={item} />
            ))}
          </div>
        </div>

        {/* ROW 2 - Left to Right */}
        <div className="flex overflow-hidden group">
          <div className="flex gap-6 animate-marquee-reverse whitespace-nowrap group-hover:[animation-play-state:paused]">
            {[...row2, ...row2].map((item, i) => (
              <Button key={`row2-1-${i}`} text={item} />
            ))}
            {/* Duplicate for seamless effect */}
            {[...row2, ...row2].map((item, i) => (
              <Button key={`row2-2-${i}`} text={item} />
            ))}
          </div>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#06081f] to-transparent pointer-events-none" />
    </section>
  );
}

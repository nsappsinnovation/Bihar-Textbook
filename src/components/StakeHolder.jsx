import { useEffect, useRef } from "react";

const row1 = [
  "Startups & Entrepreneurs",
  "Academia & Research Institutions",
  "Industry Leaders & CEOs",
  "Heads Of State & Government Leaders",
];

const row2 = [
  "Youth & Student Innovators",
  "Women Leaders In AI",
  "Technology Practitioners & Developers",
  "Media & Thought Leaders",
  "Investors & Venture Capitalists",
];

export default function StakeHolder() {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useEffect(() => {
    let x1 = 0;
    let x2 = 0;

    const speed = 0.25;

    const animate = () => {
      if (row1Ref.current) {
        x1 -= speed;
        if (Math.abs(x1) >= row1Ref.current.scrollWidth / 2) x1 = 0;
        row1Ref.current.style.transform = `translateX(${x1}px)`;
      }

      if (row2Ref.current) {
        x2 += speed;
        if (x2 >= row2Ref.current.scrollWidth / 2) x2 = 0;
        row2Ref.current.style.transform = `translateX(${x2}px)`;
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  const Button = ({ text }) => (
    <button
      className="
        relative px-6 py-4 rounded-xl text-sm md:text-base font-medium text-white
        bg-white/10 backdrop-blur-md border border-white/15
        transition-colors duration-300
        hover:bg-gradient-to-r hover:from-indigo-500 hover:to-orange-400
      "
    >
      <span className="relative z-10">{text}</span>
    </button>
  );

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#1a1f4a] via-[#0e1233] to-[#06081f] py-24 px-6">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.35),transparent_65%)]" />

      <div className="relative max-w-7xl mx-auto text-center">
        <p className="uppercase tracking-[0.3em] text-xs text-white">
          Global Participants & Stakeholders
        </p>

        <h2 className="mt-5 text-3xl md:text-5xl font-bold text-white">
          Uniting Minds from Across the World to <br />
          <span className="text-indigo-300">Shape AI for Good</span>
        </h2>
      </div>

      {/* ROW 1 → LEFT */}
      <div className="relative mt-16 overflow-hidden">
        <div ref={row1Ref} className="flex gap-6 w-max">
          {[...row1, ...row1].map((item, i) => (
            <Button key={`row1-${i}`} text={item} />
          ))}
        </div>
      </div>

      {/* GAP BETWEEN ROWS */}
      <div className="h-10" />

      {/* ROW 2 → RIGHT */}
      <div className="relative overflow-hidden">
        <div ref={row2Ref} className="flex gap-6 w-max">
          {[...row2, ...row2].map((item, i) => (
            <Button key={`row2-${i}`} text={item} />
          ))}
        </div>
      </div>

      {/* bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}

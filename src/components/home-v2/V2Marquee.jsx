import useMissions from "../home-shared/useMissions";

// A logo-strip style run of the programme names, alternating serif and bold sans
export default function V2Marquee() {
  const missions = useMissions();
  const names = missions.map((m) => m.title);
  const row = [...names, ...names];

  return (
    <section aria-label="Programmes" className="overflow-hidden border-y border-slate-100 bg-white py-7">
      <div className="[mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
        <ul className="flex w-max items-center gap-6 whitespace-nowrap animate-marquee motion-reduce:animate-none">
          {row.map((name, i) => (
            <li
              key={`${name}-${i}`}
              aria-hidden={i >= names.length || undefined}
              className={i % 2 ? "px-4 font-manrope text-xl font-extrabold uppercase tracking-tight text-slate-500" : "px-4 font-serif text-2xl text-slate-600"}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

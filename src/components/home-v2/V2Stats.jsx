import { useTranslation } from "react-i18next";

// Three facts the site already states elsewhere; no invented numbers
export default function V2Stats() {
  const { t } = useTranslation();
  const stats = [
    { value: "1965", label: t("homeV2.stat1", "Year the corporation was established") },
    { value: t("homeV2.statValue", "Class 1–12"), label: t("homeV2.stat2", "Bihar Board textbooks published") },
    { value: "38", label: t("homeV2.stat3", "Districts the books reach") },
  ];

  return (
    <section className="bg-bt-sky px-5 py-16 font-manrope sm:px-8">
      <ul className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <li key={s.label} className="rounded-2xl border border-white bg-white/70 px-6 py-9 text-center shadow-[0_18px_40px_-30px_rgba(11,43,79,0.5)]">
            <p className="font-serif text-5xl leading-none text-bt-navy lg:text-6xl">{s.value}</p>
            <p className="mx-auto mt-4 max-w-[16rem] text-xs font-bold uppercase leading-relaxed tracking-[0.08em] text-slate-600 [html.lang-hi_&]:text-sm [html.lang-hi_&]:normal-case [html.lang-hi_&]:tracking-normal">
              {s.label}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

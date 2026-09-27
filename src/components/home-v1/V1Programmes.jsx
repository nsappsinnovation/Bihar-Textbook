import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import useMissions from "../home-shared/useMissions";
import ProgrammeIcon from "./ProgrammeIcon";
import SectionHeader from "./SectionHeader";
import { LOOK, FALLBACK } from "../../data/programmeLabels";

// Sky section: the programmes as bordered icon cards. Every icon is brand blue at rest;
// on hover the card warms to mango, with the icon in navy.
export default function V1Programmes() {
  const { t } = useTranslation();
  const missions = useMissions();

  return (
    <section className="bg-bt-sky px-6 py-20 font-sans text-slate-900 md:px-12 lg:px-24 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeader
          eyebrow={t("homeV1.playgroundTag", "Learning playground")}
          title={t("homeV1.programmesEyebrow", "Beyond the printed page")}
          highlight={t("homeV1.flipTitle", "Hover to discover")}
          description={t("homeV1.playgroundText", "Put on a VR headset, listen to a lesson, learn to sign, play a shopping game. Knowledge, made to be explored.")}
        />

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {missions.map((m) => {
            const look = LOOK[m.link] || FALLBACK;
            return (
              <li key={m.id}>
                <Link
                  to={m.link || "#"}
                  className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-mango/60 hover:bg-[#fff7ea] focus-visible:-translate-y-1 focus-visible:border-mango/60 focus-visible:bg-[#fff7ea] motion-reduce:transform-none sm:p-6"
                >
                  <div className="flex items-start justify-between">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-bt-sky text-bt-blue transition duration-300 group-hover:bg-mango group-hover:text-bt-navy group-focus-visible:bg-mango group-focus-visible:text-bt-navy">
                      <ProgrammeIcon
                        link={m.link}
                        fallback={<img src={m.image} alt="" loading="lazy" className="h-8 w-8 object-contain" />}
                      />
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-500 transition group-hover:border-transparent group-hover:bg-mango group-hover:text-bt-navy group-focus-visible:bg-mango group-focus-visible:text-bt-navy">
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </span>
                  </div>

                  <p className="mt-10 text-[10px] font-bold uppercase tracking-[0.2em] text-bt-blue [html.lang-hi_&]:text-xs [html.lang-hi_&]:normal-case [html.lang-hi_&]:tracking-normal">
                    {t(`homeV1.${look.kindKey}`, look.kind)}
                  </p>
                  <h3 className="mt-1.5 text-lg font-bold leading-snug tracking-tight text-slate-900">{m.title}</h3>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-500">{m.desc}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

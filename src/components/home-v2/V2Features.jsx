import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Check } from "lucide-react";

// Four programmes, each in its own tinted panel with a coloured tag and floating labels.
// Copy reuses the translated hero slide descriptions.
const FEATURES = [
  {
    id: "vr",
    link: "/vr-dashboard",
    image: "/images/hero/vr.webp",
    // The photo has a mislabelled sign along its bottom edge, so it is always cropped from the top
    position: "object-top",
    panel: "bg-bt-sky",
    tag: "bg-[#cfe0fa] text-bt-blue",
    tagKey: "homeV2.tagVr", tagDefault: "Virtual reality",
    titleKey: "missionGrid.vr.title", titleDefault: "Virtual Reality Lab",
    descKey: "hero.slide1.description", descDefault: "Our travelling VR labs reach schools across the state, letting students explore science, space, and the human body through interactive experiences.",
    chips: [["homeV2.chipVr1", "Mobile VR labs"], ["homeV2.chipVr2", "Science · Space · Human body"]],
  },
  {
    id: "audio",
    link: "/audio-library-dashboard",
    image: "/images/hero/audio.webp",
    position: "object-center",
    panel: "bg-bt-peach",
    tag: "bg-[#fbd9c4] text-[#9a3f12]",
    tagKey: "homeV2.tagAudio", tagDefault: "Audio books",
    titleKey: "missionGrid.audio.title", titleDefault: "Audio Library",
    descKey: "hero.slide4.description", descDefault: "Audio study materials assist special children and dyslexic learners, enabling comfortable and independent study.",
    chips: [["homeV2.chipAudio1", "For dyslexic learners"], ["homeV2.chipAudio2", "Listen anywhere"]],
  },
  {
    id: "sign",
    link: "/sign-learn",
    image: "/images/hero/sign.webp",
    position: "object-[50%_60%]",
    panel: "bg-bt-lilac",
    tag: "bg-[#ddd2f7] text-[#5b3fa6]",
    tagKey: "homeV2.tagSign", tagDefault: "Inclusive learning",
    titleKey: "missionGrid.sign.title", titleDefault: "Sign Language",
    descKey: "hero.slide2.description", descDefault: "Structured programs help students communicate confidently and encourage a more inclusive and supportive school community.",
    chips: [["homeV2.chipSign1", "Indian Sign Language"], ["homeV2.chipSign2", "Inclusive classrooms"]],
  },
  {
    id: "ling",
    link: "/ling",
    image: "/images/hero/linguistic.webp",
    position: "object-center",
    panel: "bg-bt-mint",
    tag: "bg-[#c9e9dc] text-[#1f6b52]",
    tagKey: "homeV2.tagLing", tagDefault: "Languages",
    titleKey: "missionGrid.diverse.title", titleDefault: "Diverse Language",
    descKey: "hero.slide3.description", descDefault: "Courses in foreign languages, Indian languages, and regional dialects expand cultural understanding and learning opportunities.",
    chips: [["homeV2.chipLing1", "Hindi · English · Urdu · Maithili"], ["homeV2.chipLing2", "Regional dialects"]],
  },
];

export default function V2Features() {
  const { t } = useTranslation();

  return (
    <section className="bg-white px-5 py-20 font-manrope sm:px-8 lg:py-28">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <h2 className="font-serif text-4xl leading-[1.05] text-bt-ink sm:text-5xl">{t("homeV2.featuresTitle", "Beyond the printed page")}</h2>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-slate-600">
          {t("homeV2.featuresText", "Programmes that take the same trusted content to learners who read, listen, sign and speak differently.")}
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6">
        {FEATURES.map((f, i) => {
          const flip = i % 2 === 1;
          return (
            <article key={f.id} className={`grid items-center gap-10 overflow-hidden rounded-[32px] ${f.panel} p-6 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14`}>
              <div className={flip ? "lg:order-2" : ""}>
                <span className={`inline-block rounded-md px-2.5 py-1 text-[11px] font-bold ${f.tag}`}>{t(f.tagKey, f.tagDefault)}</span>
                <h3 className="mt-5 font-serif text-4xl leading-[1.05] text-bt-ink sm:text-[2.8rem]">{t(f.titleKey, f.titleDefault)}</h3>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-700">{t(f.descKey, f.descDefault)}</p>
                <Link to={f.link} className="mt-7 inline-flex items-center gap-2 border-b-2 border-bt-ink pb-0.5 text-sm font-bold text-bt-ink transition hover:gap-3">
                  {t("homeV2.learnMore", "Learn more")} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>

              <div className={`relative ${flip ? "lg:order-1" : ""}`}>
                <div className="overflow-hidden rounded-[24px] border-[6px] border-white shadow-[0_30px_60px_-30px_rgba(11,43,79,0.5)]">
                  <img src={f.image} alt="" loading="lazy" className={`aspect-[4/3] w-full object-cover ${f.position}`} />
                </div>
                <span className="absolute -top-3 left-4 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-bt-navy shadow-lg sm:left-6">
                  <span className="grid h-4 w-4 place-items-center rounded-full bg-bt-navy text-white"><Check size={10} strokeWidth={3} aria-hidden="true" /></span>
                  {t(f.chips[0][0], f.chips[0][1])}
                </span>
                <span className="absolute -bottom-3 right-4 rounded-full bg-bt-ink px-3.5 py-2 text-xs font-bold text-white shadow-lg sm:right-6">
                  {t(f.chips[1][0], f.chips[1][1])}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

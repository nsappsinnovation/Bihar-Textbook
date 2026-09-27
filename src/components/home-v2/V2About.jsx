import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Deep navy statement band
export default function V2About() {
  const { t } = useTranslation();

  return (
    <section className="bg-bt-navy px-5 py-20 font-manrope text-white sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <span className="inline-block rounded-md bg-mango px-2.5 py-1 text-[11px] font-bold text-bt-navy">
          {t("homeV2.aboutTag", "// About us //")}
        </span>
        <p className="mt-6 max-w-4xl text-2xl font-semibold leading-snug tracking-tight sm:text-[2rem] sm:leading-[1.3]">
          {t("homeV2.aboutLead", "BSTBPC publishes the textbooks of Bihar Board schools.")}{" "}
          <span className="text-white/55">
            {t("homeV2.aboutRest", "Since 1965, from Patna, we have printed and supplied the books that children in every district learn from, and today we are taking them online, into audio, sign language and virtual reality.")}
          </span>
        </p>

        <div className="mt-16 flex flex-col justify-between gap-10 sm:flex-row sm:items-end">
          <div className="grid h-28 w-28 place-items-center rounded-2xl bg-white p-4 shadow-2xl shadow-black/30">
            <img src="/logo.webp" alt="BSTBPC" className="h-full w-full object-contain" />
          </div>
          <div className="max-w-sm">
            <p className="font-serif text-5xl leading-none sm:text-6xl">{t("homeV2.aboutFigure", "Since 1965")}</p>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {t("homeV2.aboutFigureText", "A Government of Bihar undertaking serving the state's schools for six decades.")}
            </p>
            <Link to="/know-us/md-message" className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-bt-navy transition hover:bg-mango">
              {t("homeV2.aboutCta", "Know the corporation")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

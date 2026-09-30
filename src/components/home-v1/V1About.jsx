import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SectionHeader from "./SectionHeader";

// Navy statement band: header and two-tone statement on the left, one big figure on the right
export default function V1About() {
  const { t } = useTranslation();

  return (
    <section className="bg-bt-navy px-6 py-20 font-sans text-white md:px-12 lg:px-24 lg:py-24">
      <div className="mx-auto grid max-w-[1280px] items-end gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
        <div>
          <SectionHeader dark eyebrow={t("homeV1.aboutEyebrow", "About us")} title={t("homeV2.aboutLead", "BSTBPCL publishes the textbooks of Bihar Board schools.")} />
          <p className="max-w-2xl text-lg font-medium leading-relaxed text-white/55">
            {t("homeV2.aboutRest", "Since 1965, from Patna, we have printed and supplied the books that children in every district learn from, and today we are taking them online, into audio, sign language and virtual reality.")}
          </p>
        </div>

        <div className="border-t border-white/15 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
          <p className="text-5xl font-bold leading-none tracking-tight sm:text-6xl">{t("homeV2.aboutFigure", "Since 1965")}</p>
          <p className="mt-4 text-sm font-medium leading-relaxed text-white/60">
            {t("homeV2.aboutFigureText", "A Government of Bihar undertaking serving the state's schools for six decades.")}
          </p>
          <Link to="/know-us/md-message" className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-bt-navy transition hover:bg-blue-50">
            {t("homeV2.aboutCta", "Know the corporation")}
          </Link>
        </div>
      </div>
    </section>
  );
}

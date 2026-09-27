import { useTranslation } from "react-i18next";
import useQuotes from "../home-shared/useQuotes";
import useLeaders from "../home-shared/useLeaders";

// Editorial quotes on cream: one featured quote, four smaller ones, and today's leadership
export default function V2Quotes() {
  const { t } = useTranslation();
  const quotes = useQuotes();
  const leaders = useLeaders();
  const [featured, ...rest] = quotes;

  return (
    <section className="bg-bt-cream px-5 py-20 font-manrope sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <span className="inline-block rounded-full border border-bt-ink/30 px-3 py-1 text-[11px] font-semibold text-bt-ink">
          {t("homeV2.quotesTag", "// In their words //")}
        </span>
        <h2 className="mt-5 font-serif text-4xl leading-[1.05] text-bt-ink sm:text-6xl">
          {t("homeV2.quotesTitle", "Education builds Bihar.")}
        </h2>
        <p className="mt-6 flex items-baseline gap-3 border-b border-bt-ink/15 pb-4 text-xs font-bold uppercase tracking-[0.12em] text-slate-600 [html.lang-hi_&]:normal-case [html.lang-hi_&]:tracking-normal">
          <span className="font-serif text-base normal-case tracking-normal text-bt-ink">{quotes.length}</span>
          {t("homeV2.quotesCount", "Voices from Bihar's leaders and reformers")}
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <figure className="m-0 flex flex-col justify-between rounded-[28px] bg-bt-blue p-8 text-white sm:p-10">
            <blockquote className="m-0 font-serif text-3xl leading-[1.2] sm:text-[2.4rem]">“{featured.quote}”</blockquote>
            <figcaption className="mt-10 flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-mango text-sm font-bold text-bt-navy">{featured.initials}</span>
              <span>
                <strong className="block">{featured.name}</strong>
                <span className="text-xs font-semibold uppercase tracking-wide text-white/70">{featured.role}</span>
              </span>
            </figcaption>
          </figure>

          <div className="grid gap-5 sm:grid-cols-2">
            {rest.slice(0, 4).map((q) => (
              <figure key={q.id} className="m-0 flex flex-col justify-between rounded-[22px] bg-white p-6">
                <blockquote className="m-0 font-serif text-lg leading-snug text-bt-ink">“{q.quote}”</blockquote>
                <figcaption className="mt-5 text-sm">
                  <strong className="block text-bt-navy">{q.name}</strong>
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{q.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.12em] text-slate-600 [html.lang-hi_&]:normal-case [html.lang-hi_&]:tracking-normal">
            {t("keyParticipant.heading", "Leading the Way in")} {t("keyParticipant.headingHighlight", "Educational Excellence")}
          </p>
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {leaders.slice(0, 4).map((l) => (
              <li key={l.name} className="flex items-center gap-3 rounded-2xl bg-white p-3">
                <img src={l.image} alt={l.name} loading="lazy" className="h-14 w-14 shrink-0 rounded-xl bg-bt-sky object-cover object-top" />
                <span className="min-w-0">
                  <strong className="block font-serif text-[0.95rem] leading-tight text-bt-ink">{l.name}</strong>
                  <span className="mt-0.5 block text-[11px] font-semibold leading-snug text-slate-600">{l.role}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

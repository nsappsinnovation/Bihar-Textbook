import { useT } from "../../i18n/LanguageContext";

// Gold label above page titles (letter-spaced in English only: tracking breaks Devanagari).
export function Eyebrow({ children, className = "" }) {
  const { lang } = useT();
  return (
    <span className={`block font-bold text-gold-600 ${lang === "en" ? "text-[0.68rem] uppercase tracking-[0.16em]" : "text-xs"} ${className}`}>
      {children}
    </span>
  );
}

export default function Card({ className = "", children, ...rest }) {
  return (
    <div className={`rounded-2xl border border-brand-900/10 bg-white shadow-[0_1px_2px_rgba(21,38,80,0.04),0_12px_32px_-18px_rgba(21,38,80,0.18)] print-plain ${className}`} {...rest}>
      {children}
    </div>
  );
}

export function SectionHeading({ icon: Icon, title, subtitle, action, className = "" }) {
  return (
    <div className={`flex flex-wrap items-start justify-between gap-3 ${className}`}>
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div>
          <h2 className="text-lg font-bold text-brand-900">{title}</h2>
          {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}

export function PageHeader({ eyebrow, title, subtitle, actions }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="animate-fade-up">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="mt-1.5 font-display text-3xl leading-tight text-brand-900 sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {actions && <div className="no-print flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

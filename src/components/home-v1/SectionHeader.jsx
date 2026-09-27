// The one section header used across /v1, copied from the Journey section:
// a blue line + small-caps label, a bold heading with an optional grey second line,
// and a short medium-weight description. `dark` is for navy bands.
export default function SectionHeader({ eyebrow, title, highlight, description, dark = false, center = false, className = "" }) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && (
        <div className={`mb-4 flex items-center gap-2 ${center ? "justify-center" : ""}`}>
          <span className={`h-px w-6 ${dark ? "bg-blue-300" : "bg-blue-600"}`} />
          <span className={`text-[10px] font-bold uppercase tracking-[0.2em] [html.lang-hi_&]:text-xs [html.lang-hi_&]:tracking-normal ${dark ? "text-blue-300" : "text-blue-600"}`}>
            {eyebrow}
          </span>
          {center && <span className={`h-px w-6 ${dark ? "bg-blue-300" : "bg-blue-600"}`} />}
        </div>
      )}
      <h2 className={`mb-4 text-3xl font-bold leading-tight tracking-tight md:text-4xl ${dark ? "text-white" : "text-slate-900"}`}>
        {title}
        {highlight && (
          <>
            <br />
            <span className={`font-medium ${dark ? "text-white/50" : "text-slate-400"}`}>{highlight}</span>
          </>
        )}
      </h2>
      {description && (
        <p className={`text-sm font-medium leading-relaxed ${dark ? "text-white/60" : "text-slate-500"}`}>{description}</p>
      )}
    </div>
  );
}

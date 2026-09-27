import { useId } from "react";
import { FiAlertCircle, FiChevronDown } from "react-icons/fi";
import { useT } from "../../i18n/LanguageContext";

const inputClass = (error, withIcon) =>
  `w-full rounded-xl border bg-white py-3 text-base text-slate-900 placeholder:text-slate-400 shadow-sm transition focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 sm:text-sm ${
    withIcon ? "pl-11 pr-4" : "px-4"
  } ${
    error
      ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
      : "border-brand-900/15 focus:border-brand-600 focus:ring-brand-500/15"
  }`;

export function Field({ label, name, required, optional, hint, error, children, className = "", id }) {
  const { t } = useT();
  return (
    <div className={className} data-field={name}>
      {label && (
        <label htmlFor={id} className="mb-1.5 flex flex-wrap items-baseline gap-x-1.5 text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-red-500" aria-hidden>*</span>}
          {optional && <span className="text-xs font-normal text-slate-400">({optional === true ? t("optional") : optional})</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600" role="alert">
          <FiAlertCircle className="h-3.5 w-3.5 shrink-0" />
          {t(error)}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-slate-400">{hint}</p>
      )}
    </div>
  );
}

export function Input({ label, name, required, optional, hint, error, icon: Icon, className, trailing, ...rest }) {
  const id = useId();
  return (
    <Field label={label} name={name} required={required} optional={optional} hint={hint} error={error} className={className} id={id}>
      <div className="group relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-brand-600" />
        )}
        <input id={id} name={name} aria-invalid={!!error} className={inputClass(error, !!Icon)} {...rest} />
        {trailing && <div className="absolute right-2 top-1/2 -translate-y-1/2">{trailing}</div>}
      </div>
    </Field>
  );
}

export function Select({ label, name, required, optional, hint, error, options = [], placeholder, className, icon: Icon, ...rest }) {
  const id = useId();
  return (
    <Field label={label} name={name} required={required} optional={optional} hint={hint} error={error} className={className} id={id}>
      <div className="group relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-brand-600" />
        )}
        <select id={id} name={name} aria-invalid={!!error} className={`${inputClass(error, !!Icon)} appearance-none pr-10`} {...rest}>
          {placeholder !== undefined && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <FiChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
    </Field>
  );
}

export function Textarea({ label, name, required, optional, hint, error, className, rows = 3, ...rest }) {
  const id = useId();
  return (
    <Field label={label} name={name} required={required} optional={optional} hint={hint} error={error} className={className} id={id}>
      <textarea id={id} name={name} rows={rows} aria-invalid={!!error} className={`${inputClass(error, false)} resize-y`} {...rest} />
    </Field>
  );
}

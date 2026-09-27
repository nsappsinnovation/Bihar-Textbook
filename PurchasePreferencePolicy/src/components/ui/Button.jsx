import { Link } from "react-router-dom";
import Spinner from "./Spinner";

// Landing-page style: solid navy (brand) pills; the "success" (final action) pill carries a gold ring.
const VARIANTS = {
  primary:
    "bg-brand-700 text-white shadow-lg shadow-brand-900/20 hover:bg-brand-900 focus-visible:ring-brand-500/35",
  secondary:
    "border border-brand-900/20 bg-white/80 text-brand-900 shadow-sm backdrop-blur hover:border-brand-700 hover:bg-white focus-visible:ring-brand-500/20",
  success:
    "bg-brand-700 text-white shadow-lg shadow-brand-900/25 ring-2 ring-gold-500/70 hover:bg-brand-900 focus-visible:ring-gold-500",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-300/40",
  danger: "text-slate-600 hover:bg-red-50 hover:text-red-600 focus-visible:ring-red-300/40",
};

const SIZES = {
  sm: "px-3.5 py-1.5 text-xs rounded-full gap-1.5",
  md: "px-5 py-2.5 text-sm rounded-full gap-2",
  lg: "px-6 py-3.5 text-base rounded-full gap-2.5",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon: Icon,
  iconRight: IconRight,
  to,
  href,
  className = "",
  children,
  disabled,
  type = "button",
  ...rest
}) {
  const classes = `inline-flex items-center justify-center font-semibold transition focus:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
  const content = (
    <>
      {loading ? <Spinner className="h-4 w-4" light={variant === "primary" || variant === "success"} /> : Icon && <Icon className="h-4 w-4 shrink-0" />}
      {children}
      {IconRight && !loading && <IconRight className="h-4 w-4 shrink-0" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer" {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={classes} disabled={disabled || loading} {...rest}>
      {content}
    </button>
  );
}

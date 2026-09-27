import { FiAlertCircle, FiCheckCircle, FiInfo, FiAlertTriangle } from "react-icons/fi";

const TONES = {
  error: { cls: "bg-red-50 text-red-700 ring-red-100", icon: FiAlertCircle },
  success: { cls: "bg-gold-50 text-gold-800 ring-gold-200", icon: FiCheckCircle },
  info: { cls: "bg-brand-50 text-brand-800 ring-brand-100", icon: FiInfo },
  warning: { cls: "bg-amber-50 text-amber-800 ring-amber-100", icon: FiAlertTriangle },
};

export default function Alert({ tone = "info", title, children, className = "", action }) {
  const { cls, icon: Icon } = TONES[tone];
  return (
    <div className={`flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm ring-1 animate-scale-in ${cls} ${className}`} role={tone === "error" ? "alert" : "status"}>
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <div className="min-w-0 flex-1">
        {title && <p className="font-semibold">{title}</p>}
        <div className={title ? "mt-0.5 leading-relaxed" : "font-medium leading-relaxed"}>{children}</div>
      </div>
      {action}
    </div>
  );
}

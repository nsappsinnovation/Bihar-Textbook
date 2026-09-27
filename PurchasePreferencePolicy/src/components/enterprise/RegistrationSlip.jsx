import { forwardRef } from "react";
import { useT } from "../../i18n/LanguageContext";
import { blockLabel, districtLabel, sectorLabel } from "../../lib/locations";
import { biharShare, formatCapacity, formatDateTime, formatLakh, formatNumber } from "../../lib/format";
import { areaSqm, centroid, isPoint } from "../../lib/geo";

// Fixed-width (A4 @ 96dpi) registration details used for printing and PDF download.
const RegistrationSlip = forwardRef(function RegistrationSlip({ enterprise: e }, ref) {
  const { t, lang } = useT();
  const products = e.products?.length ? e.products : e.productList || [];
  const pct = biharShare(e);
  const corners = (e.boundary || []).filter(isPoint);
  const center = centroid(corners);
  const rows = [
    [t("registrationId"), e.registrationId],
    [t("unitName"), e.unitName],
    [t("applicantName"), e.name],
    [t("mobileNumber"), `+91 ${e.mobile}`],
    [t("email"), e.email],
    [t("address"), e.address],
    [t("sector"), sectorLabel(e.sector, lang, e.sectorOther)],
    [t("district"), districtLabel(e.district, lang)],
    [t("block"), blockLabel(e.block)],
    [t("city"), e.city],
    [t("unitLocation"), e.unitLocation],
    [t("projectCost"), formatLakh(e.projectCost, t)],
    [t("directEmployees"), formatNumber(e.directEmployees, 0)],
    [t("directEmployeesBihar"), e.directEmployeesBihar == null ? "" : `${formatNumber(e.directEmployeesBihar, 0)}${pct !== null ? ` (${pct}%)` : ""}`],
    [t("indirectEmployees"), formatNumber(e.indirectEmployees, 0)],
    [t("udyamNo"), e.udyamRegistrationNo],
    [
      t("gisBoundary"),
      corners.length
        ? `${t("cornersCount", { n: corners.length })} · ${formatNumber(areaSqm(corners), 0)} ${t("sqmShort")} · ${center.lat.toFixed(6)}, ${center.lng.toFixed(6)}`
        : "",
    ],
    [t("registeredOn"), formatDateTime(e.createdAt)],
    [t("lastUpdatedLabel"), formatDateTime(e.updatedAt)],
  ];

  return (
    <div ref={ref} className="w-[760px] bg-white p-10 text-slate-900" style={{ fontFamily: "Inter, 'Noto Sans Devanagari', sans-serif" }}>
      <div className="flex items-center gap-4 border-b-4 border-brand-700 pb-5">
        <img src="/dept-industries.png" alt="" className="h-20 w-20 object-contain" />
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-800">{t("govBihar")}</p>
          <p className="text-lg font-bold">{t("deptName")}</p>
          <p className="text-base font-semibold text-slate-600">{t("portalTitle")}</p>
        </div>
      </div>

      <h1 className="mt-6 text-center text-xl font-extrabold">{t("slipTitle")}</h1>
      <p className="mt-1 text-center text-sm text-slate-500">{t("policyName")}</p>

      <div className="mx-auto mt-6 w-fit rounded-xl border-2 border-dashed border-brand-300 bg-brand-50 px-8 py-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">{t("registrationId")}</p>
        <p className="font-mono text-2xl font-extrabold tracking-wide text-brand-900">{e.registrationId}</p>
      </div>

      <table className="mt-6 w-full border-collapse text-sm">
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label} className="border-b border-slate-200">
              <th className="w-2/5 bg-slate-50 px-4 py-2 text-left font-semibold text-slate-600">{label}</th>
              <td className="px-4 py-2 font-semibold">{value || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-5 text-sm font-bold text-slate-700">{t("productsHeading")}</p>
      <table className="mt-2 w-full border-collapse text-xs">
        <thead>
          <tr className="bg-slate-50 text-left text-slate-600">
            <th className="border border-slate-200 px-3 py-2">#</th>
            <th className="border border-slate-200 px-3 py-2">{t("productName")}</th>
            <th className="border border-slate-200 px-3 py-2">{t("productionCapacity")}</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={p.id || i}>
              <td className="border border-slate-200 px-3 py-1.5">{i + 1}</td>
              <td className="border border-slate-200 px-3 py-1.5 font-semibold">{p.productName}</td>
              <td className="border border-slate-200 px-3 py-1.5">{formatCapacity(p, lang)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
        <p className="font-bold">{t("disclaimer")}</p>
        <p className="mt-1">{t("disclaimerText")}</p>
      </div>

      <div className="mt-8 flex items-end justify-between text-xs text-slate-500">
        <p>{t("computerGenerated")}</p>
        <p>{t("generatedOn", { date: formatDateTime(new Date()) })}</p>
      </div>
    </div>
  );
});

export default RegistrationSlip;

import { forwardRef } from "react";
import { useT } from "../../i18n/LanguageContext";
import { anchalLabel, districtLabel, landTypeLabel, maujaLabel } from "../../lib/locations";
import { formatDateTime, maskAadhaar } from "../../lib/format";
import { formatTotalArea, getPlots } from "../../lib/plots";
import { formatArea } from "../../lib/area";

// Fixed-width (A4 @ 96dpi) acknowledgement layout used for printing and PDF download.
const Acknowledgement = forwardRef(function Acknowledgement({ app }, ref) {
  const { t, lang } = useT();
  const plots = getPlots(app);
  const rows = [
    [t("applicationId"), app.applicationId],
    [t("applicantName"), app.applicant?.name],
    [t("fatherHusbandName"), app.applicant?.fatherHusbandName],
    [t("aadhaar"), maskAadhaar(app.applicant?.aadhaar)],
    [t("mobileNumber"), `+91 ${app.mobile}`],
    [t("district"), districtLabel(app.district, lang)],
    [t("anchal"), anchalLabel(app.district, app.anchal, lang)],
    [t("mauja"), maujaLabel(app.district, app.anchal, app.mauja, lang)],
    [t("khataNo"), app.khataNo],
    [t("khesraNo"), app.khesraNo],
    [t("area"), formatTotalArea(app, lang, t)],
    [t("submissionDate"), formatDateTime(app.submittedAt)],
  ];

  return (
    <div ref={ref} className="w-[760px] bg-white p-10 text-slate-900" style={{ fontFamily: "Inter, 'Noto Sans Devanagari', sans-serif" }}>
      <div className="flex items-center gap-4 border-b-4 border-brand-700 pb-5">
        <img src="/bihar-seal.png" alt="" className="h-20 w-20 object-contain" />
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-800">{t("govBihar")}</p>
          <p className="text-lg font-bold">{t("idaName")}</p>
          <p className="text-base font-semibold text-slate-600">{t("portalTitle")}</p>
        </div>
      </div>

      <h1 className="mt-6 text-center text-xl font-extrabold">{t("ackTitle")}</h1>
      <p className="mt-1 text-center text-sm text-slate-500">{t("policyName")}</p>

      <div className="mx-auto mt-6 w-fit rounded-xl border-2 border-dashed border-brand-300 bg-brand-50 px-8 py-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">{t("applicationId")}</p>
        <p className="font-mono text-2xl font-extrabold tracking-wide text-brand-900">{app.applicationId}</p>
      </div>

      <table className="mt-6 w-full border-collapse text-sm">
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label} className="border-b border-slate-200">
              <th className="w-2/5 bg-slate-50 px-4 py-2.5 text-left font-semibold text-slate-600">{label}</th>
              <td className="px-4 py-2.5 font-semibold">{value || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {plots.length > 1 && (
        <table className="mt-4 w-full border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-left text-slate-600">
              <th className="border border-slate-200 px-3 py-2">#</th>
              <th className="border border-slate-200 px-3 py-2">{t("khataNo")}</th>
              <th className="border border-slate-200 px-3 py-2">{t("khesraNo")}</th>
              <th className="border border-slate-200 px-3 py-2">{t("area")}</th>
              <th className="border border-slate-200 px-3 py-2">{t("landType")}</th>
              <th className="border border-slate-200 px-3 py-2">{t("jamabandiNo")}</th>
            </tr>
          </thead>
          <tbody>
            {plots.map((p, i) => (
              <tr key={i}>
                <td className="border border-slate-200 px-3 py-1.5">{i + 1}</td>
                <td className="border border-slate-200 px-3 py-1.5 font-semibold">{p.khataNo}</td>
                <td className="border border-slate-200 px-3 py-1.5 font-semibold">{p.khesraNo}</td>
                <td className="border border-slate-200 px-3 py-1.5">{formatArea(p.area, p.areaUnit, lang)}</td>
                <td className="border border-slate-200 px-3 py-1.5">{landTypeLabel(p.landType, lang)}</td>
                <td className="border border-slate-200 px-3 py-1.5">{p.jamabandiNo || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {app.declarations?.noTitleSuit && (
        <p className="mt-5 text-xs leading-relaxed text-slate-600">
          <strong className="font-semibold">{t("declarationsTitle")}:</strong> {t("declarationNoTitleSuit")}
        </p>
      )}

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

export default Acknowledgement;

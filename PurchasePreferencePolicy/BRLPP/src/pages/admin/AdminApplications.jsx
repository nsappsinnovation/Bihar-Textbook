import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiSearch, FiX, FiDownload, FiFileText, FiEye, FiMapPin, FiLayers, FiHome, FiCalendar, FiRefreshCw } from "react-icons/fi";
import AdminLayout from "../../components/layout/AdminLayout";
import Card, { PageHeader } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import Pagination from "../../components/ui/Pagination";
import EmptyState from "../../components/ui/EmptyState";
import { Input, Select } from "../../components/ui/Field";
import { PageLoader } from "../../components/ui/Spinner";
import { useT } from "../../i18n/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { useAdminApplications } from "../../lib/useAdminApplications";
import { ROLE_STATE } from "../../lib/adminApi";
import { DISTRICTS, MAUJA_OTHER, anchalLabel, districtLabel, landTypeLabel, maujaLabel, useLocationData } from "../../lib/locations";
import { formatDate, formatDateTime, isoDate, locationUrl } from "../../lib/format";
import { exportExcel, pagesToPdf } from "../../lib/exporters";
import { formatTotalArea, getPlots } from "../../lib/plots";

const ROWS_PER_PDF_PAGE = 16;
const FILTER_KEYS = ["q", "district", "anchal", "mauja", "from", "to"];

function ReportPages({ rows, filtersText, pageRefs }) {
  const { t, lang } = useT();
  const pages = [];
  for (let i = 0; i < rows.length; i += ROWS_PER_PDF_PAGE) pages.push(rows.slice(i, i + ROWS_PER_PDF_PAGE));
  if (!pages.length) pages.push([]);
  const generated = formatDateTime(new Date());

  return pages.map((chunk, pageIndex) => (
    <div
      key={pageIndex}
      ref={(el) => (pageRefs.current[pageIndex] = el)}
      className="flex h-[794px] w-[1123px] flex-col bg-white p-8 text-slate-900"
      style={{ fontFamily: "Inter, 'Noto Sans Devanagari', sans-serif" }}
    >
      <div className="flex items-center gap-4 border-b-2 border-brand-700 pb-3">
        <img src="/bihar-seal.png" alt="" className="h-12 w-12 object-contain" />
        <div className="flex-1">
          <p className="text-base font-bold">{t("idaName")}</p>
          <p className="text-sm text-slate-600">
            {t("portalTitle")} — {t("reportTitle")}
          </p>
        </div>
        <div className="text-right text-xs text-slate-500">
          <p>{t("generatedOn", { date: generated })}</p>
          <p>{t("recordsCount", { shown: rows.length, total: rows.length })}</p>
        </div>
      </div>
      <p className="mt-2 text-xs text-slate-500">
        <strong className="font-semibold text-slate-700">{t("filtersApplied")}:</strong> {filtersText}
      </p>
      <table className="mt-3 w-full border-collapse text-[11px]">
        <thead>
          <tr className="bg-brand-50 text-left text-brand-950">
            {["#", t("applicationId"), t("applicantShort"), t("mobileShort"), t("district"), t("anchalShort"), t("mauja"), t("khataNo"), t("khesraShort"), t("area"), t("submittedOn")].map(
              (h) => (
                <th key={h} className="border border-slate-200 px-2 py-1.5 font-semibold">
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {chunk.map((r, i) => (
            <tr key={r.id} className="odd:bg-white even:bg-slate-50">
              <td className="border border-slate-200 px-2 py-1.5">{pageIndex * ROWS_PER_PDF_PAGE + i + 1}</td>
              <td className="border border-slate-200 px-2 py-1.5 font-mono font-semibold">{r.applicationId}</td>
              <td className="border border-slate-200 px-2 py-1.5">{r.applicant?.name}</td>
              <td className="border border-slate-200 px-2 py-1.5">{r.mobile}</td>
              <td className="border border-slate-200 px-2 py-1.5">{districtLabel(r.district, lang)}</td>
              <td className="border border-slate-200 px-2 py-1.5">{anchalLabel(r.district, r.anchal, lang)}</td>
              <td className="border border-slate-200 px-2 py-1.5">{maujaLabel(r.district, r.anchal, r.mauja, lang)}</td>
              <td className="border border-slate-200 px-2 py-1.5">{r.khataNo}</td>
              <td className="border border-slate-200 px-2 py-1.5">{r.khesraNo}</td>
              <td className="border border-slate-200 px-2 py-1.5">{formatTotalArea(r, lang, t)}</td>
              <td className="border border-slate-200 px-2 py-1.5">{formatDate(r.submittedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-auto flex justify-between pt-2 text-[10px] text-slate-400">
        <span>{t("disclaimerText")}</span>
        <span className="shrink-0 pl-4">
          {pageIndex + 1} / {pages.length}
        </span>
      </div>
    </div>
  ));
}

export default function AdminApplications() {
  const { t, lang } = useT();
  const { admin } = useAuth();
  const navigate = useNavigate();
  const { rows, loading, error, reload } = useAdminApplications();
  const isState = admin?.role === ROLE_STATE;
  const [params, setParams] = useSearchParams();
  const [exporting, setExporting] = useState("");
  const [pdfRows, setPdfRows] = useState(null);
  const pageRefs = useRef([]);

  const filters = {
    q: params.get("q") || "",
    district: isState ? params.get("district") || "" : admin?.district || "",
    anchal: params.get("anchal") || "",
    mauja: params.get("mauja") || "",
    from: params.get("from") || "",
    to: params.get("to") || "",
  };
  const page = Math.max(1, Number(params.get("page")) || 1);
  const pageSize = [10, 25, 50].includes(Number(params.get("size"))) ? Number(params.get("size")) : 10;

  const update = (patch) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        Object.entries(patch).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)));
        if (!("page" in patch)) next.delete("page");
        return next;
      },
      { replace: true }
    );

  const setFilter = (key, value) => {
    const patch = { [key]: value };
    if (key === "district") Object.assign(patch, { anchal: "", mauja: "" });
    if (key === "anchal") patch.mauja = "";
    update(patch);
  };

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    return rows.filter((r) => {
      if (filters.district && r.district !== filters.district) return false;
      if (filters.anchal && r.anchal !== filters.anchal) return false;
      if (filters.mauja === MAUJA_OTHER ? !r.maujaOther : filters.mauja && r.mauja !== filters.mauja) return false;
      const d = r.submittedDate || isoDate(r.submittedAt);
      if (filters.from && d < filters.from) return false;
      if (filters.to && d > filters.to) return false;
      if (q && !(r.searchText || "").includes(q)) return false;
      return true;
    });
  }, [rows, filters.q, filters.district, filters.anchal, filters.mauja, filters.from, filters.to]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pages);
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const hasFilters = FILTER_KEYS.some((k) => (k === "district" && !isState ? false : filters[k]));

  const locations = useLocationData();
  const districtOptions = DISTRICTS.map((d) => ({ value: d.en, label: lang === "hi" ? d.hi : d.en }));
  const anchalOptions = locations.getAnchals(filters.district).map((a) => ({ value: a, label: a }));
  const maujaOptions = [
    ...locations.getMaujas(filters.district, filters.anchal).map((m) => ({ value: m, label: m })),
    ...(filters.anchal ? [{ value: MAUJA_OTHER, label: t("maujaOtherOption") }] : []),
  ];

  const filtersText = [
    filters.district && `${t("district")}: ${districtLabel(filters.district, lang)}`,
    filters.anchal && `${t("anchalShort")}: ${anchalLabel(filters.district, filters.anchal, lang)}`,
    filters.mauja && `${t("mauja")}: ${filters.mauja === MAUJA_OTHER ? t("maujaOtherOption") : maujaLabel(filters.district, filters.anchal, filters.mauja, lang)}`,
    filters.from && `${t("fromDate")}: ${formatDate(filters.from)}`,
    filters.to && `${t("toDate")}: ${formatDate(filters.to)}`,
    filters.q && `"${filters.q}"`,
  ]
    .filter(Boolean)
    .join(" · ") || t("none");

  const fileStem = `IDA-RLP-Applications-${filters.district || "All"}-${isoDate()}`;

  const handleExcel = async () => {
    setExporting("excel");
    try {
      const applicationRows = filtered.map((r, i) => ({
          "S.No.": i + 1,
          "Application ID": r.applicationId,
          "Applicant Name": r.applicant?.name,
          "Father's / Husband's Name": r.applicant?.fatherHusbandName,
          "Aadhaar No.": r.applicant?.aadhaar || "",
          "Mobile Number": r.mobile,
          Email: r.applicant?.email || "",
          Address: r.applicant?.address,
          District: r.district,
          Anchal: r.anchal,
          Mauja: r.mauja,
          "Mauja Not In Master List": r.maujaOther ? "Yes" : "",
          "Revenue Thana No.": r.thanaNo || "",
          "No. of Plots": getPlots(r).length,
          "Khata No(s).": r.khataNo,
          "Khesra No(s).": r.khesraNo,
          "Total Area (Acres, approx.)": r.areaAcres,
          "Land Type(s)": landTypeLabel(r.landType, "en"),
          "Chauhaddi North": r.chauhaddi?.north,
          "Chauhaddi South": r.chauhaddi?.south,
          "Chauhaddi East": r.chauhaddi?.east,
          "Chauhaddi West": r.chauhaddi?.west,
          Latitude: r.latitude ?? "",
          Longitude: r.longitude ?? "",
          "Map Link": locationUrl(r),
          Photos: (r.photos || []).map((p) => p.url).join(" \n"),
          "No Title Suit Declared": r.declarations?.noTitleSuit ? "Yes" : "",
          "Submitted On": formatDateTime(r.submittedAt),
        }));
      // One row per Khata / Khesra so plots can be filtered and totalled in Excel.
      const plotRows = filtered.flatMap((r) =>
        getPlots(r).map((p, i) => ({
          "Application ID": r.applicationId,
          "Plot #": i + 1,
          "Applicant Name": r.applicant?.name,
          "Mobile Number": r.mobile,
          District: r.district,
          Anchal: r.anchal,
          Mauja: r.mauja,
          "Khata No.": p.khataNo,
          "Khesra No.": p.khesraNo,
          Area: p.area,
          Unit: p.areaUnit,
          "Area (Acres, approx.)": p.areaAcres ?? "",
          "Land Type": landTypeLabel(p.landType || r.landType, "en"),
          "Jamabandi No.": p.jamabandiNo || "",
        }))
      );
      await exportExcel(
        [
          { name: "Applications", rows: applicationRows },
          { name: "Plots", rows: plotRows },
        ],
        `${fileStem}.xlsx`
      );
    } catch (err) {
      console.error(err);
    } finally {
      setExporting("");
    }
  };

  // PDF: render the report pages off-screen, then rasterise them once mounted.
  const handlePdf = () => {
    setExporting("pdf");
    pageRefs.current = [];
    setPdfRows(filtered);
  };

  useEffect(() => {
    if (!pdfRows) return undefined;
    let cancelled = false;
    const run = async () => {
      await document.fonts?.ready;
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      if (cancelled) return;
      try {
        await pagesToPdf(pageRefs.current.filter(Boolean), `${fileStem}.pdf`);
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) {
          setPdfRows(null);
          setExporting("");
        }
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [pdfRows, fileStem]);

  const columns = [
    t("applicationId"),
    t("applicantShort"),
    t("mobileShort"),
    t("district"),
    t("anchalShort"),
    t("mauja"),
    t("khataNo"),
    t("khesraShort"),
    t("area"),
    t("submittedOn"),
    t("view"),
  ];

  return (
    <AdminLayout>
      <PageHeader
        eyebrow={isState ? t("stateAdmin") : `${t("districtAdmin")} · ${districtLabel(admin?.district, lang)}`}
        title={t("applications")}
        subtitle={t("applicationsSub")}
        actions={
          <>
            <Button variant="secondary" icon={FiRefreshCw} onClick={reload} disabled={loading}>
              {t("refresh")}
            </Button>
            <Button variant="secondary" icon={FiDownload} onClick={handleExcel} loading={exporting === "excel"} disabled={!filtered.length || !!exporting}>
              {t("exportExcel")}
            </Button>
            <Button icon={FiFileText} onClick={handlePdf} loading={exporting === "pdf"} disabled={!filtered.length || !!exporting}>
              {exporting === "pdf" ? t("exporting") : t("exportPdf")}
            </Button>
          </>
        }
      />

      <Card className="mt-6 p-4 sm:p-5">
        <Input
          name="q"
          icon={FiSearch}
          type="search"
          placeholder={t("searchPlaceholder")}
          value={filters.q}
          onChange={(e) => update({ q: e.target.value })}
        />
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Select
            name="district"
            label={t("district")}
            icon={FiMapPin}
            placeholder={isState ? t("allDistricts") : undefined}
            options={isState ? districtOptions : districtOptions.filter((o) => o.value === admin?.district)}
            value={filters.district}
            disabled={!isState}
            onChange={(e) => setFilter("district", e.target.value)}
          />
          <Select
            name="anchal"
            label={t("anchal")}
            icon={FiLayers}
            placeholder={filters.district ? `${t("select")} ${t("anchalShort")}` : t("selectDistrictFirst")}
            options={anchalOptions}
            value={filters.anchal}
            disabled={!filters.district}
            onChange={(e) => setFilter("anchal", e.target.value)}
          />
          <Select
            name="mauja"
            label={t("mauja")}
            icon={FiHome}
            placeholder={filters.anchal ? `${t("select")} ${t("mauja")}` : t("selectAnchalFirst")}
            options={maujaOptions}
            value={filters.mauja}
            disabled={!filters.anchal}
            onChange={(e) => setFilter("mauja", e.target.value)}
          />
          <Input
            name="from"
            label={t("fromDate")}
            icon={FiCalendar}
            type="date"
            value={filters.from}
            max={filters.to || undefined}
            onChange={(e) => setFilter("from", e.target.value)}
          />
          <Input
            name="to"
            label={t("toDate")}
            icon={FiCalendar}
            type="date"
            value={filters.to}
            min={filters.from || undefined}
            onChange={(e) => setFilter("to", e.target.value)}
          />
        </div>
      </Card>

      <div className="mb-3 mt-6 flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
          {t("recordsCount", { shown: filtered.length, total: rows.length })}
        </span>
        {hasFilters && (
          <button
            onClick={() => update({ q: "", district: isState ? "" : filters.district, anchal: "", mauja: "", from: "", to: "" })}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-800"
          >
            <FiX className="h-3.5 w-3.5" />
            {t("clearFilters")}
          </button>
        )}
      </div>

      {error && (
        <Alert tone="error" className="mb-4">
          {t("errLoad")}
        </Alert>
      )}

      {loading && !rows.length ? (
        <PageLoader label={t("loading")} />
      ) : (
        <Card className="overflow-hidden">
          {visible.length === 0 ? (
            <EmptyState icon={FiSearch} title={t("noMatches")} />
          ) : (
            <>
              <div className="hidden overflow-x-auto md:block">
                <table className="min-w-full text-[13px]">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {columns.map((c, i) => (
                        <th key={c} className={`whitespace-nowrap px-3 py-3 ${i === columns.length - 1 ? "text-right" : ""}`}>
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {visible.map((r) => (
                      <tr key={r.id} className="transition hover:bg-slate-50/70">
                        <td className="whitespace-nowrap px-3 py-3 font-mono text-[13px] font-semibold text-brand-800">{r.applicationId}</td>
                        <td className="px-3 py-3 font-medium text-slate-800">{r.applicant?.name}</td>
                        <td className="whitespace-nowrap px-3 py-3 text-slate-600">{r.mobile}</td>
                        <td className="px-3 py-3 text-slate-600">{districtLabel(r.district, lang)}</td>
                        <td className="px-3 py-3 text-slate-600">{anchalLabel(r.district, r.anchal, lang)}</td>
                        <td className="px-3 py-3 text-slate-600">{maujaLabel(r.district, r.anchal, r.mauja, lang)}</td>
                        <td className="px-3 py-3 text-slate-600">{r.khataNo}</td>
                        <td className="px-3 py-3 text-slate-600">{r.khesraNo}</td>
                        <td className="whitespace-nowrap px-3 py-3 text-slate-600">{formatTotalArea(r, lang, t)}</td>
                        <td className="whitespace-nowrap px-3 py-3 text-slate-600">{formatDate(r.submittedAt)}</td>
                        <td className="px-3 py-3 text-right">
                          <Button to={`/admin/applications/${r.applicationId}`} variant="secondary" size="sm" icon={FiEye}>
                            {t("view")}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ul className="divide-y divide-slate-100 md:hidden">
                {visible.map((r) => (
                  <li key={r.id}>
                    <button onClick={() => navigate(`/admin/applications/${r.applicationId}`)} className="w-full px-4 py-4 text-left transition hover:bg-slate-50">
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-mono text-sm font-bold text-brand-800">{r.applicationId}</p>
                        <span className="shrink-0 text-xs text-slate-400">{formatDate(r.submittedAt)}</span>
                      </div>
                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {r.applicant?.name} · {r.mobile}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {maujaLabel(r.district, r.anchal, r.mauja, lang)}, {anchalLabel(r.district, r.anchal, lang)}, {districtLabel(r.district, lang)}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {t("khataNo")}: <strong className="text-slate-700">{r.khataNo}</strong> · {t("khesraShort")}:{" "}
                        <strong className="text-slate-700">{r.khesraNo}</strong> · {formatTotalArea(r, lang, t)}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
          <Pagination
            page={currentPage}
            pages={pages}
            pageSize={pageSize}
            onPage={(p) => update({ page: String(p) })}
            onPageSize={(s) => update({ size: String(s) })}
          />
        </Card>
      )}

      {pdfRows && (
        <div aria-hidden className="pointer-events-none fixed left-[-20000px] top-0">
          <ReportPages rows={pdfRows} filtersText={filtersText} pageRefs={pageRefs} />
        </div>
      )}
    </AdminLayout>
  );
}

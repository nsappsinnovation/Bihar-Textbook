import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiSearch, FiX, FiDownload, FiFileText, FiEye, FiMapPin, FiLayers, FiGrid, FiPackage, FiRefreshCw } from "react-icons/fi";
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
import { useAdminEnterprises } from "../../lib/useAdminEnterprises";
import { ROLE_STATE } from "../../lib/adminApi";
import { DISTRICTS, blockLabel, districtLabel, sectorLabel, unitLabel, useLocationData } from "../../lib/locations";
import { biharShare, formatCapacity, formatDateTime, formatNumber, isoDate } from "../../lib/format";
import { areaSqm, centroid, isPoint } from "../../lib/geo";
import { exportExcel, pagesToPdf } from "../../lib/exporters";
import { SECTORS } from "../../data/sectors";

// PDF rows grow with the number of products shown, so pages are filled by line budget.
const LINES_PER_PDF_PAGE = 20;
const FILTER_KEYS = ["q", "district", "block", "sector", "product"];

const lower = (v) => String(v || "").trim().toLowerCase();

// With a product filter, only the matching products are listed against each enterprise.
const productsFor = (r, product) => {
  const list = r.productList || [];
  const needle = lower(product);
  return needle ? list.filter((p) => lower(p.productName).includes(needle)) : list;
};

function paginateByLines(rows, product) {
  const pages = [];
  let page = [];
  let lines = 0;
  rows.forEach((r) => {
    const n = Math.max(1, productsFor(r, product).length);
    if (page.length && lines + n > LINES_PER_PDF_PAGE) {
      pages.push(page);
      page = [];
      lines = 0;
    }
    page.push(r);
    lines += n;
  });
  if (page.length || !pages.length) pages.push(page);
  return pages;
}

// One line per product, so the Product and Capacity columns line up row by row.
function ProductCells({ products, render }) {
  if (!products.length) return <span className="text-slate-400">—</span>;
  return (
    <ul className="space-y-1">
      {products.map((p, i) => (
        <li key={p.id || i} className="whitespace-nowrap">
          {render(p)}
        </li>
      ))}
    </ul>
  );
}

function ReportPages({ rows, product, filtersText, pageRefs }) {
  const { t, lang } = useT();
  const pages = paginateByLines(rows, product);
  const generated = formatDateTime(new Date());
  let serial = 0;

  return pages.map((chunk, pageIndex) => (
    <div
      key={pageIndex}
      ref={(el) => (pageRefs.current[pageIndex] = el)}
      className="flex h-[794px] w-[1123px] flex-col bg-white p-8 text-slate-900"
      style={{ fontFamily: "Inter, 'Noto Sans Devanagari', sans-serif" }}
    >
      <div className="flex items-center gap-4 border-b-2 border-brand-700 pb-3">
        <img src="/dept-industries.png" alt="" className="h-12 w-12 object-contain" />
        <div className="flex-1">
          <p className="text-base font-bold">{t("deptName")}</p>
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
      <table className="mt-3 w-full border-collapse text-[10.5px]">
        <thead>
          <tr className="bg-brand-50 text-left text-brand-950">
            {["#", t("registrationId"), t("enterpriseName"), t("district"), t("block"), t("sector"), t("product"), t("productionCapacity"), t("projectCostShort"), t("directShort"), t("indirectShort"), t("udyamNo")].map((h) => (
              <th key={h} className="border border-slate-200 px-2 py-1.5 align-top font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chunk.map((r) => {
            serial += 1;
            const products = productsFor(r, product);
            return (
              <tr key={r.id} className="align-top odd:bg-white even:bg-slate-50">
                <td className="border border-slate-200 px-2 py-1.5">{serial}</td>
                <td className="border border-slate-200 px-2 py-1.5 font-mono font-semibold">{r.registrationId}</td>
                <td className="border border-slate-200 px-2 py-1.5 font-semibold">{r.unitName}</td>
                <td className="border border-slate-200 px-2 py-1.5">{districtLabel(r.district, lang)}</td>
                <td className="border border-slate-200 px-2 py-1.5">{blockLabel(r.block)}</td>
                <td className="border border-slate-200 px-2 py-1.5">{sectorLabel(r.sector, lang, r.sectorOther)}</td>
                <td className="border border-slate-200 px-2 py-1.5">
                  {products.map((p, i) => (
                    <div key={p.id || i}>{p.productName}</div>
                  ))}
                </td>
                <td className="border border-slate-200 px-2 py-1.5">
                  {products.map((p, i) => (
                    <div key={p.id || i}>{formatCapacity(p, lang)}</div>
                  ))}
                </td>
                <td className="border border-slate-200 px-2 py-1.5 text-right">{formatNumber(r.projectCost, 2)}</td>
                <td className="border border-slate-200 px-2 py-1.5 text-right">
                  {formatNumber(r.directEmployees, 0)}
                  {biharShare(r) !== null && <div className="text-[9px] text-slate-500">{t("pctBihar", { pct: biharShare(r) })}</div>}
                </td>
                <td className="border border-slate-200 px-2 py-1.5 text-right">{formatNumber(r.indirectEmployees, 0)}</td>
                <td className="border border-slate-200 px-2 py-1.5 font-mono">{r.udyamRegistrationNo}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-auto flex justify-between pt-2 text-[10px] text-slate-400">
        <span>{t("reportFootnote")}</span>
        <span className="shrink-0 pl-4">
          {pageIndex + 1} / {pages.length}
        </span>
      </div>
    </div>
  ));
}

export default function EnterpriseDirectory() {
  const { t, lang } = useT();
  const { admin } = useAuth();
  const navigate = useNavigate();
  const { rows, loading, error, reload } = useAdminEnterprises();
  const isState = admin?.role === ROLE_STATE;
  const [params, setParams] = useSearchParams();
  const [exporting, setExporting] = useState("");
  const [pdfRows, setPdfRows] = useState(null);
  const pageRefs = useRef([]);

  const filters = {
    q: params.get("q") || "",
    district: isState ? params.get("district") || "" : admin?.district || "",
    block: params.get("block") || "",
    sector: params.get("sector") || "",
    product: params.get("product") || "",
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

  const setFilter = (key, value) => update(key === "district" ? { district: value, block: "" } : { [key]: value });

  const filtered = useMemo(() => {
    const q = lower(filters.q);
    const product = lower(filters.product);
    return rows.filter((r) => {
      if (filters.district && r.district !== filters.district) return false;
      if (filters.block && r.block !== filters.block) return false;
      if (filters.sector && r.sector !== filters.sector) return false;
      if (product && !(r.productList || []).some((p) => lower(p.productName).includes(product))) return false;
      if (q && !(r.searchText || "").includes(q)) return false;
      return true;
    });
  }, [rows, filters.q, filters.district, filters.block, filters.sector, filters.product]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pages);
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const hasFilters = FILTER_KEYS.some((k) => (k === "district" && !isState ? false : filters[k]));

  // Blocks: master list for the district plus any typed ("not in list") blocks in the data.
  const locations = useLocationData();
  const districtOptions = DISTRICTS.map((d) => ({ value: d.en, label: lang === "hi" ? d.hi : d.en }));
  const blockOptions = useMemo(() => {
    if (!filters.district) return [];
    const set = new Set(locations.getBlocks(filters.district));
    rows.forEach((r) => r.district === filters.district && r.block && set.add(r.block));
    return [...set].sort((a, b) => a.localeCompare(b)).map((b) => ({ value: b, label: b }));
  }, [locations, rows, filters.district]);
  const sectorOptions = SECTORS.map((s) => ({ value: s.value, label: s[lang] }));
  // Suggestions for the product filter: distinct product names in scope.
  const productNames = useMemo(() => {
    const map = new Map();
    rows.forEach((r) => (r.productList || []).forEach((p) => map.set(lower(p.productName), p.productName.trim())));
    return [...map.values()].sort((a, b) => a.localeCompare(b));
  }, [rows]);

  const filtersText =
    [
      filters.district && `${t("district")}: ${districtLabel(filters.district, lang)}`,
      filters.block && `${t("block")}: ${blockLabel(filters.block)}`,
      filters.sector && `${t("sector")}: ${sectorLabel(filters.sector, lang)}`,
      filters.product && `${t("product")}: "${filters.product}"`,
      filters.q && `"${filters.q}"`,
    ]
      .filter(Boolean)
      .join(" · ") || t("none");

  const fileStem = `BPPP-Local-Enterprises-${filters.district || "All"}-${isoDate()}`;

  const handleExcel = async () => {
    setExporting("excel");
    try {
      const enterpriseRows = filtered.map((r, i) => ({
        "S.No.": i + 1,
        "Registration ID": r.registrationId,
        "Enterprise / Unit Name": r.unitName,
        "Applicant Name": r.name,
        "Mobile Number": r.mobile,
        Email: r.email || "",
        Address: r.address,
        District: r.district,
        Block: r.block,
        "Block Not In Master List": r.blockOther ? "Yes" : "",
        "City / Town": r.city,
        "Unit Location": r.unitLocation,
        Sector: sectorLabel(r.sector, "en", r.sectorOther),
        "No. of Products": r.productCount || (r.productList || []).length,
        Products: (r.productList || []).map((p) => `${p.productName} (${formatCapacity(p, "en")})`).join("; "),
        "Project Cost (Rs. Lakh)": r.projectCost,
        "Direct Employees": r.directEmployees,
        "Direct Employees from Bihar": r.directEmployeesBihar ?? "",
        "Bihar Share of Direct (%)": biharShare(r) ?? "",
        "Indirect Employees": r.indirectEmployees,
        "Udyam Registration No.": r.udyamRegistrationNo,
        "Unit Photos": (r.photos || []).map((p) => p.url).join(" \n"),
        "GIS Corners": (r.boundary || []).filter(isPoint).length || "",
        "GIS Boundary (lat, lng)": (r.boundary || []).map((p) => `${p.lat}, ${p.lng}`).join("; "),
        "GIS Approx. Area (sq m)": (r.boundary || []).length >= 3 ? Math.round(areaSqm(r.boundary)) : "",
        "GIS Centre": (r.boundary || []).length ? (({ lat, lng }) => `${lat.toFixed(6)}, ${lng.toFixed(6)}`)(centroid(r.boundary)) : "",
        "Registered On": formatDateTime(r.createdAt),
        "Last Updated": formatDateTime(r.updatedAt),
      }));
      // One row per product: "who produces what, where, and how much".
      const productRows = filtered.flatMap((r) =>
        productsFor(r, filters.product).map((p, i) => ({
          "Registration ID": r.registrationId,
          "Product #": i + 1,
          "Product Name": p.productName,
          "Production Capacity (per annum)": p.productionCapacity,
          "Capacity Unit": unitLabel(p.capacityUnit, "en"),
          "Enterprise / Unit Name": r.unitName,
          Sector: sectorLabel(r.sector, "en", r.sectorOther),
          District: r.district,
          Block: r.block,
          "City / Town": r.city,
          "Mobile Number": r.mobile,
          "Udyam Registration No.": r.udyamRegistrationNo,
        }))
      );
      await exportExcel(
        [
          { name: "Enterprises", rows: enterpriseRows },
          { name: "Products", rows: productRows },
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
    t("registrationId"),
    t("enterpriseName"),
    t("district"),
    t("block"),
    t("sector"),
    t("product"),
    t("productionCapacity"),
    t("projectCostShort"),
    t("directShort"),
    t("indirectShort"),
    t("udyamNo"),
    t("view"),
  ];
  const numeric = new Set([7, 8, 9]);

  return (
    <AdminLayout>
      <PageHeader
        eyebrow={isState ? t("stateAdmin") : `${t("districtAdmin")} · ${districtLabel(admin?.district, lang)}`}
        title={t("directory")}
        subtitle={t("directorySub")}
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
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
            name="block"
            label={t("block")}
            icon={FiLayers}
            placeholder={filters.district ? t("allBlocks") : t("selectDistrictFirst")}
            options={blockOptions}
            value={filters.block}
            disabled={!filters.district}
            onChange={(e) => setFilter("block", e.target.value)}
          />
          <Select
            name="sector"
            label={t("sector")}
            icon={FiGrid}
            placeholder={t("allSectors")}
            options={sectorOptions}
            value={filters.sector}
            onChange={(e) => setFilter("sector", e.target.value)}
          />
          <Input
            name="product"
            label={t("product")}
            icon={FiPackage}
            type="search"
            list="bppp-product-names"
            placeholder={t("productFilterPlaceholder")}
            value={filters.product}
            onChange={(e) => update({ product: e.target.value })}
          />
          <datalist id="bppp-product-names">
            {productNames.map((n) => (
              <option key={n} value={n} />
            ))}
          </datalist>
        </div>
      </Card>

      <div className="mb-3 mt-6 flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
          {t("recordsCount", { shown: filtered.length, total: rows.length })}
        </span>
        {hasFilters && (
          <button
            onClick={() => update({ q: "", district: isState ? "" : filters.district, block: "", sector: "", product: "" })}
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
                        <th
                          key={c}
                          className={`whitespace-nowrap px-3 py-3 ${i === columns.length - 1 ? "text-right" : ""} ${numeric.has(i) ? "text-right" : ""}`}
                        >
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {visible.map((r) => {
                      const products = productsFor(r, filters.product);
                      return (
                        <tr key={r.id} className="align-top transition hover:bg-slate-50/70">
                          <td className="whitespace-nowrap px-3 py-3 font-mono text-[13px] font-semibold text-brand-800">{r.registrationId}</td>
                          <td className="min-w-[12rem] px-3 py-3">
                            <p className="font-medium text-slate-800">{r.unitName}</p>
                            <p className="text-xs text-slate-500">
                              {r.name} · {r.mobile}
                            </p>
                          </td>
                          <td className="px-3 py-3 text-slate-600">{districtLabel(r.district, lang)}</td>
                          <td className="px-3 py-3 text-slate-600">{blockLabel(r.block)}</td>
                          <td className="px-3 py-3 text-slate-600">{sectorLabel(r.sector, lang, r.sectorOther)}</td>
                          <td className="px-3 py-3 font-medium text-slate-700">
                            <ProductCells products={products} render={(p) => p.productName} />
                          </td>
                          <td className="px-3 py-3 text-slate-600">
                            <ProductCells products={products} render={(p) => formatCapacity(p, lang)} />
                          </td>
                          <td className="whitespace-nowrap px-3 py-3 text-right tabular-nums text-slate-600">{formatNumber(r.projectCost, 2)}</td>
                          <td className="px-3 py-3 text-right tabular-nums text-slate-600">
                            {formatNumber(r.directEmployees, 0)}
                            {biharShare(r) !== null && (
                              <span className="block whitespace-nowrap text-[11px] text-slate-400">{t("pctBihar", { pct: biharShare(r) })}</span>
                            )}
                          </td>
                          <td className="px-3 py-3 text-right tabular-nums text-slate-600">{formatNumber(r.indirectEmployees, 0)}</td>
                          <td className="whitespace-nowrap px-3 py-3 font-mono text-xs text-slate-600">{r.udyamRegistrationNo}</td>
                          <td className="px-3 py-3 text-right">
                            <Button to={`/admin/enterprises/${r.registrationId}`} variant="secondary" size="sm" icon={FiEye}>
                              {t("view")}
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <ul className="divide-y divide-slate-100 md:hidden">
                {visible.map((r) => {
                  const products = productsFor(r, filters.product);
                  return (
                    <li key={r.id}>
                      <button
                        onClick={() => navigate(`/admin/enterprises/${r.registrationId}`)}
                        className="w-full px-4 py-4 text-left transition hover:bg-slate-50"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="font-mono text-sm font-bold text-brand-800">{r.registrationId}</p>
                          <span className="shrink-0 text-xs text-slate-400">{sectorLabel(r.sector, lang, r.sectorOther)}</span>
                        </div>
                        <p className="mt-1 text-sm font-semibold text-slate-800">{r.unitName}</p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {blockLabel(r.block)}, {districtLabel(r.district, lang)} · {r.udyamRegistrationNo}
                        </p>
                        <ul className="mt-2 space-y-0.5 text-xs text-slate-600">
                          {products.map((p, i) => (
                            <li key={p.id || i}>
                              <strong className="font-semibold text-slate-700">{p.productName}</strong> · {formatCapacity(p, lang)}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-2 text-xs text-slate-500">
                          {t("projectCostShort")}: <strong className="text-slate-700">{formatNumber(r.projectCost, 2)}</strong> · {t("directShort")}:{" "}
                          <strong className="text-slate-700">{formatNumber(r.directEmployees, 0)}</strong>
                          {biharShare(r) !== null && <span className="text-slate-400"> ({t("pctBihar", { pct: biharShare(r) })})</span>} · {t("indirectShort")}:{" "}
                          <strong className="text-slate-700">{formatNumber(r.indirectEmployees, 0)}</strong>
                        </p>
                      </button>
                    </li>
                  );
                })}
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
          <ReportPages rows={pdfRows} product={filters.product} filtersText={filtersText} pageRefs={pageRefs} />
        </div>
      )}
    </AdminLayout>
  );
}

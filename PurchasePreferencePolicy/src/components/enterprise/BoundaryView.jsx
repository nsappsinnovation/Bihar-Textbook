import { FiDownload, FiExternalLink } from "react-icons/fi";
import { useT } from "../../i18n/LanguageContext";
import { areaSqm, centroid, isPoint, mapsUrl, outlinePath, sqmToAcres, toGeoJson } from "../../lib/geo";
import { formatNumber } from "../../lib/format";

// Outline sketch of the unit boundary with numbered corners (not to a map scale).
function Sketch({ points }) {
  const outline = outlinePath(points);
  if (!outline) return null;
  return (
    <svg viewBox="0 0 100 100" className="h-40 w-40 shrink-0 rounded-xl bg-white ring-1 ring-slate-200" role="img" aria-hidden="true">
      <polygon
        points={outline.map((p) => `${p.x},${p.y}`).join(" ")}
        className="fill-brand-500/15 stroke-brand-700"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {outline.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="3.4" className="fill-brand-700" />
          <text x={p.x} y={p.y + 1.3} textAnchor="middle" className="fill-white" fontSize="3.6" fontWeight="700">
            {i + 1}
          </text>
        </g>
      ))}
    </svg>
  );
}

/**
 * Read-only GIS boundary: outline sketch, approximate area, map link, the corner list
 * and (optionally) a GeoJSON download for GIS tools.
 */
export default function BoundaryView({ points: raw = [], compact = false, downloadName }) {
  const { t } = useT();
  const points = raw.filter(isPoint);
  if (!points.length) return <p className="text-sm text-slate-400">{t("noBoundary")}</p>;

  const sqm = areaSqm(points);
  const center = centroid(points);

  const download = () => {
    const blob = new Blob([JSON.stringify(toGeoJson(points, { name: downloadName }), null, 2)], { type: "application/geo+json" });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), { href: url, download: `${downloadName || "unit-boundary"}.geojson` });
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
      <Sketch points={points} />
      <div className="min-w-0 flex-1 space-y-3">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <p>
            <span className="text-xs font-medium uppercase tracking-wide text-slate-400">{t("corners")}</span>
            <span className="block font-semibold text-slate-800">{points.length}</span>
          </p>
          {sqm > 0 && (
            <p>
              <span className="text-xs font-medium uppercase tracking-wide text-slate-400">{t("approxArea")}</span>
              <span className="block font-semibold text-slate-800">
                {formatNumber(sqm, 0)} {t("sqmShort")}
                <span className="ml-1.5 font-normal text-slate-400">≈ {formatNumber(sqmToAcres(sqm), 2)} {t("acresShort")}</span>
              </span>
            </p>
          )}
        </div>
        <div className="no-print flex flex-wrap gap-2">
          <a
            href={mapsUrl(center)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-800"
          >
            <FiExternalLink className="h-3.5 w-3.5" />
            {t("openOnMap")}
          </a>
          {downloadName && points.length >= 3 && (
            <button
              type="button"
              onClick={download}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-800"
            >
              <FiDownload className="h-3.5 w-3.5" />
              {t("downloadGeoJson")}
            </button>
          )}
        </div>
        {!compact && (
          <ol className="grid grid-cols-1 gap-x-6 gap-y-1 font-mono text-xs text-slate-600 sm:grid-cols-2">
            {points.map((p, i) => (
              <li key={i}>
                <span className="mr-2 font-sans font-semibold text-slate-400">{i + 1}.</span>
                {Number(p.lat).toFixed(6)}, {Number(p.lng).toFixed(6)}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

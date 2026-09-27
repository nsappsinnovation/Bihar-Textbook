import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineDocumentText, HiOutlineUsers, HiOutlineMap, HiOutlineSquares2X2 } from "react-icons/hi2";
import { FiArrowRight, FiRefreshCw, FiMapPin, FiLayers, FiClock, FiTrendingUp, FiGrid, FiHome } from "react-icons/fi";
import AdminLayout from "../../components/layout/AdminLayout";
import Card, { PageHeader, SectionHeading } from "../../components/ui/Card";
import StatCard from "../../components/ui/StatCard";
import BarList from "../../components/ui/BarList";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import EmptyState from "../../components/ui/EmptyState";
import { PageLoader } from "../../components/ui/Spinner";
import TrendColumns from "../../components/admin/TrendColumns";
import { useT } from "../../i18n/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { useAdminApplications } from "../../lib/useAdminApplications";
import { ROLE_STATE } from "../../lib/adminApi";
import { anchalLabel, districtLabel, landTypeLabel, maujaLabel } from "../../lib/locations";
import { formatDate, formatNumber, isoDate, toDate } from "../../lib/format";
import { formatTotalArea, getPlots } from "../../lib/plots";

const TREND_DAYS = 30;
const TOP_N = 8;

// Groups rows into { key, count, acres } buckets, largest first.
function group(rows, keyFn) {
  const map = new Map();
  rows.forEach((r) => {
    const k = keyFn(r);
    if (k === undefined || k === null || k === "") return;
    const cur = map.get(k) || { count: 0, acres: 0 };
    cur.count += 1;
    cur.acres += Number(r.areaAcres) || 0;
    map.set(k, cur);
  });
  return [...map.entries()].map(([key, v]) => ({ key, ...v })).sort((a, b) => b.count - a.count);
}

export default function AdminDashboard() {
  const { t, lang } = useT();
  const { admin } = useAuth();
  const navigate = useNavigate();
  const { rows, loading, error, reload } = useAdminApplications();
  const isState = admin?.role === ROLE_STATE;

  const stats = useMemo(() => {
    const acres = rows.reduce((sum, r) => sum + (Number(r.areaAcres) || 0), 0);
    const plots = rows.reduce((sum, r) => sum + (r.plotCount || getPlots(r).length), 0);

    // Last 30 days, including empty days so gaps are visible.
    const today = new Date();
    const days = Array.from({ length: TREND_DAYS }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (TREND_DAYS - 1 - i));
      return { date: isoDate(d), count: 0 };
    });
    const index = new Map(days.map((d, i) => [d.date, i]));
    rows.forEach((r) => {
      const key = r.submittedDate || isoDate(toDate(r.submittedAt));
      const i = index.get(key);
      if (i !== undefined) days[i].count += 1;
    });
    const last7 = days.slice(-7).reduce((s, d) => s + d.count, 0);
    const prev7 = days.slice(-14, -7).reduce((s, d) => s + d.count, 0);

    const acresOf = (n) => `${formatNumber(n, 2)} ${t("acreShort")}`;
    const districts = group(rows, (r) => r.district).map((g) => ({
      key: g.key,
      label: districtLabel(g.key, lang),
      value: g.count,
      secondary: acresOf(g.acres),
      district: g.key,
    }));
    const anchals = group(rows, (r) => `${r.district}|${r.anchal}`).map((g) => {
      const [district, anchal] = g.key.split("|");
      return {
        key: g.key,
        label: anchalLabel(district, anchal, lang),
        sub: isState ? districtLabel(district, lang) : undefined,
        value: g.count,
        secondary: acresOf(g.acres),
        district,
        anchal,
      };
    });
    const maujas = group(rows, (r) => `${r.district}|${r.anchal}|${r.mauja}`).map((g) => {
      const [district, anchal, mauja] = g.key.split("|");
      return {
        key: g.key,
        label: maujaLabel(district, anchal, mauja, lang),
        sub: anchalLabel(district, anchal, lang),
        value: g.count,
        secondary: acresOf(g.acres),
        district,
        anchal,
        mauja,
      };
    });
    // Land type counted per plot (a plot is what carries a type).
    const typeMap = new Map();
    rows.forEach((r) =>
      getPlots(r).forEach((p) => {
        if (!p.landType) return;
        const cur = typeMap.get(p.landType) || { count: 0, acres: 0 };
        cur.count += 1;
        cur.acres += Number(p.areaAcres) || 0;
        typeMap.set(p.landType, cur);
      })
    );
    const landTypes = [...typeMap.entries()]
      .map(([key, v]) => ({ key, label: landTypeLabel(key, lang), value: v.count, secondary: acresOf(v.acres) }))
      .sort((a, b) => b.value - a.value);

    return {
      applicants: new Set(rows.map((r) => r.mobile)).size,
      acres,
      plots,
      days,
      last7,
      prev7,
      districts,
      anchals,
      maujas,
      landTypes,
    };
  }, [rows, lang, isState, t]);

  const goFiltered = (params) => navigate(`/admin/applications?${new URLSearchParams(params)}`);
  const hasData = rows.length > 0;

  return (
    <AdminLayout>
      <PageHeader
        eyebrow={isState ? t("stateAdmin") : `${t("districtAdmin")} · ${districtLabel(admin?.district, lang)}`}
        title={t("dashboard")}
        subtitle={t("adminDashboardSub")}
        actions={
          <>
            <Button variant="secondary" icon={FiRefreshCw} onClick={reload} loading={loading}>
              {t("refresh")}
            </Button>
            <Button to="/admin/applications" iconRight={FiArrowRight}>
              {t("applications")}
            </Button>
          </>
        }
      />

      {error && (
        <Alert tone="error" className="mt-6">
          {t("errLoad")}
        </Alert>
      )}

      {loading && !rows.length ? (
        <PageLoader label={t("loading")} />
      ) : !hasData ? (
        <Card className="mt-8">
          <EmptyState icon={HiOutlineDocumentText} title={t("noSubmissionsYet")} />
        </Card>
      ) : (
        <>
          {/* ---------- KPIs ---------- */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label={t("totalSubmissions")}
              value={formatNumber(rows.length, 0)}
              hint={t("last7Summary", { n: stats.last7, prev: stats.prev7 })}
              icon={HiOutlineDocumentText}
              accent="from-brand-600 to-brand-800"
            />
            <StatCard
              label={t("totalApplicants")}
              value={formatNumber(stats.applicants, 0)}
              hint={t("uniqueMobiles")}
              icon={HiOutlineUsers}
              accent="from-brand-700 to-brand-900"
            />
            <StatCard
              label={t("totalPlots")}
              value={formatNumber(stats.plots, 0)}
              hint={t("plotsHint")}
              icon={HiOutlineSquares2X2}
              accent="from-gold-500 to-gold-700"
            />
            <StatCard
              label={t("totalArea")}
              value={`${formatNumber(stats.acres, 2)}`}
              hint={`${t("acresApprox")} · ${t("convertedToAcres")}`}
              icon={HiOutlineMap}
              accent="from-brand-800 to-brand-950"
            />
          </div>

          {/* ---------- Coverage strip ---------- */}
          <Card className="mt-5 grid grid-cols-2 divide-y divide-slate-100 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
            {[
              [FiMapPin, t("districtsCovered"), stats.districts.length],
              [FiLayers, t("anchalsCovered"), stats.anchals.length],
              [FiHome, t("maujasCovered"), stats.maujas.length],
              [FiGrid, t("landTypesCovered"), stats.landTypes.length],
            ].map(([Icon, label, value]) => (
              <div key={label} className="flex items-center gap-3 px-5 py-4">
                <Icon className="h-4 w-4 shrink-0 text-brand-700" />
                <div className="min-w-0">
                  <p className="text-lg font-bold leading-none text-slate-900">{formatNumber(value, 0)}</p>
                  <p className="mt-1 truncate text-xs text-slate-500">{label}</p>
                </div>
              </div>
            ))}
          </Card>

          {/* ---------- Trend + land type ---------- */}
          <div className="mt-5 grid grid-cols-1 items-start gap-5 lg:grid-cols-5">
            <Card className="p-5 sm:p-6 lg:col-span-3">
              <SectionHeading icon={FiTrendingUp} title={t("trend30")} subtitle={t("trend30Sub")} className="mb-6" />
              <TrendColumns days={stats.days} label={t("trend30")} />
            </Card>
            <Card className="p-5 sm:p-6 lg:col-span-2">
              <SectionHeading icon={FiGrid} title={t("landTypeSplit")} subtitle={t("landTypeSplitSub")} className="mb-5" />
              <BarList items={stats.landTypes} emptyText={t("noData")} unitLabel={t("plotsWord")} />
            </Card>
          </div>

          {/* ---------- Location breakdowns ---------- */}
          <div className={`mt-5 grid grid-cols-1 items-start gap-5 ${isState ? "lg:grid-cols-2" : ""}`}>
            {isState && (
              <Card className="p-5 sm:p-6">
                <SectionHeading
                  icon={FiMapPin}
                  title={t("districtWise")}
                  subtitle={t("topNSub", { n: Math.min(TOP_N, stats.districts.length), total: stats.districts.length })}
                  className="mb-5"
                />
                <BarList
                  items={stats.districts.slice(0, TOP_N)}
                  total={rows.length}
                  emptyText={t("noData")}
                  onSelect={(i) => goFiltered({ district: i.district })}
                />
              </Card>
            )}
            <Card className="p-5 sm:p-6">
              <SectionHeading
                icon={FiLayers}
                title={t("anchalWise")}
                subtitle={t("topNSub", { n: Math.min(TOP_N, stats.anchals.length), total: stats.anchals.length })}
                className="mb-5"
              />
              <BarList
                items={stats.anchals.slice(0, TOP_N)}
                total={rows.length}
                emptyText={t("noData")}
                onSelect={(i) => goFiltered({ district: i.district, anchal: i.anchal })}
              />
            </Card>
            {!isState && (
              <Card className="p-5 sm:p-6">
                <SectionHeading
                  icon={FiHome}
                  title={t("maujaWise")}
                  subtitle={t("topNSub", { n: Math.min(TOP_N, stats.maujas.length), total: stats.maujas.length })}
                  className="mb-5"
                />
                <BarList
                  items={stats.maujas.slice(0, TOP_N)}
                  total={rows.length}
                  emptyText={t("noData")}
                  onSelect={(i) => goFiltered({ district: i.district, anchal: i.anchal, mauja: i.mauja })}
                />
              </Card>
            )}
          </div>

          {/* ---------- Recent ---------- */}
          <Card className="mt-5 overflow-hidden">
            <div className="p-5 sm:p-6">
              <SectionHeading
                icon={FiClock}
                title={t("recentSubmissions")}
                action={
                  <Button to="/admin/applications" variant="secondary" size="sm" iconRight={FiArrowRight}>
                    {t("viewAll")}
                  </Button>
                }
              />
            </div>
            <ul className="divide-y divide-slate-100 border-t border-slate-100">
              {rows.slice(0, 6).map((r) => (
                <li key={r.id}>
                  <button
                    onClick={() => navigate(`/admin/applications/${r.applicationId}`)}
                    className="flex w-full flex-col gap-1 px-5 py-3.5 text-left transition hover:bg-brand-50/60 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                  >
                    <div className="min-w-0">
                      <p className="font-mono text-[13px] font-semibold text-brand-800">{r.applicationId}</p>
                      <p className="truncate text-sm text-slate-700">
                        {r.applicant?.name} · {anchalLabel(r.district, r.anchal, lang)}, {districtLabel(r.district, lang)}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-4 text-xs text-slate-500">
                      <span>{formatTotalArea(r, lang, t)}</span>
                      <span>{formatDate(r.submittedAt)}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        </>
      )}
    </AdminLayout>
  );
}

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineBuildingOffice2, HiOutlineCube, HiOutlineUserGroup, HiOutlineUsers } from "react-icons/hi2";
import { FiArrowRight, FiRefreshCw, FiMapPin, FiLayers, FiClock, FiTrendingUp, FiGrid, FiPackage, FiBriefcase } from "react-icons/fi";
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
import { useAdminEnterprises } from "../../lib/useAdminEnterprises";
import { ROLE_STATE } from "../../lib/adminApi";
import { blockLabel, districtLabel, sectorLabel } from "../../lib/locations";
import { formatDate, formatNumber, isoDate, toDate } from "../../lib/format";

const TREND_DAYS = 30;
const TOP_N = 8;

// Groups rows into { key, count, direct } buckets, largest first.
function group(rows, keyFn) {
  const map = new Map();
  rows.forEach((r) => {
    const k = keyFn(r);
    if (k === undefined || k === null || k === "") return;
    const cur = map.get(k) || { count: 0, direct: 0 };
    cur.count += 1;
    cur.direct += Number(r.directEmployees) || 0;
    map.set(k, cur);
  });
  return [...map.entries()].map(([key, v]) => ({ key, ...v })).sort((a, b) => b.count - a.count);
}

export default function AdminDashboard() {
  const { t, lang } = useT();
  const { admin } = useAuth();
  const navigate = useNavigate();
  const { rows, loading, error, reload } = useAdminEnterprises();
  const isState = admin?.role === ROLE_STATE;

  const stats = useMemo(() => {
    const sum = (f) => rows.reduce((s, r) => s + (Number(r[f]) || 0), 0);
    const products = rows.reduce((s, r) => s + (r.productCount || r.productList?.length || 0), 0);

    // Last 30 days, including empty days so gaps are visible.
    const today = new Date();
    const days = Array.from({ length: TREND_DAYS }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (TREND_DAYS - 1 - i));
      return { date: isoDate(d), count: 0 };
    });
    const index = new Map(days.map((d, i) => [d.date, i]));
    rows.forEach((r) => {
      const i = index.get(r.createdDate || isoDate(toDate(r.createdAt)));
      if (i !== undefined) days[i].count += 1;
    });
    const last7 = days.slice(-7).reduce((s, d) => s + d.count, 0);
    const prev7 = days.slice(-14, -7).reduce((s, d) => s + d.count, 0);

    const jobsOf = (n) => t("employeesShort", { n: formatNumber(n, 0) });
    const districts = group(rows, (r) => r.district).map((g) => ({
      key: g.key,
      label: districtLabel(g.key, lang),
      value: g.count,
      secondary: jobsOf(g.direct),
      district: g.key,
    }));
    const blocks = group(rows, (r) => `${r.district}|${r.block}`).map((g) => {
      const [district, block] = g.key.split("|");
      return {
        key: g.key,
        label: blockLabel(block),
        sub: isState ? districtLabel(district, lang) : undefined,
        value: g.count,
        secondary: jobsOf(g.direct),
        district,
        block,
      };
    });
    const sectors = group(rows, (r) => r.sector).map((g) => ({
      key: g.key,
      label: sectorLabel(g.key, lang),
      value: g.count,
      secondary: jobsOf(g.direct),
      sector: g.key,
    }));
    // Product names counted per enterprise (case-insensitive), so "who produces what" is visible.
    const productMap = new Map();
    rows.forEach((r) => {
      new Map((r.productList || []).map((p) => [p.productName.trim().toLowerCase(), p.productName.trim()])).forEach((name, k) => {
        const cur = productMap.get(k) || { name, count: 0 };
        cur.count += 1;
        productMap.set(k, cur);
      });
    });
    const topProducts = [...productMap.entries()]
      .map(([key, v]) => ({ key, label: v.name, value: v.count }))
      .sort((a, b) => b.value - a.value);

    // Bihar share only over units that reported it (older records may not have it).
    const reporting = rows.filter((r) => r.directEmployeesBihar != null);
    const reportingDirect = reporting.reduce((s, r) => s + (Number(r.directEmployees) || 0), 0);
    const biharPct = reportingDirect ? Math.round((reporting.reduce((s, r) => s + (Number(r.directEmployeesBihar) || 0), 0) / reportingDirect) * 100) : null;

    return {
      products,
      biharPct,
      direct: sum("directEmployees"),
      indirect: sum("indirectEmployees"),
      projectCost: sum("projectCost"),
      days,
      last7,
      prev7,
      districts,
      blocks,
      sectors,
      topProducts,
    };
  }, [rows, lang, isState, t]);

  const goFiltered = (params) => navigate(`/admin/directory?${new URLSearchParams(params)}`);
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
            <Button to="/admin/directory" iconRight={FiArrowRight}>
              {t("directory")}
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
          <EmptyState icon={HiOutlineBuildingOffice2} title={t("noEnterprisesYet")} />
        </Card>
      ) : (
        <>
          {/* ---------- KPIs ---------- */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label={t("totalEnterprises")}
              value={formatNumber(rows.length, 0)}
              hint={t("last7Summary", { n: stats.last7, prev: stats.prev7 })}
              icon={HiOutlineBuildingOffice2}
              accent="from-brand-600 to-brand-800"
            />
            <StatCard
              label={t("totalProducts")}
              value={formatNumber(stats.products, 0)}
              hint={t("distinctProducts", { n: formatNumber(stats.topProducts.length, 0) })}
              icon={HiOutlineCube}
              accent="from-gold-500 to-gold-700"
            />
            <StatCard
              label={t("totalDirectEmployment")}
              value={formatNumber(stats.direct, 0)}
              hint={stats.biharPct !== null ? t("directEmploymentBiharHint", { pct: stats.biharPct }) : t("directEmploymentHint")}
              icon={HiOutlineUsers}
              accent="from-brand-700 to-brand-900"
            />
            <StatCard
              label={t("totalIndirectEmployment")}
              value={formatNumber(stats.indirect, 0)}
              hint={t("indirectEmploymentHint")}
              icon={HiOutlineUserGroup}
              accent="from-brand-800 to-brand-950"
            />
          </div>

          {/* ---------- Coverage strip ---------- */}
          <Card className="mt-5 grid grid-cols-2 divide-y divide-slate-100 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
            {[
              [FiMapPin, t("districtsCovered"), formatNumber(stats.districts.length, 0)],
              [FiLayers, t("blocksCovered"), formatNumber(stats.blocks.length, 0)],
              [FiGrid, t("sectorsCovered"), formatNumber(stats.sectors.length, 0)],
              [FiBriefcase, t("totalProjectCost"), `₹ ${formatNumber(stats.projectCost / 100, 2)} ${t("croreShort")}`],
            ].map(([Icon, label, value]) => (
              <div key={label} className="flex items-center gap-3 px-5 py-4">
                <Icon className="h-4 w-4 shrink-0 text-brand-700" />
                <div className="min-w-0">
                  <p className="truncate text-lg font-bold leading-none text-slate-900">{value}</p>
                  <p className="mt-1 truncate text-xs text-slate-500">{label}</p>
                </div>
              </div>
            ))}
          </Card>

          {/* ---------- Trend + sector ---------- */}
          <div className="mt-5 grid grid-cols-1 items-start gap-5 lg:grid-cols-5">
            <Card className="p-5 sm:p-6 lg:col-span-3">
              <SectionHeading icon={FiTrendingUp} title={t("trend30")} subtitle={t("trend30Sub")} className="mb-6" />
              <TrendColumns days={stats.days} label={t("trend30")} />
            </Card>
            <Card className="p-5 sm:p-6 lg:col-span-2">
              <SectionHeading icon={FiGrid} title={t("sectorWise")} subtitle={t("tapToFilter")} className="mb-5" />
              <BarList items={stats.sectors} total={rows.length} emptyText={t("noData")} onSelect={(i) => goFiltered({ sector: i.sector })} />
            </Card>
          </div>

          {/* ---------- Location + product breakdowns ---------- */}
          <div className="mt-5 grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
            {isState ? (
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
            ) : (
              <Card className="p-5 sm:p-6">
                <SectionHeading
                  icon={FiLayers}
                  title={t("blockWise")}
                  subtitle={t("topNSub", { n: Math.min(TOP_N, stats.blocks.length), total: stats.blocks.length })}
                  className="mb-5"
                />
                <BarList
                  items={stats.blocks.slice(0, TOP_N)}
                  total={rows.length}
                  emptyText={t("noData")}
                  onSelect={(i) => goFiltered({ district: i.district, block: i.block })}
                />
              </Card>
            )}
            <Card className="p-5 sm:p-6">
              <SectionHeading
                icon={FiPackage}
                title={t("topProducts")}
                subtitle={t("topNSub", { n: Math.min(TOP_N, stats.topProducts.length), total: stats.topProducts.length })}
                className="mb-5"
              />
              <BarList
                items={stats.topProducts.slice(0, TOP_N)}
                total={rows.length}
                emptyText={t("noData")}
                unitLabel={t("enterprisesWord")}
                onSelect={(i) => goFiltered({ product: i.label })}
              />
            </Card>
          </div>

          {/* ---------- Recent ---------- */}
          <Card className="mt-5 overflow-hidden">
            <div className="p-5 sm:p-6">
              <SectionHeading
                icon={FiClock}
                title={t("recentRegistrations")}
                action={
                  <Button to="/admin/directory" variant="secondary" size="sm" iconRight={FiArrowRight}>
                    {t("viewAll")}
                  </Button>
                }
              />
            </div>
            <ul className="divide-y divide-slate-100 border-t border-slate-100">
              {rows.slice(0, 6).map((r) => (
                <li key={r.id}>
                  <button
                    onClick={() => navigate(`/admin/enterprises/${r.registrationId}`)}
                    className="flex w-full flex-col gap-1 px-5 py-3.5 text-left transition hover:bg-brand-50/60 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                  >
                    <div className="min-w-0">
                      <p className="font-mono text-[13px] font-semibold text-brand-800">{r.registrationId}</p>
                      <p className="truncate text-sm text-slate-700">
                        {r.unitName} · {blockLabel(r.block)}, {districtLabel(r.district, lang)}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-4 text-xs text-slate-500">
                      <span className="max-w-[16rem] truncate">{r.productNames}</span>
                      <span>{formatDate(r.createdAt)}</span>
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

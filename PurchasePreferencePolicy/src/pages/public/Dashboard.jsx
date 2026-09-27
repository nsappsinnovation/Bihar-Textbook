import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FiPlus, FiEdit2, FiBriefcase, FiPackage, FiUsers, FiUserCheck, FiSmartphone, FiMapPin, FiEdit3, FiImage, FiMap } from "react-icons/fi";
import PublicLayout from "../../components/layout/PublicLayout";
import Card, { SectionHeading, Eyebrow } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import EmptyState from "../../components/ui/EmptyState";
import { PageLoader } from "../../components/ui/Spinner";
import { DetailGrid, PhotoGrid, ProductsTable } from "../../components/enterprise/EnterpriseDetails";
import SlipActions from "../../components/enterprise/SlipActions";
import AddProductModal from "../../components/enterprise/AddProductModal";
import { useT } from "../../i18n/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { blockLabel, districtLabel, sectorLabel } from "../../lib/locations";
import { biharShare, formatDate, formatLakh, formatNumber } from "../../lib/format";
import BoundaryView from "../../components/enterprise/BoundaryView";
import { MAX_PRODUCTS } from "../../lib/validation";

export default function Dashboard() {
  const { t, lang } = useT();
  const { mobile, enterprise: e, enterpriseLoading, refreshEnterprise } = useAuth();
  const location = useLocation();
  const [notice, setNotice] = useState(location.state?.notice || "");
  const [adding, setAdding] = useState(false);

  if (enterpriseLoading && !e) {
    return (
      <PublicLayout>
        <PageLoader label={t("loading")} />
      </PublicLayout>
    );
  }

  const products = e?.productList || [];
  const canAddProduct = products.length < MAX_PRODUCTS;
  const share = e ? biharShare(e) : null;

  return (
    <PublicLayout>
      <div className="animate-fade-up">
        <Eyebrow>{t("myDashboard")}</Eyebrow>
        <h1 className="mt-1.5 font-display text-3xl leading-tight text-brand-900 sm:text-4xl">
          {t("welcome", { name: e?.name || `+91 ${mobile}` })}
        </h1>
        <p className="mt-1 text-sm text-slate-500">{t(e ? "dashboardSub" : "dashboardSubNew")}</p>
      </div>

      {notice && (
        <Alert tone="success" className="mt-5" action={<button onClick={() => setNotice("")} className="shrink-0 text-xs font-semibold underline">{t("dismiss")}</button>}>
          {t(notice)}
        </Alert>
      )}

      {!e ? (
        <Card className="mt-8">
          <EmptyState icon={FiBriefcase} title={t("noEnterpriseYet")}>
            <Button to="/register" variant="success" icon={FiEdit3}>
              {t("registerEnterprise")}
            </Button>
          </EmptyState>
        </Card>
      ) : (
        <>
          {/* ---------- Enterprise summary ---------- */}
          <Card className="relative mt-6 overflow-hidden border-0 bg-gradient-to-br from-brand-700 to-brand-900 p-5 text-white sm:p-7">
            <div aria-hidden className="bg-contours-gold pointer-events-none absolute inset-0 opacity-50" />
            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <p className={`text-xs font-bold text-gold-200 ${lang === "en" ? "uppercase tracking-wider" : ""}`}>{t("registeredUnit")}</p>
                <h2 className="mt-1 font-display text-2xl leading-tight sm:text-3xl">{e.unitName}</h2>
                <p className="mt-1 text-sm text-brand-100">
                  {sectorLabel(e.sector, lang, e.sectorOther)} · {blockLabel(e.block)}, {districtLabel(e.district, lang)}
                </p>
              </div>
              <div className="shrink-0 lg:text-right">
                <p className={`text-xs font-bold text-gold-200 ${lang === "en" ? "uppercase tracking-wider" : ""}`}>{t("registrationId")}</p>
                <p className="mt-1 font-mono text-xl font-extrabold tracking-wide sm:text-2xl">{e.registrationId}</p>
                <p className="mt-0.5 text-xs text-brand-100">{t("registeredOnDate", { date: formatDate(e.createdAt) })}</p>
              </div>
            </div>
            <dl className="relative mt-6 grid grid-cols-2 gap-3 border-t border-white/15 pt-5 sm:grid-cols-4">
              {[
                [FiPackage, t("productsHeading"), formatNumber(products.length, 0)],
                [
                  FiUserCheck,
                  t("directEmployees"),
                  <>
                    {formatNumber(e.directEmployees, 0)}
                    {share !== null && <span className="ml-1.5 text-xs font-medium text-brand-200">{t("pctBihar", { pct: share })}</span>}
                  </>,
                ],
                [FiUsers, t("indirectEmployees"), formatNumber(e.indirectEmployees, 0)],
                [FiBriefcase, t("projectCost"), formatLakh(e.projectCost, t)],
              ].map(([Icon, label, value]) => (
                <div key={label} className="min-w-0">
                  <dt className="flex items-center gap-1.5 truncate text-xs text-brand-100">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-gold-300" />
                    {label}
                  </dt>
                  <dd className="mt-1 truncate text-lg font-bold">{value}</dd>
                </div>
              ))}
            </dl>
          </Card>

          {/* ---------- Actions ---------- */}
          <div className="no-print mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button to="/register" size="lg" icon={FiEdit2}>
              {t("editDetails")}
            </Button>
            {canAddProduct && (
              <Button variant="secondary" size="lg" icon={FiPlus} onClick={() => setAdding(true)}>
                {t("addProduct")}
              </Button>
            )}
          </div>
          <div className="mt-3">
            <SlipActions enterprise={e} viewTo={`/enterprise/${e.registrationId}`} />
          </div>

          {/* ---------- Basic unit details ---------- */}
          <Card className="mt-8 p-5 sm:p-6">
            <SectionHeading
              icon={FiBriefcase}
              title={t("basicUnitDetails")}
              className="mb-5"
              action={
                <Button to="/register?section=unit" variant="secondary" size="sm" icon={FiEdit2} className="no-print">
                  {t("edit")}
                </Button>
              }
            />
            <DetailGrid
              items={[
                { label: t("applicantName"), value: e.name },
                {
                  label: t("mobileNumber"),
                  value: (
                    <span className="inline-flex items-center gap-1.5">
                      <FiSmartphone className="h-3.5 w-3.5 text-slate-400" /> +91 {e.mobile}
                    </span>
                  ),
                },
                { label: t("udyamNo"), value: <span className="font-mono">{e.udyamRegistrationNo}</span> },
                { label: t("district"), value: districtLabel(e.district, lang) },
                { label: t("block"), value: blockLabel(e.block) },
                { label: t("city"), value: e.city },
                {
                  label: t("unitLocation"),
                  wide: true,
                  value: (
                    <span className="inline-flex items-start gap-1.5">
                      <FiMapPin className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-400" /> {e.unitLocation}
                    </span>
                  ),
                },
              ]}
            />
          </Card>

          {/* ---------- Products ---------- */}
          <Card className="mt-5 p-5 sm:p-6">
            <SectionHeading
              icon={FiPackage}
              title={t("productsHeading")}
              subtitle={t("productsCount", { n: products.length })}
              className="mb-5"
              action={
                canAddProduct && (
                  <Button variant="secondary" size="sm" icon={FiPlus} className="no-print" onClick={() => setAdding(true)}>
                    {t("addProduct")}
                  </Button>
                )
              }
            />
            <ProductsTable products={products} />
          </Card>

          {/* ---------- GIS boundary (optional) ---------- */}
          <Card className="mt-5 p-5 sm:p-6">
            <SectionHeading
              icon={FiMap}
              title={t("gisBoundary")}
              subtitle={t("optional")}
              className="mb-5"
              action={
                <Button to="/register?section=photos" variant="secondary" size="sm" icon={e.boundary?.length ? FiEdit2 : FiPlus} className="no-print">
                  {t(e.boundary?.length ? "updateBoundary" : "addBoundary")}
                </Button>
              }
            />
            <BoundaryView points={e.boundary || []} />
          </Card>

          {/* ---------- Unit photos (optional) ---------- */}
          <Card className="mt-5 p-5 sm:p-6">
            <SectionHeading
              icon={FiImage}
              title={t("unitPhotos")}
              subtitle={t("optional")}
              className="mb-5"
              action={
                <Button to="/register?section=photos" variant="secondary" size="sm" icon={e.photos?.length ? FiEdit2 : FiPlus} className="no-print">
                  {t(e.photos?.length ? "managePhotos" : "addPhotos")}
                </Button>
              }
            />
            <PhotoGrid photos={e.photos || []} />
          </Card>

          <AddProductModal
            open={adding}
            onClose={() => setAdding(false)}
            enterprise={e}
            onAdded={async () => {
              await refreshEnterprise();
              setNotice("productAdded");
            }}
          />
        </>
      )}
    </PublicLayout>
  );
}

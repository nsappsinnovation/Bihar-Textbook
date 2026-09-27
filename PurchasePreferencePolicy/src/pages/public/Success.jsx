import { useParams } from "react-router-dom";
import { FiCheck, FiGrid } from "react-icons/fi";
import PublicLayout from "../../components/layout/PublicLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { PageLoader } from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import { DetailGrid } from "../../components/enterprise/EnterpriseDetails";
import SlipActions from "../../components/enterprise/SlipActions";
import { useT } from "../../i18n/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { useEnterprise } from "../../lib/useEnterprise";
import { blockLabel, districtLabel, sectorLabel } from "../../lib/locations";
import { formatDateTime } from "../../lib/format";

export default function Success() {
  const { id } = useParams();
  const { t, lang } = useT();
  const { uid } = useAuth();
  const { loading, enterprise: e, error } = useEnterprise(id, uid);

  if (loading) {
    return (
      <PublicLayout width="max-w-3xl">
        <PageLoader label={t("loading")} />
      </PublicLayout>
    );
  }

  if (!e) {
    return (
      <PublicLayout width="max-w-3xl">
        <Card>
          <EmptyState title={t(error ? "errLoad" : "notFound")}>
            <Button to="/dashboard" variant="secondary">
              {t("myDashboard")}
            </Button>
          </EmptyState>
        </Card>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout width="max-w-3xl">
      <div className="no-print space-y-6">
        <div className="flex flex-col items-center text-center animate-fade-up">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-100 ring-8 ring-gold-100">
            <FiCheck className="h-10 w-10 text-brand-700" strokeWidth={3} />
          </div>
          <h1 className="mt-5 font-display text-3xl leading-tight text-brand-900 sm:text-4xl">{t("successTitle")}</h1>
          <p className="mt-2 text-sm text-slate-500">{t("successSub")}</p>
        </div>

        <Card className="overflow-hidden">
          <div className="relative overflow-hidden bg-gradient-to-br from-brand-700 to-brand-900 px-6 py-5 text-center text-white">
            <div aria-hidden className="bg-contours-gold pointer-events-none absolute inset-0 opacity-50" />
            <p className={`relative text-xs font-bold text-gold-200 ${lang === "en" ? "uppercase tracking-wider" : ""}`}>{t("registrationId")}</p>
            <p className="relative mt-1 break-all font-mono text-2xl font-extrabold tracking-wide sm:text-3xl">{e.registrationId}</p>
          </div>
          <div className="p-5 sm:p-7">
            <DetailGrid
              items={[
                { label: t("unitName"), value: e.unitName },
                { label: t("applicantName"), value: e.name },
                { label: t("mobileNumber"), value: `+91 ${e.mobile}` },
                { label: t("sector"), value: sectorLabel(e.sector, lang, e.sectorOther) },
                { label: t("district"), value: districtLabel(e.district, lang) },
                { label: t("block"), value: blockLabel(e.block) },
                { label: t("productsHeading"), value: e.productNames, wide: true },
                { label: t("udyamNo"), value: <span className="font-mono">{e.udyamRegistrationNo}</span> },
                { label: t("registeredOn"), value: formatDateTime(e.createdAt) },
              ]}
            />
          </div>
        </Card>

        <SlipActions enterprise={e} viewTo={`/enterprise/${e.registrationId}`} />

        <Alert tone="warning" title={t("disclaimer")}>
          {t("disclaimerText")}
        </Alert>

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
          <Button to="/dashboard" variant="success" icon={FiGrid}>
            {t("goToDashboard")}
          </Button>
        </div>
      </div>
    </PublicLayout>
  );
}

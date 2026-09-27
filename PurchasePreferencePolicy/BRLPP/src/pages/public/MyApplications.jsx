import { useCallback, useEffect, useState } from "react";
import { FiPlus, FiFileText, FiUser, FiEye, FiSmartphone, FiMapPin, FiEdit2, FiCreditCard } from "react-icons/fi";
import PublicLayout from "../../components/layout/PublicLayout";
import Card, { SectionHeading, Eyebrow } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import EmptyState from "../../components/ui/EmptyState";
import { PageLoader } from "../../components/ui/Spinner";
import { useT } from "../../i18n/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { listApplicantApplications } from "../../lib/applicationsApi";
import { anchalLabel, districtLabel, maujaLabel } from "../../lib/locations";
import { formatDate, maskAadhaar } from "../../lib/format";
import { formatTotalArea } from "../../lib/plots";

export default function MyApplications() {
  const { t, lang } = useT();
  const { mobile, profile, profileLoading } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      setRows(await listApplicantApplications(mobile));
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [mobile]);

  useEffect(() => {
    load();
  }, [load]);

  const columns = [
    t("applicationId"),
    t("district"),
    t("anchalShort"),
    t("mauja"),
    t("khataNo"),
    t("khesraShort"),
    t("area"),
    t("submissionDate"),
    t("action"),
  ];

  return (
    <PublicLayout>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="animate-fade-up">
          <Eyebrow>{t("myApplications")}</Eyebrow>
          <h1 className="mt-1.5 font-display text-3xl leading-tight text-brand-900 sm:text-4xl">
            {t("welcome", { name: profile?.name || (profileLoading ? "…" : `+91 ${mobile}`) })}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{t("myApplicationsSub")}</p>
        </div>
        <Button to="/apply" variant="success" size="lg" icon={FiPlus} className="w-full sm:w-auto">
          {t("addNewLand")}
        </Button>
      </div>

      {profile && (
        <Card className="mt-6 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
              <FiUser className="h-5 w-5" />
            </div>
            <div className="min-w-0 text-sm">
              <p className="font-bold text-slate-900">{profile.name}</p>
              <p className="text-slate-500">
                {t("fatherHusbandName")}: {profile.fatherHusbandName}
              </p>
              <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <FiSmartphone className="h-3.5 w-3.5" /> +91 {mobile}
                </span>
                {profile.aadhaar && (
                  <span className="inline-flex items-center gap-1.5">
                    <FiCreditCard className="h-3.5 w-3.5" /> {maskAadhaar(profile.aadhaar)}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <FiMapPin className="h-3.5 w-3.5" /> {profile.address}
                </span>
              </p>
            </div>
          </div>
          <Button to="/apply?edit=profile" variant="secondary" size="sm" icon={FiEdit2} className="self-start sm:self-center">
            {t("editProfile")}
          </Button>
        </Card>
      )}

      <div className="mt-8">
        <SectionHeading
          icon={FiFileText}
          title={t("myApplications")}
          action={
            !loading && (
              <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                {t("totalSubmitted", { n: rows.length })}
              </span>
            )
          }
          className="mb-4"
        />

        {loading ? (
          <PageLoader label={t("loading")} />
        ) : error ? (
          <Alert
            tone="error"
            action={
              <button onClick={load} className="shrink-0 text-xs font-semibold underline">
                {t("retry")}
              </button>
            }
          >
            {t("errLoad")}
          </Alert>
        ) : rows.length === 0 ? (
          <Card>
            <EmptyState icon={FiFileText} title={t("noApplications")}>
              <Button to="/apply" icon={FiPlus}>
                {t("addNewLand")}
              </Button>
            </EmptyState>
          </Card>
        ) : (
          <>
            {/* Desktop table */}
            <Card className="hidden overflow-hidden md:block">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {columns.map((c, i) => (
                        <th key={c} className={`whitespace-nowrap px-4 py-3.5 ${i === columns.length - 1 ? "text-right" : ""}`}>
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rows.map((r) => (
                      <tr key={r.id} className="transition hover:bg-slate-50/70">
                        <td className="whitespace-nowrap px-4 py-3.5 font-mono text-[13px] font-semibold text-brand-800">{r.applicationId}</td>
                        <td className="px-4 py-3.5 text-slate-700">{districtLabel(r.district, lang)}</td>
                        <td className="px-4 py-3.5 text-slate-600">{anchalLabel(r.district, r.anchal, lang)}</td>
                        <td className="px-4 py-3.5 text-slate-600">{maujaLabel(r.district, r.anchal, r.mauja, lang)}</td>
                        <td className="px-4 py-3.5 text-slate-600">{r.khataNo}</td>
                        <td className="px-4 py-3.5 text-slate-600">{r.khesraNo}</td>
                        <td className="whitespace-nowrap px-4 py-3.5 text-slate-600">{formatTotalArea(r, lang, t)}</td>
                        <td className="whitespace-nowrap px-4 py-3.5 text-slate-600">{formatDate(r.submittedAt)}</td>
                        <td className="px-4 py-3.5 text-right">
                          <Button to={`/application/${r.applicationId}`} variant="secondary" size="sm" icon={FiEye}>
                            {t("viewApplication")}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Mobile cards */}
            <div className="space-y-3 md:hidden">
              {rows.map((r) => (
                <Card key={r.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-mono text-sm font-bold text-brand-800">{r.applicationId}</p>
                    <span className="shrink-0 text-xs text-slate-400">{formatDate(r.submittedAt)}</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-800">
                    {maujaLabel(r.district, r.anchal, r.mauja, lang)}, {anchalLabel(r.district, r.anchal, lang)}, {districtLabel(r.district, lang)}
                  </p>
                  <dl className="mt-2 grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <dt className="text-slate-400">{t("khataNo")}</dt>
                      <dd className="font-semibold text-slate-700">{r.khataNo}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400">{t("khesraShort")}</dt>
                      <dd className="font-semibold text-slate-700">{r.khesraNo}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400">{t("area")}</dt>
                      <dd className="font-semibold text-slate-700">{formatTotalArea(r, lang, t)}</dd>
                    </div>
                  </dl>
                  <Button to={`/application/${r.applicationId}`} variant="secondary" icon={FiEye} className="mt-4 w-full">
                    {t("viewApplication")}
                  </Button>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </PublicLayout>
  );
}

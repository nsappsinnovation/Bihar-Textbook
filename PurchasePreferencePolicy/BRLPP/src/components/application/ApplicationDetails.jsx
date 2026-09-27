import { useState } from "react";
import { FiUser, FiMap, FiCompass, FiMapPin, FiImage, FiExternalLink, FiEdit2, FiLayers, FiCheckSquare } from "react-icons/fi";
import Card, { SectionHeading } from "../ui/Card";
import Modal from "../ui/Modal";
import { useT } from "../../i18n/LanguageContext";
import { anchalLabel, districtLabel, landTypeLabel, maujaLabel } from "../../lib/locations";
import { formatArea } from "../../lib/area";
import { getPlots, joinLandTypes, totalAcres } from "../../lib/plots";
import { formatDateTime, formatNumber, groupAadhaar, locationUrl, maskAadhaar } from "../../lib/format";

export function DetailGrid({ items }) {
  const { t } = useT();
  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ label, value, wide }) => (
        <div key={label} className={wide ? "sm:col-span-2 lg:col-span-3" : ""}>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</dt>
          <dd className="mt-1 break-words text-[15px] font-semibold text-slate-800">
            {value === "" || value === null || value === undefined ? (
              <span className="font-normal text-slate-400">{t("notProvided")}</span>
            ) : (
              value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Section({ icon, title, onEdit, children }) {
  const { t } = useT();
  return (
    <Card className="p-5 sm:p-6">
      <SectionHeading
        icon={icon}
        title={title}
        className="mb-5"
        action={
          onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="no-print inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-800"
            >
              <FiEdit2 className="h-3.5 w-3.5" />
              {t("edit")}
            </button>
          )
        }
      />
      {children}
    </Card>
  );
}

/**
 * Read-only view of a land application. Used by the wizard preview, the
 * applicant's view page and the admin view page.
 */
// Khata | Khesra | Area | Jamabandi for each plot, with the total.
export function PlotsTable({ plots }) {
  const { t, lang } = useT();
  const withArea = plots.filter((p) => Number(p.area) > 0);
  return (
    <div className="overflow-hidden rounded-xl ring-1 ring-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="px-3 py-2.5">#</th>
              <th className="px-3 py-2.5">{t("khataNo")}</th>
              <th className="px-3 py-2.5">{t("khesraNo")}</th>
              <th className="px-3 py-2.5">{t("area")}</th>
              <th className="px-3 py-2.5">{t("landType")}</th>
              <th className="px-3 py-2.5">{t("jamabandiNo")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {plots.map((p, i) => (
              <tr key={p.id || i}>
                <td className="px-3 py-2.5 text-slate-400">{i + 1}</td>
                <td className="px-3 py-2.5 font-semibold text-slate-800">{p.khataNo || "—"}</td>
                <td className="px-3 py-2.5 font-semibold text-slate-800">{p.khesraNo || "—"}</td>
                <td className="whitespace-nowrap px-3 py-2.5 text-slate-700">{formatArea(p.area, p.areaUnit, lang)}</td>
                <td className="px-3 py-2.5 text-slate-700">{landTypeLabel(p.landType, lang)}</td>
                <td className="px-3 py-2.5 text-slate-600">{p.jamabandiNo || "—"}</td>
              </tr>
            ))}
          </tbody>
          {plots.length > 1 && (
            <tfoot>
              <tr className="bg-gold-50/60 font-semibold text-gold-900">
                <td className="px-3 py-2.5" colSpan={3}>
                  {t("totalAreaLabel")}
                </td>
                <td className="whitespace-nowrap px-3 py-2.5" colSpan={3}>
                  ≈ {formatNumber(totalAcres(withArea), 2)} {t("acresApprox")}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}

export default function ApplicationDetails({ app, onEdit, showMeta = true, showAadhaar = false }) {
  const { t, lang } = useT();
  const [lightbox, setLightbox] = useState(null);
  const mapUrl = locationUrl(app);
  const photos = app.photos || [];
  const plots = getPlots(app);

  return (
    <div className="space-y-5">
      {showMeta && app.applicationId && (
        <Card className="flex flex-col gap-4 border-0 bg-gradient-to-br from-brand-700 to-brand-900 p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className={`text-xs font-bold text-gold-200 ${lang === "en" ? "uppercase tracking-wider" : ""}`}>{t("applicationId")}</p>
            <p className="mt-1 font-mono text-xl font-extrabold tracking-wide sm:text-2xl">{app.applicationId}</p>
          </div>
          <div className="sm:text-right">
            <p className={`text-xs font-bold text-gold-200 ${lang === "en" ? "uppercase tracking-wider" : ""}`}>{t("submissionDate")}</p>
            <p className="mt-1 text-base font-semibold">{formatDateTime(app.submittedAt)}</p>
          </div>
        </Card>
      )}

      <Section icon={FiUser} title={t("personalDetails")} onEdit={onEdit && (() => onEdit("applicant"))}>
        <DetailGrid
          items={[
            { label: t("applicantName"), value: app.applicant?.name },
            { label: t("fatherHusbandName"), value: app.applicant?.fatherHusbandName },
            {
              label: t("aadhaar"),
              value: app.applicant?.aadhaar
                ? showAadhaar
                  ? groupAadhaar(app.applicant.aadhaar)
                  : maskAadhaar(app.applicant.aadhaar)
                : "",
            },
            { label: t("mobileNumber"), value: app.mobile ? `+91 ${app.mobile}` : "" },
            { label: t("email"), value: app.applicant?.email },
            { label: t("address"), value: app.applicant?.address, wide: true },
          ]}
        />
      </Section>

      <Section icon={FiMap} title={t("landDetails")} onEdit={onEdit && (() => onEdit("site"))}>
        <DetailGrid
          items={[
            { label: t("district"), value: districtLabel(app.district, lang) },
            { label: t("anchal"), value: anchalLabel(app.district, app.anchal, lang) },
            {
              label: t("mauja"),
              value: (
                <>
                  {maujaLabel(app.district, app.anchal, app.mauja, lang)}
                  {app.maujaOther && (
                    <span className="ml-2 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700 ring-1 ring-amber-100">
                      {t("maujaNotInList")}
                    </span>
                  )}
                </>
              ),
            },
            { label: t("thanaNo"), value: app.thanaNo },
            { label: t("landType"), value: landTypeLabel(app.landType || joinLandTypes(plots), lang) },
          ]}
        />
      </Section>

      <Section icon={FiLayers} title={t("plotsHeading")} onEdit={onEdit && (() => onEdit("plots"))}>
        <PlotsTable plots={plots} />
      </Section>

      <Section icon={FiCompass} title={t("chauhaddiDetails")} onEdit={onEdit && (() => onEdit("boundary"))}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {["north", "south", "east", "west"].map((side) => (
            <div key={side} className="rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-100">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{t(side)}</p>
              <p className="mt-1 break-words text-[15px] font-semibold text-slate-800">{app.chauhaddi?.[side] || "—"}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section icon={FiMapPin} title={t("locationDetails")} onEdit={onEdit && (() => onEdit("gps"))}>
        <DetailGrid
          items={[
            { label: t("latitude"), value: app.latitude ?? "" },
            { label: t("longitude"), value: app.longitude ?? "" },
            {
              label: t("mapLink"),
              wide: true,
              value: app.mapLink ? (
                <a href={app.mapLink} target="_blank" rel="noreferrer" className="break-all font-medium text-brand-700 hover:underline">
                  {app.mapLink}
                </a>
              ) : (
                ""
              ),
            },
          ]}
        />
        {mapUrl && (
          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            className="no-print mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-800"
          >
            <FiExternalLink className="h-4 w-4" />
            {t("openOnMap")}
          </a>
        )}
      </Section>

      <Section icon={FiImage} title={t("photosSection")} onEdit={onEdit && (() => onEdit("gps"))}>
        {photos.length === 0 ? (
          <p className="text-sm text-slate-400">{t("noPhotos")}</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {photos.map((p, i) => (
              <button
                key={p.url || i}
                type="button"
                onClick={() => setLightbox(p.url)}
                className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200"
              >
                <img src={p.url} alt={`${t("photosSection")} ${i + 1}`} className="h-full w-full object-cover transition group-hover:scale-105" />
              </button>
            ))}
          </div>
        )}
      </Section>

      {app.declarations && (
        <Section icon={FiCheckSquare} title={t("declarationsTitle")}>
          <ul className="space-y-2.5">
            {[
              ["truthful", "declaration"],
              ["noTitleSuit", "declarationNoTitleSuit"],
            ]
              .filter(([k]) => app.declarations[k])
              .map(([k, key]) => (
                <li key={k} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-slate-700">
                  <FiCheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                  {t(key)}
                </li>
              ))}
          </ul>
        </Section>
      )}

      <Modal open={!!lightbox} onClose={() => setLightbox(null)} size="max-w-4xl">
        {lightbox && <img src={lightbox} alt="" className="max-h-[75vh] w-full rounded-xl object-contain" />}
      </Modal>
    </div>
  );
}

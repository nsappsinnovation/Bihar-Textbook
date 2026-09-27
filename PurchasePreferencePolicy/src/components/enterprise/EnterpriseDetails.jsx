import { useState } from "react";
import { FiUser, FiBriefcase, FiPackage, FiUsers, FiEdit2, FiImage, FiMap } from "react-icons/fi";
import Card, { SectionHeading } from "../ui/Card";
import Modal from "../ui/Modal";
import BoundaryView from "./BoundaryView";
import { useT } from "../../i18n/LanguageContext";
import { blockLabel, districtLabel, sectorLabel } from "../../lib/locations";
import { biharShare, formatCapacity, formatDateTime, formatLakh, formatNumber } from "../../lib/format";

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

function Section({ icon, title, onEdit, action, children }) {
  const { t } = useT();
  return (
    <Card className="p-5 sm:p-6">
      <SectionHeading
        icon={icon}
        title={title}
        className="mb-5"
        action={
          action ||
          (onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="no-print inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-800"
            >
              <FiEdit2 className="h-3.5 w-3.5" />
              {t("edit")}
            </button>
          ))
        }
      />
      {children}
    </Card>
  );
}

// # | Product | Production capacity (per annum)
export function ProductsTable({ products }) {
  const { t, lang } = useT();
  return (
    <div className="overflow-hidden rounded-xl ring-1 ring-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="px-3 py-2.5">#</th>
              <th className="px-3 py-2.5">{t("productName")}</th>
              <th className="px-3 py-2.5">{t("productionCapacity")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p, i) => (
              <tr key={p.id || i}>
                <td className="px-3 py-2.5 text-slate-400">{i + 1}</td>
                <td className="px-3 py-2.5 font-semibold text-slate-800">{p.productName || "—"}</td>
                <td className="whitespace-nowrap px-3 py-2.5 text-slate-700">{formatCapacity(p, lang) || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// "38 · 84% of direct employees" – the share is shown subtly next to the count.
export function BiharCount({ enterprise: e }) {
  const { t } = useT();
  if (e.directEmployeesBihar === "" || e.directEmployeesBihar == null) return "";
  const pct = biharShare(e);
  return (
    <>
      {formatNumber(e.directEmployeesBihar, 0)}
      {pct !== null && <span className="ml-1.5 text-xs font-medium text-slate-400">{t("pctOfDirect", { pct })}</span>}
    </>
  );
}

// Thumbnail grid; tapping a photo opens it full size.
export function PhotoGrid({ photos }) {
  const { t } = useT();
  const [lightbox, setLightbox] = useState(null);
  if (!photos.length) return <p className="text-sm text-slate-400">{t("noPhotos")}</p>;
  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {photos.map((p, i) => (
          <button
            key={p.url || i}
            type="button"
            onClick={() => setLightbox(p.url)}
            className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200"
          >
            <img src={p.url} alt={`${t("unitPhotos")} ${i + 1}`} className="h-full w-full object-cover transition group-hover:scale-105" />
          </button>
        ))}
      </div>
      <Modal open={!!lightbox} onClose={() => setLightbox(null)} size="max-w-4xl">
        {lightbox && <img src={lightbox} alt="" className="max-h-[75vh] w-full rounded-xl object-contain" />}
      </Modal>
    </>
  );
}

/**
 * Read-only view of an enterprise registration. Used by the wizard preview, the
 * applicant's view page and the admin view page. `onEdit(sectionId)` shows edit links.
 */
export default function EnterpriseDetails({ enterprise: e, onEdit, showMeta = true, productsAction, geoJsonName }) {
  const { t, lang } = useT();
  const products = e.products?.length ? e.products : e.productList || [];

  return (
    <div className="space-y-5">
      {showMeta && e.registrationId && (
        <Card className="flex flex-col gap-4 border-0 bg-gradient-to-br from-brand-700 to-brand-900 p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className={`text-xs font-bold text-gold-200 ${lang === "en" ? "uppercase tracking-wider" : ""}`}>{t("registrationId")}</p>
            <p className="mt-1 font-mono text-xl font-extrabold tracking-wide sm:text-2xl">{e.registrationId}</p>
          </div>
          <div className="sm:text-right">
            <p className={`text-xs font-bold text-gold-200 ${lang === "en" ? "uppercase tracking-wider" : ""}`}>{t("registeredOn")}</p>
            <p className="mt-1 text-base font-semibold">{formatDateTime(e.createdAt)}</p>
            {e.updatedAt && formatDateTime(e.updatedAt) !== formatDateTime(e.createdAt) && (
              <p className="mt-0.5 text-xs text-brand-100">{t("lastUpdated", { date: formatDateTime(e.updatedAt) })}</p>
            )}
          </div>
        </Card>
      )}

      <Section icon={FiUser} title={t("contactDetails")} onEdit={onEdit && (() => onEdit("contact"))}>
        <DetailGrid
          items={[
            { label: t("applicantName"), value: e.name },
            { label: t("mobileNumber"), value: e.mobile ? `+91 ${e.mobile}` : "" },
            { label: t("email"), value: e.email },
            { label: t("address"), value: e.address, wide: true },
          ]}
        />
      </Section>

      <Section icon={FiBriefcase} title={t("unitDetails")} onEdit={onEdit && (() => onEdit("unit"))}>
        <DetailGrid
          items={[
            { label: t("unitName"), value: e.unitName },
            { label: t("sector"), value: e.sector ? sectorLabel(e.sector, lang, e.sectorOther) : "" },
            { label: t("district"), value: e.district ? districtLabel(e.district, lang) : "" },
            {
              label: t("block"),
              value: e.block ? (
                <>
                  {blockLabel(e.block)}
                  {e.blockOther && (
                    <span className="ml-2 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700 ring-1 ring-amber-100">
                      {t("notInList")}
                    </span>
                  )}
                </>
              ) : (
                ""
              ),
            },
            { label: t("city"), value: e.city },
            { label: t("unitLocation"), value: e.unitLocation, wide: true },
          ]}
        />
      </Section>

      <Section icon={FiPackage} title={t("productsHeading")} onEdit={onEdit && (() => onEdit("products"))} action={productsAction}>
        {products.length ? <ProductsTable products={products} /> : <p className="text-sm text-slate-400">{t("noProducts")}</p>}
      </Section>

      <Section icon={FiUsers} title={t("employmentDetails")} onEdit={onEdit && (() => onEdit("employment"))}>
        <DetailGrid
          items={[
            { label: t("projectCost"), value: formatLakh(e.projectCost, t) },
            { label: t("directEmployees"), value: e.directEmployees === "" || e.directEmployees == null ? "" : formatNumber(e.directEmployees, 0) },
            { label: t("directEmployeesBihar"), value: <BiharCount enterprise={e} /> },
            { label: t("indirectEmployees"), value: e.indirectEmployees === "" || e.indirectEmployees == null ? "" : formatNumber(e.indirectEmployees, 0) },
            { label: t("udyamNo"), value: e.udyamRegistrationNo ? <span className="font-mono">{e.udyamRegistrationNo}</span> : "" },
          ]}
        />
      </Section>

      <Section icon={FiMap} title={t("gisBoundary")} onEdit={onEdit && (() => onEdit("photos"))}>
        <BoundaryView points={e.boundary || []} downloadName={geoJsonName} />
      </Section>

      <Section icon={FiImage} title={t("unitPhotos")} onEdit={onEdit && (() => onEdit("photos"))}>
        <PhotoGrid photos={e.photos || []} />
      </Section>
    </div>
  );
}

import { FiPlus, FiTrash2 } from "react-icons/fi";
import { Input, Select } from "../ui/Field";
import { useT } from "../../i18n/LanguageContext";
import { CAPACITY_UNITS, CAPACITY_UNIT_OTHER } from "../../data/capacityUnits";
import { newProduct } from "../../lib/enterprisesApi";
import { MAX_PRODUCTS } from "../../lib/validation";

/**
 * Repeatable product rows: Product Name, then Production Capacity (per annum) +
 * Capacity Unit. "Other" unit reveals a text field. Errors are keyed
 * "products.<index>.<field>". Pass `fixed` to edit a single row with no add/remove.
 */
export default function ProductRows({ products, onChange, errors = {}, fixed = false }) {
  const { t, lang } = useT();
  const unitOptions = CAPACITY_UNITS.map((u) => ({ value: u.value, label: u[lang] }));

  const update = (index, field, value) => onChange(products.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  // New rows start with the previous row's unit (editable).
  const add = () => onChange([...products, newProduct(products.at(-1)?.capacityUnit || "")]);
  const remove = (index) => onChange(products.filter((_, i) => i !== index));
  const err = (i, f) => errors[`products.${i}.${f}`];

  return (
    <div className="space-y-4">
      {products.map((product, i) => (
        <div
          key={product.id}
          className={`rounded-2xl border bg-slate-50/60 p-4 sm:p-5 ${
            Object.keys(errors).some((k) => k.startsWith(`products.${i}.`)) ? "border-red-200" : "border-slate-200"
          }`}
        >
          {!fixed && (
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-800">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-700 text-xs text-white">{i + 1}</span>
                {t("productN", { n: i + 1 })}
              </span>
              {products.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                >
                  <FiTrash2 className="h-3.5 w-3.5" />
                  {t("remove")}
                </button>
              )}
            </div>
          )}

          <Input
            name={`products.${i}.productName`}
            label={t("productName")}
            required
            maxLength={120}
            placeholder={t("productNamePlaceholder")}
            value={product.productName}
            onChange={(e) => update(i, "productName", e.target.value)}
            error={err(i, "productName")}
          />

          <div className="mt-3 grid grid-cols-1 gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4">
            <Input
              name={`products.${i}.productionCapacity`}
              label={t("productionCapacity")}
              required
              inputMode="decimal"
              placeholder="0"
              hint={t("capacityHint")}
              value={product.productionCapacity}
              onChange={(e) => update(i, "productionCapacity", e.target.value.replace(/[^\d.]/g, ""))}
              error={err(i, "productionCapacity")}
            />
            <Select
              name={`products.${i}.capacityUnit`}
              label={t("capacityUnit")}
              required
              placeholder={t("select")}
              options={unitOptions}
              value={product.capacityUnit}
              onChange={(e) => update(i, "capacityUnit", e.target.value)}
              error={err(i, "capacityUnit")}
            />
            {product.capacityUnit === CAPACITY_UNIT_OTHER && (
              <Input
                name={`products.${i}.capacityUnitOther`}
                label={t("capacityUnitOther")}
                required
                className="sm:col-span-2"
                maxLength={40}
                value={product.capacityUnitOther}
                onChange={(e) => update(i, "capacityUnitOther", e.target.value)}
                error={err(i, "capacityUnitOther")}
              />
            )}
          </div>
        </div>
      ))}

      {!fixed && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {products.length < MAX_PRODUCTS ? (
            <button
              type="button"
              onClick={add}
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brand-200 px-4 py-3 text-sm font-semibold text-brand-800 transition hover:border-brand-400 hover:bg-brand-50"
            >
              <FiPlus className="h-4 w-4" />
              {t("addProduct")}
            </button>
          ) : (
            <p className="text-xs text-slate-500">{t("maxProductsReached", { n: MAX_PRODUCTS })}</p>
          )}
          <p className="rounded-xl bg-gold-50 px-4 py-2.5 text-sm font-semibold text-gold-800 ring-1 ring-gold-200">
            {t("productsCount", { n: products.length })}
          </p>
        </div>
      )}
    </div>
  );
}

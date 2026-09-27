import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Alert from "../ui/Alert";
import ProductRows from "./ProductRows";
import { useT } from "../../i18n/LanguageContext";
import { addProduct, newProduct } from "../../lib/enterprisesApi";
import { validateProducts } from "../../lib/validation";

const ERROR_KEYS = { "pp/too-many-products": "errTooManyProducts" };

// Adds one product to an existing enterprise (products subcollection + summary).
export default function AddProductModal({ open, onClose, enterprise, onAdded }) {
  const { t } = useT();
  const [rows, setRows] = useState(() => [newProduct()]);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const close = () => {
    setRows([newProduct()]);
    setErrors({});
    setFormError("");
    onClose();
  };

  const save = async () => {
    // Validate against the existing products too, so duplicate names are caught.
    const existing = (enterprise.productList || []).map((p) => ({ ...p, capacityUnitOther: "" }));
    const all = validateProducts([...existing, ...rows]);
    const offset = existing.length;
    const errs = Object.fromEntries(
      Object.entries(all)
        .filter(([k]) => k.startsWith(`products.${offset}.`))
        .map(([k, v]) => [k.replace(`products.${offset}.`, "products.0."), v])
    );
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    setFormError("");
    try {
      await addProduct(enterprise.registrationId, rows[0]);
      await onAdded?.();
      close();
    } catch (err) {
      console.error(err);
      setFormError(ERROR_KEYS[err?.code] || "errGeneric");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title={t("addProduct")}
      subtitle={enterprise?.unitName}
      size="max-w-xl"
      footer={
        <>
          <Button variant="secondary" onClick={close}>
            {t("cancel")}
          </Button>
          <Button icon={FiPlus} loading={saving} onClick={save}>
            {t("save")}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <ProductRows
          products={rows}
          onChange={(r) => {
            setRows(r);
            setErrors({});
          }}
          errors={errors}
          fixed
        />
        {formError && <Alert tone="error">{t(formError)}</Alert>}
      </div>
    </Modal>
  );
}

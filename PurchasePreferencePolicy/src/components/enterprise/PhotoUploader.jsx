import { useRef, useState } from "react";
import { FiCamera, FiTrash2 } from "react-icons/fi";
import Alert from "../ui/Alert";
import { useT } from "../../i18n/LanguageContext";
import { MAX_PHOTOS, MAX_PHOTO_BYTES } from "../../lib/validation";

// value: [{ url, path?, name?, file? }]. Saved photos have a Storage path; new ones carry
// the picked `file` and an object URL for preview until they are uploaded on submit.
export default function PhotoUploader({ value = [], onChange }) {
  const { t } = useT();
  const inputRef = useRef(null);
  const [error, setError] = useState("");

  const addFiles = (fileList) => {
    setError("");
    const accepted = [];
    for (const file of Array.from(fileList || [])) {
      if (!file.type.startsWith("image/")) {
        setError(t("errPhotoType"));
        continue;
      }
      if (file.size > MAX_PHOTO_BYTES) {
        setError(t("errPhotoSize"));
        continue;
      }
      accepted.push({ file, url: URL.createObjectURL(file), name: file.name });
    }
    const room = MAX_PHOTOS - value.length;
    if (accepted.length > room) {
      setError(t("errPhotoCount", { n: MAX_PHOTOS }));
      accepted.splice(room).forEach((p) => URL.revokeObjectURL(p.url));
    }
    if (accepted.length) onChange([...value, ...accepted]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const remove = (index) => {
    if (value[index].file) URL.revokeObjectURL(value[index].url);
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {value.map((p, i) => (
          <div key={p.url} className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200">
            <img src={p.url} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => remove(i)}
              aria-label={t("remove")}
              className="absolute right-2 top-2 rounded-lg bg-white/95 p-1.5 text-red-600 shadow-sm transition hover:bg-red-50"
            >
              <FiTrash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        {value.length < MAX_PHOTOS && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-white p-3 text-center text-xs font-semibold text-slate-500 transition hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
          >
            <FiCamera className="h-7 w-7" />
            {value.length === 0 ? t("takePhoto") : t("addPhotos")}
          </button>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={(e) => addFiles(e.target.files)} />
      <p className="text-xs text-slate-400">{t("photosHint", { n: MAX_PHOTOS })}</p>
      {error && <Alert tone="error">{error}</Alert>}
    </div>
  );
}

import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

const MAX_DIMENSION = 1600;

const loadImage = (file) =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };
    img.src = url;
  });

// Downscale to MAX_DIMENSION and re-encode as JPEG to keep uploads small on mobile data.
export async function compressImage(file, quality = 0.8) {
  try {
    const img = await loadImage(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
    return blob || file;
  } catch {
    return file;
  }
}

// Unit photos live at PurchasePolicy/unit-photos/<uid>/… (see storage.rules).
export async function uploadUnitPhotos(uid, files) {
  const batch = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  const uploaded = [];
  for (const [index, file] of files.entries()) {
    const blob = await compressImage(file);
    const path = `PurchasePolicy/unit-photos/${uid}/${batch}-${index + 1}.jpg`;
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, blob, { contentType: "image/jpeg" });
    uploaded.push({ url: await getDownloadURL(fileRef), path, name: file.name || `photo-${index + 1}.jpg` });
  }
  return uploaded;
}

// Best effort: a photo that fails to delete only leaves an unreferenced file behind.
// Never throws, so cleanup can't turn a successful save into an error.
export const deletePhotos = (paths) =>
  Promise.allSettled(paths.filter(Boolean).map(async (path) => deleteObject(ref(storage, path))));

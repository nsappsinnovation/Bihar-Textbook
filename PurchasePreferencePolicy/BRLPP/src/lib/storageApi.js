import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
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

export async function uploadLandPhotos(mobile, batchId, files) {
  const uploaded = [];
  for (const [index, file] of files.entries()) {
    const blob = await compressImage(file);
    const path = `land-photos/${mobile}/${batchId}/${index + 1}-${Date.now()}.jpg`;
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, blob, { contentType: "image/jpeg" });
    uploaded.push({ url: await getDownloadURL(fileRef), path, name: file.name || `photo-${index + 1}.jpg` });
  }
  return uploaded;
}

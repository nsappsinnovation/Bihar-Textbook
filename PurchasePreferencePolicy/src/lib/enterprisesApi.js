import { doc, getDoc, getDocs, runTransaction, serverTimestamp } from "firebase/firestore";
import { db, ppCol, ppDoc } from "./firebase";
import { reserveIds } from "./idGenerator";
import { isoDate, normalizeUdyam, toDate } from "./format";
import { SECTOR_OTHERS } from "../data/sectors";
import { CAPACITY_UNIT_OTHER, isKnownUnit } from "../data/capacityUnits";
import { MAX_PHOTOS, MAX_PRODUCTS } from "./validation";
import { deletePhotos, uploadUnitPhotos } from "./storageApi";
import { MAX_CORNERS, isPoint } from "./geo";

// PurchasePolicy/main/…
//   enterprises/{registrationId}             enterprise record (+ productList summary)
//   enterprises/{registrationId}/products/*  one document per product
//   users/{uid}                              { enterpriseId, mobile }
//   udyam/{udyamNo}                          { enterpriseId } – one registration per Udyam No.
const enterpriseRef = (id) => ppDoc("enterprises", id);
const productRef = (enterpriseId, productId) => ppDoc("enterprises", enterpriseId, "products", productId);
const userRef = (uid) => ppDoc("users", uid);
const udyamRef = (udyamNo) => ppDoc("udyam", udyamNo);

const clean = (v) => (typeof v === "string" ? v.trim() : v ?? "");
const apiError = (code) => Object.assign(new Error(code), { code });

// Client-side document ID for a new product row (also used as its React key).
export const newProductId = () => doc(ppCol("enterprises")).id;

// Empty GIS corner row for the forms.
export const newCorner = (lat = "", lng = "") => ({ id: newProductId(), lat, lng });

const round6 = (v) => Math.round(Number(v) * 1e6) / 1e6;

// Empty product row for the forms.
export const newProduct = (capacityUnit = "") => ({
  id: newProductId(),
  productName: "",
  productionCapacity: "",
  capacityUnit,
  capacityUnitOther: "",
});

const cleanProduct = (p) => ({
  id: p.id || newProductId(),
  productName: clean(p.productName),
  productionCapacity: Number(p.productionCapacity),
  capacityUnit: p.capacityUnit === CAPACITY_UNIT_OTHER ? clean(p.capacityUnitOther) : p.capacityUnit,
});

const productDoc = ({ productName, productionCapacity, capacityUnit }) => ({ productName, productionCapacity, capacityUnit });

// Every product name is searchable by admins.
export const buildSearchText = (e) =>
  [
    e.registrationId,
    e.name,
    e.unitName,
    e.mobile,
    e.udyamRegistrationNo,
    e.city,
    e.block,
    e.district,
    e.sectorOther,
    ...(e.productList || []).map((p) => p.productName),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

export function buildEnterpriseRecord({ registrationId, ownerUid, mobile, contact, unit, employment, products, photos, boundary, createdAt, createdDate }) {
  const productList = products.map(cleanProduct);
  const record = {
    registrationId,
    ownerUid,
    mobile,
    name: clean(contact.name),
    email: clean(contact.email),
    address: clean(contact.address),
    unitName: clean(unit.unitName),
    unitLocation: clean(unit.unitLocation),
    district: unit.district,
    city: clean(unit.city),
    block: clean(unit.block),
    blockOther: !!unit.blockIsOther,
    sector: unit.sector,
    sectorOther: unit.sector === SECTOR_OTHERS ? clean(unit.sectorOther) : "",
    projectCost: Number(employment.projectCost),
    directEmployees: Number(employment.directEmployees),
    // Of the direct employees, how many are from Bihar (absent on records saved before
    // this field existed, until the owner next updates their details).
    ...(String(employment.directEmployeesBihar ?? "").trim() === ""
      ? {}
      : { directEmployeesBihar: Number(employment.directEmployeesBihar) }),
    indirectEmployees: Number(employment.indirectEmployees),
    udyamRegistrationNo: normalizeUdyam(employment.udyamRegistrationNo),
    // Summary of the products subcollection used by the directory, filters and exports.
    productList,
    productCount: productList.length,
    productNames: productList.map((p) => p.productName).join(", "),
    // Optional unit photos (Firebase Storage): [{ url, path, name }].
    photos: (photos || []).slice(0, MAX_PHOTOS).map(({ url, path, name }) => ({ url, path, name: name || "" })),
    // Optional GIS boundary: unit corners in order, [{ lat, lng }] (empty or 3–20 points).
    boundary: (boundary || []).filter(isPoint).slice(0, MAX_CORNERS).map((p) => ({ lat: round6(p.lat), lng: round6(p.lng) })),
    createdAt: createdAt || serverTimestamp(),
    createdDate: createdDate || isoDate(),
    updatedAt: serverTimestamp(),
  };
  record.searchText = buildSearchText(record);
  return record;
}

// Wizard state for an existing enterprise (edit mode and "Add Product").
export function formFromEnterprise(e) {
  const products = e.products?.length ? e.products : e.productList || [];
  return {
    contact: { name: e.name || "", mobile: e.mobile, email: e.email || "", address: e.address || "" },
    unit: {
      unitName: e.unitName || "",
      unitLocation: e.unitLocation || "",
      district: e.district || "",
      city: e.city || "",
      block: e.block || "",
      blockIsOther: !!e.blockOther,
      sector: e.sector || "",
      sectorOther: e.sectorOther || "",
    },
    products: products.map((p) => ({
      id: p.id,
      productName: p.productName || "",
      productionCapacity: String(p.productionCapacity ?? ""),
      capacityUnit: isKnownUnit(p.capacityUnit) ? p.capacityUnit : CAPACITY_UNIT_OTHER,
      capacityUnitOther: isKnownUnit(p.capacityUnit) ? "" : p.capacityUnit || "",
    })),
    photos: e.photos || [],
    boundary: (e.boundary || []).map((p) => newCorner(String(p.lat), String(p.lng))),
    employment: {
      projectCost: String(e.projectCost ?? ""),
      directEmployees: String(e.directEmployees ?? ""),
      directEmployeesBihar: String(e.directEmployeesBihar ?? ""),
      indirectEmployees: String(e.indirectEmployees ?? ""),
      udyamRegistrationNo: e.udyamRegistrationNo || "",
    },
  };
}

// New registration: uploads any unit photos, then reserves the next BPPP-YYYY-NNNNNN ID
// and writes the enterprise, its products, the user map and the Udyam index in one transaction.
export async function createEnterprise({ uid, mobile, contact, unit, employment, products, photoFiles = [] }) {
  const udyamNo = normalizeUdyam(employment.udyamRegistrationNo);
  const photos = photoFiles.length ? await uploadUnitPhotos(uid, photoFiles) : [];
  try {
    return await runTransaction(db, async (tx) => {
      const userSnap = await tx.get(userRef(uid));
      if (userSnap.exists()) throw apiError("pp/already-registered");
      if ((await tx.get(udyamRef(udyamNo))).exists()) throw apiError("pp/udyam-taken");
      const [registrationId] = await reserveIds(tx, 1);

      const record = buildEnterpriseRecord({ registrationId, ownerUid: uid, mobile, contact, unit, employment, products, photos });
      tx.set(enterpriseRef(registrationId), record);
      record.productList.forEach((p) =>
        tx.set(productRef(registrationId, p.id), { ...productDoc(p), createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
      );
      tx.set(userRef(uid), { enterpriseId: registrationId, mobile, createdAt: serverTimestamp() });
      tx.set(udyamRef(udyamNo), { enterpriseId: registrationId });
      return registrationId;
    });
  } catch (err) {
    deletePhotos(photos.map((p) => p.path));
    throw err;
  }
}

// Shared by "Update Details" and "Add Product": rewrites the enterprise and syncs
// the products subcollection (adds new, updates changed, deletes removed rows).
async function writeUpdate(tx, id, form) {
  const snap = await tx.get(enterpriseRef(id));
  if (!snap.exists()) throw apiError("pp/not-found");
  const old = snap.data();
  const udyamNo = normalizeUdyam(form.employment.udyamRegistrationNo);
  const udyamChanged = udyamNo !== old.udyamRegistrationNo;
  if (udyamChanged) {
    const taken = await tx.get(udyamRef(udyamNo));
    if (taken.exists() && taken.data().enterpriseId !== id) throw apiError("pp/udyam-taken");
  }

  const record = buildEnterpriseRecord({
    registrationId: id,
    ownerUid: old.ownerUid,
    mobile: old.mobile,
    ...form,
    photos: form.photos ?? old.photos,
    boundary: form.boundary ?? old.boundary,
    createdAt: old.createdAt,
    createdDate: old.createdDate,
  });
  tx.set(enterpriseRef(id), record);

  const before = new Map((old.productList || []).map((p) => [p.id, p]));
  record.productList.forEach((p) => {
    const prev = before.get(p.id);
    if (!prev) {
      tx.set(productRef(id, p.id), { ...productDoc(p), createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
    } else if (["productName", "productionCapacity", "capacityUnit"].some((k) => prev[k] !== p[k])) {
      tx.set(productRef(id, p.id), { ...productDoc(p), updatedAt: serverTimestamp() }, { merge: true });
    }
    before.delete(p.id);
  });
  before.forEach((_, productId) => tx.delete(productRef(id, productId)));

  if (udyamChanged) {
    tx.set(udyamRef(udyamNo), { enterpriseId: id });
    tx.delete(udyamRef(old.udyamRegistrationNo));
  }
  // Photos dropped from the registration, deleted from Storage once the save succeeds.
  const kept = new Set(record.photos.map((p) => p.path));
  return { id, removedPhotoPaths: (old.photos || []).map((p) => p.path).filter((path) => !kept.has(path)) };
}

// `form.photos` holds the saved photos to keep; `photoFiles` are new ones to upload.
export async function updateEnterprise(id, form, { uid, photoFiles = [] } = {}) {
  const uploaded = photoFiles.length ? await uploadUnitPhotos(uid, photoFiles) : [];
  try {
    const { removedPhotoPaths } = await runTransaction(db, (tx) =>
      writeUpdate(tx, id, { ...form, photos: [...(form.photos || []), ...uploaded] })
    );
    deletePhotos(removedPhotoPaths);
    return id;
  } catch (err) {
    deletePhotos(uploaded.map((p) => p.path));
    throw err;
  }
}

// Appends one product to the latest saved record.
export const addProduct = (id, product) =>
  runTransaction(db, async (tx) => {
    const snap = await tx.get(enterpriseRef(id));
    if (!snap.exists()) throw apiError("pp/not-found");
    const form = formFromEnterprise(snap.data());
    if (form.products.length >= MAX_PRODUCTS) throw apiError("pp/too-many-products");
    return writeUpdate(tx, id, { ...form, products: [...form.products, product] });
  });

// Enterprise record with its products subcollection (in the saved order).
export async function getEnterprise(id) {
  const snap = await getDoc(enterpriseRef(id));
  if (!snap.exists()) return null;
  const data = { id: snap.id, ...snap.data() };
  const productsSnap = await getDocs(ppCol("enterprises", id, "products"));
  const order = new Map((data.productList || []).map((p, i) => [p.id, i]));
  data.products = productsSnap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (order.get(a.id) ?? 1e9) - (order.get(b.id) ?? 1e9));
  return data;
}

// The signed-in citizen's enterprise (summary record only), or null before registration.
export async function getMyEnterprise(uid) {
  const userSnap = await getDoc(userRef(uid));
  if (!userSnap.exists()) return null;
  const snap = await getDoc(enterpriseRef(userSnap.data().enterpriseId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export const sortNewestFirst = (rows) =>
  [...rows].sort(
    (a, b) =>
      (toDate(b.createdAt)?.getTime() || 0) - (toDate(a.createdAt)?.getTime() || 0) ||
      String(b.registrationId).localeCompare(String(a.registrationId))
  );

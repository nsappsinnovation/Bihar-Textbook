import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { reserveIds } from "./idGenerator";
import { uploadLandPhotos } from "./storageApi";
import { toAcres } from "./area";
import { joinKhata, joinKhesra, joinLandTypes, totalAcres } from "./plots";
import { digitsOnly, isoDate, toDate } from "./format";

const applicantsCol = collection(db, "applicants");
const applicationsCol = collection(db, "applications");

const clean = (v) => (typeof v === "string" ? v.trim() : v ?? "");

export async function getApplicant(mobile) {
  const snap = await getDoc(doc(applicantsCol, mobile));
  return snap.exists() ? snap.data() : null;
}

export async function saveApplicant(profile) {
  const ref = doc(applicantsCol, clean(profile.mobile));
  const isNew = !(await getDoc(ref)).exists();
  const data = {
    name: clean(profile.name),
    fatherHusbandName: clean(profile.fatherHusbandName),
    aadhaar: digitsOnly(profile.aadhaar),
    mobile: clean(profile.mobile),
    email: clean(profile.email),
    address: clean(profile.address),
    updatedAt: serverTimestamp(),
    ...(isNew ? { createdAt: serverTimestamp() } : {}),
  };
  await setDoc(ref, data, { merge: true });
  return data;
}

// Every plot's Khata / Khesra is searchable by admins.
export const buildSearchText = (a) =>
  [
    a.applicationId,
    a.applicant?.name,
    a.applicant?.fatherHusbandName,
    a.mobile,
    ...(a.plots || []).flatMap((p) => [p.khataNo, p.khesraNo]),
    a.khataNo,
    a.khesraNo,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

export function buildApplicationRecord({ applicationId, applicant, land, location, photos, submittedAt }) {
  const plots = (land.plots || []).map((p) => ({
    khataNo: clean(p.khataNo),
    khesraNo: clean(p.khesraNo),
    jamabandiNo: clean(p.jamabandiNo),
    area: Number(p.area),
    areaUnit: p.areaUnit,
    areaAcres: toAcres(p.area, p.areaUnit),
    landType: p.landType,
  }));
  const record = {
    applicationId,
    mobile: applicant.mobile,
    applicant: {
      name: clean(applicant.name),
      fatherHusbandName: clean(applicant.fatherHusbandName),
      aadhaar: digitsOnly(applicant.aadhaar),
      email: clean(applicant.email),
      address: clean(applicant.address),
    },
    // What the applicant confirmed at submission (kept as proof).
    declarations: { truthful: true, noTitleSuit: true },
    district: land.district,
    anchal: land.anchal,
    mauja: clean(land.mauja),
    maujaOther: !!land.maujaIsOther,
    thanaNo: clean(land.thanaNo),
    plots,
    plotCount: plots.length,
    // Summaries used by tables, exports and search.
    khataNo: joinKhata(plots),
    khesraNo: joinKhesra(plots),
    areaAcres: totalAcres(plots),
    landType: joinLandTypes(plots),
    chauhaddi: {
      north: clean(land.chauhaddi?.north),
      south: clean(land.chauhaddi?.south),
      east: clean(land.chauhaddi?.east),
      west: clean(land.chauhaddi?.west),
    },
    latitude: location.latitude === "" ? null : Number(location.latitude),
    longitude: location.longitude === "" ? null : Number(location.longitude),
    mapLink: clean(location.mapLink),
    photos: photos || [],
    submittedAt: submittedAt || serverTimestamp(),
    submittedDate: isoDate(submittedAt ? toDate(submittedAt) : new Date()),
  };
  record.searchText = buildSearchText(record);
  return record;
}

export async function submitApplication({ applicant, land, location, photoFiles = [] }) {
  const batchId = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  const photos = photoFiles.length ? await uploadLandPhotos(applicant.mobile, batchId, photoFiles) : [];

  return runTransaction(db, async (tx) => {
    const [applicationId] = await reserveIds(tx, 1);
    const record = buildApplicationRecord({ applicationId, applicant, land, location, photos });
    tx.set(doc(applicationsCol, applicationId), record);
    return applicationId;
  });
}

export async function getApplication(applicationId) {
  const snap = await getDoc(doc(applicationsCol, applicationId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export const sortNewestFirst = (rows) =>
  [...rows].sort(
    (a, b) =>
      (toDate(b.submittedAt)?.getTime() || 0) - (toDate(a.submittedAt)?.getTime() || 0) ||
      String(b.applicationId).localeCompare(String(a.applicationId))
  );

export async function listApplicantApplications(mobile) {
  const snap = await getDocs(query(applicationsCol, where("mobile", "==", mobile)));
  return sortNewestFirst(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
}

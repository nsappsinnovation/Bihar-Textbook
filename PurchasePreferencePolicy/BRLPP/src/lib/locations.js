import { useEffect, useMemo, useState } from "react";
import { LAND_TYPES } from "../data/landTypes";

// District → Circle (Anchal) → Mauja master data lives in
// src/data/bihar_district_circle_mauja.json ({ District: { Circle: [Mauja…] } }).
// It is ~290 KB, so it is loaded on demand only where dropdowns are needed.
// Values are stored exactly as they appear in that file.

// Hindi names for district labels (the master file only has English district names).
const DISTRICT_HI = {
  "Araria": "अररिया",
  "Arwal": "अरवल",
  "Aurangabad": "औरंगाबाद",
  "Banka": "बांका",
  "Begusarai": "बेगूसराय",
  "Bhagalpur": "भागलपुर",
  "Bhojpur": "भोजपुर",
  "Buxar": "बक्सर",
  "Darbhanga": "दरभंगा",
  "East Champaran": "पूर्वी चंपारण",
  "Gaya": "गया",
  "Gopalganj": "गोपालगंज",
  "Jamui": "जमुई",
  "Jehanabad": "जहानाबाद",
  "Kaimur": "कैमूर",
  "Katihar": "कटिहार",
  "Khagaria": "खगड़िया",
  "Kishanganj": "किशनगंज",
  "Lakhisarai": "लखीसराय",
  "Madhepura": "मधेपुरा",
  "Madhubani": "मधुबनी",
  "Munger": "मुंगेर",
  "Muzaffarpur": "मुजफ्फरपुर",
  "Nalanda": "नालंदा",
  "Nawada": "नवादा",
  "Patna": "पटना",
  "Purnea": "पूर्णिया",
  "Rohtas": "रोहतास",
  "Saharsa": "सहरसा",
  "Samastipur": "समस्तीपुर",
  "Saran": "सारण",
  "Sheikhpura": "शेखपुरा",
  "Sheohar": "शिवहर",
  "Sitamarhi": "सीतामढ़ी",
  "Siwan": "सिवान",
  "Supaul": "सुपौल",
  "Vaishali": "वैशाली",
  "West Champaran": "पश्चिमी चंपारण",
};

export const DISTRICTS = Object.keys(DISTRICT_HI).map((en) => ({ en, hi: DISTRICT_HI[en] }));

// Special dropdown value: mauja not present in the master list (typed manually).
export const MAUJA_OTHER = "__other__";

const collator = new Intl.Collator(["hi", "en"]);
let dataPromise = null;
let dataCache = null;

export function loadLocationData() {
  if (!dataPromise) {
    dataPromise = import("../data/bihar_district_circle_mauja.json").then((m) => {
      dataCache = m.default;
      return dataCache;
    });
  }
  return dataPromise;
}

const makeApi = (data) => ({
  ready: !!data,
  getAnchals: (district) => Object.keys(data?.[district] || {}).sort(collator.compare),
  getMaujas: (district, anchal) => [...(data?.[district]?.[anchal] || [])].sort(collator.compare),
  isKnownMauja: (district, anchal, mauja) => !!data?.[district]?.[anchal]?.includes(mauja),
});

// React hook: { ready, getAnchals, getMaujas, isKnownMauja }.
export function useLocationData() {
  const [data, setData] = useState(dataCache);
  useEffect(() => {
    if (dataCache) return undefined;
    let active = true;
    loadLocationData()
      .then((d) => active && setData(d))
      .catch((err) => console.error("Unable to load location master data:", err));
    return () => {
      active = false;
    };
  }, []);
  return useMemo(() => makeApi(data), [data]);
}

export const districtLabel = (district, lang) => (lang === "hi" && DISTRICT_HI[district]) || district || "—";

// Circle names are English-only and mauja names Hindi-only in the master file.
export const anchalLabel = (_district, anchal) => anchal || "—";
export const maujaLabel = (_district, _anchal, mauja) => mauja || "—";

// Accepts a single value or the comma-joined summary of several plots.
export const landTypeLabel = (value, lang) => {
  if (!value) return "—";
  return String(value)
    .split(",")
    .map((v) => {
      const t = LAND_TYPES.find((x) => x.value === v);
      return t ? t[lang] || t.en : v;
    })
    .join(", ");
};

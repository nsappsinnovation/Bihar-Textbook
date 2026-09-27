import { useEffect, useMemo, useState } from "react";
import { SECTORS, SECTOR_OTHERS } from "../data/sectors";
import { CAPACITY_UNITS } from "../data/capacityUnits";

// District → Block master data lives in src/data/bihar_district_blocks.json
// ({ District: [Block…] }), derived from BRLPP's District → Circle (Anchal) master.
// It is loaded on demand only where dropdowns are needed. Values are stored
// exactly as they appear in that file.

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

// Special dropdown value: block not present in the master list (typed manually).
export const BLOCK_OTHER = "__other__";

const collator = new Intl.Collator(["hi", "en"]);
let dataPromise = null;
let dataCache = null;

export function loadLocationData() {
  if (!dataPromise) {
    dataPromise = import("../data/bihar_district_blocks.json").then((m) => {
      dataCache = m.default;
      return dataCache;
    });
  }
  return dataPromise;
}

const makeApi = (data) => ({
  ready: !!data,
  getBlocks: (district) => [...(data?.[district] || [])].sort(collator.compare),
  isKnownBlock: (district, block) => !!data?.[district]?.includes(block),
});

// React hook: { ready, getBlocks, isKnownBlock }.
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

// Block names are English-only in the master file.
export const blockLabel = (block) => block || "—";

// "Others" shows the sector the applicant typed.
export const sectorLabel = (sector, lang, sectorOther) => {
  if (!sector) return "—";
  if (sector === SECTOR_OTHERS && sectorOther) return sectorOther;
  const s = SECTORS.find((x) => x.value === sector);
  return s ? s[lang] || s.en : sector;
};

// Known units are stored as their key; a unit typed under "Other" is stored as text.
export const unitLabel = (unit, lang) => {
  const u = CAPACITY_UNITS.find((x) => x.value === unit);
  return u ? u[lang] || u.en : unit || "";
};

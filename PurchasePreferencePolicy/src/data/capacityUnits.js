// Units for a product's production capacity (per annum). "other" lets the
// applicant type a unit; the typed text is then stored as the unit itself.
export const CAPACITY_UNIT_OTHER = "other";

export const CAPACITY_UNITS = [
  { value: "nos", en: "Numbers / Pieces", hi: "संख्या / नग" },
  { value: "kg", en: "Kilogram (kg)", hi: "किलोग्राम" },
  { value: "quintal", en: "Quintal", hi: "क्विंटल" },
  { value: "mt", en: "Metric Tonne (MT)", hi: "मीट्रिक टन" },
  { value: "litre", en: "Litre", hi: "लीटर" },
  { value: "kl", en: "Kilolitre (KL)", hi: "किलोलीटर" },
  { value: "metre", en: "Metre", hi: "मीटर" },
  { value: "sqm", en: "Square Metre", hi: "वर्ग मीटर" },
  { value: "cum", en: "Cubic Metre", hi: "घन मीटर" },
  { value: "pairs", en: "Pairs", hi: "जोड़ी" },
  { value: "sets", en: "Sets", hi: "सेट" },
  { value: "dozen", en: "Dozen", hi: "दर्जन" },
  { value: "packets", en: "Packets", hi: "पैकेट" },
  { value: "bags", en: "Bags", hi: "बैग" },
  { value: "bottles", en: "Bottles", hi: "बोतल" },
  { value: "boxes", en: "Boxes / Cartons", hi: "डिब्बे / कार्टन" },
  { value: "mw", en: "Megawatt (MW)", hi: "मेगावाट" },
  { value: "kwh", en: "kWh (power units)", hi: "किलोवाट-घंटा" },
  { value: "man_months", en: "Man-months", hi: "मानव-माह" },
  { value: "projects", en: "Projects / Orders", hi: "परियोजनाएँ / ऑर्डर" },
  { value: CAPACITY_UNIT_OTHER, en: "Other (specify)", hi: "अन्य (उल्लेख करें)" },
];

export const isKnownUnit = (value) => CAPACITY_UNITS.some((u) => u.value === value && u.value !== CAPACITY_UNIT_OTHER);

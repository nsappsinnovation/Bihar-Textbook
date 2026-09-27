// Conversion factors to acres. Bihar bigha/katha/dhur values follow the
// standard Revenue measure (1 bigha = 20 katha = 400 dhur ≈ 27,220 sq ft).
export const AREA_UNITS = [
  { value: "acre", en: "Acre", hi: "एकड़", toAcres: 1 },
  { value: "decimal", en: "Decimal", hi: "डिसमिल", toAcres: 0.01 },
  { value: "hectare", en: "Hectare", hi: "हेक्टेयर", toAcres: 2.47105 },
  { value: "bigha", en: "Bigha", hi: "बीघा", toAcres: 0.625 },
  { value: "katha", en: "Katha", hi: "कट्ठा", toAcres: 0.03125 },
  { value: "dhur", en: "Dhur", hi: "धुर", toAcres: 0.0015625 },
  { value: "sqft", en: "Sq. ft.", hi: "वर्ग फीट", toAcres: 1 / 43560 },
];

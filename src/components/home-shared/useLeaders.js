import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getDirectory } from "../../services/directoryService";
import { fileUrl } from "../../services/api";

// The four office-holders shown on the home page versions. Used until (or if) the
// Admin → Leaders directory answers, so the section never renders empty.
const FALLBACK = [
  { key: "name0", roleKey: "role0", name: "Shri Samrat Choudhary", role: "Hon'ble Chief Minister, Bihar", image: "/images/KeyParticipants/samrat.webp" },
  { key: "name1", roleKey: "role1", name: "Shri Mithilesh Tiwari", role: "Hon'ble Education Minister, Bihar", image: "/images/KeyParticipants/sri_mithlesh.webp" },
  { key: "name2", roleKey: "role2", name: "Shri Vinod Singh Gunjiyal", role: "Secretary, Education Department", image: "/images/KeyParticipants/sri-vinod.webp" },
  { key: "name3", roleKey: "role3", name: "Shri Yatendra Kumar Pal, IAS", role: "Managing Director, BSTBPC", image: "/images/KeyParticipants/shri_yatendra_pal.webp" },
];

export default function useLeaders() {
  const { t } = useTranslation();
  const [rows, setRows] = useState(null);

  useEffect(() => {
    getDirectory("leader")
      .then((data) => setRows(data.map((r) => ({ name: r.name, role: r.designation, image: fileUrl(r.photoUrl) }))))
      .catch(() => setRows([]));
  }, []);

  if (rows && rows.length) return rows;
  return FALLBACK.map((l) => ({
    name: t(`keyParticipant.industry.${l.key}`, l.name),
    role: t(`keyParticipant.industry.${l.roleKey}`, l.role),
    image: l.image,
  }));
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

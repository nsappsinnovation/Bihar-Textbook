import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getSections } from "../../services/sectionService";
import { fileUrl } from "../../services/api";
import { defaultMissions } from "../../data/homeContent";

// The learning programmes (VR lab, audio library, ...) as managed in the CMS (Tools & Resources),
// falling back to the built-in list when none are published. Returns null while loading,
// then translated { id, title, desc, image, link } items.
export default function useMissions() {
  const { t } = useTranslation();
  const [rows, setRows] = useState(null);

  useEffect(() => {
    getSections("tr")
      .then((data) => setRows(data || []))
      .catch(() => setRows([]));
  }, []);

  if (rows === null) return null;
  if (rows.length) {
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      desc: row.description,
      image: fileUrl(row.imageUrl),
      link: row.link,
    }));
  }
  return defaultMissions.map((m) => ({
    id: m.id,
    title: t(m.titleKey, m.defaultTitle),
    desc: t(m.descKey, m.defaultDesc),
    image: m.image,
    link: m.link,
  }));
}

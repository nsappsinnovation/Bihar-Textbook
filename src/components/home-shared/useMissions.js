import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getSections } from "../../services/sectionService";
import { fileUrl } from "../../services/api";
import { defaultMissions } from "../../data/homeContent";

// The learning programmes (VR lab, audio library, ...) as managed in the CMS,
// falling back to the built-in list. Returns translated { id, title, desc, image, hoverImage, link }.
export default function useMissions() {
  const { t } = useTranslation();
  const [rows, setRows] = useState(null);

  useEffect(() => {
    getSections("tr")
      .then((data) => setRows(data || []))
      .catch(() => setRows([]));
  }, []);

  if (rows && rows.length) {
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      desc: row.description,
      image: fileUrl(row.imageUrl),
      hoverImage: row.imageUrl?.startsWith("/images/missions/") ? row.imageUrl.replace(/\.webp$/, "hov.webp") : fileUrl(row.imageUrl),
      link: row.link,
    }));
  }
  return defaultMissions.map((m) => ({
    id: m.id,
    title: t(m.titleKey, m.defaultTitle),
    desc: t(m.descKey, m.defaultDesc),
    image: m.image,
    hoverImage: m.hoverImage,
    link: m.link,
  }));
}

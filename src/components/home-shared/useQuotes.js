import { useTranslation } from "react-i18next";
import { testimonials, getInitials } from "../../data/homeContent";

// The home page's quotes from Bihar's leaders and reformers, translated,
// with the typed quote marks stripped so each design can draw its own
export default function useQuotes() {
  const { t } = useTranslation();
  return testimonials.map((item) => {
    const raw = t(`stakeholder.testimonials.quote${item.id}`, item.quote);
    return {
      id: item.id,
      quote: raw.replace(/^["“]|["”]$/g, ""),
      name: t(`stakeholder.testimonials.name${item.id}`, item.name),
      role: t(`stakeholder.testimonials.role${item.id}`, item.role),
      initials: getInitials(item.name),
    };
  });
}

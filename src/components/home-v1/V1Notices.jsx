import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { getNotices } from "../../services/noticeService";
import { buildBoardItems } from "../../data/noticeBoardItems";
import SectionHeader from "./SectionHeader";

// Pale sky: header, a count over a hairline, then a plain list of the latest five
export default function V1Notices() {
  const { t } = useTranslation();
  const [items, setItems] = useState(null);

  useEffect(() => {
    getNotices()
      .then((all) => setItems(buildBoardItems(all.filter((n) => n.type === "Notice"), all.filter((n) => n.type === "Tender"))))
      .catch(() => setItems([]));
  }, []);

  // Newest first; items without a date ("Recent") go to the top
  const sortKey = (d) => (d && d.includes("/") ? d.split("/").reverse().join("") : "99999999");
  const list = [...(items || [])].sort((x, y) => sortKey(y.date).localeCompare(sortKey(x.date))).slice(0, 5);

  return (
    <section className="bg-[#f3f7fd] px-6 py-20 font-sans text-slate-900 md:px-12 lg:px-24 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeader
          eyebrow={t("noticeBoard.badge", "Updates & Tenders")}
          title={t("noticeBoard.heading", "Official Notices")}
          highlight={t("noticeBoard.headingHighlight", "& Circulars")}
        />

        <p className="mt-8 flex items-baseline gap-3 border-b border-slate-300 pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 [html.lang-hi_&]:text-sm [html.lang-hi_&]:normal-case [html.lang-hi_&]:tracking-normal">
          <span className="text-base font-bold normal-case tracking-normal text-slate-900">{items ? items.length : "–"}</span>
          {t("homeV1.updatesCount", "Notices, circulars and tenders")}
        </p>

        <ul>
          {items === null
            ? [0, 1, 2].map((i) => <li key={i} className="my-5 h-6 w-2/3 animate-pulse rounded bg-slate-200/70" />)
            : list.map((n) => (
                <li key={n.id} className="border-b border-slate-200">
                  <a
                    href={n.link || undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid gap-1 py-5 sm:grid-cols-[150px_110px_1fr_auto] sm:items-center sm:gap-6"
                  >
                    {/* Labelled dates: "Published" for notices, "Opens" + "Closes" for tenders */}
                    <span className="grid gap-0.5 text-xs font-medium text-slate-500">
                      <span>
                        {n.dateLabel === "opens" ? t("noticeBoard.opens", "Opens") : t("noticeBoard.published", "Published")}:{" "}
                        <span className="font-semibold text-slate-700">{n.hasDate ? n.date : t("noticeBoard.notSpecified", "Not specified")}</span>
                      </span>
                      {(n.category === "Tender" || n.deadline) && (
                        <span>
                          {t("noticeBoard.closes", "Closes")}:{" "}
                          <span className="font-semibold text-slate-700">{n.deadline || t("noticeBoard.notSpecified", "Not specified")}</span>
                        </span>
                      )}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 [html.lang-hi_&]:text-xs [html.lang-hi_&]:tracking-normal">
                      {t(`noticeBoard.tab.${n.category.toLowerCase()}`, n.category)}
                    </span>
                    <span className="text-[15px] font-semibold leading-snug text-slate-900 group-hover:text-blue-600">{n.title}</span>
                    <ArrowUpRight size={18} aria-hidden="true" className="hidden text-slate-400 transition group-hover:text-blue-600 sm:block" />
                  </a>
                </li>
              ))}
          {items && items.length === 0 && (
            <li className="border-b border-slate-200 py-6 text-sm font-medium text-slate-500">
              {t("noticeBoard.empty.allDesc", "New notices, circulars and tenders will appear here as soon as they are published.")}
            </li>
          )}
        </ul>

        <Link to="/notice" className="mt-10 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600">
          {t("noticeBoard.viewArchive", "View Document Archive")} <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

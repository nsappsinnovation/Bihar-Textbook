// Notices and tenders merged into one list for the home page notice boards

// "2026-06-22" -> "22/06/2026" ("Recent" when the item has no date)
export const toDisplayDate = (isoDate) => (isoDate ? (isoDate.includes('/') ? isoDate : isoDate.split('-').reverse().join('/')) : 'Recent');

// Alternate notices and tenders so the board shows a mix of both
export const buildBoardItems = (notices, tenders) => {
  const items = [];
  for (let i = 0; i < Math.max(notices.length, tenders.length); i++) {
    const n = notices[i];
    if (n) {
      items.push({
        id: `notice-${n.id}`,
        category: n.category === 'Circular' ? 'Circular' : 'Notice',
        title: n.title,
        date: toDisplayDate(n.date),
        dateLabel: 'published', // "Published" on the boards
        hasDate: Boolean(n.date),
        deadline: n.closingDate ? toDisplayDate(n.closingDate) : null, // closing date, when a notice has one
        ref: `NTC-${n.id}`,
        isUrgent: n.isUrgent,
        fileSize: 'PDF',
        link: n.link,
      });
    }
    const t = tenders[i];
    if (t) {
      items.push({
        id: `tender-${t.id}`,
        category: 'Tender',
        title: t.title,
        date: toDisplayDate(t.date),
        dateLabel: 'opens', // tenders show both "Opens" and "Closes"
        hasDate: Boolean(t.date),
        deadline: t.closingDate ? toDisplayDate(t.closingDate) : null,
        isOpen: t.isActive,
        ref: `TND-${t.id}`,
        isUrgent: t.isUrgent,
        fileSize: 'PDF',
        link: t.link,
      });
    }
  }
  return items;
};

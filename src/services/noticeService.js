import api, { fileUrl } from './api';

// Backend notice → shape used by the pages
const toNotice = (n) => ({
    id: n.id,
    type: n.type, // "Notice" | "Tender"
    title: n.title,
    description: n.description || '',
    category: n.category || n.type,
    pinned: Boolean(n.isPinned),
    isUrgent: Boolean(n.isPinned),
    date: n.publishDate ? n.publishDate.slice(0, 10) : '', // "YYYY-MM-DD", empty when the notice has no date
    document: n.documentUrl || '', // stored path, e.g. "/uploads/documents/x.pdf" or an external URL
    link: fileUrl(n.documentUrl) || '', // ready to use in <a href>
    updatedAt: n.updatedAt,
});

// Page form → backend body
const toPayload = (form) => ({
    title: form.title,
    description: form.description || '',
    type: form.type,
    category: form.category,
    isPinned: Boolean(form.pinned),
    publishDate: form.date ? form.date.slice(0, 10) : undefined,
    documentUrl: form.document || '',
});

// type: "Notice" | "Tender" | undefined (all)
export const getNotices = (type) =>
    api
        .get('/api/notices', { params: { type, limit: 1000 } })
        .then((res) => res.data.data.map(toNotice));

export const createNotice = (form) => api.post('/api/notices', toPayload(form)).then((res) => toNotice(res.data.data));

export const updateNotice = (id, form) => api.put(`/api/notices/${id}`, toPayload(form)).then((res) => toNotice(res.data.data));

export const deleteNotice = (id) => api.delete(`/api/notices/${id}`);

// Most recent change in a list of notices (ISO string) or null
export const lastUpdatedOf = (notices) =>
    notices.reduce((latest, n) => (n.updatedAt > (latest || '') ? n.updatedAt : latest), null);

import api from './api';

// Classes 1–12 (books reference them by classId)
export const CLASSES = Array.from({ length: 12 }, (_, i) => ({ id: i + 1, name: `Class ${i + 1}` }));

// Backend book → shape used by the pages. `image` is the stored path; render it with fileUrl().
const toBook = (b) => ({
    id: b.id,
    title: b.title,
    classId: b.classId,
    className: `Class ${b.classId}`,
    subject: b.subject || 'General',
    author: b.board || 'Bihar Board',
    image: b.coverImageUrl || '',
    description: b.description || '',
    status: b.status,
    chapterCount: b.chapterCount ?? b.chapters?.length ?? 0,
    uploadDate: (b.createdAt || '').slice(0, 10),
    chapters: (b.chapters || []).map(toChapter),
});

const toChapter = (c) => ({
    id: c.id,
    chapterNumber: c.chapterNumber,
    title: c.title || '',
    hindiTitle: c.hindiTitle || '',
    pdfUrl: c.pdfUrl || '',
    type: 'chapter',
});

// Page form → backend body
const toPayload = (form) => ({
    title: form.title,
    classId: Number(form.classId),
    subject: form.subject || 'General',
    board: form.author || 'Bihar Board',
    coverImageUrl: form.image || '',
    description: form.description || '',
    status: form.status,
});

export const getBooks = () => api.get('/api/books', { params: { limit: 1000 } }).then((res) => res.data.data.map(toBook));

export const getBooksByClass = (classId) => api.get(`/api/books/class/${classId}`).then((res) => res.data.data.map(toBook));

// One book including its chapters
export const getBook = (id) => api.get(`/api/books/${id}`).then((res) => toBook(res.data.data));

// Public pages find a book by class + subject (or title) from the URL. Returns null when not found.
export const findBook = async (classId, subjectOrTitle) => {
    const books = await getBooksByClass(classId);
    const match = books.find((b) => b.subject === subjectOrTitle || b.title === subjectOrTitle);
    return match ? getBook(match.id) : null;
};

export const createBook = (form) => api.post('/api/books', toPayload(form)).then((res) => res.data.data);

export const updateBook = (id, form) => api.put(`/api/books/${id}`, toPayload(form));

export const deleteBook = (id) => api.delete(`/api/books/${id}`);

// Saves the chapter rows edited in the admin form against what is stored.
// Existing rows (numeric id) are updated, new rows are created, missing rows are deleted.
export const saveChapters = async (bookId, rows, storedChapters = []) => {
    const keptIds = rows.filter((r) => typeof r.id === 'number').map((r) => r.id);
    const removed = storedChapters.filter((c) => !keptIds.includes(c.id));
    let nextNumber = Math.max(0, ...storedChapters.map((c) => c.chapterNumber)) + 1;

    for (const chapter of removed) {
        await api.delete(`/api/chapters/${chapter.id}`);
    }
    for (const row of rows) {
        const body = { title: row.title || 'Untitled Chapter', hindiTitle: row.hindiTitle || '', pdfUrl: row.pdfUrl || '' };
        if (typeof row.id === 'number') {
            await api.put(`/api/chapters/${row.id}`, body);
        } else {
            await api.post(`/api/books/${bookId}/chapters`, { ...body, chapterNumber: nextNumber++ });
        }
    }
};

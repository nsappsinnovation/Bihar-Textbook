import api from './api';

// Folders under the backend's uploads/ directory — each kind of content keeps its files together.
// Must match UPLOAD_FOLDERS in the backend (src/middlewares/uploads.js).
export const UPLOAD_FOLDERS = {
    notices: 'notices',
    circulars: 'circulars',
    tenders: 'tenders',
    bookCovers: 'books/covers',
    bookChapters: 'books/chapters',
    leaders: 'leaders',
    mdMessage: 'md-message',
    csrPolicy: 'csr-policy',
    printers: 'printers',
};

// Website editor / section module → folder
const MODULE_FOLDERS = {
    opmp: 'opmp',
    tr: 'tools-resources',
    cl: 'latest-initiatives',
    csr: 'csr-policy',
    'gl-photo': 'gallery/photos',
    'gl-video': 'gallery/videos',
    'gl-press': 'gallery/press',
    'dc-reg-forms': 'registration-forms',
    'dc-rti': 'rti',
    'ku-md-message': 'md-message',
    'ku-board': 'board-members',
    'ku-list-md': 'past-mds',
};
export const moduleUploadFolder = (module) => MODULE_FOLDERS[module] || 'others';

// Tenders → tenders/, notices with category "Circular" → circulars/, other notices → notices/
export const noticeUploadFolder = (type, category) => {
    if (type === 'Tender') return UPLOAD_FOLDERS.tenders;
    if ((category || '').trim().toLowerCase() === 'circular') return UPLOAD_FOLDERS.circulars;
    return UPLOAD_FOLDERS.notices;
};

// Uploads one file to the backend and returns its stored path ("/api/uploads/<folder>/...").
// kind: "image" (JPG/PNG/WEBP, max 2 MB) | "document" (PDF/DOC/DOCX, max 20 MB) | "video" (MP4, max 50 MB)
// folder: one of the folders above; the backend puts files without one in "others".
export const uploadFile = (file, kind, folder) => {
    const form = new FormData();
    form.append('file', file);
    return api.post(`/api/uploads/${kind}`, form, { params: { folder } }).then((res) => res.data.data.url);
};

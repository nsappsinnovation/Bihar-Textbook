import api from './api';

// Uploads one file to the backend and returns its stored path ("/api/uploads/images/...").
// kind: "image" (JPG/PNG/WEBP, max 2 MB) | "document" (PDF/DOC/DOCX, max 20 MB) | "video" (MP4, max 50 MB)
export const uploadFile = (file, kind) => {
    const form = new FormData();
    form.append('file', file);
    return api.post(`/api/uploads/${kind}`, form).then((res) => res.data.data.url);
};

import api from './api';

// Content lists stored in the backend "sections" table, grouped by module:
// "gl-photo" | "gl-video" | "gl-press" | "tr" (Tools & Resources) | "cl" (Latest Initiatives) | "opmp" | ...
// Row fields: id, module, title, description, content, category, imageUrl, videoUrl, documentUrl, link, publishDate, sortOrder

// includeDrafts: also return items with a future publish date (admin view)
export const getSections = (module, { includeDrafts = false } = {}) =>
    api
        .get('/api/sections', { params: { module, pageSize: 100, includeDrafts } })
        .then((res) => res.data.data);

export const createSection = (section) => api.post('/api/admin/sections', section).then((res) => res.data.data);

export const updateSection = (id, section) => api.patch(`/api/admin/sections/${id}`, section).then((res) => res.data.data);

export const deleteSection = (id) => api.delete(`/api/admin/sections/${id}`);

import api from './api';

// Visitor analytics for the Books section and the 8 Learning Playground features.
// Backend: a single POST write (public, anonymous) + a single admin-only aggregated GET.
// See scripts/README.md or the Analytics admin page for the full picture.
//
// NOTE: as of writing, the backend does not yet expose these two routes (both 404 in
// production). trackVisit() below is written to fail completely silently — no console
// noise, no thrown error, no effect on the page — specifically so this can ship ahead of
// the backend without breaking or spamming errors on every real visitor's page load.
// Once POST /api/visits and GET /api/admin/visits/summary exist, both start working with
// no frontend changes needed.

export const trackVisit = (section, itemKey, device, visitorId) =>
    api.post('/api/visits', { section, itemKey, device, visitorId }).catch(() => {});

// { totals: { all, month, uniqueAll, uniqueMonth }, byDevice: [{device,count}],
//   books: [{itemKey, visits, unique, byDevice:{...}}], playground: [{itemKey, visits, unique, byDevice:{...}}] }
export const getVisitSummary = () => api.get('/api/admin/visits/summary').then((res) => res.data.data);

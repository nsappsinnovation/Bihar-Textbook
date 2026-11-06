import { useEffect } from 'react';
import { trackVisit } from '../services/visitService';

const VISITOR_KEY = 'bt_visitor_id';

// A random id kept in localStorage, set once on a visitor's first visit and reused on every
// later one. This — not login, not cookies — is what lets the backend count "unique visitors"
// without any consent banner or personal data: it identifies a browser, not a person.
function getVisitorId() {
    try {
        let id = localStorage.getItem(VISITOR_KEY);
        if (!id) {
            id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `v-${Date.now()}-${Math.random().toString(36).slice(2)}`;
            localStorage.setItem(VISITOR_KEY, id);
        }
        return id;
    } catch {
        return null; // private browsing / storage blocked — visit just isn't tracked
    }
}

function getDevice() {
    const w = window.innerWidth;
    if (w < 640) return 'phone';
    if (w < 1024) return 'tablet';
    return 'desktop';
}

/**
 * Records one visit for a tracked section (a book chapter, or one of the 8 Learning Playground
 * features) when the component mounts. `section` is "book" or "playground"; `itemKey` identifies
 * which one (e.g. "2:ganit" for a book, or the route like "/vr-dashboard" for a playground card).
 * Pass `enabled: false` to skip (e.g. while the page's own data is still loading).
 */
export default function useTrackVisit(section, itemKey, { enabled = true } = {}) {
    useEffect(() => {
        if (!enabled || !itemKey) return;
        const visitorId = getVisitorId();
        if (!visitorId) return;
        trackVisit(section, itemKey, getDevice(), visitorId);
        // Intentionally fire once per mount only — not on every param change within the same
        // session — so flipping pages inside one chapter doesn't inflate the count.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section, itemKey, enabled]);
}

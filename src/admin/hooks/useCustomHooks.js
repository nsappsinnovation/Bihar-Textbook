import { useState, useEffect, useCallback, useRef } from 'react';
import { getActivities, createActivity, markActivityRead, deleteActivity, clearActivities } from '../../services/activityService';
import toast from 'react-hot-toast';

/**
 * Custom hook for animated counter effect
 * @param {number} end - Target number
 * @param {number} duration - Animation duration in ms
 */
export function useAnimatedCounter(end, duration = 1500) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const startTime = performance.now();
    const startValue = 0;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (end - startValue) * eased);
      
      countRef.current = current;
      setCount(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [end, duration]);

  return count;
}

/**
 * Custom hook to detect screen size for responsive behavior
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

/**
 * Custom hook for debounced search
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Toast notification system
 */
export function useToast() {
  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    if (type === 'success') {
      toast.success(message, { duration });
    } else if (type === 'error') {
      toast.error(message, { duration });
    } else {
      toast(message, { duration, icon: type === 'warning' ? '⚠️' : 'ℹ️' });
    }
  }, []);

  const removeToast = useCallback((id) => {
    toast.dismiss(id);
  }, []);

  return { toasts: [], addToast, removeToast };
}

/**
 * Hook to detect clicks outside a ref element
 */
export function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
/**
 * Admin activity feed stored in the backend (Notifications page, navbar bell, dashboard).
 * Every mounted copy of this hook reloads when any of them changes the feed.
 */
export function useActivityLog() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const refresh = () => getActivities().then(setActivities).catch(() => {});
    refresh();
    window.addEventListener('activitiesUpdated', refresh);
    return () => window.removeEventListener('activitiesUpdated', refresh);
  }, []);

  const notifyChanged = () => window.dispatchEvent(new Event('activitiesUpdated'));

  // The second argument (user name) is ignored: the backend records the logged-in admin
  const logActivity = useCallback((action, _user, type = 'system') => {
    createActivity(action, type).then(notifyChanged).catch(() => {});
  }, []);

  const markAsRead = useCallback((id) => {
    markActivityRead(id).then(notifyChanged).catch(() => {});
  }, []);

  const removeActivity = useCallback((id) => {
    deleteActivity(id).then(notifyChanged).catch(() => {});
  }, []);

  const clearAllActivities = useCallback(() => {
    clearActivities().then(notifyChanged).catch(() => {});
  }, []);

  return { activities, logActivity, markAsRead, removeActivity, clearAllActivities };
}

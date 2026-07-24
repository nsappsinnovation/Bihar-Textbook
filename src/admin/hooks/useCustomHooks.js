import { useState, useEffect, useCallback, useRef } from 'react';
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
 * Hook to manage real-time activity logging
 */
export function useActivityLog() {
  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('admin_activities');
    if (saved) return JSON.parse(saved);
    
    // Default initial activities
    return [
      { id: 1, user: 'Rajesh Kumar Singh', action: 'Updated officer profile information', type: 'update', time: '2 minutes ago', avatar: 'RK', status: 'completed', read: false },
      { id: 2, user: 'Priya Sharma', action: 'Uploaded new notice regarding exam schedule', type: 'upload', time: '15 minutes ago', avatar: 'PS', status: 'completed', read: true },
      { id: 3, user: 'Amit Verma', action: 'Added new textbook - Mathematics Class 10', type: 'create', time: '1 hour ago', avatar: 'AV', status: 'completed', read: true },
    ];
  });

  const logActivity = useCallback((action, user = 'Admin', type = 'system', link = null, status = 'completed') => {
    const newActivity = {
      id: Date.now(),
      user,
      action,
      type,
      status,
      link,
      time: 'Just now',
      read: false,
      avatar: user.split(' ').map(n => n[0]).join('').toUpperCase()
    };
    
    setActivities(prev => {
      const updated = [newActivity, ...prev].slice(0, 30); // Keep last 30 for view all
      localStorage.setItem('admin_activities', JSON.stringify(updated));
      window.dispatchEvent(new Event('activitiesUpdated'));
      return updated;
    });
  }, []);

  const markAsRead = useCallback((id) => {
    setActivities(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, read: true } : a);
      localStorage.setItem('admin_activities', JSON.stringify(updated));
      window.dispatchEvent(new Event('activitiesUpdated'));
      return updated;
    });
  }, []);

  const removeActivity = useCallback((id) => {
    setActivities(prev => {
      const updated = prev.filter(a => a.id !== id);
      localStorage.setItem('admin_activities', JSON.stringify(updated));
      window.dispatchEvent(new Event('activitiesUpdated'));
      return updated;
    });
  }, []);

  const clearAllActivities = useCallback(() => {
    setActivities([]);
    localStorage.removeItem('admin_activities');
    window.dispatchEvent(new Event('activitiesUpdated'));
  }, []);

  useEffect(() => {
    const handleUpdate = () => {
      const saved = localStorage.getItem('admin_activities');
      if (saved) setActivities(JSON.parse(saved));
      else setActivities([]);
    };

    window.addEventListener('activitiesUpdated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('activitiesUpdated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return { activities, logActivity, markAsRead, removeActivity, clearAllActivities };
}

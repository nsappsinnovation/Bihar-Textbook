import api from './api';

// "Just now", "5 minutes ago", "3 hours ago", "2 days ago"
const timeAgo = (isoDate) => {
    const minutes = Math.floor((Date.now() - new Date(isoDate).getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days === 1 ? '' : 's'} ago`;
};

// Backend activity → shape used by the Notifications page, navbar bell and dashboard
const toActivity = (a) => ({
    id: a.id,
    action: a.action,
    type: a.type,
    user: a.user,
    read: a.read,
    status: 'completed',
    link: null,
    time: timeAgo(a.createdAt),
    avatar: a.user.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase(),
});

export const getActivities = () => api.get('/api/admin/activities').then((res) => res.data.data.map(toActivity));

export const createActivity = (action, type) => api.post('/api/admin/activities', { action, type });

export const markActivityRead = (id) => api.patch(`/api/admin/activities/${id}/read`);

export const deleteActivity = (id) => api.delete(`/api/admin/activities/${id}`);

export const clearActivities = () => api.delete('/api/admin/activities');

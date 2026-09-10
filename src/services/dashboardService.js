import api from './api';

// Current year and the four before it, e.g. [2026, 2025, 2024, 2023, 2022]
export const recentYears = () => Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

// { counts, monthlyUploads, contentTypes, distribution } for the admin dashboard
export const getDashboard = (year) => api.get('/api/admin/dashboard', { params: { year } }).then((res) => res.data.data);

// 12 rows { month, monthName, distributed, target } for one year
export const getDistribution = (year) => api.get('/api/admin/distribution', { params: { year } }).then((res) => res.data.data);

// months: [{ month, distributed, target }]
export const saveDistribution = (year, months) =>
    api.put(`/api/admin/distribution/${year}`, { months }).then((res) => res.data.data);

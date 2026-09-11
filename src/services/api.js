import axios from 'axios';

// Set VITE_API_URL in .env (local) and in Vercel → Settings → Environment Variables (production)
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Shared client for BiharTextBookBackend. withCredentials sends the HttpOnly JWT cookie.
const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

// Files uploaded to the backend come back as "/uploads/...". Other paths
// (e.g. "/images/..." bundled with the frontend) are returned unchanged.
export const fileUrl = (path) =>
    typeof path === 'string' && path.startsWith('/uploads/') ? `${API_BASE_URL}${path}` : path;

// Readable error message from a failed request
export const errorMessage = (error, fallback = 'Something went wrong') =>
    error?.response?.data?.message || error?.response?.data?.error || fallback;

export default api;

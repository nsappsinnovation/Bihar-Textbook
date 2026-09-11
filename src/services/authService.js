import api, { saveAuthToken, clearAuthToken } from './api';

export const login = (email, password) =>
    api.post('/api/auth/login', { email, password }).then((res) => {
        saveAuthToken(res.data.token);
        return res;
    });

export const logout = () => api.post('/api/auth/logout').finally(clearAuthToken);

// Logged-in admin { id, email, fullName }. Throws (401) when not logged in.
export const getMe = () => api.get('/api/auth/me').then((res) => res.data.user);

// Full admin profile { id, fullName, email, phone, avatarUrl, createdAt }
export const getProfile = () => api.get('/api/auth/profile').then((res) => res.data.user);

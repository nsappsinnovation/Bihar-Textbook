import api from './api';

// Site-wide settings stored as key → value (value can be text or a JSON object).
// Public keys: dc-rti, md_message, csr_policy_content, csr_policy_doc, printer_registry_doc, site_config

// Returns the value, or `fallback` when the key has not been saved yet
export const getSetting = (key, fallback = null) =>
    api
        .get(`/api/settings/${key}`)
        .then((res) => res.data.data.value ?? fallback)
        .catch((error) => {
            if (error.response?.status === 404) return fallback;
            throw error;
        });

export const saveSetting = (key, value, category) =>
    api.put(`/api/admin/settings/${key}`, { value, category }).then((res) => res.data.data.value);

// PDF-backed settings (csr_policy_doc, printer_registry_doc). Returns the stored "/uploads/..." path.
export const uploadSettingFile = (key, file) => {
    const form = new FormData();
    form.append('file', file);
    return api.post(`/api/admin/settings/${key}/file`, form).then((res) => res.data.data.value);
};

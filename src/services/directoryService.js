import api from './api';

// People lists stored in the backend "directory" table.
// type: "leader" | "board_member" | "past_md" | "employee"
// Row fields: id, name, designation, department, tag, email, phone, photoUrl, tenureFrom, tenureTo, status, sortOrder

export const getDirectory = (type) => api.get(`/api/getDirectory/${type}`).then((res) => res.data.data);

export const createDirectoryRow = (type, row) =>
    api.post(`/api/admin/createDirectoryRow/${type}`, row).then((res) => res.data.data);

export const updateDirectoryRow = (type, id, row) =>
    api.patch(`/api/admin/updateDirectoryRow/${type}/${id}`, row).then((res) => res.data.data);

export const deleteDirectoryRow = (type, id) => api.delete(`/api/admin/deleteDirectoryRow/${type}/${id}`);

import api from "../api/api";

export const createApplication = (data) =>
  api.post("/applications", data);

export const getAllApplications = (params) =>
  api.get("/applications", { params });

export const getApplicationById = (id) =>
  api.get(`/applications/${id}`);

export const updateApplication = (id, data) =>
  api.patch(`/applications/${id}`, data);

export const deleteApplication = (id) =>
  api.delete(`/applications/${id}`);

export const getApplicationStats = () =>
  api.get("/applications/stats");

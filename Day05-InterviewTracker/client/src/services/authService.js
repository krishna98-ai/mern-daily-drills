import api from "../api/api";

export const loginUser = (data) =>
  api.post("/users/login", data);

export const registerUser = (data) =>
  api.post("/users/register", data);

export const logoutUser = () =>
  api.post("/users/logout");

export const getCurrentUser = () =>
  api.get("/users/me");


export const refreshAccessToken = () =>
  api.post("/users/refresh-token");

export const changePassword = (data) =>
  api.post("/users/change-password", data);
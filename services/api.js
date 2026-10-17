import axios from "axios";

export const API_BASE_URL = "https://curr-culo-express-teal.vercel.app";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const profileService = {
  getAll: async () => {
    const response = await api.get("/profiles");
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/profiles/${id}`);
    return response.data;
  },
};

export const academicService = {
  getByProfile: async (profileId) => {
    const response = await api.get(`/academic-experiences/profile/${profileId}`);
    return response.data;
  },
};

export const professionalService = {
  getByProfile: async (profileId) => {
    const response = await api.get(`/professional-experiences/profile/${profileId}`);
    return response.data;
  },
};

export const projectService = {
  getAll: async () => {
    const response = await api.get("/projects");
    return response.data;
  },
  getByProfile: async (profileId) => {
    const response = await api.get(`/projects/profile/${profileId}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post("/projects", data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },
};

export default api;

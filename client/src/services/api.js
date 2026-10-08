import axios from 'axios';
import { fallbackProjects } from '../data/fallbackProjects';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Helper for authorization headers
const getAuthHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Projects API
export const fetchProjects = async () => {
  try {
    const res = await api.get('/projects');
    if (res.data && res.data.success) {
      return res.data;
    }
    return { success: true, data: fallbackProjects };
  } catch (error) {
    console.warn('[API Warning] Projects endpoint unreachable, using fallback dataset');
    return { success: true, data: fallbackProjects, isFallback: true };
  }
};

export const createProjectApi = async (projectData, token) => {
  const res = await api.post('/projects', projectData, getAuthHeaders(token));
  return res.data;
};

export const updateProjectApi = async (id, projectData, token) => {
  const res = await api.put(`/projects/${id}`, projectData, getAuthHeaders(token));
  return res.data;
};

export const deleteProjectApi = async (id, token) => {
  const res = await api.delete(`/projects/${id}`, getAuthHeaders(token));
  return res.data;
};

// Contact API
export const sendContactMessage = async (formData) => {
  const res = await api.post('/contact', formData);
  return res.data;
};

export const fetchContactMessages = async (token) => {
  const res = await api.get('/contact', getAuthHeaders(token));
  return res.data;
};

export const deleteContactMessage = async (id, token) => {
  const res = await api.delete(`/contact/${id}`, getAuthHeaders(token));
  return res.data;
};

// Auth API
export const loginAdmin = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
};

export const getMe = async (token) => {
  const res = await api.get('/auth/me', getAuthHeaders(token));
  return res.data;
};

export default api;

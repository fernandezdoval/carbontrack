/**
 * API Service Layer
 * Handles all backend communication
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (add auth token when implemented)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (handle errors globally)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (logout)
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ===== Emission Calculations =====

export const calculateEmissions = async (data) => {
  const response = await api.post('/v1/calculate', data);
  return response.data;
};

export const getEmissionFactors = async () => {
  const response = await api.get('/v1/emission-factors');
  return response.data;
};

export const getEmissionFactorsByCategory = async (category) => {
  const response = await api.get(`/v1/emission-factors/${category}`);
  return response.data;
};

// ===== Authentication =====

export const register = async (userData) => {
  const response = await api.post('/v1/auth/register', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/v1/auth/login', credentials);
  if (response.data.token) {
    localStorage.setItem('auth_token', response.data.token);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('auth_token');
};

// ===== Organizations =====

export const getOrganization = async (id) => {
  const response = await api.get(`/v1/organizations/${id}`);
  return response.data;
};

export const updateOrganization = async (id, data) => {
  const response = await api.put(`/v1/organizations/${id}`, data);
  return response.data;
};

// ===== Activities =====

export const getActivities = async (params = {}) => {
  const response = await api.get('/v1/activities', { params });
  return response.data;
};

export const createActivity = async (activityData) => {
  const response = await api.post('/v1/activities', activityData);
  return response.data;
};

export const updateActivity = async (id, data) => {
  const response = await api.put(`/v1/activities/${id}`, data);
  return response.data;
};

export const deleteActivity = async (id) => {
  const response = await api.delete(`/v1/activities/${id}`);
  return response.data;
};

// ===== Emissions =====

export const getEmissions = async (params = {}) => {
  const response = await api.get('/v1/emissions', { params });
  return response.data;
};

export const getEmissionsSummary = async (params = {}) => {
  const response = await api.get('/v1/emissions/summary', { params });
  return response.data;
};

export const getEmissionsTrends = async (params = {}) => {
  const response = await api.get('/v1/emissions/trends', { params });
  return response.data;
};

// ===== Reports =====

export const generateReport = async (reportType, params = {}) => {
  const response = await api.post('/v1/reports/generate', {
    type: reportType,
    ...params,
  });
  return response.data;
};

export const downloadReport = async (reportId, format = 'pdf') => {
  const response = await api.get(`/v1/reports/${reportId}/download`, {
    params: { format },
    responseType: 'blob',
  });
  return response.data;
};

// ===== Recommendations =====

export const getRecommendations = async () => {
  const response = await api.get('/v1/recommendations');
  return response.data;
};

export const updateRecommendationStatus = async (id, status) => {
  const response = await api.patch(`/v1/recommendations/${id}`, { status });
  return response.data;
};

// ===== Targets =====

export const getTargets = async () => {
  const response = await api.get('/v1/targets');
  return response.data;
};

export const createTarget = async (targetData) => {
  const response = await api.post('/v1/targets', targetData);
  return response.data;
};

export const updateTarget = async (id, data) => {
  const response = await api.put(`/v1/targets/${id}`, data);
  return response.data;
};

export default api;

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors (only for protected routes)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect on 401 if it's not a login/register request
    const isAuthRequest = error.config?.url?.includes('/admin/login') ||
                          error.config?.url?.includes('/admin/register');

    if (error.response?.status === 401 && !isAuthRequest) {
      localStorage.removeItem('admin_token');
      window.location.href = '/admin';
    }
    return Promise.reject(error);
  }
);

export default api;

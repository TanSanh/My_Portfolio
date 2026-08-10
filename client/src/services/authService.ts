import api from './api';

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  email: string;
}

export interface AdminProfile {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
}

export const authService = {
  // Login
  login: async (data: LoginData) => {
    const response = await api.post('/admin/login', data);
    const { access_token } = response.data;
    localStorage.setItem('admin_token', access_token);
    return response.data;
  },

  // Register
  register: async (data: RegisterData) => {
    const response = await api.post('/admin/register', data);
    const { access_token } = response.data;
    localStorage.setItem('admin_token', access_token);
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('admin_token');
  },

  // Get profile
  getProfile: async () => {
    const response = await api.get('/admin/profile');
    return response.data as AdminProfile;
  },

  // Update profile
  updateProfile: async (data: { email?: string; username?: string }) => {
    const response = await api.put('/admin/profile', data);
    return response.data as AdminProfile;
  },

  // Check if logged in
  isLoggedIn: () => {
    return !!localStorage.getItem('admin_token');
  },
};

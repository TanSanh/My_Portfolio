import api from './api';

export interface LoginData {
  email: string;
  password: string;
}

export interface AdminProfile {
  _id: string;
  email: string;
  name: string;
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

  // NO REGISTER - Admin accounts created via seed script only

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
  updateProfile: async (data: { email?: string; name?: string }) => {
    const response = await api.put('/admin/profile', data);
    return response.data as AdminProfile;
  },

  // Change password
  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const response = await api.post('/admin/change-password', data);
    return response.data;
  },

  // Check if logged in
  isLoggedIn: () => {
    return !!localStorage.getItem('admin_token');
  },
};

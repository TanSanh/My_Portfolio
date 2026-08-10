import api from './api';

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface CreateContactData {
  name: string;
  email: string;
  message: string;
}

export const contactService = {
  // Public: Submit contact form
  submit: async (data: CreateContactData) => {
    const response = await api.post('/contact', data);
    return response.data;
  },

  // Admin: Get all messages
  getAll: async () => {
    const response = await api.get('/contact');
    return response.data as ContactMessage[];
  },

  // Admin: Get single message
  getById: async (id: string) => {
    const response = await api.get(`/contact/${id}`);
    return response.data as ContactMessage;
  },

  // Admin: Mark as read
  markAsRead: async (id: string) => {
    const response = await api.patch(`/contact/${id}/read`);
    return response.data as ContactMessage;
  },

  // Admin: Mark as unread
  markAsUnread: async (id: string) => {
    const response = await api.patch(`/contact/${id}/unread`);
    return response.data as ContactMessage;
  },

  // Admin: Delete message
  delete: async (id: string) => {
    const response = await api.delete(`/contact/${id}`);
    return response.data;
  },

  // Admin: Get unread count
  getUnreadCount: async () => {
    const response = await api.get('/contact/unread-count');
    return response.data as number;
  },
};

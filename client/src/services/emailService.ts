import api from './api';

export const emailService = {
  sendReply: async (to: string, subject: string, text: string) => {
    const response = await api.post('/email/send', { to, subject, text });
    return response.data;
  },
};

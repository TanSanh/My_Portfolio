import api from './api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001';

export const uploadService = {
  // Upload image
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Return full URL for the uploaded image
    const result = response.data;
    return {
      ...result,
      url: `${API_BASE_URL}${result.url}`,
    };
  },
};

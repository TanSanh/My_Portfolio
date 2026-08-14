import api from './api';

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

    // Cloudinary returns full URL, no need to prepend base URL
    return response.data;
  },
};

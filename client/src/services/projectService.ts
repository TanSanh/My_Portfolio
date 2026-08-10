import api from './api';

export interface Project {
  _id: string;
  title: { en: string; vi: string };
  description: { en: string; vi: string };
  image: string;
  technologies: string[];
  link: string;
  github: string;
  featured: boolean;
  order: number;
  createdAt: string;
}

export interface CreateProjectData {
  title: { en: string; vi: string };
  description: { en: string; vi: string };
  image?: string;
  technologies?: string[];
  link?: string;
  github?: string;
  featured?: boolean;
  order?: number;
}

export const projectService = {
  // Public: Get all projects
  getAll: async () => {
    const response = await api.get('/projects');
    return response.data as Project[];
  },

  // Public: Get single project
  getById: async (id: string) => {
    const response = await api.get(`/projects/${id}`);
    return response.data as Project;
  },

  // Admin: Create project
  create: async (data: CreateProjectData) => {
    const response = await api.post('/projects', data);
    return response.data as Project;
  },

  // Admin: Update project
  update: async (id: string, data: Partial<CreateProjectData>) => {
    const response = await api.put(`/projects/${id}`, data);
    return response.data as Project;
  },

  // Admin: Delete project
  delete: async (id: string) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },
};

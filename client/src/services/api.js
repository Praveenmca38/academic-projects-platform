import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Projects API
export const projectAPI = {
  // Get all projects with filters
  getAllProjects: (params) => api.get('/projects', { params }),

  // Get single project
  getProjectById: (id) => api.get(`/projects/${id}`),

  // Create new project
  createProject: (data) => api.post('/projects', data),

  // Update project
  updateProject: (id, data) => api.put(`/projects/${id}`, data),

  // Delete project
  deleteProject: (id) => api.delete(`/projects/${id}`),

  // Get projects by domain
  getProjectsByDomain: (domain, params) =>
    api.get(`/projects/domain/${domain}`, { params }),

  // Search projects
  searchProjects: (query, params) =>
    api.get('/projects/search', { params: { q: query, ...params } }),

  // Get statistics
  getStats: () => api.get('/projects/stats'),
};

// Health check
export const checkHealth = () => api.get('/health');

export default api;

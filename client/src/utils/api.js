import axios from 'axios';

// Use different API base URL for development vs production
const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:5000/api'  // Development: separate server
  : '/api';  // Production: same domain

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const cardAPI = {
  getAll: () => api.get('/cards'),
  getById: (id) => api.get(`/cards/${id}`),
};

export const commentAPI = {
  getByCardId: (cardId) => api.get(`/comments/${cardId}`),
  create: (data) => api.post('/comments', data),
  getRecent: () => api.get('/comments'),
};
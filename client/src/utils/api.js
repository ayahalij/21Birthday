import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

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
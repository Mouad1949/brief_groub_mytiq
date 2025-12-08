// src/services/api.js
import axios from 'axios';

// Créer une instance Axios avec la configuration de base
const API = axios.create({
  baseURL: 'http://localhost:8000/api', // URL de votre backend Laravel
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Intercepteur pour ajouter automatiquement le token d'authentification
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Gestion des erreurs
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Rediriger vers la page de login si non authentifié
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Fonctions pour les événements - CORRIGÉ
export const eventAPI = {
  getAll: () => API.get('/evenements'),
  getById: (id) => API.get(`/evenements/${id}/show`),
  create: (data) => API.post('/evenements/create', data),
  update: (id, data) => API.put(`/evenements/${id}/edit`, data),
  delete: (id) => API.delete(`/evenements/${id}/delete`)
};

// Fonctions pour les tickets
export const ticketAPI = {
  purchase: (eventId) => API.post('/tickets', { event_id: eventId }),
  getUserTickets: () => API.get('/tickets'),
  getEventTickets: (eventId) => API.get(`/evenements/${eventId}/tickets`),
  downloadPdf: (ticketId) => API.get(`/tickets/${ticketId}/download`, { 
    responseType: 'blob'
  })
};

// Fonctions pour l'authentification - CORRIGÉ
export const authAPI = {
  register: (userData) => API.post('/users/register', userData),
  login: (credentials) => API.post('/users/login', credentials),
  logout: () => API.post('/users/logout'),
  getUser: () => API.get('/user')
};

// Fonctions pour la newsletter
export const newsletterAPI = {
  subscribe: (email) => API.post('/newsletter/subscribe', { email }),
  unsubscribe: (email) => API.post('/newsletter/unsubscribe', { email })
};

export default API;
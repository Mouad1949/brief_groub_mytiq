// This file helps us talk to the backend server
// Think of it as a phone book - it has all the numbers (URLs) we need to call

import axios from 'axios';

// Where our Laravel backend lives
const API_URL = 'http://127.0.0.1:8000/api';

// Get the user's login token from browser storage
function getToken() {
  return localStorage.getItem('auth_token');
}

// Add token to requests (needed for admin actions)
function getAuthHeaders() {
  const token = getToken();
  return {
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json'
  };
}

// === EVENTS ===
// Functions to work with events

export const eventAPI = {
  
  // Get all events from database
  getAll: async () => {
    const response = await axios.get(`${API_URL}/evenements`);
    return response;
  },

  // Get one specific event by its ID
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/evenements/${id}/show`);
    return response;
  },

  // Create a new event (admin only)
  create: async (eventData) => {
    const response = await axios.post(`${API_URL}/evenements/create`, eventData, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data' // Important for image upload
      }
    });
    return response;
  },

  // Update an event (admin only)
  update: async (id, eventData) => {
    const response = await axios.put(`${API_URL}/evenements/${id}/edit`, eventData, {
      headers: getAuthHeaders()
    });
    return response;
  },

  // Delete an event (admin only)
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/evenements/${id}/delete`, {
      headers: getAuthHeaders()
    });
    return response;
  }
};

// === TICKETS ===
// Functions to work with tickets

export const ticketAPI = {
  
  // Get all tickets (admin only)
  getAll: async () => {
    const response = await axios.get(`${API_URL}/tickets`, {
      headers: getAuthHeaders()
    });
    return response;
  },

  // Get tickets for a specific event
  getEventTickets: async (eventId) => {
    const response = await axios.get(`${API_URL}/events/${eventId}/tickets`, {
      headers: getAuthHeaders()
    });
    return response;
  },

  // Buy a ticket (users)
  buy: async (ticketData) => {
    const response = await axios.post(`${API_URL}/tickets`, ticketData, {
      headers: getAuthHeaders()
    });
    return response;
  }
};

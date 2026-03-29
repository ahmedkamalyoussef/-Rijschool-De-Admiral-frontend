import api from './api';

export const contactService = {
  // Public endpoint
  createContact: (contactData) => api.post('/api/v1/contact', contactData),
  
  // Admin endpoints
  getAllContacts: () => api.get('/api/v1/contact'),
  getContactById: (id) => api.get(`/api/v1/contact/${id}`),
  updateContactStatus: (id, statusData) => api.put(`/api/v1/contact/${id}/status`, statusData),
  deleteContact: (id) => api.delete(`/api/v1/contact/${id}`),
  getContactStats: () => api.get('/api/v1/contact/stats'),
};

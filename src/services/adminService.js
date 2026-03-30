import api from './api';

export const adminService = {
  // Authentication endpoints
  register: (adminData) => api.post('/api/v1/admin/register', adminData),
  login: (credentials) => api.post('/api/v1/admin/login', credentials),
  verifyOTP: (otpData) => api.post('/api/v1/admin/verify-otp', otpData),
  resendOTP: (email) => api.post('/api/v1/admin/resend-otp', { email }),
  forgotPassword: (email) => api.post('/api/v1/admin/forgot-password', { email }),
  resetPassword: (resetData) => api.post('/api/v1/admin/reset-password', resetData),
  
  // Profile management
  getProfile: () => api.get('/api/v1/admin/profile'),
  updateProfile: (profileData) => api.put('/api/v1/admin/profile', profileData),
  changePassword: (passwordData) => api.post('/api/v1/admin/change-password', passwordData),
  updateImage: (imageData) => {
    const formData = new FormData();
    formData.append('image', imageData);
    return api.put('/api/v1/admin/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Dashboard endpoints
  getDashboardStats: () => api.get('/api/v1/dashboard/stats'),

  // Packages endpoints
  getPackages: () => api.get('/api/v1/packages'),
  getPackageById: (id) => api.get(`/api/v1/packages/${id}`),
  createPackage: (packageData) => {
    const formData = new FormData();
    Object.keys(packageData).forEach(key => {
      if (key === 'image') {
        formData.append('image', packageData[key]);
      } else {
        formData.append(key, packageData[key]);
      }
    });
    return api.post('/api/v1/packages', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  updatePackage: (id, packageData) => {
    const formData = new FormData();
    Object.keys(packageData).forEach(key => {
      if (key === 'image') {
        formData.append('image', packageData[key]);
      } else {
        formData.append(key, packageData[key]);
      }
    });
    return api.put(`/api/v1/packages/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  deletePackage: (id) => api.delete(`/api/v1/packages/${id}`),
  togglePackageStatus: (id) => api.patch(`/api/v1/packages/${id}/toggle`),

  // Posts endpoints
  getPosts: () => api.get('/api/v1/posts'),
  getPostById: (id) => api.get(`/api/v1/posts/${id}`),
  createPost: (postData) => {
    const formData = new FormData();
    Object.keys(postData).forEach(key => {
      if (key === 'image') {
        formData.append('image', postData[key]);
      } else {
        formData.append(key, postData[key]);
      }
    });
    return api.post('/api/v1/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  updatePost: (id, postData) => {
    const formData = new FormData();
    Object.keys(postData).forEach(key => {
      if (key === 'image') {
        formData.append('image', postData[key]);
      } else {
        formData.append(key, postData[key]);
      }
    });
    return api.put(`/api/v1/posts/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  deletePost: (id) => api.delete(`/api/v1/posts/${id}`),
  getPostsByRating: (stars) => api.get(`/api/v1/posts/rating/${stars}`),

  // Contact/Messages endpoints
  getContacts: () => api.get('/api/v1/contact'),
  getContactById: (id) => api.get(`/api/v1/contact/${id}`),
  updateContactStatus: (id, status) => api.put(`/api/v1/contact/${id}/status`, { status }),
  deleteContact: (id) => api.delete(`/api/v1/contact/${id}`),
  getContactStats: () => api.get('/api/v1/contact/stats'),
  createContact: (contactData) => api.post('/api/v1/contact', contactData),

  // Public endpoints (for website)
  getPublicPackages: () => api.get('/api/v1/packages/public'),
  getPublicPosts: () => api.get('/api/v1/posts/public'),
};

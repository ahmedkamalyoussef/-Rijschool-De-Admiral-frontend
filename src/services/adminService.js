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
};

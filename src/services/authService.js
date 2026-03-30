import api from './api';

// API ENDPOINTS REFERENCE - Backend Authentication Routes
// Base URL: /api/v1/admin
//
// PUBLIC ENDPOINTS:
// POST /register - Register new admin
// POST /login - Login admin (sends OTP)
// POST /verify-otp - Verify OTP for login/register
// POST /resend-otp - Resend OTP
// POST /forgot-password - Send password reset OTP
// POST /reset-password - Reset password with OTP
//
// PROTECTED ENDPOINTS (require Bearer token):
// GET /profile - Get admin profile
// PUT /profile - Update admin profile
// POST /change-password - Change password (authenticated)
// PUT /image - Update admin image

/**
 * Register a new admin
 * @param {Object} data - { firstName, lastName, email, password }
 * @returns {Promise} Response with admin data
 */
export const registerAdmin = async (data) => {
  try {
    const response = await api.post('/api/v1/admin/register', data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'فشل في التسجيل';
    throw { message: errorMessage, originalError: error };
  }
};

/**
 * Login admin (sends OTP to email)
 * @param {Object} data - { email, password }
 * @returns {Promise} Response indicating OTP sent
 */
export const loginAdmin = async (data) => {
  try {
    const response = await api.post('/api/v1/admin/login', data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'فشل في تسجيل الدخول';
    throw { message: errorMessage, originalError: error };
  }
};

/**
 * Verify OTP for login/register/forgot password
 * @param {Object} data - { email, otp, type }
 * @returns {Promise} Response with token and admin data
 */
export const verifyOTP = async (data) => {
  try {
    const response = await api.post('/api/v1/admin/verify-otp', data);
    
    // Store token if verification successful
    if (response.data.status && response.data.data.token) {
      localStorage.setItem('adminToken', response.data.data.token);
    }
    
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'فشل في التحقق من كود التأكيد';
    throw { message: errorMessage, originalError: error };
  }
};

/**
 * Resend OTP for various operations
 * @param {Object} data - { email, type }
 * @returns {Promise} Response indicating OTP resent
 */
export const resendOTP = async (data) => {
  try {
    const response = await api.post('/api/v1/admin/resend-otp', data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'فشل في إعادة إرسال كود التأكيد';
    throw { message: errorMessage, originalError: error };
  }
};

/**
 * Send forgot password OTP
 * @param {Object} data - { email }
 * @returns {Promise} Response indicating OTP sent
 */
export const forgotPassword = async (data) => {
  try {
    const response = await api.post('/api/v1/admin/forgot-password', data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'فشل في إرسال كود استعادة كلمة المرور';
    throw { message: errorMessage, originalError: error };
  }
};

/**
 * Reset password with OTP verification
 * @param {Object} data - { email, otp, newPassword, confirmPassword }
 * @returns {Promise} Response indicating password reset
 */
export const resetPassword = async (data) => {
  try {
    const response = await api.post('/api/v1/admin/reset-password', data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'فشل في استعادة كلمة المرور';
    throw { message: errorMessage, originalError: error };
  }
};

/**
 * Get admin profile (protected)
 * @returns {Promise} Response with admin profile data
 */
export const getProfile = async () => {
  try {
    const response = await api.get('/api/v1/admin/profile');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'فشل في جلب بيانات الملف الشخصي';
    throw { message: errorMessage, originalError: error };
  }
};

/**
 * Update admin profile (protected)
 * @param {Object} data - { firstName, lastName }
 * @returns {Promise} Response with updated admin data
 */
export const updateProfile = async (data) => {
  try {
    const response = await api.put('/api/v1/admin/profile', data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'فشل في تحديث الملف الشخصي';
    throw { message: errorMessage, originalError: error };
  }
};

/**
 * Change password (protected)
 * @param {Object} data - { currentPassword, newPassword, confirmPassword }
 * @returns {Promise} Response indicating password changed
 */
export const changePassword = async (data) => {
  try {
    const response = await api.post('/api/v1/admin/change-password', data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'فشل في تغيير كلمة المرور';
    throw { message: errorMessage, originalError: error };
  }
};

/**
 * Update admin image (protected)
 * @param {FormData} formData - FormData with image file
 * @returns {Promise} Response with updated admin data
 */
export const updateAdminImage = async (formData) => {
  try {
    const response = await api.put('/api/v1/admin/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'فشل في تحديث الصورة الشخصية';
    throw { message: errorMessage, originalError: error };
  }
};

/**
 * Logout admin
 * @returns {void}
 */
export const logout = () => {
  localStorage.removeItem('adminToken');
  window.location.href = '/login';
};

/**
 * Check if admin is authenticated
 * @returns {boolean} True if token exists
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('adminToken');
};

/**
 * Get current admin token
 * @returns {string|null} JWT token
 */
export const getToken = () => {
  return localStorage.getItem('adminToken');
};

// Export all authentication services
export default {
  registerAdmin,
  loginAdmin,
  verifyOTP,
  resendOTP,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
  changePassword,
  updateAdminImage,
  logout,
  isAuthenticated,
  getToken,
};

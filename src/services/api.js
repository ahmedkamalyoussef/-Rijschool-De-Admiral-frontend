import axios from 'axios';

// Base URL configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only redirect if not already on login page
      if (!window.location.pathname.includes('/login')) {
        localStorage.removeItem('adminToken');
        window.location.href = '/login';
      }
    }
    
    // Enhanced error messages in Arabic
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const originalMessage = error.response.data?.message;
      
      switch (status) {
        case 400:
          error.message = originalMessage || 'بيانات غير صالحة';
          break;
        case 401:
          error.message = originalMessage || 'غير مصرح بالوصول، يرجى تسجيل الدخول';
          break;
        case 403:
          error.message = originalMessage || 'ممنوع الوصول';
          break;
        case 404:
          error.message = originalMessage || 'المورد غير موجود';
          break;
        case 429:
          error.message = originalMessage || 'طلبات كثيرة جداً، يرجى المحاولة لاحقاً';
          break;
        case 500:
          error.message = originalMessage || 'خطأ في الخادم الداخلي';
          break;
        default:
          error.message = originalMessage || 'حدث خطأ غير متوقع';
      }
    } else if (error.request) {
      // Request made but no response received
      error.message = 'لا يمكن الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت';
    } else {
      // Something else happened
      error.message = 'حدث خطأ أثناء إعداد الطلب';
    }
    
    return Promise.reject(error);
  }
);

export default api;

// Export base URL for use in other components
export { API_BASE_URL };

/**
 * Get full image URL from relative path or return as-is if already full URL
 * @param {string} imageUrl - The image URL from API (can be relative or absolute)
 * @returns {string} Full image URL
 */
export function getImageUrl(imageUrl) {
  if (!imageUrl) return null;
  
  // If already full URL, return as-is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Clean up legacy 'src/' prefix
  const cleanPath = imageUrl.replace(/^src\//, '');
  
  // Ensure path starts with /
  const normalizedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  
  return `${API_BASE_URL}${normalizedPath}`;
}

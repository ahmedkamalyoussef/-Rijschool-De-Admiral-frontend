import { useDispatch } from 'react-redux';
import {
  loginAdmin,
  registerAdmin,
  getAdminProfile,
  updateAdminProfile,
} from '../store/slices/adminSlice';
import {
  fetchPackages,
  fetchPublicPackages,
  createPackage,
  updatePackage,
  deletePackage,
  togglePackageStatus,
} from '../store/slices/packageSlice';
import {
  fetchPosts,
  fetchPublicPosts,
  createPost,
  updatePost,
  deletePost,
} from '../store/slices/postSlice';
import {
  fetchContacts,
  createContact,
  updateContactStatus,
  deleteContact,
  fetchContactStats,
} from '../store/slices/contactSlice';

// Custom hook for API operations
export const useApiActions = () => {
  const dispatch = useDispatch();

  // Admin operations
  const adminActions = {
    login: (credentials) => dispatch(loginAdmin(credentials)),
    register: (adminData) => dispatch(registerAdmin(adminData)),
    getProfile: () => dispatch(getAdminProfile()),
    updateProfile: (profileData) => dispatch(updateAdminProfile(profileData)),
  };

  // Package operations
  const packageActions = {
    getAll: () => dispatch(fetchPackages()),
    getPublic: () => dispatch(fetchPublicPackages()),
    create: (packageData) => dispatch(createPackage(packageData)),
    update: (id, packageData) => dispatch(updatePackage({ id, packageData })),
    delete: (id) => dispatch(deletePackage(id)),
    toggleStatus: (id) => dispatch(togglePackageStatus(id)),
  };

  // Post operations
  const postActions = {
    getAll: () => dispatch(fetchPosts()),
    getPublic: () => dispatch(fetchPublicPosts()),
    create: (postData) => dispatch(createPost(postData)),
    update: (id, postData) => dispatch(updatePost({ id, postData })),
    delete: (id) => dispatch(deletePost(id)),
  };

  // Contact operations
  const contactActions = {
    getAll: () => dispatch(fetchContacts()),
    create: (contactData) => dispatch(createContact(contactData)),
    updateStatus: (id, statusData) => dispatch(updateContactStatus({ id, statusData })),
    delete: (id) => dispatch(deleteContact(id)),
    getStats: () => dispatch(fetchContactStats()),
  };

  return {
    adminActions,
    packageActions,
    postActions,
    contactActions,
  };
};

// Helper functions for form data preparation
export const prepareFormData = (data, imageField = 'image') => {
  const formData = new FormData();
  
  Object.keys(data).forEach(key => {
    if (key === imageField && data[key] instanceof File) {
      formData.append(imageField, data[key]);
    } else if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });
  
  return formData;
};

// Error handling helper
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data.message || 'Server error occurred',
      status: error.response.status,
      data: error.response.data,
    };
  } else if (error.request) {
    // Request was made but no response received
    return {
      message: 'Network error. Please check your connection.',
      status: null,
      data: null,
    };
  } else {
    // Something else happened
    return {
      message: error.message || 'An unexpected error occurred',
      status: null,
      data: null,
    };
  }
};

// Success message helper
export const handleApiSuccess = (response, customMessage = null) => {
  return {
    message: customMessage || response.data.message || 'Operation successful',
    data: response.data,
    status: response.status,
  };
};

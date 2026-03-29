import api from './api';

export const packageService = {
  // Public endpoints
  getPublicPackages: () => api.get('/api/v1/packages/public'),
  getPackageById: (id) => api.get(`/api/v1/packages/${id}`),
  
  // Admin endpoints
  getAllPackages: () => api.get('/api/v1/packages'),
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
};

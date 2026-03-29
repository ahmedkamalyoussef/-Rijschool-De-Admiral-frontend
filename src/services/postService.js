import api from './api';

export const postService = {
  // Public endpoints
  getPublicPosts: () => api.get('/api/v1/posts/public'),
  getPostById: (id) => api.get(`/api/v1/posts/${id}`),
  getPostsByRating: (stars) => api.get(`/api/v1/posts/rating/${stars}`),
  
  // Admin endpoints
  getAllPosts: () => api.get('/api/v1/posts'),
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
};

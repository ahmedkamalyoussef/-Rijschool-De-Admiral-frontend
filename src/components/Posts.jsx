import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { postService } from '../services/postService';
import wheel from '../assets/wheel.png';
import hero from '../assets/hero.png';
import unnamed from '../assets/unnamed.png';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    descriptionNl: '',
    descriptionAr: '',
    stars: 5,
    image: null,
    isTestimonial: false
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await postService.getAllPosts();
      console.log('API Response:', response); // Debug log
      console.log('Response data:', response.data); // Debug the actual data
      // Handle the backend response format: {status: true, data: [...]}
      const postsData = response?.data?.data || [];
      console.log('Posts data:', postsData); // Debug the posts array
      setPosts(postsData);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingPost) {
        // Update existing post
        await postService.updatePost(editingPost.id, formData);
      } else {
        // Create new post
        await postService.createPost(formData);
      }

      // Refresh posts list
      await fetchPosts();

      // Reset form
      setShowCreateModal(false);
      setEditingPost(null);
      setFormData({
        fullName: '',
        descriptionNl: '',
        descriptionAr: '',
        stars: 5,
        image: null,
        isTestimonial: false
      });
    } catch (error) {
      console.error('Error saving post:', error);
      alert(error.message || 'Failed to save post');
    }
  };

  const deletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postService.deletePost(postId);
        await fetchPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
        alert(error.message || 'Failed to delete post');
      }
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      general: 'bg-blue-500/20 text-blue-400',
      educational: 'bg-green-500/20 text-green-400',
      news: 'bg-orange-500/20 text-orange-400',
      fleet: 'bg-purple-500/20 text-purple-400'
    };
    return colors[category] || colors.general;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span 
        key={i} 
        className={`material-symbols-outlined text-sm ${
          i < rating ? 'text-yellow-400' : 'text-gray-400'
        }`}
      >
        star
      </span>
    ));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const getImageUrl = (post) => {
    console.log('Post image URL:', post.imageUrl); // Debug log
    if (post.imageUrl) {
      // Remove 'src/' prefix if present and use /uploads endpoint
      const cleanPath = post.imageUrl.replace('src/', '');
      const imageUrl = post.imageUrl.startsWith('http') 
        ? post.imageUrl 
        : `http://localhost:5000/${cleanPath}`;
      console.log('Constructed image URL:', imageUrl); // Debug log
      return imageUrl;
    }
    // Fallback to placeholder images
    console.log('Using placeholder image'); // Debug log
    return [hero, unnamed, wheel][Math.floor(Math.random() * 3)];
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-white text-xl">Posts Laden...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <div className="text-red-400 text-xl">{error}</div>
          <button 
            onClick={fetchPosts}
            className="bg-linear-to-r from-[#b03500] to-[#f64c01] text-white px-6 py-3 rounded-xl font-bold"
          >
            Opnieuw Proberen
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Posts Content */}
      <div className="p-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 sm:text-3xl">Post Beheer</h2>
            <p className="text-white/70 text-sm sm:text-base">Beheer educatieve content en updates</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-linear-to-r from-[#b03500] to-[#f64c01] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-[#f64c01]/30 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <span className="material-symbols-outlined">add</span>
            Creëer Post
          </button>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6">
          {Array.isArray(posts) && posts.map((post) => (
            <div key={post.id} className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden group hover:border-[#f64c01]/50 transition-all">
              <div className="h-48 overflow-hidden">
                <img 
                  src={getImageUrl(post)} 
                  alt={post.fullName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = [hero, unnamed, wheel][Math.floor(Math.random() * 3)];
                  }}
                />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded text-xs font-bold bg-blue-500/20 text-blue-400">
                      Post
                    </span>
                    {post.isTestimonial && (
                      <span className="px-2 py-1 rounded text-xs font-bold bg-green-500/20 text-green-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">star</span>
                        Testimonial
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(post.stars)}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#f64c01] transition-colors">
                  {post.fullName}
                </h3>
                
                <p className="text-white/70 text-sm mb-4 line-clamp-3">
                  {post.descriptionNl || post.descriptionAr}
                </p>
                
                <div className="flex items-center justify-between text-white/50 text-xs mb-4">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    {new Date(post.timestamp).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setEditingPost(post);
                      setFormData({
                        fullName: post.fullName,
                        descriptionNl: post.descriptionNl || '',
                        descriptionAr: post.descriptionAr || '',
                        stars: post.stars,
                        image: null,
                        isTestimonial: post.isTestimonial || false
                      });
                      setShowCreateModal(true);
                    }}
                    className="flex-1 bg-white/10 text-white py-2 rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined">edit</span>
                    Bewerken
                  </button>
                  <button 
                    onClick={() => deletePost(post.id)}
                    className="bg-red-500/20 text-red-400 px-3 py-2 rounded-lg hover:bg-red-500/30 transition-all"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {Array.isArray(posts) && posts.length === 0 && (
            <div className="col-span-full text-center py-12">
              <span className="material-symbols-outlined text-6xl text-white/20 mb-4">article</span>
              <p className="text-white/60 text-xl mb-4">Nog geen posts</p>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="bg-linear-to-r from-[#b03500] to-[#f64c01] text-white px-6 py-3 rounded-xl font-bold"
              >
                Creëer Eerste Post
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {editingPost ? 'Bewerk Post' : 'Creëer Post'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Post Titel</label>
                <input
                  type="text"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-[#b03500] focus:ring-2 focus:ring-[#b03500]/20 outline-none"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Beschrijving (Nederlands)</label>
                <textarea
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-[#b03500] focus:ring-2 focus:ring-[#b03500]/20 outline-none"
                  rows={4}
                  value={formData.descriptionNl}
                  onChange={(e) => setFormData({...formData, descriptionNl: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Beschrijving (Arabisch)</label>
                <textarea
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-[#b03500] focus:ring-2 focus:ring-[#b03500]/20 outline-none"
                  rows={4}
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData({...formData, descriptionAr: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Afbeelding</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-[#b03500] focus:ring-2 focus:ring-[#b03500]/20 outline-none"
                />
                {formData.image && (
                  <p className="mt-2 text-sm text-gray-600">
                    Geselecteerd: {formData.image.name}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Beoordeling</label>
                <select
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-[#b03500] focus:ring-2 focus:ring-[#b03500]/20 outline-none"
                  value={formData.stars}
                  onChange={(e) => setFormData({...formData, stars: parseInt(e.target.value)})}
                >
                  <option value={5}>5 Sterren</option>
                  <option value={4}>4 Sterren</option>
                  <option value={3}>3 Sterren</option>
                  <option value={2}>2 Sterren</option>
                  <option value={1}>1 Ster</option>
                </select>
              </div>
              
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.isTestimonial}
                    onChange={(e) => setFormData({...formData, isTestimonial: e.target.checked})}
                    className="rounded border-gray-300 text-[#b03500] focus:ring-[#b03500]"
                  />
                  Toon in Testimonials (Homepage)
                </label>
                <p className="mt-1 text-xs text-gray-500">
                  Selecteer deze post om weer te geven in de testimonials sectie op de homepage
                </p>
              </div>
              
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingPost(null);
                    setFormData({
                      fullName: '',
                      descriptionNl: '',
                      descriptionAr: '',
                      stars: 5,
                      image: null,
                      isTestimonial: false
                    });
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all"
                >
                  Annuleer
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-linear-to-r from-[#b03500] to-[#f64c01] text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-[#f64c01]/30 transition-all"
                >
                  {editingPost ? 'Update Post' : 'Creëer Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Posts;

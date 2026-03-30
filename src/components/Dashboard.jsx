import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { adminService } from '../services/adminService';
import wheel from '../assets/wheel.png';
import hero from '../assets/hero.png';
import unnamed from '../assets/unnamed.png';

const Dashboard = () => {
  const [stats, setStats] = useState({
    packages: { total: 0, active: 0, inactive: 0 },
    posts: { total: 0, avgRating: 0 },
    contacts: { total: 0, pending: 0, unread: 0 }
  });
  const [contacts, setContacts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminService.getDashboardStats();
      console.log('Dashboard API Response:', response);
      
      if (response?.data?.status) {
        const dashboardData = response.data.data;
        setStats(dashboardData);
        setContacts(dashboardData.recentActivity?.contacts || []);
        setPosts(dashboardData.recentActivity?.posts || []);
      } else {
        throw new Error('Failed to fetch dashboard data');
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (post) => {
    if (post.image) {
      // Remove 'src/' prefix if present and use /uploads endpoint
      const cleanPath = post.image.replace('src/', '');
      const imageUrl = post.image.startsWith('http') 
        ? post.image 
        : `http://localhost:5000/${cleanPath}`;
      return imageUrl;
    }
    // Fallback to placeholder images
    return [hero, unnamed, wheel][Math.floor(Math.random() * 3)];
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-white text-xl">Dashboard Laden...</div>
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
            onClick={fetchDashboardData}
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
      {/* Dashboard Content */}
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Dashboard Overzicht</h1>
          <p className="text-white/70 text-sm sm:text-base">Beheer uw rijschool operaties vanaf hier</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#f64c01]/20 rounded-lg">
                <span className="material-symbols-outlined text-[#f64c01] text-2xl">inventory_2</span>
              </div>
              <span className="text-xs font-bold text-green-400 px-2 py-1 bg-green-400/20 rounded">Actief</span>
            </div>
            <h3 className="text-white/70 text-sm font-medium mb-1">Totaal Pakketten</h3>
            <p className="text-3xl font-bold text-white">{stats.packages?.total || 0}</p>
            <p className="text-sm text-white/60 mt-1">{stats.packages?.active || 0} actief</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <span className="material-symbols-outlined text-blue-400 text-2xl">article</span>
              </div>
            </div>
            <h3 className="text-white/70 text-sm font-medium mb-1">Posts</h3>
            <p className="text-3xl font-bold text-white">{stats.posts?.total || 0}</p>
            <p className="text-sm text-white/60 mt-1">⭐ {stats.posts?.avgRating || 0} avg</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <span className="material-symbols-outlined text-orange-400 text-2xl">chat</span>
              </div>
              {stats.contacts?.unread > 0 && (
                <span className="text-xs font-bold text-[#f64c01] px-2 py-1 bg-[#f64c01]/20 rounded">
                  {stats.contacts?.unread || 0} NIEUW
                </span>
              )}
            </div>
            <h3 className="text-white/70 text-sm font-medium mb-1">Berichten</h3>
            <p className="text-3xl font-bold text-white">{stats.contacts?.total || 0}</p>
            <p className="text-sm text-white/60 mt-1">{stats.contacts?.pending || 0} wachtend</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Recent Contacts */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <div className="p-6 border-b border-white/20">
              <h3 className="text-xl font-bold text-white">Recente Berichten</h3>
            </div>
            <div className="p-6 space-y-4">
              {contacts.map((contact) => (
                <div key={contact.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-[#f64c01] flex items-center justify-center shrink-0">
                    <span className="text-white font-bold">
                      {contact.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{contact.name}</p>
                    <p className="text-white/60 text-sm truncate">{contact.subject}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-bold shrink-0 ${
                    contact.status === 'new' 
                      ? 'bg-[#f64c01]/20 text-[#f64c01]' 
                      : 'bg-white/10 text-white/60'
                  }`}>
                    {contact.status || 'new'}
                  </span>
                </div>
              ))}
              {contacts.length === 0 && (
                <p className="text-white/60 text-center py-8">Nog geen berichten</p>
              )}
            </div>
          </div>

          {/* Recent Posts */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <div className="p-6 border-b border-white/20">
              <h3 className="text-xl font-bold text-white">Recente Posts</h3>
            </div>
            <div className="p-6 space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                  <div className="w-16 h-12 rounded bg-white/10 overflow-hidden shrink-0">
                    {post.image && (
                      <img src={getImageUrl(post)} alt={post.title} className="w-full h-full object-cover" 
                        onError={(e) => {
                          e.target.src = [hero, unnamed, wheel][Math.floor(Math.random() * 3)];
                        }}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{post.title}</p>
                    <p className="text-white/60 text-sm truncate">{post.content}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="material-symbols-outlined text-yellow-400 text-sm">star</span>
                    <span className="text-white text-sm">{post.rating || 5}</span>
                  </div>
                </div>
              ))}
              {posts.length === 0 && (
                <p className="text-white/60 text-center py-8">Nog geen posts</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;

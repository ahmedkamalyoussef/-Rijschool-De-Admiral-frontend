import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import wheel from '../assets/wheel.png';
import hero from '../assets/hero.png';
import unnamed from '../assets/unnamed.png';

const Dashboard = () => {
  const [stats, setStats] = useState({
    packages: 12,
    posts: 28,
    contacts: 45,
    unreadContacts: 7
  });
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Ahmed Mohamed',
      subject: 'Information about driving lessons',
      status: 'new'
    },
    {
      id: 2,
      name: 'Fatima Al-Rashid',
      subject: 'Package pricing inquiry',
      status: 'read'
    },
    {
      id: 3,
      name: 'Youssef Hassan',
      subject: 'Book driving test appointment',
      status: 'new'
    }
  ]);
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'New Driving Course Available',
      content: 'We are excited to announce our new advanced driving course with experienced instructors.',
      image: hero,
      rating: 5
    },
    {
      id: 2,
      title: 'Summer Special Discount',
      content: 'Get 20% off on all driving packages this summer. Limited time offer!',
      image: unnamed,
      rating: 4
    },
    {
      id: 3,
      title: 'Pass Your Driving Test First Time',
      content: 'Our success rate speaks for itself. Join us and become a confident driver.',
      image: wheel,
      rating: 5
    }
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-white text-xl">Loading Dashboard...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Dashboard Content */}
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2 sm:text-3xl">Dashboard Overview</h2>
          <p className="text-white/70 text-sm sm:text-base">Manage your rijschool operations from here</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#f64c01]/20 rounded-lg">
                <span className="material-symbols-outlined text-[#f64c01] text-2xl">inventory_2</span>
              </div>
              <span className="text-xs font-bold text-green-400 px-2 py-1 bg-green-400/20 rounded">Active</span>
            </div>
            <h3 className="text-white/70 text-sm font-medium mb-1">Total Packages</h3>
            <p className="text-3xl font-bold text-white">{stats.packages}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <span className="material-symbols-outlined text-blue-400 text-2xl">article</span>
              </div>
            </div>
            <h3 className="text-white/70 text-sm font-medium mb-1">Total Posts</h3>
            <p className="text-3xl font-bold text-white">{stats.posts}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <span className="material-symbols-outlined text-orange-400 text-2xl">chat</span>
              </div>
              {stats.unreadContacts > 0 && (
                <span className="text-xs font-bold text-[#f64c01] px-2 py-1 bg-[#f64c01]/20 rounded">
                  {stats.unreadContacts} NEW
                </span>
              )}
            </div>
            <h3 className="text-white/70 text-sm font-medium mb-1">Messages</h3>
            <p className="text-3xl font-bold text-white">{stats.contacts}</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Recent Contacts */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <div className="p-6 border-b border-white/20">
              <h3 className="text-xl font-bold text-white">Recent Messages</h3>
            </div>
            <div className="p-6 space-y-4">
              {contacts.map((contact) => (
                <div key={contact.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-[#f64c01] flex items-center justify-center">
                    <span className="text-white font-bold">
                      {contact.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{contact.name}</p>
                    <p className="text-white/60 text-sm truncate">{contact.subject}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    contact.status === 'new' 
                      ? 'bg-[#f64c01]/20 text-[#f64c01]' 
                      : 'bg-white/10 text-white/60'
                  }`}>
                    {contact.status || 'new'}
                  </span>
                </div>
              ))}
              {contacts.length === 0 && (
                <p className="text-white/60 text-center py-8">No messages yet</p>
              )}
            </div>
          </div>

          {/* Recent Posts */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <div className="p-6 border-b border-white/20">
              <h3 className="text-xl font-bold text-white">Recent Posts</h3>
            </div>
            <div className="p-6 space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                  <div className="w-16 h-12 rounded bg-white/10 overflow-hidden">
                    {post.image && (
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{post.title}</p>
                    <p className="text-white/60 text-sm truncate">{post.content}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-yellow-400 text-sm">star</span>
                    <span className="text-white text-sm">{post.rating || 5}</span>
                  </div>
                </div>
              ))}
              {posts.length === 0 && (
                <p className="text-white/60 text-center py-8">No posts yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import wheel from '../assets/wheel.png';
import hero from '../assets/hero.png';
import unnamed from '../assets/unnamed.png';

const Messages = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Ahmed Mohamed',
      email: 'ahmed.mohamed@email.com',
      subject: 'Information about driving lessons',
      message: 'Hello, I am interested in your beginner driving package. Can you provide more information about the schedule and availability? I am available on weekends.',
      status: 'new',
      createdAt: new Date('2024-01-20T10:30:00')
    },
    {
      id: 2,
      name: 'Fatima Al-Rashid',
      email: 'fatima.rashid@email.com',
      subject: 'Package pricing inquiry',
      message: 'Hi, I would like to know if you offer any discounts for students. Also, what is included in the advanced package? Thank you.',
      status: 'read',
      createdAt: new Date('2024-01-19T14:15:00')
    },
    {
      id: 3,
      name: 'Youssef Hassan',
      email: 'youssef.h@email.com',
      subject: 'Book driving test appointment',
      message: 'I have completed my lessons and would like to book my driving test. What are the available dates for next month?',
      status: 'replied',
      createdAt: new Date('2024-01-18T09:45:00')
    },
    {
      id: 4,
      name: 'Mariam Khalid',
      email: 'mariam.k@email.com',
      subject: 'Refresher course needed',
      message: 'I have my license but haven\'t driven in 2 years. I need to regain confidence. Do you have refresher courses?',
      status: 'new',
      createdAt: new Date('2024-01-17T16:20:00')
    },
    {
      id: 5,
      name: 'Omar Abdullah',
      email: 'omar.a@email.com',
      subject: 'Group discount for family',
      message: 'We are a family of 3 who want to learn driving together. Do you offer any group discounts or family packages?',
      status: 'read',
      createdAt: new Date('2024-01-16T11:00:00')
    },
    {
      id: 6,
      name: 'Layla Mahmoud',
      email: 'layla.m@email.com',
      subject: 'Automatic vs Manual lessons',
      message: 'What is the price difference between automatic and manual driving lessons? I prefer automatic transmission.',
      status: 'new',
      createdAt: new Date('2024-01-15T13:30:00')
    }
  ]);
  const [stats, setStats] = useState({ 
    total: 6, 
    unread: 3, 
    read: 2, 
    replied: 1 
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const updateContactStatus = (contactId, status) => {
    setContacts(prev => prev.map(contact => {
      if (contact.id === contactId) {
        const updatedContact = { ...contact, status };
        
        // Update stats
        const oldStatus = contact.status || 'new';
        setStats(currentStats => {
          const newStats = { ...currentStats };
          newStats[oldStatus] = Math.max(0, (newStats[oldStatus] || 0) - 1);
          newStats[status] = (newStats[status] || 0) + 1;
          return newStats;
        });
        
        return updatedContact;
      }
      return contact;
    }));
  };

  const deleteContact = (contactId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      const contactToDelete = contacts.find(c => c.id === contactId);
      
      setContacts(prev => prev.filter(contact => contact.id !== contactId));
      
      // Update stats
      if (contactToDelete) {
        const status = contactToDelete.status || 'new';
        setStats(currentStats => ({
          ...currentStats,
          total: Math.max(0, currentStats.total - 1),
          [status]: Math.max(0, (currentStats[status] || 0) - 1)
        }));
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-[#f64c01]/20 text-[#f64c01]';
      case 'read': return 'bg-blue-500/20 text-blue-400';
      case 'replied': return 'bg-green-500/20 text-green-400';
      default: return 'bg-white/10 text-white/60';
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-white text-xl">Loading Messages...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Messages Content */}
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2 sm:text-3xl">Messages</h2>
          <p className="text-white/70 text-sm sm:text-base">Manage contact inquiries and communications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-white/70 text-sm font-medium mb-2">Total Messages</h3>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-white/70 text-sm font-medium mb-2">Unread</h3>
            <p className="text-2xl font-bold text-[#f64c01]">{stats.unread}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-white/70 text-sm font-medium mb-2">Read</h3>
            <p className="text-2xl font-bold text-blue-400">{stats.read}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-white/70 text-sm font-medium mb-2">Replied</h3>
            <p className="text-2xl font-bold text-green-400">{stats.replied}</p>
          </div>
        </div>

        {/* Messages List */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
          <div className="p-6 border-b border-white/20">
            <h3 className="text-xl font-bold text-white">All Messages</h3>
          </div>
          
          <div className="divide-y divide-white/10">
            {contacts.map((contact) => (
              <div 
                key={contact.id} 
                className="p-6 hover:bg-white/5 transition-all cursor-pointer"
                onClick={() => setSelectedContact(contact)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#f64c01] flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {contact.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-white font-bold">{contact.name}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(contact.status)}`}>
                          {contact.status || 'new'}
                        </span>
                      </div>
                      <p className="text-white/80 font-medium mb-1">{contact.subject}</p>
                      <p className="text-white/60 text-sm">{contact.email}</p>
                      <p className="text-white/60 text-sm mt-2">{contact.message}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-white/40 text-xs">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      <select 
                        className="bg-white/10 border border-white/20 rounded px-2 py-1 text-xs text-white"
                        value={contact.status || 'new'}
                        onChange={(e) => updateContactStatus(contact.id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>
                      <button 
                        className="text-red-400 hover:text-red-300 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteContact(contact.id);
                        }}
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {contacts.length === 0 && (
              <div className="p-12 text-center">
                <span className="material-symbols-outlined text-4xl text-white/20 mb-4">mail</span>
                <p className="text-white/60">No messages yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Messages;

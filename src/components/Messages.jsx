import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { adminService } from '../services/adminService';
import wheel from '../assets/wheel.png';
import hero from '../assets/hero.png';
import unnamed from '../assets/unnamed.png';

const Messages = () => {
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({ 
    total: 0, 
    unread: 0, 
    read: 0, 
    replied: 0 
  });
  const [loading, setLoading] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        
        // Fetch contacts
        const contactsResponse = await adminService.getContacts();
        if (contactsResponse.data.status) {
          setContacts(contactsResponse.data.data);
        }

        // Fetch stats
        const statsResponse = await adminService.getContactStats();
        if (statsResponse.data.status) {
          setStats(statsResponse.data.data);
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const updateContactStatus = async (contactId, status) => {
    try {
      await adminService.updateContactStatus(contactId, status);
      
      // Update local state
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
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  const deleteContact = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await adminService.deleteContact(contactId);
        
        // Update local state
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
      } catch (error) {
        console.error('Error deleting contact:', error);
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

  const getFilteredContacts = () => {
    if (filterStatus === 'all') {
      return contacts;
    }
    return contacts.filter(contact => contact.status === filterStatus);
  };

  const filteredContacts = getFilteredContacts();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-white text-xl">Berichten Laden...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Messages Content */}
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2 sm:text-3xl">Berichten</h2>
          <p className="text-white/70 text-sm sm:text-base">Beheer contactinformatie en communicatie</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-white/70 text-sm font-medium mb-2">Totaal Berichten</h3>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-white/70 text-sm font-medium mb-2">Ongelezen</h3>
            <p className="text-2xl font-bold text-[#f64c01]">{stats.unread}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-white/70 text-sm font-medium mb-2">Gelezen</h3>
            <p className="text-2xl font-bold text-blue-400">{stats.read}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-white/70 text-sm font-medium mb-2">Beantwoord</h3>
            <p className="text-2xl font-bold text-green-400">{stats.replied}</p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === 'all'
                  ? 'bg-[#f64c01] text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              Alle ({contacts.length})
            </button>
            <button
              onClick={() => setFilterStatus('new')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === 'new'
                  ? 'bg-[#f64c01] text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              Nieuw ({stats.unread})
            </button>
            <button
              onClick={() => setFilterStatus('read')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === 'read'
                  ? 'bg-[#f64c01] text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              Gelezen ({stats.read})
            </button>
            <button
              onClick={() => setFilterStatus('replied')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === 'replied'
                  ? 'bg-[#f64c01] text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              Beantwoord ({stats.replied})
            </button>
          </div>
        </div>

        {/* Messages List */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
          <div className="p-6 border-b border-white/20">
            <h3 className="text-xl font-bold text-white">
              {filterStatus === 'all' ? 'Alle Berichten' : `${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Berichten`}
            </h3>
          </div>
          
          <div className="divide-y divide-white/10">
            {filteredContacts.map((contact) => (
              <div 
                key={contact.id} 
                className="p-6 hover:bg-white/5 transition-all cursor-pointer"
                onClick={() => setSelectedContact(contact)}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#f64c01] flex items-center justify-center shrink-0">
                      <span className="text-white font-bold text-lg">
                        {contact.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1">
                        <h4 className="text-white font-bold truncate">{contact.name}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-bold shrink-0 ${getStatusColor(contact.status)}`}>
                          {contact.status || 'new'}
                        </span>
                      </div>
                      <p className="text-white/80 font-medium mb-1 truncate">{contact.subject}</p>
                      <p className="text-white/60 text-sm truncate">{contact.email}</p>
                      <p className="text-white/60 text-sm mt-2 line-clamp-2">{contact.message}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 shrink-0">
                    <span className="text-white/40 text-xs whitespace-nowrap">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      <select 
                        className="bg-white/10 border border-white/20 rounded px-2 py-1 text-xs text-white shrink-0"
                        value={contact.status || 'new'}
                        onChange={(e) => updateContactStatus(contact.id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="new">Nieuw</option>
                        <option value="read">Gelezen</option>
                        <option value="replied">Beantwoord</option>
                      </select>
                      <button 
                        className="text-red-400 hover:text-red-300 transition-colors shrink-0"
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
            
            {filteredContacts.length === 0 && (
              <div className="p-12 text-center">
                <span className="material-symbols-outlined text-4xl text-white/20 mb-4">mail</span>
                <p className="text-white/60">
                  {filterStatus === 'all' ? 'Nog geen berichten' : `Geen ${filterStatus} berichten`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {selectedContact && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedContact(null)}
        >
          <div 
            className="bg-gradient-to-br from-[#091d2e] via-[#0f2942] to-[#1a3d5c] rounded-xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/20">
              <div className="flex justify-between items-start gap-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#f64c01] flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-lg">
                      {selectedContact.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-white">{selectedContact.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(selectedContact.status)}`}>
                        {selectedContact.status || 'new'}
                      </span>
                    </div>
                    <p className="text-white/80 font-medium">{selectedContact.subject}</p>
                    <p className="text-white/60 text-sm">{selectedContact.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-2xl">close</span>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-white/70 text-sm font-medium mb-2">Bericht:</h4>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-white/80 leading-relaxed whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-white/40 text-sm">
                  Ontvangen op: {new Date(selectedContact.createdAt).toLocaleDateString('nl-NL', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              
              <div className="flex gap-3">
                <select 
                  className="bg-white/10 border border-white/20 rounded px-3 py-2 text-sm text-white"
                  value={selectedContact.status || 'new'}
                  onChange={(e) => {
                    updateContactStatus(selectedContact.id, e.target.value);
                    setSelectedContact({...selectedContact, status: e.target.value});
                  }}
                >
                  <option value="new">Nieuw</option>
                  <option value="read">Gelezen</option>
                  <option value="replied">Beantwoord</option>
                </select>
                <button 
                  className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2"
                  onClick={() => {
                    deleteContact(selectedContact.id);
                    setSelectedContact(null);
                  }}
                >
                  <span className="material-symbols-outlined">delete</span>
                  Verwijderen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Messages;

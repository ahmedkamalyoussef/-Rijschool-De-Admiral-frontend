import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { adminService } from '../services/adminService';
import i18n from '../i18n/i18n.js';
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
  const [currentLang, setCurrentLang] = useState(i18n.language || 'nl');

  useEffect(() => {
    const handleLanguageChanged = (lng) => setCurrentLang(lng);
    i18n.on('languageChanged', handleLanguageChanged);
    return () => i18n.off('languageChanged', handleLanguageChanged);
  }, []);

  // Translation helper
  const t = (key) => i18n.t(key);

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
          return updatedContact;
        }
        return contact;
      }));
      
      // Recalculate stats from updated contacts
      setContacts(currentContacts => {
        const newStats = {
          total: currentContacts.length,
          unread: currentContacts.filter(c => c.status === 'new' || !c.status).length,
          read: currentContacts.filter(c => c.status === 'read').length,
          replied: currentContacts.filter(c => c.status === 'replied').length
        };
        setStats(newStats);
        return currentContacts;
      });
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  const deleteContact = async (contactId) => {
    if (window.confirm(currentLang === 'ar' ? 'هل أنت متأكد من حذف هذه الرسالة؟' : 'Weet u zeker dat u dit bericht wilt verwijderen?')) {
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

  const getStatusLabel = (status) => {
    switch (status) {
      case 'new': return currentLang === 'ar' ? 'جديد' : 'Nieuw';
      case 'read': return currentLang === 'ar' ? 'مقروء' : 'Gelezen';
      case 'replied': return currentLang === 'ar' ? 'تم الرد' : 'Beantwoord';
      default: return currentLang === 'ar' ? 'جديد' : 'Nieuw';
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
          <div className="text-white text-xl">{currentLang === 'ar' ? 'جاري تحميل الرسائل...' : 'Berichten Laden...'}</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Messages Content */}
      <div className={`p-3 sm:p-4 md:p-6 lg:p-8 w-full max-w-full overflow-x-hidden ${currentLang === 'ar' ? 'text-right' : ''}`}>
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">{t('messages_admin.title')}</h2>
          <p className="text-white/70 text-sm sm:text-base">
            {currentLang === 'ar' ? 'إدارة معلومات التواصل والاتصال' : 'Beheer contactinformatie en communicatie'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-white/70 text-sm font-medium mb-2">{t('stats.total_messages')}</h3>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-white/70 text-sm font-medium mb-2">{currentLang === 'ar' ? 'غير مقروء' : 'Ongelezen'}</h3>
            <p className="text-2xl font-bold text-[#f64c01]">{stats.unread}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-white/70 text-sm font-medium mb-2">{currentLang === 'ar' ? 'مقروء' : 'Gelezen'}</h3>
            <p className="text-2xl font-bold text-blue-400">{stats.read}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-white/70 text-sm font-medium mb-2">{currentLang === 'ar' ? 'تم الرد' : 'Beantwoord'}</h3>
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
              {currentLang === 'ar' ? 'الكل' : 'Alle'} ({contacts.length})
            </button>
            <button
              onClick={() => setFilterStatus('new')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === 'new'
                  ? 'bg-[#f64c01] text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              {currentLang === 'ar' ? 'جديد' : 'Nieuw'} ({stats.unread})
            </button>
            <button
              onClick={() => setFilterStatus('read')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === 'read'
                  ? 'bg-[#f64c01] text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              {currentLang === 'ar' ? 'مقروء' : 'Gelezen'} ({stats.read})
            </button>
            <button
              onClick={() => setFilterStatus('replied')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === 'replied'
                  ? 'bg-[#f64c01] text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              {currentLang === 'ar' ? 'تم الرد' : 'Beantwoord'} ({stats.replied})
            </button>
          </div>
        </div>

        {/* Messages List */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
          <div className={`p-4 sm:p-5 lg:p-6 border-b border-white/20 ${currentLang === 'ar' ? 'text-right' : ''}`}>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {filterStatus === 'all' 
                ? (currentLang === 'ar' ? 'جميع الرسائل' : 'Alle Berichten')
                : `${getStatusLabel(filterStatus)} ${currentLang === 'ar' ? 'الرسائل' : 'Berichten'}`
              }
            </h3>
          </div>
          
          <div className="divide-y divide-white/10">
            {filteredContacts.map((contact) => (
              <div 
                key={contact.id} 
                className="p-4 sm:p-5 lg:p-6 hover:bg-white/5 transition-all cursor-pointer"
                onClick={() => setSelectedContact(contact)}
              >
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-3 lg:gap-4">
                  <div className="flex gap-3 sm:gap-4 min-w-0 flex-1">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-[#f64c01] flex items-center justify-center shrink-0">
                      <span className="text-white font-bold text-base sm:text-lg">
                        {contact.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 lg:gap-3 mb-1">
                        <h4 className="text-white font-bold text-sm sm:text-base truncate">{contact.name}</h4>
                        <span className={`px-2 py-0.5 sm:py-1 rounded text-xs font-bold shrink-0 w-fit ${getStatusColor(contact.status)}`}>
                          {getStatusLabel(contact.status || 'new')}
                        </span>
                      </div>
                      <p className="text-white/80 font-medium text-sm mb-1 truncate">{contact.subject}</p>
                      <p className="text-white/60 text-xs sm:text-sm truncate">{contact.email}</p>
                      <p className="text-white/60 text-xs sm:text-sm mt-2 line-clamp-2 break-words">{contact.message}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-row lg:flex-col items-center lg:items-end gap-2 shrink-0 mt-2 lg:mt-0">
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
                        <option value="new">{currentLang === 'ar' ? 'جديد' : 'Nieuw'}</option>
                        <option value="read">{currentLang === 'ar' ? 'مقروء' : 'Gelezen'}</option>
                        <option value="replied">{currentLang === 'ar' ? 'تم الرد' : 'Beantwoord'}</option>
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
                  {filterStatus === 'all' 
                    ? (currentLang === 'ar' ? 'لا توجد رسائل بعد' : 'Nog geen berichten')
                    : `${currentLang === 'ar' ? 'لا توجد رسائل' : 'Geen'} ${getStatusLabel(filterStatus)} ${currentLang === 'ar' ? 'بعد' : 'berichten'}`
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {selectedContact && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
          onClick={() => setSelectedContact(null)}
        >
          <div 
            className="bg-gradient-to-br from-[#091d2e] via-[#0f2942] to-[#1a3d5c] rounded-xl border border-white/20 w-full max-w-full sm:max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto overscroll-contain"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`p-4 sm:p-6 border-b border-white/20 ${currentLang === 'ar' ? 'text-right' : ''}`}>
              <div className={`flex justify-between items-start gap-4 ${currentLang === 'ar' ? 'flex-row-reverse' : ''}`}>
                <div className={`flex gap-3 sm:gap-4 min-w-0 flex-1 ${currentLang === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f64c01] flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-sm sm:text-lg">
                      {selectedContact.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1 ${currentLang === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <h3 className="text-lg sm:text-xl font-bold text-white truncate">{selectedContact.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-bold shrink-0 ${getStatusColor(selectedContact.status)}`}>
                        {getStatusLabel(selectedContact.status || 'new')}
                      </span>
                    </div>
                    <p className="text-white/80 font-medium text-sm sm:text-base truncate">{selectedContact.subject}</p>
                    <p className="text-white/60 text-xs sm:text-sm truncate">{selectedContact.email}</p>
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
            
            <div className={`p-4 sm:p-6 ${currentLang === 'ar' ? 'text-right' : ''}`}>
              <div className="mb-6">
                <h4 className="text-white/70 text-sm font-medium mb-2">
                  {currentLang === 'ar' ? 'الرسالة:' : 'Bericht:'}
                </h4>
                <div className="bg-white/5 rounded-lg p-3 sm:p-4 overflow-hidden max-w-full">
                  <p className="text-white/80 leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere text-sm sm:text-base">{selectedContact.message}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-white/40 text-sm">
                  {currentLang === 'ar' ? 'تم الاستلام:' : 'Ontvangen op:'} {new Date(selectedContact.createdAt).toLocaleDateString(currentLang === 'ar' ? 'ar-SA' : 'nl-NL', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              
              <div className={`flex gap-3 ${currentLang === 'ar' ? 'flex-row-reverse' : ''}`}>
                <select 
                  className="bg-white/10 border border-white/20 rounded px-3 py-2 text-sm text-white"
                  value={selectedContact.status || 'new'}
                  onChange={(e) => {
                    updateContactStatus(selectedContact.id, e.target.value);
                    setSelectedContact({...selectedContact, status: e.target.value});
                  }}
                >
                  <option value="new">{currentLang === 'ar' ? 'جديد' : 'Nieuw'}</option>
                  <option value="read">{currentLang === 'ar' ? 'مقروء' : 'Gelezen'}</option>
                  <option value="replied">{currentLang === 'ar' ? 'تم الرد' : 'Beantwoord'}</option>
                </select>
                <button 
                  className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2"
                  onClick={() => {
                    deleteContact(selectedContact.id);
                    setSelectedContact(null);
                  }}
                >
                  <span className="material-symbols-outlined">delete</span>
                  {currentLang === 'ar' ? 'حذف' : 'Verwijderen'}
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

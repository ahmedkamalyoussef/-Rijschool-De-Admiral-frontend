import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import i18n from '../i18n/i18n.js';
import AdminSidebar from './AdminSidebar';
import { getImageUrl } from '../services/api.js';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language || 'nl');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleLanguageChanged = (lng) => setCurrentLang(lng);
    i18n.on('languageChanged', handleLanguageChanged);
    return () => i18n.off('languageChanged', handleLanguageChanged);
  }, []);

  // Translation helper
  const t = (key) => i18n.t(key);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#091d2e] via-[#0f2942] to-[#1a3d5c]">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 z-40 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        currentLang === 'ar' ? 'right-0' : 'left-0'
      } ${
        sidebarOpen 
          ? 'translate-x-0' 
          : currentLang === 'ar' ? 'translate-x-full' : '-translate-x-full'
      } lg:translate-x-0`}>
        <AdminSidebar onClose={() => setSidebarOpen(false)} onLogout={logout} />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Main Content */}
      <main className={`min-h-screen ${currentLang === 'ar' ? 'lg:mr-64' : 'lg:ml-64'}`}>
        {/* Top Bar */}
        <header className="bg-white/10 backdrop-blur-md h-16 flex justify-between items-center px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20"
          >
            <span className="material-symbols-outlined text-white text-xl">
              {sidebarOpen ? 'close' : 'menu'}
            </span>
          </button>
          
          <div className="hidden lg:flex flex-1"></div>
          
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
            <div className="hidden sm:block h-8 w-px bg-white/20"></div>
            
            <div className="flex items-center gap-2 lg:gap-3">
              <div className={`hidden sm:block ${currentLang === 'ar' ? 'text-left order-2' : 'text-right'}`}>
                <p className="text-xs font-bold text-white">{user?.firstName || 'Admin'}</p>
                <p className="text-[10px] text-white/60">{currentLang === 'ar' ? 'مدير' : 'Administrator'}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#f64c01] flex items-center justify-center overflow-hidden">
                {user?.imageUrl ? (
                  <img src={getImageUrl(user.imageUrl)} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white font-bold text-sm">{user?.firstName?.charAt(0) || 'A'}</span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import i18n from '../i18n/i18n.js';
import wheel from '../assets/logo.png';

const AdminSidebar = ({ onClose, onLogout }) => {
  const location = useLocation();
  const [currentLang, setCurrentLang] = useState(i18n.language || 'nl');

  useEffect(() => {
    const handleLanguageChanged = (lng) => setCurrentLang(lng);
    i18n.on('languageChanged', handleLanguageChanged);
    return () => i18n.off('languageChanged', handleLanguageChanged);
  }, []);

  // Translation helper
  const t = (key) => i18n.t(key);

  const toggleLanguage = () => {
    const newLang = currentLang === 'nl' ? 'ar' : 'nl';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getLinkClass = (path) => {
    const baseClass = "flex items-center gap-3 px-3 lg:px-4 py-3 rounded-lg transition-all";
    if (isActive(path)) {
      return `${baseClass} text-white font-bold border-r-4 border-[#f64c01] bg-white/10`;
    }
    return `${baseClass} text-white/70 hover:text-white hover:bg-white/10`;
  };

  const handleLinkClick = () => {
    if (onClose && window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <aside className={`h-screen w-64 fixed top-0 bg-white/10 backdrop-blur-md flex flex-col py-6 z-40 ${currentLang === 'ar' ? 'right-0' : 'left-0'}`}>
      <div className="px-4 lg:px-6 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
            <img src={wheel} alt="De Admiraal" className="w-6 h-6 object-contain" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">{t('admin.admin_panel')}</p>
            <p className="text-[10px] text-white/60">{currentLang === 'ar' ? 'مدير' : 'Beheerder'}</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-3 lg:px-4 space-y-2 overflow-y-auto">
        <Link 
          to="/admin/dashboard" 
          className={getLinkClass('/admin/dashboard')}
          onClick={handleLinkClick}
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-medium text-sm lg:text-base">{t('admin.dashboard')}</span>
        </Link>
        <Link 
          to="/admin/packages" 
          className={getLinkClass('/admin/packages')}
          onClick={handleLinkClick}
        >
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="font-medium text-sm lg:text-base">{t('admin.packages')}</span>
        </Link>
        <Link 
          to="/admin/posts" 
          className={getLinkClass('/admin/posts')}
          onClick={handleLinkClick}
        >
          <span className="material-symbols-outlined">article</span>
          <span className="font-medium text-sm lg:text-base">{t('admin.posts')}</span>
        </Link>
        <Link 
          to="/admin/messages" 
          className={getLinkClass('/admin/messages')}
          onClick={handleLinkClick}
        >
          <span className="material-symbols-outlined">chat</span>
          <span className="font-medium text-sm lg:text-base">{t('admin.messages')}</span>
        </Link>
        <Link 
          to="/admin/profile" 
          className={getLinkClass('/admin/profile')}
          onClick={handleLinkClick}
        >
          <span className="material-symbols-outlined">person</span>
          <span className="font-medium text-sm lg:text-base">{t('admin.profile')}</span>
        </Link>
      </nav>
      
      {/* Language Toggle */}
      <div className="px-3 lg:px-4 py-2">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all w-full"
        >
          <span className="material-symbols-outlined">language</span>
          <span className="font-medium text-sm">{currentLang === 'ar' ? 'Nederlands' : 'العربية'}</span>
        </button>
      </div>
      
      <div className="px-3 lg:px-4 mt-auto pt-6 border-t border-white/20">
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 px-3 lg:px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all w-full"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="font-medium text-sm lg:text-base">{t('admin.logout')}</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;

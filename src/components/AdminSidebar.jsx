import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import wheel from '../assets/logo.png';

const AdminSidebar = ({ onClose }) => {
  const location = useLocation();

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
    <aside className="h-screen w-64 fixed left-0 top-0 bg-white/10 backdrop-blur-md flex flex-col py-6 z-40">
      <div className="px-4 lg:px-6 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
            <img src={wheel} alt="De Admiraal" className="w-6 h-6 object-contain" />
          </div>
          <div>
            <h1 className="text-lg lg:text-xl font-bold text-white tracking-tight">De Admiraal</h1>
            <p className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Admin Panel</p>
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
          <span className="font-medium text-sm lg:text-base">Dashboard</span>
        </Link>
        <Link 
          to="/admin/packages" 
          className={getLinkClass('/admin/packages')}
          onClick={handleLinkClick}
        >
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="font-medium text-sm lg:text-base">Packages</span>
        </Link>
        <Link 
          to="/admin/posts" 
          className={getLinkClass('/admin/posts')}
          onClick={handleLinkClick}
        >
          <span className="material-symbols-outlined">article</span>
          <span className="font-medium text-sm lg:text-base">Posts</span>
        </Link>
        <Link 
          to="/admin/messages" 
          className={getLinkClass('/admin/messages')}
          onClick={handleLinkClick}
        >
          <span className="material-symbols-outlined">chat</span>
          <span className="font-medium text-sm lg:text-base">Messages</span>
        </Link>
        <Link 
          to="/admin/profile" 
          className={getLinkClass('/admin/profile')}
          onClick={handleLinkClick}
        >
          <span className="material-symbols-outlined">person</span>
          <span className="font-medium text-sm lg:text-base">Profile</span>
        </Link>
      </nav>
      
      <div className="px-3 lg:px-4 mt-auto pt-6 border-t border-white/20">
        <button className="flex items-center gap-3 px-3 lg:px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all w-full">
          <span className="material-symbols-outlined">logout</span>
          <span className="font-medium text-sm lg:text-base">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;

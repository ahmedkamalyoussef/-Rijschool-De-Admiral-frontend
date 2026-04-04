import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { useAuth } from '../contexts/AuthContext';
import { adminService } from '../services/adminService';
import { getImageUrl } from '../services/api.js';
import i18n from '../i18n/i18n.js';
import wheel from '../assets/wheel.png';

const Profile = () => {
  const { user, updateProfile, updateUser } = useAuth();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    imageUrl: null
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');
  const [currentLang, setCurrentLang] = useState(i18n.language || 'nl');

  useEffect(() => {
    const handleLanguageChanged = (lng) => setCurrentLang(lng);
    i18n.on('languageChanged', handleLanguageChanged);
    return () => i18n.off('languageChanged', handleLanguageChanged);
  }, []);

  // Translation helper
  const t = (key) => i18n.t(key);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await adminService.getProfile();
      if (response.data.status) {
        setProfile(response.data.data || {});
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage('');

    try {
      // Use updateProfile from AuthContext to update global user state
      await updateProfile(profile.firstName, profile.lastName);
      // Update AuthContext user so navbar shows new name
      if (user) {
        updateUser({ ...user, firstName: profile.firstName, lastName: profile.lastName });
      }
      setMessage(currentLang === 'ar' ? 'تم تحديث الملف الشخصي بنجاح!' : 'Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage(error.message || (currentLang === 'ar' ? 'خطأ في تحديث الملف الشخصي' : 'Error updating profile'));
    } finally {
      setUpdating(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('Passwords do not match');
      setUpdating(false);
      return;
    }

    try {
      await adminService.changePassword(passwordData);
      setMessage('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Error changing password:', error);
      setMessage(error.message || 'Error changing password');
    } finally {
      setUpdating(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const response = await adminService.updateImage(file);
        if (response.data.status) {
          const newImageUrl = response.data.data.imageUrl;
          setProfile(prev => ({ ...prev, imageUrl: newImageUrl }));
          // Update AuthContext user so navbar shows the new image
          if (user) {
            updateUser({ ...user, imageUrl: newImageUrl });
          }
          setMessage(currentLang === 'ar' ? 'تم تحديث الصورة بنجاح!' : 'Profile picture updated!');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        setMessage(currentLang === 'ar' ? 'خطأ في رفع الصورة' : 'Error uploading image');
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-white text-xl">{currentLang === 'ar' ? 'جاري تحميل الملف الشخصي...' : 'Profiel Laden...'}</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Profile Content */}
      <div className={`p-8 ${currentLang === 'ar' ? 'text-right' : ''}`}>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">{t('profile_admin.title')}</h2>
          <p className="text-white/70">
            {currentLang === 'ar' ? 'إدارة معلومات حسابك والأمان' : 'Beheer uw accountinformatie en beveiliging'}
          </p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-xl ${
            message.includes('success') || message.includes('تم') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 text-center">
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 rounded-full bg-[#f64c01] flex items-center justify-center mx-auto border-4 border-white/20">
                  {profile.imageUrl ? (
                    <img src={getImageUrl(profile.imageUrl)} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-white text-4xl font-bold">
                      {profile.firstName?.charAt(0) || 'A'}{profile.lastName?.charAt(0) || ''}
                    </span>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 p-2 bg-[#f64c01] text-white rounded-full cursor-pointer hover:bg-[#f64c01]/80 transition-all">
                  <span className="material-symbols-outlined text-sm">photo_camera</span>
                  <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                </label>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-1">
                {profile.firstName} {profile.lastName}
              </h3>
              <p className="text-white/60 text-sm mb-4">
                {currentLang === 'ar' ? 'مدير' : 'Administrator'}
              </p>
              
              <div className="space-y-2">
                {/* <button className="w-full bg-white/10 text-white py-2 rounded-lg hover:bg-white/20 transition-all">
                  Upload New Photo
                </button> */}
                {/* <button className="w-full bg-white/10 text-white py-2 rounded-lg hover:bg-white/20 transition-all">
                  Remove Photo
                </button> */}
              </div>
            </div>
          </div>

          {/* Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* General Information */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
              <div className={`p-6 border-b border-white/20 ${currentLang === 'ar' ? 'text-right' : ''}`}>
                <h3 className="text-xl font-bold text-white">
                  {currentLang === 'ar' ? 'المعلومات العامة' : 'Algemene Informatie'}
                </h3>
              </div>
              
              <form onSubmit={handleProfileUpdate} className={`p-6 space-y-6 ${currentLang === 'ar' ? 'text-right' : ''}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-white/70 mb-2">
                      {currentLang === 'ar' ? 'الاسم الأول' : 'Voornaam'}
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-[#f64c01] focus:ring-2 focus:ring-[#f64c01]/20 outline-none"
                      value={profile.firstName}
                      onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white/70 mb-2">
                      {currentLang === 'ar' ? 'اسم العائلة' : 'Achternaam'}
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-[#f64c01] focus:ring-2 focus:ring-[#f64c01]/20 outline-none"
                      value={profile.lastName}
                      onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-white/70 mb-2">
                    {currentLang === 'ar' ? 'البريد الإلكتروني' : 'E-mailadres'}
                  </label>
                  <input
                    type="email"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-[#f64c01] focus:ring-2 focus:ring-[#f64c01]/20 outline-none"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    required
                    disabled
                  />
                </div>
                
                <div className={`flex ${currentLang === 'ar' ? 'justify-start' : 'justify-end'}`}>
                  <button
                    type="submit"
                    disabled={updating}
                    className="bg-gradient-to-r from-[#b03500] to-[#f64c01] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-[#f64c01]/30 transition-all disabled:opacity-50"
                  >
                    {updating 
                      ? (currentLang === 'ar' ? 'جاري التحديث...' : 'Bezig met bijwerken...')
                      : (currentLang === 'ar' ? 'حفظ التغييرات' : 'Wijzigingen Opslaan')
                    }
                  </button>
                </div>
              </form>
            </div>

            {/* Change Password */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
              <div className={`p-6 border-b border-white/20 ${currentLang === 'ar' ? 'text-right' : ''}`}>
                <h3 className="text-xl font-bold text-white">
                  {currentLang === 'ar' ? 'بيانات الأمان' : 'Beveiligingsgegevens'}
                </h3>
              </div>
              
              <form onSubmit={handlePasswordChange} className={`p-6 space-y-6 ${currentLang === 'ar' ? 'text-right' : ''}`}>
                <div>
                  <label className="block text-sm font-semibold text-white/70 mb-2">
                    {currentLang === 'ar' ? 'كلمة المرور الحالية' : 'Huidig Wachtwoord'}
                  </label>
                  <input
                    type="password"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-[#f64c01] focus:ring-2 focus:ring-[#f64c01]/20 outline-none"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-white/70 mb-2">
                      {currentLang === 'ar' ? 'كلمة المرور الجديدة' : 'Nieuw Wachtwoord'}
                    </label>
                    <input
                      type="password"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-[#f64c01] focus:ring-2 focus:ring-[#f64c01]/20 outline-none"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      required
                      minLength={6}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white/70 mb-2">
                      {currentLang === 'ar' ? 'تأكيد كلمة المرور الجديدة' : 'Bevestig Nieuw Wachtwoord'}
                    </label>
                    <input
                      type="password"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-[#f64c01] focus:ring-2 focus:ring-[#f64c01]/20 outline-none"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      required
                      minLength={6}
                    />
                  </div>
                </div>
                
                <div className={`flex ${currentLang === 'ar' ? 'justify-start' : 'justify-end'}`}>
                  <button
                    type="submit"
                    disabled={updating}
                    className="bg-gradient-to-r from-[#b03500] to-[#f64c01] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-[#f64c01]/30 transition-all disabled:opacity-50"
                  >
                    {updating 
                      ? (currentLang === 'ar' ? 'جاري التحديث...' : 'Bezig met bijwerken...')
                      : (currentLang === 'ar' ? 'تغيير كلمة المرور' : 'Wachtwoord Wijzigen')
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Profile;

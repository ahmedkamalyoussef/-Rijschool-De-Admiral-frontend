import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import AdminLayout from './AdminLayout';
import { adminService } from '../services/adminService';
import { getImageUrl } from '../services/api.js';
import i18n from '../i18n/i18n.js';
import wheel from '../assets/wheel.png';
import hero from '../assets/hero.png';
import unnamed from '../assets/unnamed.png';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language || 'nl');
  const [formData, setFormData] = useState({
    nameAr: '',
    nameNl: '',
    price: '',
    descriptionAr: '',
    descriptionNl: '',
    featuresAr: [],
    featuresNl: [],
    durationAr: '',
    durationNl: '',
    isActive: true,
  });

  useEffect(() => {
    const handleLanguageChanged = (lng) => setCurrentLang(lng);
    i18n.on('languageChanged', handleLanguageChanged);
    return () => i18n.off('languageChanged', handleLanguageChanged);
  }, []);

  // Translation helper
  const t = (key) => i18n.t(key);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await adminService.getPackages();
        if (response.data.status) {
          setPackages(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeaturesChange = (lang, features) => {
    setFormData(prev => ({
      ...prev,
      [`features${lang}`]: features
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const packageData = {
      ...formData,
      price: parseFloat(formData.price),
      featuresAr: JSON.stringify(formData.featuresAr),
      featuresNl: JSON.stringify(formData.featuresNl),
    };

    try {
      if (editingPackage) {
        await adminService.updatePackage(editingPackage.id, packageData);
        toast.success(currentLang === 'ar' ? 'تم تحديث الباقة بنجاح' : 'Pakket succesvol bijgewerkt');
      } else {
        await adminService.createPackage(packageData);
        toast.success(currentLang === 'ar' ? 'تم إضافة الباقة بنجاح' : 'Pakket succesvol toegevoegd');
      }
      
      // Refresh packages list
      const response = await adminService.getPackages();
      if (response.data.status) {
        setPackages(response.data.data);
      }
      
      // Reset form
      setFormData({
        nameAr: '',
        nameNl: '',
        price: '',
        descriptionAr: '',
        descriptionNl: '',
        featuresAr: [],
        featuresNl: [],
        durationAr: '',
        durationNl: '',
        isActive: true,
      });
      setEditingPackage(null);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error saving package:', error);
      const errorMsg = error.message || (currentLang === 'ar' ? 'فشل في حفظ الباقة' : 'Failed to save package');
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setFormData({
      nameAr: pkg.nameAr || '',
      nameNl: pkg.nameNl || '',
      price: pkg.price || '',
      descriptionAr: pkg.descriptionAr || '',
      descriptionNl: pkg.descriptionNl || '',
      featuresAr: pkg.featuresAr || [],
      featuresNl: pkg.featuresNl || [],
      durationAr: pkg.durationAr || '',
      durationNl: pkg.durationNl || '',
      isActive: pkg.isActive !== undefined ? pkg.isActive : true,
    });
    setShowCreateModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm(currentLang === 'ar' ? 'هل أنت متأكد من حذف هذه الباقة؟' : 'Weet u zeker dat u dit pakket wilt verwijderen?')) {
      try {
        await adminService.deletePackage(id);
        setPackages(prev => prev.filter(pkg => pkg.id !== id));
      } catch (error) {
        console.error('Error deleting package:', error);
      }
    }
  };

  const togglePackageStatus = async (id) => {
    try {
      await adminService.togglePackageStatus(id);
      const response = await adminService.getPackages();
      if (response.data.status) {
        setPackages(response.data.data);
      }
    } catch (error) {
      console.error('Error toggling package status:', error);
    }
  };

  const addFeature = (lang) => {
    const currentFeatures = formData[`features${lang}`] || [];
    handleFeaturesChange(lang, [...currentFeatures, '']);
  };

  const updateFeature = (lang, index, value) => {
    const currentFeatures = [...formData[`features${lang}`]];
    currentFeatures[index] = value;
    handleFeaturesChange(lang, currentFeatures);
  };

  const removeFeature = (lang, index) => {
    const currentFeatures = [...formData[`features${lang}`]];
    currentFeatures.splice(index, 1);
    handleFeaturesChange(lang, currentFeatures);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-white text-xl">{currentLang === 'ar' ? 'جاري تحميل الباقات...' : 'Pakketten Laden...'}</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Packages Content */}
      <div className={`p-8 ${currentLang === 'ar' ? 'text-right' : ''}`}>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t('packages_admin.title')}</h1>
            <p className="text-white/70">
              {currentLang === 'ar' ? 'إدارة باقات مدرسة القيادة' : 'Beheer uw rijschool pakketten'}
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-[#f64c01] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#e54200] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">add</span>
            {currentLang === 'ar' ? 'إضافة باقة' : 'Pakket Toevoegen'}
          </button>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6 text-center align-middle content-center">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
              <div className="p-6">
                {/* Package Image */}
                {pkg.imageUrl && (
                  <div className="mb-4">
                    <img 
                      src={getImageUrl(pkg.imageUrl)} 
                      alt={pkg.nameAr}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Package Info */}
                <div className={`flex justify-between items-start mb-4 ${currentLang === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <h3 className="text-xl font-bold text-white">{currentLang === 'ar' ? pkg.nameAr : pkg.nameNl}</h3>
                  <div className={`flex items-center gap-2 ${currentLang === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <span className="text-2xl font-bold text-[#f64c01]">€{pkg.price}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      pkg.isActive 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {pkg.isActive 
                        ? (currentLang === 'ar' ? 'نشط' : 'Actief')
                        : (currentLang === 'ar' ? 'غير نشط' : 'Inactief')
                      }
                    </span>
                  </div>
                </div>
                <p className="text-white/70 text-sm mb-3">{currentLang === 'ar' ? pkg.descriptionAr : pkg.descriptionNl}</p>
                {pkg.durationAr && (
                  <p className="text-white/60 text-sm mb-3">
                    {currentLang === 'ar' ? 'المدة:' : 'Duur:'} {currentLang === 'ar' ? pkg.durationAr : pkg.durationNl}
                  </p>
                )}
                {pkg.featuresAr && pkg.featuresAr.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-white font-medium mb-2">{currentLang === 'ar' ? 'المميزات:' : 'Functies:'}</h4>
                    <ul className="space-y-1">
                      {(currentLang === 'ar' ? pkg.featuresAr : pkg.featuresNl).map((feature, index) => (
                        <li key={index} className={`text-white/70 text-sm flex items-center ${currentLang === 'ar' ? 'flex-row-reverse' : ''}`}>
                          <span className={`w-2 h-2 bg-[#f64c01] rounded-full ${currentLang === 'ar' ? 'ml-2' : 'mr-2'}`}></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Actions */}
                <div className={`flex gap-2 ${currentLang === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <button
                    onClick={() => handleEdit(pkg)}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    {currentLang === 'ar' ? 'تعديل' : 'Bewerken'}
                  </button>
                  <button
                    onClick={() => togglePackageStatus(pkg.id)}
                    className={`flex-1 py-2 rounded-lg transition-colors ${
                      pkg.isActive
                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                        : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                  >
                    {pkg.isActive 
                      ? (currentLang === 'ar' ? 'إيقاف' : 'Deactiveren')
                      : (currentLang === 'ar' ? 'تفعيل' : 'Activeren')
                    }
                  </button>
                  <button
                    onClick={() => handleDelete(pkg.id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    {currentLang === 'ar' ? 'حذف' : 'Verwijderen'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create/Edit Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className={`bg-[#1a3d5c] rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto ${currentLang === 'ar' ? 'text-right' : ''}`}>
              <h2 className="text-xl font-bold text-white mb-4">
                {editingPackage 
                  ? (currentLang === 'ar' ? 'تعديل الباقة' : 'Pakket Bewerken')
                  : (currentLang === 'ar' ? 'إضافة باقة جديدة' : 'Nieuw Pakket Toevoegen')
                }
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Arabic Fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">{currentLang === 'ar' ? 'البيانات العربية' : 'Arabische Gegevens'}</h3>
                  
                  <div>
                    <label className="block text-white/70 text-sm mb-2">{currentLang === 'ar' ? 'اسم الباقة (عربي)' : 'Pakketnaam (Arabisch)'}</label>
                    <input
                      type="text"
                      name="nameAr"
                      value={formData.nameAr}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">{currentLang === 'ar' ? 'الوصف (عربي)' : 'Beschrijving (Arabisch)'}</label>
                    <textarea
                      name="descriptionAr"
                      value={formData.descriptionAr}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white h-24"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">{currentLang === 'ar' ? 'المدة (عربي)' : 'Duur (Arabisch)'}</label>
                    <input
                      type="text"
                      name="durationAr"
                      value={formData.durationAr}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                      placeholder="مثال: 4 أسابيع"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">{currentLang === 'ar' ? 'المميزات (عربي)' : 'Functies (Arabisch)'}</label>
                    {formData.featuresAr.map((feature, index) => (
                      <div key={index} className={`flex gap-2 mb-2 ${currentLang === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature('Ar', index, e.target.value)}
                          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                          placeholder={currentLang === 'ar' ? 'أدخل ميزة' : 'Voeg een functie toe'}
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature('Ar', index)}
                          className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                        >
                          {currentLang === 'ar' ? 'حذف' : 'Verwijderen'}
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addFeature('Ar')}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                      {currentLang === 'ar' ? 'إضافة ميزة' : 'Functie toevoegen'}
                    </button>
                  </div>
                </div>

                {/* Dutch Fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">{currentLang === 'ar' ? 'البيانات الهولندية' : 'Nederlandse Gegevens'}</h3>
                  
                  <div>
                    <label className="block text-white/70 text-sm mb-2">{currentLang === 'ar' ? 'اسم الباقة (هولندي)' : 'Pakketnaam (Nederlands)'}</label>
                    <input
                      type="text"
                      name="nameNl"
                      value={formData.nameNl}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">{currentLang === 'ar' ? 'الوصف (هولندي)' : 'Beschrijving (Nederlands)'}</label>
                    <textarea
                      name="descriptionNl"
                      value={formData.descriptionNl}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white h-24"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">{currentLang === 'ar' ? 'المدة (هولندي)' : 'Duur (Nederlands)'}</label>
                    <input
                      type="text"
                      name="durationNl"
                      value={formData.durationNl}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                      placeholder="Voorbeeld: 4 weken"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">{currentLang === 'ar' ? 'المميزات (هولندي)' : 'Functies (Nederlands)'}</label>
                    {formData.featuresNl.map((feature, index) => (
                      <div key={index} className={`flex gap-2 mb-2 ${currentLang === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature('Nl', index, e.target.value)}
                          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                          placeholder="Voeg een functie toe"
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature('Nl', index)}
                          className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                        >
                          {currentLang === 'ar' ? 'حذف' : 'Verwijderen'}
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addFeature('Nl')}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                      {currentLang === 'ar' ? 'إضافة ميزة' : 'Functie toevoegen'}
                    </button>
                  </div>
                </div>

                {/* Common Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">{currentLang === 'ar' ? 'السعر' : 'Prijs'} (€)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div className={`flex items-center ${currentLang === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={(e) => handleInputChange({ target: { name: 'isActive', value: e.target.checked } })}
                      className={currentLang === 'ar' ? 'ml-2' : 'mr-2'}
                    />
                    <label className="text-white/70 text-sm">
                      {currentLang === 'ar' ? 'الباقة نشطة' : 'Pakket is actief'}
                    </label>
                  </div>
                </div>

                {/* Form Actions */}
                <div className={`flex gap-2 pt-4 ${currentLang === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
                  >
                    {currentLang === 'ar' ? 'إلغاء' : 'Annuleren'}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-[#f64c01] text-white py-2 rounded-lg hover:bg-[#e54200] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin material-symbols-outlined">sync</span>
                        {currentLang === 'ar' ? 'جاري الحفظ...' : 'Bezig met opslaan...'}
                      </>
                    ) : (
                      editingPackage 
                        ? (currentLang === 'ar' ? 'تحديث الباقة' : 'Pakket Bijwerken')
                        : (currentLang === 'ar' ? 'إضافة الباقة' : 'Pakket Toevoegen')
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Packages;

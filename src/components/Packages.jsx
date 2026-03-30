import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { adminService } from '../services/adminService';
import wheel from '../assets/wheel.png';
import hero from '../assets/hero.png';
import unnamed from '../assets/unnamed.png';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
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
    
    const packageData = {
      ...formData,
      price: parseFloat(formData.price),
      featuresAr: JSON.stringify(formData.featuresAr),
      featuresNl: JSON.stringify(formData.featuresNl),
    };

    try {
      if (editingPackage) {
        await adminService.updatePackage(editingPackage.id, packageData);
      } else {
        await adminService.createPackage(packageData);
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
    if (window.confirm('هل أنت متأكد من حذف هذه الباقة؟')) {
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
          <div className="text-white text-xl">جاري تحميل الباقات...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Packages Content */}
      <div className="p-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 sm:text-3xl">إدارة الباقات</h2>
            <p className="text-white/70 text-sm sm:text-base">إدارة باقات التدريب والأسعار</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-[#b03500] to-[#f64c01] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-[#f64c01]/30 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <span className="material-symbols-outlined">add</span>
            إضافة باقة جديدة
          </button>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
              <div className="p-6">
                {/* Package Image */}
                {pkg.imageUrl && (
                  <div className="mb-4">
                    <img 
                      src={`http://localhost:5000/${pkg.imageUrl}`} 
                      alt={pkg.nameAr}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Package Info */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{pkg.nameAr}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-[#f64c01]">€{pkg.price}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      pkg.isActive 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {pkg.isActive ? 'نشط' : 'غير نشط'}
                    </span>
                  </div>
                </div>
                <p className="text-white/70 text-sm mb-3">{pkg.descriptionAr}</p>
                {pkg.durationAr && (
                  <p className="text-white/60 text-sm mb-3">المدة: {pkg.durationAr}</p>
                )}
                {pkg.featuresAr && pkg.featuresAr.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-white font-medium mb-2">المميزات:</h4>
                    <ul className="space-y-1">
                      {pkg.featuresAr.map((feature, index) => (
                        <li key={index} className="text-white/70 text-sm flex items-center">
                          <span className="w-2 h-2 bg-[#f64c01] rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(pkg)}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => togglePackageStatus(pkg.id)}
                    className={`flex-1 py-2 rounded-lg transition-colors ${
                      pkg.isActive
                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                        : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                  >
                    {pkg.isActive ? 'إيقاف' : 'تفعيل'}
                  </button>
                  <button
                    onClick={() => handleDelete(pkg.id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create/Edit Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#1a3d5c] rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-white mb-4">
                {editingPackage ? 'تعديل الباقة' : 'إضافة باقة جديدة'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Arabic Fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">البيانات العربية</h3>
                  
                  <div>
                    <label className="block text-white/70 text-sm mb-2">اسم الباقة (عربي)</label>
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
                    <label className="block text-white/70 text-sm mb-2">الوصف (عربي)</label>
                    <textarea
                      name="descriptionAr"
                      value={formData.descriptionAr}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white h-24"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">المدة (عربي)</label>
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
                    <label className="block text-white/70 text-sm mb-2">المميزات (عربي)</label>
                    {formData.featuresAr.map((feature, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature('Ar', index, e.target.value)}
                          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                          placeholder="أدخل ميزة"
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature('Ar', index)}
                          className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                        >
                          حذف
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addFeature('Ar')}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                      إضافة ميزة
                    </button>
                  </div>
                </div>

                {/* Dutch Fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">البيانات الهولندية</h3>
                  
                  <div>
                    <label className="block text-white/70 text-sm mb-2">اسم الباقة (هولندي)</label>
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
                    <label className="block text-white/70 text-sm mb-2">الوصف (هولندي)</label>
                    <textarea
                      name="descriptionNl"
                      value={formData.descriptionNl}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white h-24"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">المدة (هولندي)</label>
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
                    <label className="block text-white/70 text-sm mb-2">المميزات (هولندي)</label>
                    {formData.featuresNl.map((feature, index) => (
                      <div key={index} className="flex gap-2 mb-2">
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
                          Verwijderen
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addFeature('Nl')}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                      Functie toevoegen
                    </button>
                  </div>
                </div>

                {/* Common Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">السعر</label>
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

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={(e) => handleInputChange({ target: { name: 'isActive', value: e.target.checked } })}
                      className="mr-2"
                    />
                    <label className="text-white/70 text-sm">الباقة نشطة</label>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#f64c01] text-white py-2 rounded-lg hover:bg-[#e54200]"
                  >
                    {editingPackage ? 'تحديث الباقة' : 'إضافة الباقة'}
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

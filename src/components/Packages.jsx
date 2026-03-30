import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import wheel from '../assets/wheel.png';
import hero from '../assets/hero.png';
import unnamed from '../assets/unnamed.png';

const Packages = () => {
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: 'Beginner Package',
      price: 899,
      description: 'Perfect for new drivers starting their journey. Includes all basic driving skills and theory lessons.',
      lessons: 20,
      features: ['20 driving lessons', 'Theory support', 'Free study materials', 'Mock driving test', 'Flexible scheduling'],
      isActive: true
    },
    {
      id: 2,
      name: 'Advanced Package',
      price: 1299,
      description: 'For experienced drivers looking to perfect their skills. Advanced techniques and highway driving included.',
      lessons: 30,
      features: ['30 driving lessons', 'Advanced techniques', 'Highway driving', 'Night driving experience', 'Priority scheduling'],
      isActive: true
    },
    {
      id: 3,
      name: 'Intensive Course',
      price: 1599,
      description: 'Fast-track your driving license with our intensive course. Complete in just 2 weeks.',
      lessons: 40,
      features: ['40 driving lessons', '2-week completion', 'Guaranteed test slot', 'One-on-one coaching', 'Free retake if needed'],
      isActive: false
    },
    {
      id: 4,
      name: 'Refresher Course',
      price: 499,
      description: 'For licensed drivers who want to improve their confidence and skills on the road.',
      lessons: 10,
      features: ['10 driving lessons', 'Confidence building', 'Parking practice', 'City driving', 'Defensive driving'],
      isActive: true
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    lessons: '',
    features: []
  });

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const packageData = {
      ...formData,
      price: parseFloat(formData.price),
      lessons: parseInt(formData.lessons),
      features: formData.features.filter(f => f.trim())
    };

    if (editingPackage) {
      // Update existing package
      setPackages(prev => prev.map(pkg => 
        pkg.id === editingPackage.id 
          ? { ...pkg, ...packageData }
          : pkg
      ));
    } else {
      // Create new package
      const newPackage = {
        id: Date.now(),
        ...packageData,
        isActive: true
      };
      setPackages(prev => [...prev, newPackage]);
    }

    // Reset form
    setShowCreateModal(false);
    setEditingPackage(null);
    setFormData({
      name: '',
      price: '',
      description: '',
      lessons: '',
      features: []
    });
  };

  const togglePackageStatus = (packageId) => {
    setPackages(prev => prev.map(pkg => 
      pkg.id === packageId 
        ? { ...pkg, isActive: !pkg.isActive }
        : pkg
    ));
  };

  const deletePackage = (packageId) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      setPackages(prev => prev.filter(pkg => pkg.id !== packageId));
    }
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const updateFeature = (index, value) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }));
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-white text-xl">Loading Packages...</div>
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
            <h2 className="text-2xl font-bold text-white mb-2 sm:text-3xl">Package Management</h2>
            <p className="text-white/70 text-sm sm:text-base">Manage driving school packages and pricing</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-[#b03500] to-[#f64c01] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-[#f64c01]/30 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <span className="material-symbols-outlined">add</span>
            Create Package
          </button>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                  <button 
                    onClick={() => togglePackageStatus(pkg.id)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      pkg.isActive ? 'bg-green-500' : 'bg-gray-500'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      pkg.isActive ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
                
                <div className="text-3xl font-bold text-[#f64c01] mb-4">
                  €{pkg.price}
                </div>
                
                <p className="text-white/70 text-sm mb-4">{pkg.description}</p>
                
                <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
                  <span className="material-symbols-outlined">schedule</span>
                  <span>{pkg.lessons} lessons</span>
                </div>
                
                <div className="space-y-2 mb-6">
                  {pkg.features?.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-white/80 text-sm">
                      <span className="material-symbols-outlined text-[#f64c01] text-sm">check_circle</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setEditingPackage(pkg);
                      setFormData({
                        name: pkg.name,
                        price: pkg.price.toString(),
                        description: pkg.description,
                        lessons: pkg.lessons.toString(),
                        features: pkg.features || []
                      });
                      setShowCreateModal(true);
                    }}
                    className="flex-1 bg-white/10 text-white py-2 rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined">edit</span>
                    Edit
                  </button>
                  <button 
                    onClick={() => deletePackage(pkg.id)}
                    className="bg-red-500/20 text-red-400 px-3 py-2 rounded-lg hover:bg-red-500/30 transition-all"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {packages.length === 0 && (
            <div className="col-span-full text-center py-12">
              <span className="material-symbols-outlined text-6xl text-white/20 mb-4">inventory_2</span>
              <p className="text-white/60 text-xl mb-4">No packages yet</p>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-[#b03500] to-[#f64c01] text-white px-6 py-3 rounded-xl font-bold"
              >
                Create First Package
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {editingPackage ? 'Edit Package' : 'Create Package'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Package Name</label>
                <input
                  type="text"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-[#b03500] focus:ring-2 focus:ring-[#b03500]/20 outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price (€)</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-[#b03500] focus:ring-2 focus:ring-[#b03500]/20 outline-none"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-[#b03500] focus:ring-2 focus:ring-[#b03500]/20 outline-none"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Lessons</label>
                <input
                  type="number"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-[#b03500] focus:ring-2 focus:ring-[#b03500]/20 outline-none"
                  value={formData.lessons}
                  onChange={(e) => setFormData({...formData, lessons: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Features</label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-[#b03500] focus:ring-2 focus:ring-[#b03500]/20 outline-none"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder="Feature description"
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="bg-red-500 text-white px-3 py-2 rounded-xl hover:bg-red-600 transition-all"
                    >
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined">add</span>
                  Add Feature
                </button>
              </div>
              
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingPackage(null);
                    setFormData({
                      name: '',
                      price: '',
                      description: '',
                      lessons: '',
                      features: []
                    });
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#b03500] to-[#f64c01] text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-[#f64c01]/30 transition-all"
                >
                  {editingPackage ? 'Update Package' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Packages;

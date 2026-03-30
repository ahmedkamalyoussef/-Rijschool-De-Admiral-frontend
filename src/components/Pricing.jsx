import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPublicPackages } from '../store/slices/packageSlice';
import i18n from '../i18n/i18n.js';

const Pricing = () => {
  const dispatch = useDispatch();
  const { publicPackages = [], isLoading, error } = useSelector((state) => state.packages);
  const [currentLang, setCurrentLang] = useState(i18n.language || 'nl');

  useEffect(() => {
    dispatch(fetchPublicPackages());
    
    const handleLanguageChanged = (lng) => setCurrentLang(lng);
    i18n.on('languageChanged', handleLanguageChanged);
    return () => i18n.off('languageChanged', handleLanguageChanged);
  }, [dispatch]);

  // Translation helper
  const t = (key) => i18n.t(key);

  // Helper to get content based on current language
  const getContent = (item) => {
    if (currentLang === 'ar') {
      return {
        name: item.nameAr || item.nameNl,
        description: item.descriptionAr || item.descriptionNl,
        features: item.featuresAr || item.featuresNl
      };
    }
    return {
      name: item.nameNl,
      description: item.descriptionNl,
      features: item.featuresNl
    };
  };

  if (isLoading) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-white" id="prijzen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#b03500]"></div>
            <p className="mt-2 text-gray-500">{currentLang === 'ar' ? 'جاري التحميل...' : 'Laden...'}</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-white" id="prijzen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-500">{t('pricing.error') || (currentLang === 'ar' ? 'حدث خطأ في تحميل الباقات.' : 'Er is een fout opgetreden bij het laden van de pakketten.')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white" id="prijzen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#091d2e] mb-4 font-headline tracking-tight">{t('pricing.title')}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg">{t('pricing.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {publicPackages.filter(pkg => pkg.isActive).length > 0 ? (
            publicPackages.filter(pkg => pkg.isActive).map((pkg) => {
              const content = getContent(pkg);
              return (
                <div key={pkg.id} className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 hover:border-[#b03500]/30 hover:shadow-xl hover:scale-105 transition-all flex flex-col shadow-sm">
                  <h3 className="text-lg sm:text-xl font-headline font-bold text-[#091d2e] mb-2">{content.name}</h3>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#b03500] mb-6">€{Number(pkg.price).toLocaleString('nl-NL')}</div>
                  {content.description && (
                    <p className="text-gray-600 text-sm mb-4">{content.description}</p>
                  )}
                  <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
                    {content.features && content.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <span className="material-symbols-outlined text-[#b03500] text-[16px] sm:text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span> {feature}
                      </li>
                    ))}
                  </ul>
                  <a 
                    href="#contact"
                    className="block w-full py-3 rounded-xl border-2 border-[#b03500] text-[#b03500] font-bold hover:bg-[#b03500] hover:text-white transition-all text-sm sm:text-base text-center"
                  >
                    {currentLang === 'ar' 
                      ? `اختر ${content.name}` 
                      : `Kies ${content.name}`
                    }
                  </a>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">{t('pricing.no_packages')}</p>
              <p className="text-gray-400 text-sm mt-2">{t('pricing.try_later')}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

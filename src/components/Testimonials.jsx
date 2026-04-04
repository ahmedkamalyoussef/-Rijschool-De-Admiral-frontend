import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTestimonials } from '../store/slices/postSlice';
import { getImageUrl } from '../services/api.js';
import i18n from '../i18n/i18n.js';

const Testimonials = () => {
  const dispatch = useDispatch();
  const { testimonials = [], isLoading, error } = useSelector((state) => state.posts);
  const [currentLang, setCurrentLang] = useState(i18n.language || 'nl');

  useEffect(() => {
    dispatch(fetchTestimonials());
    
    const handleLanguageChanged = (lng) => setCurrentLang(lng);
    i18n.on('languageChanged', handleLanguageChanged);
    return () => i18n.off('languageChanged', handleLanguageChanged);
  }, [dispatch]);

  // Translation helper
  const t = (key) => i18n.t(key);

  // Helper to get description based on current language
  const getDescription = (testimonial) => {
    if (currentLang === 'ar') {
      return testimonial.descriptionAr || testimonial.descriptionNl;
    }
    return testimonial.descriptionNl;
  };

  if (isLoading) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-[#f1f6ff] relative overflow-hidden" id="afgestudeerden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff5c16]"></div>
            <p className="mt-2 text-gray-500">{currentLang === 'ar' ? 'جاري التحميل...' : 'Laden...'}</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-[#f1f6ff] relative overflow-hidden" id="afgestudeerden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <p className="text-red-500">{currentLang === 'ar' ? 'حدث خطأ في تحميل التوصيات.' : 'Er is een fout opgetreden bij het laden van de getuigenissen.'}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#f1f6ff] relative overflow-hidden" id="afgestudeerden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-center mb-12 sm:mb-16 tracking-tight text-[#091d2e]">{t('testimonials.title')}</h2>
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
          {testimonials.length > 0 ? (
            testimonials.map((testimonial) => (
              <div key={testimonial.id} className="flex flex-col items-center text-center w-[220px]">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6 bg-gray-100">
                  {testimonial.imageUrl ? (
                    <img 
                      className="w-full h-full object-cover"
                      src={getImageUrl(testimonial.imageUrl)}
                      alt={testimonial.fullName}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="w-full h-full flex items-center justify-center bg-gray-200" style={{display: testimonial.imageUrl ? 'none' : 'flex'}}>
                    <span className="text-gray-500 text-2xl font-bold">
                      {testimonial.fullName ? testimonial.fullName.charAt(0).toUpperCase() : '?'}
                    </span>
                  </div>
                </div>
                <h4 className="font-headline font-bold text-xl sm:text-2xl text-[#091d2e] mb-2">{testimonial.fullName}</h4>
                <p className="text-xs sm:text-sm font-label text-[#ff5c16] font-bold tracking-widest uppercase mb-4">
                  {new Date(testimonial.createdAt).toLocaleDateString(currentLang === 'ar' ? 'ar-SA' : 'nl-NL', { month: 'long', year: 'numeric' })}
                </p>
                <p className="text-gray-600 italic leading-relaxed text-base sm:text-lg">"{getDescription(testimonial)}"</p>
                {/* Rating stars */}
                <div className="flex mt-4">
                  {[...Array(5)].map((_, index) => (
                    <span 
                      key={index} 
                      className={`material-symbols-outlined text-lg ${index < testimonial.stars ? 'text-yellow-400' : 'text-gray-300'}`}
                      style={{fontVariationSettings: "'FILL' 1"}}
                    >
                      star
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">{t('testimonials.no_testimonials')}</p>
              <p className="text-gray-400 text-sm mt-2">{t('testimonials.come_back')}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

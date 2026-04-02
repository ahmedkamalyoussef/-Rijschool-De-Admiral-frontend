import React, { useState, useEffect } from 'react';
import i18n from '../i18n/i18n.js';
import wheel from '../assets/wheel.png';
import logo from '../../../Rijschool-De-Admiral-backend/src/utils/logo.png';

const AboutUs = () => {
  const [currentLang, setCurrentLang] = useState(i18n.language || 'nl');

  useEffect(() => {
    const handleLanguageChanged = (lng) => setCurrentLang(lng);
    i18n.on('languageChanged', handleLanguageChanged);
    return () => i18n.off('languageChanged', handleLanguageChanged);
  }, []);

  // Translation helper
  const t = (key) => i18n.t(key);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden" id="over-ons">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 relative">
          <img 
            src={wheel} 
            alt={currentLang === 'ar' ? 'سيارة تعليم القيادة' : 'Rijles auto'} 
            className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-3xl shadow-2xl"
          />
          <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white p-4 sm:p-6 rounded-3xl shadow-xl z-20 border border-gray-50 flex items-center justify-center">
            <img 
              src={logo} 
              alt="De Admiraal Logo" 
              className="w-16 h-16 sm:w-16 sm:h-16 object-contain"
            />
          </div>
        </div>
        
        {/* Text Section */}
        <div className={`w-full lg:w-1/2 ${currentLang === 'ar' ? 'text-right' : ''}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#091d2e] mb-6 sm:mb-8 font-headline tracking-tight leading-tight">
            {currentLang === 'ar' ? (
              <>مهمتنا: <span className="text-[#f64c01]">الأمان</span> أولاً</>
            ) : (
              <>Onze Missie: <span className="text-[#f64c01]">Veiligheid</span> Eerst</>
            )}
          </h2>
          <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-600 leading-relaxed">
            <p className="font-bold text-[#091d2e] text-lg sm:text-xl">
              {currentLang === 'ar'
                ? '"القيادة ليست مجرد الانتقال من نقطة إلى أخرى، بل هي وعي، وسيطرة، ومسؤولية في كل لحظة."'
                : '"Rijden is niet alleen van A naar B. Het draait om inzicht, controle en verantwoordelijkheid in elke situatie."'
              }
            </p>
            <p>
              {currentLang === 'ar' 
                ? 'في مدرستنا في روتردام وباريندريخت، نقدم تجربة تعليم مختلفة نتجاوز الدروس التقليدية. من خلال إرشاد شخصي ومنهج مدروس، نساعدك ليس فقط على النجاح، بل على أن تصبح سائقاً واثقاً ومدركاً للطريق.'
                : 'Bij onze rijschool in Rotterdam en Barendrecht creëren we een leerervaring die verder gaat dan standaard rijlessen. Met persoonlijke begeleiding en een doordachte aanpak helpen wij jou om niet alleen te slagen, maar om een zelfverzekerde en bewuste bestuurder te worden.'
              }
            </p>
            <p className="font-bold text-[#f64c01] text-lg sm:text-xl">
              {currentLang === 'ar'
                ? 'لا نقدم برنامجاً ثابتاً للجميع، بل تدريباً يتكيف معك، لتنطلق بثقة وهدوء وتحكم كامل.'
                : 'Geen standaard trajecten, maar een aanpak die zich aanpast aan jou. Zodat jij met rust, zekerheid en volledige controle de weg op gaat.'
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

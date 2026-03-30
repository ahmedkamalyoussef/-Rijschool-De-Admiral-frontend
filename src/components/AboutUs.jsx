import React, { useState, useEffect } from 'react';
import i18n from '../i18n/i18n.js';
import wheel from '../assets/wheel.png';

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
          <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white p-6 sm:p-8 rounded-3xl shadow-xl z-20 border border-gray-50">
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#b03500] font-headline">15+</p>
            <p className="text-xs sm:text-sm font-label uppercase tracking-widest text-gray-400 font-bold mt-1">
              {currentLang === 'ar' ? 'سنوات خبرة' : 'Jaar Ervaring'}
            </p>
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
            <p>
              {currentLang === 'ar' 
                ? 'منذ عام 2009، أصبحت De Admiraal علامة بارزة في أمستردام. مع أكثر من 15 عامًا من الخبرة، ساعدنا آلاف الطلاب على الحصول على رخصة القيادة.'
                : 'Sinds 2009 is De Admiraal een begrip in Amsterdam. Met meer dan 15 jaar ervaring hebben we duizenden leerlingen geholpen hun rijbewijs te halen.'
              }
            </p>
            <p className="font-bold text-[#091d2e] text-lg sm:text-xl">
              {currentLang === 'ar'
                ? '"مساعدة الجميع على القيادة بأمان وثقة هي قيمتنا الأساسية."'
                : '"Iedereen veilig en zelfverzekerd de weg op helpen is onze kernwaarde."'
              }
            </p>
            <p>
              {currentLang === 'ar'
                ? 'يضمن نهجنا الشخصي أن كل طالب يمكنه التعلم بوتيرته الخاصة، بدعم من مدرسين صبورين هم خبراء في حركة المرور المزدحمة في أمستردام.'
                : 'Onze persoonlijke aanpak zorgt ervoor dat elke leerling op zijn eigen tempo kan leren, ondersteund door geduldige instructeurs die expert zijn in het drukke Amsterdamse verkeer.'
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

import React, { useState, useEffect } from 'react';
import i18n from '../i18n/i18n.js';

const WelcomeFeatures = () => {
  const [currentLang, setCurrentLang] = useState(i18n.language || 'nl');

  useEffect(() => {
    const handleLanguageChanged = (lng) => setCurrentLang(lng);
    i18n.on('languageChanged', handleLanguageChanged);
    return () => i18n.off('languageChanged', handleLanguageChanged);
  }, []);

  // Translation helper
  const t = (key) => i18n.t(key);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#f1f6ff] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start ${currentLang === 'ar' ? 'direction-rtl' : ''}`}>
          {/* Main Intro */}
          <div className={`lg:col-span-7 ${currentLang === 'ar' ? 'text-right' : ''}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#091d2e] mb-4 sm:mb-6 font-headline tracking-tight leading-tight">
              {currentLang === 'ar' 
                ? 'مرحباً بكم في مدرسة De Admiraal للقيادة'
                : 'Welkom bij Rijschool De Admiraal'
              }
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-2xl">
              {currentLang === 'ar'
                ? 'نؤمن أن تعلم القيادة هو أكثر من مجرد قيادة مركبة. إنه يتعلق بالثقة بالنفس، والبصيرة، والأمان على الطريق.'
                : 'Wij geloven dat leren rijden meer is dan alleen een voertuig besturen. Het gaat om zelfvertrouwen, inzicht en veiligheid op de weg.'
              }
            </p>
            <a className={`text-[#b03500] font-bold flex items-center gap-2 group text-base sm:text-lg w-fit ${currentLang === 'ar' ? 'flex-row-reverse mr-auto' : ''}`} href="#prijzen">
              <span className={`${currentLang === 'ar' ? 'order-2' : ''}`}>
                {currentLang === 'ar' ? 'اكتشف عروضنا' : 'Bekijk Ons Aanbod'}
              </span>
              <span className={`material-symbols-outlined transition-transform group-hover:translate-x-1 ${currentLang === 'ar' ? 'rotate-180 order-1' : ''}`}>arrow_forward</span>
            </a>
          </div>

          {/* Feature Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/50 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#f64c01]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-2xl sm:text-3xl text-[#f64c01]" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span>
              </div>
              <div className={currentLang === 'ar' ? 'text-right' : ''}>
                <h4 className="font-headline font-bold text-[#091d2e] text-lg sm:text-xl">
                  {currentLang === 'ar' ? 'مدربون ذوو خبرة' : 'Ervaren instructeurs'}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  {currentLang === 'ar' ? 'محترفون معتمدون بشغف للمهنة.' : 'Gecertificeerde professionals met passie voor het vak.'}
                </p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/50 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#f64c01]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-2xl sm:text-3xl text-[#f64c01]" style={{fontVariationSettings: "'FILL' 1"}}>trending_up</span>
              </div>
              <div className={currentLang === 'ar' ? 'text-right' : ''}>
                <h4 className="font-headline font-bold text-[#091d2e] text-lg sm:text-xl">
                  {currentLang === 'ar' ? 'نسبة نجاح عالية' : 'Hoge slagingspercentage'}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  {currentLang === 'ar' ? 'طلابنا ينجحون بمعدل أسرع من المتوسط.' : 'Onze leerlingen slagen sneller dan het gemiddelde.'}
                </p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/50 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#f64c01]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-2xl sm:text-3xl text-[#f64c01]" style={{fontVariationSettings: "'FILL' 1"}}>directions_car</span>
              </div>
              <div className={currentLang === 'ar' ? 'text-right' : ''}>
                <h4 className="font-headline font-bold text-[#091d2e] text-lg sm:text-xl">
                  {currentLang === 'ar' ? 'مركبات حديثة' : 'Moderne voertuigen'}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  {currentLang === 'ar' ? 'تعلم في أحدث الموديلات لأقصى درجات الراحة.' : 'Leren in de nieuwste modellen voor optimaal comfort.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeFeatures;

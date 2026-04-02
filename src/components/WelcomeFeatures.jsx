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
                ? 'مهمتنا وموقعنا'
                : 'Onze Missie & Locatie'
              }
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed max-w-2xl font-bold text-[#091d2e]">
              {currentLang === 'ar'
                ? 'القيادة هي مسؤولية'
                : 'Rijden is een verantwoordelijkheid'
              }
            </p>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-2xl">
              {currentLang === 'ar'
                ? 'نحن نقدم تجربة تدريبية ترفع من معايير تعلم قيادة السيارات. خدماتنا موجهة بشكل خاص للطلاب في منطقة روتردام، باريبدرخت والمناطق المحيطة.'
                : 'Wij bieden een trainingservaring die de standaard van het leren autorijden verhoogt. Onze diensten zijn specifiek gericht op leerlingen in de regio Rotterdam, Barendrecht en omstreken.'
              }
            </p>
            <p className="text-base sm:text-lg text-[#f64c01] font-bold mb-4 sm:mb-6">
              {currentLang === 'ar'
                ? 'مزايا نهجنا:'
                : 'De Voordelen van Onze Aanpak:'
              }
            </p>
          </div>

          {/* Feature Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/50 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#f64c01]/10 rounded-xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl sm:text-3xl text-[#f64c01]" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span>
              </div>
              <div className={currentLang === 'ar' ? 'text-right' : ''}>
                <h4 className="font-headline font-bold text-[#091d2e] text-lg sm:text-xl">
                  {currentLang === 'ar' ? 'توجيه شخصي ودقيق' : 'Persoonlijke en nauwkeurige begeleiding'}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  {currentLang === 'ar' ? 'كل طالب يحصل على الاهتمام الفردي اللازم لعملية تعلم مثلى.' : 'Elke leerling krijgt de individuele aandacht die nodig is voor een optimaal leerproces.'}
                </p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/50 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#f64c01]/10 rounded-xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl sm:text-3xl text-[#f64c01]" style={{fontVariationSettings: "'FILL' 1"}}>trending_up</span>
              </div>
              <div className={currentLang === 'ar' ? 'text-right' : ''}>
                <h4 className="font-headline font-bold text-[#091d2e] text-lg sm:text-xl">
                  {currentLang === 'ar' ? 'ثقة كاملة بالنفس على الطريق' : 'Volledig zelfvertrouwen op de weg'}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  {currentLang === 'ar' ? 'طريقتنا تضمن مشاركتك في حركة المرور بكل يقين وأمان.' : 'Onze methode zorgt ervoor dat je met zekerheid en veiligheid aan het verkeer deelneemt.'}
                </p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/50 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#f64c01]/10 rounded-xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl sm:text-3xl text-[#f64c01]" style={{fontVariationSettings: "'FILL' 1"}}>directions_car</span>
              </div>
              <div className={currentLang === 'ar' ? 'text-right' : ''}>
                <h4 className="font-headline font-bold text-[#091d2e] text-lg sm:text-xl">
                  {currentLang === 'ar' ? 'دروس احترافية في روتردام' : 'Professionele lessen in Rotterdam'}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  {currentLang === 'ar' ? 'خدماتنا موجهة بشكل خاص للطلاب في منطقة روتردام والمناطق المحيطة.' : 'Onze diensten zijn specifiek gericht op leerlingen in de regio Rotterdam en omstreken.'}
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

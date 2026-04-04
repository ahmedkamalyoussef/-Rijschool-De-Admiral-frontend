import React, { useState, useEffect } from 'react';
import i18n from '../i18n/i18n.js';

const Footer = () => {
  const [currentLang, setCurrentLang] = useState(i18n.language || 'nl');

  useEffect(() => {
    const handleLanguageChanged = (lng) => setCurrentLang(lng);
    i18n.on('languageChanged', handleLanguageChanged);
    return () => i18n.off('languageChanged', handleLanguageChanged);
  }, []);

  // Translation helper
  const t = (key) => i18n.t(key);
  return (
    <footer className="bg-[#091d2e] w-full pt-12 sm:pt-16 pb-8 text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <div className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 font-headline tracking-tighter">De Admiraal</div>
          <p className="text-gray-400 text-sm leading-relaxed mb-4 sm:mb-6 font-body">
            {t('footer.description')}
          </p>
          <div className="flex gap-3 sm:gap-4">
            <a 
              href="https://www.facebook.com/share/1ApYEVFrWs/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#b03500] transition-colors cursor-pointer border border-white/10"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>
            </a>
            <a 
              href="https://www.instagram.com/rijschooldeadmiraal?igsh=MTJuODZwYjFqM3lkag==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#b03500] transition-colors cursor-pointer border border-white/10"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
            </a>
            <a 
              href="https://wa.me/31635689999" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500 flex items-center justify-center text-white hover:bg-green-600 transition-colors cursor-pointer border border-white/10"
              aria-label="WhatsApp"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 5.835h-.004c-1.327 0-2.623-.353-3.759-1.021l-.27-.16-2.808.736.751-2.735-.177-.282C4.057 15.067 3.53 13.441 3.53 11.727c0-4.418 3.599-8.006 8.024-8.006 2.143 0 4.156.835 5.673 2.351 1.517 1.518 2.351 3.532 2.35 5.676-.002 4.418-3.599 8.006-8.025 8.006m7.134-11.171c-.145-.398-.513-.668-.935-.668-.002 0-.003 0-.005 0-.423 0-.792.27-.936.669l-.523 1.437c-.133.366-.046.775.227 1.046l.025.025c.198.199.46.307.736.307.177 0 .355-.052.509-.155l1.437-.523c.399-.145.669-.513.669-.936 0-.002 0-.003 0-.005 0-.422-.27-.791-.669-.936l-1.437-.523c-.185-.068-.383-.082-.572-.043l.567-.156zM12.001.667C5.554.667.333 5.885.333 12.333c0 1.83.478 3.581 1.379 5.14L.667 23.333l5.96-1.034c1.558.896 3.309 1.375 5.14 1.375 6.446 0 11.667-5.22 11.667-11.667S18.447.667 12.001.667"/></svg>
            </a>
          </div>
        </div>
        <div className="col-span-1">
          <h4 className="text-white font-bold mb-4 sm:mb-6 font-headline text-base sm:text-lg">{currentLang === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h4>
          <ul className="space-y-3 sm:space-y-4">
            <li><a className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base" href="#home">{t('nav.home')}</a></li>
            <li><a className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base" href="#over-ons">{t('nav.about')}</a></li>
            <li><a className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base" href="#prijzen">{t('nav.pricing')}</a></li>
            <li><a className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base" href="#contact">{t('nav.contact')}</a></li>
          </ul>
        </div>
        <div className="col-span-1">
          <h4 className="text-white font-bold mb-4 sm:mb-6 font-headline text-base sm:text-lg">{currentLang === 'ar' ? 'معلومات قانونية' : 'Legale Informatie'}</h4>
          <ul className="space-y-3 sm:space-y-4">
            <li><a className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base" href="#">{currentLang === 'ar' ? 'سياسة الخصوصية' : 'Privacybeleid'}</a></li>
            <li><a className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base" href="#">{currentLang === 'ar' ? 'الشروط والأحكام' : 'Algemene Voorwaarden'}</a></li>
            <li><a className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base" href="#">{currentLang === 'ar' ? 'سياسة الكوكيز' : 'Cookiebeleid'}</a></li>
          </ul>
        </div>
        <div className="col-span-1">
          <h4 className="text-white font-bold mb-4 sm:mb-6 font-headline text-base sm:text-lg">{currentLang === 'ar' ? 'النشرة الإخبارية' : 'Nieuwsbrief'}</h4>
          <p className="text-gray-400 text-sm mb-4 font-body leading-relaxed">{currentLang === 'ar' ? 'ابقَ على اطلاع بالعروض ونصائح القيادة الجديدة.' : 'Blijf op de hoogte van acties en nieuwe rij-tips.'}</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input className="bg-white/5 border border-white/10 rounded-lg p-3 w-full text-white text-sm focus:ring-1 focus:ring-[#b03500] outline-none" placeholder={currentLang === 'ar' ? 'البريد الإلكتروني' : 'Email'} type="email"/>
            <button className="bg-[#ff5c16] px-4 rounded-lg text-white font-bold hover:bg-opacity-90 transition-all text-sm">OK</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-xs font-label uppercase tracking-widest font-bold text-center sm:text-left">
          © 2024 Rijschool De Admiraal Amsterdam. {currentLang === 'ar' ? 'جميع الحقوق محفوظة.' : 'Alle rechten voorbehouden.'}
        </p>
        <div className="flex gap-3 sm:gap-4">
          <span className="text-gray-600 text-[20px] sm:text-[24px] material-symbols-outlined">payments</span>
          <span className="text-gray-600 text-[20px] sm:text-[24px] material-symbols-outlined">shield</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

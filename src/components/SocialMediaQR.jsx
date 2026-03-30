import React, { useState, useEffect } from 'react';
import i18n from '../i18n/i18n.js';

const SocialMediaQR = () => {
  const [currentLang, setCurrentLang] = useState(i18n.language || 'nl');

  useEffect(() => {
    const handleLanguageChanged = (lng) => setCurrentLang(lng);
    i18n.on('languageChanged', handleLanguageChanged);
    return () => i18n.off('languageChanged', handleLanguageChanged);
  }, []);

  // Translation helper
  const t = (key) => i18n.t(key);

  const socialLinks = {
    facebook: {
      url: 'https://www.facebook.com/share/1ApYEVFrWs/',
      qrCode: '/faceQr.jpg',
      name: 'Facebook',
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      icon: 'facebook'
    },
    instagram: {
      url: 'https://www.instagram.com/rijschooldeadmiraal?igsh=MTJuODZwYjFqM3lkag==',
      qrCode: '/instaQr.jpg',
      name: 'Instagram',
      color: 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500',
      hoverColor: 'hover:from-purple-700 hover:via-pink-700 hover:to-orange-600',
      icon: 'photo_camera'
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50" id="social">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-[#091d2e] mb-4 tracking-tight">
            {t('social.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            {t('social.subtitle')}
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 max-w-fit">
            {Object.entries(socialLinks).map(([platform, data]) => (
              <div key={platform} className="flex flex-col items-center group">
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 flex flex-col items-center">
                  {/* QR Code */}
                  <div className="w-48 h-48 sm:w-56 sm:h-56 mb-6 rounded-lg overflow-hidden bg-gray-50 border-2 border-gray-200 flex items-center justify-center">
                    <img 
                      src={data.qrCode} 
                      alt={`${data.name} QR Code`}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full hidden items-center justify-center bg-gray-100">
                      <span className="material-symbols-outlined text-6xl text-gray-400">
                        qr_code_2
                      </span>
                    </div>
                  </div>

                  {/* Platform Name */}
                  <h3 className="text-xl sm:text-2xl font-headline font-bold text-[#091d2e] mb-4 text-center">
                    {data.name}
                  </h3>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <a
                      href={data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${data.color} ${data.hoverColor} text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg`}
                    >
                      <span className="material-symbols-outlined">
                        {data.icon}
                      </span>
                      Volg ons op {data.name}
                    </a>
                    
                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500">
                        Scan de QR-code of klik hier
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Badge */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <span className="material-symbols-outlined text-xs">qr_code_scanner</span>
                    Scan nu!
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default SocialMediaQR;

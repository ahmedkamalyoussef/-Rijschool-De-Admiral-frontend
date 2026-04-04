import React, { useState, useEffect } from 'react';
import { contactService } from '../services/contactService';
import i18n from '../i18n/i18n.js';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [currentLang, setCurrentLang] = useState(i18n.language || 'nl');

  useEffect(() => {
    const handleLanguageChanged = (lng) => setCurrentLang(lng);
    i18n.on('languageChanged', handleLanguageChanged);
    return () => i18n.off('languageChanged', handleLanguageChanged);
  }, []);

  // Translation helper
  const t = (key) => i18n.t(key);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await contactService.createContact(formData);
      
      if (response.data.status) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch ${currentLang === 'ar' ? 'direction-rtl' : ''}`}>
          {/* Contact Form */}
          <div className={`w-full p-6 sm:p-8 lg:p-12 bg-[#f8fafc] ${currentLang === 'ar' ? ' rounded-r-3xl' : ' rounded-l-3xl'} shadow-xl`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-[#091d2e] mb-6 sm:mb-8 tracking-tight">{t('contact.title')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl">
                  <p className="text-sm font-medium">{t('contact.success')}</p>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-[#ff5c16] px-4 py-3 rounded-xl">
                  <p className="text-sm font-medium">{t('contact.error')}</p>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-label uppercase tracking-widest text-gray-400 font-bold mb-2">{t('contact.name')}</label>
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-gray-200 rounded-xl p-3 sm:p-4 focus:ring-2 focus:ring-[#b03500]/40 focus:border-[#b03500] transition-all text-[#091d2e] text-sm sm:text-base shadow-sm" 
                    placeholder={currentLang === 'ar' ? 'اسمك' : 'Uw naam'} 
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-label uppercase tracking-widest text-gray-400 font-bold mb-2">{t('contact.email')}</label>
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-gray-200 rounded-xl p-3 sm:p-4 focus:ring-2 focus:ring-[#b03500]/40 focus:border-[#b03500] transition-all text-[#091d2e] text-sm sm:text-base shadow-sm" 
                    placeholder={currentLang === 'ar' ? 'بريدك الإلكتروني' : 'Uw email'} 
                    type="email"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-label uppercase tracking-widest text-gray-400 font-bold mb-2">{t('contact.phone')}</label>
                <input 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full bg-white border border-gray-200 rounded-xl p-3 sm:p-4 focus:ring-2 focus:ring-[#b03500]/40 focus:border-[#b03500] transition-all text-[#091d2e] text-sm sm:text-base shadow-sm ${currentLang === 'ar' ? 'text-right direction-rtl' : ''}`} 
                  placeholder={currentLang === 'ar' ? 'رقم الهاتف' : 'Telefoonnummer'} 
                  type="tel"
                  style={currentLang === 'ar' ? {direction: 'rtl'} : {}}
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-label uppercase tracking-widest text-gray-400 font-bold mb-2">{t('contact.subject')}</label>
                <input 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 sm:p-4 focus:ring-2 focus:ring-[#b03500]/40 focus:border-[#b03500] transition-all text-[#091d2e] text-sm sm:text-base shadow-sm" 
                  placeholder={currentLang === 'ar' ? 'موضوع رسالتك' : 'Onderwerp van uw bericht'} 
                  type="text"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-label uppercase tracking-widest text-gray-400 font-bold mb-2">{t('contact.message')}</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 sm:p-4 focus:ring-2 focus:ring-[#b03500]/40 focus:border-[#b03500] transition-all text-[#091d2e] text-sm sm:text-base shadow-sm" 
                  placeholder={currentLang === 'ar' ? 'رسالتك...' : 'Uw bericht...'} 
                  rows="4"
                />
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-[#ff5c16] text-white w-full py-3 sm:py-4 rounded-xl font-headline font-bold text-base sm:text-xl shadow-lg shadow-[#b03500]/20 hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    {t('contact.sending')}
                  </>
                ) : (
                  t('contact.send')
                )}
              </button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div className={`w-full bg-[#091d2e] p-6 sm:p-8 lg:p-12 text-white flex flex-col ${currentLang === 'ar' ? ' rounded-l-3xl' : ' rounded-r-3xl'}`}>
            <div>
              <h3 className="text-2xl sm:text-3xl font-headline font-bold mb-8 sm:mb-10 text-[#ff5c16]">{t('contact.contact_info')}</h3>
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-[#ff5c16] text-2xl sm:text-3xl">location_on</span>
                  <div>
                    <p className="font-bold text-base sm:text-lg">{currentLang === 'ar' ? 'العنوان' : 'Adres'}</p>
                    <p className="text-gray-300 text-sm sm:text-base">Onyxlan 40,<br/>3162TC Rhoon</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-[#ff5c16] text-2xl sm:text-3xl">call</span>
                  <div>
                    <p className="font-bold text-base sm:text-lg">{t('contact.phone')}</p>
                    <p className="text-gray-300 text-sm sm:text-base">+31635689999</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-[#ff5c16] text-2xl sm:text-3xl">chat</span>
                  <div>
                    <p className="font-bold text-base sm:text-lg">WhatsApp</p>
                    <a 
                      href="https://wa.me/31635689999" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors mt-1"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 5.835h-.004c-1.327 0-2.623-.353-3.759-1.021l-.27-.16-2.808.736.751-2.735-.177-.282C4.057 15.067 3.53 13.441 3.53 11.727c0-4.418 3.599-8.006 8.024-8.006 2.143 0 4.156.835 5.673 2.351 1.517 1.518 2.351 3.532 2.35 5.676-.002 4.418-3.599 8.006-8.025 8.006m7.134-11.171c-.145-.398-.513-.668-.935-.668-.002 0-.003 0-.005 0-.423 0-.792.27-.936.669l-.523 1.437c-.133.366-.046.775.227 1.046l.025.025c.198.199.46.307.736.307.177 0 .355-.052.509-.155l1.437-.523c.399-.145.669-.513.669-.936 0-.002 0-.003 0-.005 0-.422-.27-.791-.669-.936l-1.437-.523c-.185-.068-.383-.082-.572-.043l.567-.156zM12.001.667C5.554.667.333 5.885.333 12.333c0 1.83.478 3.581 1.379 5.14L.667 23.333l5.96-1.034c1.558.896 3.309 1.375 5.14 1.375 6.446 0 11.667-5.22 11.667-11.667S18.447.667 12.001.667"/></svg>
                      {currentLang === 'ar' ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-[#f64c01] text-2xl sm:text-3xl">schedule</span>
                  <div>
                    <p className="font-bold text-base sm:text-lg">{t('contact.opening_hours')}</p>
                    <p className="text-gray-300 text-sm sm:text-base">{t('contact.weekdays')}<br/>{t('contact.saturday')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 rounded-2xl overflow-hidden grayscale contrast-125 opacity-40 h-48 relative">
              <img 
                className="w-full h-full object-cover" 
                data-alt="Monochrome artistic aerial map view of Amsterdam canals and streets with high contrast and minimalist feel"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGV7HDEG5BxgPG7caXMpbmbCQBpyufwBk15knLdNfv14dSYKEsxdf76_DOmgfZ01zAs2oOpiMo97_7k3w89trVZOftRO7qW3A0v7OHAVXci1M--Vop3wAZnLSN3PUdFapFWb5DAYNREFHSrHF9HXKGNAOMtkeWESdgCdOkeZ45wHlITu1sFov05LK3Fb6FKarRxZ0P8IDzlfKGpbYZ4iTGPhay4C4Sy_pkCREqOD_C-Kcq6UjxqL2Hm4wpZ83BYgXOAmSS9vUAZio"
              />
              <div className="absolute inset-0 bg-[#b03500]/10 mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

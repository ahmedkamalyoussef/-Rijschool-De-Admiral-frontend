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
          <div className="w-full p-6 sm:p-8 lg:p-12 bg-[#f8fafc] rounded-l-3xl shadow-xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-[#091d2e] mb-6 sm:mb-8 tracking-tight">{t('contact.title')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl">
                  <p className="text-sm font-medium">{t('contact.success')}</p>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl">
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
                className="bg-[#b03500] text-white w-full py-3 sm:py-4 rounded-xl font-headline font-bold text-base sm:text-xl shadow-lg shadow-[#b03500]/20 hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
          <div className="w-full bg-[#091d2e] p-6 sm:p-8 lg:p-12 text-white flex flex-col rounded-r-3xl">
            <div>
              <h3 className="text-2xl sm:text-3xl font-headline font-bold mb-8 sm:mb-10 text-[#f64c01]">{t('contact.contact_info')}</h3>
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-[#f64c01] text-2xl sm:text-3xl">location_on</span>
                  <div>
                    <p className="font-bold text-base sm:text-lg">{currentLang === 'ar' ? 'العنوان' : 'Adres'}</p>
                    <p className="text-gray-300 text-sm sm:text-base">Van der Helststraat 123,<br/>1073 AZ Amsterdam</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-[#f64c01] text-2xl sm:text-3xl">call</span>
                  <div>
                    <p className="font-bold text-base sm:text-lg">{t('contact.phone')}</p>
                    <p className="text-gray-300 text-sm sm:text-base">020-1234567</p>
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

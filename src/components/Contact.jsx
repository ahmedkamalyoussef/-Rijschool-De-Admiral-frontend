import React from 'react';

const Contact = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
          {/* Contact Form */}
          <div className="w-full p-6 sm:p-8 lg:p-12 bg-[#f8fafc] rounded-l-3xl shadow-xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-[#091d2e] mb-6 sm:mb-8 tracking-tight">Neem Contact Op</h2>
            <form className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-label uppercase tracking-widest text-gray-400 font-bold mb-2">Naam</label>
                  <input className="w-full bg-white border border-gray-200 rounded-xl p-3 sm:p-4 focus:ring-2 focus:ring-[#b03500]/40 focus:border-[#b03500] transition-all text-[#091d2e] text-sm sm:text-base shadow-sm" placeholder="Uw naam" type="text"/>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-label uppercase tracking-widest text-gray-400 font-bold mb-2">Email</label>
                  <input className="w-full bg-white border border-gray-200 rounded-xl p-3 sm:p-4 focus:ring-2 focus:ring-[#b03500]/40 focus:border-[#b03500] transition-all text-[#091d2e] text-sm sm:text-base shadow-sm" placeholder="Uw email" type="email"/>
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-label uppercase tracking-widest text-gray-400 font-bold mb-2">Telefoon</label>
                <input className="w-full bg-white border border-gray-200 rounded-xl p-3 sm:p-4 focus:ring-2 focus:ring-[#b03500]/40 focus:border-[#b03500] transition-all text-[#091d2e] text-sm sm:text-base shadow-sm" placeholder="Telefoonnummer" type="tel"/>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-label uppercase tracking-widest text-gray-400 font-bold mb-2">Bericht</label>
                <textarea className="w-full bg-white border border-gray-200 rounded-xl p-3 sm:p-4 focus:ring-2 focus:ring-[#b03500]/40 focus:border-[#b03500] transition-all text-[#091d2e] text-sm sm:text-base shadow-sm" placeholder="Uw bericht..." rows="4"></textarea>
              </div>
              <button className="bg-[#b03500] text-white w-full py-3 sm:py-4 rounded-xl font-headline font-bold text-base sm:text-xl shadow-lg shadow-[#b03500]/20 hover:opacity-95 active:scale-[0.98] transition-all">
                Verstuur Bericht
              </button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div className="w-full bg-[#091d2e] p-6 sm:p-8 lg:p-12 text-white flex flex-col rounded-r-3xl">
            <div>
              <h3 className="text-2xl sm:text-3xl font-headline font-bold mb-8 sm:mb-10 text-[#f64c01]">Contactgegevens</h3>
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-[#f64c01] text-2xl sm:text-3xl">location_on</span>
                  <div>
                    <p className="font-bold text-base sm:text-lg">Adres</p>
                    <p className="text-gray-300 text-sm sm:text-base">Van der Helststraat 123,<br/>1073 AZ Amsterdam</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-[#f64c01] text-2xl sm:text-3xl">call</span>
                  <div>
                    <p className="font-bold text-base sm:text-lg">Telefoon</p>
                    <p className="text-gray-300 text-sm sm:text-base">020-1234567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-[#f64c01] text-2xl sm:text-3xl">schedule</span>
                  <div>
                    <p className="font-bold text-base sm:text-lg">Openingstijden</p>
                    <p className="text-gray-300 text-sm sm:text-base">Ma-Vr: 9:00 - 18:00<br/>Za: 10:00 - 16:00</p>
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

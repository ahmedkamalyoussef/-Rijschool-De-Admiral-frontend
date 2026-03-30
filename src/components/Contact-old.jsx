import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
    alert('Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section className="py-24 bg-surface" id="contact">
      <div className="max-w-7xl mx-auto px-8">
        <div className="bg-surface-container-lowest rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Contact Form */}
          <div className="w-full md:w-3/5 p-12 lg:p-16">
            <h2 className="text-4xl font-headline font-bold text-on-surface mb-8">
              Neem Contact Op
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-label uppercase tracking-widest text-on-surface-variant mb-2">
                    Naam
                  </label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border-0 rounded-xl p-4 focus:ring-2 focus:ring-primary/40 transition-all"
                    placeholder="Uw naam"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-label uppercase tracking-widest text-on-surface-variant mb-2">
                    Email
                  </label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border-0 rounded-xl p-4 focus:ring-2 focus:ring-primary/40 transition-all"
                    placeholder="Uw email"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-label uppercase tracking-widest text-on-surface-variant mb-2">
                  Telefoon
                </label>
                <input 
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-surface-container-low border-0 rounded-xl p-4 focus:ring-2 focus:ring-primary/40 transition-all"
                  placeholder="Telefoonnummer"
                />
              </div>
              
              <div>
                <label className="block text-sm font-label uppercase tracking-widest text-on-surface-variant mb-2">
                  Bericht
                </label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-surface-container-low border-0 rounded-xl p-4 focus:ring-2 focus:ring-primary/40 transition-all"
                  placeholder="Uw bericht..."
                  rows="4"
                  required
                />
              </div>
              
              <button 
                type="submit"
                className="tonal-gradient text-on-primary w-full py-4 rounded-xl font-headline font-bold text-lg shadow-lg hover:shadow-primary/30 active:scale-[0.98] transition-all"
              >
                Verstuur Bericht
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-2/5 bg-on-surface p-12 lg:p-16 text-surface flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-headline font-bold mb-10 text-primary-container">
                Contactgegevens
              </h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary-container">
                    location_on
                  </span>
                  <div>
                    <p className="font-bold">Adres</p>
                    <p className="text-surface-variant">
                      Van der Helststraat 123,<br />
                      1073 AZ Amsterdam
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary-container">
                    call
                  </span>
                  <div>
                    <p className="font-bold">Telefoon</p>
                    <p className="text-surface-variant">020-1234567</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary-container">
                    schedule
                  </span>
                  <div>
                    <p className="font-bold">Openingstijden</p>
                    <p className="text-surface-variant">
                      Ma-Vr: 9:00 - 18:00<br />
                      Za: 10:00 - 16:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 rounded-2xl overflow-hidden grayscale contrast-125 opacity-50 h-48 relative">
              <img 
                className="w-full h-full object-cover" 
                alt="Monochrome artistic aerial map view of Amsterdam canals and streets with high contrast and minimalist feel"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGV7HDEG5BxgPG7caXMpbmbCQBpyufwBk15knLdNfv14dSYKEsxdf76_DOmgfZ01zAs2oOpiMo97_7k3w89trVZOftRO7qW3A0v7OHAVXci1M--Vop3wAZnLSN3PUdFapFWb5DAYNREFHSrHF9HXKGNAOMtkeWESdgCdOkeZ45wHlITu1sFov05LK3Fb6FKarRxZ0P8IDzlfKGpbYZ4iTGPhay4C4Sy_pkCREqOD_C-Kcq6UjxqL2Hm4wpZ83BYgXOAmSS9vUAZio"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Bedankt voor uw inschrijving met ${email}!`);
      setEmail('');
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 dark:bg-black w-full pt-16 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 max-w-7xl mx-auto">
        {/* Company Info */}
        <div className="col-span-1 md:col-span-1">
          <div className="text-xl font-bold text-white mb-6 font-headline tracking-tighter">
            De Admiraal
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6 font-body">
            Uw partner in veilige kilometers en professionele begeleiding op de weg door heel Amsterdam en omstreken.
          </p>
          <div className="flex gap-4">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-primary transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
              </svg>
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-primary transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="col-span-1">
          <h4 className="text-white font-bold mb-6 font-headline">Quick Links</h4>
          <ul className="space-y-4">
            <li>
              <button 
                onClick={() => scrollToSection('home')}
                className="text-slate-400 hover:text-white transition-colors text-left"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('over-ons')}
                className="text-slate-400 hover:text-white transition-colors text-left"
              >
                Over Ons
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('prijzen')}
                className="text-slate-400 hover:text-white transition-colors text-left"
              >
                Prijzen
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-slate-400 hover:text-white transition-colors text-left"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>

        {/* Legal Info */}
        <div className="col-span-1">
          <h4 className="text-white font-bold mb-6 font-headline">Legale Informatie</h4>
          <ul className="space-y-4">
            <li>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Privacybeleid
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Algemene Voorwaarden
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Cookiebeleid
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="col-span-1">
          <h4 className="text-white font-bold mb-6 font-headline">Nieuwsbrief</h4>
          <p className="text-slate-400 text-sm mb-4 font-body">
            Blijf op de hoogte van acties en nieuwe rij-tips.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex">
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-800 border-0 rounded-l-lg p-3 w-full text-white text-sm focus:ring-1 focus:ring-primary"
              placeholder="Email"
              required
            />
            <button 
              type="submit"
              className="bg-primary px-4 rounded-r-lg text-white font-bold hover:opacity-90 transition-opacity"
            >
              OK
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-8 mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 text-xs font-label uppercase tracking-widest">
          © 2024 Rijschool De Admiraal Amsterdam. Alle rechten voorbehouden.
        </p>
        <div className="flex gap-4">
          <span className="text-slate-600 text-[20px] material-symbols-outlined">
            payments
          </span>
          <span className="text-slate-600 text-[20px] material-symbols-outlined">
            shield
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

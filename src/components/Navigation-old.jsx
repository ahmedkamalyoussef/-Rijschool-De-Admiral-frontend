import React, { useState, useEffect } from 'react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 glass-nav shadow-sm transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-orange-700 dark:text-orange-400 tracking-tighter font-headline">
          De Admiraal
        </div>
        
        <div className="hidden md:flex items-center gap-8 font-headline font-semibold tracking-tight">
          <button 
            onClick={() => scrollToSection('home')}
            className="text-orange-600 dark:text-orange-400 border-b-2 border-orange-600 transition-all duration-300"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('over-ons')}
            className="text-slate-800 dark:text-slate-200 hover:text-orange-500 transition-all duration-300"
          >
            Over Ons
          </button>
          <button 
            onClick={() => scrollToSection('prijzen')}
            className="text-slate-800 dark:text-slate-200 hover:text-orange-500 transition-all duration-300"
          >
            Prijzen
          </button>
          <button 
            onClick={() => scrollToSection('afgestudeerden')}
            className="text-slate-800 dark:text-slate-200 hover:text-orange-500 transition-all duration-300"
          >
            Afgestudeerden
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-slate-800 dark:text-slate-200 hover:text-orange-500 transition-all duration-300"
          >
            Contact
          </button>
        </div>
        
        <button 
          onClick={() => scrollToSection('contact')}
          className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-headline font-bold transition-all duration-300 hover:opacity-90 active:scale-95"
        >
          Direct Inschrijven
        </button>
      </div>
    </nav>
  );
};

export default Navigation;

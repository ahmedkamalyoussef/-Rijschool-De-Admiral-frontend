import React, { useState } from 'react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav shadow-sm">
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-bold text-[#b03500] tracking-tighter font-headline">
          <img 
            src="/src/assets/logo.png" 
            alt="Rijschool De Admiraal Logo" 
            className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
          />
          <span className="hidden xs:block">De Admiraal</span>
          <span className="xs:hidden">De Admiraal</span>
        </div>
        
        {/* Mobile menu button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
        >
          <span className="material-symbols-outlined text-2xl">
            {isMenuOpen ? 'close' : 'menu'}
          </span>
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 font-headline font-semibold tracking-tight">
          <a className="text-[#b03500] border-b-2 border-[#b03500] transition-all duration-300 text-sm lg:text-base" href="#home">Home</a>
          <a className="text-gray-700 hover:text-[#b03500] transition-all duration-300 text-sm lg:text-base" href="#over-ons">Over Ons</a>
          <a className="text-gray-700 hover:text-[#b03500] transition-all duration-300 text-sm lg:text-base" href="#prijzen">Prijzen</a>
          <a className="text-gray-700 hover:text-[#b03500] transition-all duration-300 text-sm lg:text-base" href="#afgestudeerden">Afgestudeerden</a>
          <a className="text-gray-700 hover:text-[#b03500] transition-all duration-300 text-sm lg:text-base" href="#contact">Contact</a>
        </div>
        
        {/* Desktop CTA button */}
        <a className="hidden md:block bg-[#b03500] text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-xl font-headline font-bold text-sm lg:text-base transition-all duration-300 hover:opacity-90 active:scale-95" href="#contact">
          Direct Inschrijven
        </a>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-80' : 'max-h-0'}`}>
        <div className="px-4 py-4 space-y-3 border-t border-gray-200 bg-white/95 backdrop-blur-sm">
          <a className="block text-[#b03500] font-headline font-semibold py-2 text-sm" href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
          <a className="block text-gray-700 hover:text-[#b03500] font-headline font-semibold py-2 text-sm" href="#over-ons" onClick={() => setIsMenuOpen(false)}>Over Ons</a>
          <a className="block text-gray-700 hover:text-[#b03500] font-headline font-semibold py-2 text-sm" href="#prijzen" onClick={() => setIsMenuOpen(false)}>Prijzen</a>
          <a className="block text-gray-700 hover:text-[#b03500] font-headline font-semibold py-2 text-sm" href="#afgestudeerden" onClick={() => setIsMenuOpen(false)}>Afgestudeerden</a>
          <a className="block text-gray-700 hover:text-[#b03500] font-headline font-semibold py-2 text-sm" href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
          <a className="block bg-[#b03500] text-white px-6 py-3 rounded-xl font-headline font-bold text-sm text-center mt-4" href="#contact" onClick={() => setIsMenuOpen(false)}>
            Direct Inschrijven
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

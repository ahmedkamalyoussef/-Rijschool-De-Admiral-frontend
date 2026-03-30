import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] sm:min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden pt-16 sm:pt-20" id="home">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#091d2e] via-[#0f2942] to-[#1a3d5c]"></div>
        <div className="absolute inset-0 bg-[url('/src/assets/unnamed.png')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#091d2e]/80 via-transparent to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#f64c01] text-white font-headline text-xs sm:text-sm font-bold tracking-widest uppercase mb-4 sm:mb-6">
            Sinds 2009 in Amsterdam
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-tight mb-4 sm:mb-6 font-headline tracking-tighter">
            Professionele
            <span className="block">Rijlessen</span>
            <span className="block text-[#f64c01]">in Amsterdam</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 lg:mb-10 leading-relaxed font-light">
            Begin uw rijavontuur vandaag bij de meest vertrouwde rijschool van de regio. Mastery begint bij de basis.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <a className="bg-orange-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-headline font-bold text-base sm:text-lg shadow-lg hover:shadow-[#FF9900]/20 transition-all text-center" href="#contact">
              Start Nu
            </a>
            <a className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-headline font-bold text-base sm:text-lg hover:bg-white/20 transition-all text-center" href="#over-ons">
              Meer Info
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import React from 'react';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20" id="home">
      <div className="absolute inset-0 z-0">
        <img 
          className="w-full h-full object-cover" 
          alt="Modern white driving school car on a scenic road at sunset with warm golden hour lighting and soft shadows"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFhpVzUn7M7vj_fmaTvguySAXFBYUjoWBg7bPCpaCo2MXaz1C8S4WhNMDSle4lSWGehDq3sUcM78LoaJjpVTdPWT9KbPRgXqbl53nQFr0R-Sp1_rZifCzIe758RVS9zlLvq_8JEQUyCRNq-9rYYIaHtCDhFqHuUu9zbQc3UqowSfOGTy3jdosIV0wJJZOy6NJqLvcsxBuSj8nsLUM-ihr3k9f-VCOPVck2DvwIJkjvSKL0kvwTbhR9DfLjc700peaBS-2mqa70TM0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-on-surface/80 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-container text-on-primary-container font-headline text-sm font-bold tracking-widest uppercase mb-6">
            Sinds 2009 in Amsterdam
          </span>
          
          <h1 className="text-6xl md:text-8xl font-extrabold text-white leading-tight mb-6 font-headline tracking-tighter">
            Professionele Rijlessen in Amsterdam
          </h1>
          
          <p className="text-xl text-surface-container-low mb-10 leading-relaxed font-light">
            Begin uw rijavontuur vandaag bij de meest vertrouwde rijschool van de regio. Mastery begint bij de basis.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => scrollToSection('contact')}
              className="tonal-gradient text-on-primary px-8 py-4 rounded-xl font-headline font-bold text-lg shadow-lg hover:shadow-primary/20 transition-all"
            >
              Start Nu
            </button>
            <button 
              onClick={() => scrollToSection('over-ons')}
              className="bg-surface/10 backdrop-blur-md text-white border border-surface/20 px-8 py-4 rounded-xl font-headline font-bold text-lg hover:bg-surface/20 transition-all"
            >
              Meer Info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

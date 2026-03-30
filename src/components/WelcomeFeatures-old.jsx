import React from 'react';

const WelcomeFeatures = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: 'verified_user',
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
      title: 'Ervaren instructeurs',
      description: 'Gecertificeerde professionals met passie voor het vak.'
    },
    {
      icon: 'trending_up',
      iconBg: 'bg-tertiary/10',
      iconColor: 'text-tertiary',
      title: 'Hoge slagingspercentage',
      description: 'Onze leerlingen slagen sneller dan het gemiddelde.'
    },
    {
      icon: 'directions_car',
      iconBg: 'bg-secondary-container/10',
      iconColor: 'text-secondary',
      title: 'Moderne voertuigen',
      description: 'Leren in de nieuwste modellen voor optimaal comfort.'
    }
  ];

  return (
    <section className="py-24 bg-surface px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Intro */}
          <div className="md:col-span-7 bg-surface-container-low p-12 rounded-[2rem] flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-6 font-headline tracking-tight">
              Welkom bij Rijschool De Admiraal
            </h2>
            <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
              Wij geloven dat leren rijden meer is dan alleen een voertuig besturen. Het gaat om zelfvertrouwen, inzicht en veiligheid op de weg.
            </p>
            <button 
              onClick={() => scrollToSection('prijzen')}
              className="text-primary font-bold flex items-center gap-2 group hover:gap-3 transition-all"
            >
              Bekijk Ons Aanbod 
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </button>
          </div>

          {/* Feature Grid */}
          <div className="md:col-span-5 grid grid-cols-1 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-surface-container-lowest p-8 rounded-[2rem] flex items-start gap-4 shadow-sm border border-outline-variant/10 hover:shadow-md transition-all"
              >
                <div className={`p-3 ${feature.iconBg} rounded-xl ${feature.iconColor}`}>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {feature.icon}
                  </span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-on-surface mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeFeatures;

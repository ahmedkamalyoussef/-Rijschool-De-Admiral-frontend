import React from 'react';

const Pricing = () => {
  const packages = [
    {
      name: 'Basis',
      price: '€1.200',
      features: [
        '20 Rijlessen',
        'Theorie materiaal',
        'Praktijkexamen'
      ],
      buttonStyle: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
      buttonText: 'Kies Basis'
    },
    {
      name: 'Normaal',
      price: '€1.800',
      features: [
        '30 Rijlessen',
        'Theorie cursus',
        'Praktijkexamen',
        'Tussen tijdse toets'
      ],
      popular: true,
      buttonStyle: 'bg-primary text-on-primary hover:opacity-90',
      buttonText: 'Kies Normaal'
    },
    {
      name: 'Premium',
      price: '€2.400',
      features: [
        '40 Rijlessen',
        'Intensieve training',
        'Praktijkexamen'
      ],
      buttonStyle: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
      buttonText: 'Kies Premium'
    },
    {
      name: 'Deluxe',
      price: '€3.000',
      features: [
        '50 Rijlessen',
        'VIP begeleiding',
        'Onbeperkt theorie'
      ],
      buttonStyle: 'bg-tertiary text-white hover:opacity-90',
      buttonText: 'Kies Deluxe',
      priceColor: 'text-tertiary',
      iconColor: 'text-tertiary'
    }
  ];

  return (
    <section className="py-24 bg-surface" id="prijzen">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-4 font-headline">
            Transparante Pakketten
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Kies het pakket dat het beste bij jouw leerstijl en ervaring past. Geen verborgen kosten.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, index) => (
            <div 
              key={index}
              className={`bg-surface-container-lowest p-8 rounded-[2rem] border border-outline-variant/10 hover:border-primary/30 transition-all flex flex-col ${
                pkg.popular ? 'border-2 border-primary shadow-xl scale-105 relative z-10' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Populair
                </div>
              )}
              
              <h3 className="text-xl font-headline font-bold text-on-surface mb-2">
                {pkg.name}
              </h3>
              
              <div className={`text-4xl font-extrabold ${pkg.priceColor || 'text-primary'} mb-6`}>
                {pkg.price}
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-sm text-on-surface-variant">
                    <span className={`material-symbols-outlined text-[18px] ${pkg.iconColor || 'text-primary'}`}>
                      check_circle
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 rounded-xl font-bold transition-all ${pkg.buttonStyle}`}>
                {pkg.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

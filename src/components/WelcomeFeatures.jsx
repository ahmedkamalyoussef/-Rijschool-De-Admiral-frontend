import React from 'react';

const WelcomeFeatures = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#f1f6ff] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Intro */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#091d2e] mb-4 sm:mb-6 font-headline tracking-tight leading-tight">
              Welkom bij Rijschool De Admiraal
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-2xl">
              Wij geloven dat leren rijden meer is dan alleen een voertuig besturen. Het gaat om zelfvertrouwen, inzicht en veiligheid op de weg. 
            </p>
            <a className="text-[#b03500] font-bold flex items-center gap-2 group text-base sm:text-lg" href="#prijzen">
              Bekijk Ons Aanbod 
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
            </a>
          </div>

          {/* Feature Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/50 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#f64c01]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-2xl sm:text-3xl text-[#f64c01]" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span>
              </div>
              <div>
                <h4 className="font-headline font-bold text-[#091d2e] text-lg sm:text-xl">Ervaren instructeurs</h4>
                <p className="text-sm text-gray-500 mt-1">Gecertificeerde professionals met passie voor het vak.</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/50 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#f64c01]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-2xl sm:text-3xl text-[#f64c01]" style={{fontVariationSettings: "'FILL' 1"}}>trending_up</span>
              </div>
              <div>
                <h4 className="font-headline font-bold text-[#091d2e] text-lg sm:text-xl">Hoge slagingspercentage</h4>
                <p className="text-sm text-gray-500 mt-1">Onze leerlingen slagen sneller dan het gemiddelde.</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/50 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#f64c01]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-2xl sm:text-3xl text-[#f64c01]" style={{fontVariationSettings: "'FILL' 1"}}>directions_car</span>
              </div>
              <div>
                <h4 className="font-headline font-bold text-[#091d2e] text-lg sm:text-xl">Moderne voertuigen</h4>
                <p className="text-sm text-gray-500 mt-1">Leren in de nieuwste modellen voor optimaal comfort.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeFeatures;

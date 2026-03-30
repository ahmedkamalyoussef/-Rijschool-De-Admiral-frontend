import React from 'react';

const Pricing = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white" id="prijzen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#091d2e] mb-4 font-headline tracking-tight">Transparante Pakketten</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg">Kies het pakket dat het beste bij jouw leerstijl en ervaring past. Geen verborgen kosten.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Basis */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 hover:border-[#b03500]/30 transition-all flex flex-col shadow-sm">
            <h3 className="text-lg sm:text-xl font-headline font-bold text-[#091d2e] mb-2">Basis</h3>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#b03500] mb-6">€1.200</div>
            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
              <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <span className="material-symbols-outlined text-[#b03500] text-[16px] sm:text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span> 20 Rijlessen
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <span className="material-symbols-outlined text-[#b03500] text-[16px] sm:text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span> Theorie materiaal
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <span className="material-symbols-outlined text-[#b03500] text-[16px] sm:text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span> Praktijkexamen
              </li>
            </ul>
            <button className="w-full py-3 rounded-xl border-2 border-[#b03500] text-[#b03500] font-bold hover:bg-[#b03500] hover:text-white transition-all text-sm sm:text-base">Kies Basis</button>
          </div>
          {/* Normaal */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#b03500] shadow-xl relative z-10 flex flex-col">
            <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 bg-[#b03500] text-white px-3 sm:px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Populair</div>
            <h3 className="text-lg sm:text-xl font-headline font-bold text-[#091d2e] mb-2">Normaal</h3>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#b03500] mb-6">€1.800</div>
            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
              <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <span className="material-symbols-outlined text-[#b03500] text-[16px] sm:text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span> 30 Rijlessen
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <span className="material-symbols-outlined text-[#b03500] text-[16px] sm:text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span> Theorie cursus
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <span className="material-symbols-outlined text-[#b03500] text-[16px] sm:text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span> Praktijkexamen
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <span className="material-symbols-outlined text-[#b03500] text-[16px] sm:text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span> Tussen tijdse toets
              </li>
            </ul>
            <button className="w-full py-3 rounded-xl bg-[#b03500] text-white font-bold hover:opacity-90 transition-all shadow-lg shadow-[#b03500]/20 text-sm sm:text-base">Kies Normaal</button>
          </div>
          {/* Premium */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 hover:border-[#b03500]/30 transition-all flex flex-col shadow-sm">
            <h3 className="text-lg sm:text-xl font-headline font-bold text-[#091d2e] mb-2">Premium</h3>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#b03500] mb-6">€2.400</div>
            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
              <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <span className="material-symbols-outlined text-[#b03500] text-[16px] sm:text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span> 40 Rijlessen
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <span className="material-symbols-outlined text-[#b03500] text-[16px] sm:text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span> Intensieve training
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <span className="material-symbols-outlined text-[#b03500] text-[16px] sm:text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span> Praktijkexamen
              </li>
            </ul>
            <button className="w-full py-3 rounded-xl border-2 border-[#b03500] text-[#b03500] font-bold hover:bg-[#b03500] hover:text-white transition-all text-sm sm:text-base">Kies Premium</button>
          </div>
          {/* Deluxe */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 hover:border-[#705d00]/30 transition-all flex flex-col shadow-sm">
            <h3 className="text-lg sm:text-xl font-headline font-bold text-[#091d2e] mb-2">Deluxe</h3>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#705d00] mb-6">€3.000</div>
            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
              <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <span className="material-symbols-outlined text-[#705d00] text-[16px] sm:text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span> 50 Rijlessen
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <span className="material-symbols-outlined text-[#705d00] text-[16px] sm:text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span> VIP begeleiding
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <span className="material-symbols-outlined text-[#705d00] text-[16px] sm:text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span> Onbeperkt theorie
              </li>
            </ul>
            <button className="w-full py-3 rounded-xl bg-[#705d00] text-white font-bold hover:opacity-90 transition-all shadow-lg shadow-[#705d00]/20 text-sm sm:text-base">Kies Deluxe</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

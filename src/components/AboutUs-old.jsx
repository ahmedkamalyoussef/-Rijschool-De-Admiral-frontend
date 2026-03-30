import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-24 bg-surface-container-low overflow-hidden" id="over-ons">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2 relative">
          <div className="absolute -top-8 -left-8 w-64 h-64 bg-tertiary-fixed rounded-full blur-3xl opacity-20"></div>
          <img 
            className="rounded-[2.5rem] shadow-2xl relative z-10 w-full object-cover h-[500px]" 
            alt="Interior of a modern premium vehicle dashboard and steering wheel with soft morning light illuminating the textures"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkZBLAUqG_0NN6ZbM7nz4YZexjS8Ob10OvQ-EqhW5NoAXEDVjxmG1kVOJ-WrPMjvTDKqhS-FmA1YL7TalGM4O7VPFVmVHfGmtGPdy7xxBCGeIf0IO3gQhWr8u7_nzEN2E_27AzXkD1ENCnoLSR79-h-ecZmMLI1Zr_3f60wKP9RMbyaLu2LnS-Gz8uR3l5QFRM36QXi8ncrfkpJ3pMikyhrnvCTxjQQJ8QqrlU_8pAVUlYIuNuBzA7kD9BQWO9Tv4E1eJQ-K1cRaQ"
          />
          <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-3xl shadow-xl z-20">
            <p className="text-5xl font-bold text-primary font-headline">15+</p>
            <p className="text-sm font-label uppercase tracking-widest text-on-surface-variant">Jaar Ervaring</p>
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-8 font-headline tracking-tight">
            Onze Missie: Veiligheid Eerst
          </h2>
          <div className="space-y-6 text-lg text-on-surface-variant leading-relaxed">
            <p>
              Sinds 2009 is De Admiraal een begrip in Amsterdam. Met meer dan 15 jaar ervaring hebben we duizenden leerlingen geholpen hun rijbewijs te halen.
            </p>
            <p className="font-semibold text-on-surface">
              "Iedereen veilig en zelfverzekerd de weg op helpen is onze kernwaarde."
            </p>
            <p>
              Onze persoonlijke aanpak zorgt ervoor dat elke leerling op zijn eigen tempo kan leren, ondersteund door geduldige instructeurs die expert zijn in het drukke Amsterdamse verkeer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

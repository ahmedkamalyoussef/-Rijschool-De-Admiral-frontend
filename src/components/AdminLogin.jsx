import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import wheel from '../assets/logo.png';

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#091d2e] via-[#0f2942] to-[#1a3d5c] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#f64c01]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-48 -right-48 w-[32rem] h-[32rem] bg-[#b03500]/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[url('/src/assets/unnamed.png')] bg-cover bg-center opacity-10"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side - Brand Section */}
          <div className="bg-[#091d2e] p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <img 
                src="/src/assets/unnamed.png" 
                alt="Rijschool background" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="relative z-20">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20">
                  <img src={wheel} alt="De Admiraal" className="w-8 h-8 object-contain" />
                </div>
                <div>
                  <h2 className="font-headline font-bold text-white text-2xl tracking-tight">De Admiraal</h2>
                  <p className="text-white/60 text-xs font-label tracking-widest uppercase">Rijschool Management</p>
                </div>
              </div>
              
              <div className="max-w-sm">
                <h1 className="font-headline font-extrabold text-white text-4xl lg:text-5xl leading-[1.1] mb-6">
                  Beheer uw rijschool efficiënt.
                </h1>
                <p className="text-white/90 font-medium leading-relaxed">
                  Toegang tot het beheersysteem. Beheer studentenroosters, lestijden en rijprotocollen vanaf één centraal punt.
                </p>
              </div>
            </div>

            <div className="relative z-20 mt-12">
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#f64c01]">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBL0kV-74Xnrrm9kCzcQ3ERkUowQ6-2o_FKqpmxu2x647SHRgVezxhA6o9o8KSdsfIPZyQTRWXUF9OnX3FSC5LaVgZ9K3VurfGUgyVNDrTFdW5Eutx19D8sBZsoKYEncvclpwg_QBIhO77wjhebDeizL4wMw8FjL13zlRjDwxYy_2hfO9xQi1ueC8A4HVCW5u8wcJAat9-6WBW0J8ZTZ91U_ljYHSl794MrnM-JN2uX7JL9HmrKUNu055h-onP1G89rkvxmddAKUzs"
                      alt="Admin" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Admin De Admiraal</p>
                    <p className="text-white/50 text-xs">Hoofd Instructeur</p>
                  </div>
                </div>
                <p className="text-white/80 text-sm italic">
                  "Efficiëntie is het verschil tussen een geslaagde student en een verloren les. Dit systeem zorgt ervoor dat onze studenten nooit zonder begeleiding zitten."
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-[#b03500] rounded-xl flex items-center justify-center">
                  <img src={wheel} alt="De Admiraal" className="w-6 h-6 object-contain" />
                </div>
                <h2 className="font-headline font-bold text-[#091d2e] text-xl tracking-tight">De Admiraal</h2>
              </div>

              <div className="mb-10">
                <h2 className="font-headline text-3xl sm:text-4xl font-bold text-[#091d2e] tracking-tight mb-2">Admin Login</h2>
                <p className="text-gray-600 font-body">Voer uw gegevens in om toegang te krijgen tot het beheersysteem.</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Username Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-label font-semibold text-gray-700" htmlFor="username">
                    Email
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-gray-400 group-focus-within:text-[#b03500] transition-colors">
                        person
                      </span>
                    </div>
                    <input
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#b03500] focus:ring-2 focus:ring-[#b03500]/20 rounded-xl py-4 pl-12 pr-4 transition-all outline-none text-gray-900 placeholder:text-gray-400 font-body"
                      id="username"
                      name="username"
                      placeholder="bijv. admin@admiraal.nl"
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-label font-semibold text-gray-700" htmlFor="password">
                      Wachtwoord
                    </label>
                    <Link className="text-xs font-label font-bold text-[#b03500] hover:text-[#f64c01] transition-colors" to="/admin/forgot-password">
                      Wachtwoord vergeten?
                    </Link>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-gray-400 group-focus-within:text-[#b03500] transition-colors">
                        lock
                      </span>
                    </div>
                    <input
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#b03500] focus:ring-2 focus:ring-[#b03500]/20 rounded-xl py-4 pl-12 pr-12 transition-all outline-none text-gray-900 placeholder:text-gray-400 font-body"
                      id="password"
                      name="password"
                      placeholder="••••••••••••"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <button
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span className="material-symbols-outlined">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <div className="pt-2">
                  <button
                    className="w-full bg-gradient-to-r from-[#b03500] to-[#f64c01] text-white font-headline font-bold py-4 rounded-xl shadow-lg shadow-[#b03500]/20 hover:shadow-[#f64c01]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    type="submit"
                  >
                    <span>Inloggen Dashboard</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </form>

              

              <div className="mt-12 text-center">
                <p className="text-[10px] text-gray-400 font-label tracking-widest uppercase">
                  Alleen Geautoriseerd Personeel • IP Gelogd voor Beveiliging
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-6xl px-6 flex justify-between items-center text-[11px] font-label text-gray-400">
        <div>© 2024 Rijschool De Admiraal</div>
        <div className="flex gap-6">
          <a className="hover:text-[#f64c01] transition-colors" href="#">Privacybeleid</a>
          <a className="hover:text-[#f64c01] transition-colors" href="#">Technische Ondersteuning</a>
        </div>
      </footer>
    </div>
  );
};

export default AdminLogin;

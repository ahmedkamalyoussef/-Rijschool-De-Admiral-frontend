import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_BASE_URL } from '../services/api.js';
import wheel from '../assets/wheel.png';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    if (!token || !email) {
      setTokenValid(false);
      setError('Ongeldige reset link. Gelieve opnieuw een wachtwoord herstel aan te vragen.');
    }
  }, [token, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Wachtwoorden komen niet overeen.');
      setIsLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('Wachtwoord moet minimaal 6 karakters lang zijn.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          token,
          newPassword: formData.newPassword
        }),
      });

      const data = await response.json();

      if (data.status) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/admin');
        }, 3000);
      } else {
        setError(data.message || 'Er is een fout opgetreden. Probeer het opnieuw.');
      }
    } catch (err) {
      setError('Kan geen verbinding maken met de server. Controleer uw internetverbinding.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!tokenValid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#091d2e] via-[#0f2942] to-[#1a3d5c] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-red-600 text-2xl">error</span>
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Ongeldige Link</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/admin/forgot-password')}
            className="bg-[#b03500] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#f64c01] transition-colors"
          >
            Nieuwe Link Aanvragen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#091d2e] via-[#0f2942] to-[#1a3d5c] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#f64c01]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-48 -right-48 w-[32rem] h-[32rem] bg-[#b03500]/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[url('/src/assets/unnamed.png')] bg-cover bg-center opacity-10"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl">
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
                  <p className="text-white/60 text-xs font-label tracking-widest uppercase">Wachtwoord Reset</p>
                </div>
              </div>
              
              <div className="max-w-sm">
                <h1 className="font-headline font-extrabold text-white text-4xl lg:text-5xl leading-[1.1] mb-6">
                  Nieuw Wachtwoord
                </h1>
                <p className="text-white/90 font-medium leading-relaxed">
                  Maak een nieuw, sterk wachtwoord aan voor uw account. Zorg ervoor dat het uniek en moeilijk te raden is.
                </p>
              </div>
            </div>

            <div className="relative z-20 mt-12">
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#f64c01]">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBL0kV-74Xnrrm9kCzcQ3ERkUowQ6-2o_FKqpmxu2x647SHRgVezxhA6o9o8KSdsfIPZyQTRWXUF9OnX3FSC5LaVgZ9K3VurfGUgyVNDrTFdW5Eutx19D8sBZsoKYEncvclpwg_QBIhO77wjhebDeizL4wMw8FjL13zlRjDwxYy_2hfO9xQi1ueC8A4HVCW5u8wcJAat9-6WBW0J8ZTZ91U_ljYHSl794MrnM-JN2uX7JL9HmrKUNu055h-onP1G89rkvxmddAKUzs"
                      alt="Security" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Security Team</p>
                    <p className="text-white/50 text-xs">Account Beveiliging</p>
                  </div>
                </div>
                <p className="text-white/80 text-sm italic">
                  "Een sterk wachtwoord is uw eerste verdedigingslinie tegen ongeautoriseerde toegang."
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Reset Password Form */}
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
                <h2 className="font-headline text-3xl sm:text-4xl font-bold text-[#091d2e] tracking-tight mb-2">
                  {isSuccess ? 'Wachtwoord Reset!' : 'Nieuw Wachtwoord'}
                </h2>
                <p className="text-gray-600 font-body">
                  {isSuccess 
                    ? 'Uw wachtwoord is succesvol gewijzigd. U wordt doorgestuurd naar de inlogpagina...'
                    : 'Voer een nieuw wachtwoord in voor uw account.'
                  }
                </p>
              </div>

              {!isSuccess ? (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* New Password Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-label font-semibold text-gray-700" htmlFor="newPassword">
                      Nieuw Wachtwoord
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-gray-400 group-focus-within:text-[#b03500] transition-colors">
                          lock
                        </span>
                      </div>
                      <input
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#b03500] focus:ring-2 focus:ring-[#b03500]/20 rounded-xl py-4 pl-12 pr-4 transition-all outline-none text-gray-900 placeholder:text-gray-400 font-body"
                        id="newPassword"
                        name="newPassword"
                        placeholder="Minimaal 6 karakters"
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-label font-semibold text-gray-700" htmlFor="confirmPassword">
                      Bevestig Wachtwoord
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-gray-400 group-focus-within:text-[#b03500] transition-colors">
                          lock_reset
                        </span>
                      </div>
                      <input
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#b03500] focus:ring-2 focus:ring-[#b03500]/20 rounded-xl py-4 pl-12 pr-4 transition-all outline-none text-gray-900 placeholder:text-gray-400 font-body"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Herhaal nieuw wachtwoord"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-red-600">error</span>
                        <span>{error}</span>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      className="w-full bg-gradient-to-r from-[#b03500] to-[#f64c01] text-white font-headline font-bold py-4 rounded-xl shadow-lg shadow-[#b03500]/20 hover:shadow-[#f64c01]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="material-symbols-outlined animate-spin">refresh</span>
                          <span>Bezig met resetten...</span>
                        </>
                      ) : (
                        <>
                          <span>Wachtwoord Resetten</span>
                          <span className="material-symbols-outlined text-sm">check_circle</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-green-600">check_circle</span>
                      <span>Wachtwoord succesvol gewijzigd!</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
              )}

              {/* Back to Login */}
              <div className="mt-10 text-center">
                <p className="text-sm text-gray-600 font-body">
                  Terug naar{' '}
                  <button
                    onClick={() => navigate('/admin')}
                    className="text-[#b03500] font-bold hover:text-[#f64c01] transition-colors"
                  >
                    Inloggen
                  </button>
                </p>
              </div>

              <div className="mt-12 text-center">
                <p className="text-[10px] text-gray-400 font-label tracking-widest uppercase">
                  Beveiligde Verbinding • End-to-End Encryptie
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-5xl px-6 flex justify-between items-center text-[11px] font-label text-gray-400">
        <div>© 2024 Rijschool De Admiraal</div>
        <div className="flex gap-6">
          <a className="hover:text-[#f64c01] transition-colors" href="#">Privacybeleid</a>
          <a className="hover:text-[#f64c01] transition-colors" href="#">Contact Support</a>
        </div>
      </footer>
    </div>
  );
};

export default ResetPassword;

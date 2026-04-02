import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import i18n from '../i18n/i18n.js';
import wheel from '../assets/logo.png';

const Login = () => {
  const [step, setStep] = useState('login'); // login, otp, forgot, reset
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentLang, setCurrentLang] = useState(i18n.language || 'nl');

  const navigate = useNavigate();
  const { login, verifyOTP, forgotPassword, resetPassword, clearError, resendOTP } = useAuth();

  useEffect(() => {
    const handleLanguageChanged = (lng) => setCurrentLang(lng);
    i18n.on('languageChanged', handleLanguageChanged);
    return () => i18n.off('languageChanged', handleLanguageChanged);
  }, []);

  // Translation helper
  const t = (key) => i18n.t(key);

  const toggleLanguage = () => {
    const newLang = currentLang === 'nl' ? 'ar' : 'nl';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (!formData.email || !formData.password) {
      const msg = currentLang === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Vul alle verplichte velden in';
      toast.error(msg);
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      const msg = currentLang === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Voer een geldig e-mailadres in';
      toast.error(msg);
      setIsLoading(false);
      return;
    }

    try {
      await login(formData.email, formData.password);
      setStep('otp');
      toast.success(currentLang === 'ar' ? 'تم إرسال رمز التحقق إلى بريدك الإلكتروني' : 'Verificatiecode verzonden naar uw e-mail');
    } catch (error) {
      const errorMsg = error.message || (currentLang === 'ar' ? 'فشل في تسجيل الدخول - تأكد من البريد وكلمة المرور' : 'Inloggen mislukt - controleer e-mail en wachtwoord');
      setError(errorMsg);
      // Use setTimeout to ensure toast shows after state update
      setTimeout(() => {
        toast.error(errorMsg);
      }, 100);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (!formData.otp || formData.otp.length !== 6) {
      const msg = currentLang === 'ar' ? 'يرجى إدخال كود التأكيد المكون من 6 أرقام' : 'Voer de 6-cijferige verificatiecode in';
      toast.error(msg);
      setIsLoading(false);
      return;
    }

    try {
      await verifyOTP(formData.email, formData.otp, 'login');
      toast.success(currentLang === 'ar' ? 'تم تسجيل الدخول بنجاح!' : 'Succesvol ingelogd!');
      navigate('/admin/dashboard');
    } catch (error) {
      const errorMsg = error.message || (currentLang === 'ar' ? 'رمز التحقق غير صحيح أو منتهي الصلاحية' : 'Verificatiecode onjuist of verlopen');
      toast.error(errorMsg);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (!formData.email || !formData.email.includes('@')) {
      const msg = currentLang === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Voer een geldig e-mailadres in';
      toast.error(msg);
      setIsLoading(false);
      return;
    }

    try {
      await forgotPassword(formData.email);
      setStep('reset');
      toast.success(currentLang === 'ar' ? 'تم إرسال رمز التحقق لإعادة تعيين كلمة المرور' : 'Verificatiecode voor wachtwoordherstel verzonden');
    } catch (error) {
      const errorMsg = error.message || (currentLang === 'ar' ? 'فشل في إرسال كود استعادة كلمة المرور' : 'Wachtwoordherstel mislukt');
      toast.error(errorMsg);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (!formData.otp || formData.otp.length !== 6) {
      const msg = currentLang === 'ar' ? 'يرجى إدخال كود التأكيد المكون من 6 أرقام' : 'Voer de 6-cijferige verificatiecode in';
      toast.error(msg);
      setIsLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      const msg = currentLang === 'ar' ? 'كلمتا المرور غير متطابقتين' : 'Wachtwoorden komen niet overeen';
      toast.error(msg);
      setIsLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      const msg = currentLang === 'ar' ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Wachtwoord moet minimaal 6 tekens bevatten';
      toast.error(msg);
      setIsLoading(false);
      return;
    }

    try {
      await resetPassword(formData.email, formData.otp, formData.newPassword, formData.confirmPassword);
      setStep('login');
      toast.success(currentLang === 'ar' ? 'تم استعادة كلمة المرور بنجاح. يرجى تسجيل الدخول.' : 'Wachtwoord succesvol hersteld. Log in met uw nieuwe wachtwoord.');
    } catch (error) {
      const errorMsg = error.message || (currentLang === 'ar' ? 'فشل في استعادة كلمة المرور - رمز التحقق غير صحيح' : 'Wachtwoordherstel mislukt - onjuiste verificatiecode');
      toast.error(errorMsg);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Determine the OTP type based on current step
      const otpType = step === 'otp' ? 'login' : 'forgot';
      await resendOTP(formData.email, otpType);
      toast.success(currentLang === 'ar' ? 'تم إعادة إرسال الكود بنجاح' : 'Code succesvol opnieuw verzonden');
    } catch (error) {
      const errorMsg = error.message || (currentLang === 'ar' ? 'فشل في إعادة إرسال كود التأكيد' : 'Opnieuw verzenden mislukt');
      toast.error(errorMsg);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className="space-y-6" noValidate>
      <div>
        <label className={`block text-white/70 text-sm font-medium mb-2 ${currentLang === 'ar' ? 'text-right' : ''}`}>
          {t('login.email')}
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#f64c01] focus:bg-white/20 transition-all ${currentLang === 'ar' ? 'text-right direction-rtl' : ''}`}
          placeholder="admin@example.com"
          style={currentLang === 'ar' ? {direction: 'rtl'} : {}}
        />
      </div>

      <div>
        <label className={`block text-white/70 text-sm font-medium mb-2 ${currentLang === 'ar' ? 'text-right' : ''}`}>
          {t('login.password')}
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#f64c01] focus:bg-white/20 transition-all ${currentLang === 'ar' ? 'text-right direction-rtl' : ''}`}
          placeholder="••••••••"
          style={currentLang === 'ar' ? {direction: 'rtl'} : {}}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#f64c01] text-white py-3 rounded-lg font-bold hover:bg-[#e54200] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (currentLang === 'ar' ? 'جاري التحميل...' : 'Loading...') : t('login.submit')}
      </button>

      <button
        type="button"
        onClick={() => setStep('forgot')}
        className={`w-full text-white/60 hover:text-white text-sm transition-colors ${currentLang === 'ar' ? 'text-right' : ''}`}
      >
        {t('login.forgot_password')}
      </button>
    </form>
  );

  const renderOTPForm = () => (
    <form onSubmit={handleVerifyOTP} className="space-y-6" noValidate>
      <div className={`text-center mb-6 ${currentLang === 'ar' ? 'text-right' : ''}`}>
        <p className="text-white/70">
          {t('login.enter_otp')}
        </p>
        <p className="text-white font-medium">{formData.email}</p>
      </div>

      <div>
        <label className={`block text-white/70 text-sm font-medium mb-2 ${currentLang === 'ar' ? 'text-right' : ''}`}>
          {t('login.otp_verification')}
        </label>
        <input
          type="text"
          name="otp"
          value={formData.otp}
          onChange={handleInputChange}
          maxLength={6}
          className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#f64c01] focus:bg-white/20 transition-all text-center text-2xl tracking-widest ${currentLang === 'ar' ? 'direction-rtl' : ''}`}
          placeholder="123456"
          style={currentLang === 'ar' ? {direction: 'rtl'} : {}}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#f64c01] text-white py-3 rounded-lg font-bold hover:bg-[#e54200] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (currentLang === 'ar' ? 'جاري التحقق...' : 'Verifying...') : t('login.verify')}
      </button>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setStep('login')}
          className="text-white/60 hover:text-white text-sm transition-colors"
        >
          {t('login.back_to_login')}
        </button>
        <button
          type="button"
          onClick={handleResendOTP}
          disabled={isLoading}
          className="text-white/60 hover:text-white text-sm transition-colors disabled:opacity-50"
        >
          {t('login.resend')}
        </button>
      </div>
    </form>
  );

  const renderForgotPasswordForm = () => (
    <form onSubmit={handleForgotPassword} className="space-y-6" noValidate>
      <div>
        <label className={`block text-white/70 text-sm font-medium mb-2 ${currentLang === 'ar' ? 'text-right' : ''}`}>
          {t('login.email')}
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#f64c01] focus:bg-white/20 transition-all ${currentLang === 'ar' ? 'text-right direction-rtl' : ''}`}
          placeholder="admin@example.com"
          style={currentLang === 'ar' ? {direction: 'rtl'} : {}}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#f64c01] text-white py-3 rounded-lg font-bold hover:bg-[#e54200] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (currentLang === 'ar' ? 'جاري الإرسال...' : 'Sending...') : (currentLang === 'ar' ? 'إرسال رمز التحقق' : 'Send Reset OTP')}
      </button>

      <button
        type="button"
        onClick={() => setStep('login')}
        className={`w-full text-white/60 hover:text-white text-sm transition-colors ${currentLang === 'ar' ? 'text-right' : ''}`}
      >
        {t('login.back_to_login')}
      </button>
    </form>
  );

  const renderResetPasswordForm = () => (
    <form onSubmit={handleResetPassword} className="space-y-6" noValidate>
      <div className={`text-center mb-6 ${currentLang === 'ar' ? 'text-right' : ''}`}>
        <p className="text-white/70">
          {currentLang === 'ar' ? 'أدخل رمز التحقق المرسل إلى بريدك الإلكتروني وكلمة المرور الجديدة' : 'Enter OTP sent to your email and new password'}
        </p>
        <p className="text-white font-medium">{formData.email}</p>
      </div>

      <div>
        <label className={`block text-white/70 text-sm font-medium mb-2 ${currentLang === 'ar' ? 'text-right' : ''}`}>
          {t('login.otp_verification')}
        </label>
        <input
          type="text"
          name="otp"
          value={formData.otp}
          onChange={handleInputChange}
          maxLength={6}
          className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#f64c01] focus:bg-white/20 transition-all text-center text-2xl tracking-widest ${currentLang === 'ar' ? 'direction-rtl' : ''}`}
          placeholder="123456"
          style={currentLang === 'ar' ? {direction: 'rtl'} : {}}
        />
      </div>

      <div>
        <label className={`block text-white/70 text-sm font-medium mb-2 ${currentLang === 'ar' ? 'text-right' : ''}`}>
          {t('login.new_password')}
        </label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#f64c01] focus:bg-white/20 transition-all ${currentLang === 'ar' ? 'text-right direction-rtl' : ''}`}
          placeholder="••••••••"
          style={currentLang === 'ar' ? {direction: 'rtl'} : {}}
        />
      </div>

      <div>
        <label className={`block text-white/70 text-sm font-medium mb-2 ${currentLang === 'ar' ? 'text-right' : ''}`}>
          {t('login.confirm_password')}
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#f64c01] focus:bg-white/20 transition-all ${currentLang === 'ar' ? 'text-right direction-rtl' : ''}`}
          placeholder="••••••••"
          style={currentLang === 'ar' ? {direction: 'rtl'} : {}}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#f64c01] text-white py-3 rounded-lg font-bold hover:bg-[#e54200] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (currentLang === 'ar' ? 'جاري إعادة التعيين...' : 'Resetting...') : t('login.reset_password')}
      </button>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setStep('login')}
          className="text-white/60 hover:text-white text-sm transition-colors"
        >
          {t('login.back_to_login')}
        </button>
        <button
          type="button"
          onClick={handleResendOTP}
          disabled={isLoading}
          className="text-white/60 hover:text-white text-sm transition-colors disabled:opacity-50"
        >
          {t('login.resend')}
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#091d2e] via-[#0f2942] to-[#1a3d5c] flex items-center justify-center p-4">
      {/* Language Toggle Button */}
      <button
        onClick={toggleLanguage}
        className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all text-sm font-medium"
        title={currentLang === 'ar' ? 'Nederlands' : 'العربية'}
      >
        <span className="material-symbols-outlined text-lg">language</span>
        <span className="hidden sm:inline">{currentLang === 'ar' ? 'Nederlands' : 'العربية'}</span>
        <span className="sm:hidden">{currentLang === 'ar' ? 'NL' : 'ع'}</span>
      </button>

      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-xl bg-[#f64c01] flex items-center justify-center">
              <img src={wheel} alt="De Admiraal" className="w-10 h-10 object-contain" />
            </div>
          </div>

          {/* Title */}
          <div className={`text-center mb-8 ${currentLang === 'ar' ? 'text-right' : ''}`}>
            <h1 className="text-2xl font-bold text-white mb-2">
              {step === 'login' && t('login.title')}
              {step === 'otp' && t('login.otp_verification')}
              {step === 'forgot' && (currentLang === 'ar' ? 'نسيت كلمة المرور' : 'Forgot Password')}
              {step === 'reset' && t('login.reset_password')}
            </h1>
            <p className="text-white/70 text-sm">
              {step === 'login' && (currentLang === 'ar' ? 'أدخل بيانات الدخول للوصول إلى لوحة الإدارة' : 'Enter your credentials to access the admin panel')}
              {step === 'otp' && t('login.enter_otp')}
              {step === 'forgot' && (currentLang === 'ar' ? 'أدخل بريدك الإلكتروني لاستلام تعليمات استعادة كلمة المرور' : 'Enter your email to receive reset instructions')}
              {step === 'reset' && (currentLang === 'ar' ? 'أنشئ كلمة مرور جديدة لحسابك' : 'Create a new password for your account')}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className={`mb-6 p-4 rounded-lg text-sm ${
              error.includes('successfully') 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
              {error}
            </div>
          )}

          {/* Forms */}
          {step === 'login' && renderLoginForm()}
          {step === 'otp' && renderOTPForm()}
          {step === 'forgot' && renderForgotPasswordForm()}
          {step === 'reset' && renderResetPasswordForm()}
        </div>
      </div>
    </div>
  );
};

export default Login;

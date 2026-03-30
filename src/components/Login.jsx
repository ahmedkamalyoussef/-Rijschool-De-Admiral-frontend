import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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

  const navigate = useNavigate();
  const { login, verifyOTP, forgotPassword, resetPassword, clearError, resendOTP } = useAuth();

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
      setError('يرجى ملء جميع الحقول المطلوبة');
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('يرجى إدخال بريد إلكتروني صحيح');
      setIsLoading(false);
      return;
    }

    try {
      await login(formData.email, formData.password);
      setStep('otp');
    } catch (error) {
      setError(error.message || 'فشل في تسجيل الدخول');
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
      setError('يرجى إدخال كود التأكيد المكون من 6 أرقام');
      setIsLoading(false);
      return;
    }

    try {
      await verifyOTP(formData.email, formData.otp, 'login');
      navigate('/admin/dashboard');
    } catch (error) {
      setError(error.message || 'فشل في التحقق من كود التأكيد');
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
      setError('يرجى إدخال بريد إلكتروني صحيح');
      setIsLoading(false);
      return;
    }

    try {
      await forgotPassword(formData.email);
      setStep('reset');
    } catch (error) {
      setError(error.message || 'فشل في إرسال كود استعادة كلمة المرور');
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
      setError('يرجى إدخال كود التأكيد المكون من 6 أرقام');
      setIsLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('كلمتا المرور غير متطابقتين');
      setIsLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      setIsLoading(false);
      return;
    }

    try {
      await resetPassword(formData.email, formData.otp, formData.newPassword, formData.confirmPassword);
      setStep('login');
      setError('تم استعادة كلمة المرور بنجاح. يرجى تسجيل الدخول بكلمة المرور الجديدة.');
    } catch (error) {
      setError(error.message || 'فشل في استعادة كلمة المرور');
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
      setError('تم إعادة إرسال الكود بنجاح');
    } catch (error) {
      setError(error.message || 'فشل في إعادة إرسال كود التأكيد');
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className="space-y-6">
      <div>
        <label className="block text-white/70 text-sm font-medium mb-2">
          البريد الإلكتروني
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#f64c01] focus:bg-white/20 transition-all"
          placeholder="admin@example.com"
        />
      </div>

      <div>
        <label className="block text-white/70 text-sm font-medium mb-2">
          كلمة المرور
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#f64c01] focus:bg-white/20 transition-all"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#f64c01] text-white py-3 rounded-lg font-bold hover:bg-[#e54200] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'جاري إرسال الكود...' : 'تسجيل الدخول'}
      </button>

      <button
        type="button"
        onClick={() => setStep('forgot')}
        className="w-full text-white/60 hover:text-white text-sm transition-colors"
      >
        نسيت كلمة المرور؟
      </button>
    </form>
  );

  const renderOTPForm = () => (
    <form onSubmit={handleVerifyOTP} className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-white/70">
          تم إرسال كود التأكيد المكون من 6 أرقام إلى بريدك الإلكتروني
        </p>
        <p className="text-white font-medium">{formData.email}</p>
      </div>

      <div>
        <label className="block text-white/70 text-sm font-medium mb-2">
          أدخل كود التأكيد
        </label>
        <input
          type="text"
          name="otp"
          value={formData.otp}
          onChange={handleInputChange}
          required
          maxLength={6}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#f64c01] focus:bg-white/20 transition-all text-center text-2xl tracking-widest"
          placeholder="123456"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#f64c01] text-white py-3 rounded-lg font-bold hover:bg-[#e54200] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'جاري التحقق...' : 'تحقق من الكود'}
      </button>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setStep('login')}
          className="text-white/60 hover:text-white text-sm transition-colors"
        >
          العودة لتسجيل الدخول
        </button>
        <button
          type="button"
          onClick={handleResendOTP}
          disabled={isLoading}
          className="text-white/60 hover:text-white text-sm transition-colors disabled:opacity-50"
        >
          إعادة إرسال الكود
        </button>
      </div>
    </form>
  );

  const renderForgotPasswordForm = () => (
    <form onSubmit={handleForgotPassword} className="space-y-6">
      <div>
        <label className="block text-white/70 text-sm font-medium mb-2">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#f64c01] focus:bg-white/20 transition-all"
          placeholder="admin@example.com"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#f64c01] text-white py-3 rounded-lg font-bold hover:bg-[#e54200] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Sending OTP...' : 'Send Reset OTP'}
      </button>

      <button
        type="button"
        onClick={() => setStep('login')}
        className="w-full text-white/60 hover:text-white text-sm transition-colors"
      >
        Back to Login
      </button>
    </form>
  );

  const renderResetPasswordForm = () => (
    <form onSubmit={handleResetPassword} className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-white/70">
          Enter OTP sent to your email and new password
        </p>
        <p className="text-white font-medium">{formData.email}</p>
      </div>

      <div>
        <label className="block text-white/70 text-sm font-medium mb-2">
          OTP
        </label>
        <input
          type="text"
          name="otp"
          value={formData.otp}
          onChange={handleInputChange}
          required
          maxLength={6}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#f64c01] focus:bg-white/20 transition-all text-center text-2xl tracking-widest"
          placeholder="123456"
        />
      </div>

      <div>
        <label className="block text-white/70 text-sm font-medium mb-2">
          New Password
        </label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#f64c01] focus:bg-white/20 transition-all"
          placeholder="••••••••"
        />
      </div>

      <div>
        <label className="block text-white/70 text-sm font-medium mb-2">
          Confirm New Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#f64c01] focus:bg-white/20 transition-all"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#f64c01] text-white py-3 rounded-lg font-bold hover:bg-[#e54200] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Resetting...' : 'Reset Password'}
      </button>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setStep('login')}
          className="text-white/60 hover:text-white text-sm transition-colors"
        >
          Back to Login
        </button>
        <button
          type="button"
          onClick={handleResendOTP}
          disabled={isLoading}
          className="text-white/60 hover:text-white text-sm transition-colors disabled:opacity-50"
        >
          Resend OTP
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#091d2e] via-[#0f2942] to-[#1a3d5c] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-xl bg-[#f64c01] flex items-center justify-center">
              <img src={wheel} alt="De Admiraal" className="w-10 h-10 object-contain" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              {step === 'login' && 'Admin Login'}
              {step === 'otp' && 'Verify OTP'}
              {step === 'forgot' && 'Forgot Password'}
              {step === 'reset' && 'Reset Password'}
            </h1>
            <p className="text-white/70 text-sm">
              {step === 'login' && 'Enter your credentials to access the admin panel'}
              {step === 'otp' && 'Enter the 6-digit code from your email'}
              {step === 'forgot' && 'Enter your email to receive reset instructions'}
              {step === 'reset' && 'Create a new password for your account'}
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

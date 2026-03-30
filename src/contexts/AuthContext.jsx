import React, { createContext, useContext, useReducer, useEffect } from 'react';
import authService from '../services/authService';

// Initial state
const initialState = {
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
};

// Action types
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  VERIFY_OTP_START: 'VERIFY_OTP_START',
  VERIFY_OTP_SUCCESS: 'VERIFY_OTP_SUCCESS',
  VERIFY_OTP_FAILURE: 'VERIFY_OTP_FAILURE',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  LOAD_USER_START: 'LOAD_USER_START',
  LOAD_USER_SUCCESS: 'LOAD_USER_SUCCESS',
  LOAD_USER_FAILURE: 'LOAD_USER_FAILURE',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.VERIFY_OTP_START:
    case AUTH_ACTIONS.REGISTER_START:
    case AUTH_ACTIONS.LOAD_USER_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
    case AUTH_ACTIONS.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };

    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.LOAD_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: !!action.payload,
        user: action.payload,
        error: null,
      };

    case AUTH_ACTIONS.LOGIN_FAILURE:
    case AUTH_ACTIONS.VERIFY_OTP_FAILURE:
    case AUTH_ACTIONS.REGISTER_FAILURE:
    case AUTH_ACTIONS.LOAD_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user on initial render if token exists
  useEffect(() => {
    const loadUser = async () => {
      const token = authService.getToken();
      if (token) {
        dispatch({ type: AUTH_ACTIONS.LOAD_USER_START });
        try {
          const response = await authService.getProfile();
          dispatch({
            type: AUTH_ACTIONS.LOAD_USER_SUCCESS,
            payload: response.data,
          });
        } catch (error) {
          dispatch({
            type: AUTH_ACTIONS.LOAD_USER_FAILURE,
            payload: error.message || 'فشل في تحميل بيانات المستخدم',
          });
          authService.logout();
        }
      } else {
        dispatch({ type: AUTH_ACTIONS.LOAD_USER_SUCCESS, payload: null });
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    try {
      const response = await authService.loginAdmin({ email, password });
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: {
          user: response.data,
          token: null, // Token will be set after OTP verification
        },
      });
      return response;
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: error.message || 'فشل تسجيل الدخول',
      });
      throw error;
    }
  };

  // Verify OTP function
  const verifyOTP = async (email, otp, type) => {
    dispatch({ type: AUTH_ACTIONS.VERIFY_OTP_START });
    try {
      const response = await authService.verifyOTP({ email, otp, type });
      dispatch({
        type: AUTH_ACTIONS.VERIFY_OTP_SUCCESS,
        payload: {
          user: response.data,
          token: response.data.token,
        },
      });
      return response;
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.VERIFY_OTP_FAILURE,
        payload: error.message || 'فشل في التحقق من كود التأكيد',
      });
      throw error;
    }
  };

  // Register function
  const register = async (firstName, lastName, email, password) => {
    dispatch({ type: AUTH_ACTIONS.REGISTER_START });
    try {
      const response = await authService.registerAdmin({
        firstName,
        lastName,
        email,
        password,
      });
      dispatch({
        type: AUTH_ACTIONS.REGISTER_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.REGISTER_FAILURE,
        payload: error.message || 'فشل في التسجيل',
      });
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Resend OTP function
  const resendOTP = async (email, type) => {
    try {
      const response = await authService.resendOTP({ email, type });
      return response;
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: error.message || 'فشل في إعادة إرسال كود التأكيد',
      });
      throw error;
    }
  };

  // Forgot password function
  const forgotPassword = async (email) => {
    try {
      const response = await authService.forgotPassword({ email });
      return response;
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: error.message || 'فشل في إرسال كود استعادة كلمة المرور',
      });
      throw error;
    }
  };

  // Reset password function
  const resetPassword = async (email, otp, newPassword, confirmPassword) => {
    try {
      const response = await authService.resetPassword({
        email,
        otp,
        newPassword,
        confirmPassword,
      });
      return response;
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: error.message || 'فشل في استعادة كلمة المرور',
      });
      throw error;
    }
  };

  // Change password function
  const changePassword = async (currentPassword, newPassword, confirmPassword) => {
    try {
      const response = await authService.changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });
      return response;
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: error.message || 'فشل في تغيير كلمة المرور',
      });
      throw error;
    }
  };

  // Update profile function
  const updateProfile = async (firstName, lastName) => {
    try {
      const response = await authService.updateProfile({ firstName, lastName });
      dispatch({
        type: AUTH_ACTIONS.LOAD_USER_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOAD_USER_FAILURE,
        payload: error.message || 'فشل في تحديث الملف الشخصي',
      });
      throw error;
    }
  };

  const value = {
    ...state,
    login,
    verifyOTP,
    register,
    logout,
    clearError,
    resendOTP,
    forgotPassword,
    resetPassword,
    changePassword,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

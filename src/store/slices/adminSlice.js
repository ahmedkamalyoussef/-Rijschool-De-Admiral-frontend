import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminService } from '../../services';

// Async thunks
export const loginAdmin = createAsyncThunk(
  'admin/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await adminService.login(credentials);
      localStorage.setItem('adminToken', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerAdmin = createAsyncThunk(
  'admin/register',
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await adminService.register(adminData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAdminProfile = createAsyncThunk(
  'admin/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.getProfile();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAdminProfile = createAsyncThunk(
  'admin/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await adminService.updateProfile(profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  admin: null,
  token: localStorage.getItem('adminToken'),
  isLoading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('adminToken'),
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    logout: (state) => {
      state.admin = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('adminToken');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admin = action.payload.admin;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get Profile
      .addCase(getAdminProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admin = action.payload.admin;
      })
      .addCase(getAdminProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Profile
      .addCase(updateAdminProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAdminProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admin = action.payload.admin;
      })
      .addCase(updateAdminProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = adminSlice.actions;
export default adminSlice.reducer;

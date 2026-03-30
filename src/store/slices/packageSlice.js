import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { packageService } from '../../services';

// Async thunks
export const fetchPackages = createAsyncThunk(
  'packages/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await packageService.getAllPackages();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPublicPackages = createAsyncThunk(
  'packages/fetchPublic',
  async (_, { rejectWithValue }) => {
    try {
      const response = await packageService.getPublicPackages();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPackageById = createAsyncThunk(
  'packages/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await packageService.getPackageById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPackage = createAsyncThunk(
  'packages/create',
  async (packageData, { rejectWithValue }) => {
    try {
      const response = await packageService.createPackage(packageData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePackage = createAsyncThunk(
  'packages/update',
  async ({ id, packageData }, { rejectWithValue }) => {
    try {
      const response = await packageService.updatePackage(id, packageData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePackage = createAsyncThunk(
  'packages/delete',
  async (id, { rejectWithValue }) => {
    try {
      await packageService.deletePackage(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const togglePackageStatus = createAsyncThunk(
  'packages/toggleStatus',
  async (id, { rejectWithValue }) => {
    try {
      const response = await packageService.togglePackageStatus(id);
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  packages: [],
  publicPackages: [],
  currentPackage: null,
  isLoading: false,
  error: null,
};

const packageSlice = createSlice({
  name: 'packages',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPackage: (state) => {
      state.currentPackage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all packages
      .addCase(fetchPackages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.packages = action.payload.data;
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch public packages
      .addCase(fetchPublicPackages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPublicPackages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publicPackages = action.payload.data;
      })
      .addCase(fetchPublicPackages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch package by ID
      .addCase(fetchPackageById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPackageById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPackage = action.payload.package;
      })
      .addCase(fetchPackageById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create package
      .addCase(createPackage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPackage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.packages.push(action.payload.package);
      })
      .addCase(createPackage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update package
      .addCase(updatePackage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePackage.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.packages.findIndex(pkg => pkg.id === action.payload.package.id);
        if (index !== -1) {
          state.packages[index] = action.payload.package;
        }
      })
      .addCase(updatePackage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete package
      .addCase(deletePackage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePackage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.packages = state.packages.filter(pkg => pkg.id !== action.payload);
      })
      .addCase(deletePackage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Toggle status
      .addCase(togglePackageStatus.fulfilled, (state, action) => {
        const index = state.packages.findIndex(pkg => pkg.id === action.payload.id);
        if (index !== -1) {
          state.packages[index].status = action.payload.status;
        }
      });
  },
});

export const { clearError, clearCurrentPackage } = packageSlice.actions;
export default packageSlice.reducer;

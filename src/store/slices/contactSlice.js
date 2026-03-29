import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { contactService } from '../../services';

// Async thunks
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await contactService.getAllContacts();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchContactById = createAsyncThunk(
  'contacts/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await contactService.getContactById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createContact = createAsyncThunk(
  'contacts/create',
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await contactService.createContact(contactData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateContactStatus = createAsyncThunk(
  'contacts/updateStatus',
  async ({ id, statusData }, { rejectWithValue }) => {
    try {
      const response = await contactService.updateContactStatus(id, statusData);
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/delete',
  async (id, { rejectWithValue }) => {
    try {
      await contactService.deleteContact(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchContactStats = createAsyncThunk(
  'contacts/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await contactService.getContactStats();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  contacts: [],
  currentContact: null,
  stats: null,
  isLoading: false,
  error: null,
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentContact: (state) => {
      state.currentContact = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all contacts
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload.contacts;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch contact by ID
      .addCase(fetchContactById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContactById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentContact = action.payload.contact;
      })
      .addCase(fetchContactById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create contact
      .addCase(createContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts.push(action.payload.contact);
      })
      .addCase(createContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update contact status
      .addCase(updateContactStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateContactStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
        if (index !== -1) {
          state.contacts[index].status = action.payload.status;
        }
      })
      .addCase(updateContactStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete contact
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch contact stats
      .addCase(fetchContactStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContactStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload.stats;
      })
      .addCase(fetchContactStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentContact } = contactSlice.actions;
export default contactSlice.reducer;

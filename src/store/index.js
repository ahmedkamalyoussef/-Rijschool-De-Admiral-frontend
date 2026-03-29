import { configureStore } from '@reduxjs/toolkit';
import adminSlice from './slices/adminSlice';
import packageSlice from './slices/packageSlice';
import postSlice from './slices/postSlice';
import contactSlice from './slices/contactSlice';

export const store = configureStore({
  reducer: {
    admin: adminSlice,
    packages: packageSlice,
    posts: postSlice,
    contacts: contactSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;

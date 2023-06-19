import { configureStore } from '@reduxjs/toolkit';
import { contactsApi } from './materialSlice';
import { filterReducer } from './filterSlice';
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});

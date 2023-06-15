import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
};

const handlePending = state => {
  state.contacts.isLoading = true;
};

const handlFulfilled = state => {
  state.contacts.isloading = false;
  state.contacts.error = '';
};

const handlFulfilledGet = (state, { payload }) => {
  // state.contacts.items = payload;
  state.contacts.items = payload.sort((a, b) => a.name.localeCompare(b.name));
};

const handlFulfilledAdd = (state, { payload }) => {
  // state.contacts.items.push(payload);

  state.contacts.items = [...state.contacts.items, payload].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  alert(`${payload.name} new content will be added.`);
};
const handlFulfilledDelete = (state, { payload }) => {
  state.contacts.items = state.contacts.items.filter(
    el => el.id !== payload.id
  );
  alert(`${payload.name} was deleted from your contacts.`);
};

const handleRejected = (state, { payload }) => {
  state.contacts.isLoading = false;
  state.contacts.error = payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder

      .addCase(fetchContacts.fulfilled, handlFulfilledGet)
      .addCase(addContact.fulfilled, handlFulfilledAdd)
      .addCase(deleteContact.fulfilled, handlFulfilledDelete)

      .addMatcher(action => {
        action.type.endsWith('/pending');
      }, handlePending)
      .addMatcher(action => {
        action.type.endsWith('/rejected');
      }, handleRejected)
      .addMatcher(action => {
        action.type.endsWith('/fulfilled');
      }, handlFulfilled);
  },
});

export const contactsReducer = contactsSlice.reducer;

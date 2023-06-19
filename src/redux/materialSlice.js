import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const contactsApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://6489885c5fa58521caafc53a.mockapi.io',
  }),
  tagTypes: ['Contacts', 'Contact'],
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => ({
        url: '/contacts',
      }),
      providesTags: ['Contacts'],
    }),

    // getContactByid: builder.query({
    //   query: id => ({
    //     url: `/contacts/${id}`,
    //   }),
    //   providesTags: ['Contact'],
    // }),
    deleteContacts: builder.mutation({
      query: contactId => ({
        url: `/contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
    addContacts: builder.mutation({
      query: newContact => ({
        url: '/contacts',
        method: 'POST',
        body: newContact,
      }),
      invalidatesTags: ['Contacts'],
    }),
    // changeContact: builder.mutation({
    //   query: ({ contactId, ...newContact }) => ({
    //     url: `/contacts/${contactId}`,
    //     method: 'PUT',
    //     body: newContact,
    //   }),
    //   invalidatesTags: ['Contact', 'Contacts'],
    // }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactByidQuery,
  useDeleteContactsMutation,
  useAddContactsMutation,
  useChangeContactMutation,
} = contactsApi;

import { baseApi } from './baseApi';

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSeller: builder.query({
      query: ({ limit = 10, page = 1 }) => ({
        url: '/admin/sellers',
        method: 'GET',
        params: { limit, offset: (page - 1) * limit },
      }),
      providesTags: ['Sellers'],
    }),
    getAdmin: builder.query({
      query: () => ({
        url: `/admin`,
        method: 'GET',
      }),
    }),
    getAllCustomer: builder.query({
      query: ({ limit = 10, page = 1 }) => ({
        url: '/admin/customers',
        method: 'GET',
        params: { limit, offset: (page - 1) * limit },
      }),
    }),
    deleteSeller: builder.mutation({
      query: (id) => ({
        url: `/admin/sellers/delete/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Sellers'],
    }),
    addSeller: builder.mutation({
      query: (newSeller) => ({
        url: '/admin/sellers',
        method: 'POST',
        body: newSeller,
      }),
      invalidatesTags: ['Sellers'],
    }),
    searchUser: builder.query({
      query: ({ city, page = 1, limit = 100 }) => ({
        url: `/admin/customers/city`,
        method: 'GET',
        params: { city, limit, offset: (page - 1) * limit },
      }),
    }),
  }),
});

export const {
  useGetAllSellerQuery,
  useGetAllCustomerQuery,
  useSearchUserQuery,
  useGetAdminQuery,
  useDeleteSellerMutation,
  useAddSellerMutation,
} = adminApi;

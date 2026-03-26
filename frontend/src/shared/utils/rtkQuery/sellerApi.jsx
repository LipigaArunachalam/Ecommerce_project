import { baseApi } from './baseApi';

export const sellerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSellerDetails: builder.query({
      query: () => ({
        url: '/sellers',
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),

    getProducts: builder.query({
      query: ({ limit, page }) => ({
        url: '/sellers/products',
        method: 'GET',
        params: { limit, page },
      }),
      providesTags: ['Products'],
    }),

    deleteProduct: builder.mutation({
      query: ({ sid, pid }) => ({
        url: `/sellers/${sid}/products/${pid}/delete`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Products'],
    }),

    updateProduct: builder.mutation({
      query: ({ sid, pid, data }) => ({
        url: `/sellers/${sid}/products/${pid}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),

    addProduct: builder.mutation({
      query: ({ sid, data }) => ({
        url: `/sellers/${sid}/products`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),

    orderStatus: builder.query({
      query: () => ({
        url: `/sellers/status`,
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ oid, status }) => ({
        url: `/orders/${oid}/${status}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Products'],
    }),

    sellerDashboard: builder.query({
      query: () => ({
        url: `/sellers/dashboard`,
        method: 'GET',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetSellerDetailsQuery,
  useGetProductsQuery,
  useDeleteProductMutation,
  useSellerDashboardQuery,
  useUpdateProductMutation,
  useAddProductMutation,
  useOrderStatusQuery,
  useUpdateOrderStatusMutation,
} = sellerApi;

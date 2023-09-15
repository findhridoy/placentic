import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // create a new order
    orderCreate: builder.mutation({
      query: (data) => ({
        url: "order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),

    // get all orders
    getOrders: builder.query({
      query: (url) => ({
        url: url,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),

    // update order
    updateOrder: builder.mutation({
      query: ({ orderId, data }) => ({
        url: `order/${orderId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),

    // delete order
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `order/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useOrderCreateMutation,
  useGetOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;

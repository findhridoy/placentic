import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // order payment
    orderPayment: builder.mutation({
      query: (data) => ({
        url: "order/payment",
        method: "POST",
        body: data,
      }),
    }),

    // create a new order
    orderCreate: builder.mutation({
      query: (data) => ({
        url: "order",
        method: "POST",
        body: data,
      }),
    }),

    // get all orders
    getOrders: builder.query({
      query: (url) => ({
        url: url,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useOrderPaymentMutation,
  useOrderCreateMutation,
  useGetOrdersQuery,
} = orderApi;

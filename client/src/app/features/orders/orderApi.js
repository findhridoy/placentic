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
  }),
});

export const { useOrderPaymentMutation } = orderApi;

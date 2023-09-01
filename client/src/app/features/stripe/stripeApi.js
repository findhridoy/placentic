import { apiSlice } from "../api/apiSlice";

export const stripeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // create payment intent
    paymentIntent: builder.mutation({
      query: (data) => ({
        url: "stripe/payment-intent",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePaymentIntentMutation } = stripeApi;

import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get products
    getProducts: builder.query({
      query: (size) => ({
        url: `product?size=${size}`,
        method: "GET",
      }),
    }),

    // get product by id
    getProduct: builder.query({
      query: (prodId) => ({
        url: `product/${prodId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productApi;

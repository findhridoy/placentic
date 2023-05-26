import { apiSlice } from "../api/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get categories
    getCategories: builder.query({
      query: (size, sort) => ({
        url: `category?size=${size}&sort=${sort}`,
        method: "GET",
      }),
    }),

    // get product by id
    // getProduct: builder.query({
    //   query: (prodId) => ({
    //     url: `product/${prodId}`,
    //     method: "GET",
    //   }),
    // }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;

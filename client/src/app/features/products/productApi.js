import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get products
    getProducts: builder.query({
      query: (url) => ({
        url: url,
        method: "GET",
      }),
    }),

    // get product by id
    getProduct: builder.query({
      query: (prodId) => ({
        url: `product/${prodId}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    // create product review
    createReview: builder.mutation({
      query: ({ prodId, data }) => ({
        url: `product/review/${prodId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    // approve product review / Only Admin /
    approveReview: builder.mutation({
      query: ({ prodId, revId, action }) => ({
        url: `product/review/approve/${prodId}?revId=${revId}&action=${action}`,
        method: "GET",
      }),
      invalidatesTags: ["Products"],
    }),

    // remove product review / Only Admin /
    removeReview: builder.mutation({
      query: ({ prodId, revId }) => ({
        url: `product/review/delete?prodId=${prodId}&revId=${revId}`,
        method: "GET",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateReviewMutation,
  useApproveReviewMutation,
  useRemoveReviewMutation,
} = productApi;

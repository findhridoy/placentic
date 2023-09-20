import { apiSlice } from "../api/apiSlice";
import { getCategories } from "./categorySlice";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get categories
    getCategories: builder.query({
      query: (url) => ({
        url: url,
        method: "GET",
      }),

      // store categories after query fulfilled
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(getCategories(data?.categories));
        } catch (error) {}
      },
      providesTags: ["Categories"],
    }),

    // create a new category
    createCategory: builder.mutation({
      query: (data) => ({
        url: "category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    // get category by title
    getCategory: builder.query({
      query: (url) => ({
        url: url,
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),

    // update category
    updateCategory: builder.mutation({
      query: ({ catId, data }) => ({
        url: `category/${catId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    // delete category
    deleteCategory: builder.mutation({
      query: (catId) => ({
        url: `category/${catId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;

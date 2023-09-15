import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all user
    getUsers: builder.query({
      query: (url) => ({
        url: url,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    // update user as an admin
    updateUser: builder.mutation({
      query: ({ userId, data }) => ({
        url: `user/${userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    // delete user by admin
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;

import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // user register a new account and login
    signup: builder.mutation({
      query: (user) => ({
        url: "user/register",
        method: "POST",
        body: user,
      }),

      // login operations after query fulfilled
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("userInfo", JSON.stringify(data));
          dispatch(userLoggedIn(data));
        } catch (error) {
          // no need to catch error here
        }
      },
    }),

    // user login
    login: builder.mutation({
      query: (user) => ({
        url: "user/login",
        method: "POST",
        body: user,
      }),

      // login operations after query fulfilled
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("userInfo", JSON.stringify(data));
          dispatch(userLoggedIn(data));
        } catch (error) {
          // no need to catch error here
        }
      },
    }),

    // user profile
    getProfile: builder.query({
      query: () => ({
        url: "user/profile",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    // update user profile
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "user",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],

      // updated fulfilled then update localstorage user data
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("userInfo", JSON.stringify(data));
          dispatch(userLoggedIn(data));
        } catch (error) {
          // no need to catch error here
        }
      },
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = authApi;

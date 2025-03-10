import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { Mutex } from "async-mutex"
import { logout, setToken } from "./features/Auth/authSlice";
// create refresh token functionality 
// Create a mutex to prevent multiple refresh requests at the same time 
const mutex = new Mutex;

const baseQuery = fetchBaseQuery(
  {
    baseUrl: "http://localhost:5000/api",
    prepareHeaders(headers, { getState }) {
      const state = getState() as RootState;
      const token: string = state?.auth?.token;
      // console.log(token);
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers;

    },
    credentials: "include",
  });

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  // Lock the mutex to prevent concurrent refresh requests
  let result = await baseQuery(args, api, extraOptions);
  // console.log(result);
  if (result.error && result?.error?.status === 500) {
    // If token expired, try to generate refresh token
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery({
          url: "/auth/refresh-token",
          method: "POST",
        },
          api,
          extraOptions
        );

        if (refreshResult?.data) {
          const newToken = refreshResult?.data as { data: string, success: boolean, message: string }
          console.log(newToken)
          // Update the token in the Redux store
          // return api.dispatch(setToken({ accessToken: newToken?.data, needsPasswordChange: true }));
        } else {
          console.log("hello logout!")
          api.dispatch(logout());
        }

        // return the original request with new token ;

        result = await baseQuery(args, api, extraOptions)


      } finally {
        release();
      }
    };

  } else {
    await mutex.waitForUnlock();
    result = await baseQuery(args, api, extraOptions);
  }

  return result;
}


export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["courses", "Carts", "users"],
  endpoints: (builder) => ({

    // signup
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),

    //login
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // forgot password 
    forgotPassword: builder.mutation({
      query: (credentials) => ({
        url: "/auth/change-password",
        method: "POST",
        body: credentials,
      }),
    }),

    // reset password

    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: '/auth/reset-password',
        method: "POST",
        body: credentials
      })
    }),

    // refresh token generate
    generateRefreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
      }),
    }),

    createProduct: builder.mutation({
      query: (product) => {
        return {
          url: "/courses/create-course",
          method: "POST",
          body: product,
        };
      },
      invalidatesTags: [{ type: "courses", id: "LIST" }],
    }),

    getCourses: builder.query({
      query: (params) => {
        return {
          url: "/courses",
          method: "GET",
          params,
        };
      },
      providesTags: [{ type: "courses", id: "LIST" }],
    }),
    getCourseBySlug: builder.query({
      query: (slug) => ({
        url: `/courses/${slug}`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "courses", id }],
    }),

    // payment

    createPayment: builder.mutation({
      query: (paymentInfo) => {
        return {
          url: "/payment/create-payment",
          method: "POST",
          body: paymentInfo,
        };
      },
      invalidatesTags: [{ type: "courses", id: "LIST" }],
    }),







    updateProductById: builder.mutation({
      query: ({ productId, ...product }) => ({
        url: `/courses/${productId}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ({ _id }) => [{ type: "courses", id: _id }],
    }),

    deleteSingleProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/courses/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ({ _id }) => [{ type: "courses", id: _id }],
    }),

  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGenerateRefreshTokenMutation,
  useCreateProductMutation,
  useGetCoursesQuery,
  useGetCourseBySlugQuery,
  useCreatePaymentMutation,
  useUpdateProductByIdMutation,
  useDeleteSingleProductMutation,
} = baseApi;
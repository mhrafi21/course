import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { RootState } from "./store";
import { logout, setToken } from "./features/Auth/authSlice";

// Create a mutex to prevent multiple simultaneous refresh requests
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: "https://server-course-sigma.vercel.app/api",
  prepareHeaders(headers, { getState }) {
    const state = getState() as RootState;
    const token = state?.auth?.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result?.error?.status === 500) {
    // If token is expired, try to refresh it
    if (!mutex.isLocked()) {
      const release = await mutex.acquire(); // Acquire lock

      try {
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh-token",
            method: "POST",
          },
          api,
          extraOptions
        );

        if (refreshResult?.data) {
          const newToken = refreshResult?.data as { data: string; success: boolean; message: string };

          if (newToken?.success) {
            // Update Redux state with new token
            api.dispatch(setToken({ accessToken: newToken.data, needsPasswordChange: false }));

            // Retry the original request with new token
            result = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch(logout());
            window.location.href = "/login";
          }
        } else {
          api.dispatch(logout());
          window.location.href = "/login";
        }
      } finally {
        release(); // Release lock
      }
    } else {
      // If another request is refreshing, wait for it to complete before retrying
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["courses", "users"],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (credentials) => ({
        url: "/auth/change-password",
        method: "POST",
        body: credentials,
      }),
    }),

    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: credentials,
      }),
    }),

    generateRefreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
      }),
      invalidatesTags: ["users"],
    }),

    createProduct: builder.mutation({
      query: (product) => ({
        url: "/courses/create-course",
        method: "POST",
        body: product,
      }),
      invalidatesTags: [{ type: "courses", id: "LIST" }],
    }),

    getCourses: builder.query({
      query: (params) => ({
        url: "/courses",
        method: "GET",
        params,
      }),
      providesTags: [{ type: "courses", id: "LIST" }],
    }),

    getCourseBySlug: builder.query({
      query: (slug) => ({
        url: `/courses/${slug}`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "courses", id }],
    }),

    createPayment: builder.mutation({
      query: (paymentInfo) => ({
        url: "/payment/create-payment",
        method: "POST",
        body: paymentInfo,
      }),
      invalidatesTags: [{ type: "courses", id: "LIST" }],
    }),

    // create enroll

    createEnroll: builder.mutation({
      query: (enrollInfo) => ({
        url: "/enroll/create-enroll",
        method: "POST",
        body: enrollInfo,
      })
    }),

    getEnrollCourse: builder.query({
      query: () => ({
        url: "/enroll",
        method: "GET",
      })
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
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
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
  useCreateEnrollMutation,
  useGetEnrollCourseQuery,
  // useGetEnrollByStudentIdQuery,
  // useGetEnrollByCourseIdQuery,
  // useGetEnrollByInstructorIdQuery,
  // useGetCourseByInstructorIdQuery,
  useUpdateProductByIdMutation,
  useDeleteSingleProductMutation,
} = baseApi;

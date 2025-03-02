import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Update the UpdateCartMutationResult type definition

/// https://backend-campers-shop.vercel.app/api/v1

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["courses", "Carts"],
  endpoints: (builder) => ({
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
  useCreateProductMutation,
  useGetCoursesQuery,
  useGetCourseBySlugQuery,
  useUpdateProductByIdMutation,
  useDeleteSingleProductMutation,
} = baseApi;
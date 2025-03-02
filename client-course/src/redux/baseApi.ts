import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface UpdateCartResponse {
  success: boolean;
  cartId?: string;

  // Add other properties as needed
}

// Update the UpdateCartMutationResult type definition
export type UpdateCartMutationResult =
  | {
      data: UpdateCartResponse;
    }
  | {
      error: unknown;
    };

/// https://backend-campers-shop.vercel.app/api/v1

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://backend-campers-shop.vercel.app/api/v1" }),
  tagTypes: ["Products", "Carts"],
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (product) => {
        return {
          url: "/products/create-product",
          method: "POST",
          body: product,
        };
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    getProducts: builder.query({
      query: (params) => {
        return {
          url: "/products",
          method: "GET",
          params,
        };
      },
      providesTags: [{ type: "Products", id: "LIST" }],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "Products", id }],
    }),
    updateProductById: builder.mutation({
      query: ({ productId, ...product }) => ({
        url: `/products/${productId}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ({ _id }) => [{ type: "Products", id: _id }],
    }),

    deleteSingleProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ({ _id }) => [{ type: "Products", id: _id }],
    }),
   
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductByIdMutation,
  useDeleteSingleProductMutation,
} = baseApi;
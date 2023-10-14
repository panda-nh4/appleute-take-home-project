import { apiSlice } from "./apiSlice";

const CART_URL = "/api/cart";

export const cartsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.mutation({
      query: (data) => ({
        url: `${CART_URL}/items`,
        method: "GET",
      }),
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        url: `${CART_URL}/addToCart`,
        method: "POST",
        body:data,
      }),
    }),
    removeItem: builder.mutation({
      query: (data) => ({
        url: `${CART_URL}/removeFromCart`,
        method: "POST",
        body: data,
      }),
    }),
    registerCart: builder.mutation({
      query: (data) => ({
        url: `${CART_URL}/signUp`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCartMutation,
  useAddToCartMutation,
  useRemoveItemMutation,
  useRegisterCartMutation,
} = cartsApiSlice;


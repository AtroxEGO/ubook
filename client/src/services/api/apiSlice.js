import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getTokenFromLocalStorage = () => {
  const { accountReducer } = JSON.parse(sessionStorage.getItem("reduxState"));
  return accountReducer.token;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3002/v1/",
    prepareHeaders: async (headers, query) => {
      headers.set("Authorization", "Bearer " + getTokenFromLocalStorage());
      return headers;
    },
  }),
  transformErrorResponse: (response, meta, arg) => {
    return { ...response.data, type: "error" };
  },
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: () => "services/getAll",
      transformErrorResponse: (response, meta, arg) => {
        return { ...response.data, type: "error" };
      },
    }),
    getServiceByID: builder.mutation({
      query: (body) => ({
        url: "/services/getById",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response, meta, arg) => {
        return { ...response.data, type: "error" };
      },
    }),
    loginUser: builder.mutation({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response, meta, arg) => {
        return { ...response.data, type: "error" };
      },
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: "/user/create",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response, meta, arg) => {
        return { ...response.data, type: "error" };
      },
    }),
    loginBusiness: builder.mutation({
      query: (body) => ({
        url: "/business/login",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response, meta, arg) => {
        return { ...response.data, type: "error" };
      },
    }),
    createBusiness: builder.mutation({
      query: (body) => ({
        url: "/business/create",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response, meta, arg) => {
        return { ...response.data, type: "error" };
      },
    }),
    getAllFavorites: builder.mutation({
      query: (body) => ({
        url: "/favorites/getAll",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response, meta, arg) => {
        return { ...response.data, type: "error" };
      },
    }),
    addFavorite: builder.mutation({
      query: (body) => ({
        url: "/favorites/add",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response, meta, arg) => {
        return { ...response.data, type: "error" };
      },
    }),
    removeFavorite: builder.mutation({
      query: (body) => ({
        url: "/favorites/remove",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response, meta, arg) => {
        return { ...response.data, type: "error" };
      },
    }),
    verifyUser: builder.mutation({
      query: (body) => ({
        url: "/user/verify",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response, meta, arg) => {
        return { ...response.data, type: "error" };
      },
    }),
    resendUserCode: builder.query({
      query: () => "user/resendCode",
      transformErrorResponse: (response, meta, arg) => {
        return { ...response.data, type: "error" };
      },
    }),
    verifyBusiness: builder.mutation({
      query: (body) => ({
        url: "/business/verify",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response, meta, arg) => {
        return { ...response.data, type: "error" };
      },
    }),
    resendBusinessCode: builder.query({
      query: () => "business/resendCode",
      transformErrorResponse: (response, meta, arg) => {
        return { ...response.data, type: "error" };
      },
    }),
  }),
});

export const {
  useCreateBusinessMutation,
  useCreateUserMutation,
  useGetAllServicesQuery,
  useGetServiceByIDMutation,
  useLoginUserMutation,
  useLoginBusinessMutation,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useGetAllFavoritesMutation,
  useVerifyUserMutation,
  useVerifyBusinessMutation,
  useResendUserCodeQuery,
  useResendBusinessCodeQuery,
} = api;

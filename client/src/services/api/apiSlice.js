import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { json } from "react-router-dom";

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
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: () => "services/getAll",
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
  }),
});

export const { useGetAllServicesQuery, useLoginUserMutation } = api;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3002/v1/" }),
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

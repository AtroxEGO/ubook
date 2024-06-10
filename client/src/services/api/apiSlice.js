import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getTokenFromLocalStorage = () => {
  const { accountReducer } = JSON.parse(sessionStorage.getItem("reduxState"));
  return accountReducer.token;
};

const baseUrl = `${process.env.API_HOST}/api`;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
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
    getServiceHoursForDay: builder.mutation({
      query: (body) => ({
        url: "/services/getAvailableHours",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response, meta, arg) => {
        return { ...response.data, type: "error" };
      },
    }),
    bookService: builder.mutation({
      query: (body) => ({
        url: "/bookings/new",
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
    getUpcomingBookings: builder.mutation({
      query: (body) => ({
        url: "/bookings/getUpcoming",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response, meta, arg) => {
        return { ...response.data, type: "error" };
      },
    }),
    getBookingsForTimeframe: builder.mutation({
      query: (body) => ({
        url: "/bookings/getForTimeframe",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response, meta, arg) => {
        return { ...response.data, type: "error" };
      },
    }),
    getArchiveBookings: builder.mutation({
      query: (body) => ({
        url: "/bookings/getArchive",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response, meta, arg) => {
        return { ...response.data, type: "error" };
      },
    }),
    getReviewByUser: builder.mutation({
      query: (body) => ({
        url: "/reviews/getReviewByUser",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response, meta, arg) => {
        return { ...response.data, type: "error" };
      },
    }),
    addReview: builder.mutation({
      query: (body) => ({
        url: "/reviews/add",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response, meta, arg) => {
        return { ...response.data, type: "error" };
      },
    }),
    removeReview: builder.mutation({
      query: (body) => ({
        url: "/reviews/remove",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response, meta, arg) => {
        return { ...response.data, type: "error" };
      },
    }),
    removeBooking: builder.mutation({
      query: (body) => ({
        url: "/bookings/delete",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response, meta, arg) => {
        return { ...response.data, type: "error" };
      },
    }),
    acceptBooking: builder.mutation({
      query: (body) => ({
        url: "/bookings/accept",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response, meta, arg) => {
        return { ...response.data, type: "error" };
      },
    }),
    getAllSubcategories: builder.query({
      query: () => "services/getAllSubcategories",
      transformErrorResponse: (response, meta, arg) => {
        return { ...response.data, type: "error" };
      },
    }),
    createService: builder.mutation({
      query: (body) => ({
        url: "/manage/createService",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response, meta, arg) => {
        return { ...response.data, type: "error" };
      },
    }),
    getAllServicesByBusiness: builder.mutation({
      query: (body) => ({
        url: "/services/getByOwner",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response, meta, arg) => {
        return { ...response.data, type: "error" };
      },
    }),
    deleteService: builder.mutation({
      query: (body) => ({
        url: "/manage/deleteService",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response, meta, arg) => {
        return { ...response.data, type: "error" };
      },
    }),
    updateService: builder.mutation({
      query: (body) => ({
        url: "/manage/updateService",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response, meta, arg) => {
        return { ...response.data, type: "error" };
      },
    }),
  }),
});

export const {
  useCreateBusinessMutation,
  useGetAllSubcategoriesQuery,
  useCreateUserMutation,
  useGetAllServicesQuery,
  useGetServiceHoursForDayMutation,
  useBookServiceMutation,
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
  useGetUpcomingBookingsMutation,
  useGetArchiveBookingsMutation,
  useGetBookingsForTimeframeMutation,
  useGetReviewByUserMutation,
  useAddReviewMutation,
  useRemoveReviewMutation,
  useRemoveBookingMutation,
  useAcceptBookingMutation,
  useCreateServiceMutation,
  useGetAllServicesByBusinessMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} = api;

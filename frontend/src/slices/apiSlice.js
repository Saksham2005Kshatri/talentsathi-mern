import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});

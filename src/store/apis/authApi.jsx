import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "auth",
  keepUnusedDataFor: 0, // Disable caching
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8084",
    credentials: "include", // Send cookies with requests
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json, text/plain, */*");
      const xsrf = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("XSRF-TOKEN=")) // Adjust the cookie name if needed
        ?.split("=")[1];

      if (xsrf) {
        headers.set("X-XSRF-TOKEN", decodeURIComponent(xsrf));
      }

      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      login: builder.mutation({
        query: (credentials) => {
          return {
            url: "/login",
            method: "POST",
            body: credentials,
          };
        },
      }),

      createAccount: builder.mutation({
        query: (user) => {
          return {
            url: "/create-user",
            method: "POST",
            body: {
              email: user.email,
              password: user.password,
              name: user.name,
            },
          };
        },
      }),
    };
  },
});

export const { useLoginMutation, useCreateAccountMutation } = authApi;

export { authApi };

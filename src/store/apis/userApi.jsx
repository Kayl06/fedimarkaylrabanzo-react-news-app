/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8084/api/user",
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
      registerPreferences: builder.mutation({
        query: (user) => {
          return {
            url: "/preference",
            method: "POST",
            body: {
              user_id: user.user_id,
              preference_name: user.preference_name,
            },
          };
        },
      }),
    };
  },
});

export const { useRegisterPreferencesMutation } = userApi;

export { userApi };

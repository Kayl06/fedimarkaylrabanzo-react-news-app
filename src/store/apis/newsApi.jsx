/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const newsApi = createApi({
  reducerPath: "news",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8084/api/news",
  }),
  endpoints: (builder) => {
    return {
      fetchNews: builder.query({
        query: () => {
          return {
            url: "/",
            method: "GET",
          };
        },
      }),

      searchNews: builder.query({
        query: (params) => {
          return {
            url: "/",
            method: "GET",
            params: params,
          };
        },
      }),

      fetchCategories: builder.query({
        query: (query) => {
          return {
            url: "/categories",
          };
        },
      }),

      fetchSources: builder.query({
        query: (category) => {
          return {
            url: "/sources",
            params: {
              category,
            },
          };
        },
      }),

      fetchAuthors: builder.query({
        query: (sources) => {
          console.log(sources);
          return {
            url: "/authors",
            params: sources,
          };
        },
      }),
    };
  },
});

export const {
  useFetchNewsQuery,
  useSearchNewsQuery,
  useFetchCategoriesQuery,
  useFetchSourcesQuery,
  useFetchAuthorsQuery,
} = newsApi;

export { newsApi };

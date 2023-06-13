import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "./apis/authApi";
import { newsApi } from "./apis/newsApi";
import { userApi } from "./apis/userApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(newsApi.middleware)
      .concat(authApi.middleware)
      .concat(userApi.middleware);
  },
});

setupListeners(store.dispatch);

export { useLoginMutation, useCreateAccountMutation } from "./apis/authApi";
export {
  useFetchNewsQuery,
  useSearchNewsQuery,
  useFetchCategoriesQuery,
  useFetchSourcesQuery,
  useFetchAuthorsQuery,
} from "./apis/newsApi";
export { useRegisterPreferencesMutation } from "./apis/userApi";

export { authApi, newsApi, userApi };

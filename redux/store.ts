"use client";

import authSlice from "./features/auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// call the refresh token function on every page load
const initializeApp = async () => {
  await store.dispatch(
    apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
  );

  await store.dispatch(
    apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};

initializeApp();

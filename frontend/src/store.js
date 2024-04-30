import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { authApiSlice } from "./slices/api/authApiSlice";
import { itemsApiSlice } from "./slices/api/itemsApiSlice";
import { apiSlice } from "./slices/api/baseApiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [itemsApiSlice.reducerPath]: itemsApiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      apiSlice.middleware,
      authApiSlice.middleware,
    ]),
  devTools: true,
});

export default store;

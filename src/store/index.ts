import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { heroApi } from "../api/heroApi";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(heroApi.middleware),
});

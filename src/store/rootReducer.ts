import { combineReducers } from "@reduxjs/toolkit";
import { heroApi } from "../api/heroApi";

export default combineReducers({
  [heroApi.reducerPath]: heroApi.reducer,
});

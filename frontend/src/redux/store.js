import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./slices/userLoginSlice";
//import userTransferSlice from "./slices/userTransferSlice";
export const reduxStore = configureStore({
  reducer: {
    userLogin: userLoginReducer
  }
});

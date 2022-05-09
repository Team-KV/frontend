import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "redux/slices/snackbarSlice";
import userReducer from "redux/slices/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    snackbar: snackbarReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;
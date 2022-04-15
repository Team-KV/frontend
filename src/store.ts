import { applyMiddleware, configureStore, createStore } from "@reduxjs/toolkit";
import userReducer from "redux/slices/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer
  }
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;
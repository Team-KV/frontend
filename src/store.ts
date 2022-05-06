import { applyMiddleware, configureStore, createStore } from "@reduxjs/toolkit";
// import userReducer from "redux/slices/userSlice";
import snackbarReducer from "redux/slices/snackbarSlice";

const store = configureStore({
  reducer: {
    // user: userReducer,
    snackbar: snackbarReducer,
    // clients: clientsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;
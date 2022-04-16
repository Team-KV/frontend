import { applyMiddleware, configureStore, createStore } from "@reduxjs/toolkit";
// import clientsReducer from "redux/slices/clientsSlice";
import userReducer from "redux/slices/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    // clients: clientsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;
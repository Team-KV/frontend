import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import userService from "api/services/userService";
import { User } from "models/User";

export interface SnackbarState {
  snackbarOpen: boolean,
  snackbarType: 'success' | 'error' | 'warning' | 'info',
  snackbarMessage: string,
}

const initialState: SnackbarState = {
  snackbarOpen: false,
  snackbarType: 'success',
  snackbarMessage: "",
}

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbar: (state, action: PayloadAction<SnackbarState>) => {
      const { snackbarOpen, snackbarType, snackbarMessage } = action.payload
      return {
        ...state,
        snackbarOpen,
        snackbarType,
        snackbarMessage
      }
    },
    showSuccess: (state, action) => {
      const message = action.payload
      return {
        ...state,
        snackbarOpen: true,
        snackbarType: 'success',
        snackbarMessage: message
      }
    },
    showError: (state, action) => {
      const message = action.payload
      return {
        ...state,
        snackbarOpen: true,
        snackbarType: 'error',
        snackbarMessage: message
      }
    },
    hideSnackbar: (state) => {
      return {
        ...state,
        snackbarOpen: false,
      }
    }
  },
});

export const { setSnackbar, showError, showSuccess, hideSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
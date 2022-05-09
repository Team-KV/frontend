import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import userService from "api/services/userService";

export interface UserState {
  value?: {
    id: number,
    email: string,
    password: string,
    role: number,
    staff_id: number,
    client_id: number,
    staff: object,
    client: object,
  }
  status: string
}

const initialState: UserState = {
  status: '',
}

export const fetchUser = createAsyncThunk('user/fetchUser', async () => await userService.getUserInfo());

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
    }
  },
  extraReducers: {
    [fetchUser.pending as any]: (state: UserState) => {
      state.status = 'loading'
    },
    [fetchUser.fulfilled as any]: (state, { payload }) => {
      state.value = payload
      state.status = 'success'
    },
    [fetchUser.rejected as any]: (state) => {
      state.status = 'failed'
    }
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
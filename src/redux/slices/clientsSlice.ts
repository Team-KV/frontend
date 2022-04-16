import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import clientService from "api/services/clientService";
import { Client } from "models/Client";

export interface ClientState {
  value: Client[]
  status: string
}

const initialState: ClientState = {
  value: [],
  status: '',
}

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => await clientService.getClients());

export const addClient = createAsyncThunk('clients/addClient', async (client: any) => {
  const data = clientService.addClient(client);
  clientAdded(client);
  return data;
})

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    clientAdded(state, { payload }) {
      debugger;
      return {
        ...state,
        arr: [...state.value, payload]
      }

    },
    clientUpdated(state, action) {
      debugger;
    },
    clientDeleted(state, action) {
      debugger;
    },
    clientsFiltered(state, { payload }) {
      debugger;
    }
  },
  extraReducers: {
    // FETCH CLIENTS
    [fetchClients.pending as any]: (state: ClientState) => {
      state.status = 'loading'
    },
    [fetchClients.fulfilled as any]: (state, { payload }) => {
      state.value = payload
      state.status = 'success'
    },
    [fetchClients.rejected as any]: (state) => {
      state.status = 'failed'
    }
  }
})

export const { clientAdded, clientUpdated, clientDeleted } = clientsSlice.actions;

export default clientsSlice.reducer;
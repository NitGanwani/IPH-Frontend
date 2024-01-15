import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Terminal } from '../models/terminal';
import { GetTerminalPayload } from '../types/api.response';

export type TerminalsState = {
  terminals: Terminal[];
};

const initialState: TerminalsState = {
  terminals: [],
};

export const loadTerminalsAsync = createAsyncThunk<
  Terminal[],
  GetTerminalPayload
>('load', async ({ repo }) => {
  const terminals = await repo.getAll();

  return terminals;
});

const terminalsSlice = createSlice({
  name: 'terminals',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(loadTerminalsAsync.fulfilled, (state, { payload }) => ({
      ...state,
      terminals: payload,
    }));
  },
});

export default terminalsSlice.reducer;

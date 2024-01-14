import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Terminal } from '../models/terminal';
import { GetTerminalPayload } from '../types/api.response';
import { ApiResponse } from '../../core/services/terminals/terminal.repository';

export type TerminalsState = {
  terminals: Terminal[];
  stateOption: 'idle' | 'loading' | 'error';
};

const initialState: TerminalsState = {
  terminals: [],
  stateOption: 'idle',
};

export const loadTerminalsAsync = createAsyncThunk<
  ApiResponse,
  GetTerminalPayload
>('load', async ({ repo }) => {
  const films = await repo.getAll();
  return films;
});

const terminalsSlice = createSlice({
  name: 'terminals',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(loadTerminalsAsync.pending, (state) => {
      state.stateOption = 'loading';
      return state;
    });
    builder.addCase(loadTerminalsAsync.fulfilled, (state, { payload }) => {
      state.terminals = payload.items;
      state.stateOption = 'idle';
      return state;
    });
    builder.addCase(loadTerminalsAsync.rejected, (state) => {
      state.stateOption = 'error';
      return state;
    });
  },
});

export default terminalsSlice.reducer;

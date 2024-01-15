import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Terminal } from '../models/terminal';
import { GetTerminalPayload } from '../types/api.response';
import { TerminalRepository } from '../../core/services/terminals/terminal.repository';

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

export const createTerminalAsync = createAsyncThunk<
  Terminal,
  { repo: TerminalRepository; terminal: FormData }
>('create', async ({ repo, terminal }) => {
  const result = await repo.create(terminal);
  return result;
});

export const updateTerminalAsync = createAsyncThunk<
  Terminal,
  { repo: TerminalRepository; id: Terminal['id']; terminal: FormData }
>('films/update', async ({ repo, id, terminal }) => {
  return await repo.update(id, terminal);
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
    builder.addCase(createTerminalAsync.fulfilled, (state, { payload }) => ({
      ...state,
      terminals: [...state.terminals, payload],
    }));
    builder.addCase(updateTerminalAsync.fulfilled, (state, { payload }) => ({
      ...state,
      films: state.terminals.map((item) =>
        item.id === payload.id ? payload : item
      ),
    }));
  },
});

export default terminalsSlice.reducer;

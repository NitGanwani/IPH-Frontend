import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Chat } from '../models/chat';
import { GetChatPayload } from '../types/api.response';

export type ChatsState = {
  chats: Chat[];
};

const initialState: ChatsState = {
  chats: [],
};

export const loadChatsAsync = createAsyncThunk<Chat[], GetChatPayload>(
  'chats/load',
  async ({ repo }) => {
    const groups = await repo.getAll();
    return groups;
  }
);

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadChatsAsync.fulfilled, (state, { payload }) => ({
      ...state,
      chats: payload,
    }));
  },
});

export default chatsSlice.reducer;

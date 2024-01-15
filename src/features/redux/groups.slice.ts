import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Group } from '../models/group';
import { GetGroupPayload } from '../types/api.response';

export type GroupsState = {
  groups: Group[];
};

const initialState: GroupsState = {
  groups: [],
};

export const loadGroupsAsync = createAsyncThunk<Group[], GetGroupPayload>(
  'load',
  async ({ repo }) => {
    const groups = await repo.getAll();
    return groups;
  }
);

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadGroupsAsync.fulfilled, (state, { payload }) => ({
      ...state,
      groups: payload,
    }));
  },
});

export default groupsSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginUser, User } from '../models/user';
import { LoginResponse } from '../types/login.response';
import { UserRepository } from '../../core/services/users/user.repository';
import { LocalStorage } from '../../core/services/local.storage';

type LoginState = 'idle' | 'logging' | 'error';

export type UsersState = {
  loggedUser: User | null;
  loginLoadState: LoginState;
  token: string;
};

const initialState: UsersState = {
  loggedUser: null,
  loginLoadState: 'idle',
  token: '',
};

export const loginUserAsync = createAsyncThunk<
  LoginResponse,
  {
    loginUser: LoginUser;
    repo: UserRepository;
    userStore: LocalStorage<{ token: string }>;
  }
>('users/login', async ({ loginUser, repo, userStore }) => {
  const result = await repo.login(loginUser);
  userStore.set({ token: result.token });
  return result;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: (state: UsersState) => {
      state.loggedUser = null;
      state.token = '';
      return state;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginUserAsync.pending, (state) => {
      state.loginLoadState = 'logging';
    });
    builder.addCase(loginUserAsync.fulfilled, (state, { payload }) => {
      state.loggedUser = payload.user;
      state.token = payload.token;
    });
    builder.addCase(loginUserAsync.rejected, (state) => {
      state.loginLoadState = 'error';
    });
  },
});

export default usersSlice.reducer;
export const ac = usersSlice.actions;
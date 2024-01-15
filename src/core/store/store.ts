import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import usersReducer from '../../features/redux/users.slice';
import terminalsReducer from '../../features/redux/terminals.slice';
import groupsReducer from '../../features/redux/groups.slice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    terminals: terminalsReducer,
    groups: groupsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../core/store/store';
import { UserRepository } from '../../core/services/users/user.repository';
import { LocalStorage } from '../../core/services/local.storage';
import { url } from '../../config';
import {
  ac,
  loginTokenThunk,
  loginUserAsync,
  registerUserAsync,
} from '../redux/users.slice';
import { LoginUser, User } from '../models/user';

export function useUsers() {
  const { loggedUser, loginLoadState, token } = useSelector(
    (state: RootState) => state.users
  );

  const dispatch = useDispatch<AppDispatch>();
  const repo = new UserRepository(url);
  const userStore = new LocalStorage<{ token: string }>('user');

  const login = (loginUser: LoginUser) => {
    dispatch(loginUserAsync({ loginUser, repo, userStore }));
  };

  const loginWithToken = () => {
    const userStoreData = userStore.get();
    if (userStoreData) {
      const token = userStoreData.token;
      dispatch(loginTokenThunk({ token, repo, userStore }));
    }
  };

  const handleRegisterUser = async (user: Partial<User>) => {
    dispatch(registerUserAsync({ repo, user }));
  };

  const logout = () => {
    dispatch(ac.logout());
    userStore.remove();
  };

  return {
    login,
    logout,
    loginWithToken,
    handleRegisterUser,
    loggedUser,
    loginLoadState,
    token,
  };
}

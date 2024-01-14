import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../core/store/store';
import { UserRepository } from '../../core/services/users/user.repository';
import { LocalStorage } from '../../core/services/local.storage';
import { url } from '../../config';
import { ac, loginUserAsync } from '../redux/users.slice';
import { LoginUser } from '../models/user';

export function useUsers() {
  const { loggedUser, loginLoadState } = useSelector(
    (state: RootState) => state.users
  );

  const dispatch = useDispatch<AppDispatch>();
  const repo = new UserRepository(url);
  const userStore = new LocalStorage<{ token: string }>('user');

  const login = (loginUser: LoginUser) => {
    dispatch(loginUserAsync({ loginUser, repo, userStore }));
  };

  const logout = () => {
    dispatch(ac.logout());
    userStore.remove();
  };

  return {
    login,
    logout,
    loggedUser,
    loginLoadState,
  };
}

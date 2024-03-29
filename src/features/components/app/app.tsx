import { useEffect } from 'react';
import { useUsers } from '../../hooks/use.users';
import { AppRoutes } from '../app.routes/app.routes';
import Header from '../header/header';
import './app.module.scss';
import { Footer } from '../footer/footer';

export function App() {
  const { loginWithToken } = useUsers();

  useEffect(() => {
    loginWithToken();
  }, []);

  return (
    <>
      <Header></Header>
      <AppRoutes></AppRoutes>
      <Footer></Footer>
    </>
  );
}

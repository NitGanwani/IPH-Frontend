import { AppRoutes } from '../app.routes/app.routes';
import Header from '../header/header';

export function App() {
  return (
    <>
      <Header></Header>
      <AppRoutes></AppRoutes>
    </>
  );
}

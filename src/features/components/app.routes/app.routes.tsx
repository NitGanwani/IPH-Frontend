import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Login = lazy(() => import('../login/login'));

export function AppRoutes() {
  return (
    <Suspense>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
    </Suspense>
  );
}

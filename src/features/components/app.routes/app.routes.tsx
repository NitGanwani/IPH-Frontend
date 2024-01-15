import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Login = lazy(() => import('../login/login'));
const Home = lazy(() => import('../home/home'));
const Dashboard = lazy(() => import('../dashboard/dashboard'));
const TerminalForm = lazy(() => import('../terminal.form/terminal.form'));

export function AppRoutes() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route
          path="/terminal-form"
          element={<TerminalForm></TerminalForm>}
        ></Route>
      </Routes>
    </Suspense>
  );
}

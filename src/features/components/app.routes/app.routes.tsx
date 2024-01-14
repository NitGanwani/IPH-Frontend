import { Suspense } from 'react';
import { Routes } from 'react-router-dom';

export function AppRoutes() {
  return (
    <Suspense>
      <Routes></Routes>
    </Suspense>
  );
}

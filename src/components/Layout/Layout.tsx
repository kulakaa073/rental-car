import { Outlet } from 'react-router';
import { Header } from '../Header/Header';

export const Layout = () => {
  return (
    <>
      <Header />
      <main className="mx-auto w-full">
        <Outlet />
      </main>
    </>
  );
};

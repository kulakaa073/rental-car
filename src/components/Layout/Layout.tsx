import { Outlet } from 'react-router';
import { Header } from '../Header/Header';
import { ScrollBar } from '../ui/ScrollBar/ScrollBar';

export const Layout = () => {
  return (
    <ScrollBar className="min-h-screen w-screen">
      <Header />
      <main className="mx-auto w-full">
        <Outlet />
      </main>
    </ScrollBar>
  );
};

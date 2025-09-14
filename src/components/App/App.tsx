import { Route, Routes, Navigate } from 'react-router';
import { Layout } from '../Layout/Layout';
import { Suspense, lazy } from 'react';
import { Loader } from '../ui/Loader/Loader';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const CatalogPage = lazy(() => import('../../pages/CatalogPage/CatalogPage'));
const CarDetailsPage = lazy(
  () => import('../../pages/CarDetailsPage/CarDetailsPage')
);
const FavouritesPage = lazy(
  () => import('../../pages/FavouritesPage/FavouritesPage')
);
const ReservationsPage = lazy(
  () => import('../../pages/ReservationsPage/ReservationsPage')
);

export const App = () => {
  return (
    <Suspense fallback={<Loader isLoading={true} />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:carId" element={<CarDetailsPage />} />
          <Route path="/catalog/favourites" element={<FavouritesPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

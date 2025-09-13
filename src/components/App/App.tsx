import { Route, Routes, Navigate } from 'react-router';
import { Layout } from '../Layout/Layout';
import { HomePage } from '../../pages/HomePage/HomePage';
import { CatalogPage } from '../../pages/CatalogPage/CatalogPage';
import { CarDetailPage } from '../../pages/CarDetailsPage/CarDetailsPage';
import { FavouritesPage } from '../../pages/FavouritesPage/FavouritesPage';
import { Suspense } from 'react';
import { ReservationsPage } from '../../pages/ReservationsPage/ReservationsPage';
import { Loader } from '../ui/Loader/Loader';

export const App = () => {
  return (
    <Suspense fallback={<Loader isLoading={true} />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:carId" element={<CarDetailPage />} />
          <Route path="/catalog/favourites" element={<FavouritesPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

import { Route, Routes, Navigate } from 'react-router';
import { Layout } from '../Layout/Layout';
import { HomePage } from '../../pages/HomePage/HomePage';
import { CatalogPage } from '../../pages/CatalogPage/CatalogPage';
import { CarDetailPage } from '../../pages/CarDetailsPage/CarDetailsPage';
import { Suspense } from 'react';

export const App = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:carId" element={<CarDetailPage />} />
          <Route path="/catalog/favourites" element={<CatalogPage />} />
          <Route path="/reservations" element={<CatalogPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

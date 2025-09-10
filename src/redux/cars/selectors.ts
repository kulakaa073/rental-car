import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export const selectCars = (state: RootState) => state.cars.items;
export const selectCarById = (state: RootState, carId: string) =>
  state.cars.items.find(item => item.id === carId);
export const selectCarsWithFavourites = createSelector(
  (state: RootState) => state.cars.items,
  (state: RootState) => state.favourites.items,
  (cars, favourites) => [...favourites, ...cars]
);

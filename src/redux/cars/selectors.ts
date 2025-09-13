import type { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';
import { selectFavouritesIdSet } from '../favourites/selectors';

export const selectCars = (state: RootState) => state.cars.items;
export const selectCarById = (state: RootState, carId: string) =>
  state.cars.items.find(item => item.id === carId);
export const selectPagination = (state: RootState) => state.cars.pagination;
export const selectPage = (state: RootState) => state.cars.pagination.page;
export const selectCarBrands = (state: RootState) => state.cars.brands;
export const isValidBrand = (state: RootState, brand: string) => {
  return state.cars.brands.includes(brand);
};
export const selectIsCarsLoading = (state: RootState) => state.cars.isLoading;
export const selectCarsWithFavourite = createSelector(
  (state: RootState) => state.cars.items,
  selectFavouritesIdSet,
  (cars, favouritesSet) =>
    cars.map(car => ({
      ...car,
      isFavourite: favouritesSet.has(car.id),
    }))
);

export const selectIsFetched = (state: RootState) => state.cars.fetched;

export const selectCurrentCar = (state: RootState) => state.cars.currentItem;

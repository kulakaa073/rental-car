import type { RootState } from '../store';

export const selectCars = (state: RootState) => state.cars.items;
export const selectCarById = (state: RootState, carId: string) =>
  state.cars.items.find(item => item.id === carId);
export const selectPagination = (state: RootState) => state.cars.pagination;
export const selectCarBrands = (state: RootState) => state.cars.brands;
export const isValidBrand = (state: RootState, brand: string) => {
  return state.cars.brands.includes(brand);
};

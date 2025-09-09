import type { RootState } from '../store';

export const selectCars = (state: RootState) => state.cars.items;

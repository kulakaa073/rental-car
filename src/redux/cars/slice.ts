import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Car } from '../../types/car';
import {
  fetchCarById,
  fetchCars,
  fetchCarBrands,
  type CarsResponseRaw,
} from './operations';
import type { Pagination } from '../../types';

interface CarsState {
  items: Array<Car>;
  pagination: Pagination;
  brands: Array<string>;
  isLoading: boolean;
  error: string;
}

const initialState: CarsState = {
  items: [],
  pagination: {
    page: 1,
    totalCars: 0,
    totalPages: 0,
    limit: 8,
  },
  brands: [],
  isLoading: false,
  error: '',
};

const handlePending = (state: CarsState) => {
  state.isLoading = true;
  state.error = '';
};

const handleRejected = (
  state: CarsState,
  action: PayloadAction<string | undefined>
) => {
  state.isLoading = false;
  state.error = action.payload ?? 'Unknown error';
};

const slice = createSlice({
  name: 'cars',
  initialState: initialState,
  reducers: {
    incrementPage: (state: CarsState) => {
      state.pagination.page += 1;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCars.pending, handlePending)
      .addCase(
        fetchCars.fulfilled,
        (state, action: PayloadAction<CarsResponseRaw>) => {
          const { cars, ...pagination } = action.payload;
          const page = parseInt(pagination.page);
          if (page != state.pagination.page) {
            state.pagination = {
              ...state.pagination,
              ...pagination,
              page: page,
            };
          }

          if (page === 1) {
            state.items = cars;
          } else {
            state.items.push(...cars);
          }
          state.isLoading = false;
          state.error = '';
        }
      )
      .addCase(fetchCars.rejected, handleRejected)
      .addCase(fetchCarById.pending, handlePending)
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.isLoading = false;
        state.error = '';
      })
      .addCase(fetchCarById.rejected, handleRejected)
      .addCase(fetchCarBrands.pending, handlePending)
      .addCase(fetchCarBrands.fulfilled, (state, action) => {
        state.brands.push(...action.payload);
        state.isLoading = false;
        state.error = '';
      })
      .addCase(fetchCarBrands.rejected, handleRejected);
  },
});

export const carsReducer = slice.reducer;
export const { incrementPage } = slice.actions;

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Car } from '../../types/car';
import {
  fetchCarById,
  fetchCars,
  fetchCarBrands,
  type CarsResponseRaw,
} from './operations';
import type { Pagination } from '../../types';
import { clearFilters, setFilter } from '../filters/slice';

interface CarsState {
  items: Array<Car>;
  currentItem?: Car | undefined;
  pagination: Pagination;
  brands: Array<string>;
  isLoading: boolean;
  error: string;
  fetched: boolean;
}

const initialState: CarsState = {
  items: [],
  currentItem: undefined,
  pagination: {
    page: 1,
    totalCars: 0,
    totalPages: 0,
    limit: 8,
  },
  brands: [],
  isLoading: false,
  error: '',
  fetched: false,
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
    setPage: (state, action) => {
      if (state.pagination.page !== action.payload) {
        state.pagination.page = action.payload;
      }
      state.fetched = false;
    },
    resetFetched: state => {
      state.fetched = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCars.pending, handlePending)
      .addCase(
        fetchCars.fulfilled,
        (state, action: PayloadAction<CarsResponseRaw>) => {
          const { cars, ...pagination } = action.payload;
          const page = Number(pagination.page);

          const newPagination = {
            ...state.pagination,
            ...pagination,
            page,
          };

          if (
            newPagination.page !== state.pagination.page ||
            newPagination.totalPages !== state.pagination.totalPages ||
            newPagination.totalCars !== state.pagination.totalCars ||
            newPagination.limit !== state.pagination.limit
          ) {
            state.pagination = newPagination;
          }

          if (page === 1) {
            state.items = cars;
          } else {
            state.items.push(...cars);
          }
          state.isLoading = false;
          state.error = '';
          state.fetched = true;
        }
      )
      .addCase(fetchCars.rejected, handleRejected)
      .addCase(fetchCarById.pending, handlePending)
      .addCase(fetchCarById.fulfilled, (state, action: PayloadAction<Car>) => {
        state.currentItem = action.payload;
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
      .addCase(fetchCarBrands.rejected, handleRejected)
      .addCase(setFilter, state => {
        state.pagination.page = 1;
        state.fetched = false;
      })
      .addCase(clearFilters, state => {
        state.pagination = { ...initialState.pagination };
        state.fetched = false;
      });
  },
});

export const carsReducer = slice.reducer;
export const { setPage, resetFetched } = slice.actions;

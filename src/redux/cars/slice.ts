import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Car } from '../../types/car';
import { fetchCarById, fetchCars } from './operations';

interface CarsState {
  items: Array<Car>;
  page: number;
  totalCars: number;
  totalPages: number;
  limit: number;
  isLoading: boolean;
  error: string;
}

const initialState: CarsState = {
  items: [],
  page: 1,
  totalCars: 0,
  totalPages: 0,
  limit: 12,
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
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCars.pending, handlePending)
      .addCase(fetchCars.fulfilled, (state, action) => {
        // TODO: account for actual response schema: cars[], pagination
        // TODO: add state clearing
        state.items.push(...action.payload);
      })
      .addCase(fetchCars.rejected, handleRejected)
      .addCase(fetchCarById.pending, handlePending)
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(fetchCarById.rejected, handleRejected);
  },
});

export const carsReducer = slice.reducer;

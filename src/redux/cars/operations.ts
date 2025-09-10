import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Car } from '../../types/car';

import api from '../../utils/axios';
import type { Pagination } from '../../types';
import type { RootState } from '../store';

export interface CarsResponseRaw extends Omit<Pagination, 'page'> {
  cars: Array<Car>;
  page: string;
}

export const fetchCars = createAsyncThunk<
  CarsResponseRaw,
  void,
  { rejectValue: string }
>('cars/fetchCars', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const filters = state.filters;
    const { page, limit } = state.cars.pagination;
    const response = await api.get<CarsResponseRaw>('cars', {
      params: { filters, page, limit },
    });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue(String(error));
  }
});

export const fetchCarById = createAsyncThunk<
  Car,
  Car['id'],
  { rejectValue: string }
>('cars/fetchCarById', async (carId, thunkAPI) => {
  try {
    const response = await api.get<Car>(`cars/${carId}`);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue(String(error));
  }
});

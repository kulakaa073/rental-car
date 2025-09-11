import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Car } from '../../types/car';

import api from '../../utils/axios';
import type { Pagination } from '../../types';
import type { FiltersState } from '../filters/slice';

export interface CarsResponseRaw extends Omit<Pagination, 'page'> {
  cars: Array<Car>;
  page: string;
}

export const fetchCars = createAsyncThunk<
  CarsResponseRaw,
  FiltersState & { page: string; limit: string },
  { rejectValue: string }
>('cars/fetchCars', async (params, thunkAPI) => {
  try {
    const response = await api.get<CarsResponseRaw>('cars', {
      params: params,
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

export const fetchCarBrands = createAsyncThunk<
  Array<string>,
  void,
  { rejectValue: string }
>('cars/fetchCarBrands', async (_, thunkAPI) => {
  try {
    const response = await api.get<Array<string>>('brands');
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue(String(error));
  }
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Car } from '../../types/car';

import axios from 'axios';
import api from '../../utils/axios';

axios.defaults.baseURL = 'https://car-rental-api.goit.global/';

export const fetchCars = createAsyncThunk<
  Array<Car>,
  void,
  { rejectValue: string }
>('cars/fetchCars', async (_, thunkAPI) => {
  try {
    const response = await api.get<Array<Car>>('cars');
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

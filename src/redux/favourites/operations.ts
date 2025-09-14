import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axios';
import type { Car } from '../../types/car';

export const refreshFavourites = createAsyncThunk<
  Car[],
  string[],
  { rejectValue: string }
>('favourites/refresh', async (ids, thunkAPI) => {
  try {
    const responses = await Promise.all(
      ids.map(id => api.get<Car>(`cars/${id}`))
    );
    console.log('fav thunk | responses: ', responses);
    return responses;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue(String(error));
  }
});

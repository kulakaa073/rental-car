import { createSlice } from '@reduxjs/toolkit';
import type { Brands } from '../../types/brands';
import { merge } from 'lodash';

interface FiltersState {
  brand: Brands | '';
  price: number;
  mileage: {
    from: number;
    to: number;
  };
}

const initialState: FiltersState = {
  brand: '',
  price: 0,
  mileage: { from: 0, to: 0 },
};

const slice = createSlice({
  name: 'filters',
  initialState: initialState,
  reducers: {
    setFilter: (state, action) => {
      return merge({}, state, action.payload);
    },
    clearFilters: () => initialState,
  },
});

export const flitersReducer = slice.reducer;

export const { setFilter, clearFilters } = slice.actions;

import { createSlice } from '@reduxjs/toolkit';
import type { Brands } from '../../types/brands';
import { merge } from 'lodash';

export type FilterFieldName = 'brand' | 'price' | 'mileage.from' | 'mileage.to';

export interface FiltersState {
  brand: Brands | '';
  price: string;
  mileage: {
    from: string;
    to: string;
  };
}

const initialState: FiltersState = {
  brand: '',
  price: '',
  mileage: { from: '', to: '' },
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

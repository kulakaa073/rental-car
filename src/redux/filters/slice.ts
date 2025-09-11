import { createSlice } from '@reduxjs/toolkit';
import { merge } from 'lodash';

export type FilterFieldName =
  | 'brand'
  | 'rentalPrice'
  | 'minMileage'
  | 'maxMileage';

export interface FiltersState {
  brand: string;
  rentalPrice: string;
  minMileage: string;
  maxMileage: string;
}

const initialState: FiltersState = {
  brand: '',
  rentalPrice: '',
  minMileage: '',
  maxMileage: '',
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

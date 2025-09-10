import { createSlice } from '@reduxjs/toolkit';
import type { Car } from '../../types/car';

interface FavouritesState {
  items: Array<Car>;
}

const initialState: FavouritesState = { items: [] };

const slice = createSlice({
  name: 'favourites',
  initialState: initialState,
  reducers: {
    addFavourite: (state, action) => {
      // think about a limit, otherwise it can get silly
      state.items.push(action.payload);
    },
    removeFavourite: (state, action) => {
      state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const favouritesReducer = slice.reducer;
export const { addFavourite, removeFavourite } = slice.actions;

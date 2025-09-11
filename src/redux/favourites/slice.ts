import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Car } from '../../types/car';
import { refreshFavourites } from './operations';

interface FavouritesState {
  ids: Array<string>;
  items: Record<string, Car>;
}

const initialState: FavouritesState = { ids: [], items: {} };

const slice = createSlice({
  name: 'favourites',
  initialState: initialState,
  reducers: {
    toggleFavourite: (state, action: PayloadAction<Car>) => {
      const car = action.payload;
      if (!state.ids.includes(car.id)) {
        state.ids.push(car.id);
        state.items[car.id] = car;
      } else {
        state.ids = state.ids.filter(favId => favId !== car.id);
        delete state.items[car.id];
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(refreshFavourites.fulfilled, (state, action) => {
      action.payload.forEach(car => {
        state.items[car.id] = car;
      });
    });
  },
});

export const favouritesReducer = slice.reducer;
export const { toggleFavourite } = slice.actions;

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Car } from '../../types/car';
import { refreshFavourites } from './operations';

interface FavouritesState {
  ids: Array<string>;
  items: Record<string, Car>;
  isLoading: boolean;
}

const initialState: FavouritesState = { ids: [], items: {}, isLoading: false };

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
    builder
      .addCase(refreshFavourites.pending, (state: FavouritesState) => {
        state.isLoading = true;
      })
      .addCase(
        refreshFavourites.fulfilled,
        (state: FavouritesState, action) => {
          action.payload.forEach(car => {
            state.items[car.id] = car;
          });
          state.isLoading = false;
        }
      )
      .addCase(refreshFavourites.rejected, (state: FavouritesState) => {
        state.isLoading = false;
      });
  },
});

export const favouritesReducer = slice.reducer;
export const { toggleFavourite } = slice.actions;

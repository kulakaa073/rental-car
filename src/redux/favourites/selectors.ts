import type { RootState } from '../store';

export const selectFavourites = (state: RootState) => state.favourites.items;
export const selectNumberOfFavourites = (state: RootState) =>
  state.favourites.items.length;

import type { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';

export const selectFavouritesItems = (state: RootState) =>
  state.favourites.items;

export const selectIsFavourites = (state: RootState) =>
  state.favourites.ids.length === 0 ? false : true;

export const selectFavouritesToRefresh = (state: RootState) => {
  return state.favourites.ids.filter(id => {
    const fav = state.favourites.items[id];
    if (!fav) return true;
    return false;
  });
};

export const selectFavouritesIdSet = createSelector(
  (state: RootState) => state.favourites.ids,
  favourites => new Set(favourites)
);

export const selectIsFavouritesLoading = (state: RootState) =>
  state.favourites.isLoading;

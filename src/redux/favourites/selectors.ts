import type { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';

export const selectFavouritesItems = (state: RootState) =>
  state.favourites.items;

export const selectIsFavourites = (state: RootState) =>
  state.favourites.ids.length === 0 ? false : true;

export const selectFavouritesToRefresh = createSelector(
  (state: RootState) => state.favourites.ids,
  (state: RootState) => state.favourites.items,
  (ids, items) => ids.filter(id => !items[id])
);

export const selectFavouritesIdSet = createSelector(
  (state: RootState) => state.favourites.ids,
  favourites => new Set(favourites)
);

export const selectIsFavouritesLoading = (state: RootState) =>
  state.favourites.isLoading;

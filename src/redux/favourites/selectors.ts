import type { RootState } from '../store';

export const selectFavourites = (state: RootState) => state.favourites.items;

export const selectFavouritesToRefresh = (state: RootState) => {
  return state.favourites.ids.filter(id => {
    const fav = state.favourites.items[id];
    if (!fav) return true;
    return false;
  });
};

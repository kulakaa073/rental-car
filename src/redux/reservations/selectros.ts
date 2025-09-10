import type { RootState } from '../store';

export const selectReservations = (state: RootState) =>
  state.reservations.items;

export const selectIsReservations = (state: RootState) =>
  Object.keys(state.reservations.items).length === 0 ? false : true;

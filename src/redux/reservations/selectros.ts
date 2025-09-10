import type { RootState } from '../store';

export const selectReservations = (state: RootState) =>
  state.reservations.items;

export const selectIsReservations = (state: RootState) =>
  state.reservations.items ? true : false;

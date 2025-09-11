import type { ReservationData } from '../../types/reservationData';
import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ReservationsState {
  items: Array<ReservationData>;
}

const initialState: ReservationsState = {
  items: [],
};

const slice = createSlice({
  name: 'reservations',
  initialState: initialState,
  reducers: {
    addReservation: (state, action: PayloadAction<ReservationData>) => {
      state.items.push({
        ...action.payload,
        reservationDate: action.payload.reservationDate ?? null,
        id: nanoid(),
      });
    },
  },
});

export const reservationsReducer = slice.reducer;
export const { addReservation } = slice.actions;

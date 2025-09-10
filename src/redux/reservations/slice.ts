import type { ReservationData } from '../../types/reservationData';
import type { Car } from '../../types/car';
import { createSlice } from '@reduxjs/toolkit';

interface ReservationsState {
  items: Record<Car['id'], { data: ReservationData; createdAt: number }>;
}

const initialState: ReservationsState = {
  items: {},
};

const slice = createSlice({
  name: 'reservations',
  initialState: initialState,
  reducers: {
    addReservation: (state, action) => {
      const { carId, ...reservadionData } = action.payload;
      state.items[carId] = { data: reservadionData, createdAt: Date.now() };
    },
  },
});

export const reservationsReducer = slice.reducer;
export const { addReservation } = slice.actions;

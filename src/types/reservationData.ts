export interface ReservationData {
  id?: string;
  name: string;
  email: string;
  reservationDateFrom: string | null;
  reservationDateTo: string | null;
  comment: string;
  carId: string;
}

import { useSelector, useDispatch } from 'react-redux';
import { selectCarById, selectIsCarsLoading } from '../../redux/cars/selectors';
import { useParams } from 'react-router';
import { fetchCarById } from '../../redux/cars/operations';
import { useEffect } from 'react';
import type { RootState, AppDispatch } from '../../redux/store';
import { addReservation } from '../../redux/reservations/slice';
import {
  ReservationForm,
  type ReservationFormValues,
} from '../../components/ReservationForm/ReservationForm';

export const CarDetailPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { carId } = useParams();
  const carData = useSelector((state: RootState) =>
    carId ? selectCarById(state, carId) : undefined
  );
  const isLoading = useSelector(selectIsCarsLoading);

  useEffect(() => {
    if (carId && !carData) {
      dispatch(fetchCarById(carId));
    }
  }, [carId, carData, dispatch]);

  const handleSubmit = (values: ReservationFormValues) => {
    if (!carId) return;

    dispatch(
      addReservation({
        ...values,
        carId,
        reservationDate: values.reservationDate
          ? values.reservationDate.getTime()
          : null,
      })
    );
  };

  if (!carId) {
    return <div>Car ID not found</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!carData) {
    return <div>Car not found</div>;
  }

  return (
    <>
      <ReservationForm onSubmit={handleSubmit} />
    </>
  );
};

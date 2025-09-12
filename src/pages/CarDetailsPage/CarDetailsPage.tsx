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
import { shapeAddress } from '../../utils/shapeAddress';
import { formatBigNumbers } from '../../utils/formatBigNumbers';

export const CarDetailPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { carId } = useParams();
  const carData = useSelector((state: RootState) =>
    carId ? selectCarById(state, carId) : undefined
  );
  const isLoading = useSelector(selectIsCarsLoading);
  const { city, country } = carData
    ? shapeAddress(carData.address)
    : { city: undefined, country: undefined };

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
    <div className="px-30 pt-21 pb-31 w-ds flex items-center justify-center mr-auto ml-auto">
      <div className="border">
        <img
          src={carData.img}
          alt={carData.model}
          className="rounded-2xl h-67 w-full object-cover"
        />
        <ReservationForm onSubmit={handleSubmit} />
      </div>
      <div className="border">
        <div className="border">
          <div>
            <h2>{`${carData.brand} ${carData.model}, ${carData.year}`}</h2>
            <span>{`id: ${carData.id}`}</span>
          </div>
          <div>
            <p>{`${city}, ${country}`}</p>
            <p>{`Mileage: ${formatBigNumbers(carData.mileage, ' ')}`}</p>
          </div>
          <p>{`$${carData.rentalPrice}`}</p>
          <p>{carData.description}</p>
        </div>
        <div className="border">
          <div>
            <p>Rental Conditions: </p>
            <ul>
              {carData.rentalConditions.map(item => (
                <li>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p>Car Specifications:</p>
            <ul>
              <li>
                <p>{`Year: ${carData.year}`}</p>
              </li>
              <li>
                <p>{`Type: ${carData.type}`}</p>
              </li>
              <li>
                <p>{`Fuel Consumption: ${carData.fuelConsumption}`}</p>
              </li>
              <li>
                <p>{`Engine Size: ${carData.engineSize}`}</p>
              </li>
            </ul>
          </div>
          <div>
            <p>Accessories and functionalities:</p>
            <ul>
              {carData.functionalities.map(item => (
                <li>{item}</li>
              ))}
              {carData.accessories.map(item => (
                <li>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

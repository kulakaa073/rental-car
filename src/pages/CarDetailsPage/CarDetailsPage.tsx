import { useSelector, useDispatch } from 'react-redux';
import {
  selectCarById,
  selectCurrentCar,
  selectIsCarsLoading,
} from '../../redux/cars/selectors';
import { useParams } from 'react-router';
import { fetchCarById } from '../../redux/cars/operations';
import { useEffect, useState } from 'react';
import type { RootState, AppDispatch } from '../../redux/store';
import { addReservation } from '../../redux/reservations/slice';
import {
  ReservationForm,
  type ReservationFormValues,
} from '../../components/ReservationForm/ReservationForm';
import { shapeAddress } from '../../utils/shapeAddress';
import { formatBigNumbers } from '../../utils/formatBigNumbers';
import { nanoid } from '@reduxjs/toolkit';
import { GridLoader } from 'react-spinners';
import { Tooltip } from 'react-tooltip';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog/ConfirmDialog';

export const CarDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { carId } = useParams();
  const carData = useSelector((state: RootState) =>
    carId
      ? selectCarById(state, carId)
        ? selectCarById(state, carId)
        : selectCurrentCar(state)
      : undefined
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
      })
    );

    setIsDialogOpen(true);
  };

  if (!carId) {
    return <div>Car ID not found</div>;
  }

  if (isLoading) {
    return <GridLoader />;
  }

  if (!carData) {
    return <div>Car not found</div>;
  }

  return (
    <div className="px-30 pt-21 pb-31 w-ds flex mr-auto ml-auto h-full relative">
      <div className="flex flex-col mr-18 w-160 min-w-160">
        <img
          src={carData.img}
          alt={carData.model}
          className="rounded-3xl h-128 w-full object-cover mb-10"
        />
        <ReservationForm onSubmit={handleSubmit} />
      </div>
      <div className="flex flex-col justify-between h-full max-h-256">
        <div className="mb-8">
          <div className="flex gap-4 items-baseline mb-2 mt-5">
            <h2 className="text-2xl/8 font-semibold">{`${carData.brand} ${carData.model}, ${carData.year}`}</h2>
            <span
              data-tooltip-id="carId"
              data-tooltip-content={carData.id}
              data-tooltip-variant="light"
              className="cursor-pointer text-gray-400"
            >{`id: ${carData.id.substring(0, 6)}...`}</span>
            <Tooltip
              id="carId"
              className="bg-white border rounded-2xl border-primary p-3"
            />
          </div>
          <div className="flex items-center mb-4">
            <svg className="h-4 w-4 fill-gray-900 mr-1">
              <use href="/icons.svg#icon-location" />
            </svg>
            <p className="mr-4 font-medium">{`${city}, ${country}`}</p>
            <p className="font-medium">{`Mileage: ${formatBigNumbers(
              carData.mileage,
              ' '
            )} km`}</p>
          </div>
          <p className="text-2xl/8 font-semibold text-primary mb-8">{`$${carData.rentalPrice}`}</p>
          <p className="font-medium">{carData.description}</p>
        </div>

        <div>
          <p className="text-xl/6 font-semibold mb-5">Rental Conditions: </p>
          <ul className="flex flex-col gap-4">
            {carData.rentalConditions.map(item => (
              <li key={nanoid()} className="flex items-center font-medium">
                <svg className="h-4 w-4 fill-gray-900 mr-2">
                  <use href="/icons.svg#icon-checkmark" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xl/6 font-semibold mb-5">Car Specifications:</p>
          <ul className="flex flex-col gap-4">
            <li key={nanoid()} className="flex items-center font-medium">
              <svg className="h-4 w-4 fill-gray-900 mr-2">
                <use href="/icons.svg#icon-calendar" />
              </svg>
              <p>{`Year: ${carData.year}`}</p>
            </li>
            <li key={nanoid()} className="flex items-center font-medium">
              <svg className="h-4 w-4 fill-gray-900 mr-2">
                <use href="/icons.svg#icon-car" />
              </svg>
              <p>{`Type: ${carData.type}`}</p>
            </li>
            <li key={nanoid()} className="flex items-center font-medium">
              <svg className="h-4 w-4 fill-gray-900 mr-2">
                <use href="/icons.svg#icon-gasstation" />
              </svg>
              <p>{`Fuel Consumption: ${carData.fuelConsumption}`}</p>
            </li>
            <li key={nanoid()} className="flex items-center font-medium">
              <svg className="h-4 w-4 fill-gray-900 mr-2">
                <use href="/icons.svg#icon-gear" />
              </svg>
              <p>{`Engine Size: ${carData.engineSize}`}</p>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xl/6 font-semibold mb-5">
            Accessories and functionalities:
          </p>
          <ul className="flex flex-col gap-4">
            {carData.functionalities.map(item => (
              <li key={nanoid()} className="flex items-center font-medium">
                <svg className="h-4 w-4 fill-gray-900 mr-2">
                  <use href="/icons.svg#icon-checkmark" />
                </svg>
                {item}
              </li>
            ))}
            {carData.accessories.map(item => (
              <li key={nanoid()} className="flex items-center font-medium">
                <svg className="h-4 w-4 fill-gray-900 mr-2">
                  <use href="/icons.svg#icon-checkmark" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default CarDetailsPage;

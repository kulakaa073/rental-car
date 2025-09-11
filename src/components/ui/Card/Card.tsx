import type { Car } from '../../../types/car';
import { Button } from '../Button/Button';

interface CardProps {
  item: Car;
}

export const Card = ({ item }: CardProps) => {
  return (
    <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
      <img
        src={item.img}
        alt={item.model}
        className="h-48 w-full object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-900">
          {item.model + item.year}
        </h3>
        <h3>{item.rentalPrice}</h3>
        <p>{item.address}</p>
        <p className="text-gray-400 text-sm">
          {/*parsed adress to city+country*/}
          {item.rentalCompany}
        </p>
        <p className="mt-2 font-bold text-gray-900">{item.type}</p>
        <p>{item.mileage}</p>
        <div className="mt-auto pt-4">
          <Button variant="primary" className="w-full">
            Read more
          </Button>
        </div>
      </div>
    </div>
  );
};

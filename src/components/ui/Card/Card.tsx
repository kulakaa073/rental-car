import type { Car } from '../../../types/car';
import { formatBigNumbers } from '../../../utils/formatBigNumbers';
import { shapeAddress } from '../../../utils/shapeAddress';
import { Button } from '../Button/Button';
import { FavouriteButton } from '../FavouriteButton/FavouriteButton';
import { memo } from 'react';

interface CardProps {
  item: Car & { isFavourite: boolean };
  onFavouriteToggle?: () => void;
  onReadMore?: () => void;
  className?: string;
}

export const Card = memo(
  ({ item, onFavouriteToggle, onReadMore, className }: CardProps) => {
    const { city, country } = shapeAddress(item.address);
    return (
      <div className={className}>
        <div className="overflow-hidden flex flex-col relative">
          {onFavouriteToggle && (
            <FavouriteButton
              isFavourite={item.isFavourite}
              onToggle={onFavouriteToggle}
              className="absolute top-4 right-4"
            />
          )}
          <img
            src={item.img}
            alt={item.model}
            className="rounded-2xl h-67 w-full object-cover"
          />
          <div className="flex flex-col justify-between h-39">
            <div className="pr-3 pt-4">
              <div className="flex justify-between mb-2">
                <h3 className="font-medium text-gray-900">
                  {`${item.brand} `}
                  <span className="text-primary">{item.model}</span>
                  {`, ${item.year}`}
                </h3>
                <p className="font-medium text-gray-900">{`$${item.rentalPrice}`}</p>
              </div>
              <p className="text-gray-400-2 text-xs/4 mb-1">
                <span className="pr-1.5 border-r-1 border-r-gray-300">
                  {city}
                </span>
                <span className="px-1.5 border-r-1 border-r-gray-300">
                  {country}
                </span>
                <span className="pl-1.5">{item.rentalCompany}</span>
              </p>
              <p className="text-gray-400-2 text-xs/4">
                <span className="pr-1.5 border-r-1 border-r-gray-300">
                  {item.type}
                </span>
                <span className="px-1.5">
                  {`${formatBigNumbers(item.mileage, ' ')} km`}
                </span>
              </p>
            </div>
            {onReadMore && (
              <Button variant="primary" className="w-full" onClick={onReadMore}>
                Read more
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

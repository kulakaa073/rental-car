import type { Car } from '../../types/car';
import { Card } from '../ui/Card/Card';

interface CarListProps {
  items: Array<Car & { isFavourite: boolean }>;
  onReadMore?: (id: string) => void;
  onFavouriteToggle?: (item: Car) => void;
}

export const CarList = ({
  items,
  onReadMore,
  onFavouriteToggle,
}: CarListProps) => {
  return (
    <div>
      {items.map(item => (
        <Card
          item={item}
          onReadMore={onReadMore ? () => onReadMore(item.id) : undefined}
          onFavouriteToggle={
            onFavouriteToggle ? () => onFavouriteToggle(item) : undefined
          }
        />
      ))}
    </div>
  );
};

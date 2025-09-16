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
    <div className="mb-20">
      <ul className="grid grid-cols-4 gap-x-8 gap-y-12">
        {items.map(item => (
          <li key={item.id}>
            <Card
              item={item}
              onReadMore={onReadMore ? () => onReadMore(item.id) : undefined}
              onFavouriteToggle={
                onFavouriteToggle ? () => onFavouriteToggle(item) : undefined
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

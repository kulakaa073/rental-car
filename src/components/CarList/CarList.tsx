import type { Car } from '../../types/car';
import { Card } from '../ui/Card/Card';

interface CarListProps {
  items: Array<Car>;
}

export const CarList = ({ items }: CarListProps) => {
  return (
    <div>
      {items.map(item => (
        <Card item={item} />
      ))}
    </div>
  );
};

import type { ReservationData } from '../../../types/reservationData';
import { Button } from '../Button/Button';

interface ReservationCardProps {
  item: ReservationData;
  onReadMore?: () => void;
  className?: string;
}

export const ReservationCard = ({
  item,
  onReadMore,
  className,
}: ReservationCardProps) => {
  return (
    <div className={className}>
      <div className="p-4 flex flex-col flex-grow">
        <h1>{item.name}</h1>
        {onReadMore && (
          <Button variant="primary" className="w-full" onClick={onReadMore}>
            Read more
          </Button>
        )}
      </div>
    </div>
  );
};

import type { ReservationData } from '../../../types/reservationData';
import { Button } from '../Button/Button';

interface ReservationCardProps {
  item: ReservationData;
  onReadMore?: (id: string) => void;
  className?: string;
}

export const ReservationCard = ({
  item,
  onReadMore,
  className,
}: ReservationCardProps) => {
  const dates: { from: string; to: string } = { from: '', to: '' };
  if (item.reservationDateFrom) {
    dates.from = new Date(item.reservationDateFrom).toDateString();
  }
  if (item.reservationDateTo) {
    dates.to = new Date(item.reservationDateTo).toDateString();
  }
  return (
    <>
      <td className={className}>{item.name}</td>
      <td className={className}>{item.email}</td>
      <td className={className}>{`${
        dates ? `${dates.from} to ${dates.to}` : '-'
      } `}</td>
      <td className={className}>{item.comment}</td>
      <td className={className}>{item.carId}</td>
      <td className={className}>
        {onReadMore && (
          <Button
            variant="primary"
            className="w-full"
            onClick={() => onReadMore(item.carId)}
          >
            Read more
          </Button>
        )}
      </td>
    </>
  );
};

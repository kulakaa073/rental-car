import { useSelector } from 'react-redux';
import { selectReservations } from '../../redux/reservations/selectros';
import { ReservationCard } from '../../components/ui/Card/ReservationCard';
import { nanoid } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router';

export const ReservationsPage = () => {
  const navigate = useNavigate();
  const reservationData = useSelector(selectReservations);
  const tableHeadClassName = 'p-2 bg-primary text-xl font-semibold text-white';
  const tableRowClassName = 'p-2 border-b border-gray-400 bg-white';
  return (
    <>
      <table className="w-full text-left table-auto min-w-max">
        <thead>
          <tr>
            <th className={tableHeadClassName}>Name</th>
            <th className={tableHeadClassName}>Email</th>
            <th className={tableHeadClassName}>Date</th>
            <th className={tableHeadClassName}>Comment</th>
            <th className={tableHeadClassName}>Car Id</th>
            <th className={tableHeadClassName}></th>
          </tr>
        </thead>
        <tbody>
          {reservationData.map(reservation => (
            <tr key={nanoid()}>
              <ReservationCard
                item={reservation}
                onReadMore={id => navigate(`/catalog/${id}`)}
                className={tableRowClassName}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

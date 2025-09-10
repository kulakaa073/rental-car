import { useSelector } from 'react-redux';
import { NavLink } from 'react-router';
import { selectIsFavourites } from '../../redux/favourites/selectors';
import { selectIsReservations } from '../../redux/reservations/selectros';

export const Header = () => {
  const isFavourites = useSelector(selectIsFavourites);
  const isReservations = useSelector(selectIsReservations);
  return (
    <header>
      <NavLink to="/">Logo</NavLink>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/catalog">Catalog</NavLink>
        {isFavourites && <NavLink to="/catalog/favourites">Favourites</NavLink>}
        {isReservations && <NavLink to="/reservations">Reservations</NavLink>}
      </div>
    </header>
  );
};

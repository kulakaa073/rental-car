import { useSelector } from 'react-redux';
import { NavLink } from 'react-router';
import { selectIsFavourites } from '../../redux/favourites/selectors';
import { selectIsReservations } from '../../redux/reservations/selectros';
import clsx from 'clsx';
import type { NavLinkRenderProps } from 'react-router';

export const Header = () => {
  const isFavourites = useSelector(selectIsFavourites);
  const isReservations = useSelector(selectIsReservations);

  const getActiveLinkClass = ({ isActive }: NavLinkRenderProps) =>
    clsx(
      isActive && 'text-primary-dark',
      'font-medium transition-colors duration-200',
      'hover:text-primary active:opacity-80'
    );

  return (
    <header className="w-full bg-gray-200 border-b border-gray-200 sticky top-0">
      <div className="w-ds mx-auto py-6 px-30 flex justify-between">
        <NavLink to="/">
          <svg className="w-26 h-4">
            <use href="/icons.svg#logo" />
          </svg>
        </NavLink>
        <div className="flex space-x-8">
          <NavLink to="/" className={getActiveLinkClass}>
            Home
          </NavLink>
          <NavLink to="/catalog" className={getActiveLinkClass}>
            Catalog
          </NavLink>
          {isFavourites && (
            <NavLink to="/catalog/favourites" className={getActiveLinkClass}>
              Favourites
            </NavLink>
          )}
          {isReservations && (
            <NavLink to="/reservations" className={getActiveLinkClass}>
              Reservations
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

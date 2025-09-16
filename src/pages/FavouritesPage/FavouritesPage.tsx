import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  selectFavouritesItems,
  selectFavouritesToRefresh,
  selectIsFavouritesLoading,
} from '../../redux/favourites/selectors';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import { useEffect } from 'react';
import { refreshFavourites } from '../../redux/favourites/operations';
import { toggleFavourite } from '../../redux/favourites/slice';
import { CarList } from '../../components/CarList/CarList';
import { Loader } from '../../components/ui/Loader/Loader';

export const FavouritesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const favourites = useSelector(selectFavouritesItems);
  const cars = Object.values(favourites).map(car => {
    return {
      ...car,
      isFavourite: true,
    };
  });
  const isLoading = useSelector(selectIsFavouritesLoading);
  const missingFavIds = useSelector(selectFavouritesToRefresh);

  useEffect(() => {
    dispatch(refreshFavourites(missingFavIds));
  }, [dispatch, missingFavIds]);

  return (
    <div className="px-30 pt-21 pb-31 w-ds flex items-center flex-col mr-auto ml-auto">
      {cars.length > 0 && !isLoading && (
        <CarList
          items={cars}
          onReadMore={id => navigate(`/catalog/${id}`)}
          onFavouriteToggle={item => dispatch(toggleFavourite(item))}
        />
      )}
      {isLoading && (
        <div className="min-h-screen flex items-center justify-center">
          <Loader isLoading={true} />
        </div>
      )}
    </div>
  );
};

export default FavouritesPage;

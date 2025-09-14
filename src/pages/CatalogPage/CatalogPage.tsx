import { useEffect, memo } from 'react';
import { Filters } from '../../components/Filters/Filters';
import { useDispatch } from 'react-redux';
import { fetchCarBrands, fetchCars } from '../../redux/cars/operations';
import type { AppDispatch } from '../../redux/store';
import { CarList } from '../../components/CarList/CarList';
import { useSelector } from 'react-redux';
import {
  selectCarsWithFavourite,
  selectIsCarsLoading,
  selectIsFetched,
  selectPage,
  selectPagination,
} from '../../redux/cars/selectors';
import { selectFilters } from '../../redux/filters/selectors';
import { useNavigate } from 'react-router';
import { toggleFavourite } from '../../redux/favourites/slice';
import { Button } from '../../components/ui/Button/Button';
import { clearFilters } from '../../redux/filters/slice';
import { setPage } from '../../redux/cars/slice';
import { Loader } from '../../components/ui/Loader/Loader';

export const CatalogPage = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const cars = useSelector(selectCarsWithFavourite);
  const isLoading = useSelector(selectIsCarsLoading);
  const filters = useSelector(selectFilters);
  const pagination = useSelector(selectPagination);
  const page = useSelector(selectPage);
  const fetched = useSelector(selectIsFetched);

  useEffect(() => {
    if (cars.length === 0 || !fetched) {
      dispatch(fetchCars({ ...filters, page: page.toString(), limit: '8' }));
    }
  }, [dispatch, filters, page, fetched, cars.length]);

  useEffect(() => {
    dispatch(fetchCarBrands());
  }, [dispatch]);

  const handlePageIncrement = () => {
    dispatch(setPage(page + 1));
  };

  return (
    <div className="px-30 pt-21 pb-31 w-ds flex items-center flex-col mr-auto ml-auto">
      <Filters />
      {cars.length === 0 && (
        <p>
          Sorry, no cars found. Try to{' '}
          <span
            className="underline cursor-pointer"
            onClick={() => dispatch(clearFilters())}
          >
            Reset filters
          </span>
        </p>
      )}
      {cars.length > 0 && (
        <CarList
          items={cars}
          onReadMore={id => navigate(`/catalog/${id}`)}
          onFavouriteToggle={item => dispatch(toggleFavourite(item))}
        />
      )}
      <Loader isLoading={isLoading} />
      {cars.length > 0 && pagination.page < pagination.totalPages && (
        <Button
          variant="outline"
          onClick={handlePageIncrement}
          className="w-39"
        >
          Load More
        </Button>
      )}
    </div>
  );
});

export default CatalogPage;

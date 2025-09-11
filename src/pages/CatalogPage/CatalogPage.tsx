import { useEffect } from 'react';
import { Filters } from '../../components/Filters/Filters';
import { useDispatch } from 'react-redux';
import { fetchCarBrands, fetchCars } from '../../redux/cars/operations';
import type { AppDispatch } from '../../redux/store';
import { CarList } from '../../components/CarList/CarList';
import { useSelector } from 'react-redux';
import {
  selectCarsWithFavourite,
  selectIsCarsLoading,
  selectPagination,
} from '../../redux/cars/selectors';
import { selectFilters } from '../../redux/filters/selectors';
import { useNavigate } from 'react-router';
import { toggleFavourite } from '../../redux/favourites/slice';
import { Button } from '../../components/ui/Button/Button';
import { incrementPage } from '../../redux/cars/slice';

export const CatalogPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const cars = useSelector(selectCarsWithFavourite);
  const isLoading = useSelector(selectIsCarsLoading);
  const filters = useSelector(selectFilters);
  const pagination = useSelector(selectPagination);

  useEffect(() => {
    dispatch(
      fetchCars({
        ...filters,
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      })
    );
  }, [dispatch, filters, pagination]);

  useEffect(() => {
    dispatch(fetchCarBrands());
  }, [dispatch]);

  const handlePageIncrement = () => {
    dispatch(incrementPage());
  };

  return (
    <div className="px-30 pt-21 pb-31">
      <Filters />
      {cars.length > 0 && (
        <CarList
          items={cars}
          onReadMore={id => navigate(`/catalog/${id}`)}
          onFavouriteToggle={item => dispatch(toggleFavourite(item))}
        />
      )}
      {isLoading && <p>Loading cars</p>}
      {cars.length > 0 && pagination.page < pagination.totalPages && (
        <Button onClick={handlePageIncrement}>Load More</Button>
      )}
    </div>
  );
};

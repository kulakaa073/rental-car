import { useEffect } from 'react';
import { Filters } from '../../components/Filters/Filters';
import { useDispatch } from 'react-redux';
import { fetchCarBrands, fetchCars } from '../../redux/cars/operations';
import type { AppDispatch } from '../../redux/store';
import { CarList } from '../../components/CarList/CarList';
import { useSelector } from 'react-redux';
import {
  selectCars,
  selectIsCarsLoading,
  selectPagination,
} from '../../redux/cars/selectors';
import { selectFilters } from '../../redux/filters/selectors';

export const CatalogPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cars = useSelector(selectCars);
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

  return (
    <div className="px-30 pt-21 pb-31">
      <Filters />
      {isLoading && <p>Loading cars</p>}
      {!isLoading && cars.length > 0 && <CarList items={cars} />}
      {cars.length > 0 && pagination.page !== pagination.totalPages && (
        <div>Load More</div>
      )}
    </div>
  );
};

import { useEffect } from 'react';
import { Filters } from '../../components/Filters/Filters';
import { useDispatch } from 'react-redux';
import { fetchCarBrands } from '../../redux/cars/operations';
import type { AppDispatch } from '../../redux/store';

export const CatalogPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchCarBrands());
  }, [dispatch]);

  return (
    <div>
      <Filters />
      <div>Car List</div>
      <div>Load More</div>
    </div>
  );
};

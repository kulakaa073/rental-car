//import { Label } from '@headlessui/react';
import { Dropdown } from '../ui/Dropdown/Dropdown';
import { useSelector } from 'react-redux';
import { selectCarBrands } from '../../redux/cars/selectors';
import { selectFilters } from '../../redux/filters/selectors';
import { useDispatch } from 'react-redux';
import {
  setFilter,
  type FilterFieldName,
  type FiltersState,
} from '../../redux/filters/slice';
import { set } from 'lodash';
import type { DeepPartial } from '../../types';
import { Button } from '../ui/Button/Button';
import {
  generateFilterOptions,
  type FilterOptions,
} from '../../utils/generateFilterOptions';
import { useState } from 'react';

export const Filters = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectCarBrands);
  const committedFilters = useSelector(selectFilters);

  const [filters, setFilters] = useState(committedFilters);
  const [mileageError, setMileageError] = useState('');

  const brandOptions: FilterOptions[] = brands.map(brand => {
    return { value: brand };
  });
  const priceOptions = generateFilterOptions(20, 10, 30);
  const mileageOptions = generateFilterOptions(20, 250);
  const fromOptions = mileageOptions.filter(
    option =>
      !filters.mileage.to || Number(option.value) <= Number(filters.mileage.to)
  );
  const toOptions = mileageOptions.filter(
    option =>
      !filters.mileage.from ||
      Number(option.value) >= Number(filters.mileage.from)
  );

  const handleChange = (name: FilterFieldName, value: string) => {
    setFilters(prev => {
      const update: DeepPartial<FiltersState> = structuredClone(prev);

      // Reset invalid mileage values
      if (
        name === 'mileage.from' &&
        prev.mileage.to &&
        Number(value) > Number(prev.mileage.to)
      ) {
        update.mileage = { ...prev.mileage, from: value, to: '' };
        setMileageError('From cannot be higher than To!');
      } else if (
        name === 'mileage.to' &&
        prev.mileage.from &&
        Number(value) < Number(prev.mileage.from)
      ) {
        update.mileage = { ...prev.mileage, from: '', to: value };
        setMileageError('To cannot be lower than From!');
      } else {
        setMileageError('');
        set(update, name, value);
      }

      return update as FiltersState;
    });
  };

  const handleClick = () => {
    console.log('Filters | Search button clicked!');
    console.log('Filters | Current filters: ', filters);
    dispatch(setFilter(filters));
  };

  return (
    <div>
      <label>
        Car brand
        <Dropdown
          name="brand"
          options={brandOptions}
          value={filters.brand}
          onChange={handleChange}
          placeholder="Choose a brand"
        />
      </label>
      <label>
        Price/ 1 hour
        <Dropdown
          name="price"
          options={priceOptions}
          value={filters.price}
          onChange={handleChange}
          placeholder="Choose a price"
          extra="To $"
        />
      </label>
      <label>
        Car mileage / km
        <Dropdown
          name="mileage.from"
          options={fromOptions}
          value={filters.mileage.from}
          onChange={handleChange}
          placeholder="Choose a price"
          extra="From "
        />
        <Dropdown
          name="mileage.to"
          options={toOptions}
          value={filters.mileage.to}
          onChange={handleChange}
          placeholder="Choose a price"
          extra="To "
        />
        <span>{mileageError}</span>
      </label>
      <Button variant={'secondary'} onClick={handleClick}>
        Search
      </Button>
    </div>
  );
};

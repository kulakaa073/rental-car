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
      !filters.maxMileage || Number(option.value) <= Number(filters.maxMileage)
  );
  const toOptions = mileageOptions.filter(
    option =>
      !filters.minMileage || Number(option.value) >= Number(filters.minMileage)
  );

  console.log('filters component|filters:', filters);

  const handleChange = (name: FilterFieldName, value: string) => {
    setFilters(prev => {
      const update = { ...prev };

      // Reset invalid mileage values
      if (
        name === 'minMileage' &&
        prev.maxMileage &&
        Number(value) > Number(prev.maxMileage)
      ) {
        update.minMileage = '';
        setMileageError('From cannot be higher than To!');
      } else if (
        name === 'maxMileage' &&
        prev.minMileage &&
        Number(value) < Number(prev.minMileage)
      ) {
        update.maxMileage = '';
        setMileageError('To cannot be lower than From!');
      } else {
        setMileageError('');
        set(update, name, value);
      }

      return update as FiltersState;
    });
  };

  const handleClick = () => {
    dispatch(setFilter(filters));
  };

  return (
    <div className="flex gap-16 mb-14 items-end">
      <label className="w-51">
        <span className="block text-xs/4 text-gray-400 mb-2">Car brand</span>
        <Dropdown
          name="brand"
          options={brandOptions}
          value={filters.brand}
          variant="regular"
          onChange={handleChange}
          placeholder="Choose a brand"
        />
      </label>
      <label className="w-49">
        <span className="block text-xs/4 text-gray-400 mb-2">
          Price/ 1 hour
        </span>
        <Dropdown
          name="rentalPrice"
          options={priceOptions}
          value={filters.rentalPrice}
          variant="regular"
          onChange={handleChange}
          placeholder="Choose a price"
          extra="To $"
        />
      </label>
      <label className="w-80">
        <span className="block text-xs/4 text-gray-400 mb-2">
          Car mileage / km
        </span>
        <div className="flex">
          <Dropdown
            name="minMileage"
            options={fromOptions}
            value={filters.minMileage}
            variant="groupLeft"
            onChange={handleChange}
            placeholder="From"
            extra="From "
          />
          <Dropdown
            name="maxMileage"
            options={toOptions}
            value={filters.maxMileage}
            variant="groupRight"
            onChange={handleChange}
            placeholder="To"
            extra="To "
          />
        </div>
        <span>{mileageError}</span>
      </label>
      <Button variant={'primary'} onClick={handleClick} className="w-39">
        Search
      </Button>
    </div>
  );
};

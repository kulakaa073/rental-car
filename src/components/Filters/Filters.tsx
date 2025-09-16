import { Dropdown } from '../ui/Dropdown/Dropdown';
import { useSelector } from 'react-redux';
import { selectCarBrands } from '../../redux/cars/selectors';
import { selectFilters } from '../../redux/filters/selectors';
import { useDispatch } from 'react-redux';
import {
  clearFilters,
  setFilter,
  type FilterFieldName,
} from '../../redux/filters/slice';

import { Button } from '../ui/Button/Button';
import {
  generateFilterOptions,
  type FilterOptions,
} from '../../utils/generateFilterOptions';
import { useState, useEffect, memo, useCallback } from 'react';
import { NumberInput } from '../ui/NumberInput/NumberInput';

export const Filters = memo(() => {
  const dispatch = useDispatch();
  const brands = useSelector(selectCarBrands);
  const committedFilters = useSelector(selectFilters);

  const [filters, setFilters] = useState(committedFilters);

  const brandOptions: FilterOptions[] = brands.map(brand => {
    return { value: brand };
  });
  const priceOptions = generateFilterOptions(20, 10, 30);

  const handleChange = useCallback((name: FilterFieldName, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleClick = () => {
    dispatch(setFilter(filters));
  };

  useEffect(() => {
    setFilters(committedFilters);
  }, [committedFilters]);

  return (
    <div className="m-w-ds w-full flex justify-between mb-14 items-end">
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
          <NumberInput
            name="minMileage"
            value={filters.minMileage}
            onChange={handleChange}
            placeholder="From:"
            maxDigits={5}
            maxValue={Number(filters.maxMileage) || Infinity}
            prefix="From: "
            variant="groupLeft"
            className="placeholder:text-gray-900 focus:placeholder:text-gray-400-2"
          />
          <NumberInput
            name="maxMileage"
            value={filters.maxMileage}
            onChange={handleChange}
            placeholder="To:"
            maxDigits={5}
            minValue={Number(filters.minMileage) || 0}
            prefix="To: "
            variant="groupRight"
            className="placeholder:text-gray-900 focus:placeholder:text-gray-400-2"
          />
        </div>
      </label>
      <Button variant={'primary'} onClick={handleClick} className="w-39">
        Search
      </Button>
      <Button
        variant={'outline'}
        onClick={() => {
          setFilters({
            brand: '',
            rentalPrice: '',
            minMileage: '',
            maxMileage: '',
          });
          dispatch(clearFilters());
        }}
        className="w-39"
      >
        Reset filters
      </Button>
    </div>
  );
});

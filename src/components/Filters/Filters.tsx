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
import { generateFilterOptions } from '../../utils/generateFilterOptions';

export const Filters = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectCarBrands);
  const filters = useSelector(selectFilters);
  let mileageError = '';

  const brandOptions = brands.map((brand, i) => {
    return { value: i, displayValue: brand };
  });

  const priceOptions = generateFilterOptions(20, 10, 30);
  const mileageOptions = generateFilterOptions(20, 250);
  const fromOptions = mileageOptions.filter(
    option => !filters.mileage.to || option.value <= Number(filters.mileage.to)
  );

  const toOptions = mileageOptions.filter(
    option =>
      !filters.mileage.from || option.value >= Number(filters.mileage.from)
  );

  const handleChange = (name: FilterFieldName, value: string) => {
    const update: DeepPartial<FiltersState> = {};
    if (name === 'brand') {
      set(update, name, brandOptions[Number(value)].displayValue);
    } else {
      set(update, name, value);
    }

    // Reset invalid mileage values
    if (
      name === 'mileage.from' &&
      filters.mileage.to &&
      Number(value) > Number(filters.mileage.to)
    ) {
      set(update, 'mileage.to', '');
      mileageError = 'From can not be higher than To!';
    }
    if (
      name === 'mileage.to' &&
      filters.mileage.from &&
      Number(value) < Number(filters.mileage.from)
    ) {
      set(update, 'mileage.from', '');
      mileageError = 'To can not be lower than From!';
    }

    dispatch(setFilter(update));
  };

  const handleClick = () => {
    console.log('Filters | Search button clicked!');
    console.log('Filters | Current filters: ', filters);
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
          extra="From"
        />
        <Dropdown
          name="mileage.to"
          options={toOptions}
          value={filters.mileage.to}
          onChange={handleChange}
          placeholder="Choose a price"
          extra="To"
        />
        <span>{mileageError}</span>
      </label>
      <Button onClick={handleClick}>Search</Button>
    </div>
  );
};

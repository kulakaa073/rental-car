import { Fragment } from 'react';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from '@headlessui/react';
import type { FilterFieldName } from '../../../redux/filters/slice';
import type { FilterOptions } from '../../../utils/generateFilterOptions';

interface DropdownProps {
  name: FilterFieldName;
  options: FilterOptions[];
  value: string;
  onChange: (name: FilterFieldName, val: string) => void;
  placeholder: string;
  extra?: string;
}

export const Dropdown = ({
  name,
  options,
  value,
  onChange,
  placeholder,
  extra,
}: DropdownProps) => {
  return (
    <Listbox value={value} onChange={val => onChange(name, val)}>
      <div className="relative w-48">
        <ListboxButton className="relative w-full cursor-pointer rounded-xl border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-primary">
          <span className={'block truncate  text-gray-900'}>
            {value ? extra + value : placeholder}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <svg className="h-4 w-4 fill-gray-900">
              <use href="src/assets/icons.svg#icon-chevron-down" />
            </svg>
          </span>
        </ListboxButton>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
            {options.map((option, index) => (
              <ListboxOption
                key={index}
                value={option.value}
                className={({ focus, selected }) =>
                  `cursor-pointer select-none py-2 px-4 ${
                    focus
                      ? 'bg-primary text-white'
                      : selected
                      ? 'bg-gray-100 font-medium'
                      : 'text-gray-900'
                  }`
                }
              >
                {option.displayValue}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
};

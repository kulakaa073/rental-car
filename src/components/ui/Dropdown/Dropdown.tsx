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
import clsx from 'clsx';
import { formatBigNumbers } from '../../../utils/formatBigNumbers';

interface DropdownProps {
  name: FilterFieldName;
  options: FilterOptions[];
  value: string;
  variant?: 'regular' | 'groupLeft' | 'groupRight';
  onChange: (name: FilterFieldName, val: string) => void;
  placeholder: string;
  extra?: string;
  className?: string;
}

export const Dropdown = ({
  name,
  options,
  value,
  variant = 'regular',
  onChange,
  placeholder,
  extra,
  className,
}: DropdownProps) => {
  const baseButtonStyles =
    'relative w-full cursor-pointer bg-gray-100 py-3 px-4 text-left focus:outline-none';

  const baseStyles = 'relative bg-gray-100 w-full';
  const variants = {
    regular: 'rounded-xl',
    groupLeft: 'rounded-l-xl border-r border-gray-300',
    groupRight: 'rounded-r-xl',
  };

  const displayValue = Number(value)
    ? formatBigNumbers(Number(value), ' ')
    : value;

  return (
    <Listbox value={value} onChange={val => onChange(name, val)}>
      {({ open }) => (
        <div className={clsx(baseStyles, variants[variant], className)}>
          <ListboxButton
            className={clsx(
              baseButtonStyles,
              variants[variant],
              variant !== 'regular' && 'px-6'
            )}
          >
            <span
              className={'block truncate  text-gray-900 font-medium leading-5'}
            >
              {value ? (extra || '') + displayValue : placeholder}
            </span>
            {variant === 'regular' && (
              <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                <div
                  className={clsx('transition-transform duration-200', {
                    '-scale-100': open,
                  })}
                >
                  <svg className="h-4 w-4 fill-gray-900">
                    <use href="/icons.svg#icon-chevron-down" />
                  </svg>
                </div>
              </span>
            )}
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
              {options.map((option, index) => (
                <ListboxOption
                  key={index}
                  value={option.value}
                  className={({ focus, selected }) =>
                    `cursor-pointer select-none py-2 px-4 ${
                      focus
                        ? 'bg-primary text-white font-medium'
                        : selected
                        ? 'text-gray-900 font-medium'
                        : 'text-gray-400-2 font-medium'
                    }`
                  }
                >
                  {option.displayValue || option.value}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};

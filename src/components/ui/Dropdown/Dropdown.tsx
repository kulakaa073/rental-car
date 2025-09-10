import { Fragment } from 'react';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/solid';

type DropdownProps = {
  options: string[];
  value: string;
  onChange: (val: string) => void;
};

export const Dropdown = ({ options, value, onChange }: DropdownProps) => {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative w-48">
        <ListboxButton className="relative w-full cursor-pointer rounded-xl border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-primary">
          <span className="block truncate">{value}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
          </span>
        </ListboxButton>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
            {options.map((opt, idx) => (
              <ListboxOption
                key={idx}
                value={opt}
                className={({ active }) =>
                  `cursor-pointer select-none py-2 px-4 ${
                    active ? 'bg-primary text-white' : 'text-gray-900'
                  }`
                }
              >
                {opt}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
};

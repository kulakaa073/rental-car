import { formatBigNumbers } from './formatBigNumbers';

export interface FilterOptions {
  value: number | string;
  displayValue?: string;
}

export const generateFilterOptions = (
  length: number = 20,
  mult: number = 1,
  add: number = 0
): FilterOptions[] => {
  return Array.from({ length }, (_, i) => {
    const value = i * mult + add;
    return {
      value,
      displayValue: formatBigNumbers(value, ' '),
    };
  });
};

import { useState, useEffect, useCallback, useRef } from 'react';
import { formatBigNumbers } from '../../../utils/formatBigNumbers';
import type { FilterFieldName } from '../../../redux/filters/slice';
import clsx from 'clsx';

interface NumberInputProps {
  name: FilterFieldName;
  value: string;
  onChange: (name: FilterFieldName, val: string) => void;
  placeholder?: string;
  maxDigits?: number;
  prefix?: string;
  suffix?: string;
  minValue?: number;
  maxValue?: number;
  className?: string;
  variant?: 'regular' | 'groupLeft' | 'groupRight';
}

export const NumberInput = ({
  name,
  value,
  onChange,
  placeholder = 'Enter number',
  maxDigits,
  prefix = '',
  suffix = '',
  minValue,
  maxValue,
  className = '',
  variant = 'regular',
  ...props
}: NumberInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const lastSyncedValue = useRef(value);

  const isMinMax = useCallback(
    (input: string) => {
      const numValue = Number(input);
      if (minValue !== undefined && numValue < minValue) {
        return false;
      }
      if (maxValue !== undefined && numValue > maxValue) {
        return false;
      }

      return true;
    },
    [maxValue, minValue]
  );

  const isValidInput = useCallback(
    (input: string) => {
      if (!input) return true;
      if (!/^\d*$/.test(input)) {
        return false;
      }
      if (maxDigits && input.length > maxDigits) {
        return false;
      }

      return true;
    },
    [maxDigits]
  );

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (isValidInput(newValue)) {
      setInputValue(newValue);
      onChange(name, newValue);
      setError(!isMinMax(newValue));
    }
  };

  useEffect(() => {
    if (value !== lastSyncedValue.current) {
      if (value === '' || !isFocused) {
        setInputValue(value);
        lastSyncedValue.current = value;
      }
    }
  }, [value, isFocused]);

  useEffect(() => {
    if (inputValue && (minValue !== undefined || maxValue !== undefined)) {
      setError(!isMinMax(inputValue));
    }
  }, [minValue, maxValue, inputValue, isMinMax]);

  const displayValue = isFocused
    ? inputValue
    : inputValue
    ? `${prefix}${formatBigNumbers(Number(inputValue), ' ')}${suffix}`
    : '';

  const baseStyles =
    'transition-all border-0 bg-gray-100 w-full bg-gray-100 py-3 px-4 text-left font-medium focus:outline-none';
  const variants = {
    regular: 'rounded-xl',
    groupLeft: 'rounded-l-xl border-r border-gray-300',
    groupRight: 'rounded-r-xl',
  };

  return (
    <div className="w-full">
      <input
        type="text"
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={clsx(
          baseStyles,
          variants[variant],
          className,
          variant !== 'regular' && 'px-6',
          error
            ? 'border-1 border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
            : ''
        )}
        {...props}
      />
    </div>
  );
};

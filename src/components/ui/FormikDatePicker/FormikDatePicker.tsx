import { useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import type { ReservationFormValues } from '../../ReservationForm/ReservationForm';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../styles/datePicker.css';
import { useState } from 'react';

interface FormikDatePickerProps {
  nameFrom: keyof ReservationFormValues;
  nameTo: keyof ReservationFormValues;
  placeholderText?: string;
  minDate?: Date;
  dateFormat?: string;
  className?: string;
}

interface CustomHeaderProps {
  date: Date;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  prevMonthButtonDisabled?: boolean;
  nextMonthButtonDisabled?: boolean;
}

const CustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: CustomHeaderProps) => (
  <div className="flex items-center justify-between">
    <button
      type="button"
      onClick={decreaseMonth}
      disabled={prevMonthButtonDisabled}
      className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
    >
      <svg className="h-4 w-4 fill-primary  rotate-180">
        <use href="/icons.svg#icon-arrow-right" />
      </svg>
    </button>

    <div className="text-lg font-semibold text-gray-800">
      {date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })}
    </div>

    <button
      type="button"
      onClick={increaseMonth}
      disabled={nextMonthButtonDisabled}
      className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg className="h-4 w-4 fill-primary disabled:fill-gray-400-2">
        <use href="/icons.svg#icon-arrow-right" />
      </svg>
    </button>
  </div>
);

export const FormikDatePicker = ({
  nameFrom,
  nameTo,
  ...props
}: FormikDatePickerProps) => {
  const { setFieldValue, values } = useFormikContext<ReservationFormValues>();
  const [startDate, setStartDate] = useState<Date | null>(
    values[nameFrom] ? new Date(values[nameFrom] as string) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    values[nameTo] ? new Date(values[nameTo] as string) : null
  );

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    setFieldValue(nameFrom, start ? start.toISOString() : null);
    setFieldValue(nameTo, end ? end.toISOString() : null);
  };

  return (
    <>
      <DatePicker
        selected={startDate}
        {...props}
        wrapperClassName="block w-full"
        closeOnScroll
        formatWeekDay={day => day.substring(0, 3)}
        renderCustomHeader={CustomHeader}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        rangeSeparator=" to "
      />
    </>
  );
};

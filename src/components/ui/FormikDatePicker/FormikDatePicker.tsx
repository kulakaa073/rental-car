import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import type { ReservationFormValues } from '../../ReservationForm/ReservationForm';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../styles/datePicker.css';

interface FormikDatePickerProps {
  name: string;
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

export const FormikDatePicker = ({ name, ...props }: FormikDatePickerProps) => {
  const { setFieldValue } = useFormikContext<ReservationFormValues>();
  const [field, meta] = useField(name);

  return (
    <>
      <DatePicker
        selected={field.value ? new Date(field.value) : null}
        onChange={(date: Date | null) => setFieldValue(name, date)}
        {...props}
        wrapperClassName="block w-full"
        closeOnScroll={true}
        formatWeekDay={day => day.substring(0, 3)}
        renderCustomHeader={CustomHeader}
      />
      {meta.touched && meta.error ? (
        <span className="text-red-500 text-sm">{meta.error}</span>
      ) : null}
    </>
  );
};

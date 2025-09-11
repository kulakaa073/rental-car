import { useId } from 'react';
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Button } from '../ui/Button/Button';
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ReservationFormProps {
  onSubmit: (values: ReservationFormValues) => void;
}

export interface ReservationFormValues {
  name: string;
  email: string;
  reservationDate: Date | null;
  comment: string;
}

interface FormikDatePickerProps {
  name: string;
  placeholderText?: string;
  minDate?: Date;
  dateFormat?: string;
  className?: string;
}

export const FormikDatePicker = ({ name, ...props }: FormikDatePickerProps) => {
  const { setFieldValue } = useFormikContext<ReservationFormValues>();
  const [field, meta] = useField(name);

  return (
    <div>
      <DatePicker
        selected={field.value ? new Date(field.value) : null}
        onChange={(date: Date | null) => setFieldValue(name, date)}
        {...props}
      />
      {meta.touched && meta.error ? (
        <span className="text-red-500 text-sm">{meta.error}</span>
      ) : null}
    </div>
  );
};

export const ReservationForm = ({ onSubmit }: ReservationFormProps) => {
  const nameFieldId = useId();
  const emailFieldId = useId();
  const commentFieldId = useId();

  const initialValues = {
    name: '',
    email: '',
    reservationDate: null,
    comment: '',
  };

  const handleSubmit = (
    values: ReservationFormValues,
    actions: FormikHelpers<ReservationFormValues>
  ) => {
    onSubmit(values);
    actions.resetForm();
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
      .min(3, 'Name must be at least 3 characters long')
      .max(50, 'Name must be 50 characters or less')
      .required('Required'),
    email: Yup.string()
      .trim()
      .email('Invalid email format')
      .required('Email is required'),
    reservationDate: Yup.date()
      .nullable()
      .min(new Date(), 'Booking date must be today or later'),
    comment: Yup.string()
      .trim()
      .matches(
        /^[a-zA-Z0-9\s,.?!'";:()]+$/,
        'Comment must not have special symbols, only letters, numbers and punctuation'
      ),
  });

  return (
    <div>
      <Formik<ReservationFormValues>
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div>
            <Field
              id={nameFieldId}
              name="name"
              placeholder="Name*"
              className="bg-gray-100"
            />
            <ErrorMessage name="name" component="span" />
          </div>
          <div>
            <Field
              id={emailFieldId}
              name="email"
              placeholder="Email*"
              className="bg-gray-100"
            />
            <ErrorMessage name="email" component="span" />
          </div>
          <div>
            <FormikDatePicker
              name="reservationDate"
              placeholderText="Select reservation date"
              minDate={new Date()}
              dateFormat="yyyy-MM-dd"
              className="bg-gray-100"
            />
            <ErrorMessage name="reservationDate" component="span" />
          </div>
          <div>
            <Field
              id={commentFieldId}
              as="textarea"
              rows={3}
              name="comment"
              placeholder="Comment"
              className="bg-gray-100"
            />
            <ErrorMessage name="comment" component="span" />
          </div>
          <div>
            <Button type="submit">Send</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

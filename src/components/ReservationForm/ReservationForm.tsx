import { useId } from 'react';
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Button } from '../ui/Button/Button';

import { FormikDatePicker } from '../ui/FormikDatePicker/FormikDatePicker';

export interface ReservationFormProps {
  onSubmit: (values: ReservationFormValues) => void;
}

export interface ReservationFormValues {
  name: string;
  email: string;
  reservationDateFrom: string | null;
  reservationDateTo: string | null;
  comment: string;
}

export const ReservationForm = ({ onSubmit }: ReservationFormProps) => {
  const nameFieldId = useId();
  const emailFieldId = useId();
  const commentFieldId = useId();

  const initialValues = {
    name: '',
    email: '',
    reservationDateFrom: null,
    reservationDateTo: null,
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
    reservationDateFrom: Yup.date()
      .nullable()
      .min(new Date(), 'Pick-up date must be today or later')
      .required('Pick-up date is required'),
    reservationDateTo: Yup.date()
      .nullable()
      .min(
        Yup.ref('reservationDateFrom'),
        'Drop-off date must be after pick-up date'
      )
      .required('Drop-off date is required'),
    comment: Yup.string()
      .trim()
      .matches(
        /^[a-zA-Z0-9\s,.?!'";:()]+$/,
        'Comment must not have special symbols, only letters, numbers and punctuation'
      ),
  });

  return (
    <div className="border border-gray-300 rounded-md p-6">
      <div className="mb-6">
        <h3 className="text-xl/6 font-semibold mb-2">Book your car now</h3>
        <p className="font-medium">
          Stay connected! We are always ready to help you.
        </p>
      </div>
      <Formik<ReservationFormValues>
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="flex flex-col gap-4 mb-8">
            <div className="relative">
              <Field
                id={nameFieldId}
                name="name"
                placeholder="Name*"
                className="bg-gray-100 rounded-xl w-full px-5 py-3"
              />
              <ErrorMessage
                name="name"
                component="span"
                className="absolute top-3 right-3 text-red-500"
              />
            </div>
            <div className="relative">
              <Field
                id={emailFieldId}
                name="email"
                placeholder="Email*"
                className="bg-gray-100 rounded-xl w-full px-5 py-3"
              />
              <ErrorMessage
                name="email"
                component="span"
                className="absolute top-3 right-3 text-red-500"
              />
            </div>
            <div className="relative">
              <FormikDatePicker
                nameFrom="reservationDateFrom"
                nameTo="reservationDateTo"
                placeholderText="Pick a rental period"
                minDate={new Date()}
                dateFormat="yyyy-MM-dd"
                className="bg-gray-100 rounded-xl w-full px-5 py-3"
              />
              <ErrorMessage
                name="reservationDateFrom"
                component="span"
                className="absolute top-3 right-3 text-red-500"
              />
              <ErrorMessage
                name="reservationDateTo"
                component="span"
                className="absolute top-3 right-3 text-red-500"
              />
            </div>
            <div className="relative">
              <Field
                id={commentFieldId}
                as="textarea"
                rows={3}
                name="comment"
                placeholder="Comment"
                className="bg-gray-100 rounded-xl w-full px-5 py-3 h-22 resize-none"
              />
              <ErrorMessage
                name="comment"
                component="span"
                className="absolute top-3 right-3 text-red-500"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button type="submit">Send</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

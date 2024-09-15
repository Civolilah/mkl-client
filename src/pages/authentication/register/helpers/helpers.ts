/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { set } from 'lodash';
import * as Yup from 'yup';

import { UserDetails } from '../Register';

export const validateUserDetails = async (useDetails: UserDetails) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'invalid_email'
      )
      .required('email_required'),
    password: Yup.string()
      .min(8, 'password_min_length')
      .matches(/[A-Z]/, 'password_uppercase')
      .matches(/[0-9]/, 'password_number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'password_special_char')
      .required('password_required'),
  });

  try {
    await validationSchema.validate(useDetails, { abortEarly: false });
  } catch (validationError) {
    const updatedValidationError =
      validationError as unknown as Yup.ValidationError;

    const errorMessages = {};

    updatedValidationError.inner.forEach((error) => {
      if (error.path) {
        set(errorMessages, error.path, error.message);
      }
    });

    return errorMessages;
  }
};

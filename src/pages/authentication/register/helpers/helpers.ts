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
import isEmail from 'validator/lib/isEmail';
import * as Yup from 'yup';

import { UserDetails } from '../Register';

export const validateUserDetails = async (useDetails: UserDetails) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('email_required')
      .test('is-email-valid', 'invalid_email', (value) =>
        Boolean(value && isEmail(value))
      ),
    password: Yup.string()
      .required('password_required')
      .min(8, 'password_min_length')
      .max(100, 'password_max_length')
      .matches(/[A-Z]/, 'password_uppercase')
      .matches(/[0-9]/, 'password_number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'password_special_char'),
    password_confirmation: Yup.string().oneOf(
      [Yup.ref('password')],
      'passwords_not_match'
    ),
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

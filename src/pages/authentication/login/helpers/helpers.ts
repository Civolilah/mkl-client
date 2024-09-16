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

import { UserDetails } from '@pages/authentication/register/Register';

export const validateUserDetails = async (useDetails: UserDetails) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('email_required')
      .test('is-email-valid', 'invalid_email', (value) =>
        Boolean(value && isEmail(value))
      ),
    password: Yup.string()
      .min(8, 'password_min_length')
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

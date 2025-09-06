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

import { PasswordPayload } from '../components/ChangePasswordModal';

export const validateChangePassword = async (
  passwordPayload: PasswordPayload
) => {
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('password_required')
      .min(5, 'password_min_length'),
    password_confirmation: Yup.string().oneOf(
      [Yup.ref('password')],
      'passwords_not_match'
    ),
  });

  try {
    await validationSchema.validate(passwordPayload, { abortEarly: false });
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

export const validateChangeSecurityPassword = async (
  passwordPayload: PasswordPayload
) => {
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('password_required')
      .min(5, 'password_min_length'),
    password_confirmation: Yup.string().oneOf(
      [Yup.ref('password')],
      'passwords_not_match'
    ),
  });

  try {
    await validationSchema.validate(passwordPayload, { abortEarly: false });
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

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

import { ProfileType } from '../../Profile';
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

export const validateProfile = async (profile: ProfileType) => {
  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .required('first_name_required')
      .max(200, 'first_name_max_length'),
    last_name: Yup.string().optional().max(200, 'last_name_max_length'),
    phone: Yup.string().optional().max(100, 'phone_max_length'),
    email: Yup.string()
      .required('email_required')
      .test('is-email-valid', 'invalid_email', (value) =>
        Boolean(value && isEmail(value))
      ),
    language: Yup.string().optional().max(200, 'language_max_length'),
    date_format: Yup.string().optional().max(200, 'date_format_max_length'),
    time_zone: Yup.string().optional().max(200, 'time_zone_max_length'),
    number_precision: Yup.number()
      .optional()
      .max(200, 'number_precision_max_length'),
    is_military_time: Yup.boolean().required('is_military_time_required'),
    comma_as_decimal_separator: Yup.boolean().required(
      'comma_as_decimal_separator_required'
    ),
    enabled_security_password: Yup.boolean().required(
      'enabled_security_password_required'
    ),
  });

  try {
    await validationSchema.validate(profile, { abortEarly: false });
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

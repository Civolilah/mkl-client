/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

'use server';

import { set } from 'lodash';
import * as Yup from 'yup';

import { request } from '@helpers/index';

import { LoginDetails } from '../../page';

export const validateLoginDetails = async (loginDetails: LoginDetails) => {
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
    await validationSchema.validate(loginDetails, { abortEarly: false });
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

export const handleLoginUser = async (loginDetails: LoginDetails) => {
  request('POST', '/api/login', loginDetails).then((response) => response);
};

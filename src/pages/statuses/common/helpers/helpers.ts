/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import colorString from 'color-string';
import { set } from 'lodash';
import * as Yup from 'yup';

import { Status } from '@interfaces/index';

export const validateStatus = async (status: Status) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('status_name_required')
      .max(200, 'status_name_max_length'),
    color: Yup.string().test(
      'is-valid-color',
      'invalid_status_color',
      (value) => {
        if (!value) return true;

        return colorString.get(value) !== null;
      }
    ),
  });

  try {
    await validationSchema.validate(status, { abortEarly: false });
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

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

import { Label } from '@interfaces/index';

export const validateLabel = async (label: Label) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('label_name_required')
      .max(200, 'label_name_max_length'),
    label_category_id: Yup.string()
      .length(36, 'invalid_label_category')
      .required('label_category_required'),
  });

  try {
    await validationSchema.validate(label, { abortEarly: false });
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

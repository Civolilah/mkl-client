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

import { Bin } from '@interfaces/index';

export const validateBin = async (bin: Bin) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('bin_name_required')
      .max(200, 'bin_name_max_length'),
    warehouse_id: Yup.string()
      .length(36, 'invalid_warehouse_id')
      .required('warehouse_id_required'),
  });

  try {
    await validationSchema.validate(bin, { abortEarly: false });
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

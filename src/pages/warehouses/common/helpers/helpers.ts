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

import { Warehouse } from '@interfaces/index';

export const validateWarehouse = async (warehouse: Warehouse) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('warehouse_name_required')
      .max(200, 'warehouse_name_max_length'),
  });

  try {
    await validationSchema.validate(warehouse, { abortEarly: false });
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

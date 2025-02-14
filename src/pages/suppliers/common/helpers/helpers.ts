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

import { Supplier } from '@interfaces/index';

export const validateSupplier = async (supplier: Supplier) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('supplier_name_required')
      .max(200, 'supplier_name_max_length'),
  });

  try {
    await validationSchema.validate(supplier, { abortEarly: false });
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
